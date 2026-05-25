# 测试服务器部署记录

本文记录当前项目部署到测试服务器 `8.140.238.44` 的实际方式。此测试环境采用 Next.js standalone 运行时，直接暴露 `3005` 端口访问，不经过 Nginx 子路径代理。

## 1. 服务器信息

| 项目 | 值 |
| --- | --- |
| 测试地址 | `http://8.140.238.44:3005/` |
| CMS 登录页 | `http://8.140.238.44:3005/cms/login` |
| SSH 用户 | `root` |
| SSH 端口 | `22` |
| ECS 公网 IP | `8.140.238.44` |
| ECS 实例 ID | `i-2zeamih4tp4crwc35119` |
| Node.js | `v20.20.1` |

> SSH 密码不写入仓库文档。需要时从安全的密码管理位置获取。

## 2. 当前部署形态

- 部署类型：Next.js `standalone`
- 访问方式：公网直连 `:3005`
- 不使用 Nginx 代理
- 不使用 `/hweb/` 子路径
- 构建 basePath：空，也就是根路径 `/`
- systemd 服务：`husuweb-hweb.service`
- 服务监听：`0.0.0.0:3005`

当前服务文件位置：

```text
/etc/systemd/system/husuweb-hweb.service
```

关键配置：

```ini
[Unit]
Description=Husu official site hweb direct 3005
After=network.target

[Service]
WorkingDirectory=/opt/husuweb-hweb/current
ExecStart=/usr/bin/node server.js
Restart=always
RestartSec=3
Environment=NODE_ENV=production
Environment=PORT=3005
Environment=HOSTNAME=0.0.0.0
Environment=CMS_COOKIE_SECURE=0

[Install]
WantedBy=multi-user.target
```

`CMS_COOKIE_SECURE=0` 是测试环境必须项，因为当前使用 `http://8.140.238.44:3005` 直连，不是 HTTPS。否则 CMS 登录成功后浏览器不会正常保存或回传 cookie。

## 3. 远端目录

```text
/opt/husuweb-hweb/
├── current -> /opt/husuweb-hweb/releases/20260518-011921
├── releases/
│   └── 20260518-011921/
└── sources/
    └── 20260518-011921/
```

说明：

- `sources/<版本号>`：上传到服务器的源码目录，用于在 Linux 环境执行 `npm ci` 和 `npm run build`
- `releases/<版本号>`：从 `.next/standalone` 整理出的运行目录
- `current`：指向当前正在运行的 release

## 4. 为什么在服务器上构建

本项目依赖原生 Node 模块，例如：

- `better-sqlite3`
- `@tailwindcss/oxide`
- `lightningcss`

本地 Windows 构建出的 `node_modules` 不能直接用于 Linux 服务器。因此测试服务器部署采用：

1. 上传源码、`public/`、`data/`、`content/`
2. 在服务器上执行 `npm ci`
3. 在服务器上执行 `npm run build`
4. 从 Linux 生成的 `.next/standalone` 整理 release
5. systemd 启动 `server.js`

## 5. 远端构建注意事项

服务器 npm 默认 registry 曾经是：

```text
https://registry.npmmirror.com
```

该镜像当时找不到锁文件中的 `nanoid@3.3.12`，所以安装时临时使用官方 registry：

```bash
npm ci --registry=https://registry.npmjs.org/
```

Linux 构建时还补装过平台原生包：

```bash
npm install @tailwindcss/oxide-linux-x64-gnu@4.1.12 lightningcss-linux-x64-gnu@1.30.1 --no-save --registry=https://registry.npmjs.org/
```

之后构建命令：

```bash
NEXT_TELEMETRY_DISABLED=1 npm run build
```

## 6. 发布整理逻辑

远端构建完成后，将 source 目录中的产物整理到 release：

```bash
SOURCE=/opt/husuweb-hweb/sources/20260518-011921
RELEASE=/opt/husuweb-hweb/releases/20260518-011921

mkdir -p /opt/husuweb-hweb/releases
rm -rf "$RELEASE"
mkdir -p "$RELEASE"

cp -a "$SOURCE/.next/standalone/." "$RELEASE/"
mkdir -p "$RELEASE/.next"
cp -a "$SOURCE/.next/static" "$RELEASE/.next/static"
cp -a "$SOURCE/public" "$RELEASE/public"
cp -a "$SOURCE/data" "$RELEASE/data"

if [ -d "$SOURCE/content" ]; then
  cp -a "$SOURCE/content" "$RELEASE/content"
fi

ln -sfn "$RELEASE" /opt/husuweb-hweb/current
systemctl daemon-reload
systemctl enable husuweb-hweb.service
systemctl restart husuweb-hweb.service
```

## 7. 验证命令

查看服务状态：

```bash
systemctl status husuweb-hweb.service --no-pager
```

确认端口监听：

```bash
ss -ltnp | grep ':3005'
```

服务器本机验证首页：

```bash
curl -I http://127.0.0.1:3005/
```

服务器本机验证 CMS 登录页：

```bash
curl -I http://127.0.0.1:3005/cms/login
```

公网访问验证：

```bash
curl -I http://8.140.238.44:3005/
```

预期：

```text
HTTP/1.1 200 OK
```

## 8. 安全组要求

阿里云 ECS 安全组需要放行入方向：

| 协议 | 端口 | 来源 |
| --- | --- | --- |
| TCP | `3005/3005` | `0.0.0.0/0` |

如果公网访问超时，但服务器本机 `curl http://127.0.0.1:3005/` 正常，优先检查：

1. `3005` 规则是否加到了该 ECS 实例实际绑定的安全组
2. 安全组页面的「实例列表」是否包含 `i-2zeamih4tp4crwc35119`
3. VPC 网络 ACL 是否拦截 `3005`
4. 本机浏览器是否走了代理

浏览器开发者工具里如果看到：

```text
Remote Address: 127.0.0.1:7892
```

说明请求经过了本机代理。测试 `8.140.238.44:3005` 时建议关闭代理，或把 `8.140.238.44` 加入代理绕过列表。

## 9. CMS 登录接口排查

登录接口：

```text
POST /api/cms/auth/login
```

请求体必须是 JSON：

```json
{
  "username": "admin",
  "password": "ChangeMe123!"
}
```

接口状态含义：

| 状态码 | 含义 |
| --- | --- |
| `200` | 登录成功 |
| `400` | `username` 或 `password` 为空 |
| `401` | 用户名或密码错误 |

测试环境初始种子账号：

```text
username: admin
password: ChangeMe123!
```

首次登录后应在 CMS 中修改密码。

## 10. 常用运维命令

重启服务：

```bash
systemctl restart husuweb-hweb.service
```

查看最近日志：

```bash
journalctl -u husuweb-hweb.service -n 80 --no-pager
```

实时日志：

```bash
journalctl -u husuweb-hweb.service -f
```

确认服务自启：

```bash
systemctl is-enabled husuweb-hweb.service
```

确认运行目录：

```bash
readlink -f /opt/husuweb-hweb/current
```
