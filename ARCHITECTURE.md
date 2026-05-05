# Husuweb Official Site Architecture

最后更新于：2026-05-05 21:58

## 项目概述

本项目是基于既有 Figma/Vite 原型重新搭建的官网首版，当前纳入公开官网的九类运行页面：

- 首页：`/`
- About 页面：`/about`
- Core Value 子页面：`/about/core-value`
- 团队页面：`/team`
- 团队个人详情页：`/team/yuxuan-liu`
- 服务行业页面：`/industries`
- 行业详情页面：`/industries/[slug]`
- 事件页面：`/events`
- 事件详情页面：`/events/[slug]`
- 联系我们页面：`/contact`

`首页/`、`about 页/` 以及后来加入的 `事件/`、`事件详情/`、`服务行业/`、`联系我们/`、`我的团队/`、`core value/`、`个人介绍详情/` 目录仍保留为原型素材目录，不进入当前 Next 主应用运行链路。

## 技术栈

| 类型 | 当前使用 | 说明 |
| :--- | :--- | :--- |
| 框架 | Next.js App Router `15.5.14` | 使用 `src/app` 路由结构，生产输出为 standalone |
| UI 运行时 | React `18.3.1` / React DOM `18.3.1` | 与 `tech.md` 中上一版网站保持一致 |
| 语言 | TypeScript | 新项目不启用 `allowJs` |
| 样式 | Tailwind CSS v4 + CSS variables | `src/app/globals.css` 引入 Tailwind 和响应式 token |
| 字体 | Poppins 本地字体 | `src/app/layout.tsx` 通过 `next/font/local` 加载 `src/font/poppins.ttf`，全站 `body` 默认使用 |
| 图标 | `lucide-react` | 当前用于导航、卡片入口和少量控制图标 |
| 包管理器 | Yarn `1.22.22` | 用户决定改用 Yarn；`packageManager` 已切换 |

当前没有引入 CMS、Radix UI、MUI、motion、轮播库、Three、图表、拖拽等依赖；这些库在当前页面实现中没有实际运行需求。

## 目录结构

```text
src/
  app/
    about/
      core-value/
        page.tsx
      page.tsx
    contact/
      page.tsx
    events/
      [slug]/
        page.tsx
      page.tsx
    globals.css
    industries/
      [slug]/
        page.tsx
      page.tsx
    layout.tsx
    page.tsx
    team/
      yuxuan-liu/
        page.tsx
      page.tsx
  components/
    layout/
      SiteFooter.tsx
      SiteHeader.tsx
    pages/
      AboutPage.tsx
      ContactPage.tsx
      CoreValuePage.tsx
      EventDetailPage.tsx
      EventsPage.tsx
      HomePage.tsx
      IndustryDetailPage.tsx
      IndustriesPage.tsx
      TeamPage.tsx
      TeamProfilePage.tsx
    sections/
      about/
        AboutHero.tsx
        Chronicle.tsx
        Culture.tsx
        Honors.tsx
        Vision.tsx
    shared/
      ImageWithFallback.tsx
      PageTriangle.tsx
  styles/
    tokens.css
  font/
    poppins.ttf
public/
  assets/
    foot/
    home/
      clientLogo/
    title/
      logo.png
    prototypes/
      contact/
      core-value/
      event-detail/
      events/
      industries/
      team/
      team-profile/
next.config.ts
postcss.config.mjs
tsconfig.json
package.json
```

## 核心模块与数据流

```mermaid
flowchart TD
  RootLayout[src/app/layout.tsx] --> Home[src/app/page.tsx]
  RootLayout --> About[src/app/about/page.tsx]
  RootLayout --> CoreValueRoute[src/app/about/core-value/page.tsx]
  RootLayout --> Industries[src/app/industries/page.tsx]
  RootLayout --> IndustryDetailRoute[src/app/industries/[slug]/page.tsx]
  RootLayout --> Events[src/app/events/page.tsx]
  RootLayout --> EventDetailRoute[src/app/events/[slug]/page.tsx]
  RootLayout --> Contact[src/app/contact/page.tsx]
  RootLayout --> Team[src/app/team/page.tsx]
  RootLayout --> TeamProfileRoute[src/app/team/yuxuan-liu/page.tsx]
  Home --> HomePage[src/components/pages/HomePage.tsx]
  About --> AboutPage[src/components/pages/AboutPage.tsx]
  CoreValueRoute --> CoreValuePage[src/components/pages/CoreValuePage.tsx]
  IndustryDetailRoute --> IndustryDetailPage[src/components/pages/IndustryDetailPage.tsx]
  Industries --> IndustriesPage[src/components/pages/IndustriesPage.tsx]
  EventDetailRoute --> EventDetailPage[src/components/pages/EventDetailPage.tsx]
  Events --> EventsPage[src/components/pages/EventsPage.tsx]
  Contact --> ContactPage[src/components/pages/ContactPage.tsx]
  Team --> TeamPage[src/components/pages/TeamPage.tsx]
  TeamProfileRoute --> TeamProfilePage[src/components/pages/TeamProfilePage.tsx]
  HomePage --> Header[src/components/layout/SiteHeader.tsx]
  AboutPage --> Header
  CoreValuePage --> Header
  IndustryDetailPage --> Header
  IndustriesPage --> Header
  EventDetailPage --> Header
  EventsPage --> Header
  ContactPage --> Header
  TeamPage --> Header
  TeamProfilePage --> Header
  HomePage --> Footer[src/components/layout/SiteFooter.tsx]
  AboutPage --> Footer
  CoreValuePage --> Footer
  IndustryDetailPage --> Footer
  IndustriesPage --> Footer
  EventDetailPage --> Footer
  EventsPage --> Footer
  ContactPage --> Footer
  TeamPage --> Footer
  TeamProfilePage --> Footer
  Footer --> FootAssets[public/assets/foot/*]
  HomePage --> ImageFallback[src/components/shared/ImageWithFallback.tsx]
  HomePage --> ClientLogoAssets[public/assets/home/clientLogo/*]
  AboutPage --> AboutSections[src/components/sections/about/*]
  AboutSections --> ImageFallback
  CoreValuePage --> ImageFallback
  CoreValuePage --> PrototypeAssets
  IndustryDetailPage --> ImageFallback
  IndustryDetailPage --> PrototypeAssets
  IndustriesPage --> PrototypeAssets[public/assets/prototypes/*]
  IndustriesPage --> IndustryDetailRoute
  EventDetailPage --> ImageFallback
  EventDetailPage --> PrototypeAssets
  EventsPage --> PrototypeAssets
  EventsPage --> EventDetailRoute
  ContactPage --> PrototypeAssets
  TeamPage --> PrototypeAssets
  TeamPage --> TeamProfileRoute
  TeamProfilePage --> ImageFallback
  TeamProfilePage --> PrototypeAssets
  Globals[src/app/globals.css] --> Tokens[src/styles/tokens.css]
```

`src/app/**/page.tsx` 只保留路由入口和 metadata；页面展示组件统一放在 `src/components/pages/*` 下，业务区块和共享组件继续放在 `src/components/sections/*`、`src/components/layout/*`、`src/components/shared/*`。

`src/components/shared/PageTriangle.tsx` 提供跨页面复用的低层级直角三角形背景装饰，当前用于首页、About、Team、Industries 和 Events 页面，默认层级为 `z-0`，底部左侧顶点位于 Footer 顶部左侧 40% 位置，页面内透明度统一为 50%。

## Title 导航

`src/components/layout/SiteHeader.tsx` 根据 `OVERALL/title/word.md` 实现顶部 title 导航：

- 使用 `public/assets/title/logo.png` 作为左侧 logo；
- logo 显示高度在 16:24 版本基础上继续放大 `1.2` 倍；
- Header 内层上下 padding 为 `1.2rem`；
- 顶部固定吸顶，首屏透明，滚动后渐变为深色半透明背景；
- 滚动后出现底部分隔线和轻微毛玻璃；
- 桌面导航支持英文 / 中文标题切换；
- 桌面与移动端导航文字在 16:24 版本基础上继续放大 `1.4` 倍；
- 英文标题：Home、About us、Our team、Industries、Events、Contact；
- 中文标题：首页、关于我们、虎诉团队、服务行业、虎诉动态、联系我们；
- Our team 导航指向 `/team`；
- 当前页面文字保持白色并显示金色下划线；
- hover 时文字提亮，下划线从左向右展开；
- 移动端显示菜单按钮，点击后切换关闭图标并展示纵向菜单。

## Footer 页脚

`src/components/layout/SiteFooter.tsx` 根据 `OVERALL/foot/word.md` 统一为全站公共页脚：

- 所有公开页面均使用同一个 `SiteFooter`；
- 页脚素材来自 `public/assets/foot/*`，由 `src/assets/foot/*` 发布到 public；
- 第一行左侧使用 `logo.png`，右侧三行展示品牌理念文案；
- 第二行左侧地址前使用 `address.png`，右侧使用 `weixin.png`；
- 第三行电话和邮箱分别使用 `phone.png`、`email.png`，右侧显示 `QRcode.png`；
- 第四行展示版权、隐私声明、公安备案和 ICP 备案，其中公安备案前使用 `china.png`。

## 页面说明

### 首页 `/`

首页由单文件页面实现，包含：

- 首屏 Hero，主标题保持单行显示，字号按反馈缩小到上一版的 70%；
- Vision 引导屏外层不再使用专门背景图，背景色为 `#171717`；内部 Vision 卡片背景为从左上到右下的 `rgb(36, 36, 36) 9%`、`#303033`、`#403f3f`、`#514c45` 对角线渐变；
- Vision 卡片外侧左右边距为 `2.5rem`，内部内容通过计算 padding 继续和全站 title / `.site-shell` 内容线对齐；
- Vision 卡片不再叠加上下黑色遮罩，并将旋转 270 度的 Vision 标识放到卡片最右侧；
- Vision 正文固定为三行，并在 16:34 版本基础上继续放大 1.2 倍；
- Vision 的 Get To Know Us 按钮为非全宽按钮，默认白色背景、黑色文字，hover 时反色；
- Industries & Services 网格，标题使用 `#f6ebe4` 到 `#d9b27a` 的渐变，字号按反馈缩小到上一版的约 0.3 倍，说明正文放大到正文 token 的 1.8 倍并占满父容器宽度，卡片加入参考原型的图片灰度恢复、顶部高亮线、箭头入场和卡片上浮效果，不再显示标题下方正文描述；
- Honors 年份时间轴，使用 `useState` 支持左右按钮切换和点击年份切换，标题与右侧三行说明上下居中对齐，右侧说明继续放大 1.1 倍，active 内容标题放大 1.2 倍、正文放大 1.5 倍且不显示 See More；
- Events 三卡中心轮播，使用自定义状态和 CSS transition 实现中间主卡突出、两侧弱化、箭头与分页点切换，右侧说明固定为两行并放大 1.3 倍，图片与下方灰色说明盒断开并保留 `2rem` 外边距；
- Clients 三行横向滚动 Logo 墙，素材来自 `public/assets/home/clientLogo/*`，标题距离视窗左侧 `5rem`，支持反向滚动、无缝循环和 hover 暂停，动画时长调整为 `135s` 以降至原速度的 0.4 倍，左右黑色渐隐蒙层已移除；
- Footer / Contact 信息。

### About `/about`

About 页面由多个区块组件组成：

- `AboutHero`
- `Honors`
- `Culture`
- `Chronicle`

其中：

- `AboutHero` 内直接渲染 `VisionCard`，About 标题组从首屏 55% 位置开始并保持 `12rem` 内容线，左侧增加金色竖线；灰色方块从首屏 90% 位置开始，桌面左右外距为 `5rem`，卡片背景使用 `#585551` 到 `#2f2f2f` 的左上到右下渐变；
- `Vision.tsx` 保留 `VisionCard` 复用导出，右侧 Vision 标题与说明文字同排，See More 居中；
- `Honors` 使用 `useState` 做年份折叠交互，展开内容使用 `grid-rows` 过渡动画；标题区域使用 baseline 对齐并修正斜体裁切，年份头部始终保持深色背景，展开内容为黑色文字、黑色 View Award 边框和黑色日期，右侧 icon 只保留黄色图标本体；
- `Culture` 左侧图片参考 `官网首页设计` 的 WELCOME TO JOIN US 右侧图片 hover/leave 动效，区块为无外边距全屏宽度，高度约 `80vh`；图片主体区域不再叠加左侧棕色蒙层，图片最右侧到右侧 30% 区域叠加从 `#a88d61` 到透明的渐变，section 外层不设置额外背景色，主遮罩在左图主体区域保持透明，只在中间衔接位置过渡到右侧实色背景，右侧加入低透明度抽象品牌水印，右侧文案全部使用白色，`CULTURE` 标题加粗，`READ FULL MANIFESTO` 按钮使用 `#D9B27A` 背景；
- `Chronicle` 使用 `useState` 做年份折叠交互，年份按钮背景为 `#202020` 且边框为金色；展开卡片在靠近中轴一侧显示金色边框，月份标题下划线靠近中轴，正文为灰色并占卡片宽度 85%。

### Core Value `/about/core-value`

Core Value 页面基于 `core value/` 原型重建，仍归属 About 路由层级：

- 页面入口为 `src/app/about/core-value/page.tsx`，展示组件为 `src/components/pages/CoreValuePage.tsx`；
- 复用全站 `SiteHeader` 与 `SiteFooter`，顶部导航 active 仍为 ABOUT US；
- Hero 使用原型背景图，正文包含 About us / CULTURE / Core Value 面包屑；
- 三个价值观段落按原型结构展示，右侧使用对应原型图片；
- 结尾保留原型引用段落与引号图形。

页面需要的 Core Value 图片已复制到 `public/assets/prototypes/core-value/*`。

### Team `/team`

团队页面基于 `我的团队/` 原型重建，包含：

- Our team Hero，使用原型团队大图和灰色混合遮罩；
- WE ARE SPECIAL FORCES 标语区，标题分两行左对齐，WE ARE 与 SPECIAL 紧密排版，说明文案右对齐；
- Partner 与 Senior Associate 双列人物卡片分区，标题使用一致的 italic uppercase 格式；
- 人物卡片使用原型肖像素材，图片以绝对定位填满父元素并移除灰色蒙层，保留轻微放大；Find out more 为黄色文字和黄色下划线，不显示旁侧 icon；
- Find out more 使用 Next `Link` 跳转到同一团队路由层级下的 `/team/yuxuan-liu`；
- 复用全站导航和页脚。

页面需要的团队图片已复制到 `public/assets/prototypes/team/*`。

### Team Profile `/team/yuxuan-liu`

团队个人详情页基于 `个人介绍详情/` 原型重建：

- 页面入口为 `src/app/team/yuxuan-liu/page.tsx`，展示组件为 `src/components/pages/TeamProfilePage.tsx`；
- 复用全站 `SiteHeader` 与 `SiteFooter`，顶部导航 active 保持 OUR TEAM；
- 顶部保留 Our Team / Yuxuan Liu 面包屑和 Back to team 返回入口；
- 主体包含人物照片、姓名、职位、邮箱、Service Industries、Professional Qualification、Educational Background 和 Social Engagements；
- 下方展示 Experience& capabilities、Practice Experience 和 Performance & Achievements。

页面需要的个人简介图片已复制到 `public/assets/prototypes/team-profile/*`。

### Industries `/industries`

服务行业页面基于 `服务行业/` 原型重建，包含：

- 顶部 Industries Hero，标题右对齐并使用 `12rem` 右侧内容线；
- 行业服务说明引用卡片，左右外距为 `12rem` 内容线，背景为 `#464646` 到 `#787269` 渐变，保留原有引号装饰并改为黄色，文字为白色；
- 行业卡片网格按 1 / 3 / 2 三行布局，桌面左右外距为 `9rem`；卡片文字位于左下方并带黄色下划线，下划线占满扣除内边距后的内容宽度，第二行高度为第一行约 2.5 倍，第三行高度为第一行约 1.5 倍；
- 六个行业卡片均使用 Next `Link` 跳转到 `/industries/[slug]` 详情页；
- 复用页脚。

页面需要的原型图片已复制到 `public/assets/prototypes/industries/*`。

### Industry Detail `/industries/[slug]`

行业详情页面基于 `行业详情/` 原型重建：

- 页面入口为 `src/app/industries/[slug]/page.tsx`，展示组件为 `src/components/pages/IndustryDetailPage.tsx`；
- `generateStaticParams` 为六个行业生成静态参数；
- 复用全站 `SiteHeader` 与 `SiteFooter`，顶部导航 active 保持 INDUSTRIES；
- Hero 使用行业页原型背景图，包含 Industries / 当前行业的面包屑、金色标题和右侧行业说明；
- 内容区参考原型的左侧留白结构，使用深色内容卡片和圆点列表展示服务范围。

### Events `/events`

事件页面基于 `事件/` 原型重建，包含：

- Events 标题 Hero，标题和正文居中放在左右外距 `8rem`、高度 `40svh` 的渐变背景块中，页面外层仍保持深色背景；
- 事件卡片列表扩展为 9 条，按一行三个、三行展示，第二屏左右外距为 `6rem`，横向卡片间距为当前版 3 倍，纵向间距保持原来的 `gap-y-16`，不再显示 LATEST UPDATES 标题和下划线；
- 卡片图片保持彩色，位于卡片左上角，并相对容器向左上方偏移约 3.3%；
- 卡片内容只保留日期行和标题行，日期与图片间距为 `6rem`，标题字号缩小到当前 70%，日期行右侧显示黄色箭头，右下角浅色三角形高度为 `6%`；
- 卡片使用 Next `Link` 跳转到 `/events/[slug]` 事件详情页；
- See More 入口；
- 复用页脚。

页面需要的事件卡片图已复制到 `public/assets/prototypes/events/card.png`。

### Event Detail `/events/[slug]`

事件详情页面基于 `事件详情/` 原型重建：

- 页面入口为 `src/app/events/[slug]/page.tsx`，展示组件为 `src/components/pages/EventDetailPage.tsx`；
- `generateStaticParams` 为 9 条事件生成静态参数；
- 复用全站 `SiteHeader` 与 `SiteFooter`，顶部导航 active 保持 EVENTS；
- 顶部包含 Events / 当前事件的面包屑、事件标题、日期和金色分割线；
- 正文复用事件详情原型的两张图片、正文段落、教育背景和学术成就列表。

页面需要的事件详情图片已复制到 `public/assets/prototypes/event-detail/*`。

### Contact `/contact`

联系我们页面基于 `联系我们/` 原型重建，包含：

- Contact 标题区；
- Hero 下方 Contact us 双栏模块，左侧为金棕背景、黑色标题、黑色正文、黑色电话/邮箱和图标，右侧为城市图片；
- Join Us 招聘说明；
- 候选人要求卡片，卡片顶部使用金色下划线替代数字编号，下划线顶部间距加大且高度为当前版三倍；右侧三角形层级高于卡片背景、低于卡片内容，因此覆盖卡片背景但不遮挡文字和下划线；卡片背景为深色暖灰渐变，正文为偏灰白的粗斜体；
- 简历邮箱提示，内容右对齐；
- 联系信息页脚。

Contact 页常规内容区使用页面内 `contactShell`，桌面左边距为 `9rem`，右侧仍沿用全站内容线；Hero 下方 Contact us 双栏模块为全宽结构，左侧内容同样使用 `9rem` 左边距。
Join Us、候选人卡片和简历邮箱区域包裹在同一个相对容器内，右侧叠加 `#1d1d1d` 直角三角形背景；该容器通过 `pb-20 -mb-20` 抵消 Footer 自带顶部外边距，使斜边从 Contact us 图片右下方延伸到 Footer 顶部中间。

页面需要的城市图、logo、二维码已复制到 `public/assets/prototypes/contact/*`。

## 配置

`next.config.ts`：

- `output: "standalone"`；
- 读取 `NEXT_SNAPSHOT_BASE_PATH` 配置 `basePath`、`assetPrefix`、`trailingSlash`。

`tsconfig.json`：

- `strict: true`；
- `allowJs: false`；
- 排除原型目录：`首页`、`about 页`、`事件`、`服务行业`、`联系我们`、`官网首页设计`、`我的团队`、`core value`、`个人介绍详情`、`事件详情`、`行业详情`，避免旧 Vite 原型参与当前 Next 主应用类型检查。

`src/app/globals.css`：

- `body` 使用 `var(--font-poppins), Arial, Helvetica, sans-serif`，其中 `--font-poppins` 来自 `next/font/local`；
- 定义 `client-logo-scroll` keyframes；
- `.client-logo-row:hover .client-logo-track` 暂停当前 Logo 行动画；
- 仍保留 `prefers-reduced-motion` 全局降级策略。

`src/app/layout.tsx`：

- 通过 `next/font/local` 加载 `src/font/poppins.ttf`；
- 将字体变量 class 挂到 `<body>`，使全站文字默认走 Poppins 字体。

## 响应式与大屏缩放

`src/styles/tokens.css` 定义全局响应式 token，并使用 `--root-font-size` 控制大屏 rem 缩放：

  - rem 以 `1920px` 设计稿为基准，`1920px` 时 `1rem = 16px`；
  - `1440px` 时按比例缩放为 `1rem = 12px`；
  - `--root-font-size: clamp(12px, calc(100vw / 120), 16px)`；
  - 超宽屏最多保持 `16px`，避免 2K / 4K 屏无限放大；
- `--shell-sm` 和 `--shell-md` 在 `90rem` 以上统一为 `12rem`，因此全站 title 导航和 `.site-shell` 内容壳层桌面左右边距一致；
- `html` 在 `src/app/globals.css` 中通过 `font-size: var(--root-font-size)` 接入该策略。

页面壳层、标题、正文、按钮、卡片间距等优先使用 rem / token / Tailwind rem 类；图片、全屏高度和网格仍按语义使用 `svh`、百分比、宽高比和 `max-width`。

## 环境变量

| 变量 | 用途 | 默认 |
| :--- | :--- | :--- |
| `NEXT_SNAPSHOT_BASE_PATH` | 子路径部署时设置 Next basePath 和静态资源前缀 | 空字符串 |

当前首版公开页没有 CMS、数据库或后台登录环境变量。

## 安装与构建状态

当前会话已使用现有 `node_modules` 执行过 `npm run build` 并通过：

- Next.js 编译成功；
- TypeScript 检查成功；
- 静态页面生成成功，包含 `/`、`/about`、`/industries`、`/events`、`/contact`。

本次全站边距 token 调整后，为避免影响用户手动启动的本地 dev server，未执行会改写 `.next` 的生产构建；已执行 `.\node_modules\.bin\tsc.cmd --noEmit` 并通过。

## 更新日志

| 时间 | 分支 | 变更类型 | 描述 |
| :--- | :--- | :--- | :--- |
| 2026-05-04 17:32 | main | 新增功能 | 基于 `tech.md` 和 `ada.md` 搭建 Next 官网首版，迁移首页与 About 页面，最小化依赖并切换 Yarn |
| 2026-05-04 17:57 | main | 新增功能 | 接入服务行业、事件、联系我们三个新增原型页面，补充对应路由和公共素材 |
| 2026-05-04 18:03 | main | 优化重构 | 根据大屏自适应规范加入 rem 根字号缩放策略，并封顶到 22px |
| 2026-05-04 18:08 | main | 优化重构 | 将所有页面展示组件从 `src/app` 抽到 `src/components/pages`，路由文件仅保留 metadata 和入口 |
| 2026-05-04 18:33 | main | 优化重构 | 根据 `OVERALL/title/word.md` 重做顶部 title 导航，加入 logo、中英文切换、滚动背景和 hover 下划线动画 |
| 2026-05-04 22:54 | main | 新增功能 | 根据 `OVERALL/home/word.md` 重做首页 Hero、Vision、行业卡片、Honors 时间轴、Events 三卡轮播和 Clients Logo 墙交互 |
| 2026-05-04 22:54 | main | 配置变更 | 扩展 `tsconfig.json` 原型目录排除范围，使当前 Next 主应用构建和类型检查通过 |
| 2026-05-04 23:07 | main | 优化重构 | 根据 `OVERALL/about/word.md` 调整 About Hero 下方 Vision 卡片、Honors 折叠样式和 Chronicle 折叠时间轴 |
| 2026-05-04 23:21 | main | 优化重构 | 根据 `OVERALL/foot/word.md` 统一全站 Footer，并接入 foot 目录下的 logo、联系图标、二维码和备案图标 |
| 2026-05-04 23:29 | main | 优化重构 | 根据 `OVERALL/events/word.md` 调整 Events Hero 文案渐变、LATEST UPDATES 卡片 hover 动效和图片偏移 |
| 2026-05-04 23:41 | main | 优化重构 | 微调 About Honors 展开头部背景、Chronicle 中轴展开动效和 Culture 左图 hover/leave 动效 |
| 2026-05-04 23:41 | main | 配置变更 | 将 `我的团队` 原型目录加入 `tsconfig.json` 排除列表，避免旧原型依赖影响主应用类型检查 |
| 2026-05-04 23:43 | main | 新增功能 | 基于 `我的团队/` 原型新增 `/team` 团队页，接入导航、团队素材、人物卡片和全站页脚 |
| 2026-05-05 13:06 | main | 优化重构 | 根据首页补充反馈调整 Hero 单行、Vision 边距和旋转标题、按钮样式、标题字号、文案换行、Events 卡片间距和客户 Logo 速度 |
| 2026-05-05 13:21 | main | 优化重构 | 修正首页 Hero 字号、Vision 裁切、Industries 标题尺寸和 Events 轮播图片/灰卡连接问题 |
| 2026-05-05 13:21 | main | 配置变更 | 追加排除 `core value`、`个人介绍详情`、`事件详情`、`行业详情` 原型目录，恢复主应用类型检查 |
| 2026-05-05 13:31 | main | 新增功能 | 基于 `core value/` 原型新增 `/about/core-value` 子页面，并接入 Culture 的 Read Full Manifesto 按钮 |
| 2026-05-05 13:31 | main | 优化重构 | 调整 About Hero 灰色 Vision 卡片位置，简化 Culture 文案并更新右侧背景与左图渐变 |
| 2026-05-05 13:36 | main | 优化重构 | 调整 Team Hero 字号和全宽图片、Special Forces 两行排版、Senior Associate 标题位置，并移除人物图灰色蒙层 |
| 2026-05-05 13:39 | main | 新增功能 | 基于 `个人介绍详情/` 原型新增 `/team/yuxuan-liu` 个人详情页，并将 Team 卡片 Find out more 链接接入该路由 |
| 2026-05-05 13:48 | main | 新增功能 | 基于 `行业详情/` 原型新增 `/industries/[slug]` 行业详情页，并将 Industries 六个卡片接入详情路由 |
| 2026-05-05 13:48 | main | 优化重构 | 调整 Industries 卡片网格为 1 / 3 / 2 三行布局，第二行左侧 40% 宽、右侧两卡平分剩余宽度 |
| 2026-05-05 13:52 | main | 新增功能 | 基于 `事件详情/` 原型新增 `/events/[slug]` 事件详情页，并将 Events 卡片接入详情路由 |
| 2026-05-05 13:52 | main | 优化重构 | 调整 Events Hero 为居中标题正文和全屏渐变背景，并将 Latest Updates 改为三列三行 |
| 2026-05-05 16:13 | main | 优化重构 | 将全站 title 导航和主要内容壳层桌面左右边距统一调整为 `12rem` |
| 2026-05-05 16:20 | main | 优化重构 | 将全站 rem 缩放策略改为以 1920px 为基准，1440px 等比缩小 |
| 2026-05-05 16:24 | main | 优化重构 | 将公共 title logo 放大 1.3 倍，导航文字放大 1.4 倍 |
| 2026-05-05 16:26 | main | 优化重构 | 将公共 title logo 继续放大 1.2 倍、导航文字继续放大 1.4 倍，并设置上下 padding 为 `1.2rem` |
| 2026-05-05 16:27 | main | 优化重构 | 将首页 Hero 标题 `we know how to win` 字号放大 1.1 倍 |
| 2026-05-05 16:34 | main | 优化重构 | 调整首页 Vision 屏背景、卡片边距、三行正文和 Get To Know Us 按钮样式 |
| 2026-05-05 16:38 | main | 优化重构 | 修正首页 Vision 按钮默认白底黑字、卡片外距和右侧 Vision 定位 |
| 2026-05-05 16:41 | main | 优化重构 | 将首页 Vision 正文字号继续放大 1.2 倍，并修正左侧文字到视窗 12rem 内容线 |
| 2026-05-05 16:42 | main | 优化重构 | 将首页 Vision 右侧标识改为旋转 180 度，并将字号缩小到当前 90% |
| 2026-05-05 16:43 | main | 优化重构 | 将首页 Vision 右侧标识从 180 度调整为 270 度旋转 |
| 2026-05-05 16:44 | main | 优化重构 | 将首页 Industries & Services 说明正文放大到 1.8 倍并占满父容器 |
| 2026-05-05 16:46 | main | 优化重构 | 移除首页 Industries 卡片 hover 后标题下方的正文描述 |
| 2026-05-05 16:47 | main | 优化重构 | 移除首页 Industries 卡片区底部横线，并将 Honors 右侧说明文字放大 1.4 倍 |
| 2026-05-05 16:52 | main | 优化重构 | 调整首页 Honors 对齐与内容字号，移除 See More，并放大 Events 右侧说明和轮播卡片间距 |
| 2026-05-05 16:55 | main | 优化重构 | 调整首页 Clients 标题左边距为 `5rem`，并移除 Logo 墙左右黑色渐隐蒙层 |
| 2026-05-05 16:58 | main | 优化重构 | 调整 About Hero 标题组和灰色 Vision 方块的首屏垂直位置 |
| 2026-05-05 17:01 | main | 优化重构 | 将首页第二屏 Vision 背景改为重复纹理叠加横向渐变 |
| 2026-05-05 17:01 | main | 优化重构 | 修正首页 Vision 渐变纹理作用范围，将其从整屏背景移到卡片背景 |
| 2026-05-05 17:02 | main | 优化重构 | 移除首页 Vision 卡片背景纹理，改为左上到右下对角线渐变 |
| 2026-05-05 17:03 | main | 优化重构 | 移除首页 Vision 卡片上下黑色遮罩 |
| 2026-05-05 17:04 | main | 优化重构 | 调整首页 Vision 卡片渐变上部颜色，使其更偏灰 |
| 2026-05-05 17:05 | main | 优化重构 | 继续压暗首页 Vision 卡片渐变上部颜色 |
| 2026-05-05 17:05 | main | 优化重构 | 再次压暗首页 Vision 卡片渐变上部颜色 |
| 2026-05-05 17:17 | main | 优化重构 | 将首页 Vision 卡片渐变起始色标调整为 `rgb(36, 36, 36) 9%` |
| 2026-05-05 17:35 | main | 优化重构 | 接入 `src/font/poppins.ttf` 本地字体，使全站文字默认使用 Poppins |
| 2026-05-05 17:52 | main | 优化重构 | 调整 About Hero、Honors、Culture、Chronicle 的排版、渐变、颜色和展开样式 |
| 2026-05-05 17:59 | main | 优化重构 | 调整 Team 页 Special Forces 标题间距、Partner 分区和人物卡片链接样式 |
| 2026-05-05 18:08 | main | 优化重构 | 调整 Industries 页 Hero 对齐、说明卡片渐变和行业卡片网格尺寸 |
| 2026-05-05 18:12 | main | 优化重构 | 恢复 Industries 说明卡片引号装饰，并拉满行业卡片标题下划线 |
| 2026-05-05 18:17 | main | 优化重构 | 调整 Events Hero 渐变背景范围，移除第二屏标题并恢复卡片图片彩色 |
| 2026-05-05 18:22 | main | 优化重构 | 调整 Events Hero 与第二屏外距，并精简事件卡片内容 |
| 2026-05-05 18:23 | main | 优化重构 | 将 Events 第二屏事件卡片之间的间距扩大 3 倍 |
| 2026-05-05 18:24 | main | 优化重构 | 将 Events 卡片图片向上向左偏移量缩小到原来的 33% |
| 2026-05-05 18:26 | main | 优化重构 | 调整 Events 卡片日期与图片间距，并缩小右下角三角形高度 |
| 2026-05-05 18:27 | main | 优化重构 | 将 Events 卡片日期与图片间距继续增加 3rem |
| 2026-05-05 18:28 | main | 优化重构 | 缩小 Events 卡片标题字号并恢复卡片纵向间距 |
| 2026-05-05 20:40 | main | 优化重构 | 将 Contact 页主要内容左边距统一调整为 `9rem` |
| 2026-05-05 20:49 | main | 优化重构 | 修正 About Culture 区块背景色、图片压暗遮罩和右侧水印效果 |
| 2026-05-05 20:55 | main | 优化重构 | 降低 About Culture 主遮罩左侧透明度，避免覆盖整张左图 |
| 2026-05-05 20:59 | main | 优化重构 | 拉宽 About Culture 左图到右侧背景的棕金渐变过渡范围 |
| 2026-05-05 21:00 | main | 优化重构 | 去除 About Culture 左图主体区域的雾化遮罩效果 |
| 2026-05-05 21:02 | main | 优化重构 | 取消 About Culture 外层背景色和左图区域棕色蒙层 |
| 2026-05-05 21:03 | main | 优化重构 | 将 About Culture 区块改为全宽无外边距且高度约 80vh |
| 2026-05-05 21:05 | main | 优化重构 | 为 About Culture 左图右侧 30% 增加背景色到透明的渐变 |
| 2026-05-05 21:16 | main | 优化重构 | 将 Contact 城市图片模块移动到 Hero 下方，并改为左信息右图片双栏 |
| 2026-05-05 21:18 | main | 优化重构 | 将 Contact us 双栏模块左侧文字和图标改为黑色 |
| 2026-05-05 21:23 | main | 优化重构 | 调整 Contact 招聘卡片编号、简历邮箱对齐和右侧三角形背景 |
| 2026-05-05 21:25 | main | 优化重构 | 修正 Contact 右侧三角形背景终点，使其连接到 Footer 顶部中间 |
| 2026-05-05 21:26 | main | 优化重构 | 调整 Contact 候选人卡片下划线上边距和三角形覆盖层级 |
| 2026-05-05 21:28 | main | 优化重构 | 加粗 Contact 候选人卡片下划线，并将三角形改回底层背景 |
| 2026-05-05 21:29 | main | 优化重构 | 调整 Contact 三角形为高于卡片背景且低于卡片内容的中间层 |
| 2026-05-05 21:30 | main | 优化重构 | 调整 Contact 候选人卡片为截图效果的深色背景、三角形层级和粗斜体正文 |
| 2026-05-05 21:32 | main | 优化重构 | 将 Contact 右侧三角形锚点改到候选人卡片区域顶部 |
| 2026-05-05 21:36 | main | 优化重构 | 撤回上一轮 Contact 三角形锚点改动，恢复到招聘区整体容器 |
| 2026-05-05 21:50 | main | 新增功能 | 为首页、About、Team、Industries 和 Events 添加页面级低层级斜三角装饰 |
| 2026-05-05 21:54 | main | 优化重构 | 统一页面三角形形状和层级，并为 Contact 三角形增加 30% 透明度 |
| 2026-05-05 21:58 | main | 优化重构 | 将页面三角形透明度调整为 50%，并把非 Contact 页底部左顶点改到 40% |

## 项目进度

| 时间 | 分支 | 完成的功能 / 工作 | 说明 |
| :--- | :--- | :--- | :--- |
| 2026-05-04 17:32 | main | Next App Router 基础工程 | 新增 Next、TypeScript、Tailwind v4、standalone 配置 |
| 2026-05-04 17:32 | main | 首页迁移 | 将首页原型整理为 `/` 页面，保留主要视觉区块和响应式规则 |
| 2026-05-04 17:32 | main | About 页迁移 | 将 About 原型拆分为 Hero、Vision、Honors、Culture、Chronicle 区块 |
| 2026-05-04 17:32 | main | 依赖精简 | 只保留 Next、React、Tailwind、lucide-react 等当前页面实际需要的依赖 |
| 2026-05-04 17:57 | main | 服务行业页迁移 | 新增 `/industries`，重建 Hero、说明卡片和行业卡片网格 |
| 2026-05-04 17:57 | main | 事件页迁移 | 新增 `/events`，重建事件标题区和事件卡片列表 |
| 2026-05-04 17:57 | main | 联系我们页迁移 | 新增 `/contact`，重建招聘说明、要求卡片、城市图和联系页脚 |
| 2026-05-04 17:57 | main | 公共布局补充 | 新增 `SiteFooter`，扩展 `SiteHeader` 导航到五个公开页面 |
| 2026-05-04 18:03 | main | 大屏缩放策略 | 通过 `--root-font-size` 和 `html font-size` 实现 1440px 以上整体 rem 放大 |
| 2026-05-04 18:08 | main | 页面组件归档 | 新增 `src/components/pages/*`，集中承载首页、About、服务行业、事件、联系页面展示实现 |
| 2026-05-04 18:33 | main | Title 导航实现 | `SiteHeader` 改为固定透明导航，支持滚动毛玻璃、中英文切换、移动端菜单和 active/hover 下划线 |
| 2026-05-04 22:54 | main | 首页整体交互调整 | 根据首页需求文档完成 Hero 字号、Vision 渐变卡片、行业 hover 卡片、Honors 年份切换、Events 中心轮播和 Clients 三行 Logo 滚动 |
| 2026-05-04 22:54 | main | 首页客户 Logo 素材发布 | 将 `src/assets/home/clientLogo` 中的 43 个 Logo 复制到 `public/assets/home/clientLogo`，供首页静态访问 |
| 2026-05-04 22:54 | main | 构建检查修复 | 排除不参与运行的旧原型目录后，`npm run build` 已通过 |
| 2026-05-04 23:07 | main | About Vision 卡片调整 | 将 Vision 卡片改为灰色背景，右侧说明与 VISION 同行，See More 居中 |
| 2026-05-04 23:07 | main | About Honors 交互调整 | Honors 标题与正文首行对齐，展开背景改为 `#777777`，折叠动画改为平滑 grid 过渡 |
| 2026-05-04 23:07 | main | About Chronicle 交互调整 | Chronicle 改为年份折叠时间轴，复用 Honors & Awards 风格展开/折叠动效 |
| 2026-05-04 23:21 | main | 全站 Footer 统一 | 首页、About、服务行业、事件、联系我们页面统一复用 `SiteFooter` |
| 2026-05-04 23:21 | main | Footer 素材发布 | 将 `src/assets/foot` 中的 7 个图标/图片复制到 `public/assets/foot`，供页脚静态访问 |
| 2026-05-04 23:29 | main | Events Hero 调整 | Hero 文案区域加入黑色到 `#2f2a23` 的渐变背景 |
| 2026-05-04 23:29 | main | Events 卡片交互调整 | 第二屏卡片加入参考原型的边线、背景、图片和 Read More hover 动效，图片向左上偏移 10% |
| 2026-05-04 23:41 | main | About Honors 展开头部调整 | 展开后年份卡片头部保持深色背景，展开内容继续使用 `#777777` |
| 2026-05-04 23:41 | main | About Chronicle 动效调整 | Chronicle 改为参考原型的中轴年份按钮、月份项 hover 上移、节点发光和展开位移动效 |
| 2026-05-04 23:41 | main | About Culture 图片动效调整 | Culture 左侧图片加入 Join Us 图片同款遮罩、灰度、透明度和缩放 hover/leave 过渡 |
| 2026-05-04 23:43 | main | 团队页迁移 | 新增 `/team` 路由和 `TeamPage`，重建 Hero、Special Forces 标语区和 Senior Associate 人物卡片 |
| 2026-05-04 23:43 | main | 团队素材发布 | 将 `我的团队/src/imports/OurTeam` 中的图片复制到 `public/assets/prototypes/team` |
| 2026-05-04 23:43 | main | Team 导航接入 | `SiteHeader` 的 Our team 链接改为 `/team`，并支持团队页 active 状态 |
| 2026-05-05 13:06 | main | 首页 Hero 与 Vision 调整 | Hero 标题强制单行，Vision 区左右边距改为 `3rem`，Vision 标识旋转放在卡片最右侧，按钮改为 Discover More 风格 |
| 2026-05-05 13:06 | main | 首页内容排版调整 | Industries 标题放大并改为 `#f6ebe4` 到 `#d9b27a` 渐变，Honors/Events 右侧文案按指定行数换行 |
| 2026-05-05 13:06 | main | 首页轮播与客户墙调整 | Events 轮播图片和灰色说明盒间距改为 `2.5rem`，客户 Logo 墙动画时长改为 `135s` |
| 2026-05-05 13:21 | main | 首页 Hero 字号修正 | `we know how to win` 按当前版本缩小到 70%，并继续保持单行 |
| 2026-05-05 13:21 | main | 首页 Vision 显示修正 | Vision 卡片增加桌面最小高度，右侧旋转文字改为完整居中显示，避免裁切 |
| 2026-05-05 13:21 | main | 首页 Industries 与 Events 修正 | Industries 标题缩小到上一版约 0.3 倍，Events 轮播图片和灰色内容卡重新连接 |
| 2026-05-05 13:31 | main | About Hero Vision 位置调整 | 将灰色 Vision 方块嵌入 About Hero 标题与正文下方，移除 AboutPage 中独立 Vision 区块 |
| 2026-05-05 13:31 | main | About Culture 入口调整 | Culture 右侧背景改为 `#D9B27A`，正文只保留指定一句，并新增跳转 `/about/core-value` 的 Read Full Manifesto 按钮 |
| 2026-05-05 13:31 | main | Core Value 子页面 | 新增 `/about/core-value` 路由和 `CoreValuePage`，复用全站导航页脚并使用原型图片与三段价值观内容 |
| 2026-05-05 13:36 | main | Team Hero 与标语调整 | Hero 主图填满屏幕宽度，Our team 与副标题缩小到 85%，WE ARE SPECIAL FORCES 缩小到 80% 并改为两行左对齐 |
| 2026-05-05 13:36 | main | Team 人物区调整 | Senior Associate 标题移动到最后两张图片上方，人物卡片图片移除灰色蒙层并保持 100% 宽度对齐父元素 |
| 2026-05-05 13:39 | main | Team 个人详情页 | 新增 `/team/yuxuan-liu` 路由和 `TeamProfilePage`，展示个人照片、简介信息、执业经历和荣誉成就 |
| 2026-05-05 13:39 | main | Team Find out more 跳转 | 团队人物卡片的 Find out more 改为 Next `Link`，跳转到当前 Team 路由层级下的个人详情页 |
| 2026-05-05 13:48 | main | Industries 卡片布局调整 | 六个行业卡片改为第一行单卡、第二行三卡、第三行双卡的指定布局 |
| 2026-05-05 13:48 | main | 行业详情页 | 新增 `/industries/[slug]` 动态路由和 `IndustryDetailPage`，展示行业面包屑、说明文案和服务内容卡片 |
| 2026-05-05 13:52 | main | Events Hero 与列表调整 | Hero 标题和正文居中，背景改为 `#56524a` 到 `#212121` 全屏渐变，Latest Updates 改为九卡三列网格 |
| 2026-05-05 13:52 | main | 事件详情页 | 新增 `/events/[slug]` 动态路由和 `EventDetailPage`，复用事件详情原型图片与正文结构 |
| 2026-05-05 16:13 | main | 全站左右边距统一 | `--shell-sm` / `--shell-md` 桌面值统一为 `12rem`，Header 和 `.site-shell` 内容使用一致横向边距 |
| 2026-05-05 16:20 | main | rem 基准调整 | `--root-font-size` 改为 `clamp(12px, calc(100vw / 120), 16px)`，实现 1920 为设计基准、1440 等比缩小 |
| 2026-05-05 16:24 | main | Title 尺寸调整 | `SiteHeader` logo 高度放大 1.3 倍，桌面/移动导航和语言按钮文字放大 1.4 倍 |
| 2026-05-05 16:26 | main | Title 二次尺寸调整 | `SiteHeader` logo 高度继续放大 1.2 倍，导航和语言按钮文字继续放大 1.4 倍，Header 内层上下 padding 改为 `1.2rem` |
| 2026-05-05 16:27 | main | 首页 Hero 字号微调 | `we know how to win` 字号 clamp 从 `1.15rem/3.64vw/3.72rem` 放大到 `1.265rem/4.004vw/4.092rem` |
| 2026-05-05 16:34 | main | 首页 Vision 屏调整 | Vision 屏外层改为纯 `#171717`，卡片左右外距改为 `1.2rem`，正文三行显示并放大 1.1 倍，按钮改为白底黑字 |
| 2026-05-05 16:38 | main | 首页 Vision 微调 | Vision 卡片左右外距改为 `2.5rem`，右侧旋转 Vision 定位到视窗右侧 `12rem` 内容线，按钮默认样式强制为白底黑字 |
| 2026-05-05 16:41 | main | 首页 Vision 正文与对齐微调 | 正文字号 clamp 调整为 `1.65rem/2.64vw/2.772rem`，卡片内部 padding 修正为 `calc(var(--shell-md) - 1.3rem)` 以对齐视窗左侧 `12rem` |
| 2026-05-05 16:42 | main | 首页 Vision 标识微调 | 右侧 Vision 标识从 `rotate-90` 改为 `rotate-180`，字号 clamp 缩小到 `4.275rem/9vw/7.875rem` |
| 2026-05-05 16:43 | main | 首页 Vision 标识旋转调整 | 右侧 Vision 标识从 `rotate-180` 改为 `rotate-[270deg]` |
| 2026-05-05 16:44 | main | 首页 Industries 说明正文调整 | 说明段落从 `max-w-[90rem] text-[var(--type-body)]` 改为 `w-full text-[calc(var(--type-body)*1.8)]` |
| 2026-05-05 16:46 | main | 首页 Industries 卡片描述移除 | 删除行业卡片数据中的 `desc` 字段和卡片底部 hover 描述段落，仅保留标题、图片和箭头交互 |
| 2026-05-05 16:47 | main | 首页 Industries 与 Honors 微调 | 删除 Industries 卡片网格下方横线；Honors 标题区网格改为 `auto 1fr`，右侧说明字号改为 `clamp(1.4rem,1.68vw,1.96rem)` |
| 2026-05-05 16:52 | main | 首页 Honors 与 Events 微调 | Honors 顶部网格增加 `items-center`，右侧说明改为 `clamp(1.54rem,1.848vw,2.156rem)`，active 标题/正文放大并移除 See More；Events 右侧说明改为 `clamp(1.3rem,1.56vw,1.82rem)`，轮播图片和灰卡间距为 `2rem` |
| 2026-05-05 16:55 | main | 首页 Clients 屏微调 | Clients 标题容器改为 `pl-[5rem] pr-[var(--shell-md)]`，删除 Logo 墙左右两侧渐隐遮罩 |
| 2026-05-05 16:58 | main | About Hero 垂直位置微调 | About 标题组改为首屏 `55svh` 定位，灰色 Vision 方块改为首屏 `90svh` 定位，并增加 Hero 高度避免方块被截断 |
| 2026-05-05 17:01 | main | 首页 Vision 背景微调 | Vision 第二屏 section 使用 `repeating-linear-gradient` 纹理层和 90 度深灰到暖灰横向渐变背景 |
| 2026-05-05 17:01 | main | 首页 Vision 卡片背景修正 | 外层 section 恢复为 `#171717`，将 `repeating-linear-gradient` 纹理层和横向渐变移入 Vision 卡片背景 |
| 2026-05-05 17:02 | main | 首页 Vision 卡片渐变调整 | 删除 `repeating-linear-gradient` 纹理层，卡片背景改为 `linear-gradient(to bottom right, ...)` |
| 2026-05-05 17:03 | main | 首页 Vision 遮罩调整 | 删除卡片内部纵向黑色 overlay，避免卡片上下边缘继续发黑 |
| 2026-05-05 17:04 | main | 首页 Vision 上部灰度微调 | 卡片渐变前两个色标改为 `#4f4f52` 和 `#565659`，下部 `#403f3f`、`#514c45` 保持不变 |
| 2026-05-05 17:05 | main | 首页 Vision 上部亮度微调 | 卡片渐变前两个色标继续压暗为 `#2f2f32` 和 `#38383b`，下部色标保持不变 |
| 2026-05-05 17:05 | main | 首页 Vision 上部亮度二次微调 | 卡片渐变前两个色标继续压暗为 `#27272a` 和 `#303033`，下部色标保持不变 |
| 2026-05-05 17:17 | main | 首页 Vision 起始色标调整 | 卡片对角线渐变第一个色标改为 `rgb(36, 36, 36) 9%`，其余色标保持现有设置 |
| 2026-05-05 17:35 | main | 全站字体接入 | 使用 `next/font/local` 加载 `src/font/poppins.ttf`，并通过 `body` 字体栈覆盖全站默认文字 |
| 2026-05-05 17:52 | main | About 页视觉细节调整 | Hero 标题增加金色左线并对齐 12rem 内容线，Vision 卡片改为 5rem 外距和新渐变；Honors、Culture、Chronicle 按反馈统一颜色、字号、边框和展开内容样式 |
| 2026-05-05 17:59 | main | Team 页人物区微调 | 去掉 WE ARE 与 SPECIAL 之间的大间隔，新增 Partner 标题，人物图片填满父容器，Find out more 去掉 icon 并保留黄色下划线 |
| 2026-05-05 18:08 | main | Industries 页布局微调 | Hero 标题改为右侧 12rem 对齐，说明卡片使用指定灰金渐变和对角黄色边框，行业卡片区改为 9rem 外距、左下文字与 1/2.5/1.5 行高比例 |
| 2026-05-05 18:12 | main | Industries 页细节修正 | 说明卡片从对角边框恢复为原有引号装饰并改为黄色；行业卡片标题下划线改为内容区域全宽 |
| 2026-05-05 18:17 | main | Events 页视觉微调 | Hero 渐变块改为 6rem 左右外距和 40svh 高度；第二屏移除 LATEST UPDATES 标题/下划线，卡片图片去除灰度遮罩并保持左上 -10% 偏移 |
| 2026-05-05 18:22 | main | Events 页卡片内容微调 | Hero 渐变块左右外距改为 8rem，第二屏外距改为 6rem；事件卡片删除摘要和 Read More，只保留日期、黄色箭头和标题 |
| 2026-05-05 18:23 | main | Events 卡片间距微调 | 第二屏网格间距从 `gap-x-8 gap-y-16` 改为 `gap-x-24 gap-y-48` |
| 2026-05-05 18:24 | main | Events 卡片图片偏移微调 | 卡片图片容器从 `-left-[10%] -top-[10%]` 改为 `-left-[3.3%] -top-[3.3%]` |
| 2026-05-05 18:26 | main | Events 卡片内容间距微调 | 内容区顶部 padding 改为 `calc(54% + 3rem)`，右下角三角形高度从 `18%` 改为 `6%` |
| 2026-05-05 18:27 | main | Events 卡片日期间距二次微调 | 内容区顶部 padding 从 `calc(54% + 3rem)` 改为 `calc(54% + 6rem)` |
| 2026-05-05 18:28 | main | Events 卡片字号与间距微调 | 标题字号 clamp 调整为当前 70%，第二屏网格纵向间距从 `gap-y-48` 恢复为 `gap-y-16` |
| 2026-05-05 20:40 | main | Contact 页边距调整 | 新增页面内 `contactShell`，让 Hero、Join Us、候选人卡片和邮箱提示区桌面左边距统一为 `9rem` |
| 2026-05-05 20:49 | main | About Culture 视觉修正 | Culture 基础背景改为 `#a88d61`，左图降透明并叠加棕金 multiply 遮罩，主过渡改为深棕金多层渐变，右侧增加约 0.1 透明度的抽象品牌水印 |
| 2026-05-05 20:55 | main | About Culture 遮罩微调 | 主过渡遮罩左侧透明度从较高覆盖改为低透明度，并将实色过渡区域右移，保留左侧图片可见度 |
| 2026-05-05 20:59 | main | About Culture 渐变范围微调 | 主遮罩改为从 18% 到 78% 持续递增透明度的多段棕金过渡，避免渐变只集中在图片右侧小范围 |
| 2026-05-05 21:00 | main | About Culture 图片清晰度微调 | 主遮罩 0%-42% 改为透明，图片 opacity 提高到 `0.68`，棕金 multiply 遮罩降低到 `35%`，避免左图雾化 |
| 2026-05-05 21:02 | main | About Culture 背景与左图蒙层调整 | 删除 section / 容器 `#a88d61` 背景类，并移除左图区域 `#9f8458` multiply 蒙层 |
| 2026-05-05 21:03 | main | About Culture 尺寸调整 | 删除 `mx-auto max-w-[120rem]` 宽度限制，容器改为 `w-full min-h-[80vh]`，左图桌面高度同步为 `80vh` |
| 2026-05-05 21:05 | main | About Culture 图片右侧渐变 | 在左图内部增加 `linear-gradient(to left, #a88d61 0%, rgba(168, 141, 97, 0) 30%)`，让图片右缘衔接右侧背景 |
| 2026-05-05 21:16 | main | Contact 信息模块调整 | 移除底部独立城市图模块，在 Hero 后新增全宽 80vh 双栏模块：左侧 Contact us 文案、电话/邮箱图标信息，右侧展示城市图 |
| 2026-05-05 21:18 | main | Contact 信息模块颜色调整 | Contact us 模块左侧标题、正文、电话、邮箱和 Phone/Mail 图标统一改为黑色 |
| 2026-05-05 21:23 | main | Contact 招聘区视觉调整 | 候选人卡片的 1/2/3/4 数字替换为金色下划线，简历邮箱提示右对齐，并为 Contact us 下方到 Footer 前区域增加 `#1d1d1d` 右侧直角三角形背景 |
| 2026-05-05 21:25 | main | Contact 三角形连接修正 | 三角形背景容器增加 `pb-20 -mb-20`，覆盖 Footer `mt-20` 形成的间隙，让斜边终点对齐 Footer 顶部正中间 |
| 2026-05-05 21:26 | main | Contact 卡片层级微调 | 候选人卡片下划线增加 `mt-16`，三角形背景层级提高到卡片背景上方，卡片下划线和正文保持更高层级避免被遮挡 |
| 2026-05-05 21:28 | main | Contact 卡片下划线与背景修正 | 候选人卡片下划线从 `h-0.5` 改为 `h-1.5`，三角形背景层级从 `z-20` 改回 `z-0`，作为区域背景板显示 |
| 2026-05-05 21:29 | main | Contact 卡片层级二次修正 | 卡片背景拆为内部 `z-0` 背景层，三角形设为 `z-20`，卡片下划线和正文保持 `z-30`，实现三角形盖住卡片背景但不遮挡内容 |
| 2026-05-05 21:30 | main | Contact 卡片截图效果调整 | 移除卡片区 `z-10` stacking context，确保内容 `z-30` 高于三角形；卡片背景改为深色暖灰渐变，正文改为粗斜体灰白文字 |
| 2026-05-05 21:32 | main | Contact 三角形位置修正 | 三角形 overlay 从整个招聘区容器移入候选人卡片 grid，起点对齐卡片区右上角，高度向下延伸覆盖到 Footer 前 |
| 2026-05-05 21:36 | main | Contact 三角形位置回退 | 撤回 `21:32` 的卡片 grid 锚点调整，三角形 overlay 恢复为招聘区整体容器的绝对定位背景 |
| 2026-05-05 21:50 | main | 页面级三角形背景 | 新增 `PageTriangle` 共享组件，并在 Home、About、Team、Industries、Events 页面按各自区块起点放置低层级 `#1d1d1d` 斜三角背景 |
| 2026-05-05 21:54 | main | 页面三角形层级与透明度调整 | `PageTriangle` 默认形状改为 `polygon(100% 0, 100% 100%, 50% 100%)` 且层级为 `z-0`；Contact 页三角形保持 `z-20` 并增加 `opacity-30` |
| 2026-05-05 21:58 | main | 页面三角形透明度与顶点调整 | `PageTriangle` 默认形状改为 `polygon(100% 0, 100% 100%, 40% 100%)`，Home/About/Team/Industries/Events 使用 `opacity-50`；Contact 页三角形从 `opacity-30` 改为 `opacity-50` |
