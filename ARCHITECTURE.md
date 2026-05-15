# Husuweb Official Site Architecture

最后更新于：2026-05-15 22:51

## 项目概述

本项目是基于既有 Figma/Vite 原型重新搭建的官网首版，当前纳入公开官网的九类运行页面：

- 首页：`/`
- About 页面：`/about`
- Core Value 子页面：`/about/core-value`
- 团队页面：`/team`
- 团队个人详情页：`/team/[slug]`，其中 `/team/yuxuan-liu` 保持兼容入口
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
| 字体 | Poppins 字体文件 | `src/app/layout.tsx` 注入 `@font-face`，本地默认读取 `/font/poppins.ttf`，生产可通过 OSS 资源前缀读取远程字体 |
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
      [slug]/
        page.tsx
      yuxuan-liu/
        page.tsx
      page.tsx
  components/
    layout/
      AppProviders.tsx
      SiteFooter.tsx
      SiteHeader.tsx
      ViewportZoomLock.tsx
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
      core-value/
        CoreValueScrollFlow.tsx
    shared/
      BackToTop.tsx
      ImageWithFallback.tsx
      PageTriangle.tsx
      SubpageBreadcrumb.tsx
  data/
    eventInfoImages.ts
    events.ts
    industryMetadata.ts
    teamProfiles.ts
  i18n/
    copy.ts
    LanguageProvider.tsx
  lib/
    assets.ts
    returnPosition.ts
  styles/
    tokens.css
  font/
    poppins.ttf
public/
  assets/
    about/
      aboutVision.png
      hero.png
    contact/
      hero.png
    core/
      core1.png
      core2.png
      core3.png
    event/
      event1.png ... event15.png
      event16.jpg
      event17.png
      event18.jpg
      event19.png ... event42.png
      eventinfo/
      event2/
      eventinfo2/
      hero.png
    foot/
    home/
      hero.png
      INDUSTRIES1.png
      INDUSTRIES2.png
      INDUSTRIES3.png
      INDUSTRIES4.png
      INDUSTRIES5.png
      event1.png
      event2.png
      event3.png
      clientLogo/
    industries/
      hero.png
      in1.png
      in2.png
      in3.png
      in4.png
      in5.png
      in6.png
    team/
      hero.png
      team1.png
      team2.png
      team3.png
      team4.png
      team5.png
      team6.png
    title/
      logo.svg
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
  RootLayout[src/app/layout.tsx] --> AppProviders[src/components/layout/AppProviders.tsx]
  RootLayout --> ViewportZoomLock[src/components/layout/ViewportZoomLock.tsx]
  AppProviders --> LanguageProvider[src/i18n/LanguageProvider.tsx]
  LanguageProvider --> Copy[src/i18n/copy.ts]
  AppProviders --> Home[src/app/page.tsx]
  AppProviders --> About[src/app/about/page.tsx]
  AppProviders --> CoreValueRoute[src/app/about/core-value/page.tsx]
  AppProviders --> Industries[src/app/industries/page.tsx]
  AppProviders --> IndustryDetailRoute[src/app/industries/[slug]/page.tsx]
  AppProviders --> Events[src/app/events/page.tsx]
  AppProviders --> EventDetailRoute[src/app/events/[slug]/page.tsx]
  AppProviders --> Contact[src/app/contact/page.tsx]
  AppProviders --> Team[src/app/team/page.tsx]
  AppProviders --> TeamProfileRoute[src/app/team/[slug]/page.tsx]
  AppProviders --> TeamProfileLegacyRoute[src/app/team/yuxuan-liu/page.tsx]
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
  TeamProfileLegacyRoute --> TeamProfilePage
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
  Header --> LanguageProvider
  Footer --> LanguageProvider
  HomePage --> Copy
  AboutSections --> Copy
  CoreValuePage --> Copy
  IndustriesPage --> Copy
  EventsPage --> Copy
  EventDetailPage --> Copy
  ContactPage --> Copy
  TeamPage --> Copy
  HomePage --> ImageFallback[src/components/shared/ImageWithFallback.tsx]
  HomePage --> ClientLogoAssets[public/assets/home/clientLogo/*]
  HomePage --> HomeEventAssets[public/assets/home/event1-3.png]
  AboutPage --> AboutSections[src/components/sections/about/*]
  AboutSections --> ImageFallback
  CoreValuePage --> ImageFallback
  CoreValuePage --> CoreValueScrollFlow[src/components/sections/core-value/CoreValueScrollFlow.tsx]
  CoreValueScrollFlow --> CoreAssets[public/assets/core/core1-3.webp]
  CoreValuePage --> PrototypeAssets
  IndustryDetailPage --> ImageFallback
  IndustryDetailRoute --> IndustryMetadata[src/data/industryMetadata.ts]
  IndustryDetailPage --> PrototypeAssets
  IndustriesPage --> PrototypeAssets[public/assets/prototypes/*]
  IndustriesPage --> IndustryDetailRoute
  EventDetailPage --> ImageFallback
  EventDetailPage --> EventsData[src/data/events.ts]
  EventDetailPage --> ReturnPosition[src/lib/returnPosition.ts]
  EventDetailPage --> PrototypeAssets
  EventsPage --> EventsData
  EventsPage --> ReturnPosition
  EventsPage --> PrototypeAssets
  EventsPage --> EventDetailRoute
  ContactPage --> PrototypeAssets
  TeamPage --> PrototypeAssets
  TeamPage --> TeamProfileRoute
  TeamPage --> TeamProfilesData[src/data/teamProfiles.ts]
  TeamProfilePage --> ImageFallback
  TeamProfilePage --> TeamProfilesData
  TeamProfilePage --> PrototypeAssets
  Globals[src/app/globals.css] --> Tokens[src/styles/tokens.css]
```

`src/app/**/page.tsx` 只保留路由入口和 metadata；页面展示组件统一放在 `src/components/pages/*` 下，业务区块和共享组件继续放在 `src/components/sections/*`、`src/components/layout/*`、`src/components/shared/*`。

`src/components/shared/PageTriangle.tsx` 提供跨页面复用的低层级直角三角形背景装饰，当前用于首页、About、Team、Industries 和 Events 页面，默认层级为 `z-0`，底部左侧顶点位于 Footer 顶部左侧 40% 位置。首页和 About 使用 `isolate` 建立独立层级，三角形保持 `z-0`，在页面实际内容 `z-10` 之下，并将透明度降到 10%，以背景纹理方式存在而不压住文字、按钮和卡片；Team 页内容区统一提升为 `z-10`，三角形透明度降为 20%，避免遮挡团队列表；首页 `SiteHeader` 作为 `main` 顶层固定元素渲染，避免被 Hero section 的 stacking context 限制。

`src/components/shared/SubpageBreadcrumb.tsx` 提供子页面统一面包屑，字号按 24px 换算为 `1.5rem`，分隔符为 `/`，父级和当前项点击时优先执行 `router.back()` 返回上一页，无历史记录时回退到指定父级路由。`src/components/shared/BackToTop.tsx` 提供子页面右下角固定返回按钮，中文为“返回”，英文为 `Back`，点击优先返回上一页、无历史记录时回到首页，使用金色文字、金色下划线和 hover 收缩动效。

## 图片加载与媒体优化

`src/lib/assets.ts` 提供 `assetUrl()` 统一处理静态资源 URL；未配置 `NEXT_PUBLIC_ASSET_BASE_URL` 时继续使用本地 `/assets/*` 与 `/font/*`，配置后会将图片、视频和字体切换到 OSS 前缀。`src/components/shared/ImageWithFallback.tsx` 统一为图片输出 `decoding="async"`，并通过 `assetUrl()` 同时处理 OSS 前缀和 `/offweb` 子路径部署下的 basePath 前缀。

- 首屏 Hero、团队详情首屏人物图等关键首屏图片显式使用 `loading="eager"` 和 `fetchPriority="high"`。
- 页面级 Hero 媒体默认保持上一版移动端 `h-full w-screen min-w-full max-w-none object-cover` 铺满策略；仅 Our Team 列表页 Hero 图在手机端使用 `!w-full !h-auto max-w-none`，取消 `height: 100%` 并让图片按宽度 100% 展示，桌面端仍通过 `md:inset-0 md:!h-full` 铺满容器高度。首页、About、团队详情、Industries、行业详情、Events、Contact 和 Core Value 的首屏标题增加移动端较小字号，`md` 以上保持原设计稿字号。
- About Hero 当前引用 `/assets/about/hero.png`；Team 页 Hero 高度为 `67.5rem`，团队个人详情页首屏使用 `profileHeroImages` 按 `yuxuan-liu` 到 `weifan-qiu` 映射 `/assets/team/1.png` 至 `/assets/team/6.png`，Hero 高度为 `45.9375rem`，图片以 `object-cover` 铺满对应 Hero 容器宽高。
- 客户 Logo、页脚图标、About 展开背景、Core Value 移动端图文卡片等非首屏纯展示图片使用 `loading="lazy"`；带 `group-hover:scale-*` 的交互图片改用默认加载并显式 `decoding="sync"`，避免首次 hover 时图片才解码导致直接跳到放大状态。
- `public/assets` 中当前页面实际引用的大图生成 WebP 版本并切换代码引用；首页 Hero 改用 `/assets/home/海浪0508.mp4`，不再使用压缩图片，并通过 `assetUrl()` 在生产环境读取 OSS 视频；About、Team、Industries、Events、Contact 和 Core Value 的 Hero 图保持 PNG 展示，其他非 Hero 页面和卡片大图继续使用 WebP。
- `public/font/poppins.ttf` 为本地开发和未配置 OSS 的部署提供字体静态访问；同一字体已上传到 OSS 的 `/husuweb/font/poppins.ttf`。
- Core Value 长滚动图片动画在 `CoreValueScrollFlow` 中通过 `requestAnimationFrame` 合并滚动更新，并用 `IntersectionObserver` 在区块远离视口时暂停滚动计算。
- `/offweb` 发布包整理时会从 `dist/offweb/public` 移除已经由 WebP 替代的原始大图，减少上传体积和服务器磁盘占用；源码 public 目录保留原图作为素材备份。

## 中文文案与语言切换

`src/app/layout.tsx` 通过 `src/components/layout/AppProviders.tsx` 包裹全站内容，`AppProviders` 只负责挂载 `src/i18n/LanguageProvider.tsx`。

- `LanguageProvider` 是客户端上下文，保存 `en` / `zh` 当前语言，并写入 `localStorage` 的 `tiger-language`；切换时同步更新 `document.documentElement.lang` 为 `en` 或 `zh-CN`。
- `src/i18n/copy.ts` 集中维护页面级中英文文案，中文来源对应 `Chinese/*page.md`，包括首页、About、Core Value、Team、Industries、Events、Contact、页脚和通用按钮文案；团队页中文口号显示为“我们，/ 即为精锐之师”，Contact 中文联系文案统一为“如您有任何法律疑问或争议，欢迎随时与我们联系。我们诚挚期待为您提供专业的法律服务，致力于维护您的合法权益。”。
- `SiteHeader` 的语言按钮不再维护局部状态，而是调用全站 `toggleLanguage`；因此页头、页脚和页面主体会同步切换。按钮显示目标语言，英文页面显示 `CN`，中文页面显示“英”。
- `src/data/events.ts` 以 `EN/event.md` 的 28 条事件日期作为官网 Events 导出范围，并保留事件的中英文 category、title、summary、正文段落和真实事件图片；Events 列表页和事件详情页通过 `localizeEvent` 按当前语言显示；中文日期显示为 `YYYY.MM.DD`，英文日期显示为 `Mon. D, YYYY`；中文本地化输出会识别标题中的“虎诉动态 / 行业资讯 / 虎眼观察”前缀并规范化为 category，无分类标题不会渲染前置分隔符。
- `src/data/eventInfoImages.ts` 按旧 28 条 Events 的导出顺序，将 `src/assets/event/eventinfo` 中 22 张详情图片映射到含占位符的旧事件；`src/data/event2Events.ts` 承载 `EN/event2.md` 和 `Chinese/event2.md` 的 15 条新增事件，列表图读取 `/assets/event/event2/*`，其中 2026 年前三条按新版素材使用 `1.jpg`、`2.jpg`、`3.png`，同时 public 和 OSS 保留 `1.png`、`2.png`、`3.jpg` 兼容旧 URL；详情页占位图按事件顺序映射 `/assets/event/eventinfo2/*`，并为指定事件通过 `detailVideos` 绑定详情视频；`src/data/events.ts` 将新增事件前置合并到官网 Events 数据，并通过可选 `detailImages` / `detailVideos` 支持详情页正文插图和视频；Events 列表进入详情时会同时保存滚动位置和 See More 展开状态，返回后先恢复展开状态再滚动到原位置。
- 首页 `HONORS` 的中文年度荣誉数据来自 `Chinese/awards.md`，首页 `Events` 三卡轮播通过 slug 复用 `src/data/events.ts` 的真实事件数据，并由 `localizeEvent` 按语言输出标题、摘要、日期和图片。
- About 页 `Honors` 展开列表按 `Chinese/awards.md` 增加中文镜像数据，并保留英文数据里的微信公众号链接；`Chronicle` 按 `EN/CHRONICLE.md` 和 `Chinese/CHRONICLE.md` 的完整句子生成中英文年份时间线，并按源文档校准 2026 年一月、三月、四月、五月记录。
- 团队页人物卡片在 `src/data/teamProfiles.ts` 中补充 `zhName`、`zhTitle`，团队个人详情页在同一数据源中补充 `zh` 详情对象，来源均为 `Chinese/teamInfo.md`；个人业绩条目已按 `EN/teamInfo.md` 和 `Chinese/teamInfo.md` 完整同步，避免压缩或遗漏。
- 行业详情页在 `src/components/pages/IndustryDetailPage.tsx` 中为六个行业补充 `zhIndustries`，中文标题、简介和服务范围来源为 `Chinese/industriesInfo.md`；英文状态下 Private Equity、Real Estate、Sports and E-Sports、Cyber Tech and Game 的服务范围按 `EN/industriesInfo.md` 补齐保全范围和前置说明；服务端 `generateMetadata` 和 `generateStaticParams` 使用 `src/data/industryMetadata.ts`，避免从客户端页面组件读取数据。
- 当前中文接入以页面级文案和主要列表摘要为主，未改变路由逻辑。

## Title 导航

`src/components/layout/SiteHeader.tsx` 根据 `OVERALL/title/word.md` 实现顶部 title 导航：

- 使用 `public/assets/title/logo.svg` 作为左侧 logo；
- logo 使用 SVG，宽度固定为 `5.375rem`，即 86px，高度自适应；
- Header 内层上下 padding 为 `1.2rem`；
- 顶部固定吸顶，首屏透明，滚动后渐变为深色半透明背景；
- 滚动后出现底部分隔线和轻微毛玻璃；
- 桌面导航支持英文 / 中文标题切换；
- 语言状态来自 `LanguageProvider`，可同步驱动页面主体和页脚文案；
- 桌面与移动端导航文字在 16:24 版本基础上继续放大 `1.4` 倍；
- 英文标题：HOME、ABOUT US、OUR TEAM、INDUSTRIES、EVENTS、CONTACT，源码直接使用大写文案而不是 CSS 强制转换；
- 中文标题：首页、关于我们、虎诉团队、服务行业、虎诉动态、联系我们；
- Our team 导航指向 `/team`；
- 当前页面文字保持白色并显示金色下划线，下划线厚度为 `0.125rem`；
- hover 时文字提亮，下划线从左向右展开，展开线条厚度同样为 `0.125rem`；
- 移动端显示菜单按钮，点击后切换关闭图标并展示纵向菜单。

## Footer 页脚

`src/components/layout/SiteFooter.tsx` 根据 `OVERALL/foot/word.md` 统一为全站公共页脚：

- 所有公开页面均使用同一个 `SiteFooter`；
- 页脚素材来自 `public/assets/foot/*`，由 `src/assets/foot/*` 发布到 public；
- 第一行左侧使用 `logo.svg`，宽度固定为 `9.5rem`，即 152px，高度自适应；右侧三行展示品牌理念文案；
- 第一行右侧品牌理念、第二行地址、版权文案会根据当前语言在 English / 中文之间切换；
- 第二行左侧地址前使用 `address.png`，右侧使用 `weixin.png`；
- 第三行电话和邮箱分别使用 `phone.png`、`email.png`，右侧显示由 `src/assets/foot/QRcode.png` 发布的 `QRcode.png`，资源替换后需同步覆盖 `public/assets/foot/QRcode.png`、`dist/offweb/public/assets/foot/QRcode.png` 和 OSS；Footer 二维码路径带 `?v=202605112333` 版本参数以避开浏览器旧缓存，展示样式使用 `object-contain` 避免二维码被裁切；
- 第四行展示版权、隐私声明、公安备案和 ICP 备案，其中公安备案前使用 `china.png`；公安备案号链接到 `beian.mps.gov.cn`，ICP 备案号链接到 `beian.miit.gov.cn`；`Disclaimer and Privacy` 为按钮，点击后打开站内 modal，并根据当前语言展示中英文免责声明与隐私条款，右上角关闭按钮可关闭弹窗。

## 页面说明

### 首页 `/`

首页由单文件页面实现，包含：

- 首屏 Hero 使用本地视频 `/assets/home/海浪0508.mp4` 作为全屏背景，视频 `autoPlay/muted/loop/playsInline` 并保持 `opacity-90`；主标题保持单行显示，文本直接使用大写 `WE KNOW HOW TO WIN`，按 1920 设计基准将 100px 换算为 `6.25rem`，通过 `.hero-flow-text` 使用多段金色渐变和 `hero-flow-shine` keyframes 实现流光文字效果；
- Vision 引导屏外层不再使用专门背景图，背景色为 `#171717`；内部 Vision 卡片背景为从左上到右下的 `rgb(36, 36, 36) 9%`、`#303033`、`#403f3f`、`#514c45` 对角线渐变；
- Vision 卡片外侧左右边距为 `2.5rem`，内部内容通过计算 padding 继续和全站 title / `.site-shell` 内容线对齐；
- Vision 卡片不再叠加上下黑色遮罩，并将旋转 270 度、正常字重且不强制大写的 Vision 标识放到卡片最右侧；英文 Vision 标识为 `8.75rem`，中文“虎诉愿景”缩小到 80%，即 `7rem`；
- Vision 正文英文固定为三行，按 1920 设计基准将 40px 换算为 `2.5rem`，其中 `We are committed to` 使用细体斜体，后续内容使用粗体；中文状态字号缩小到英文的 80%，即 `2rem`；
- Vision 的 Get To Know Us 按钮为非全宽按钮，默认白色背景、黑色文字，hover 时反色；文字按 24px 换算为 `1.5rem`；
- Industries & Services 网格，标题使用 `#f6ebe4` 到 `#d9b27a` 的渐变并按 90px 换算为 `5.625rem`；说明正文按 28px 换算为 `1.75rem`、细体斜体并占满父容器宽度，正文下方显示一条灰色横线；前五张卡片图片使用本地 `/assets/home/INDUSTRIES1.webp` 到 `/assets/home/INDUSTRIES5.webp`，第六张在 `INDUSTRIES6` 尚未提供前保留原图片；Real Estate 图片由 `src/assets/home/INDUSTRIES3.png` 重新发布并生成 `/assets/home/INDUSTRIES3.webp`；卡片标题按 36px 换算为 `2.25rem`，卡片加入参考原型的图片灰度恢复、顶部高亮线、箭头入场和卡片上浮效果；每张卡片按自身 slug 跳转到 `/industries/[slug]`；
- Honors 年份时间轴，使用 `useState` 支持左右按钮切换和点击年份切换；默认 active 为 2026；首页年份按钮补齐 2026、2025、2024、2023、2022、2021、2020、2019 八个年份，但年份条一次只展示 5 个年份；左右按钮控制当前选中年份逐项左右移动，移动到 2026 左侧会循环到最右侧 2019，移动到 2019 右侧会循环回 2026，若新选中年份不在当前 5 个可见项内则同步调整可见窗口；桌面标题按 110px 换算为 `6.875rem`，移动端降为 `4rem`，右侧说明和 active 内容在移动端同步缩小并允许长文案换行，避免超出视窗；
- Events 三卡中心轮播，使用自定义状态、`useEffect` 自动轮播和 CSS transition 实现中间主卡突出、两侧弱化、箭头与分页点切换；首页轮播按 slug 从 `src/data/events.ts` 读取 `20231117`、`20230406`、`20230329`、`20221218`、`20221108` 五条 `EN/event.md` 范围内的真实事件，图片、标题、摘要和跳转与 Events 列表/详情页保持同源；每张轮播卡点击跳转到对应 `/events/[slug]` 详情页；桌面轮播舞台高度为 `58rem`，移动端降为 `34rem`；移动端轮播文字、说明盒内距和说明行数收紧，轮播按钮与 See More 改为纵向排列，避免按钮重叠并缩短与轮播的距离；
- Clients 三行横向滚动 Logo 墙，素材来自 `src/assets/home/clientLogo/*` 并顺序发布为 `public/assets/home/clientLogo/client-logo-01` 到 `client-logo-42`，标题距离视窗左侧 `5rem`，字号按 36px 换算为 `2.25rem`，三行分别使用互不重叠的 Logo 分组以避免同一视窗跨行出现重复 Logo；Logo 卡片为纯白底、浅色描边和小圆角，卡片内 logo 图片高度固定占父容器 80%、宽度自适应并限制不超过父容器宽度；支持反向滚动和无缝循环，动画时长为 `103.85s`，相对原 `135s` 速度提升到 1.3 倍，左右黑色渐隐蒙层已移除；
- Footer / Contact 信息。

2026-05-07 本地调整：
- 首页 Honors 数据按 `EN/award.md` 整理为年度列表，每个年份展示最近荣誉事件，并额外补入 2022/2023/2024 年虎诉赞助活动和 Wan Li 大连国际仲裁院仲裁员条目；See More 居中显示，并跳转到 `/about#honors`。
- 中文状态下，首页 Honors 切换到 `Chinese/awards.md` 对应的年度中文荣誉条目。
- 首页 Events 轮播五条事件统一复用 `src/data/events.ts`：`20231117`、`20230406`、`20230329`、`20221218`、`20221108`，不再单独维护首页图片和文案；轮播上一张/下一张和分页点按钮水平居中，See More 保持在右侧入口。
- 中文状态下，首页 Events 五条轮播事件使用 `localizeEvent` 输出对应中文标题、日期和摘要。
- 首页 Clients 屏背景恢复为深色，客户 Logo 卡片保持纯白底和浅色描边。

### About `/about`

About 页面由多个区块组件组成：

- `AboutHero`
- `Honors`
- `Culture`
- `Chronicle`

其中：

- `AboutHero` 使用本地 `/assets/about/hero.png` 作为首屏背景，并直接渲染 `VisionCard`；首屏 `100svh` 内不叠加蒙层，纵向/横向渐变蒙层从 `top-[100svh]` 开始，仅作用于首屏之后的延展区域；About 标题组从首屏 55% 位置开始并保持 `12rem` 内容线，左侧增加金色竖线；About us 标题按 96px 换算为 `6rem`、semibold，正文按 32px 换算为 `2rem`、medium italic；Vision 卡片不再依赖 `calc(100svh + 36rem)` 固定高度和绝对定位父容器，改为首屏后相对流式布局并通过 `-mt-[10svh]` 叠入首屏底部，外层 `pb-20` 为 See More 预留自然下边距；灰色方块桌面左右外距为 `5rem`，卡片背景使用 `#585551` 到 `#2f2f2f` 的左上到右下渐变；
- `Vision.tsx` 保留 `VisionCard` 复用导出，卡片背景接入本地 `/assets/about/aboutVision.png` 并叠加深色渐变以保证文字可读，背景图片使用 `h-full w-full object-cover` 适应卡片完整高度；右侧 Vision 标题与说明文字桌面同排，`VISION` 标题桌面按 80px 换算为 `5rem` 并使用 extrabold；移动端标题和黄色说明缩小，英文第二行仅在 `md` 以上保持不换行，正文移动端改为左对齐并允许断词换行，避免黄色说明和正文越过视窗；
- `Honors` 使用 `useState` 做年份折叠交互，数据按 `EN/award.md` 的英文条目整理为年度奖项列表；展示前先按年份降序，再对每个年份内的奖项按 `YYYY-MM` 日期降序排序，确保月份大的荣誉排在上方；展开内容使用 `grid-rows` 过渡动画；标题 `HONORS` 桌面按 120px 换算为 `7.5rem`、semibold italic，移动端降为 `4rem`；右侧说明移动端改为左对齐并缩小字号；年份头部、奖项标题、正文和日期均增加移动端字号与断行约束，避免 About Honors 横向溢出；
- `Culture` 左侧图片按指定使用 `/assets/home/INDUSTRIES3.png` 原图，参考 Contact us 双栏效果做镜像布局：图片在左、文字色块在右，图片右缘使用棕金到透明的衔接渐变，右侧背景为 `#A1865F` 并保留低透明度抽象品牌水印；标题和正文改为黑色，标题按 Contact us 规格使用 `clamp(2.5rem,2.708vw,3.25rem)`，正文按 `clamp(1.25rem,1.46vw,1.75rem)` italic，`READ FULL MANIFESTO` 按钮使用 `#D9B27A` 背景并按 18px 换算为 `1.125rem` medium；
- `Chronicle` 使用 `useState` 做年份折叠交互，英文数据按 `EN/CHRONICLE.md` 的年份、月份、内容整理为 2026 到 2018 的完整时间线，中文数据按 `Chinese/CHRONICLE.md` 提供同样年份结构，页面文案保留源文档完整句子；默认展示前三个年份，See More 使用与 Culture 的 READ FULL MANIFESTO 一致的金色按钮动效，展开全部年份后英文按钮文案切换为 `COLLAPSE`、中文按钮文案切换为 `收起`；年份按钮背景为 `#202020` 且边框为金色，hover 时切换为金色实底；`CHRONICLE` 标题按 80px 换算为 `5rem` medium，右侧说明按 28px 换算为 `1.75rem` light，年份按钮按 36px 换算为 `2.25rem` medium；展开卡片在靠近中轴一侧显示金色边框，月份按 24px 换算为 `1.5rem` semibold 且颜色 `#D9B27A`，月份标题下划线靠近中轴，正文为 `1.5rem` light 灰色并占卡片宽度 85%。

About Honors 区块新增 `id="honors"` 和 `scroll-mt-[var(--header-height)]`，供首页 `/about#honors` 锚点跳转定位；年度数据补入 202211、202304、20240515、20241129 和 202203 五条荣誉/赞助活动，其中 2023 独立成年度折叠项，View Award 绑定对应微信公众号链接。

### Core Value `/about/core-value`

Core Value 页面基于 `core value/` 原型重建，仍归属 About 路由层级：

- 页面入口为 `src/app/about/core-value/page.tsx`，展示组件为 `src/components/pages/CoreValuePage.tsx`；
- 复用全站 `SiteHeader` 与 `SiteFooter`，顶部导航 active 仍为 ABOUT US；
- Hero 使用原型背景图，正文包含统一 `SubpageBreadcrumb` 面包屑，显示 About us / Core Value，字号为 `1.5rem`，点击返回上一页或回退到 `/about`；
- 三个价值观段落改由 `src/components/sections/core-value/CoreValueScrollFlow.tsx` 承载，文案按 `EN/coreValue.md` 和 `Chinese/corevalue.md` 补齐第三条“属人性 / Hands-on”的解释段与结尾段；英文正文使用左对齐、正常词距和 `leading-[1.55]`，避免两端对齐拉大单词间隔，中文正文保留两端对齐并收紧到 `leading-[1.65]`；参考 `事件 copy/src/app/components/FeaturesSection.tsx` 的滚动逻辑：桌面端外层高度为条目数乘以 `100vh`，滚动进度直接由 `container.getBoundingClientRect().top / window.innerHeight` 计算，左侧内容按滚动进度激活，右侧图片区使用和参考实现一致的 `sticky top-0 h-screen flex items-center justify-center` 结构固定在视窗内；`IntersectionObserver` 使用合法的 `rootMargin: "100% 0px"` 判断区域是否接近视口；滚动区背景为 `#171717`，不显示额外的 `CORE VALUES`/`Principles behind every dispute we take on` 引导文案；右侧图片堆内层保留 `translate-y-[5rem]` 和 `scale-90` 控制视觉位置，两个包裹层均设置 `w-full` 以避免图片栈宽度塌陷，图片栈使用 `aspect-[16/14]` 横向比例并放宽右侧列宽；Core Value 页面级 `<main>` 不再设置 `overflow-x-hidden`，避免祖先 overflow 创建裁剪/滚动上下文导致 sticky 失效；
- 右侧图片堆叠对齐 `事件 copy/src/app/components/FeaturesSection.tsx` 的 `ImageStack` 动效：外层使用 `aspect-[16/14]`，每张图片使用 `absolute inset-0` 叠放在同一容器内，通过 `clip-path: inset(...)` 按滚动进度逐张揭示，并用 `translateY(px)` 形成入场堆叠动效；移动端回退为普通纵向图文卡片；
- 价值观标题按 28px 换算为 `1.75rem`、`#D9B27A` semibold，英文以 `No.1 Our Spiritual Totem: Tiger` 的合并格式展示，中文不展示 `number` 前缀；标题下方不显示下划线；正文按 24px 换算为 `1.5rem` regular，其中 No.1 文案补充 `Bi An (狴犴)`；中文 `number` 为空时组件使用图片路径和索引生成稳定 key，避免 React 重复 key 警告；
- 滚动区图片使用 `/assets/core/core1.webp`、`core2.webp`、`core3.webp`，来源为 `src/assets/core/core1.png` 到 `core3.png` 生成的 WebP 版本；
- 结尾保留原型引用段落与引号图形。
- 页面右下角使用 `BackToTop` 提供中英文返回入口。

页面需要的 Core Value Hero 原型图片已复制到 `public/assets/prototypes/core-value/*`；滚动区图片已发布到 `public/assets/core/*`。

### Team `/team`

团队页面基于 `我的团队/` 原型重建，包含：

- Our team Hero，使用本地 `/assets/team/hero.webp` 和灰色混合遮罩；移动端 Hero 高度为 `100svh`，图片按 `width: 100%`、`height: auto` 展示，`Our team` 标题贴近首屏底部；桌面端恢复 `67.5rem` 高并让图片以 `h-full w-full object-cover` 铺满父容器；`#`、`Our team` 和副标题在移动端使用较小字号，`md` 以上保持 90px / 120px / 28px 对应规格；
- WE ARE SPECIAL FORCES / 我们，即为精锐之师标语区，标题分两行左对齐并使用 96px 对应 `6rem` italic，说明文案右对齐且分三行，字号为 28px 对应 `1.75rem` medium；标题与说明下方有一整条横向下划线；
- Partner 与 Senior Associate 双列人物卡片分区，标题使用一致的 64px 对应 `4rem` italic uppercase 格式；
- 人物卡片数据来自 `teamInfo.md` 的姓名和职位，只展示职位和名字；中文状态使用 `Chinese/teamInfo.md` 的 `zhName`、`zhTitle`；Yuxuan Liu、Min Xu、Li Wan、Zoe Zhang、Weifan Qiu 使用本地 `/assets/team/team1.webp` 到 `/assets/team/team6.webp`，Mengcheng Yun 使用替换后的 `/assets/team/team5.png`；`src/assets/team/*.png` 替换后会重新发布到 `public/assets/team`；图片以绝对定位填满父元素并移除灰色蒙层，保留轻微放大；姓名为 55px 对应 `3.4375rem` medium，职位为 36px 对应 `2.25rem` extra light，Find out more 为 28px 对应 `1.75rem` medium，黄色文字和黄色下划线，不显示旁侧 icon；
- Find out more 使用 Next `Link` 按成员 slug 跳转到同一团队路由层级下的 `/team/[slug]`；
- 复用全站导航和页脚；页面级三角形背景透明度降为 20%，并将团队内容区提升为 `z-10`，避免背景三角形遮挡团队列表内容。

页面需要的团队 Hero 图和成员图已复制到 `public/assets/team/*`；旧原型团队图仍保留在 `public/assets/prototypes/team/*` 作为备用。

### Team Profile `/team/[slug]`

团队个人详情页基于 `个人介绍详情/` 原型重建：

- 页面入口为 `src/app/team/[slug]/page.tsx`，`src/app/team/yuxuan-liu/page.tsx` 保留 Yuxuan Liu 的兼容静态入口，展示组件为 `src/components/pages/TeamProfilePage.tsx`；
- 团队列表和个人详情共用 `src/data/teamProfiles.ts`，包含 Yuxuan Liu、Min Xu、Li Wan、Zoe Zhang、Mengcheng Yun、Weifan Qiu 的 slug、姓名、职位、图片、邮箱、服务行业、教育背景、执业资格、语言、社会职务、执业领域、执业经历、荣誉和业绩；Performance & Achievements 按 `EN/teamInfo.md` 的英文个人业绩条目整理，避免使用截断或占位内容；英文状态下 Li Wan 的 Social Engagements / Practice Area、Zoe Zhang 的 Educational Background / Social Engagements / Practice Area / Work Experience / Awards and Recognition、Mengcheng Yun 的 Practice Area / Practice Experience、Weifan Qiu 的 Practice Area / Performance & Achievements 均按 `EN/teamInfo.md` 对齐；中文状态使用 `Chinese/teamInfo.md` 中的 `zh` 详情对象切换姓名、职位、服务行业、教育背景、专业资格、工作语言、社会任职、专业领域、执业经验、荣誉和个人业绩；荣誉条目中以中英文冒号结尾的引导说明按普通段落渲染，不显示列表圆点；教育背景按英文分号 `;` 或中文分号 `；` 拆分为多段展示，执业经验按换行拆分为多段展示，Zoe Zhang / 张莉的教育背景固定拆为四段、中文执业经验固定拆为两段；Social Engagements 仅在存在非空内容时渲染，Mengcheng Yun / 云梦成不展示该区块；
- 复用全站 `SiteHeader` 与 `SiteFooter`，顶部导航 active 保持 OUR TEAM；
- Hero 高度按 735px 换算为 `45.9375rem`，使用左上 `#919191` 到右下 `#5a5a5a` 对角线渐变，左侧人物图片使用当前 slug 对应的 `/assets/team/1.png` 到 `/assets/team/6.png` 并与 title logo 内容线对齐，右侧显示当前成员姓名、职位、下划线、带 Phone icon 的电话入口和带 Mail icon 的邮箱入口；姓名按 100px 换算为 `6.25rem` semibold，职位按 40px 换算为 `2.5rem` light；
- Hero 下方保留统一 `SubpageBreadcrumb`，显示 Our Team / 当前成员姓名，字号为 `1.5rem`，分隔符为 `/`，父级和当前项点击均返回上一页或回退到 `/team`；
- 信息介绍及后续内容左右边距统一为 128px，对应 `8rem`；
- 信息介绍屏背景为 `#333231` 到 `#433e38` 的纵向渐变，包含 Service Industries、Professional Qualification、Educational Background、Language Skills，并在成员存在内容时追加 Social Engagements；Language Skills 与 Professional Qualification 放在同一列，Social Engagements 存在时单独占一整行；Service Industries 标题为 `2rem` semibold，列表为 `1.5rem` light；
- 第二屏背景为 `#171717`，展示 Experience& capabilities；左侧为 Practice Area 与 Practice Experience，右侧仅在成员存在真实 Honors 数据时展示 Honors 和竖向分隔线；Mengcheng Yun、Weifan Qiu 等无 Honors 条目的成员不渲染该区块；
- 第三屏背景为 `#262626`，展示 Performance & Achievements、六张默认业绩卡片；View More 按钮位于默认卡片下方，样式对齐 About 的 See More，并使用 `useState`、`grid-rows` 和 opacity 过渡实现与 About Honors 卡片一致的展开/收起动画；页面右下角使用 `BackToTop` 提供中英文返回入口。

页面需要的个人简介图片已复制到 `public/assets/prototypes/team-profile/*`。

### Industries `/industries`

服务行业页面基于 `服务行业/` 原型重建，包含：

- 顶部 Industries Hero 使用本地 `/assets/industries/hero.png`，标题左对齐并按 96px 换算为 `6rem` medium，标题在 1920 设计基准下距离屏幕顶部 `590px`，对应 `36.875rem`；
- 行业服务说明卡片紧接在 Industries 标题下方，背景为 `#464646` 到 `#787269` 渐变，正文按 28px 换算为 `1.75rem` regular，两个对角边框与卡片边缘保留内距；
- 行业卡片网格按 1 / 2列 / 2 三段布局，桌面左右外距为 `9rem`；第二段左侧为 International Trade 大卡，右侧为 Finance 与 Real Estate 两行一列上下排列；卡片图片使用 `/assets/industries/in1.webp` 到 `/assets/industries/in6.webp`，文字位于左下方并带黄色下划线，标题按 48px 换算为 `3rem` semibold，按 Private Equity、International Trade、Finance、Real Estate、Sports and E-Sports、Cyber Tech and Game 的顺序展示并保留指定换行；中文标题随卡片 slug 绑定为私募股权、国际贸易行业、金融、房地产行业、体育及电子竞技行业、互联网科技及游戏行业，避免复用首页 labels 数组造成文案与跳转目标错位；第三行高度为第一行约 1.5 倍；
- 六个行业卡片均使用 Next `Link` 跳转到 `/industries/[slug]` 详情页；
- 复用页脚。

页面需要的原型图片已复制到 `public/assets/prototypes/industries/*`；行业卡片图片已从 `src/assets/industries/in1.png` 到 `in6.png` 发布到 `public/assets/industries/`。

### Industry Detail `/industries/[slug]`

行业详情页面基于 `行业详情/` 原型重建：

- 页面入口为 `src/app/industries/[slug]/page.tsx`，展示组件为 `src/components/pages/IndustryDetailPage.tsx`；
- `generateStaticParams` 和 `generateMetadata` 从服务端安全的 `src/data/industryMetadata.ts` 读取六个行业 slug、英文标题和简介，未知 slug 回退到 Private Equity metadata；
- 复用全站 `SiteHeader` 与 `SiteFooter`，顶部导航 active 保持 INDUSTRIES；
- Hero 顶部使用统一 `SubpageBreadcrumb`，显示 home / 当前行业（中文为 首页 / 当前行业），字号为 `1.5rem`，分隔符为 `/`，父级和当前项点击均返回上一页或回退到 `/`；
- Hero 背景图片使用列表页对应行业卡片的同一张 WebP 图片，即 `/assets/industries/in1.webp` 到 `/assets/industries/in6.webp`；
- 内容区参考原型的左侧留白结构，使用深色内容卡片和圆点列表展示来自 `industriesInfo.md` 的对应行业介绍与服务范围；中文状态下使用 `Chinese/industriesInfo.md` 对应六个行业的标题、简介和服务范围；页面右下角使用 `BackToTop` 提供中英文返回入口。

### Events `/events`

事件页面基于 `事件/` 原型重建，包含：

- Events 标题 Hero 使用本地 `/assets/event/hero.webp` 作为背景图，标题和正文居中放在左右外距 `8rem`、高度 `40svh` 的渐变背景块中，页面外层仍保持深色背景；标题按 100px 换算为 `6.25rem` semibold italic，说明文字按 36px 换算为 `2.25rem` regular；
- 事件数据集中在 `src/data/events.ts`，以 `EN/event.md` 中的 28 条事件日期作为导出范围；数据包含 slug、category、title、`YYYYMMDD` 日期、summary、正文段落、中文镜像和事件图片，列表页和详情页共用该数据源；
- 事件卡片默认展示 9 条，按一行三个、三行展示，第二屏左右外距为 `6rem`，横向卡片间距为当前版 3 倍，纵向间距保持原来的 `gap-y-16`，不再显示 LATEST UPDATES 标题和下划线；
- 卡片图片保持彩色，位于卡片左上角，并相对容器向左上方偏移；事件逐条绑定 `/assets/event/*` 下的真实图片；列表小图框使用 `4:3` 比例，图片本身使用 `object-cover` 自适应填满图框，不额外叠加模糊背景或蒙层；
- 卡片内容只保留日期行和标题行，日期与图片保持自然间距，日期按 24px 换算为 `1.5rem` regular，日期行右侧显示黄色箭头，标题中 `Tiger Dynamics` 为 `#D1CECA`、30px 对应 `1.875rem`、normal italic，分隔线后正文为 `1.875rem` medium，右下角浅色三角形高度为 `6%`；
- 卡片使用 Next `Link` 跳转到 `/events/[slug]` 事件详情页；
- See More 使用与 About Culture 的 READ FULL MANIFESTO 一致的金色描边/实底按钮和箭头 hover 平移动效，点击后展开全部 42 条事件并可收起；
- 复用页脚。

页面需要的事件卡片图已复制到 `public/assets/prototypes/events/card.png`；当前 Events 列表真实图片已从 `src/assets/event/event1-42` 同步发布到 `public/assets/event/`。

### Event Detail `/events/[slug]`

事件详情页面基于 `事件详情/` 原型重建：

- 页面入口为 `src/app/events/[slug]/page.tsx`，展示组件为 `src/components/pages/EventDetailPage.tsx`；
- `generateStaticParams` 从 `src/data/events.ts` 为全部事件生成静态参数；
- 复用全站 `SiteHeader` 与 `SiteFooter`，顶部导航 active 保持 EVENTS；
- 顶部包含统一 `SubpageBreadcrumb`，显示 Events / 当前事件，字号为 `1.5rem`，分隔符为 `/`，点击返回上一页或回退到 `/events`；事件标题按 64px 换算为 `4rem` semibold，日期按 28px 换算为 `1.75rem` regular；
- 正文区先展示当前事件 summary，再继续渲染真实正文段落；英文状态显示 `EN/event.md` 中已有正文或补充英文摘要，中文状态显示 `Chinese/event.md` 对应正文；渲染时会识别 `[图片]` / `[Image]` 占位并按 `detailImages` 插入正文图片，识别“暂时无法在飞书文档外展示此内容”占位并按 `detailVideos` 在对应位置插入原生 `video` 播放器，无对应媒体时清理占位文本；正文内容占满 `max-w-[108rem]` 父容器，不再保留右侧封面图列；正文插图和视频桌面宽度为父容器 70%，移动端不超出容器；主说明按 24px 换算为 `1.5rem` light italic；页面右下角使用 `BackToTop` 提供中英文返回入口。

页面需要的事件详情图片已复制到 `public/assets/prototypes/event-detail/*`。

### Contact `/contact`

联系我们页面基于 `联系我们/` 原型重建，包含：

- Contact 标题区使用本地 `/assets/contact/hero.webp` 作为顶部背景图；标题按 96px 换算为 `6rem` medium italic，正文按 36px 换算为 `2.25rem` light；中文联系说明使用“如您有任何法律疑问或争议，欢迎随时与我们联系。我们诚挚期待为您提供专业的法律服务，致力于维护您的合法权益。”；
- Hero 下方 Contact us 双栏模块，左侧背景为 `#A1865F`、黑色标题、黑色正文、黑色电话/邮箱和图标，右侧为城市图片；Contact us 标题按 52px 换算为 `3.25rem` semibold，说明正文按 28px 换算为 `1.75rem` italic，电话和邮箱均为 `1.75rem` regular，邮箱显示下划线；
- Join Us 招聘说明，Welcome / To / Join Us 按 90px 换算为 `5.625rem` light italic，右侧招聘说明按 28px 换算为 `1.75rem` regular；
- 候选人要求卡片，卡片顶部使用金色下划线替代数字编号，下划线顶部间距加大且高度为当前版三倍；右侧三角形层级高于卡片背景、低于卡片内容，因此覆盖卡片背景但不遮挡文字和下划线；卡片背景为深色暖灰渐变，正文为 `1.75rem` semibold；
- 简历邮箱提示，内容右对齐，提示文字按 32px 换算为 `2rem` light italic，邮箱为 `2rem` regular 且使用 `#D9B27A`；
- 联系信息页脚。

Contact 页常规内容区使用页面内 `contactShell`，桌面左边距为 `9rem`，右侧仍沿用全站内容线；Hero 下方 Contact us 双栏模块为全宽结构，左侧内容同样使用 `9rem` 左边距。
Join Us、候选人卡片和简历邮箱区域包裹在同一个相对容器内，右侧叠加 `#1d1d1d` 直角三角形背景；该容器通过 `pb-20 -mb-20` 抵消 Footer 自带顶部外边距，使斜边从 Contact us 图片右下方延伸到 Footer 顶部中间。

页面需要的顶部 Hero 图已复制到 `public/assets/contact/hero.png`；城市图、logo、二维码已复制到 `public/assets/prototypes/contact/*`。

## 配置

`next.config.ts`：

- `output: "standalone"`；
- 读取 `NEXT_SNAPSHOT_BASE_PATH` 配置 `basePath`、`assetPrefix`、`trailingSlash`。
- 读取 `NEXT_PUBLIC_ASSET_BASE_URL` 并注入客户端，生产构建时可将 `/assets/*` 和 `/font/*` 切换到 OSS。

`tsconfig.json`：

- `strict: true`；
- `allowJs: false`；
- 排除原型目录：`首页`、`about 页`、`事件`、`事件 copy`、`服务行业`、`联系我们`、`官网首页设计`、`我的团队`、`core value`、`个人介绍详情`、`事件详情`、`行业详情`，并排除根目录参考文件 `EventLandingPage.tsx` 和独立 `cms` 工作区，避免旧 Vite/CMS 原型依赖参与当前 Next 主应用类型检查。

`src/app/globals.css`：

- `body` 使用 `var(--font-poppins), Arial, Helvetica, sans-serif`，其中 `--font-poppins` 由 `src/app/layout.tsx` 注入的 `@font-face` 设置为 Poppins；
- `html` 与 `body` 设置 `touch-action: pan-x pan-y`，配合客户端缩放锁限制移动端 pinch/double-tap 等浏览器缩放手势；
- 定义 `client-logo-scroll` keyframes；
- `.client-logo-track` 使用 `animation: client-logo-scroll 103.85s linear infinite` 和 `will-change: transform` 保持 Clients Logo 墙持续滚动，第二行通过 `.client-logo-track-reverse` 反向滚动；
- `prefers-reduced-motion` 仅关闭 `html` 的平滑滚动，不再全局覆盖 `animation-duration`、`animation-iteration-count` 和 `transition-duration`，避免系统减少动态效果设置导致 See More、图片 hover、Clients Logo 等页面动效全部瞬间完成或停止。

`src/app/layout.tsx`：

- 通过 `assetUrl("/font/poppins.ttf")` 生成字体地址，并以内联 `@font-face` 注入页面；本地读取 `public/font/poppins.ttf`，生产可读取 OSS 字体；
- `viewport` metadata 输出 `width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover`，作为禁用浏览器缩放的首层规则；
- 通过 `ViewportZoomLock` 在客户端持续同步 viewport meta，拦截 iOS gesture、多点触控、双击、Ctrl/Command + 滚轮和 Ctrl/Command + `+/-/0` 等常见缩放入口；
- 通过 `AppProviders` 挂载全站语言上下文。

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
| `NEXT_PUBLIC_BASE_PATH` | 由 `next.config.ts` 从 `NEXT_SNAPSHOT_BASE_PATH` 注入客户端，供 `ImageWithFallback` 为 `/assets/*` 自动补子路径前缀 | 跟随 `NEXT_SNAPSHOT_BASE_PATH` |
| `NEXT_PUBLIC_ASSET_BASE_URL` | 生产静态资源 CDN/OSS 前缀；配置后 `assetUrl()` 会把 `/assets/*` 和 `/font/*` 指向该前缀 | `.env.production` 中为 `https://img-12345.oss-cn-beijing.aliyuncs.com/husuweb` |

当前首版公开页没有 CMS、数据库或后台登录环境变量；OSS AccessKey 不写入项目环境文件，上传完成后前端只需要公开资源域名。

## 部署

当前 offweb 环境使用 Next.js standalone 运行包部署：

- 公网地址：`http://8.140.238.44/offweb/`；
- 构建前设置：`NEXT_SNAPSHOT_BASE_PATH=/offweb`、`NEXT_TELEMETRY_DISABLED=1`；
- 本地发布包：`dist/offweb-standalone.tgz`；
- 服务器目录：`/opt/husuweb-offweb/current` 指向 `/opt/husuweb-offweb/releases/*` 版本目录；
- systemd 服务：`husuweb-offweb.service`；
- 应用监听：`127.0.0.1:3003`；
- Nginx 入口：`location /offweb/` 反向代理到 `http://127.0.0.1:3003/offweb/`。
- public 静态图片统一通过 `ImageWithFallback` 输出，首页视频和字体通过 `assetUrl()` 输出；当配置 `NEXT_PUBLIC_ASSET_BASE_URL` 时资源请求会走 OSS，未配置时若 `NEXT_PUBLIC_BASE_PATH=/offweb`，组件会把 `/assets/...` 和 `/font/...` 转换为 `/offweb/assets/...`、`/offweb/font/...`，避免子路径部署下静态资源请求落到域名根路径。
- 子路径内部跳转统一使用 Next `Link`，例如 About Culture 的 Core Value 入口输出为 `/offweb/about/core-value/`；自定义 404 页面 `src/app/not-found.tsx` 的 Return Home 输出为 `/offweb/`。
- `next.config.ts` 配置旧语言前缀兼容 redirect：`/zh`、`/en` 临时跳转到 `/`，`/zh/:path*`、`/en/:path*` 临时跳转到对应的无语言前缀路径，避免旧站默认入口 `https://www.tigerpartners.cn/zh`、`/en` 访问 404；旧 URL 上的 `#...` fragment 由浏览器在跳转后保留。

当前根路径环境使用同一套 Next.js standalone 运行包部署：

- 服务器 IP：`39.106.226.65`，正式访问入口使用绑定域名；
- 正式域名：`https://www.tigerpartners.cn/`，`www.tigerpartners.cn` 的 A 记录指向 `39.106.226.65`；
- 裸域 `tigerpartners.cn` 当前仍由阿里云 URL 转发入口解析到 `203.107.45.167`，并 302 跳转到 `https://www.tigerpartners.cn`；
- 构建前设置：`NEXT_SNAPSHOT_BASE_PATH=`、`NEXT_PUBLIC_ASSET_BASE_URL=`、`NEXT_TELEMETRY_DISABLED=1`；
- 本地发布包：`dist/tigerpartners-root-latest.tgz`；
- 服务器目录：`/opt/tigerpartners-web/current` 指向 `/opt/tigerpartners-web/releases/20260515-0122`；
- systemd 服务：`tigerpartners-web.service`；
- 应用监听：`127.0.0.1:3004`；
- Nginx 入口：`server_name www.tigerpartners.cn`，80/443 监听，`location /` 反向代理到 `http://127.0.0.1:3004`；
- HTTPS 证书由 Certbot / Let's Encrypt 签发，证书路径为 `/etc/letsencrypt/live/www.tigerpartners.cn/fullchain.pem`，HTTP 自动跳转 HTTPS，Certbot timer 负责自动续期；
- 根路径构建不配置 OSS 资源前缀，图片、视频和字体随发布包内 `public` 目录直接由 Next 服务提供。

## 安装与构建状态

当前会话已使用现有 `node_modules` 执行过 `npm run build` 并通过：

- Next.js 编译成功；
- TypeScript 检查成功；
- 静态页面生成成功，包含 `/`、`/about`、`/industries`、`/events`、`/contact`。

本次 offweb 发布前已停止本地 `next dev` 进程，使用 `NEXT_SNAPSHOT_BASE_PATH=/offweb` 重新执行 `npm run build`，整理 `.next/standalone`、`.next/static` 和 `public` 到 `dist/offweb`，并生成 `dist/offweb-standalone.tgz`。服务器端已验证 `husuweb-offweb.service` 为 `active`，`http://8.140.238.44/offweb/` 返回 `200 OK`。

2026-05-12 已按根路径重新执行 `npm run build`，整理 `.next/standalone`、`.next/static` 和 `public` 到 `dist/root`，生成 `dist/root-standalone.tgz`，上传到 `39.106.226.65:/opt/tigerpartners-web/tigerpartners-root-20260512-0136.tgz`，解压到 `/opt/tigerpartners-web/releases/20260512-0136`，并切换 `current` 后重启 `tigerpartners-web.service`。服务器本机 `http://127.0.0.1:3004/` 和公网 `https://www.tigerpartners.cn/` 均返回 `200 OK`。
随后已将 Nginx `server_name` 调整为 `www.tigerpartners.cn`，使用 Certbot 签发 Let's Encrypt 证书并启用 HTTP 到 HTTPS 跳转；公网验证 `https://www.tigerpartners.cn/`、`/about`、`/events` 和静态资源均返回 `200 OK`，`http://www.tigerpartners.cn/` 返回 `301` 到 HTTPS，裸域 `http://tigerpartners.cn/` 经阿里云 URL 转发返回 `302` 到 HTTPS www 域名。

2026-05-13 已按根路径重新执行 `npm run build`，整理 `.next/standalone`、`.next/static` 和 `public` 到 `dist/root`，生成 `dist/tigerpartners-root-latest.tgz`，上传到 `39.106.226.65:/opt/tigerpartners-web/tigerpartners-root-20260513-0028.tgz`，解压到 `/opt/tigerpartners-web/releases/20260513-0028`，并切换 `current` 后重启 `tigerpartners-web.service`。服务器本机 `http://127.0.0.1:3004/` 返回 `200 OK`，公网验证 `https://www.tigerpartners.cn/`、`/about`、`/events`、`/team` 均返回 `200 OK`，`/zh` 和 `/en` 返回临时跳转。

2026-05-13 已再次执行根路径构建与发布，先将 `public/assets/about` 全量同步到 OSS 并完成回源 SHA256 校验，再生成 `dist/tigerpartners-root-latest.tgz`，上传到 `39.106.226.65:/opt/tigerpartners-web/tigerpartners-root-20260513-0058.tgz`，解压到 `/opt/tigerpartners-web/releases/20260513-0058`，切换 `current` 后重启 `tigerpartners-web.service`。公网验证 `https://www.tigerpartners.cn/`、`/about`、`/events`、`/team` 和 `/events/cietac-cup-voice-of-moot-diamond-sponsor` 均返回 `200 OK`；OSS 中 About Hero、About bg 和旧 Events 详情图均返回 `200 OK`。

2026-05-15 已执行根路径构建与发布，生成 `dist/tigerpartners-root-latest.tgz`，上传到 `39.106.226.65:/opt/tigerpartners-web/tigerpartners-root-20260515-0122.tgz`，解压到 `/opt/tigerpartners-web/releases/20260515-0122`，切换 `current` 后重启 `tigerpartners-web.service`。服务器本机 `http://127.0.0.1:3004/` 返回 `200 OK`。随后新增的 Zoe Zhang 个人页 Performance & Achievements 数据修正仅保留在本地工作区，尚未部署。

## 更新日志

| 时间 | 分支 | 变更类型 | 描述 |
| :--- | :--- | :--- | :--- |
| 2026-05-15 22:51 | cms | 分支合并 | 按 `main` 优先策略将 `main` 合并到 `cms`，并将 `AppProviders` 的 CMS 初始状态参数改为可选以兼容 `main` 根布局 |
| 2026-05-15 22:33 | main | 部署发布 | 将 `/client` 首页重定向与首页 SEO 标题优化发布到生产环境；服务器版本目录为 `/opt/tigerpartners-web/releases/20260515-2230`，验证 `/client` 返回 307 到 `/`，首页 title/og:title 为 `虎诉律师事务所 | Tiger Partners`，`WE KNOW HOW TO WIN` 不再作为 `h1` |
| 2026-05-15 22:25 | main | SEO 与路由调整 | 首页 metadata title 改为 `虎诉律师事务所 | Tiger Partners`，首屏视觉口号 `WE KNOW HOW TO WIN` 从语义 `h1` 改为纯视觉文本，新增隐藏语义标题 `虎诉律师事务所 Tiger Partners`；`/client` 已配置重定向到首页；生产构建通过，未部署 |
| 2026-05-15 22:15 | main | UI 调整 | 万力个人页最后三条业绩布局保持固定 `gap-6` 间距，改由第 23 条卡片拉伸吸收额外高度，实现左上/右上与左下/右下同时对齐；清理 `.next` 后生产构建通过，未部署 |
| 2026-05-15 22:13 | main | UI 调整 | 万力个人页 Performance & Achievements 展开区最后三条改为专门桌面布局：左列第 23 和第 25 条，右列第 24 条，并在两列底部对齐；生产构建通过，未部署 |
| 2026-05-15 22:01 | main | UI 调整 | 个人简历详情页移动端 hero 区块调整为图片在个人信息上方；确认万力中英文个人业绩均为 25 条且最后三条尾部顺序一致；生产构建通过，未部署 |
| 2026-05-15 21:59 | main | 资源更新 | 同步替换 event 页面封面图 `event2.png`、`event8.png`、`event10.png`、`event16.png`，并将 `event16` 数据引用从 `.jpg` 改为 `.png`；4 张图已上传 OSS，根路径生产构建通过并发布到 `/opt/tigerpartners-web/releases/20260515-2155` |
| 2026-05-15 10:07 | main | 部署发布 | 根路径生产构建通过，并发布到 `https://www.tigerpartners.cn/`；服务器版本目录为 `/opt/tigerpartners-web/releases/20260515-0957`，`tigerpartners-web.service` 已重启且公网校验通过 |
| 2026-05-15 09:54 | main | 资源更新 | 将 `src/assets/event/event2` 中 1-9 号封面同步覆盖到 `public/assets/event/event2`，确保 event2 页面前 9 张封面按 `1.jpg`、`2.jpg`、`3.png` 至 `9.png` 的命名顺序读取；未构建、未部署 |
| 2026-05-15 09:46 | main | 数据更新 | 按 `EN/liwanPerformance.md` 同步万力个人详情页中英文 Performance & Achievements，共 25 条，中文与英文均按源文档顺序展示；未构建、未部署 |
| 2026-05-15 09:41 | main | 数据更新 | 从 Events 导出白名单移除 `20200902`，事件页不再展示“枪炮一响 黄金万两 | 关于民间借贷利率司法保护规则调整的解读”；源数据与闲置详情图映射保留，未部署 |
| 2026-05-15 09:29 | main | 视觉与文案更新 | Cyber Tech and Game 在首页、Industries 列表页和详情页统一使用 `/assets/home/INDUSTRIES6.png`；Home/About Honors 英文说明统一为指定三行，避免 `By Multiple...` 被拆开；本地类型检查通过，未部署 |
| 2026-05-15 09:22 | main | 数据更新 | Events 页面新增事件在导出时按 `/assets/event/event2/` 图片文件名数字顺序排序，确保卡片按 `1` 至 `15` 的命名顺序展示；本地类型检查通过，未部署 |
| 2026-05-15 09:08 | main | 数据更新 | Events 旧事件详情图改用 `eventinfo` 中指定命名文件：`20210414-1`、`20210720-1/2/3`，并为 `20210414`、`20210315` 英文正文补图片占位；`20210315-1` 当前未在目录中，先按现有两张 `20210315-2` 文件渲染 |
| 2026-05-15 09:01 | main | 数据更新 | 按 `EN/event.md` 修正 Events 中 `20210720`、`20200927` 两条事件英文标题、摘要和正文，并为 `20210720` 详情页新增三张插图映射；本地类型检查通过，未部署 |
| 2026-05-15 08:56 | main | 视觉优化 | 团队个人详情页手机端 Hero 改为使用 `team1.png` 至 `team6.png` 团队卡片图，并将个人信息置于图片上方避免重叠；本地类型检查通过，未部署 |
| 2026-05-15 08:52 | main | 数据更新 | 为 Events 旧事件 `20210414` 和 `20210315` 增加详情页图片映射，分别复用现有 `event25.png`、`event27.png`；本地类型检查通过，未部署 |
| 2026-05-15 08:48 | main | 数据更新 | Zoe Zhang 个人页服务行业改为指定中英文五项，并将 Events 已有的 `20210720`、`20200927` 两条事件加入导出白名单；未改动事件源 md 文件，未部署 |
| 2026-05-15 01:25 | main | 文案更新 | 按 `EN/zoePerformance.md` 将 Zoe Zhang 个人详情页 Performance & Achievements 更新为 24 条中英文业绩，本次修改未部署 |
| 2026-05-15 01:24 | main | 资源发布 | 将 01:20 的文案与资源调整构建发布到 `/opt/tigerpartners-web/releases/20260515-0122`，服务重启并通过服务器本机 3004 验证 |
| 2026-05-15 01:20 | main | 文案与资源更新 | 更新首页、About、Footer、Team 多处英文分行文案，修正 Home 行业第六张背景图、About Honors 年份黄线对齐，并同步 event2 1/2 图和 Mengcheng Yun 图片到 OSS |
| 2026-05-13 01:02 | main | 资源发布 | 同步 About 图片目录到 OSS，并将当前根路径构建发布到 `/opt/tigerpartners-web/releases/20260513-0058`，公网验证通过 |
| 2026-05-13 00:46 | main | 文案修复 | 清理 `src/data/event2Events.ts` 中英文事件数据里的 mojibake 标点，按 `EN/event2.md` 恢复智能引号、所有格和连接号 |
| 2026-05-13 00:39 | main | 文案修复 | 按 `EN/event2.md` 修正 2024.11.13 CIETAC Cup 事件英文段落中的乱码引号和所有格 |
| 2026-05-13 00:35 | main | 资源发布 | 将当前根路径构建发布到 `/opt/tigerpartners-web/releases/20260513-0028` 并重启正式站服务，公网 HTTPS 验证通过 |
| 2026-05-13 00:25 | main | 视觉优化 | 修复 About Chronicle 手机端年份按钮、时间线卡片和标题说明的横向溢出 |
| 2026-05-13 00:20 | main | 视觉优化 | 修复移动端 Home Honors、Home Events 轮播控制、About Vision、About Honors 和 Our Team 首屏的横向溢出与间距问题 |
| 2026-05-13 00:09 | main | 视觉优化 | 仅保留 Our Team 手机端 Hero 图按宽度自适应，其他页面恢复上一版 Hero 媒体铺满，并压小移动端首屏标题字号 |
| 2026-05-13 00:02 | main | 视觉优化 | 手机端 Hero 媒体取消 `height: 100%`，仅强制宽度 100%，桌面端继续保持容器高度铺满 |
| 2026-05-12 23:55 | main | 视觉优化 | 手机端页面级 Hero 图片和首页 Hero 视频改为 `w-screen` 视口宽度铺满屏幕，桌面端保持父容器宽度 |
| 2026-05-12 23:49 | main | 修复缺陷 | 修正 event2 详情图 `detailImages` 乱码文件名，恢复为 public 中真实 `微信图片_*` 路径 |
| 2026-05-12 23:46 | main | 修复缺陷 | 从 `Chinese/event2.md` 重新同步 15 条 event2 中文事件，修复前 15 条中文乱码 |
| 2026-05-12 23:41 | main | 修复缺陷 | 修复 `src/data/event2Events.ts` 中文字符串缺少闭合引号导致的 Unterminated string constant |
| 2026-05-12 23:38 | main | 修复缺陷 | Events 详情视频改为按飞书视频占位符位置渲染，而不是统一追加到正文末尾 |
| 2026-05-12 23:30 | main | 视觉优化 | 统一移动端各页面 Hero 媒体宽度铺满父容器，避免按图片自身尺寸收缩 |
| 2026-05-12 23:24 | main | 新增功能 | Events 详情页为 2025.06.17 和 2024.11.13 两条动态接入视频播放 |
| 2026-05-12 23:12 | main | 视觉优化 | 虎诉动态 Events 列表卡片顶部图片比例从 16:9 调整为 4:3 |
| 2026-05-12 22:40 | main | 文档更新 | 确认 About Chronicle 2026 年一月钱伯斯大中华区指南记录已保留，并修正架构文档对 2026 年记录范围的描述 |
| 2026-05-12 22:39 | main | 配置变更 | 为旧站英文前缀 `/en` 和 `/en/:path*` 补充临时跳转，兼容带 hash 的旧英文入口 |
| 2026-05-12 22:37 | main | 配置变更 | 为旧站中文前缀 `/zh` 和 `/zh/:path*` 添加临时跳转，兼容旧默认入口避免 404 |
| 2026-05-12 22:34 | main | 修复缺陷 | 修复 Events 点击 See More 后进入详情再返回时展开状态丢失，导致无法回到原列表位置的问题 |
| 2026-05-12 22:30 | main | 文案更新 | 刘煜暄中英文荣誉说明改为冒号结尾，并让荣誉引导说明不显示列表圆点 |
| 2026-05-12 22:20 | main | 文案更新 | 按中英文 CHRONICLE.md 校准 About Chronicle 2026 年 3-5 月新增事件，修复中文乱码并补齐五月主要裁判领域 |
| 2026-05-12 22:18 | main | 资源发布 | 同步新版 About Hero、Mengcheng Yun 团队卡片图和个人详情图到 public，并让团队卡片读取新版 PNG |
| 2026-05-12 22:07 | main | 新增功能 | 新增全站禁用浏览器缩放规则，结合 viewport metadata、客户端事件拦截和全局 touch-action |
| 2026-05-12 22:03 | main | 视觉优化 | Core Value 英文正文取消两端对齐，改为左对齐和更紧凑行高，避免单词间距被拉开 |
| 2026-05-12 21:55 | main | 修复缺陷 | 修正 Home 标签页标题、移动端 Hero 媒体铺满、About Chronicle 完整文案、团队个人业绩完整文案和 Core Value 缺失段落，并同步新版 event2 图片到 public/OSS |
| 2026-05-12 02:01 | main | 资源发布 | 整批上传 OSS 中 `husuweb/assets/home/clientLogo/` 的 42 个客户 Logo，删除误用的 `client-logo-26.png` 和 `client-logo-42.png`，并完成线上校验 |
| 2026-05-12 01:57 | main | 资源发布 | 整批上传 OSS 中 `husuweb/assets/event/event2/` 和 `husuweb/assets/event/eventinfo2/` 共 40 个图片文件，并逐个完成下载回源哈希校验 |
| 2026-05-12 01:52 | main | 资源发布 | 覆盖上传 OSS 中 About Hero、Footer 二维码和邱伟帆团队图 `team6.webp`，并完成线上哈希校验 |
| 2026-05-12 01:40 | main | 配置变更 | 将虎诉官网从 `/opt/daxuanweb-root` 迁移到独立目录 `/opt/tigerpartners-web`，新建 `tigerpartners-web.service` 并改用 `127.0.0.1:3004` |
| 2026-05-12 01:18 | main | 配置变更 | 为 `www.tigerpartners.cn` 配置 Nginx `server_name` 和 Let's Encrypt HTTPS 证书，启用 HTTP 自动跳转 HTTPS |
| 2026-05-12 00:52 | main | 配置变更 | 将当前 Next standalone 发布包部署到新服务器根路径 `http://39.106.226.65/`，沿用 `daxuanweb-root.service` 和 Nginx `/` 反代 |
| 2026-05-11 23:49 | main | 修复缺陷 | About Honors 同一年内按月份降序展示，月份大的荣誉排在上方 |
| 2026-05-11 23:45 | main | 视觉优化 | 首页 Clients Logo 墙滚动速度提升到原来的 1.3 倍 |
| 2026-05-11 23:41 | main | 资源发布 | About Hero 切换回 `/assets/about/hero.png` 并同步新版 hero 图到 public |
| 2026-05-11 23:36 | main | 视觉优化 | 事件详情页取消右侧封面图列，正文占满父容器，正文插图桌面宽度改为 70% |
| 2026-05-11 23:33 | main | 资源发布 | 同步新版 Footer 二维码到 public，并刷新 `SiteFooter` 二维码 URL 版本参数 |
| 2026-05-11 23:28 | main | 新增功能 | 旧 28 条 Events 详情页接入 eventinfo 顺序图片，并支持行内 `[图片` 占位符插图渲染 |
| 2026-05-11 23:21 | main | 新增功能 | Events 新增 event2 中英文 15 条事件，接入 event2 列表图和 eventinfo2 详情占位图顺序渲染 |
| 2026-05-11 23:00 | main | 文案更新 | 按用户指定中文精确措辞更新 About Chronicle 2026 年 3-5 月三条中文记录 |
| 2026-05-11 22:49 | main | 修复缺陷 | Events 数据按 `EN/event.md` 收敛到 28 条，中文日期改为 `YYYY.MM.DD`，修复无分类事件标题前置 `|`，并为详情返回增加滚动位置恢复 |
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
| 2026-05-06 21:42 | main | 优化重构 | 调整首页 Hero、Vision、Industries、Honors 和 Events 轮播的字重、字号与内容布局 |
| 2026-05-06 21:55 | main | 优化重构 | 按 1920 设计基准将首页核心字体尺寸换算为 rem，并完善 Events 轮播说明盒渐变和三角形装饰 |
| 2026-05-06 22:00 | main | 优化重构 | 调整首页 Events 轮播图片与说明盒分离方式，移除外层边框并将图片文案移动到左下角 |
| 2026-05-06 22:05 | main | 优化重构 | 将首页 Events 轮播舞台改为占满父容器，并把轮播卡图片宽度按 995px 换算为 `62.1875rem` |
| 2026-05-06 22:06 | main | 修复缺陷 | 移除首页 Events 轮播说明文字的单行截断，使下方卡片完整换行展示文案 |
| 2026-05-06 22:07 | main | 优化重构 | 将首页 Events 图片文案左距和下方说明卡左右内边距按 89px 换算为 `5.5625rem` |
| 2026-05-06 22:09 | main | 修复缺陷 | 修正首页 Events 图片文案左距基准和标题左竖线范围，并加高轮播舞台避免说明卡被截断 |
| 2026-05-06 22:31 | main | 优化重构 | 将 Home、About、Team、Industries、Events 和 Contact 的 Hero 背景切换为导航目录下的本地 `hero.png` 素材 |
| 2026-05-06 22:33 | main | 优化重构 | 提高首页 Hero 本地背景图亮度，降低首屏黑色遮罩强度并缩短底部暗色过渡高度 |
| 2026-05-06 22:35 | main | 优化重构 | 移除首页 Hero 整屏遮罩，仅保留底部 30% 暗色渐变过渡 |
| 2026-05-06 22:37 | main | 优化重构 | 将首页第二屏卡片右侧 Vision 标识改为正常字重，并取消强制大写 |
| 2026-05-06 22:40 | main | 优化重构 | 为首页 Industries & Services 标题下方增加灰色下划线，并接入本地 Industries 卡片图片素材 |
| 2026-05-06 22:52 | main | 优化重构 | 将首页 Industries & Services 灰色下划线从标题下方移动到说明正文下方 |
| 2026-05-06 22:54 | main | 优化重构 | 调整首页 Honors 五个年份按钮为 20px、左对齐、bold 字重 |
| 2026-05-06 22:55 | main | 优化重构 | 调整首页 Events 轮播，使下方说明卡仅在当前展示的 active 卡片中显示 |
| 2026-05-06 22:56 | main | 优化重构 | 缩小首页 Events 轮播下方控制按钮与 active 说明卡的垂直距离 |
| 2026-05-06 23:00 | main | 优化重构 | 调整 About Hero 标题为 96px semibold，正文为 32px medium italic |
| 2026-05-06 23:01 | main | 优化重构 | 调整 About Vision 卡片说明文字为 24px medium |
| 2026-05-06 23:06 | main | 优化重构 | 按 1920 基准调整 About Vision、Honors 和 Culture 区块的字号、字重与奖项文案 |
| 2026-05-06 23:07 | main | 优化重构 | 调整 About Culture 正文/按钮和 Chronicle 区块标题、年份、月份、正文的字号字重 |
| 2026-05-06 23:09 | main | 优化重构 | 移除 About Hero 首屏蒙层，使渐变蒙层从第一屏之后开始 |
| 2026-05-06 23:12 | main | 优化重构 | 为 About Vision 卡片接入本地背景图，并将说明文字固定为两行金色文本 |
| 2026-05-06 23:13 | main | 优化重构 | 修正 About Vision 说明第二行换行问题，强制第二行保持单行显示 |
| 2026-05-06 23:16 | main | 优化重构 | 调整 About Honors 顶部标题与说明排版，使说明右对齐且第二行不换行 |
| 2026-05-06 23:17 | main | 优化重构 | 将 About Honors 顶部说明右边界对齐到屏幕右侧内容线，允许超出标题壳层 |
| 2026-05-06 23:19 | main | 修复缺陷 | 移除 About Honors 顶部说明负右外距，避免右侧正文超出视窗 |
| 2026-05-06 23:20 | main | 优化重构 | 将 About Honors 顶部说明右边界改为父元素最右侧，并让 Vision 背景图显式满高铺满卡片 |
| 2026-05-06 23:31 | main | 优化重构 | 根据 `teamInfo.md` 和本地 team 图片调整 Our Team 页 Hero、Special Forces、成员卡片内容和字体规格 |
| 2026-05-06 23:40 | main | 优化重构 | 根据本地 industries 图片和字号要求调整 Industries 页 Hero 标题、说明卡片和六个行业卡片 |
| 2026-05-06 23:43 | main | 优化重构 | 调整 Industries 卡片文案换行，并按本地 event 图片和字体要求更新 Events Hero 与事件卡片 |
| 2026-05-06 23:47 | main | 优化重构 | 按指定字体规格调整 Contact 页 Hero、Contact us、Join Us、候选人卡片和简历邮箱提示 |
| 2026-05-06 23:48 | main | 优化重构 | 将 Industries 页 Hero 标题顶部位置调整为 590px 设计基准 |
| 2026-05-06 23:52 | main | 优化重构 | 将 Team 页 Zoe Zhang 的图片切换为本地 `/assets/team/team4.png` |
| 2026-05-07 00:08 | main | 优化重构 | 按指定截图结构重排 Team 个人详情页 Hero、信息介绍、Experience 和 Performance 区块 |
| 2026-05-07 00:17 | main | 优化重构 | 调整 Team 个人详情页 Hero 高度、人物图来源、信息区排布和 Experience 双栏内容 |
| 2026-05-07 00:21 | main | 修复缺陷 | 修复 Team 个人详情页 View more 无响应问题，改用原生 details/summary 展开 Honors 和 Performance 更多内容 |
| 2026-05-07 00:23 | main | 优化重构 | 调整 Team 个人详情页面包屑条为黑色背景，并将当前项 Yuxuan Liu 改为白色 |
| 2026-05-07 00:27 | main | 优化重构 | 调整 Industries 第二屏卡片布局，并让行业详情页使用对应卡片图片和 `industriesInfo.md` 内容 |
| 2026-05-07 00:28 | main | 优化重构 | 按指定字号和内容重排事件详情页，保留标题、日期、主说明和 Educational Background |
| 2026-05-07 00:42 | main | 优化重构 | Core Value 页面接入参考 EventLandingPage 的滚动内容与右侧图片堆叠揭示动画 |
| 2026-05-07 00:44 | main | 优化重构 | 调整 Core Value 右侧图片堆叠 sticky 偏移，整体下移 5rem |
| 2026-05-07 00:46 | main | 优化重构 | 调整 Core Value 价值观标题和正文文字规格，并更新 No.1 Tiger 文案 |
| 2026-05-07 00:48 | main | 优化重构 | 移除 Core Value 滚动区额外引导文案和标题下划线，背景改为 #171717 并调整右侧图片 sticky 位置 |
| 2026-05-07 00:50 | main | 优化重构 | 重新对齐 EventLandingPage 的 sticky 图片结构，Core Value 右侧图片改为 top-0 全屏吸顶容器 |
| 2026-05-07 00:53 | main | 优化重构 | Core Value 图片堆叠动画改为参考事件 copy 项目的 fixed-height absolute stack 实现 |
| 2026-05-07 00:56 | main | 优化重构 | Core Value 滚动进度计算进一步对齐事件 copy 项目，并排除事件 copy 原型目录的类型检查 |
| 2026-05-07 01:01 | main | 修复缺陷 | 将 Our Team 的 Find out more 从固定 Yuxuan Liu 改为按成员 slug 跳转对应个人详情 |
| 2026-05-07 01:02 | main | 修复缺陷 | 修复 Core Value 右侧图片栈包裹层宽度塌陷导致图片不可见的问题 |
| 2026-05-07 01:04 | main | 修复缺陷 | 移除 Core Value 页面 main 的 overflow-x-hidden，避免祖先 overflow 影响右侧图片 sticky 固定 |
| 2026-05-07 01:05 | main | 优化重构 | 将 Core Value 右侧 sticky 图片堆整体向上移动 5rem |
| 2026-05-07 01:17 | main | 配置变更 | 按 `/offweb` 子路径重新打包并部署 standalone 运行包，新增 offweb 部署说明 |
| 2026-05-07 01:25 | main | 修复缺陷 | 为 `ImageWithFallback` 增加 basePath 静态资源前缀处理，修复 offweb 子路径部署图片加载失败 |
| 2026-05-07 09:35 | main | 修复缺陷 | 修复 About 到 Core Value 的子路径跳转，并新增自定义 404 Return Home 回到 `/offweb/` |
| 2026-05-07 22:07 | main | 优化重构 | 调整首页 Honors/Events 数据来源与 See More 布局，并更新 Clients 区域样式 |
| 2026-05-07 22:16 | main | 优化重构 | 微调首页 Vision 按钮字距、背景三角形层级、Events 控制区与日期格式，并恢复 Clients 屏深色背景 |
| 2026-05-07 22:22 | main | 修复缺陷 | 修正首页 Header 固定层级、背景三角形可见性、Events 控制区贴右和 About Honors 文案/日期对齐 |
| 2026-05-07 22:32 | main | 优化重构 | 按 EN 文档重建 About Honors 和 Chronicle 数据，调整 Chronicle See More 展开更多，并弱化首页三角形 |
| 2026-05-07 22:38 | main | 优化重构 | 将 Title 英文导航改为源码大写，并按参考图调整 About Honors 标题说明与 View Award 对齐方式 |
| 2026-05-07 22:45 | main | 优化重构 | 按 EN/teamInfo.md 补齐 Team Profile 业绩数据，隐藏空 Honors，并统一 View More 展开动画 |
| 2026-05-07 22:52 | main | 优化重构 | Events 页接入 EN/event.md 全量事件数据，统一 See More 动效，并微调首页 Events 与 About 按钮样式 |
| 2026-05-07 22:57 | main | 修复缺陷 | 降低首页和 About 三角形背景层级，统一收起文案为 COLLAPSE，并调整 Chronicle See More 按钮动效 |
| 2026-05-07 23:04 | main | 优化重构 | 调整首页 Hero 标题渐变、Clients Logo 分组与圆角，并为 About Honors 展开区接入 awardbg 右侧背景 |
| 2026-05-07 23:12 | main | 优化重构 | 为 About Honors 的 View Award 按钮接入 EN/award.md 中对应的微信公众号链接 |
| 2026-05-07 23:26 | main | 新增功能 | 新增全站语言 Provider 和中文页面文案配置，接入页头、页脚、首页、About、Core Value、Team、Industries、Events、Contact 的中英文切换 |
| 2026-05-08 00:05 | main | 新增功能 | 按 Chinese 数据文档补充首页 Honors/Events、About Honors/Chronicle 和 Team 卡片的中文列表数据 |
| 2026-05-08 00:22 | main | 新增功能 | 团队个人详情页接入 `Chinese/teamInfo.md` 中文详情数据，支持六位成员详情页主体内容中文切换 |
| 2026-05-08 00:26 | main | 新增功能 | 行业详情页接入 `Chinese/industriesInfo.md` 中文内容，支持六个行业详情页正文中文切换 |
| 2026-05-08 00:29 | main | 优化重构 | 将公共收起按钮中文文案从 `COLLAPSE` 调整为 `收起` |
| 2026-05-08 00:33 | main | 修复缺陷 | 将行业详情页 metadata 数据拆到服务端安全模块，修复 `generateMetadata` 读取客户端组件导出导致的 undefined 报错 |
| 2026-05-08 00:41 | main | 修复缺陷 | 修复服务行业列表页卡片中文文案复用首页 labels 导致与卡片链接目标错位的问题 |
| 2026-05-08 09:29 | main | 优化重构 | 按 `img.md` 为大图生成 WebP 版本，调整图片加载优先级和 Core Value 滚动计算策略，并优化 offweb 发布包图片体积 |
| 2026-05-08 21:38 | main | 修复缺陷 | 恢复 hover 图片渐进缩放手感，交互图片不再使用 lazy 并改为同步解码 |
| 2026-05-08 21:47 | main | 修复缺陷 | 修复 Clients Logo 墙 hover 暂停和动画时长依赖 inline style 导致的不滚动问题 |
| 2026-05-08 21:51 | main | 修复缺陷 | 收窄 `prefers-reduced-motion` 全局规则，避免系统动效偏好禁用全站 hover/transition/animation |
| 2026-05-08 22:19 | main | 优化重构 | 首页 Hero 改视频背景和流光标题，补齐 Honors 年份与行业详情跳转，新增两条事件并修复 About 交互 |
| 2026-05-08 22:21 | main | 文档更新 | 明确首页 Hero 使用视频不走压缩图，其他页面和卡片大图继续使用 WebP |
| 2026-05-08 22:30 | main | 优化重构 | 首页 Events 轮播接入 `20210218`、`20201023` 和 `event4/event5`，Honors 年份条改为 5 个一屏轮播窗口 |
| 2026-05-08 22:40 | main | 优化重构 | 更新中文文案、团队教育背景分段展示，并将 Header/Footer logo 切换为 SVG |
| 2026-05-08 22:44 | main | 优化重构 | 固定 Title logo 宽度为 86px、Footer logo 宽度为 152px |
| 2026-05-08 22:46 | main | 优化重构 | 将 Title/Footer logo 宽度按 rem 表达并整体放大两倍 |
| 2026-05-08 22:55 | main | 优化重构 | 同步替换后的二维码、Real Estate、Culture 和团队图片资源，并缩小首页 Vision 中文标识 |
| 2026-05-08 22:58 | main | 优化重构 | 调整首页 Honors 左右按钮为移动当前选中年份并支持首尾循环 |
| 2026-05-08 23:02 | main | 优化重构 | 同步新版 logo.svg，并将 Title/Footer logo 显示宽度缩回当前的 50% |
| 2026-05-08 23:05 | main | 优化重构 | 将首页 Clients logo 图片高度调整为占父容器 80% |
| 2026-05-08 23:08 | main | 优化重构 | 补齐新增 Events 英文标题，并为首页 Events 轮播加入 5 秒自动播放 |
| 2026-05-08 23:18 | main | 修复缺陷 | 首页 Events 自动轮播在 active 变化后重新计时，避免首尾手动切换时叠加跳动 |
| 2026-05-08 23:22 | main | 优化重构 | About Vision 改为自然高度布局，Culture 左图去蒙层，Contact us 左栏背景改为 `#A1865F` |
| 2026-05-09 08:50 | main | 优化重构 | Mengcheng Yun 个人详情页隐藏空 Social Engagements 区块 |
| 2026-05-09 08:53 | main | 配置变更 | 新增 OSS 资源前缀切换，图片、视频和字体可在生产环境加载 OSS 资源 |
| 2026-05-09 08:57 | main | 资源整理 | 将 `src/assets/event` 中 156-193 号微信图片按顺序重命名为 `event2` 到 `event39` |
| 2026-05-09 09:07 | main | 资源整理 | 按缺图编号跳过 `event7`、`event10`、`event18`，将事件源素材顺序延伸到 `event42` |
| 2026-05-09 09:16 | main | 数据与资源更新 | Events 页面接入 42 条真实事件图片和中英文真实内容，详情页渲染真实正文段落 |
| 2026-05-09 09:25 | main | 资源发布 | 将 42 张真实 Events 图片同步上传到 OSS 的 `husuweb/assets/event/` 前缀 |
| 2026-05-09 09:29 | main | 子页面交互优化 | Culture 改为 Contact us 镜像双栏效果，子页面统一面包屑和返回顶部，并修复 Team 三角形遮挡 |
| 2026-05-09 09:33 | main | 修复缺陷 | 清理事件详情页正文中的 `[图片]` 占位文本，并修复重复 React key 警告 |
| 2026-05-09 09:35 | main | 修复缺陷 | 修正中文事件分类解析残留，去除“虎诉动态”前的 `????` 前缀 |
| 2026-05-09 09:41 | main | 视觉与资源调整 | Core Value 滚动图片改为 16:14 横向比例，各页面 Hero 图引用从 WebP 切回 PNG |
| 2026-05-10 00:09 | main | 首页与子页面交互优化 | 语言按钮显示目标语言，首页 Events 卡片跳转详情，Clients/二维码/团队资源同步，行业详情面包屑回首页，Zoe 教育背景改为四段 |
| 2026-05-10 00:15 | main | 修复缺陷 | 修复 Core Value 中文空编号导致的重复 key 警告，并为 About Vision See More 接入三段展开文案 |
| 2026-05-10 00:21 | main | 交互优化 | About Vision See More 展开后切换为 Collapse/收起，支持再次点击收起 |
| 2026-05-10 00:28 | main | 资源发布 | 覆盖上传 Footer 图片到 OSS，并为 Footer 二维码 URL 增加版本参数避免旧缓存 |
| 2026-05-10 11:02 | main | 修复缺陷 | 修复 Zoe 中文执业经验字符串语法错误，并在团队个人详情 Hero 邮箱上方添加电话 |
| 2026-05-10 11:03 | main | 文案排版 | 将 Zoe Zhang 中文执业经验按换行拆分为两段显示 |
| 2026-05-10 11:07 | main | 新增功能 | Footer 的 Disclaimer and Privacy 改为点击弹窗展示免责声明与隐私条款 |
| 2026-05-10 11:10 | main | 优化重构 | Footer 二维码引用切换到新的版本参数，并将公安备案号和 ICP 备案号改为外链 |
| 2026-05-10 11:14 | main | 数据更新 | 补齐首页和 About 虎诉荣誉中 2022、2023、2024 年缺失的五条荣誉/赞助活动 |
| 2026-05-10 11:16 | main | 文案更新 | 更新 Min Xu 英文 Social Engagements，补充中国体育仲裁委员会仲裁员身份并修复字符串引号 |
| 2026-05-10 11:26 | main | 文案更新 | 按 `EN/teamInfo.md` 对齐 Li Wan、Zoe Zhang、Mengcheng Yun、Weifan Qiu 英文团队详情字段 |
| 2026-05-10 11:31 | main | 文案更新 | 行业详情面包屑改为 industries / 当前行业，并补齐四个英文行业详情缺失内容 |
| 2026-05-10 11:51 | main | 文案更新 | 中文状态下 Footer 隐私弹窗与 About Vision See More 展开内容切换为中文文案 |
| 2026-05-10 11:53 | main | 修复缺陷 | 虎诉动态列表卡片图片改为完整展示，避免真实事件图被裁切 |
| 2026-05-10 11:55 | main | 视觉优化 | 顶部导航 title active 与 hover 下划线加粗 |
| 2026-05-10 12:02 | main | 修复缺陷 | 首页 Events 轮播改为复用事件库真实图文，修正后两条虎眼观察图文错位 |
| 2026-05-10 12:26 | main | 修复缺陷 | Footer 二维码刷新版本号并同步发布目录，改为完整展示避免裁切 |
| 2026-05-10 12:27 | main | 视觉优化 | Events 列表卡片图片增加同图模糊自适应背景，消除 object-contain 白边 |
| 2026-05-10 12:28 | main | 配置变更 | 主项目 tsconfig 排除独立 cms 工作区，避免其未接入依赖影响官网构建 |
| 2026-05-10 12:29 | main | 视觉优化 | Events 列表卡片去除模糊底图，改为图片本身自适应填满图框 |
| 2026-05-10 16:16 | main | 资源与视觉更新 | About Hero 引用用户指定 about 图片，团队个人详情 Hero 改为按成员使用 `1.png` 到 `6.png` 全屏展示 |
| 2026-05-10 15:23 | main | 视觉优化 | 团队个人详情 Hero 取消强制整屏高度，图片宽高跟随固定 Hero 容器 |
| 2026-05-10 15:25 | main | 视觉优化 | Team 页 Hero 取消视口高度绑定，个人详情 Hero 信息块桌面左距改为 `55.625rem` |
| 2026-05-10 15:27 | main | 视觉优化 | 取消团队个人详情页 Hero 图片蒙层，保留原图直接展示 |
| 2026-05-10 15:43 | main | 交互优化 | 事件详情页面包屑父级改为首页，并将兜底返回路径切换为 `/` |
| 2026-05-10 15:44 | main | 交互优化 | 服务行业详情页面包屑父级改为首页，并将兜底返回路径切换为 `/` |
| 2026-05-10 15:50 | main | 修复缺陷 | 移除 Footer 二维码外层白色背景和内边距，保留透明 PNG 原始显示 |
| 2026-05-10 15:55 | main | 视觉优化 | About Vision 左上图标改为空心上引号，Culture 小 logo 背景切换为 `/assets/about/bg.png` |
| 2026-05-10 15:58 | main | 视觉优化 | About Vision 空心引号改为白色并下移到正文首段左侧，Culture 背景小图缩小到 60% |
| 2026-05-10 16:00 | main | 视觉优化 | About Vision 正文保持与标题同列对齐，引号改为贴近正文首行的白色描边装饰 |
| 2026-05-10 16:04 | main | 视觉优化 | About Vision 引号改用 `Icon.svg`，内容居中对齐标题区，Contact us 背景装饰改用 Culture 同款图片 |
| 2026-05-10 16:08 | main | 视觉优化 | About Vision 标题和正文改为同一满宽容器边界，`Icon.svg` 以内嵌浮动方式进入正文首段 |
| 2026-05-10 16:11 | main | 视觉优化 | About Vision 标题行和正文容器统一左侧内缩，`Icon.svg` 从浮动改为正文首行行内图片 |
| 2026-05-10 23:07 | main | 视觉优化 | About Vision 正文恢复与标题同边界，`Icon.svg` 改为首段左侧绝对定位装饰并向左偏移 |
| 2026-05-10 23:08 | main | 视觉优化 | About Vision 首段 `Icon.svg` 改为仅预留 `2rem` 行内占位，图标向左伸出并贴齐首行 |
| 2026-05-10 23:10 | main | 视觉优化 | About Vision 首段 `Icon.svg` 定位改到 `2rem` 行内占位起点 |
| 2026-05-10 23:12 | main | 视觉优化 | About Vision 内容最大宽度从 `88rem` 调整为 `95rem` |
| 2026-05-10 23:13 | main | 视觉优化 | About Vision 正文取消左内边距，首段 `Icon.svg` 在保持右侧位置基础上放大三倍 |
| 2026-05-10 23:16 | main | 视觉优化 | About Vision 首段 `Icon.svg` 改为贴近正文第一行左侧，并将上一版尺寸缩小 50% |
| 2026-05-10 23:22 | main | 视觉优化 | About Vision 首段正文和 `Icon.svg` 整体向左偏移 `3rem` |
| 2026-05-10 23:23 | main | 视觉优化 | About Vision 首段偏移改为仅作用于第一行，后续换行文本保持原对齐 |
| 2026-05-10 23:36 | main | 视觉优化 | 首页 Events 轮播改为指定 4 条事件，active 说明卡最多显示 5 行并省略超出内容 |
| 2026-05-11 00:51 | main | 交互优化 | Events 和 Industries 详情页面包屑按入口来源显示 Home、Events 或 Industries，并保留静态构建 Suspense 边界 |
| 2026-05-11 00:55 | main | 修复缺陷 | 首页 Events 轮播补回 Kinsey Kang Yanan 事件，OSS bucket 新增 GET/HEAD CORS 规则以支持字体跨域加载 |

## 项目进度

| 时间 | 分支 | 完成的功能 / 工作 | 说明 |
| :--- | :--- | :--- | :--- |
| 2026-05-15 22:51 | cms | main 合并到 cms | 冲突文件以 `main` 版本为主完成合并，保留 `cms` 分支 Provider 可选 CMS 状态兼容层 |
| 2026-05-15 22:33 | main | SEO 与 `/client` 生产发布 | 当前线上版本 `/opt/tigerpartners-web/releases/20260515-2230` 已启用中文首页标题、隐藏语义 h1 和 `/client` 到首页的兼容跳转 |
| 2026-05-15 22:25 | main | 首页搜索标题优化 | 首页显式提供中文 SEO 标题和语义标题，降低搜索结果继续采用 `WE KNOW HOW TO WIN` 作为标题的概率；同时补齐 `/client` 兼容重定向 |
| 2026-05-15 22:15 | main | 万力尾部业绩上下对齐 | `TeamProfilePage` 中万力尾部左列改为 `1fr/auto` 行布局，固定卡片间距并让第 23 条承担高度补偿 |
| 2026-05-15 22:13 | main | 万力业绩尾部布局 | `TeamProfilePage` 为万力最后三条业绩启用定制两列布局，满足左二右一和底部对齐展示 |
| 2026-05-15 22:01 | main | 个人简历移动端 hero 调整 | `TeamProfilePage` 在移动端先渲染个人照片再显示姓名、职位、电话和邮箱；万力业绩尾部中英文数据已核对一致 |
| 2026-05-15 21:59 | main | event 图片替换发布 | 本地 `src/assets/event` 替换图已同步到 `public/assets/event` 与 OSS，线上事件页可访问，新版本服务状态为 `active` |
| 2026-05-15 10:07 | main | 官网生产发布 | 已将当前 Next standalone 构建包部署到 `www.tigerpartners.cn` 根路径，验证首页、Events、万力个人页、About 和关键图片资源均可访问 |
| 2026-05-15 09:54 | main | event2 前 9 张封面顺序同步 | `public/assets/event/event2` 的 1-9 号封面已与 `src/assets/event/event2` 同名文件逐一匹配，页面静态资源读取顺序与源目录命名一致 |
| 2026-05-15 09:46 | main | 万力个人业绩同步 | `src/data/teamProfiles.ts` 中万力英文 `liWanAchievements` 与中文 `zhTeamDetails["li-wan"].achievements` 已按 `EN/liwanPerformance.md` 同步为 25 条 |
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
| 2026-05-06 21:42 | main | 首页字体与轮播微调 | Hero 标题改为实际大写并放大 1.2 倍；Vision 文案拆分细体斜体与粗体；Industries 正文/卡片、Honors 说明和 Events 轮播内容按反馈调整 |
| 2026-05-06 21:55 | main | 首页 1920 基准 rem 换算 | 将 Hero、Vision、Industries、Honors、Events 和 Clients 文案字号按 16px 基准落到固定 rem，并补充 Events 描述卡渐变与右下角三角形视觉 |
| 2026-05-06 22:00 | main | 首页 Events 轮播布局修正 | 移除轮播卡外层渐变边框，保持图片与说明盒独立分离，并把图片日期/标题定位到左下角 70% 宽文字区 |
| 2026-05-06 22:05 | main | 首页 Events 轮播宽度修正 | 轮播容器改为 `w-full` 占满父级内容区，轮播卡宽度设置为 `62.1875rem max-w-full` 对应 995px 设计稿宽度 |
| 2026-05-06 22:06 | main | 首页 Events 说明卡换行修正 | 删除说明段落 `truncate`，让 Kinsey Kang Yanan 事件描述在下方方块中按内容自然换行 |
| 2026-05-06 22:07 | main | 首页 Events 横向内距修正 | 图片左下角文字 `left` 与下方说明卡左右 padding 统一设置为 `5.5625rem`，对应 89px 设计稿距离 |
| 2026-05-06 22:09 | main | 首页 Events 轮播展示修正 | 图片日期和标题文字实际左距保持 `5.5625rem`，标题左竖线仅包裹正文；轮播舞台高度加到 `64rem / 68rem` 展示完整说明卡 |
| 2026-05-06 22:31 | main | Hero 本地素材接入 | 发布 `src/assets/{home,about,team,industries,event,contact}/hero.png` 到 `public/assets/*/hero.png`，并替换对应页面 Hero 背景引用 |
| 2026-05-06 22:33 | main | 首页 Hero 亮度调整 | 将首页 Hero 图片 opacity 从 `60%` 提高到 `90%`，整体遮罩从 `black/70` 降低到 `black/38`，让本地背景图更清晰明亮 |
| 2026-05-06 22:35 | main | 首页 Hero 遮罩移除 | 删除 Hero 全屏渐变遮罩，只保留 `bottom: 0`、高度 `30%` 的底部暗色过渡层 |
| 2026-05-06 22:37 | main | 首页 Vision 标识字重调整 | 右侧旋转 `Vision` 从 `font-light uppercase` 改为 `font-normal`，按文本本身大小写展示 |
| 2026-05-06 22:40 | main | 首页 Industries 图片接入 | 发布 `src/assets/home/INDUSTRIES1.png` 到 `INDUSTRIES5.png` 至 `public/assets/home`，并替换首页前五张行业卡片图片 |
| 2026-05-06 22:52 | main | 首页 Industries 下划线位置修正 | 灰色横线改为跟随说明正文之后显示，不再位于 Industries & Services 标题正下方 |
| 2026-05-06 22:54 | main | 首页 Honors 年份按钮排版 | 年份按钮改为 `text-[1.25rem] font-bold justify-start text-left px-4`，对应 20px 左对齐粗体样式 |
| 2026-05-06 22:55 | main | 首页 Events active 说明卡 | Events 轮播下方说明块增加 `position === "active"` 条件渲染，左右预览卡只显示图片区域 |
| 2026-05-06 22:56 | main | 首页 Events 控制按钮间距 | 轮播舞台高度从 `64rem / 68rem` 调整为 `56rem / 58rem`，控制按钮外边距从 `mt-4` 调整为 `mt-1` |
| 2026-05-06 23:00 | main | About Hero 字体调整 | About us 标题设置为 `6rem`、`fontWeight: 600`，Hero 正文设置为 `2rem`、`fontWeight: 500`、italic |
| 2026-05-06 23:01 | main | About Vision 说明字体调整 | `VisionCard` 顶部说明从 clamp 字号改为 `text-[1.5rem] font-medium`，取消 capitalize |
| 2026-05-06 23:06 | main | About 内容字体系统调整 | Vision 标题/正文/See More、Honors 标题/说明/年份/奖项展开内容、Culture 标题按指定 px 值换算为 rem 并更新字重 |
| 2026-05-06 23:07 | main | About Culture 与 Chronicle 字体调整 | Culture 正文改为 `1.75rem` regular、按钮改为 `1.125rem` medium；Chronicle 标题/说明/年份/月/正文按指定 rem 和字重落地 |
| 2026-05-06 23:09 | main | About Hero 蒙层位置调整 | About Hero 的两层渐变遮罩从 `inset-0` 改为 `top-[100svh] bottom-0`，首屏完整展示原图 |
| 2026-05-06 23:12 | main | About Vision 背景图接入 | 发布 `src/assets/about/aboutVision.png` 到 `public/assets/about/aboutVision.png`，并作为 `VisionCard` 背景图层使用 |
| 2026-05-06 23:13 | main | About Vision 两行文案修正 | 将说明容器宽度放宽到 `max-w-[56rem]`，并给第二行加 `whitespace-nowrap` |
| 2026-05-06 23:16 | main | About Honors 顶部说明排版 | Honors 顶部说明改为 `justify-self-end text-right`，拆成两个 block，第二行使用 `whitespace-nowrap` |
| 2026-05-06 23:17 | main | About Honors 说明右边界调整 | 顶部说明增加 `lg:-mr-[var(--shell-md)]`，让右对齐基准移动到屏幕右侧内容线 |
| 2026-05-06 23:19 | main | About Honors 说明溢出修正 | 删除 `lg:-mr-[var(--shell-md)]`，并增加 `max-w-[calc(100vw-var(--shell-md)*2)]` 约束右侧说明宽度 |
| 2026-05-06 23:20 | main | About Honors 与 Vision 背景微调 | Honors 顶部说明删除 max-width 约束并使用父网格右边界对齐；Vision 背景图从 `size-full` 改为 `h-full w-full` |
| 2026-05-06 23:31 | main | Team 页字体和成员数据调整 | Team Hero、Special Forces、Partner 分区、成员姓名/职位/Find out more 按指定 px 换算为 rem，成员卡片改用 `teamInfo.md` 的姓名职位和本地团队图片 |
| 2026-05-06 23:40 | main | Industries 页字体与图片调整 | Industries 标题改为左对齐 6rem medium，说明卡片移到标题下方，六个行业卡片接入 `in1.png` 到 `in6.png` 并使用 3rem semibold 标题 |
| 2026-05-06 23:43 | main | Industries 与 Events 文案图片调整 | Industries 卡片标题改为指定大小写与换行；Events Hero 和卡片文案按 100px/36px/30px/24px 规格更新，并接入 event1-3 图片 |
| 2026-05-06 23:47 | main | Contact 页字体与文案调整 | Contact Hero、Contact us 双栏、Join Us、候选人卡片和招聘邮箱提示按 96px/52px/36px/32px/28px 规格更新 |
| 2026-05-06 23:48 | main | Industries Hero 位置调整 | 将 Industries 标题容器从垂直居中改为顶部 `36.875rem` 偏移，对应 1920 设计稿 590px |
| 2026-05-06 23:52 | main | Team Zoe Zhang 图片接入 | 发布 `src/assets/team/team4.png` 到 public，并将 Zoe Zhang 卡片图片从原型备用图改为 `/assets/team/team4.png` |
| 2026-05-07 00:08 | main | Team Profile 详情页重排 | 将 `/team/yuxuan-liu` 改为对角渐变 Hero、128px 内容边距的信息介绍屏、Experience 屏和 Performance 屏 |
| 2026-05-07 00:17 | main | Team Profile 详情页细化 | Hero 固定为 `45.9375rem` 高并改用 `team1.png`，Language Skills 与 Professional Qualification 同列，Experience 区改为左侧 Practice 双块、右侧 Honors |
| 2026-05-07 00:21 | main | Team Profile 展开交互 | 为 Honors 和 Performance 的 View more 增加可展开/收起内容，并补充 `teamInfo.md` 后续条目 |
| 2026-05-07 00:23 | main | Team Profile 面包屑视觉 | 将 Our Team / Yuxuan Liu 面包屑条调整为黑色背景，当前项使用白色文字 |
| 2026-05-07 00:27 | main | Industries 详情内容接入 | Finance 与 Real Estate 在列表第二段右侧上下排列，详情页 Hero 使用对应行业卡片图片并展示 `industriesInfo.md` 文案 |
| 2026-05-07 00:28 | main | Events 详情页排版 | 事件详情页改为 64px 标题、28px 日期、24px light italic 主说明和 Educational Background 信息结构 |
| 2026-05-07 00:42 | main | Core Value 滚动动画 | 新增 `CoreValueScrollFlow`，使用 `core1-3.png` 实现桌面滚动进度驱动的右侧图片堆叠揭示与左侧价值观内容切换 |
| 2026-05-07 00:44 | main | Core Value 图片吸顶位置 | 右侧图片堆 sticky 容器改为 `top-[5rem]`，图片堆整体向下偏移 `5rem` |
| 2026-05-07 00:46 | main | Core Value 文案规格 | 价值观标题改为 `1.75rem` 金色 semibold，正文改为 `1.5rem` regular，并替换 No.1 Tiger 段落 |
| 2026-05-07 00:48 | main | Core Value 视觉细化 | 删除滚动区顶部额外引导文案和标题下划线，背景统一为 `#171717`，右侧图片堆改为 `top-[10rem]` sticky |
| 2026-05-07 00:50 | main | Core Value sticky 动画对齐 | 右侧图片堆恢复为参考动画的 `sticky top-0 h-screen` 居中容器，内层下移 `10rem` 并缩放到 `0.9` |
| 2026-05-07 00:53 | main | Core Value 图片堆叠对齐 | 右侧图片堆改为 `事件 copy` 的固定高度 absolute 叠放结构，使用 px 级 `translateY` 和 `clip-path` 揭示 |
| 2026-05-07 00:56 | main | Core Value 事件 copy 动画对齐 | 滚动监听改为与 `FeaturesSection` 一致的 window scroll 进度计算，图片栈高度和 transform 过渡改为 inline 固定值，并从 `tsconfig.json` 排除 `事件 copy` 原型 |
| 2026-05-07 01:01 | main | Team 动态个人详情 | 新增 `src/data/teamProfiles.ts` 和 `/team/[slug]` 路由，Team 卡片按成员 slug 跳转并渲染对应姓名、图片、职位、邮箱和个人介绍内容 |
| 2026-05-07 01:02 | main | Core Value 图片显示修复 | 为右侧图片堆的下移和缩放包裹层补充 `w-full`，保证 `CoreImageStack` 能继承 sticky 列宽度正常显示 |
| 2026-05-07 01:04 | main | Core Value sticky 修复 | 删除 `CoreValuePage` 根 main 上的 `overflow-x-hidden`，让右侧图片区按视窗而不是裁剪祖先执行 sticky 固定 |
| 2026-05-07 01:05 | main | Core Value 图片位置调整 | 右侧图片堆偏移从 `translate-y-[10rem]` 调整为 `translate-y-[5rem]`，整体向上移动 5rem |
| 2026-05-07 01:17 | main | offweb 部署 | 使用 `NEXT_SNAPSHOT_BASE_PATH=/offweb` 构建 standalone 包，发布到 `husuweb-offweb.service` 并通过 Nginx 暴露 `/offweb/` |
| 2026-05-07 01:25 | main | offweb 图片路径修复 | `next.config.ts` 注入 `NEXT_PUBLIC_BASE_PATH`，`ImageWithFallback` 自动将 `/assets/*` 输出为 `/offweb/assets/*` |
| 2026-05-07 09:35 | main | offweb 子路径跳转修复 | Culture 入口改用 Next `Link`，线上 href 为 `/offweb/about/core-value/`；新增 not-found 页，Return Home href 为 `/offweb/` |
| 2026-05-07 22:07 | main | 首页 Honors/Events 与 Clients 调整 | Honors 改为按 `EN/award.md` 年度展示最近三条，Events 使用 `EN/event.md` 指定三条和 `assets/home` 图片，Clients 区域样式同步调整 |
| 2026-05-07 22:16 | main | 首页视觉细节修正 | Vision 按钮字距缩小，首页内容层级高于背景三角形，Events 控制区右对齐且日期改为英文月份格式，See More 增加 hover 位移 |
| 2026-05-07 22:22 | main | 首页与 About Honors 细节修复 | Header 移到 Home 顶层保持吸顶，三角形位于背景之上内容之下，Events 控制按钮绝对贴右，About Honors 正文不再溢出视窗且日期置顶 |
| 2026-05-07 22:32 | main | About 数据接入与首页三角形微调 | Honors 使用 `EN/award.md` 年度奖项，Chronicle 使用 `EN/CHRONICLE.md` 全量时间线，See More 展开全部年份，首页三角形下移并降低透明度 |
| 2026-05-07 22:38 | main | Title 与 About Honors 展示调整 | Header 英文导航使用大写源文案；About Honors 标题改为斜体金色，右侧说明按参考图排版，View Award 支持公众号链接字段 |
| 2026-05-07 22:45 | main | Team Profile 真实业绩与展开交互 | Team 个人详情页使用 `EN/teamInfo.md` 全量个人业绩；无 Honors 的成员不展示 Honors 区块；View More 使用 About 同款按钮与 grid 展开动画 |
| 2026-05-07 22:52 | main | Events 数据与按钮交互 | Events 列表和详情页共用 `src/data/events.ts` 的 28 条事件；列表 See More 改为 Culture 同款按钮动效；首页 Events 控制按钮居中，About Vision/Culture 按钮间距同步微调 |
| 2026-05-07 22:57 | main | 背景层级和收起按钮修复 | Home/About 页面内容统一置于三角形背景之上；Chronicle See More 改为 Culture 同款按钮；所有展开收起态文案统一为 `COLLAPSE` |
| 2026-05-07 23:04 | main | 首页与 About Honors 视觉微调 | 首页 Hero 标题使用指定金色对角渐变；Clients 三行 Logo 改为互不重复分组并加小圆角；About Honors 展开内容右侧使用 `awardbg.png` 背景 |
| 2026-05-07 23:12 | main | About Honors 公众号跳转 | View Award 按钮按奖项绑定 `EN/award.md` 里的微信公众号文章链接；无公众号链接的条目不显示按钮 |
| 2026-05-07 23:26 | main | 中文网站文案接入 | 新增 `src/i18n/LanguageProvider.tsx` 与 `src/i18n/copy.ts`，语言按钮可同步切换页面主体、页脚和主要事件中文摘要 |
| 2026-05-08 00:05 | main | 中文列表数据接入 | 首页荣誉和动态、About 荣誉和大事记、团队卡片姓名职位按 `Chinese/awards.md`、`Chinese/event.md`、`Chinese/CHRONICLE.md`、`Chinese/teamInfo.md` 切换中文 |
| 2026-05-08 00:22 | main | 团队详情中文化 | `TeamProfilePage` 按当前语言显示 `Chinese/teamInfo.md` 的基本信息、专业领域、执业经验、荣誉和个人业绩 |
| 2026-05-08 00:26 | main | 行业详情中文化 | `/industries/[slug]` 按当前语言显示 `Chinese/industriesInfo.md` 的行业简介与服务范围 |
| 2026-05-08 00:29 | main | 收起按钮中文文案 | 公共 `copy.common.collapse` 中文值改为 `收起`，英文仍保持 `COLLAPSE` |
| 2026-05-08 00:33 | main | 行业详情 metadata 修复 | 新增 `src/data/industryMetadata.ts` 供 `/industries/[slug]` 服务端 metadata 和静态参数生成使用 |
| 2026-05-08 00:41 | main | 服务行业卡片文案修复 | `/industries` 卡片标题改为随 slug 绑定的中英文文案，列表显示与详情跳转保持一致 |
| 2026-05-08 09:29 | main | 图片加载优化 | 关键首屏图使用 eager/high，非首屏图 lazy，页面大图切换为 WebP，Core Value 滚动动画使用 rAF 与 IntersectionObserver 降低无效计算 |
| 2026-05-08 21:38 | main | hover 图片动画修复 | 首页行业、事件、行业列表、团队、Contact 城市图和 About Culture 的 hover 缩放图片改为先加载同步解码，避免直接放大 |
| 2026-05-08 21:47 | main | Clients Logo 滚动修复 | 移除 logo 行 hover 暂停规则，并将滚动动画时长写入全局 CSS，保证三行 Logo 持续滚动 |
| 2026-05-08 21:51 | main | 全局动效规则修复 | `prefers-reduced-motion` 不再压缩所有 transition 和 animation 时长，恢复 See More、Logo 墙和图片 hover 的正常过渡 |
| 2026-05-08 22:19 | main | 首页与 About 交互更新 | Hero 接入海浪视频和流光文字；首页 Honors 默认 2026 并补 2020/2019；行业卡片跳详情；Events 新增 20210218/20201023；修复 Core Value rootMargin、Culture 图片和 Chronicle 年份按钮 hover |
| 2026-05-08 22:21 | main | 首页 Hero 资源策略记录 | 首页 Hero 明确保留视频资源，不再纳入 WebP 压缩图策略；除指定原图外其余页面继续使用 WebP |
| 2026-05-08 22:30 | main | 首页 Events 与 Honors 微调 | 首页 Events 轮播补齐 2021/2020 两条虎眼观察和图片资源；Honors 年份按钮改为每屏 5 个并通过左右按钮循环滑动 |
| 2026-05-08 22:40 | main | 文案与 Logo 统一 | Awards Won 中文改为“所获奖项”，首页 Vision 中文字号降至 80%，团队口号和联系文案更新，个人教育背景按分号分段，Header/Footer 使用 `logo.svg` |
| 2026-05-08 22:44 | main | Logo 尺寸校准 | Title/Header logo 改为 86px 宽，Footer logo 改为 152px 宽，均保持 SVG 等比高度 |
| 2026-05-08 22:46 | main | Logo 尺寸放大 | Title/Header logo 宽度改为 `10.75rem`，Footer logo 宽度改为 `19rem`，均为上一版两倍 |
| 2026-05-08 22:55 | main | 替换图片资源同步 | 新二维码发布到 Footer；首页 Real Estate 和团队 team2 重新生成 WebP；About Culture 左图同步新 PNG；首页 Vision 中文“虎诉愿景”改为 `7rem` |
| 2026-05-08 22:58 | main | Honors 选择交互修正 | 首页 Honors 左右按钮改为移动 active 年份，2026 左移到 2019，2019 右移回 2026，并保持 5 个年份窗口跟随 |
| 2026-05-08 23:02 | main | Logo 资源与尺寸更新 | 新版 `logo.svg` 发布到 Title/Footer public 路径；Header 宽度改为 `5.375rem`，Footer 宽度改为 `9.5rem` |
| 2026-05-08 23:05 | main | Clients logo 尺寸调整 | 首页客户 Logo 墙中每个 logo 改为 `h-[80%] w-auto max-w-full`，占据卡片父容器高度 80% |
| 2026-05-08 23:08 | main | Events 轮播与标题修正 | 新增两条事件的英文标题补齐到首页和 `/events` 数据源；首页 Events 使用 `useEffect` 每 5 秒自动切换 |
| 2026-05-08 23:18 | main | Events 首尾切换优化 | 自动轮播 effect 依赖 active event，手动点击后重启 5 秒计时，减少最后一张点右时的连续跳动感 |
| 2026-05-08 23:22 | main | About 与 Contact 视觉调整 | About Vision 去除固定高度依赖并为 See More 保留下边距；Culture 左图取消滤镜/蒙层；Contact us 左侧背景色改为 `#A1865F` |
| 2026-05-09 08:50 | main | Team Profile 信息区调整 | Mengcheng Yun / 云梦成的 `socialEngagements` 清空，详情页仅在 Social Engagements 有内容时渲染该区块 |
| 2026-05-09 08:53 | main | OSS 静态资源接入 | 新增 `assetUrl()`、`.env.production` 和 `public/font/poppins.ttf`，生产构建默认将 `/assets/*`、首页视频和字体加载到 OSS 前缀 |
| 2026-05-09 08:57 | main | Events 源素材命名整理 | 将 `src/assets/event` 新增图片从微信原始文件名整理为连续的 `event2` 到 `event39` |
| 2026-05-09 09:07 | main | Events 源素材跳号整理 | 源素材命名跳过缺图编号 7、10、18，当前事件素材覆盖 `event2` 到 `event42` 的有效编号 |
| 2026-05-09 09:16 | main | Events 真实内容与图片接入 | 将 Events 列表扩展为 42 条真实事件，逐条绑定真实图片，并在详情页展示中英文真实正文 |
| 2026-05-09 09:25 | main | Events 图片 OSS 同步 | 上传 `public/assets/event/event1-42` 到 OSS，保证生产环境资源前缀下可访问 |
| 2026-05-09 09:29 | main | 子页面导航与视觉统一 | 新增 `SubpageBreadcrumb` 和 `BackToTop`，统一详情页返回上一页、返回顶部和面包屑视觉，并调整 Culture/Team 背景层级 |
| 2026-05-09 09:33 | main | Events 详情占位清理 | 事件详情正文渲染前移除图片占位文本，并用 slug + 序号生成段落 key |
| 2026-05-09 09:35 | main | Events 中文分类规范化 | `localizeEvent` 将中文标题内的分类前缀拆出，避免列表和详情显示 `???? | 虎诉动态` |
| 2026-05-09 09:41 | main | Core Value 与 Hero 资源修正 | Core Value 桌面滚动图改为 `16:14` 横向展示，About/Team/Industries/Events/Contact/Core Value Hero 图使用 PNG |
| 2026-05-10 00:09 | main | 首页与子页面资源交互修正 | 同步 42 张客户 Logo、新二维码和团队图 WebP，首页动态轮播卡片跳详情，Back 按钮改为返回上一页，行业详情面包屑回首页 |
| 2026-05-10 00:15 | main | Core Value 与 About Vision 修复 | Core Value 中文标题不再显示空编号，组件 key 改为稳定组合；About Vision See More 展开用户指定的三段英文愿景文案 |
| 2026-05-10 00:21 | main | About Vision 展开收起 | Vision See More 按钮改为展开/收起切换，展开状态显示 `Collapse` / `收起` |
| 2026-05-10 00:28 | main | Footer 二维码替换生效 | 新二维码同步到 public 和 OSS，Footer 引用增加版本参数确保线上刷新 |
| 2026-05-10 11:02 | main | Team Profile 电话展示 | 团队个人详情 Hero 信息块新增电话链接，并修复 Zoe Zhang 中文详情数据中的未闭合字符串 |
| 2026-05-10 11:03 | main | Zoe Zhang 执业经验分段 | `TeamProfilePage` 支持按换行拆分执业经验，Zoe 中文内容拆为两段 |
| 2026-05-10 11:07 | main | Footer 隐私弹窗 | `SiteFooter` 新增 Disclaimer modal，点击页脚 Disclaimer and Privacy 展示用户指定条款内容 |
| 2026-05-10 11:10 | main | Footer 二维码与备案链接修正 | Footer 二维码使用 `QRcode.png?v=202605101115` 避免旧缓存，公安备案和 ICP 备案号支持点击跳转 |
| 2026-05-10 11:14 | main | 虎诉荣誉缺失条目补齐 | 首页 Honors 与 About Honors 补入 202211、202304、20240515、20241129、202203 五条中英文荣誉数据和公众号链接 |
| 2026-05-10 11:16 | main | Min Xu 英文简介更新 | `src/data/teamProfiles.ts` 与 `EN/teamInfo.md` 同步更新 Min Xu Social Engagements 文案，页面数据构建通过 |
| 2026-05-10 11:26 | main | 团队英文详情按源文档校准 | Li Wan、Zoe Zhang、Mengcheng Yun、Weifan Qiu 的英文详情字段按 `EN/teamInfo.md` 补全并通过构建 |
| 2026-05-10 11:31 | main | 行业详情英文内容与面包屑修正 | `/industries/[slug]` 面包屑回到 `/industries`，英文 Private Equity、Real Estate、Sports and E-Sports、Cyber Tech and Game 内容按源文档补齐 |
| 2026-05-10 11:51 | main | 中文隐私与愿景文案补齐 | `SiteFooter` 隐私弹窗按语言显示中文条款，About Vision See More 中文展开内容替换为用户指定三段文案 |
| 2026-05-10 11:53 | main | 虎诉动态列表图片完整展示 | `EventsPage` 小卡片图框改为 `16:9` + `object-contain`，保留左上偏移并避免真实事件图裁切 |
| 2026-05-10 11:55 | main | 顶部导航下划线优化 | `SiteHeader` 桌面和移动 active 下划线由 `1px` 加粗为 `0.125rem`，hover 展开线同步加粗 |
| 2026-05-10 12:02 | main | 首页 Events 轮播数据同源 | `HomePage` 通过 slug 读取 `src/data/events.ts`，标题、摘要、日期、图片和详情跳转与 Events 页面保持一致 |
| 2026-05-10 12:26 | main | Footer 二维码缓存与展示修正 | `SiteFooter` 二维码 URL 版本更新为 `202605101205`，dist 发布目录同步当前 QR 文件，图片展示改为 `object-contain` |
| 2026-05-10 12:27 | main | Events 卡片图片背景自适应 | `EventsPage` 卡片图框增加同图模糊 cover 背景，顶层保持 contain 完整展示图片 |
| 2026-05-10 12:28 | main | 官网构建范围修正 | `tsconfig.json` 排除未纳入当前官网运行链路的 `cms` 目录，恢复主应用类型检查范围 |
| 2026-05-10 12:29 | main | Events 图片自适应填充 | `EventsPage` 卡片图片移除额外背景层和遮罩，单图使用 `object-cover` 填满 `16:9` 图框 |
| 2026-05-10 16:16 | main | About 与团队详情 Hero 图片替换 | `AboutHero` 指向 `/assets/about/about.png`；`TeamProfilePage` 按成员 slug 使用 `/assets/team/1.png` 至 `/assets/team/6.png` 作为全屏首屏图 |
| 2026-05-10 15:23 | main | Team Profile Hero 高度校准 | `TeamProfilePage` Hero 从 `100svh` 调整为 `45.9375rem`，图片跟随父容器宽高展示 |
| 2026-05-10 15:25 | main | Team Hero 与个人信息定位 | `TeamPage` Hero 固定为 `67.5rem`，图片跟随父容器高度；`TeamProfilePage` 信息块桌面左距按 890px 换算为 `55.625rem` |
| 2026-05-10 15:27 | main | Team Profile Hero 蒙层移除 | 删除个人详情 Hero 的左右暗渐变和底部渐变层，让首屏人物图无蒙层显示 |
| 2026-05-10 15:43 | main | Event Detail 面包屑回首页 | `EventDetailPage` 面包屑父级使用 `copy.nav.home`，fallback 返回首页，匹配首页动态卡片进入详情的路径语义 |
| 2026-05-10 15:44 | main | Industry Detail 面包屑回首页 | `IndustryDetailPage` 面包屑父级使用 `copy.nav.home`，fallback 返回首页，匹配首页行业卡片进入详情的路径语义 |
| 2026-05-10 15:50 | main | Footer 二维码透明展示 | `SiteFooter` 去掉二维码容器的 `bg-white p-1`，避免透明 PNG 被外层白底覆盖 |
| 2026-05-10 15:55 | main | About Vision 与 Culture 图标校准 | `VisionCard` 左上装饰改为描边空心上引号并与标题首行对齐；`Culture` 背景小 logo 改用 `public/assets/about/bg.png` |
| 2026-05-10 15:58 | main | About Vision 正文对齐 | `VisionCard` 改为标题区和正文区共享两列网格，白色描边引号与首段正文同排；`Culture` 背景图宽度从 `26.25rem` 调为 `15.75rem` |
| 2026-05-10 16:00 | main | About Vision 引号微调 | `VisionCard` 正文列继续与标题列共用边距，引号改为正文列内绝对定位并靠近首行文字 |
| 2026-05-10 16:04 | main | Vision 与 Contact 背景资源对齐 | `VisionCard` 使用 `/assets/about/Icon.svg` 作为正文左侧引号并收拢为居中内容容器；`ContactPage` Contact us 左侧背景改用 `/assets/about/bg.png` |
| 2026-05-10 16:08 | main | Vision 内容边界与图标嵌入 | `VisionCard` 去掉标题和正文的独立左列，标题区和正文区共享 `max-w-[88rem]` 左右边界，首段正文内使用浮动 `Icon.svg` |
| 2026-05-10 16:11 | main | Vision 引号嵌入方式修正 | `VisionCard` 标题行和正文区均使用 `lg:pl-[7rem]`，`Icon.svg` 改为首段行内元素，避免整段文字围绕图片 |
| 2026-05-10 23:07 | main | Vision 首段图标定位 | `VisionCard` 将 `Icon.svg` 从文本流中移出，使用 `left-[-7.625rem] top-[-3.125rem]` 贴近首段第一行左侧，正文文本与标题保持统一左边界 |
| 2026-05-10 23:08 | main | Vision 图标占位微调 | `VisionCard` 首段使用 `w-[2rem]` 行内占位包裹 `Icon.svg`，图标 `left-[-3.625rem]` 向左伸出，避免完整图标宽度挤压正文 |
| 2026-05-10 23:10 | main | Vision 图标定位点修正 | `VisionCard` 首段 `Icon.svg` 从 `left-[-3.625rem]` 改为 `left-0`，定位到 `2rem` 行内占位起点 |
| 2026-05-10 23:12 | main | Vision 内容宽度调整 | `VisionCard` 内部内容容器改为 `max-w-[95rem]`，放宽标题与正文排版宽度 |
| 2026-05-10 23:13 | main | Vision 正文和图标微调 | `VisionCard` 正文区移除 `lg:pl-[7rem]`；`Icon.svg` 宽度改为 `16.875rem`，左偏移改为 `-11.25rem` 以保持右侧锚点 |
| 2026-05-10 23:16 | main | Vision 首段图标贴合 | `VisionCard` 首段 `Icon.svg` 改为贴近正文第一行左侧，宽度从 `16.875rem` 缩小到 `8.4375rem` |
| 2026-05-11 22:49 | main | Events 与 About 数据交互修正 | Events 导出范围按 `EN/event.md` 过滤为 28 条，中文日期显示为 `YYYY.MM.DD`；About Chronicle 补入 2026 年 3-5 月三条记录，Honors 年份按降序展示；详情页 Back 可恢复进入前滚动位置 |
| 2026-05-11 23:00 | main | About Chronicle 中文文案校准 | About Chronicle 2026 年三月、四月、五月中文正文按用户提供版本替换，补充 CCAS、贸仲仲裁员名册和主要裁判领域表述 |
| 2026-05-11 23:21 | main | Events event2 新增事件接入 | 从 `EN/event2.md` / `Chinese/event2.md` 生成 15 条中英事件数据，复制 event2 与 eventinfo2 图片到 public，并让事件详情页按 `[IMAGE]` 占位顺序插入详情图片 |
| 2026-05-11 23:28 | main | Events 旧事件详情图接入 | 从 `src/assets/event/eventinfo` 按文件名时间顺序为旧 28 条事件分配 22 张详情图，详情页同时支持整行和行内图片占位符 |
| 2026-05-11 23:33 | main | Footer 二维码资源同步 | 将新版 `src/assets/foot/QRcode.png` 覆盖到 `public/assets/foot/QRcode.png`，并将 Footer 引用版本刷新到 `202605112333` |
| 2026-05-11 23:36 | main | Event Detail 版式调整 | `EventDetailPage` 删除右侧事件封面图容器，正文区域占满内容父容器，详情插图使用 `md:w-[70%]` 居中显示 |
| 2026-05-11 23:41 | main | About Hero 图片同步 | `AboutHero` 背景路径改为 `/assets/about/hero.png`，并将 `src/assets/about/hero.png` 覆盖发布到 `public/assets/about/hero.png` |
| 2026-05-11 23:45 | main | Clients Logo 滚动速度调整 | `.client-logo-track` 动画时长从 `135s` 缩短到 `103.85s`，实现 1.3 倍滚动速度 |
| 2026-05-11 23:49 | main | About Honors 月份排序 | `Honors` 增加 `sortAwardsByDateDesc`，在年份降序基础上对每个年份的奖项按 `date` 降序排序 |
| 2026-05-12 00:52 | main | 根路径服务器部署 | 使用根路径构建的 `dist/root-standalone.tgz` 发布到 `/opt/daxuanweb-root/releases/20260512-0046`，`current` 指向新 release，公网 IP 验证返回 200 |
| 2026-05-12 01:18 | main | 域名 HTTPS 接入 | `www.tigerpartners.cn` 指向根路径 Next 服务，Certbot 证书签发并启用自动续期；裸域通过阿里云 URL 转发到 HTTPS www 域名 |
| 2026-05-12 01:40 | main | 独立部署目录迁移 | 改用 `/opt/tigerpartners-web/releases/20260512-0136` 和 `tigerpartners-web.service` 独立承载虎诉官网，Nginx `www.tigerpartners.cn` 反代到 `127.0.0.1:3004`；线上 About Hero、Footer 二维码、邱伟帆图片和 Events 图片已与本地哈希一致 |
| 2026-05-12 01:52 | main | OSS 关键图片同步 | 覆盖 `husuweb/assets/about/hero.png`、`husuweb/assets/foot/QRcode.png` 和 `husuweb/assets/team/team6.webp`，下载回源校验均与本地 SHA256 一致 |
| 2026-05-12 01:57 | main | OSS Events 图片同步 | 上传 `public/assets/event/event2` 的 15 张列表图和 `public/assets/event/eventinfo2` 的 25 张详情图到 OSS，全部下载回源校验通过 |
| 2026-05-12 02:01 | main | OSS Clients Logo 同步 | 上传 `public/assets/home/clientLogo` 的 42 个客户 Logo 到 OSS；`client-logo-41.png` 和代码实际引用的 `client-logo-42.jpg` 返回 200，指定删除的 `client-logo-26.png` 返回 404 |
| 2026-05-12 21:55 | main | 内容与资源修正 | Home metadata 输出 `Home | Tiger Partners`；Hero 媒体移动端强制铺满父容器；About Chronicle、Team Profile 个人业绩和 Core Value 按源 md 补齐；新版 event2 图片同步到 public 和 OSS，生产构建通过，发布包已生成但远程部署未执行 |
| 2026-05-12 22:03 | main | Core Value 英文排版优化 | 英文正文使用左对齐、正常词距和 1.55 行高，中文正文保留两端对齐并收紧到 1.65 |
| 2026-05-12 22:07 | main | 全站禁用浏览器缩放 | 根布局接入 locked viewport metadata 和 `ViewportZoomLock`，全局 CSS 增加 `touch-action: pan-x pan-y`，拦截常见移动端与桌面缩放操作 |
| 2026-05-12 22:18 | main | About 与团队图片同步 | 将 `src/assets/about/hero.png`、`src/assets/team/team5.png`、`src/assets/team/5.png` 覆盖到 public；Mengcheng Yun 团队卡片改用 `/assets/team/team5.png` |
| 2026-05-12 22:20 | main | Chronicle 新增事件校准 | About Chronicle 2026 年一月、三月、四月、五月中英文事件按 `EN/CHRONICLE.md` 和 `Chinese/CHRONICLE.md` 同步，中文五月补充国际贸易、公司股权、建设工程和国际商事仲裁领域 |
| 2026-05-12 22:30 | main | 刘煜暄荣誉说明格式 | 中英文荣誉和认可首句改为冒号结尾，并在团队个人详情页对冒号结尾的荣誉引导句取消圆点标识 |
| 2026-05-12 22:34 | main | Events 返回位置修复 | Events 卡片进入详情时保存 See More 展开状态，返回列表时先恢复完整列表再执行滚动位置恢复 |
| 2026-05-12 22:37 | main | 旧中文入口兼容 | `next.config.ts` 增加 `/zh` 到 `/`、`/zh/:path*` 到 `/:path*` 的临时 redirect，兼容旧站中文路径入口 |
| 2026-05-12 22:39 | main | 旧英文入口兼容 | `next.config.ts` 增加 `/en` 到 `/`、`/en/:path*` 到 `/:path*` 的临时 redirect，兼容旧站英文路径和 hash 入口 |
| 2026-05-12 22:40 | main | Chronicle 一月记录确认 | 确认 About Chronicle 2026 年一月“虎诉荣登《钱伯斯大中华区指南2026》争议解决（中资律师事务所）榜单。”记录保留在中文时间线中 |
| 2026-05-12 23:12 | main | 虎诉动态卡片图片比例 | `EventsPage` 卡片顶部图片容器改为 `aspect-[4/3]`，保持 `object-cover` 填满卡片图框 |
| 2026-05-12 23:24 | main | Events 详情视频接入 | `EventDetailPage` 支持 `detailVideos` 渲染原生视频播放器，2025.06.17 和 2024.11.13 两条 event2 动态绑定新增 mp4 |
| 2026-05-12 23:30 | main | 移动端 Hero 媒体铺满 | 页面级 Hero 图片和首页 Hero 视频统一增加 `block`、`min-w-full` 与 `max-w-none`，移动端宽度始终占满父容器 |
| 2026-05-12 23:38 | main | Events 视频占位符排序 | 2025.06.17 和 2024.11.13 两条 event2 正文补回飞书视频占位符，详情页按正文占位顺序插入视频 |
| 2026-05-12 23:41 | main | event2Events 语法修复 | 批量补齐中文事件数据字符串闭合引号，`tsc --noEmit` 解析通过 |
| 2026-05-12 23:46 | main | event2 中文数据修复 | `src/data/event2Events.ts` 的 15 条新增事件 `zh` 字段按 `Chinese/event2.md` 重新生成，标题、分类、摘要和正文恢复正常中文 |
| 2026-05-12 23:55 | main | 手机端 Hero 全屏铺满 | 页面级 Hero 图片和首页 Hero 视频在手机端使用视口宽度铺满屏幕，避免窄图只占父容器局部宽度 |
| 2026-05-13 00:02 | main | 手机端 Hero 高度调整 | 手机端 Hero 媒体取消强制 `height: 100%`，只保留宽度 100%，桌面端仍按容器高度铺满 |
| 2026-05-13 00:09 | main | 手机端 Hero 范围收敛 | 仅 Our Team 保留手机端宽度自适应 Hero 图，其余页面恢复上一版铺满方式，并为首屏标题增加移动端字号 |
| 2026-05-13 00:20 | main | 移动端内容溢出修复 | 收紧 Home Honors、Home Events、About Vision、About Honors 和 Our Team 首屏移动端字号、断行、控制区排列与间距 |
| 2026-05-13 00:25 | main | About Chronicle 移动端修复 | Chronicle 年份按钮取消手机端负位移，事件卡片和标题说明增加移动端字号、断行和宽度约束 |
| 2026-05-13 00:35 | main | 正式站发布 | 当前工作区构建包发布到 `www.tigerpartners.cn` 对应的 `20260513-0028` release，服务重启和公网验证完成 |
| 2026-05-13 00:39 | main | CIETAC Cup 英文乱码修复 | 2024.11.13 event2 事件英文内容按 `EN/event2.md` 修正 `“CIETAC Cup”` 和 `year’s` 等乱码文本 |
| 2026-05-13 00:46 | main | event2 英文乱码清理 | 将 `event2Events.ts` 中剩余 mojibake 标点全部按 `EN/event2.md` 恢复为 `’`、`“”` 和 `–` |
| 2026-05-13 01:02 | main | 正式站重新发布 | About 图片目录已同步到 OSS，当前工作区发布到 `20260513-0058` release，服务重启和公网验证完成 |
| 2026-05-15 01:20 | main | 首页与 About 文案排版修正 | 首页 Vision/Event 英文说明改为指定两行，About Honors/Chronicle 英文说明改为指定分行，Footer 和 Team 标语按指定文案展示 |
| 2026-05-15 01:20 | main | OSS 图片替换同步 | 本地交换 event2 `1.jpg`/`2.jpg` 及兼容 PNG 后上传 OSS，并覆盖上传 Mengcheng Yun 团队卡片图和个人详情图 |
| 2026-05-15 01:24 | main | 正式站重新发布 | 01:20 版本已发布到 `20260515-0122` release，`tigerpartners-web.service` 重启成功；此后 Zoe 个人页业绩修改未部署 |
| 2026-05-15 01:25 | main | Zoe 个人业绩更新 | 从 `EN/zoePerformance.md` 同步 24 条中英文 Performance & Achievements 到 `teamProfiles.ts`，本地 `tsc --noEmit` 通过 |
| 2026-05-15 08:48 | main | Zoe 服务行业与 Events 展示补齐 | Zoe Zhang 服务行业更新为国际贸易、公司股权、建设工程、金融、国际商事仲裁；Events 页面恢复展示 `20210720` 和 `20200927` 两条已有事件 |
| 2026-05-15 08:52 | main | Events 旧事件详情图补齐 | `eventInfoImagesByDate` 为 `20210414` 和 `20210315` 增加图片映射，详情页可按 `[图片]` 占位渲染对应图片 |
| 2026-05-15 08:56 | main | 团队个人页移动端 Hero 调整 | 手机端个人详情页使用进入前对应的 `team1.png` 至 `team6.png` 团队卡片图，信息区在上、图片在下，避免 Hero 内容重叠 |
| 2026-05-15 09:01 | main | Events 英文内容与插图补齐 | `20210720` 和 `20200927` 英文内容同步 `EN/event.md`，并将 `20210720` 三张新增详情图同步到 `public/assets/event/eventinfo` 后按占位符顺序渲染 |
| 2026-05-15 09:08 | main | Events 旧事件详情图命名校准 | `eventInfoImagesByDate` 改为引用 `20210414-1.jpg`、`20210720-1.jpg`、`20210720-2.jpg`、`20210720-3.jpg`，并同步到 `public`；`20210315` 暂以当前存在的两张 20210315 图片渲染 |
| 2026-05-15 09:22 | main | Events 新事件排序校准 | `src/data/events.ts` 对 `event2Events` 按列表图文件名中的数字做稳定排序，Events 页新增 15 条事件按 `event2` 目录图片命名顺序展示 |
| 2026-05-15 09:29 | main | 行业图片与 Honors 说明修正 | Cyber Tech and Game 背景图统一切到 `INDUSTRIES6.png` 并同步 `public`；Home/About Honors 英文副标题按指定三行展示 |
| 2026-05-15 09:41 | main | Events 旧事件下线 | `20200902` 已从 `eventDatesFromEnglishSource` 移除，不再进入 Events 页面数据；保留 `allEvents` 中原始事件对象以便后续恢复 |
