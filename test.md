# 测试服务器部署记录

更新时间：2026-05-26

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
- 当前 release：`/opt/husuweb-hweb/releases/20260526-0918`
- 当前 source：`/opt/husuweb-hweb/sources/20260526-0918`
- 已复用依赖：`/opt/husuweb-hweb/sources/20260518-011921/node_modules`

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

1. 上传本地项目到 `/opt/husuweb-hweb/sources/20260526-0918`。
2. 复用服务器已有依赖，将 `node_modules` 指向旧 source 的依赖目录。
3. 在服务器执行 `npm run build`，生成 `.next/standalone`。
4. 创建 release：`/opt/husuweb-hweb/releases/20260526-0918`。
5. 复制 standalone、`.next/static`、`public`、`data`、`content` 和环境文件到 release。
6. 切换 `/opt/husuweb-hweb/current` 到新 release。
7. 重启 `husuweb-hweb.service`。

## 验证结果

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

- CMS 文件管理改为懒加载，避免一次加载过多文件。
- 虎诉动态 CMS 增加一键置顶。
- 虎诉动态的置顶排序和时间排序已接入页面展示顺序。
- OSS 上传配置已通过环境变量接入。
