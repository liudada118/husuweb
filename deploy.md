# 部署说明

本文档说明这个项目当前的实际部署逻辑，重点覆盖：
- 本项目为什么按 Next.js `standalone` 方式部署
- `/offweb/` 这类子路径部署是如何生效的
- 本地构建、打包、上传、服务器发布、服务重启、回滚分别做什么
- 手动整理 standalone 发布包、子路径构建和静态快照链路各自的用途

## 1. 当前 offweb 环境

当前已知 offweb 环境信息如下：

- 访问地址：`http://8.140.238.44/offweb/`
- 部署形态：Next.js `standalone` 运行时部署
- 不是：纯静态导出站点
- 服务名：`husuweb-offweb.service`
- 应用监听：`127.0.0.1:3003`
- 部署目录：`/opt/husuweb-offweb/current`
- 外层入口：Nginx 以 `/offweb/` 路径转发到本地 Node 服务

这意味着当前线上链路是：

1. 在本地执行 `next build`
2. 生成 `.next/standalone`
3. 将运行时所需文件整理到 `dist/offweb`
4. 打包上传到 Linux 服务器
5. 在服务器上解压到版本目录并切换 `current` 软链
6. 由 `systemd` 启动 Node 进程
7. 由 Nginx 把 `/offweb/` 请求转发给该进程

## 2. 总体部署逻辑

### 2.1 为什么不是静态导出

这个仓库虽然有一个 `scripts/export-static-snapshot.mjs`，但它不是当前主部署链路。当前主链路依赖：

- Next.js App Router 运行时
- `.next/standalone` 输出
- `server.js` 启动服务
- `public/` 等运行时静态资源

因此当前 offweb 环境更适合按“Node 服务 + 反向代理”的方式部署，而不是直接把 HTML/CSS/JS 当纯静态文件扔到 Nginx。

### 2.2 为什么要用 `output: "standalone"`

[next.config.ts](/e:/husuweb/next.config.ts) 中配置了：

```ts
output: "standalone"
```

它的作用是让 Next 在构建后输出一个最小运行时目录，包含：

- `server.js`
- 运行时需要的 `node_modules`
- `.next/server`
- 追踪到的依赖文件

这样服务器上不需要完整源码，也不需要重新跑一遍全量安装和构建，只需要拿到整理好的运行包就能启动。

## 3. 子路径 `/offweb/` 是如何生效的

### 3.1 关键环境变量

[next.config.ts](/e:/husuweb/next.config.ts) 会读取：

```ts
const rawSnapshotBasePath = process.env.NEXT_SNAPSHOT_BASE_PATH?.trim() ?? "";
```

如果这个变量存在且不是 `/`，配置会自动启用：

```ts
basePath: snapshotBasePath,
assetPrefix: snapshotBasePath,
trailingSlash: true,
```

这三项的作用分别是：

- `basePath`：让页面路由从根路径切到子路径，例如 `/about` 变成 `/offweb/about`
- `assetPrefix`：让 Next 资源也走 `/offweb/_next/...`，否则静态资源会错误地请求到域名根路径
- `trailingSlash`：统一输出带尾斜杠的 URL，降低子路径部署时的跳转和相对路径问题
- `NEXT_PUBLIC_BASE_PATH`：由 `next.config.ts` 注入客户端，让 `ImageWithFallback` 把 `/assets/...` 自动输出为 `/offweb/assets/...`

### 3.2 对当前 offweb 站意味着什么

如果要部署到：

```text
http://8.140.238.44/offweb/
```

那么构建前必须设置：

```powershell
$env:NEXT_SNAPSHOT_BASE_PATH="/offweb"
```

否则最终页面虽然可能能打开，但会出现这些典型问题：

- 页面链接跳到根路径而不是 `/offweb/...`
- `/_next/static/...` 资源 404
- `public/*` 下的图片、视频、图标请求错到域名根路径
- 某些展开内容或二级页面图片显示不出来

### 3.3 关于 `NEXT_IGNORE_BUILD_VALIDATION`

`next.config.ts` 里目前也读取了：

```ts
const ignoreBuildValidation = process.env.NEXT_IGNORE_BUILD_VALIDATION === "1";
```

但按当前仓库代码，它没有继续参与后续配置分支。也就是说：

- 这个变量目前更像是历史兼容位
- 不能把它当成“当前构建一定会生效的跳过开关”
- 真正影响 `/offweb/` 子路径部署的核心变量是 `NEXT_SNAPSHOT_BASE_PATH`

## 4. 仓库里与部署相关的脚本

### 4.1 `npm run build`

对应 [package.json](/e:/husuweb/package.json)：

```json
"build": "next build"
```

这是最基础的生产构建命令。它会读取当前 shell 中的环境变量，所以你可以直接这样构建 `/offweb/` 版本：

```powershell
$env:NEXT_SNAPSHOT_BASE_PATH="/offweb"
$env:NEXT_TELEMETRY_DISABLED="1"
npm run build
```

### 4.2 手动整理 `.next/standalone` 到 `dist/offweb`

当前仓库没有保存独立的打包脚本。构建完成后，需要手动整理构建产物：

1. 读取 `.next/standalone`
2. 拷贝到 `dist/offweb`
3. 补上 `.next/static`
4. 补上 `public/`
5. 刻意排除 `.next/cache`

也就是说，执行顺序必须是：

1. 先 `npm run build`
2. 再手动整理 `.next/standalone` 到 `dist/offweb`

不能反过来。

### 4.3 静态快照链路

如后续补充 `scripts/export-static-snapshot.mjs`，它的作用不是生成当前 offweb 环境要用的 `standalone` 运行包，而是：

- 从一个已经能访问的站点 URL 抓取 HTML
- 递归抓取页面链接
- 输出一份静态快照目录
- 复制 `_next/static` 和 `public/`

它更像：

- 静态镜像导出工具
- 归档工具
- 不依赖 Node 运行时的快照方案

它不是当前 `http://8.140.238.44/offweb/` 的主部署方案。

## 5. 当前推荐的本地构建流程

### 5.1 构建 `/offweb/` 版本

在 PowerShell 中执行：

```powershell
$env:NEXT_SNAPSHOT_BASE_PATH="/offweb"
$env:NEXT_TELEMETRY_DISABLED="1"
npm run build
```

如果你想在同一个终端里继续打包，保持这个 shell 不关闭即可。

### 5.2 生成可上传的运行包

```powershell
$target = "dist/offweb"
Remove-Item -Recurse -Force $target -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force $target | Out-Null
Copy-Item -Path ".next/standalone/*" -Destination $target -Recurse -Force
New-Item -ItemType Directory -Force "$target/.next" | Out-Null
Copy-Item -LiteralPath ".next/static" -Destination "$target/.next" -Recurse -Force
Copy-Item -LiteralPath "public" -Destination $target -Recurse -Force
```

执行完成后，核心目录是：

```text
dist/offweb/
```

建议再压缩成归档文件：

```powershell
tar -czf dist/offweb-standalone.tgz -C dist/offweb .
```

生成结果：

```text
dist/offweb-standalone.tgz
```

## 6. 打包产物里到底包含什么

`dist/offweb` 理论上应包含这些关键内容：

- `server.js`
- `.next/server`
- `.next/static`
- `public/`
- 追踪后的运行时 `node_modules/`

其中：

- `.next/server`：页面服务端运行代码
- `.next/static`：前端静态资源
- `public/`：公开资源，例如图标、奖项图片、视频等
`.next/cache` 被刻意排除了，因为：

- 它只对后续本地构建加速有帮助
- 对线上运行没有必要
- 会明显增大发布包体积

## 7. 上传与服务器发布逻辑

### 7.1 上传

把下面这个文件上传到服务器：

```text
dist/offweb-standalone.tgz
```

推荐先上传到临时位置，例如：

```text
/opt/husuweb-offweb/offweb-standalone.tgz
```

### 7.2 解压到发布目录

当前已知运行目录是：

```text
/opt/husuweb-offweb/current
```

发布时可以执行：

```bash
mkdir -p /opt/husuweb-offweb/current
tar -xzf /opt/husuweb-offweb/offweb-standalone.tgz -C /opt/husuweb-offweb/current
```

更稳妥的做法是先清空旧目录，避免旧文件残留：

```bash
rm -rf /opt/husuweb-offweb/current/*
tar -xzf /opt/husuweb-offweb/offweb-standalone.tgz -C /opt/husuweb-offweb/current
```

如果你担心直接覆盖风险更高，建议改成“版本目录 + 软链切换”的发布方式，这样更容易回滚。

### 7.3 当前服务器发布方式

本次 offweb 发布采用“版本目录 + current 软链”：

```text
/opt/husuweb-offweb/releases/20260507-011614/
/opt/husuweb-offweb/current -> /opt/husuweb-offweb/releases/20260507-011614
```

这样重新发布时只需要解压到新的版本目录，再切换 `current` 软链并重启服务。当前仓库没有原生 Node 模块依赖，不需要在服务器额外补装 Linux 版本依赖。

## 8. systemd 和 Nginx 各自负责什么

### 8.1 systemd 的职责

`systemd` 负责：

- 以服务方式启动 Node 进程
- 进程崩溃后自动拉起
- 系统重启后自动启动
- 提供统一状态查看与日志入口

当前服务名是：

```text
husuweb-offweb.service
```

虽然仓库里没有保存它的 service 文件，但按 `standalone` 结构，通常会类似：

```ini
[Unit]
Description=husuweb offweb
After=network.target

[Service]
WorkingDirectory=/opt/husuweb-offweb/current
ExecStart=/usr/bin/node server.js
Restart=always
Environment=PORT=3003
Environment=HOSTNAME=127.0.0.1

[Install]
WantedBy=multi-user.target
```

这里的关键点是：

- `WorkingDirectory` 指向解压后的运行目录
- `ExecStart` 直接跑 `server.js`
- 端口通常由环境变量控制

### 8.2 Nginx 的职责

Nginx 负责：

- 对外暴露 `http://8.140.238.44/offweb/`
- 把 `/offweb/` 这一路径代理到本地 Node 服务
- 处理公网入口、转发头、超时等基础网关职责

当前仓库没有直接保存 Nginx 配置文件，但按现有部署信息，通常会类似：

```nginx
location /offweb/ {
    proxy_pass http://127.0.0.1:3003/offweb/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

这里最重要的是两件事：

- 外层路径是 `/offweb/`
- 应用内部构建时也必须知道自己运行在 `/offweb/`

也就是 Nginx 子路径转发和 `NEXT_SNAPSHOT_BASE_PATH=/offweb` 必须一致。两边只要有一边错了，就会出现资源路径错误。

## 9. 发布后的验证方法

### 9.1 查看服务状态

```bash
systemctl status husuweb-offweb.service --no-pager
```

预期：

- 服务状态为 `active (running)`

### 9.2 看本地回源是否正常

```bash
curl -I http://127.0.0.1:3003/offweb/
```

预期：

- 返回 `200 OK` 或正常跳转响应

### 9.3 看公网入口是否正常

```bash
curl -I http://8.140.238.44/offweb/
```

预期：

- 返回 `200 OK`

### 9.4 页面级验证重点

除了首页能打开，还要特别检查这些最容易暴露子路径问题的点：

- `/offweb/` 首屏资源是否完整加载
- `/offweb/about/`、`/offweb/awards/` 等二级页面是否正常
- `/_next/static/...` 请求是否自动带 `/offweb`
- `public/*` 下的图片、图标、视频是否正常
- 展开类组件中的图片是否能正确加载

## 10. 回滚思路

最简单的回滚方式是保留上一版压缩包或目录。

如果当前目录就是：

```text
/opt/husuweb-offweb/current
```

那至少要保留：

- 上一版压缩包
- 或上一版完整解压目录

更推荐的发布方式是：

```text
/opt/husuweb-offweb/releases/2026-04-25-1648/
/opt/husuweb-offweb/releases/2026-04-26-1010/
/opt/husuweb-offweb/current -> releases/2026-04-26-1010
```

这样回滚时只需要：

1. 把 `current` 软链切回旧版本
2. 重启 `husuweb-offweb.service`

## 11. 常见问题

### 11.1 页面能开，但静态资源 404

通常是下面几类原因：

- 构建时没有设置 `NEXT_SNAPSHOT_BASE_PATH=/offweb`
- Nginx 配的是 `/offweb/`，但应用按根路径构建
- 页面里有手写根路径 `/assets/...`、`/awardimg/...`、`/video/...`

结论：

- 子路径部署最大风险不是服务起不来，而是资源路径漏前缀
- 当前项目的图片统一走 `ImageWithFallback` 时会自动补 `/offweb`；如果新增了不走该组件的原生 `<img>`、CSS `url(...)` 或第三方图片组件，需要手动处理 basePath

### 11.2 服务器启动后立即退出

通常先看日志：

```bash
journalctl -u husuweb-offweb.service -n 80 --no-pager
```

如果出现 `Cannot find module .../server.js`，说明发布包没有包含 `.next/standalone` 根目录内容。需要重新打包，并确认压缩包内存在：

```text
./server.js
./.next/server/
./.next/static/
./node_modules/
```

### 11.3 运行目录里混入旧文件

症状通常是：

- 新版代码已经发布，但页面行为像旧版
- 资源文件和代码版本不一致

原因通常是：

- 直接解压覆盖，旧文件残留

更稳妥的做法：

- 发布前清空目录
- 或使用版本目录 + 软链

### 11.4 `build:xweb` 和 `/offweb/` 部署混用

这是非常常见的误用。

- `build:xweb` 固定输出 `/xweb`
- 当前 offweb 站实际跑在 `/offweb`

所以部署 `/offweb/` 时不要直接用：

```powershell
npm run build:xweb
```

除非你同步把 Nginx 和访问路径也改成 `/xweb/`。

## 12. 推荐的标准发布命令

### 12.1 本地

```powershell
$env:NEXT_SNAPSHOT_BASE_PATH="/offweb"
$env:NEXT_TELEMETRY_DISABLED="1"
npm run build
$target = "dist/offweb"
Remove-Item -Recurse -Force $target -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force $target | Out-Null
Copy-Item -Path ".next/standalone/*" -Destination $target -Recurse -Force
New-Item -ItemType Directory -Force "$target/.next" | Out-Null
Copy-Item -LiteralPath ".next/static" -Destination "$target/.next" -Recurse -Force
Copy-Item -LiteralPath "public" -Destination $target -Recurse -Force
tar -czf dist/offweb-standalone.tgz -C dist/offweb .
```

### 12.2 服务器

```bash
mkdir -p /opt/husuweb-offweb/current
rm -rf /opt/husuweb-offweb/current/*
tar -xzf /opt/husuweb-offweb/offweb-standalone.tgz -C /opt/husuweb-offweb/current
cd /opt/husuweb-offweb/current
systemctl restart husuweb-offweb.service
systemctl status husuweb-offweb.service --no-pager
curl -I http://127.0.0.1:3003/offweb/
curl -I http://8.140.238.44/offweb/
```

## 13. 一句话总结

这个项目当前的真实部署逻辑可以概括为：

> 在本地按 `/offweb` 子路径构建 Next.js `standalone` 运行包，整理运行时产物后上传到 Linux 服务器，由 `systemd` 启动 Node 服务，再由 Nginx 把公网 `/offweb/` 路径转发到该服务。

