# Husuweb Official Site Architecture

最后更新于：2026-05-08 00:41

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
      ImageWithFallback.tsx
      PageTriangle.tsx
  data/
    events.ts
    industryMetadata.ts
    teamProfiles.ts
  i18n/
    copy.ts
    LanguageProvider.tsx
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
      event1.png
      event2.png
      event3.png
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
  RootLayout[src/app/layout.tsx] --> AppProviders[src/components/layout/AppProviders.tsx]
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
  CoreValueScrollFlow --> CoreAssets[public/assets/core/core1-3.png]
  CoreValuePage --> PrototypeAssets
  IndustryDetailPage --> ImageFallback
  IndustryDetailRoute --> IndustryMetadata[src/data/industryMetadata.ts]
  IndustryDetailPage --> PrototypeAssets
  IndustriesPage --> PrototypeAssets[public/assets/prototypes/*]
  IndustriesPage --> IndustryDetailRoute
  EventDetailPage --> ImageFallback
  EventDetailPage --> EventsData[src/data/events.ts]
  EventDetailPage --> PrototypeAssets
  EventsPage --> EventsData
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

`src/components/shared/PageTriangle.tsx` 提供跨页面复用的低层级直角三角形背景装饰，当前用于首页、About、Team、Industries 和 Events 页面，默认层级为 `z-0`，底部左侧顶点位于 Footer 顶部左侧 40% 位置。首页和 About 使用 `isolate` 建立独立层级，三角形保持 `z-0`，在页面实际内容 `z-10` 之下，并将透明度降到 10%，以背景纹理方式存在而不压住文字、按钮和卡片；首页 `SiteHeader` 作为 `main` 顶层固定元素渲染，避免被 Hero section 的 stacking context 限制。

## 中文文案与语言切换

`src/app/layout.tsx` 通过 `src/components/layout/AppProviders.tsx` 包裹全站内容，`AppProviders` 只负责挂载 `src/i18n/LanguageProvider.tsx`。

- `LanguageProvider` 是客户端上下文，保存 `en` / `zh` 当前语言，并写入 `localStorage` 的 `tiger-language`；切换时同步更新 `document.documentElement.lang` 为 `en` 或 `zh-CN`。
- `src/i18n/copy.ts` 集中维护页面级中英文文案，中文来源对应 `Chinese/*page.md`，包括首页、About、Core Value、Team、Industries、Events、Contact、页脚和通用按钮文案。
- `SiteHeader` 的语言按钮不再维护局部状态，而是调用全站 `toggleLanguage`；因此页头、页脚和页面主体会同步切换。
- `src/data/events.ts` 保留 `EN/event.md` 整理出的英文事件数据，并新增 `localizeEvent` 与中文事件映射；Events 列表页和事件详情页会根据当前语言显示中文 category、title、summary。
- 首页 `HONORS` 的中文年度荣誉数据来自 `Chinese/awards.md`，首页 `Events` 三卡轮播的中文标题、日期和摘要来自 `Chinese/event.md`。
- About 页 `Honors` 展开列表按 `Chinese/awards.md` 增加中文镜像数据，并保留英文数据里的微信公众号链接；`Chronicle` 按 `Chinese/CHRONICLE.md` 增加中文年份时间线。
- 团队页人物卡片在 `src/data/teamProfiles.ts` 中补充 `zhName`、`zhTitle`，团队个人详情页在同一数据源中补充 `zh` 详情对象，来源均为 `Chinese/teamInfo.md`。
- 行业详情页在 `src/components/pages/IndustryDetailPage.tsx` 中为六个行业补充 `zhIndustries`，中文标题、简介和服务范围来源为 `Chinese/industriesInfo.md`；服务端 `generateMetadata` 和 `generateStaticParams` 使用 `src/data/industryMetadata.ts`，避免从客户端页面组件读取数据。
- 当前中文接入以页面级文案和主要列表摘要为主，未改变路由、图片资源路径或部署 basePath 逻辑。

## Title 导航

`src/components/layout/SiteHeader.tsx` 根据 `OVERALL/title/word.md` 实现顶部 title 导航：

- 使用 `public/assets/title/logo.png` 作为左侧 logo；
- logo 显示高度在 16:24 版本基础上继续放大 `1.2` 倍；
- Header 内层上下 padding 为 `1.2rem`；
- 顶部固定吸顶，首屏透明，滚动后渐变为深色半透明背景；
- 滚动后出现底部分隔线和轻微毛玻璃；
- 桌面导航支持英文 / 中文标题切换；
- 语言状态来自 `LanguageProvider`，可同步驱动页面主体和页脚文案；
- 桌面与移动端导航文字在 16:24 版本基础上继续放大 `1.4` 倍；
- 英文标题：HOME、ABOUT US、OUR TEAM、INDUSTRIES、EVENTS、CONTACT，源码直接使用大写文案而不是 CSS 强制转换；
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
- 第一行右侧品牌理念、第二行地址、版权文案会根据当前语言在 English / 中文之间切换；
- 第二行左侧地址前使用 `address.png`，右侧使用 `weixin.png`；
- 第三行电话和邮箱分别使用 `phone.png`、`email.png`，右侧显示 `QRcode.png`；
- 第四行展示版权、隐私声明、公安备案和 ICP 备案，其中公安备案前使用 `china.png`。

## 页面说明

### 首页 `/`

首页由单文件页面实现，包含：

- 首屏 Hero 使用本地 `/assets/home/hero.png`，图片透明度为 `opacity-90`，不再叠加整屏遮罩，仅保留底部 30% 到下一屏的暗色渐变；主标题保持单行显示，文本直接使用大写 `WE KNOW HOW TO WIN`，取消 CSS 强制大写；按 1920 设计基准将 100px 换算为 `6.25rem`，文字使用左上 `#DBC39F` 到右下 `#D09E57` 的对角渐变；
- Vision 引导屏外层不再使用专门背景图，背景色为 `#171717`；内部 Vision 卡片背景为从左上到右下的 `rgb(36, 36, 36) 9%`、`#303033`、`#403f3f`、`#514c45` 对角线渐变；
- Vision 卡片外侧左右边距为 `2.5rem`，内部内容通过计算 padding 继续和全站 title / `.site-shell` 内容线对齐；
- Vision 卡片不再叠加上下黑色遮罩，并将旋转 270 度、`8.75rem`、正常字重且不强制大写的 Vision 标识放到卡片最右侧；
- Vision 正文固定为三行，按 1920 设计基准将 40px 换算为 `2.5rem`，其中 `We are committed to` 使用细体斜体，后续内容使用粗体；
- Vision 的 Get To Know Us 按钮为非全宽按钮，默认白色背景、黑色文字，hover 时反色；文字按 24px 换算为 `1.5rem`；
- Industries & Services 网格，标题使用 `#f6ebe4` 到 `#d9b27a` 的渐变并按 90px 换算为 `5.625rem`；说明正文按 28px 换算为 `1.75rem`、细体斜体并占满父容器宽度，正文下方显示一条灰色横线；前五张卡片图片使用本地 `/assets/home/INDUSTRIES1.png` 到 `/assets/home/INDUSTRIES5.png`，第六张在 `INDUSTRIES6.png` 尚未提供前保留原图片；卡片标题按 36px 换算为 `2.25rem`，卡片加入参考原型的图片灰度恢复、顶部高亮线、箭头入场和卡片上浮效果，不再显示标题下方正文描述；
- Honors 年份时间轴，使用 `useState` 支持左右按钮切换和点击年份切换；标题按 110px 换算为 `6.875rem`，与右侧三行说明顶部对齐；右侧说明按 28px / 38px 换算为 `1.75rem` / `2.375rem`，并使用细体斜体；五个年份按钮字体按 20px 换算为 `1.25rem`，左对齐并使用 bold；active 内容标题按 36px 换算为 `2.25rem`，日期按 28px 换算为 `1.75rem`，正文按 24px 换算为 `1.5rem`，且不显示 See More；
- Events 三卡中心轮播，使用自定义状态和 CSS transition 实现中间主卡突出、两侧弱化、箭头与分页点切换；轮播舞台使用 `w-full` 占满 `.site-shell` 父容器内容宽度，单张轮播卡按 995px 换算为 `62.1875rem` 并通过 `max-w-full` 适配小屏，舞台高度为 `56rem / 58rem`，下方控制按钮外边距为 `mt-1` 以缩短与 active 说明卡的距离；Events 标题按 120px 换算为 `7.5rem`，右侧说明按 28px / 34px 换算为 `1.75rem` / `2.125rem`；轮播卡去除外层边框，图片和下方说明盒通过 `mt-8` 分离；图片左下角叠加日期和标题，日期文字和标题文字的实际左边距均按 89px 换算为 `5.5625rem`，但 `#D79D48` 左竖线只包裹标题正文，不包含日期；日期为 `1.5rem`、`#D9B27A` 细体，标题为 `1.75rem` 细体；下方说明盒仅在当前 active 主卡显示，使用 `1.75rem` 细体描述并自然换行展示完整文案，左右内边距同样为 `5.5625rem`，背景为 `#333333` 到 `#5b5955` 的左上到右下渐变，右下角用 `#706d69` 直角三角形装饰；
- Clients 三行横向滚动 Logo 墙，素材来自 `public/assets/home/clientLogo/*`，标题距离视窗左侧 `5rem`，字号按 36px 换算为 `2.25rem`，三行分别使用互不重叠的 Logo 分组以避免同一视窗跨行出现重复 Logo；Logo 卡片为纯白底、浅色描边和小圆角，支持反向滚动、无缝循环和 hover 暂停，动画时长调整为 `135s` 以降至原速度的 0.4 倍，左右黑色渐隐蒙层已移除；
- Footer / Contact 信息。

2026-05-07 本地调整：
- 首页 Honors 数据按 `EN/award.md` 整理为年度列表，每个年份展示最近最多三条荣誉事件；See More 居中显示，并跳转到 `/about#honors`。
- 中文状态下，首页 Honors 切换到 `Chinese/awards.md` 对应的年度中文荣誉条目。
- 首页 Events 轮播改为使用 `EN/event.md` 中指定的三条事件：`20231117`、`20220609`、`20220510`，图片使用 `public/assets/home/event1.png`、`event2.png`、`event3.png`；轮播上一张/下一张和分页点按钮水平居中，See More 保持在右侧入口。
- 中文状态下，首页 Events 三条轮播事件使用 `Chinese/event.md` 对应的中文标题、日期和摘要。
- 首页 Clients 屏背景恢复为深色，客户 Logo 卡片保持纯白底和浅色描边。

### About `/about`

About 页面由多个区块组件组成：

- `AboutHero`
- `Honors`
- `Culture`
- `Chronicle`

其中：

- `AboutHero` 使用本地 `/assets/about/hero.png` 作为首屏背景，并直接渲染 `VisionCard`；首屏 `100svh` 内不叠加蒙层，纵向/横向渐变蒙层从 `top-[100svh]` 开始，仅作用于首屏之后的延展区域；About 标题组从首屏 55% 位置开始并保持 `12rem` 内容线，左侧增加金色竖线；About us 标题按 96px 换算为 `6rem`、semibold，正文按 32px 换算为 `2rem`、medium italic；灰色方块从首屏 90% 位置开始，桌面左右外距为 `5rem`，卡片背景使用 `#585551` 到 `#2f2f2f` 的左上到右下渐变；
- `Vision.tsx` 保留 `VisionCard` 复用导出，卡片背景接入本地 `/assets/about/aboutVision.png` 并叠加深色渐变以保证文字可读，背景图片使用 `h-full w-full object-cover` 适应卡片完整高度；右侧 Vision 标题与说明文字同排，`VISION` 标题按 80px 换算为 `5rem` 并使用 extrabold；说明文字 `We are determined to be one of the extraordinary law firms in disputes resolution area` 固定为两行，第二行使用 `whitespace-nowrap` 防止再次换行，按 24px 换算为 `1.5rem`、medium 字重并使用 `#D9B27A`；两段正文同样为 `1.5rem` medium，第二段补充 leading enterprises / multinational corporations 结尾；See More 为 `1.5rem` semibold 并居中；
- `Honors` 使用 `useState` 做年份折叠交互，数据按 `EN/award.md` 的英文条目整理为年度奖项列表；展开内容使用 `grid-rows` 过渡动画；标题 `HONORS` 按 120px 换算为 `7.5rem`、semibold italic，并与右侧说明排成参考图中的横向版式；右侧说明为两行 Title Case 文案，均右对齐，并通过 `max-width: calc(100vw - var(--shell-md) * 2)` 避免超出视窗；年份头部始终保持深色背景，年份为 `3rem` regular，Awards Won 为 `1.5rem` semibold 且颜色 `#D6A866`，Distinctions 为 `1.125rem` regular；展开内容为黑色文字、黑色 View Award 边框和黑色日期，右侧背景接入 `/assets/about/awardbg.png` 并以 `right: 0`、`object-right` 固定在展开区域右侧；奖项标题为 `1.75rem` semibold，正文为 `1.5rem` regular，右侧 View Award 与标题顶部对齐，日期为 `1.75rem` medium 并与正文底部对齐；`Award.href` 使用 `EN/award.md` 中的公众号链接，未配置公众号链接的条目不显示 View Award 按钮，避免出现不可点击按钮；
- `Culture` 左侧图片参考 `官网首页设计` 的 WELCOME TO JOIN US 右侧图片 hover/leave 动效，区块为无外边距全屏宽度，高度约 `80vh`；图片主体区域不再叠加左侧棕色蒙层，图片最右侧到右侧 30% 区域叠加从 `#a88d61` 到透明的渐变，section 外层不设置额外背景色，主遮罩在左图主体区域保持透明，只在中间衔接位置过渡到右侧实色背景，右侧加入低透明度抽象品牌水印，右侧文案全部使用白色，`CULTURE` 标题按 64px 换算为 `4rem` 且 semibold，正文按 28px 换算为 `1.75rem` 且 regular，`READ FULL MANIFESTO` 按钮使用 `#D9B27A` 背景并按 18px 换算为 `1.125rem` medium；
- `Chronicle` 使用 `useState` 做年份折叠交互，英文数据按 `EN/CHRONICLE.md` 的年份、月份、内容整理为 2026 到 2018 的完整时间线，中文数据按 `Chinese/CHRONICLE.md` 提供同样年份结构；默认展示前三个年份，See More 使用与 Culture 的 READ FULL MANIFESTO 一致的金色按钮动效，展开全部年份后英文按钮文案切换为 `COLLAPSE`、中文按钮文案切换为 `收起`；年份按钮背景为 `#202020` 且边框为金色；`CHRONICLE` 标题按 80px 换算为 `5rem` medium，右侧说明按 28px 换算为 `1.75rem` light，年份按钮按 36px 换算为 `2.25rem` medium；展开卡片在靠近中轴一侧显示金色边框，月份按 24px 换算为 `1.5rem` semibold 且颜色 `#D9B27A`，月份标题下划线靠近中轴，正文为 `1.5rem` light 灰色并占卡片宽度 85%。

About Honors 区块新增 `id="honors"` 和 `scroll-mt-[var(--header-height)]`，供首页 `/about#honors` 锚点跳转定位。

### Core Value `/about/core-value`

Core Value 页面基于 `core value/` 原型重建，仍归属 About 路由层级：

- 页面入口为 `src/app/about/core-value/page.tsx`，展示组件为 `src/components/pages/CoreValuePage.tsx`；
- 复用全站 `SiteHeader` 与 `SiteFooter`，顶部导航 active 仍为 ABOUT US；
- Hero 使用原型背景图，正文包含 About us / CULTURE / Core Value 面包屑；
- 三个价值观段落改由 `src/components/sections/core-value/CoreValueScrollFlow.tsx` 承载，参考 `事件 copy/src/app/components/FeaturesSection.tsx` 的滚动逻辑：桌面端外层高度为条目数乘以 `100vh`，滚动进度直接由 `container.getBoundingClientRect().top / window.innerHeight` 计算，左侧内容按滚动进度激活，右侧图片区使用和参考实现一致的 `sticky top-0 h-screen flex items-center justify-center` 结构固定在视窗内；滚动区背景为 `#171717`，不显示额外的 `CORE VALUES`/`Principles behind every dispute we take on` 引导文案；右侧图片堆内层保留 `translate-y-[5rem]` 和 `scale-90` 控制视觉位置，两个包裹层均设置 `w-full` 以避免图片栈宽度塌陷；Core Value 页面级 `<main>` 不再设置 `overflow-x-hidden`，避免祖先 overflow 创建裁剪/滚动上下文导致 sticky 失效；
- 右侧图片堆叠对齐 `事件 copy/src/app/components/FeaturesSection.tsx` 的 `ImageStack`：外层固定为 `height: min(72vh, 640px)`，每张图片使用 `absolute inset-0` 叠放在同一容器内，通过 `clip-path: inset(...)` 按滚动进度逐张揭示，并用 `translateY(px)` 形成入场堆叠动效；移动端回退为普通纵向图文卡片；
- 价值观标题按 28px 换算为 `1.75rem`、`#D9B27A` semibold，并以 `No.1 Our Spiritual Totem: Tiger` 的合并格式展示，标题下方不显示下划线；正文按 24px 换算为 `1.5rem` regular，其中 No.1 文案补充 `Bi An (狴犴)`；
- 滚动区图片使用 `/assets/core/core1.png`、`core2.png`、`core3.png`，来源为 `src/assets/core/core1.png` 到 `core3.png`；
- 结尾保留原型引用段落与引号图形。

页面需要的 Core Value Hero 原型图片已复制到 `public/assets/prototypes/core-value/*`；滚动区图片已发布到 `public/assets/core/*`。

### Team `/team`

团队页面基于 `我的团队/` 原型重建，包含：

- Our team Hero，使用本地 `/assets/team/hero.png` 和灰色混合遮罩，图片以 `h-full w-full object-cover` 宽度 100% 填满父容器；`#` 为 90px 对应 `5.625rem` light，`Our team` 为 120px 对应 `7.5rem` semibold，副标题为 28px 对应 `1.75rem` regular；
- WE ARE SPECIAL FORCES 标语区，标题分两行左对齐并使用 96px 对应 `6rem` italic，说明文案右对齐且分三行，字号为 28px 对应 `1.75rem` medium；标题与说明下方有一整条横向下划线；
- Partner 与 Senior Associate 双列人物卡片分区，标题使用一致的 64px 对应 `4rem` italic uppercase 格式；
- 人物卡片数据来自 `teamInfo.md` 的姓名和职位，只展示职位和名字；中文状态使用 `Chinese/teamInfo.md` 的 `zhName`、`zhTitle`；Yuxuan Liu、Min Xu、Li Wan、Zoe Zhang、Mengcheng Yun、Weifan Qiu 使用本地 `/assets/team/team1.png` 到 `/assets/team/team6.png`；图片以绝对定位填满父元素并移除灰色蒙层，保留轻微放大；姓名为 55px 对应 `3.4375rem` medium，职位为 36px 对应 `2.25rem` extra light，Find out more 为 28px 对应 `1.75rem` medium，黄色文字和黄色下划线，不显示旁侧 icon；
- Find out more 使用 Next `Link` 按成员 slug 跳转到同一团队路由层级下的 `/team/[slug]`；
- 复用全站导航和页脚。

页面需要的团队 Hero 图和成员图已复制到 `public/assets/team/*`；旧原型团队图仍保留在 `public/assets/prototypes/team/*` 作为备用。

### Team Profile `/team/[slug]`

团队个人详情页基于 `个人介绍详情/` 原型重建：

- 页面入口为 `src/app/team/[slug]/page.tsx`，`src/app/team/yuxuan-liu/page.tsx` 保留 Yuxuan Liu 的兼容静态入口，展示组件为 `src/components/pages/TeamProfilePage.tsx`；
- 团队列表和个人详情共用 `src/data/teamProfiles.ts`，包含 Yuxuan Liu、Min Xu、Li Wan、Zoe Zhang、Mengcheng Yun、Weifan Qiu 的 slug、姓名、职位、图片、邮箱、服务行业、教育背景、执业资格、语言、社会职务、执业领域、执业经历、荣誉和业绩；Performance & Achievements 按 `EN/teamInfo.md` 的英文个人业绩条目整理，避免使用截断或占位内容；中文状态使用 `Chinese/teamInfo.md` 中的 `zh` 详情对象切换姓名、职位、服务行业、教育背景、专业资格、工作语言、社会任职、专业领域、执业经验、荣誉和个人业绩；
- 复用全站 `SiteHeader` 与 `SiteFooter`，顶部导航 active 保持 OUR TEAM；
- Hero 高度按 735px 换算为 `45.9375rem`，使用左上 `#919191` 到右下 `#5a5a5a` 对角线渐变，左侧人物图片使用当前 slug 对应的 `/assets/team/team*.png` 并与 title logo 内容线对齐，右侧显示当前成员姓名、职位、下划线和带 Mail icon 的邮箱入口；姓名按 100px 换算为 `6.25rem` semibold，职位按 40px 换算为 `2.5rem` light；
- Hero 下方保留 Our Team / 当前成员姓名面包屑并与 title logo 内容线对齐，面包屑条背景为黑色，当前项为白色；
- 信息介绍及后续内容左右边距统一为 128px，对应 `8rem`；
- 信息介绍屏背景为 `#333231` 到 `#433e38` 的纵向渐变，包含 Service Industries、Professional Qualification、Educational Background、Language Skills 和 Social Engagements；Language Skills 与 Professional Qualification 放在同一列，Social Engagements 单独占一整行；Service Industries 标题为 `2rem` semibold，列表为 `1.5rem` light；
- 第二屏背景为 `#171717`，展示 Experience& capabilities；左侧为 Practice Area 与 Practice Experience，右侧仅在成员存在真实 Honors 数据时展示 Honors 和竖向分隔线；Mengcheng Yun、Weifan Qiu 等无 Honors 条目的成员不渲染该区块；
- 第三屏背景为 `#262626`，展示 Performance & Achievements、六张默认业绩卡片；View More 按钮位于默认卡片下方，样式对齐 About 的 See More，并使用 `useState`、`grid-rows` 和 opacity 过渡实现与 About Honors 卡片一致的展开/收起动画。

页面需要的个人简介图片已复制到 `public/assets/prototypes/team-profile/*`。

### Industries `/industries`

服务行业页面基于 `服务行业/` 原型重建，包含：

- 顶部 Industries Hero 使用本地 `/assets/industries/hero.png`，标题左对齐并按 96px 换算为 `6rem` medium，标题在 1920 设计基准下距离屏幕顶部 `590px`，对应 `36.875rem`；
- 行业服务说明卡片紧接在 Industries 标题下方，背景为 `#464646` 到 `#787269` 渐变，正文按 28px 换算为 `1.75rem` regular，两个对角边框与卡片边缘保留内距；
- 行业卡片网格按 1 / 2列 / 2 三段布局，桌面左右外距为 `9rem`；第二段左侧为 International Trade 大卡，右侧为 Finance 与 Real Estate 两行一列上下排列；卡片图片使用 `/assets/industries/in1.png` 到 `/assets/industries/in6.png`，文字位于左下方并带黄色下划线，标题按 48px 换算为 `3rem` semibold，按 Private Equity、International Trade、Finance、Real Estate、Sports and E-Sports、Cyber Tech and Game 的顺序展示并保留指定换行；中文标题随卡片 slug 绑定为私募股权、国际贸易行业、金融、房地产行业、体育及电子竞技行业、互联网科技及游戏行业，避免复用首页 labels 数组造成文案与跳转目标错位；第三行高度为第一行约 1.5 倍；
- 六个行业卡片均使用 Next `Link` 跳转到 `/industries/[slug]` 详情页；
- 复用页脚。

页面需要的原型图片已复制到 `public/assets/prototypes/industries/*`；行业卡片图片已从 `src/assets/industries/in1.png` 到 `in6.png` 发布到 `public/assets/industries/`。

### Industry Detail `/industries/[slug]`

行业详情页面基于 `行业详情/` 原型重建：

- 页面入口为 `src/app/industries/[slug]/page.tsx`，展示组件为 `src/components/pages/IndustryDetailPage.tsx`；
- `generateStaticParams` 和 `generateMetadata` 从服务端安全的 `src/data/industryMetadata.ts` 读取六个行业 slug、英文标题和简介，未知 slug 回退到 Private Equity metadata；
- 复用全站 `SiteHeader` 与 `SiteFooter`，顶部导航 active 保持 INDUSTRIES；
- Hero 背景图片使用列表页对应行业卡片的同一张图片，即 `/assets/industries/in1.png` 到 `/assets/industries/in6.png`；
- 内容区参考原型的左侧留白结构，使用深色内容卡片和圆点列表展示来自 `industriesInfo.md` 的对应行业介绍与服务范围；中文状态下使用 `Chinese/industriesInfo.md` 对应六个行业的标题、简介和服务范围。

### Events `/events`

事件页面基于 `事件/` 原型重建，包含：

- Events 标题 Hero 使用本地 `/assets/event/hero.png` 作为背景图，标题和正文居中放在左右外距 `8rem`、高度 `40svh` 的渐变背景块中，页面外层仍保持深色背景；标题按 100px 换算为 `6.25rem` semibold italic，说明文字按 36px 换算为 `2.25rem` regular；
- 事件数据集中在 `src/data/events.ts`，按 `EN/event.md` 的英文事件文档整理 28 条事件，包含 slug、category、title、`YYYYMMDD` 日期、summary 和循环使用的事件图片；同时根据 `Chinese/event.md` 为主要事件补充中文 category、title、summary 映射，列表页和详情页共用该数据源；
- 事件卡片默认展示 9 条，按一行三个、三行展示，第二屏左右外距为 `6rem`，横向卡片间距为当前版 3 倍，纵向间距保持原来的 `gap-y-16`，不再显示 LATEST UPDATES 标题和下划线；
- 卡片图片保持彩色，位于卡片左上角，并相对容器向左上方偏移约 3.3%；图片按从左到右顺序循环使用 `/assets/event/event1.png`、`event2.png`、`event3.png`；
- 卡片内容只保留日期行和标题行，日期与图片间距为 `6rem`，日期按 24px 换算为 `1.5rem` regular，日期行右侧显示黄色箭头，标题中 `Tiger Dynamics` 为 `#D1CECA`、30px 对应 `1.875rem`、normal italic，分隔线后正文为 `1.875rem` medium，右下角浅色三角形高度为 `6%`；
- 卡片使用 Next `Link` 跳转到 `/events/[slug]` 事件详情页；
- See More 使用与 About Culture 的 READ FULL MANIFESTO 一致的金色描边/实底按钮和箭头 hover 平移动效，点击后展开全部 28 条事件并可收起；
- 复用页脚。

页面需要的事件卡片图已复制到 `public/assets/prototypes/events/card.png`；当前 Events 列表图已从 `src/assets/event/event1.png`、`evnet2.png`、`event3.png` 发布为 `public/assets/event/event1.png`、`event2.png`、`event3.png`。

### Event Detail `/events/[slug]`

事件详情页面基于 `事件详情/` 原型重建：

- 页面入口为 `src/app/events/[slug]/page.tsx`，展示组件为 `src/components/pages/EventDetailPage.tsx`；
- `generateStaticParams` 从 `src/data/events.ts` 为全部事件生成静态参数；
- 复用全站 `SiteHeader` 与 `SiteFooter`，顶部导航 active 保持 EVENTS；
- 顶部包含 Events / 当前事件的面包屑、事件标题、日期和金色分割线；事件标题按 64px 换算为 `4rem` semibold，日期按 28px 换算为 `1.75rem` regular；
- 正文区展示当前事件的 summary，英文状态显示 `EN/event.md` 整理文案，中文状态优先显示 `Chinese/event.md` 对应中文摘要；右侧展示对应事件图；主说明按 24px 换算为 `1.5rem` light italic。

页面需要的事件详情图片已复制到 `public/assets/prototypes/event-detail/*`。

### Contact `/contact`

联系我们页面基于 `联系我们/` 原型重建，包含：

- Contact 标题区使用本地 `/assets/contact/hero.png` 作为顶部背景图；标题按 96px 换算为 `6rem` medium italic，正文按 36px 换算为 `2.25rem` light；
- Hero 下方 Contact us 双栏模块，左侧为金棕背景、黑色标题、黑色正文、黑色电话/邮箱和图标，右侧为城市图片；Contact us 标题按 52px 换算为 `3.25rem` semibold，说明正文按 28px 换算为 `1.75rem` italic，电话和邮箱均为 `1.75rem` regular，邮箱显示下划线；
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

`tsconfig.json`：

- `strict: true`；
- `allowJs: false`；
- 排除原型目录：`首页`、`about 页`、`事件`、`事件 copy`、`服务行业`、`联系我们`、`官网首页设计`、`我的团队`、`core value`、`个人介绍详情`、`事件详情`、`行业详情`，并排除根目录参考文件 `EventLandingPage.tsx`，避免旧 Vite/CMS 原型依赖参与当前 Next 主应用类型检查。

`src/app/globals.css`：

- `body` 使用 `var(--font-poppins), Arial, Helvetica, sans-serif`，其中 `--font-poppins` 来自 `next/font/local`；
- 定义 `client-logo-scroll` keyframes；
- `.client-logo-row:hover .client-logo-track` 暂停当前 Logo 行动画；
- 仍保留 `prefers-reduced-motion` 全局降级策略。

`src/app/layout.tsx`：

- 通过 `next/font/local` 加载 `src/font/poppins.ttf`；
- 将字体变量 class 挂到 `<body>`，使全站文字默认走 Poppins 字体；
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

当前首版公开页没有 CMS、数据库或后台登录环境变量。

## 部署

当前 offweb 环境使用 Next.js standalone 运行包部署：

- 公网地址：`http://8.140.238.44/offweb/`；
- 构建前设置：`NEXT_SNAPSHOT_BASE_PATH=/offweb`、`NEXT_TELEMETRY_DISABLED=1`；
- 本地发布包：`dist/offweb-standalone.tgz`；
- 服务器目录：`/opt/husuweb-offweb/current` 指向 `/opt/husuweb-offweb/releases/*` 版本目录；
- systemd 服务：`husuweb-offweb.service`；
- 应用监听：`127.0.0.1:3003`；
- Nginx 入口：`location /offweb/` 反向代理到 `http://127.0.0.1:3003/offweb/`。
- public 静态图片统一通过 `ImageWithFallback` 输出；当 `NEXT_PUBLIC_BASE_PATH=/offweb` 时，组件会把 `/assets/...` 转换为 `/offweb/assets/...`，避免子路径部署下图片请求落到域名根路径。
- 子路径内部跳转统一使用 Next `Link`，例如 About Culture 的 Core Value 入口输出为 `/offweb/about/core-value/`；自定义 404 页面 `src/app/not-found.tsx` 的 Return Home 输出为 `/offweb/`。

## 安装与构建状态

当前会话已使用现有 `node_modules` 执行过 `npm run build` 并通过：

- Next.js 编译成功；
- TypeScript 检查成功；
- 静态页面生成成功，包含 `/`、`/about`、`/industries`、`/events`、`/contact`。

本次 offweb 发布前已停止本地 `next dev` 进程，使用 `NEXT_SNAPSHOT_BASE_PATH=/offweb` 重新执行 `npm run build`，整理 `.next/standalone`、`.next/static` 和 `public` 到 `dist/offweb`，并生成 `dist/offweb-standalone.tgz`。服务器端已验证 `husuweb-offweb.service` 为 `active`，`http://8.140.238.44/offweb/` 返回 `200 OK`。

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
