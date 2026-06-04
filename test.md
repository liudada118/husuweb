# 测试服务器部署记录

更新时间：2026-06-04

## 访问地址

- 网站：http://8.140.238.44:3005/
- CMS 登录页：http://8.140.238.44:3005/cms/login

## 服务器信息

- IP：8.140.238.44
- SSH 用户：root
- SSH 端口：22
- 应用端口：3005
- 部署方式：Next.js standalone，systemd 常驻服务

> 账号密码、OSS AccessKey 等敏感信息不写入本文档。

## 远程目录

- 服务根目录：`/opt/husuweb-hweb`
- 当前运行软链：`/opt/husuweb-hweb/current`
- 当前 release：`/opt/husuweb-hweb/releases/20260604-100740`
- 当前 source：`/opt/husuweb-hweb/sources/20260604-100740`
- 已复用资源：新 release 的 `public` 和 `data` 软链到上一版 release，保留服务器 CMS 数据库和上传素材

## systemd 服务

- 服务名：`husuweb-hweb.service`
- 工作目录：`/opt/husuweb-hweb/current`
- 启动命令：`/usr/bin/node server.js`
- 环境端口：`PORT=3005`
- 监听地址：`HOSTNAME=0.0.0.0`

常用命令：

```bash
systemctl status husuweb-hweb.service --no-pager -l
systemctl restart husuweb-hweb.service
journalctl -u husuweb-hweb.service -n 120 --no-pager
ss -ltnp | grep ':3005'
```

## 本次部署步骤

### 2026-06-04

#### 22:22

1. 修复服务行业同步源优先级：`media.cards` 作为服务行业权威列表，`home.industries` 仅在没有 `media.cards` 时兜底。
2. 本地执行 `npx tsc --noEmit` 和 `npm run build` 通过。
3. 生成代码包 `dist/hweb-code-20260604-222246.tgz`。
4. 上传并解压到 `/opt/husuweb-hweb/sources/20260604-222246`，复用 `/opt/husuweb-hweb/sources/20260604-100740/node_modules`。
5. 服务器执行 `npm run build` 通过，创建 release：`/opt/husuweb-hweb/releases/20260604-222246`。
6. 新 release 的 `public` 和 `data` 继续通过 symlink 复用上一版 release，保留上传素材和 CMS 数据库。
7. 切换 `/opt/husuweb-hweb/current` 到新 release，并重启 `husuweb-hweb.service`。
8. 将当前已发布版本 2 的服务行业 official、`media.cards` 和 `home.industries` 同步到当前站点的 9 条，备份数据库为 `data/cms.db.before-published-industry-sync-20260604-222431`。

#### 10:14

1. 本地执行 `npx tsc --noEmit` 和 `npm run build` 验证服务端版本 payload 行业归一化修复。
2. 生成代码包 `dist/hweb-code-20260604-100740.tgz`，不携带本地 `data`，避免覆盖服务器 CMS 数据。
3. 服务器磁盘满后，清理 `/opt/husuweb-hweb/releases` 和 `/opt/husuweb-hweb/sources` 中非当前/回滚的旧构建目录，空间恢复到 28G 可用。
4. 解压到 `/opt/husuweb-hweb/sources/20260604-100740`，重新执行 `npm ci` 并补齐 Linux 原生 `lightningcss` / `@tailwindcss/oxide` 构建依赖。
5. 服务器执行 `npm run build` 通过，创建 release：`/opt/husuweb-hweb/releases/20260604-100740`。
6. 新 release 的 `public` 和 `data` 通过 symlink 复用上一版 release，保留上传素材和 CMS 数据库。
7. 切换 `/opt/husuweb-hweb/current` 到新 release，并重启 `husuweb-hweb.service`。

#### 09:50

1. 本地执行 `npx tsc --noEmit` 和 `npm run build` 验证当前代码。
2. 生成精简构建源码包 `dist/hweb-buildsrc-20260604-095048.tgz`。
3. 上传源码包到 `/opt/husuweb-hweb/hweb-buildsrc-20260604-095048.tgz`。
4. 解压到 `/opt/husuweb-hweb/sources/20260604-095048`，复用服务器已有 Linux `node_modules` 和上一版 `public`。
5. 在服务器执行 `npm run build`，创建 release：`/opt/husuweb-hweb/releases/20260604-095048`。
6. 切换 `/opt/husuweb-hweb/current` 到新 release，并重启 `husuweb-hweb.service`。

#### 00:22

1. 本地执行 `npm run build` 验证当前代码可生产构建。
2. 生成精简构建源码包 `dist/hweb-buildsrc-20260604-002208.tgz`，排除未被当前 Next 路由引用的 landing 原型素材。
3. 上传源码包到 `/opt/husuweb-hweb/hweb-buildsrc-20260604-002208.tgz`。
4. 解压到 `/opt/husuweb-hweb/sources/20260604-002208`，复用服务器已有 Linux `node_modules`。
5. 复用上一版 release 的 `public` 资源目录，在服务器执行 `npm run build`。
6. 创建 release：`/opt/husuweb-hweb/releases/20260604-002208`。
7. 复制 standalone、`.next/static`、`public`、`data`、`content` 和环境文件到 release。
8. 切换 `/opt/husuweb-hweb/current` 到新 release。
9. 重启 `husuweb-hweb.service`。

### 2026-05-26

1. 上传本地项目到 `/opt/husuweb-hweb/sources/20260526-0918`。
2. 复用服务器已有依赖，将 `node_modules` 指向旧 source 的依赖目录。
3. 在服务器执行 `npm run build`，生成 `.next/standalone`。
4. 创建 release：`/opt/husuweb-hweb/releases/20260526-0918`。
5. 复制 standalone、`.next/static`、`public`、`data`、`content` 和环境文件到 release。
6. 切换 `/opt/husuweb-hweb/current` 到新 release。
7. 重启 `husuweb-hweb.service`。

## 验证结果

### 2026-06-04

#### 22:22

服务器内验证：
- `http://127.0.0.1:3005/` 返回 `200`
- `http://127.0.0.1:3005/cms/login` 返回 `200`
- `http://127.0.0.1:3005/api/cms/public` 返回 `200`

本机公网验证：
- `http://8.140.238.44:3005/cms/login` 返回 `200`
- `http://8.140.238.44:3005/api/cms/public` 返回 `200`

数据校验：
- 当前站点 official 服务行业：`9`
- 已发布版本 official 服务行业：`9`
- 已发布版本英文 `media.cards/home.industries`：`9/9`
- 已发布版本中文 `media.cards/home.industries`：`9/9`

#### 10:14

服务器内验证：
- `http://127.0.0.1:3005/` 返回 `200`
- `http://127.0.0.1:3005/cms/login` 返回 `200`
- `http://127.0.0.1:3005/api/cms/public` 返回 `200`

本机公网验证：
- `http://8.140.238.44:3005/` 返回 `200`
- `http://8.140.238.44:3005/cms/login` 返回 `200`
- `http://8.140.238.44:3005/api/cms/public` 返回 `200`

#### 09:50

服务器内验证：

- `http://127.0.0.1:3005/` 返回 `200`
- `http://127.0.0.1:3005/cms/login` 返回 `200`
- `http://127.0.0.1:3005/api/cms/public` 返回 `200`

本机公网验证：

- `http://8.140.238.44:3005/` 返回 `200`
- `http://8.140.238.44:3005/cms/login` 返回 `200`
- `http://8.140.238.44:3005/api/cms/public` 返回 `200`

#### 00:22

服务器内验证：

- `http://127.0.0.1:3005/` 返回 `200`
- `http://127.0.0.1:3005/cms/login` 返回 `200`
- `http://127.0.0.1:3005/api/cms/public` 返回 `200`

本机公网验证：

- `http://8.140.238.44:3005/` 返回 `200`
- `http://8.140.238.44:3005/cms/login` 返回 `200`
- `http://8.140.238.44:3005/api/cms/public` 返回 `200`

### 2026-05-26

服务器内验证：

- `http://127.0.0.1:3005/` 返回 `200`
- `http://127.0.0.1:3005/cms` 返回 `307`，跳转登录页
- `http://127.0.0.1:3005/cms/login` 返回 `200`
- `http://127.0.0.1:3005/api/cms/public` 返回 `200`
- `http://127.0.0.1:3005/api/cms/assets?limit=1&offset=0` 未登录返回 `401`，符合预期

本机公网验证：

- `http://8.140.238.44:3005/` 返回 `200`
- `http://8.140.238.44:3005/cms/login` 返回 `200`

## 本次上线内容

- 服务行业来源优先级修复：服务行业页 `media.cards` 优先于首页 `home.industries`，避免首页列表比服务行业页少时，进入 CMS 后把服务行业内容管理裁少一条。
- 服务端版本行业归一化修复：创建/更新/预览/发布版本时，会用版本 `pageContent.media.cards` / `home.industries` 重建 `officialState.lists.industries`，防止线上旧 payload 或旧前端提交后再次进入可视化编辑丢失新增行业。
- 服务行业删除持久化修复：内容管理和可视化编辑删除行业后，不再被默认 pageContent 或旧 slug 合并补回。
- 可视化服务行业版本加载修复：新增行业发布后继续进入可视化编辑，列表会从版本 pageContent 反推官方行业，不再被旧 officialState 裁掉。
- CMS 文件管理改为懒加载，避免一次加载过多文件。
- 虎诉动态 CMS 增加一键置顶。
- 虎诉动态的置顶排序和时间排序已接入页面展示顺序。
- OSS 上传配置已通过环境变量接入。
