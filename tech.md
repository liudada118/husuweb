# 技术栈与重建注意事项

本文档记录当前项目实际使用的技术栈，并整理重新搭建网站时需要提前决策和规避的风险。

## 1. 当前技术栈概览

| 类型 | 当前使用 | 说明 |
| :--- | :--- | :--- |
| 框架 | Next.js App Router `15.5.14` | 通过 `next` 运行，生产构建使用 standalone 输出 |
| UI 运行时 | React `18.3.1` / React DOM `18.3.1` | 当前不是 React 19 |
| 语言 | TypeScript `5.8.x` + 少量 JavaScript / JSX | `allowJs: true`，历史组件中仍有 JS/JSX |
| 样式 | Tailwind CSS `4.1.12` | 使用 Tailwind v4 的 PostCSS 插件方式 |
| PostCSS | `@tailwindcss/postcss` | `postcss.config.mjs` 只挂 Tailwind 插件 |
| 组件基础 | Radix UI + shadcn 风格组件 | `src/app/components/ui/*` 下有大量 Radix 封装 |
| 图标 | `lucide-react` | 主要用于导航、按钮、控制图标 |
| 动效 | `motion` | 用于页面入场、轮播、交互动画 |
| 3D / Canvas | `three` | 用于部分视觉背景和高级动效 |
| 轮播 | `react-slick`、`slick-carousel`、`embla-carousel-react` | 当前项目同时存在多套轮播依赖 |
| CMS 数据库 | `better-sqlite3` | 本地 SQLite，数据库路径为 `data/cms.db` |
| CMS 可视化编辑 | `@puckeditor/core` | 当前用于 Puck 视觉编辑器实验和页面字段同步 |
| 表单 | `react-hook-form` | 配合 UI 组件使用 |
| 日期 | `date-fns` | 日期格式化 / 排序辅助 |
| 图表 | `recharts` | CMS 数据看板类场景 |
| 拖拽 | `react-dnd`、`react-dnd-html5-backend` | 编辑器 / 管理面板交互 |
| 通知 | `sonner` | 管理后台状态提示 |
| 包管理器 | pnpm `10.4.1` | `packageManager` 已锁定 pnpm 版本 |
| 部署输出 | Next standalone | `next.config.ts` 设置 `output: "standalone"` |

## 2. 当前项目结构特点

当前项目是一个 **Next.js App Router 网站 + 内置 CMS 后台** 的组合：

- 公开页面位于 `src/app/*/page.tsx`。
- 页面主体组件集中在 `src/app/components/landing/*`。
- 全局样式从 `src/app/globals.css` 引入，再导入 `src/styles/index.css`。
- 字体、主题、Tailwind 入口位于 `src/styles/*`。
- CMS 数据类型集中在 `src/lib/cms-types.ts`。
- CMS 页面内容模型集中在 `src/lib/cms-page-content.ts`。
- SQLite 读写集中在 `src/lib/cms-db.ts`。
- CMS 登录、版本、资源、集合等接口位于 `src/app/api/cms/*`。
- 静态公共资源放在 `public/*`。
- CMS 上传资源放在 `public/uploads/*`。
- 本地数据库放在 `data/cms.db`。

仓库中还有一些中文目录和历史 Vite 原型目录，例如 `首页`、`关于`、`事件`、`联系我们` 等。这些目录不属于当前 Next 主应用的主要运行链路，重建时不要默认复制进去。

## 3. 当前构建与部署方式

可用脚本：

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "build:xweb": "node scripts/build-xweb.mjs",
  "package:xweb": "node scripts/package-xweb-standalone.mjs"
}
```

部署相关配置：

- `next.config.ts` 使用 `output: "standalone"`。
- `NEXT_SNAPSHOT_BASE_PATH` 可设置部署子路径，同时影响 `basePath`、`assetPrefix`、`trailingSlash`。
- `build:xweb` 会用 `NEXT_SNAPSHOT_BASE_PATH=/xweb` 构建。
- `package:xweb` 会把 `.next/standalone`、`.next/static`、`public`、`data`、`content` 打包到 `dist/xweb`。
- `.next/cache` 不会进入部署包，因为它只用于本地构建加速。

需要注意：当前 `next.config.ts` 设置了：

```ts
eslint: {
  ignoreDuringBuilds: true,
},
typescript: {
  ignoreBuildErrors: true,
},
```

这意味着当前项目允许存在 ESLint / TypeScript 问题但仍然构建。新项目不建议默认沿用这个策略，除非只是为了迁移期临时放行。

## 4. 环境变量

当前代码中明确使用到的环境变量：

| 变量 | 用途 | 注意 |
| :--- | :--- | :--- |
| `CMS_ADMIN_USERNAME` | 初始化 CMS 管理员用户名 | 不设置时默认 `admin` |
| `CMS_ADMIN_PASSWORD` | 初始化 CMS 管理员密码 | 不设置时默认 `ChangeMe123!`，并标记需要重置 |
| `NEXT_SNAPSHOT_BASE_PATH` | 设置部署子路径 | 会影响 `basePath` 和静态资源前缀 |
| `NEXT_IGNORE_BUILD_VALIDATION` | 当前配置中读取但未实际用于逻辑分支 | 重建时要么删掉，要么补齐用途 |
| `NEXT_TELEMETRY_DISABLED` | 构建脚本中关闭 Next telemetry | 脚本内使用 |
| `NODE_ENV` | Cookie secure 判断 | 生产环境 session cookie 会走 secure 逻辑 |

重建时建议建立 `.env.example`，明确列出必填项、默认值和生产环境要求。

## 5. 如果重新搭建，建议保留的技术

如果你要重建的是一个内容型官网，并且仍需要后台管理，建议保留：

- **Next.js App Router**：适合官网、SEO、服务端数据读取和 API Route。
- **TypeScript**：页面数据模型、CMS 字段、接口返回值都需要类型约束。
- **Tailwind CSS v4**：适合快速搭建响应式页面，但要建立自己的 design token。
- **Radix UI / shadcn 风格组件**：适合后台表单、弹窗、下拉、标签页等基础交互。
- **lucide-react**：图标统一，体积和使用体验都稳定。
- **SQLite + better-sqlite3**：如果后台数据量不大、部署是单机，SQLite 足够简单。
- **standalone 部署**：如果部署到普通 Linux 服务器，Next standalone 比全量 node_modules 更清晰。

## 6. 可以重新评估的技术

当前项目为了 CMS 和历史页面集成引入了不少依赖。重建时不一定都要保留。

| 技术 | 是否建议默认保留 | 原因 |
| :--- | :--- | :--- |
| `@puckeditor/core` | 视需求决定 | 如果只是普通后台编辑内容，不一定需要完整可视化编辑器 |
| `react-slick` + `slick-carousel` | 不建议和 Embla 并存 | 轮播库选一套即可，减少样式和包体冲突 |
| `embla-carousel-react` | 可保留 | 更适合作为统一轮播基础 |
| `three` | 视视觉需求决定 | 没有 3D / WebGL 首屏时不需要 |
| `@mui/material` / Emotion | 谨慎保留 | 如果已经有 Radix/shadcn，再引入 MUI 容易形成双设计系统 |
| `react-dnd` | 后台拖拽需求明确时保留 | 普通官网不需要 |
| `recharts` | 只有数据看板需要 | 如果 CMS 没有统计面板可删除 |
| `canvas-confetti` | 非核心 | 只适合局部反馈动效 |
| `next-themes` | 看是否需要主题切换 | 固定品牌色网站通常不需要 |

重建时最重要的一点：**不要把当前依赖当作新项目必需依赖。先定义功能，再选依赖。**

## 7. 推荐的新项目基础选型

如果目标是重新搭建一个更干净的网站，建议从这套最小栈开始：

| 类型 | 推荐 |
| :--- | :--- |
| 框架 | Next.js App Router |
| 语言 | TypeScript |
| 样式 | Tailwind CSS v4 + 自定义 CSS variables |
| UI 基础 | Radix UI / shadcn 风格组件 |
| 图标 | lucide-react |
| 动效 | motion |
| 轮播 | embla-carousel-react |
| 内容数据 | 前期可用 Markdown / JSON；需要后台再上 SQLite |
| CMS | 先做结构化字段后台；可视化编辑器后置 |
| 部署 | standalone Node 服务，前面接 Nginx |

不建议一开始就加入：

- Puck 可视化编辑器；
- 多套轮播库；
- MUI 和 Radix 双组件体系；
- 大量 WebGL / Three 动效；
- 复杂版本发布系统；
- 过早的文件管理后台。

这些功能可以后续按真实需求增量加。

## 8. 重建时必须提前决定的事项

### 8.1 是否需要 CMS

如果内容更新频率低，可以先用 Markdown / JSON / MDX。

如果需要非技术人员维护内容，再做 CMS。CMS 也应先从结构化字段开始：

- 页面标题；
- 正文段落；
- 图片；
- 外链；
- 重复列表；
- SEO 字段；
- 导航和页脚配置。

不要一开始就做自由拖拽式页面编辑器。自由编辑能力越强，数据模型、预览同步、发布流程和样式约束越复杂。

### 8.2 数据库选型

SQLite 适合：

- 单机部署；
- 内容量不大；
- 并发写入少；
- 后台主要是管理员编辑。

不适合：

- 多实例部署；
- 多管理员高频同时编辑；
- 大量业务写入；
- 需要复杂权限和审计。

如果未来会多实例部署，应考虑 PostgreSQL。

### 8.3 部署路径

如果网站部署在根路径，例如 `https://example.com/`，配置最简单。

如果部署在子路径，例如 `/xweb`、`/test`，必须提前考虑：

- Next `basePath`；
- `assetPrefix`；
- 静态资源路径；
- 内部链接；
- API 请求路径；
- Nginx 反向代理；
- sitemap / canonical URL。

子路径部署后再补救，通常会遇到图片、跳转、接口路径错位。

### 8.4 资源管理

需要明确两类资源：

- **构建期资源**：放在 `src/assets`，由 bundler 处理，适合固定页面素材。
- **运行期资源**：放在 `public/uploads` 或对象存储，适合 CMS 上传。

不要把用户上传文件放进 `src/assets`，否则每次换图都需要重新构建。

### 8.5 多语言

如果需要中英文：

- 一开始就设计语言字段，不要后期硬拆字符串。
- 路由层要决定是 `/en/about` 还是同路径切换语言。
- CMS 字段应按语言成对管理。
- 标题、按钮、卡片在中英文长度差异下都要测试。

### 8.6 SEO

官网重建时不要只做视觉。需要同时设计：

- 每页 `title`；
- `description`；
- Open Graph 图片；
- canonical URL；
- sitemap；
- robots；
- 结构化数据；
- 404 页面；
- 重定向规则。

### 8.7 表单和安全

如果有联系表单或后台登录，需要注意：

- 服务端校验，不只靠前端校验；
- CSRF / rate limit；
- 上传文件类型和大小限制；
- 后台 session cookie 的 `httpOnly`、`secure`、`sameSite`；
- 默认管理员密码必须在生产前修改；
- API 不要返回敏感错误栈。

## 9. 当前项目里值得避免继承的问题

重建时建议主动规避这些历史包袱：

- 历史原型目录和当前主应用混在一个仓库中，容易误改。
- `allowJs: true` 让 TS/JS 混用范围变大，新项目应尽量纯 TS。
- 构建忽略 TypeScript 和 ESLint 错误，容易把隐患带到生产。
- 同时存在多套轮播库，维护成本高。
- Radix/shadcn 与 MUI 并存，设计系统容易分裂。
- CMS、Puck、版本系统、文件管理、公开页面一次性耦合太深。
- 图片来源混杂：`src/assets`、`public/assets`、`public/uploads`、历史目录都存在。
- 响应式规则大量写在组件 className 中，后期抽象成本高。
- 移动端缩放被强锁，设计稿必须在小屏上自己保证可读性。

## 10. 新项目建议目录结构

推荐从更清晰的结构开始：

```text
src/
  app/
    (site)/
      page.tsx
      about/page.tsx
      contact/page.tsx
    api/
      contact/route.ts
      cms/...
    layout.tsx
    globals.css
  components/
    layout/
    sections/
    ui/
  content/
    pages/
    navigation.ts
  lib/
    cms/
    seo/
    validators/
    utils.ts
  styles/
    tokens.css
    typography.css
public/
  assets/
  uploads/
data/
  cms.db
```

原则：

- `components/sections` 放业务区块。
- `components/ui` 放通用 UI。
- `lib/cms` 放 CMS 数据和持久化逻辑。
- `content` 放静态内容或默认内容。
- `public/uploads` 只放运行期上传文件。

## 11. 新项目首版功能建议

建议第一版只做这些：

1. 公开页面：主页、关于、业务/内容页、联系页。
2. 通用布局：Header、Footer、SEO、404。
3. 响应式规则：先建立 token、shell、断点规范。
4. 内容来源：先用静态 JSON / Markdown。
5. 联系表单：服务端校验和基础防刷。
6. 部署脚本：standalone 构建、Nginx 配置、环境变量文档。

第二阶段再加：

1. CMS 登录。
2. 页面字段编辑。
3. 图片上传。
4. 版本草稿 / 发布。
5. 数据统计。
6. 可视化编辑器。

这样能避免一开始就把网站、CMS、文件系统、版本系统和视觉编辑全部绑在一起。

## 12. 建议的开发检查清单

每次重要改动前后检查：

- `pnpm install` 是否使用锁定版本。
- `pnpm run build` 是否通过。
- TypeScript 错误不应长期依赖 `ignoreBuildErrors`。
- 新增依赖是否真的必要。
- 图片是否放在正确位置：固定素材进 `src/assets` 或 `public/assets`，上传素材进 `public/uploads`。
- 页面是否有 SEO metadata。
- 移动端是否没有横向滚动。
- 1440px 和 1920px 是否都正常。
- 表单和 API 是否有服务端校验。
- 后台接口是否需要登录保护。
- 部署子路径是否影响图片和链接。

## 13. 结论

当前项目的核心可复用技术是：

- Next.js App Router；
- React + TypeScript；
- Tailwind CSS v4；
- Radix/shadcn 风格 UI；
- SQLite CMS；
- standalone 部署。

重建新网站时，建议先保留这条主线，但暂时不要继承完整 CMS、Puck、版本系统、多轮播库、MUI、Three 等复杂层。先做干净、稳定、响应式正确的公开网站，再按实际维护需求逐步增加后台能力。
