# Husuweb Official Site Architecture

最后更新于：2026-08-03 22:54

## 椤圭洰姒傝堪

鏈」鐩槸鍩轰簬鏃㈡湁 Figma/Vite 鍘熷瀷閲嶆柊鎼缓鐨勫畼缃戦鐗堬紝褰撳墠绾冲叆鍏紑瀹樼綉鐨勪節绫昏繍琛岄〉闈細

- 棣栭〉锛歚/`
- About 椤甸潰锛歚/about`
- Core Value 瀛愰〉闈細`/about/core-value`
- 鍥㈤槦椤甸潰锛歚/team`
- 鍥㈤槦涓汉璇︽儏椤碉細`/team/[slug]`锛屽叾涓?`/team/yuxuan-liu` 淇濇寔鍏煎鍏ュ彛
- 鏈嶅姟琛屼笟椤甸潰锛歚/industries`
- 琛屼笟璇︽儏椤甸潰锛歚/industries/[slug]`
- 浜嬩欢椤甸潰锛歚/events`
- 浜嬩欢璇︽儏椤甸潰锛歚/events/[slug]`
- 鑱旂郴鎴戜滑椤甸潰锛歚/contact`

`棣栭〉/`銆乣about 椤?` 浠ュ強鍚庢潵鍔犲叆鐨?`浜嬩欢/`銆乣浜嬩欢璇︽儏/`銆乣鏈嶅姟琛屼笟/`銆乣鑱旂郴鎴戜滑/`銆乣鎴戠殑鍥㈤槦/`銆乣core value/`銆乣涓汉浠嬬粛璇︽儏/` 鐩綍浠嶄繚鐣欎负鍘熷瀷绱犳潗鐩綍锛屼笉杩涘叆褰撳墠 Next 涓诲簲鐢ㄨ繍琛岄摼璺€?

## 鎶€鏈爤

| 绫诲瀷 | 褰撳墠浣跨敤 | 璇存槑 |
| :--- | :--- | :--- |
| 妗嗘灦 | Next.js App Router `15.5.14` | 浣跨敤 `src/app` 璺敱缁撴瀯锛岀敓浜ц緭鍑轰负 standalone |
| UI 杩愯鏃?| React `18.3.1` / React DOM `18.3.1` | 涓?`tech.md` 涓笂涓€鐗堢綉绔欎繚鎸佷竴鑷?|
| 璇█ | TypeScript | 鏂伴」鐩笉鍚敤 `allowJs` |
| 鏍峰紡 | Tailwind CSS v4 + CSS variables | `src/app/globals.css` 寮曞叆 Tailwind 鍜屽搷搴斿紡 token |
| 瀛椾綋 | Poppins 瀛椾綋鏂囦欢 | `src/app/layout.tsx` 娉ㄥ叆 `@font-face`锛屾湰鍦伴粯璁よ鍙?`/font/poppins.ttf`锛岀敓浜у彲閫氳繃 OSS 璧勬簮鍓嶇紑璇诲彇杩滅▼瀛椾綋 |
| 鍥炬爣 | `lucide-react` | 褰撳墠鐢ㄤ簬瀵艰埅銆佸崱鐗囧叆鍙ｅ拰灏戦噺鎺у埗鍥炬爣 |
| 鍖呯鐞嗗櫒 | Yarn `1.22.22` | 鐢ㄦ埛鍐冲畾鏀圭敤 Yarn锛沗packageManager` 宸插垏鎹?|

褰撳墠娌℃湁寮曞叆 CMS銆丷adix UI銆丮UI銆乵otion銆佽疆鎾簱銆乀hree銆佸浘琛ㄣ€佹嫋鎷界瓑渚濊禆锛涜繖浜涘簱鍦ㄥ綋鍓嶉〉闈㈠疄鐜颁腑娌℃湁瀹為檯杩愯闇€姹傘€?

## 鐩綍缁撴瀯

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

## 鏍稿績妯″潡涓庢暟鎹祦

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

`src/app/**/page.tsx` 鍙繚鐣欒矾鐢卞叆鍙ｅ拰 metadata锛涢〉闈㈠睍绀虹粍浠剁粺涓€鏀惧湪 `src/components/pages/*` 涓嬶紝涓氬姟鍖哄潡鍜屽叡浜粍浠剁户缁斁鍦?`src/components/sections/*`銆乣src/components/layout/*`銆乣src/components/shared/*`銆?
CMS 鐪熷疄瀹樼綉鏁版嵁鐢?`src/lib/cms-store.ts` 鍚堝苟 `data/cms-site.json` 涓庨潤鎬侀粯璁ゅ€煎悗閫氳繃 `PublicCmsProvider` 娉ㄥ叆鍓嶅彴锛涢椤佃疆鎾€佹湇鍔¤涓氥€丠onors銆丆hronicle銆佸洟闃熷拰 Events 椤甸潰鍧囦互 CMS 瑕嗙洊鏁版嵁浼樺厛銆侀潤鎬佹暟鎹厹搴曘€傛牴甯冨眬鏈嶅姟绔細璇诲彇褰撳墠鍏紑 CMS 鐘舵€佷綔涓洪灞忔暟鎹紝瀹㈡埛绔啀浠?no-store 璇锋眰 `/api/cms/public` 鍒锋柊锛岀増鏈彂甯?鎭㈠浼氬埛鏂扮湡瀹炲畼缃戣矾鐢卞拰鍏紑 CMS 鎺ュ彛锛岄伩鍏嶉瑙堢増鏈凡鏇存柊浣嗘寮忕珯浠嶈鏃х紦瀛樸€傛寮?CMS 鐘舵€佷細淇濆瓨 `previewPageContent`锛岄椤?Vision銆両ndustries銆丠onors銆丒vents銆丆lients 浠ュ強 About Hero/Vision/Honors/Culture/Chronicle 鍜?Core Value 瀛愰〉闈㈠瓧娈靛湪姝ｅ紡绔欎笌棰勮绔欎娇鐢ㄥ悓涓€浠介〉闈㈠瓧娈碉紱鏃х増鏈噸鏂板彂甯冩椂浼氱敤鐗堟湰 `pageContent` 鍥炲～ `previewPageContent`銆侰MS 鍚庡彴鐨?`CmsStudio` 浼氭寜 slug 閫愰」琛ラ綈 Team 鍜?Events 榛樿鍐呭锛岄伩鍏嶆棫鐘舵€佸彧淇濆瓨閮ㄥ垎鏉＄洰鏃跺嚭鐜扮┖鍗＄墖鎴栫己澶辨垚鍛橈紱鐗堟湰閫夋嫨鍏ュ彛鍙垪鍑虹増鏈鐞嗕腑鍒涘缓鐨勭増鏈紝杩涘叆鍚庡彴鏃朵細榛樿鍔犺浇宸插彂甯冪増鏈紝鏈€夋嫨鐗堟湰鏃舵樉绀哄崰浣嶇姸鎬侊紝閬垮厤鎶婂綋鍓嶇珯鐐瑰唴瀹硅璁や负涓€涓彲绠＄悊鐗堟湰銆傞椤佃檸璇夊姩鎬佽疆鎾娇鐢?`home.eventOverrides` 鐙珛淇濆瓨鏍囬銆佹憳瑕併€佸皝闈㈠拰 CTA锛屼笉鐩存帴瑕嗙洊 Events 鍒楄〃绠＄悊涓殑鍔ㄦ€佽鎯咃紱铏庤瘔鍔ㄦ€佽鎯呭浘浼氭牴鎹鏂囧浘鐗?瑙嗛鍗犱綅绗︾敓鎴?`detailImageN`銆乣detailVideoN` 鐙珛瀛楁锛屼慨鏀硅繖浜涚敓鎴愬瓧娈垫椂浼氬悓姝ュ啓鍥炲簳灞?`detailImages`/`detailVideos` 鍒楄〃骞朵繚鐣欏崰浣嶉『搴忥紝淇濆瓨鏃跺啀鍚堝苟涓哄墠鍙拌鎯呴〉娑堣垂鐨勫獟浣撴暟缁勶紱鏂板 Events 鐖跺垪琛ㄩ」浼氬悓姝ュ垱寤哄悓 slug 鐨勫姩鎬佸瓙椤甸潰楠ㄦ灦锛屾柊澧炲姩鎬佸瓙椤甸潰涔熶細鏄惧紡鍐欏叆 `Detail content`銆佽鎯呭浘鐗囧拰璇︽儏瑙嗛瀛楁銆傞〉闈㈠唴瀹瑰姞杞芥椂浼氬悎骞?`defaultPageContentState` 涓柊澧炲瓧娈碉紝淇濊瘉鏃х増鏈篃鑳界湅鍒版柊鍔犵殑 CMS 瀛楁銆傚彲瑙嗗寲缂栬緫椤堕儴鏍忎繚鐣?Header 涓?Footer 涓や釜绔欑偣绾ф爮鐩紝鍜屽叚涓埗椤甸潰/铏庤瘔鏂囧寲瀛愰〉闈㈠叡鍚岃繘鍏ュ彸渚у瓧娈垫娊灞夈€?
`src/components/shared/PageTriangle.tsx` 鎻愪緵璺ㄩ〉闈㈠鐢ㄧ殑浣庡眰绾х洿瑙掍笁瑙掑舰鑳屾櫙瑁呴グ锛屽綋鍓嶇敤浜庨椤点€丄bout銆乀eam銆両ndustries 鍜?Events 椤甸潰锛岄粯璁ゅ眰绾т负 `z-0`锛屽簳閮ㄥ乏渚ч《鐐逛綅浜?Footer 椤堕儴宸︿晶 40% 浣嶇疆銆傞椤靛拰 About 浣跨敤 `isolate` 寤虹珛鐙珛灞傜骇锛屼笁瑙掑舰淇濇寔 `z-0`锛屽湪椤甸潰瀹為檯鍐呭 `z-10` 涔嬩笅锛屽苟灏嗛€忔槑搴﹂檷鍒?10%锛屼互鑳屾櫙绾圭悊鏂瑰紡瀛樺湪鑰屼笉鍘嬩綇鏂囧瓧銆佹寜閽拰鍗＄墖锛汿eam 椤靛唴瀹瑰尯缁熶竴鎻愬崌涓?`z-10`锛屼笁瑙掑舰閫忔槑搴﹂檷涓?20%锛岄伩鍏嶉伄鎸″洟闃熷垪琛紱棣栭〉 `SiteHeader` 浣滀负 `main` 椤跺眰鍥哄畾鍏冪礌娓叉煋锛岄伩鍏嶈 Hero section 鐨?stacking context 闄愬埗銆?
CMS 内容管理的 `OfficialSiteSectionPanel` 复用左右分栏编辑 shell：首页 HONORS、虎诉荣誉、虎诉大事记按年份导航，服务行业按行业导航，合伙人和资深律师按成员姓名导航；首页 HONORS 轮播通过 `homeHonorItems` 记录来自虎诉荣誉的具体荣誉条目，未选择具体条目时继续回退到 `homeHonorYears` 年份列表。服务行业属于可删除列表，`CmsStudio` 同步时只以 `officialState.lists.industries` 的 slug 为准合并同名 pageContent 字段，加载版本或当前站点内容时若 `pageContent.media.cards`/`home.industries` 与官方列表 slug 不一致，会先用 pageContent 反推官方行业列表，且服务行业页 `media.cards` 优先于首页 `home.industries`，避免首页较短列表反向裁剪服务行业页；服务端 `cms-db` 在创建版本、更新版本、版本预览读取和发布恢复时也会用版本 `pageContent` 归一化 `officialState.lists.industries`，同样以 `media.cards` 为权威来源，避免旧浏览器包或旧版本 payload 再次裁掉新增行业；`CmsPuckVisualEditor` 会把 `media.cards` 的数量变化同步回官方行业列表，`mergePageContentDefaults` 对 `home.industries`、`media.cards` 和 `media.detailPages` 只补字段不补已删除的默认条目。
`src/components/shared/SubpageBreadcrumb.tsx` 鎻愪緵瀛愰〉闈㈢粺涓€闈㈠寘灞戯紝瀛楀彿鎸?24px 鎹㈢畻涓?`1.5rem`锛屽垎闅旂涓?`/`锛岀埗绾у拰褰撳墠椤圭偣鍑绘椂浼樺厛鎵ц `router.back()` 杩斿洖涓婁竴椤碉紝鏃犲巻鍙茶褰曟椂鍥為€€鍒版寚瀹氱埗绾ц矾鐢便€俙src/components/shared/BackToTop.tsx` 鎻愪緵瀛愰〉闈㈠彸涓嬭鍥哄畾杩斿洖鎸夐挳锛屼腑鏂囦负鈥滆繑鍥炩€濓紝鑻辨枃涓?`Back`锛岀偣鍑讳紭鍏堣繑鍥炰笂涓€椤点€佹棤鍘嗗彶璁板綍鏃跺洖鍒伴椤碉紝浣跨敤閲戣壊鏂囧瓧銆侀噾鑹蹭笅鍒掔嚎鍜?hover 鏀剁缉鍔ㄦ晥銆?

## 鍥剧墖鍔犺浇涓庡獟浣撲紭鍖?

`src/lib/assets.ts` 鎻愪緵 `assetUrl()` 缁熶竴澶勭悊闈欐€佽祫婧?URL锛涙湭閰嶇疆 `NEXT_PUBLIC_ASSET_BASE_URL` 鏃剁户缁娇鐢ㄦ湰鍦?`/assets/*` 涓?`/font/*`锛岄厤缃悗浼氬皢鍥剧墖銆佽棰戝拰瀛椾綋鍒囨崲鍒?OSS 鍓嶇紑銆俙src/components/shared/ImageWithFallback.tsx` 缁熶竴涓哄浘鐗囪緭鍑?`decoding="async"`锛屽苟閫氳繃 `assetUrl()` 鍚屾椂澶勭悊 OSS 鍓嶇紑鍜?`/offweb` 瀛愯矾寰勯儴缃蹭笅鐨?basePath 鍓嶇紑銆?

- 棣栧睆 Hero銆佸洟闃熻鎯呴灞忎汉鐗╁浘绛夊叧閿灞忓浘鐗囨樉寮忎娇鐢?`loading="eager"` 鍜?`fetchPriority="high"`銆?
- 椤甸潰绾?Hero 濯掍綋榛樿淇濇寔涓婁竴鐗堢Щ鍔ㄧ `h-full w-screen min-w-full max-w-none object-cover` 閾烘弧绛栫暐锛涗粎 Our Team 鍒楄〃椤?Hero 鍥惧湪鎵嬫満绔娇鐢?`!w-full !h-auto max-w-none`锛屽彇娑?`height: 100%` 骞惰鍥剧墖鎸夊搴?100% 灞曠ず锛屾闈㈢浠嶉€氳繃 `md:inset-0 md:!h-full` 閾烘弧瀹瑰櫒楂樺害銆傞椤点€丄bout銆佸洟闃熻鎯呫€両ndustries銆佽涓氳鎯呫€丒vents銆丆ontact 鍜?Core Value 鐨勯灞忔爣棰樺鍔犵Щ鍔ㄧ杈冨皬瀛楀彿锛宍md` 浠ヤ笂淇濇寔鍘熻璁＄瀛楀彿銆?
- About Hero 褰撳墠寮曠敤 `/assets/about/hero.png`锛汿eam 椤?Hero 楂樺害涓?`67.5rem`锛屽洟闃熶釜浜鸿鎯呴〉棣栧睆浣跨敤 `profileHeroImages` 鎸?`yuxuan-liu` 鍒?`weifan-qiu` 鏄犲皠 `/assets/team/1.png` 鑷?`/assets/team/6.png`锛孒ero 楂樺害涓?`45.9375rem`锛屽浘鐗囦互 `object-cover` 閾烘弧瀵瑰簲 Hero 瀹瑰櫒瀹介珮銆?
- 瀹㈡埛 Logo銆侀〉鑴氬浘鏍囥€丄bout 灞曞紑鑳屾櫙銆丆ore Value 绉诲姩绔浘鏂囧崱鐗囩瓑闈為灞忕函灞曠ず鍥剧墖浣跨敤 `loading="lazy"`锛涘甫 `group-hover:scale-*` 鐨勪氦浜掑浘鐗囨敼鐢ㄩ粯璁ゅ姞杞藉苟鏄惧紡 `decoding="sync"`锛岄伩鍏嶉娆?hover 鏃跺浘鐗囨墠瑙ｇ爜瀵艰嚧鐩存帴璺冲埌鏀惧ぇ鐘舵€併€?
- `public/assets` 涓綋鍓嶉〉闈㈠疄闄呭紩鐢ㄧ殑澶у浘鐢熸垚 WebP 鐗堟湰骞跺垏鎹唬鐮佸紩鐢紱棣栭〉 Hero 鏀圭敤 `/assets/home/娴锋氮0508.mp4`锛屼笉鍐嶄娇鐢ㄥ帇缂╁浘鐗囷紝骞堕€氳繃 `assetUrl()` 鍦ㄧ敓浜х幆澧冭鍙?OSS 瑙嗛锛汚bout銆乀eam銆両ndustries銆丒vents銆丆ontact 鍜?Core Value 鐨?Hero 鍥句繚鎸?PNG 灞曠ず锛屽叾浠栭潪 Hero 椤甸潰鍜屽崱鐗囧ぇ鍥剧户缁娇鐢?WebP銆?
- `public/font/poppins.ttf` 涓烘湰鍦板紑鍙戝拰鏈厤缃?OSS 鐨勯儴缃叉彁渚涘瓧浣撻潤鎬佽闂紱鍚屼竴瀛椾綋宸蹭笂浼犲埌 OSS 鐨?`/husuweb/font/poppins.ttf`銆?
- Core Value 闀挎粴鍔ㄥ浘鐗囧姩鐢诲湪 `CoreValueScrollFlow` 涓€氳繃 `requestAnimationFrame` 鍚堝苟婊氬姩鏇存柊锛屽苟鐢?`IntersectionObserver` 鍦ㄥ尯鍧楄繙绂昏鍙ｆ椂鏆傚仠婊氬姩璁＄畻銆?
- `/offweb` 鍙戝竷鍖呮暣鐞嗘椂浼氫粠 `dist/offweb/public` 绉婚櫎宸茬粡鐢?WebP 鏇夸唬鐨勫師濮嬪ぇ鍥撅紝鍑忓皯涓婁紶浣撶Н鍜屾湇鍔″櫒纾佺洏鍗犵敤锛涙簮鐮?public 鐩綍淇濈暀鍘熷浘浣滀负绱犳潗澶囦唤銆?

## 涓枃鏂囨涓庤瑷€鍒囨崲

`src/app/layout.tsx` 閫氳繃 `src/components/layout/AppProviders.tsx` 鍖呰９鍏ㄧ珯鍐呭锛宍AppProviders` 鍙礋璐ｆ寕杞?`src/i18n/LanguageProvider.tsx`銆?

- `LanguageProvider` 鏄鎴风涓婁笅鏂囷紝淇濆瓨 `en` / `zh` 褰撳墠璇█锛屽苟鍐欏叆 `localStorage` 鐨?`tiger-language`锛涘垏鎹㈡椂鍚屾鏇存柊 `document.documentElement.lang` 涓?`en` 鎴?`zh-CN`銆?
- `src/i18n/copy.ts` 闆嗕腑缁存姢椤甸潰绾т腑鑻辨枃鏂囨锛屼腑鏂囨潵婧愬搴?`Chinese/*page.md`锛屽寘鎷椤点€丄bout銆丆ore Value銆乀eam銆両ndustries銆丒vents銆丆ontact銆侀〉鑴氬拰閫氱敤鎸夐挳鏂囨锛涘洟闃熼〉涓枃鍙ｅ彿鏄剧ず涓衡€滄垜浠紝/ 鍗充负绮鹃攼涔嬪笀鈥濓紝Contact 涓枃鑱旂郴鏂囨缁熶竴涓衡€滃鎮ㄦ湁浠讳綍娉曞緥鐤戦棶鎴栦簤璁紝娆㈣繋闅忔椂涓庢垜浠仈绯汇€傛垜浠瘹鎸氭湡寰呬负鎮ㄦ彁渚涗笓涓氱殑娉曞緥鏈嶅姟锛岃嚧鍔涗簬缁存姢鎮ㄧ殑鍚堟硶鏉冪泭銆傗€濄€?
- `SiteHeader` 鐨勮瑷€鎸夐挳涓嶅啀缁存姢灞€閮ㄧ姸鎬侊紝鑰屾槸璋冪敤鍏ㄧ珯 `toggleLanguage`锛涘洜姝ら〉澶淬€侀〉鑴氬拰椤甸潰涓讳綋浼氬悓姝ュ垏鎹€傛寜閽樉绀虹洰鏍囪瑷€锛岃嫳鏂囬〉闈㈡樉绀?`CN`锛屼腑鏂囬〉闈㈡樉绀衡€滆嫳鈥濄€?
- `src/data/events.ts` 浠?`EN/event.md` 鐨?28 鏉′簨浠舵棩鏈熶綔涓哄畼缃?Events 瀵煎嚭鑼冨洿锛屽苟淇濈暀浜嬩欢鐨勪腑鑻辨枃 category銆乼itle銆乻ummary銆佹鏂囨钀藉拰鐪熷疄浜嬩欢鍥剧墖锛汦vents 鍒楄〃椤靛拰浜嬩欢璇︽儏椤甸€氳繃 `localizeEvent` 鎸夊綋鍓嶈瑷€鏄剧ず锛涗腑鏂囨棩鏈熸樉绀轰负 `YYYY.MM.DD`锛岃嫳鏂囨棩鏈熸樉绀轰负 `Mon. D, YYYY`锛涗腑鏂囨湰鍦板寲杈撳嚭浼氳瘑鍒爣棰樹腑鐨勨€滆檸璇夊姩鎬?/ 琛屼笟璧勮 / 铏庣溂瑙傚療鈥濆墠缂€骞惰鑼冨寲涓?category锛屾棤鍒嗙被鏍囬涓嶄細娓叉煋鍓嶇疆鍒嗛殧绗︺€?
- `src/data/eventInfoImages.ts` 鎸夋棫 28 鏉?Events 鐨勫鍑洪『搴忥紝灏?`src/assets/event/eventinfo` 涓?22 寮犺鎯呭浘鐗囨槧灏勫埌鍚崰浣嶇鐨勬棫浜嬩欢锛沗src/data/event2Events.ts` 鎵胯浇 `EN/event2.md` 鍜?`Chinese/event2.md` 鐨?15 鏉℃柊澧炰簨浠讹紝鍒楄〃鍥捐鍙?`/assets/event/event2/*`锛屽叾涓?2026 骞村墠涓夋潯鎸夋柊鐗堢礌鏉愪娇鐢?`1.jpg`銆乣2.jpg`銆乣3.png`锛屽悓鏃?public 鍜?OSS 淇濈暀 `1.png`銆乣2.png`銆乣3.jpg` 鍏煎鏃?URL锛涜鎯呴〉鍗犱綅鍥炬寜浜嬩欢椤哄簭鏄犲皠 `/assets/event/eventinfo2/*`锛屽苟涓烘寚瀹氫簨浠堕€氳繃 `detailVideos` 缁戝畾璇︽儏瑙嗛锛沗src/data/events.ts` 灏嗘柊澧炰簨浠跺墠缃悎骞跺埌瀹樼綉 Events 鏁版嵁锛屽苟閫氳繃鍙€?`detailImages` / `detailVideos` 鏀寔璇︽儏椤垫鏂囨彃鍥惧拰瑙嗛锛汦vents 鍒楄〃杩涘叆璇︽儏鏃朵細鍚屾椂淇濆瓨婊氬姩浣嶇疆鍜?See More 灞曞紑鐘舵€侊紝杩斿洖鍚庡厛鎭㈠灞曞紑鐘舵€佸啀婊氬姩鍒板師浣嶇疆銆?
- 棣栭〉 `HONORS` 鐨勪腑鏂囧勾搴﹁崳瑾夋暟鎹潵鑷?`Chinese/awards.md`锛岄椤?`Events` 涓夊崱杞挱閫氳繃 slug 澶嶇敤 `src/data/events.ts` 鐨勭湡瀹炰簨浠舵暟鎹紝骞剁敱 `localizeEvent` 鎸夎瑷€杈撳嚭鏍囬銆佹憳瑕併€佹棩鏈熷拰鍥剧墖銆?
- About 椤?`Honors` 灞曞紑鍒楄〃鎸?`Chinese/awards.md` 澧炲姞涓枃闀滃儚鏁版嵁锛屽苟淇濈暀鑻辨枃鏁版嵁閲岀殑寰俊鍏紬鍙烽摼鎺ワ紱`Chronicle` 鎸?`EN/CHRONICLE.md` 鍜?`Chinese/CHRONICLE.md` 鐨勫畬鏁村彞瀛愮敓鎴愪腑鑻辨枃骞翠唤鏃堕棿绾匡紝骞舵寜婧愭枃妗ｆ牎鍑?2026 骞翠竴鏈堛€佷笁鏈堛€佸洓鏈堛€佷簲鏈堣褰曘€?
- 鍥㈤槦椤典汉鐗╁崱鐗囧湪 `src/data/teamProfiles.ts` 涓ˉ鍏?`zhName`銆乣zhTitle`锛屽洟闃熶釜浜鸿鎯呴〉鍦ㄥ悓涓€鏁版嵁婧愪腑琛ュ厖 `zh` 璇︽儏瀵硅薄锛屾潵婧愬潎涓?`Chinese/teamInfo.md`锛涗釜浜轰笟缁╂潯鐩凡鎸?`EN/teamInfo.md` 鍜?`Chinese/teamInfo.md` 瀹屾暣鍚屾锛岄伩鍏嶅帇缂╂垨閬楁紡銆?
- 琛屼笟璇︽儏椤靛湪 `src/components/pages/IndustryDetailPage.tsx` 涓负鍏釜琛屼笟琛ュ厖 `zhIndustries`锛屼腑鏂囨爣棰樸€佺畝浠嬪拰鏈嶅姟鑼冨洿鏉ユ簮涓?`Chinese/industriesInfo.md`锛涜嫳鏂囩姸鎬佷笅 Private Equity銆丷eal Estate銆丼ports and E-Sports銆丆yber Tech and Game 鐨勬湇鍔¤寖鍥存寜 `EN/industriesInfo.md` 琛ラ綈淇濆叏鑼冨洿鍜屽墠缃鏄庯紱鏈嶅姟绔?`generateMetadata` 鍜?`generateStaticParams` 浣跨敤 `src/data/industryMetadata.ts`锛岄伩鍏嶄粠瀹㈡埛绔〉闈㈢粍浠惰鍙栨暟鎹€?
- 褰撳墠涓枃鎺ュ叆浠ラ〉闈㈢骇鏂囨鍜屼富瑕佸垪琛ㄦ憳瑕佷负涓伙紝鏈敼鍙樿矾鐢遍€昏緫銆?

## Title 瀵艰埅

`src/components/layout/SiteHeader.tsx` 鏍规嵁 `OVERALL/title/word.md` 瀹炵幇椤堕儴 title 瀵艰埅锛?

- 浣跨敤 `public/assets/title/logo.svg` 浣滀负宸︿晶 logo锛?
- logo 浣跨敤 SVG锛屽搴﹀浐瀹氫负 `5.375rem`锛屽嵆 86px锛岄珮搴﹁嚜閫傚簲锛?
- Header 鍐呭眰涓婁笅 padding 涓?`1.2rem`锛?
- 椤堕儴鍥哄畾鍚搁《锛岄灞忛€忔槑锛屾粴鍔ㄥ悗娓愬彉涓烘繁鑹插崐閫忔槑鑳屾櫙锛?
- 婊氬姩鍚庡嚭鐜板簳閮ㄥ垎闅旂嚎鍜岃交寰瘺鐜荤拑锛?
- 妗岄潰瀵艰埅鏀寔鑻辨枃 / 涓枃鏍囬鍒囨崲锛?
- 璇█鐘舵€佹潵鑷?`LanguageProvider`锛屽彲鍚屾椹卞姩椤甸潰涓讳綋鍜岄〉鑴氭枃妗堬紱
- 妗岄潰涓庣Щ鍔ㄧ瀵艰埅鏂囧瓧鍦?16:24 鐗堟湰鍩虹涓婄户缁斁澶?`1.4` 鍊嶏紱
- 鑻辨枃鏍囬锛欻OME銆丄BOUT US銆丱UR TEAM銆両NDUSTRIES銆丒VENTS銆丆ONTACT锛屾簮鐮佺洿鎺ヤ娇鐢ㄥぇ鍐欐枃妗堣€屼笉鏄?CSS 寮哄埗杞崲锛?
- 涓枃鏍囬锛氶椤点€佸叧浜庢垜浠€佽檸璇夊洟闃熴€佹湇鍔¤涓氥€佽檸璇夊姩鎬併€佽仈绯绘垜浠紱
- Our team 瀵艰埅鎸囧悜 `/team`锛?
- 褰撳墠椤甸潰鏂囧瓧淇濇寔鐧借壊骞舵樉绀洪噾鑹蹭笅鍒掔嚎锛屼笅鍒掔嚎鍘氬害涓?`0.125rem`锛?
- hover 鏃舵枃瀛楁彁浜紝涓嬪垝绾夸粠宸﹀悜鍙冲睍寮€锛屽睍寮€绾挎潯鍘氬害鍚屾牱涓?`0.125rem`锛?
- 绉诲姩绔樉绀鸿彍鍗曟寜閽紝鐐瑰嚮鍚庡垏鎹㈠叧闂浘鏍囧苟灞曠ず绾靛悜鑿滃崟銆?

## Footer 椤佃剼

`src/components/layout/SiteFooter.tsx` 鏍规嵁 `OVERALL/foot/word.md` 缁熶竴涓哄叏绔欏叕鍏遍〉鑴氾細

- 鎵€鏈夊叕寮€椤甸潰鍧囦娇鐢ㄥ悓涓€涓?`SiteFooter`锛?
- 椤佃剼绱犳潗鏉ヨ嚜 `public/assets/foot/*`锛岀敱 `src/assets/foot/*` 鍙戝竷鍒?public锛?
- 绗竴琛屽乏渚т娇鐢?`logo.svg`锛屽搴﹀浐瀹氫负 `9.5rem`锛屽嵆 152px锛岄珮搴﹁嚜閫傚簲锛涘彸渚т笁琛屽睍绀哄搧鐗岀悊蹇垫枃妗堬紱
- 绗竴琛屽彸渚у搧鐗岀悊蹇点€佺浜岃鍦板潃銆佺増鏉冩枃妗堜細鏍规嵁褰撳墠璇█鍦?English / 涓枃涔嬮棿鍒囨崲锛?
- 绗簩琛屽乏渚у湴鍧€鍓嶄娇鐢?`address.png`锛屽彸渚т娇鐢?`weixin.png`锛?
- 绗笁琛岀數璇濆拰閭鍒嗗埆浣跨敤 `phone.png`銆乣email.png`锛屽彸渚ф樉绀虹敱 `src/assets/foot/QRcode.png` 鍙戝竷鐨?`QRcode.png`锛岃祫婧愭浛鎹㈠悗闇€鍚屾瑕嗙洊 `public/assets/foot/QRcode.png`銆乣dist/offweb/public/assets/foot/QRcode.png` 鍜?OSS锛汧ooter 浜岀淮鐮佽矾寰勫甫 `?v=202605112333` 鐗堟湰鍙傛暟浠ラ伩寮€娴忚鍣ㄦ棫缂撳瓨锛屽睍绀烘牱寮忎娇鐢?`object-contain` 閬垮厤浜岀淮鐮佽瑁佸垏锛?
- 绗洓琛屽睍绀虹増鏉冦€侀殣绉佸０鏄庛€佸叕瀹夊妗堝拰 ICP 澶囨锛屽叾涓叕瀹夊妗堝墠浣跨敤 `china.png`锛涘叕瀹夊妗堝彿閾炬帴鍒?`beian.mps.gov.cn`锛孖CP 澶囨鍙烽摼鎺ュ埌 `beian.miit.gov.cn`锛沗Disclaimer and Privacy` 涓烘寜閽紝鐐瑰嚮鍚庢墦寮€绔欏唴 modal锛屽苟鏍规嵁褰撳墠璇█灞曠ず涓嫳鏂囧厤璐ｅ０鏄庝笌闅愮鏉℃锛屽彸涓婅鍏抽棴鎸夐挳鍙叧闂脊绐椼€?

## 椤甸潰璇存槑

### 棣栭〉 `/`

棣栭〉鐢卞崟鏂囦欢椤甸潰瀹炵幇锛屽寘鍚細

- 棣栧睆 Hero 浣跨敤鏈湴瑙嗛 `/assets/home/娴锋氮0508.mp4` 浣滀负鍏ㄥ睆鑳屾櫙锛岃棰?`autoPlay/muted/loop/playsInline` 骞朵繚鎸?`opacity-90`锛涗富鏍囬淇濇寔鍗曡鏄剧ず锛屾枃鏈洿鎺ヤ娇鐢ㄥぇ鍐?`WE KNOW HOW TO WIN`锛屾寜 1920 璁捐鍩哄噯灏?100px 鎹㈢畻涓?`6.25rem`锛岄€氳繃 `.hero-flow-text` 浣跨敤澶氭閲戣壊娓愬彉鍜?`hero-flow-shine` keyframes 瀹炵幇娴佸厜鏂囧瓧鏁堟灉锛?
- Vision 寮曞灞忓灞備笉鍐嶄娇鐢ㄤ笓闂ㄨ儗鏅浘锛岃儗鏅壊涓?`#171717`锛涘唴閮?Vision 鍗＄墖鑳屾櫙涓轰粠宸︿笂鍒板彸涓嬬殑 `rgb(36, 36, 36) 9%`銆乣#303033`銆乣#403f3f`銆乣#514c45` 瀵硅绾挎笎鍙橈紱
- Vision 鍗＄墖澶栦晶宸﹀彸杈硅窛涓?`2.5rem`锛屽唴閮ㄥ唴瀹归€氳繃璁＄畻 padding 缁х画鍜屽叏绔?title / `.site-shell` 鍐呭绾垮榻愶紱
- Vision 鍗＄墖涓嶅啀鍙犲姞涓婁笅榛戣壊閬僵锛屽苟灏嗘棆杞?270 搴︺€佹甯稿瓧閲嶄笖涓嶅己鍒跺ぇ鍐欑殑 Vision 鏍囪瘑鏀惧埌鍗＄墖鏈€鍙充晶锛涜嫳鏂?Vision 鏍囪瘑涓?`8.75rem`锛屼腑鏂団€滆檸璇夋効鏅€濈缉灏忓埌 80%锛屽嵆 `7rem`锛?
- Vision 姝ｆ枃鑻辨枃鍥哄畾涓轰笁琛岋紝鎸?1920 璁捐鍩哄噯灏?40px 鎹㈢畻涓?`2.5rem`锛屽叾涓?`We are committed to` 浣跨敤缁嗕綋鏂滀綋锛屽悗缁唴瀹逛娇鐢ㄧ矖浣擄紱涓枃鐘舵€佸瓧鍙风缉灏忓埌鑻辨枃鐨?80%锛屽嵆 `2rem`锛?
- Vision 鐨?Get To Know Us 鎸夐挳涓洪潪鍏ㄥ鎸夐挳锛岄粯璁ょ櫧鑹茶儗鏅€侀粦鑹叉枃瀛楋紝hover 鏃跺弽鑹诧紱鏂囧瓧鎸?24px 鎹㈢畻涓?`1.5rem`锛?
- Industries & Services 缃戞牸锛屾爣棰樹娇鐢?`#f6ebe4` 鍒?`#d9b27a` 鐨勬笎鍙樺苟鎸?90px 鎹㈢畻涓?`5.625rem`锛涜鏄庢鏂囨寜 28px 鎹㈢畻涓?`1.75rem`銆佺粏浣撴枩浣撳苟鍗犳弧鐖跺鍣ㄥ搴︼紝姝ｆ枃涓嬫柟鏄剧ず涓€鏉＄伆鑹叉í绾匡紱鍓嶄簲寮犲崱鐗囧浘鐗囦娇鐢ㄦ湰鍦?`/assets/home/INDUSTRIES1.webp` 鍒?`/assets/home/INDUSTRIES5.webp`锛岀鍏紶鍦?`INDUSTRIES6` 灏氭湭鎻愪緵鍓嶄繚鐣欏師鍥剧墖锛汻eal Estate 鍥剧墖鐢?`src/assets/home/INDUSTRIES3.png` 閲嶆柊鍙戝竷骞剁敓鎴?`/assets/home/INDUSTRIES3.webp`锛涘崱鐗囨爣棰樻寜 36px 鎹㈢畻涓?`2.25rem`锛屽崱鐗囧姞鍏ュ弬鑰冨師鍨嬬殑鍥剧墖鐏板害鎭㈠銆侀《閮ㄩ珮浜嚎銆佺澶村叆鍦哄拰鍗＄墖涓婃诞鏁堟灉锛涙瘡寮犲崱鐗囨寜鑷韩 slug 璺宠浆鍒?`/industries/[slug]`锛?
- Honors 骞翠唤鏃堕棿杞达紝浣跨敤 `useState` 鏀寔宸﹀彸鎸夐挳鍒囨崲鍜岀偣鍑诲勾浠藉垏鎹紱榛樿 active 涓?2026锛涢椤靛勾浠芥寜閽ˉ榻?2026銆?025銆?024銆?023銆?022銆?021銆?020銆?019 鍏釜骞翠唤锛屼絾骞翠唤鏉′竴娆″彧灞曠ず 5 涓勾浠斤紱宸﹀彸鎸夐挳鎺у埗褰撳墠閫変腑骞翠唤閫愰」宸﹀彸绉诲姩锛岀Щ鍔ㄥ埌 2026 宸︿晶浼氬惊鐜埌鏈€鍙充晶 2019锛岀Щ鍔ㄥ埌 2019 鍙充晶浼氬惊鐜洖 2026锛岃嫢鏂伴€変腑骞翠唤涓嶅湪褰撳墠 5 涓彲瑙侀」鍐呭垯鍚屾璋冩暣鍙绐楀彛锛涙闈㈡爣棰樻寜 110px 鎹㈢畻涓?`6.875rem`锛岀Щ鍔ㄧ闄嶄负 `4rem`锛屽彸渚ц鏄庡拰 active 鍐呭鍦ㄧЩ鍔ㄧ鍚屾缂╁皬骞跺厑璁搁暱鏂囨鎹㈣锛岄伩鍏嶈秴鍑鸿绐楋紱
- Events 涓夊崱涓績杞挱锛屼娇鐢ㄨ嚜瀹氫箟鐘舵€併€乣useEffect` 鑷姩杞挱鍜?CSS transition 瀹炵幇涓棿涓诲崱绐佸嚭銆佷袱渚у急鍖栥€佺澶翠笌鍒嗛〉鐐瑰垏鎹紱棣栭〉杞挱鎸?slug 浠?`src/data/events.ts` 璇诲彇 `20231117`銆乣20230406`銆乣20230329`銆乣20221218`銆乣20221108` 浜旀潯 `EN/event.md` 鑼冨洿鍐呯殑鐪熷疄浜嬩欢锛屽浘鐗囥€佹爣棰樸€佹憳瑕佸拰璺宠浆涓?Events 鍒楄〃/璇︽儏椤典繚鎸佸悓婧愶紱姣忓紶杞挱鍗＄偣鍑昏烦杞埌瀵瑰簲 `/events/[slug]` 璇︽儏椤碉紱妗岄潰杞挱鑸炲彴楂樺害涓?`58rem`锛岀Щ鍔ㄧ闄嶄负 `34rem`锛涚Щ鍔ㄧ杞挱鏂囧瓧銆佽鏄庣洅鍐呰窛鍜岃鏄庤鏁版敹绱э紝杞挱鎸夐挳涓?See More 鏀逛负绾靛悜鎺掑垪锛岄伩鍏嶆寜閽噸鍙犲苟缂╃煭涓庤疆鎾殑璺濈锛?
- Clients 涓夎妯悜婊氬姩 Logo 澧欙紝绱犳潗鏉ヨ嚜 `src/assets/home/clientLogo/*` 骞堕『搴忓彂甯冧负 `public/assets/home/clientLogo/client-logo-01` 鍒?`client-logo-42`锛屾爣棰樿窛绂昏绐楀乏渚?`5rem`锛屽瓧鍙锋寜 36px 鎹㈢畻涓?`2.25rem`锛屼笁琛屽垎鍒娇鐢ㄤ簰涓嶉噸鍙犵殑 Logo 鍒嗙粍浠ラ伩鍏嶅悓涓€瑙嗙獥璺ㄨ鍑虹幇閲嶅 Logo锛汱ogo 鍗＄墖涓虹函鐧藉簳銆佹祬鑹叉弿杈瑰拰灏忓渾瑙掞紝鍗＄墖鍐?logo 鍥剧墖楂樺害鍥哄畾鍗犵埗瀹瑰櫒 80%銆佸搴﹁嚜閫傚簲骞堕檺鍒朵笉瓒呰繃鐖跺鍣ㄥ搴︼紱鏀寔鍙嶅悜婊氬姩鍜屾棤缂濆惊鐜紝鍔ㄧ敾鏃堕暱涓?`103.85s`锛岀浉瀵瑰師 `135s` 閫熷害鎻愬崌鍒?1.3 鍊嶏紝宸﹀彸榛戣壊娓愰殣钂欏眰宸茬Щ闄わ紱
- Footer / Contact 淇℃伅銆?

2026-05-07 鏈湴璋冩暣锛?
- 棣栭〉 Honors 鏁版嵁鎸?`EN/award.md` 鏁寸悊涓哄勾搴﹀垪琛紝姣忎釜骞翠唤灞曠ず鏈€杩戣崳瑾変簨浠讹紝骞堕澶栬ˉ鍏?2022/2023/2024 骞磋檸璇夎禐鍔╂椿鍔ㄥ拰 Wan Li 澶ц繛鍥介檯浠茶闄徊瑁佸憳鏉＄洰锛汼ee More 灞呬腑鏄剧ず锛屽苟璺宠浆鍒?`/about#honors`銆?
- 涓枃鐘舵€佷笅锛岄椤?Honors 鍒囨崲鍒?`Chinese/awards.md` 瀵瑰簲鐨勫勾搴︿腑鏂囪崳瑾夋潯鐩€?
- 棣栭〉 Events 杞挱浜旀潯浜嬩欢缁熶竴澶嶇敤 `src/data/events.ts`锛歚20231117`銆乣20230406`銆乣20230329`銆乣20221218`銆乣20221108`锛屼笉鍐嶅崟鐙淮鎶ら椤靛浘鐗囧拰鏂囨锛涜疆鎾笂涓€寮?涓嬩竴寮犲拰鍒嗛〉鐐规寜閽按骞冲眳涓紝See More 淇濇寔鍦ㄥ彸渚у叆鍙ｃ€?
- 涓枃鐘舵€佷笅锛岄椤?Events 浜旀潯杞挱浜嬩欢浣跨敤 `localizeEvent` 杈撳嚭瀵瑰簲涓枃鏍囬銆佹棩鏈熷拰鎽樿銆?
- 棣栭〉 Clients 灞忚儗鏅仮澶嶄负娣辫壊锛屽鎴?Logo 鍗＄墖淇濇寔绾櫧搴曞拰娴呰壊鎻忚竟銆?

### About `/about`

About 椤甸潰鐢卞涓尯鍧楃粍浠剁粍鎴愶細

- `AboutHero`
- `Honors`
- `Culture`
- `Chronicle`

鍏朵腑锛?

- `AboutHero` 浣跨敤鏈湴 `/assets/about/hero.png` 浣滀负棣栧睆鑳屾櫙锛屽苟鐩存帴娓叉煋 `VisionCard`锛涢灞?`100svh` 鍐呬笉鍙犲姞钂欏眰锛岀旱鍚?妯悜娓愬彉钂欏眰浠?`top-[100svh]` 寮€濮嬶紝浠呬綔鐢ㄤ簬棣栧睆涔嬪悗鐨勫欢灞曞尯鍩燂紱About 鏍囬缁勪粠棣栧睆 55% 浣嶇疆寮€濮嬪苟淇濇寔 `12rem` 鍐呭绾匡紝宸︿晶澧炲姞閲戣壊绔栫嚎锛汚bout us 鏍囬鎸?96px 鎹㈢畻涓?`6rem`銆乻emibold锛屾鏂囨寜 32px 鎹㈢畻涓?`2rem`銆乵edium italic锛沄ision 鍗＄墖涓嶅啀渚濊禆 `calc(100svh + 36rem)` 鍥哄畾楂樺害鍜岀粷瀵瑰畾浣嶇埗瀹瑰櫒锛屾敼涓洪灞忓悗鐩稿娴佸紡甯冨眬骞堕€氳繃 `-mt-[10svh]` 鍙犲叆棣栧睆搴曢儴锛屽灞?`pb-20` 涓?See More 棰勭暀鑷劧涓嬭竟璺濓紱鐏拌壊鏂瑰潡妗岄潰宸﹀彸澶栬窛涓?`5rem`锛屽崱鐗囪儗鏅娇鐢?`#585551` 鍒?`#2f2f2f` 鐨勫乏涓婂埌鍙充笅娓愬彉锛?
- `Vision.tsx` 淇濈暀 `VisionCard` 澶嶇敤瀵煎嚭锛屽崱鐗囪儗鏅帴鍏ユ湰鍦?`/assets/about/aboutVision.png` 骞跺彔鍔犳繁鑹叉笎鍙樹互淇濊瘉鏂囧瓧鍙锛岃儗鏅浘鐗囦娇鐢?`h-full w-full object-cover` 閫傚簲鍗＄墖瀹屾暣楂樺害锛涘彸渚?Vision 鏍囬涓庤鏄庢枃瀛楁闈㈠悓鎺掞紝`VISION` 鏍囬妗岄潰鎸?80px 鎹㈢畻涓?`5rem` 骞朵娇鐢?extrabold锛涚Щ鍔ㄧ鏍囬鍜岄粍鑹茶鏄庣缉灏忥紝鑻辨枃绗簩琛屼粎鍦?`md` 浠ヤ笂淇濇寔涓嶆崲琛岋紝姝ｆ枃绉诲姩绔敼涓哄乏瀵归綈骞跺厑璁告柇璇嶆崲琛岋紝閬垮厤榛勮壊璇存槑鍜屾鏂囪秺杩囪绐楋紱
- `Honors` 浣跨敤 `useState` 鍋氬勾浠芥姌鍙犱氦浜掞紝鏁版嵁鎸?`EN/award.md` 鐨勮嫳鏂囨潯鐩暣鐞嗕负骞村害濂栭」鍒楄〃锛涘睍绀哄墠鍏堟寜骞翠唤闄嶅簭锛屽啀瀵规瘡涓勾浠藉唴鐨勫椤规寜 `YYYY-MM` 鏃ユ湡闄嶅簭鎺掑簭锛岀‘淇濇湀浠藉ぇ鐨勮崳瑾夋帓鍦ㄤ笂鏂癸紱灞曞紑鍐呭浣跨敤 `grid-rows` 杩囨浮鍔ㄧ敾锛涙爣棰?`HONORS` 妗岄潰鎸?120px 鎹㈢畻涓?`7.5rem`銆乻emibold italic锛岀Щ鍔ㄧ闄嶄负 `4rem`锛涘彸渚ц鏄庣Щ鍔ㄧ鏀逛负宸﹀榻愬苟缂╁皬瀛楀彿锛涘勾浠藉ご閮ㄣ€佸椤规爣棰樸€佹鏂囧拰鏃ユ湡鍧囧鍔犵Щ鍔ㄧ瀛楀彿涓庢柇琛岀害鏉燂紝閬垮厤 About Honors 妯悜婧㈠嚭锛?
- `Culture` 宸︿晶鍥剧墖鎸夋寚瀹氫娇鐢?`/assets/home/INDUSTRIES3.png` 鍘熷浘锛屽弬鑰?Contact us 鍙屾爮鏁堟灉鍋氶暅鍍忓竷灞€锛氬浘鐗囧湪宸︺€佹枃瀛楄壊鍧楀湪鍙筹紝鍥剧墖鍙崇紭浣跨敤妫曢噾鍒伴€忔槑鐨勮鎺ユ笎鍙橈紝鍙充晶鑳屾櫙涓?`#A1865F` 骞朵繚鐣欎綆閫忔槑搴︽娊璞″搧鐗屾按鍗帮紱鏍囬鍜屾鏂囨敼涓洪粦鑹诧紝鏍囬鎸?Contact us 瑙勬牸浣跨敤 `clamp(2.5rem,2.708vw,3.25rem)`锛屾鏂囨寜 `clamp(1.25rem,1.46vw,1.75rem)` italic锛宍READ FULL MANIFESTO` 鎸夐挳浣跨敤 `#D9B27A` 鑳屾櫙骞舵寜 18px 鎹㈢畻涓?`1.125rem` medium锛?
- `Chronicle` 浣跨敤 `useState` 鍋氬勾浠芥姌鍙犱氦浜掞紝鑻辨枃鏁版嵁鎸?`EN/CHRONICLE.md` 鐨勫勾浠姐€佹湀浠姐€佸唴瀹规暣鐞嗕负 2026 鍒?2018 鐨勫畬鏁存椂闂寸嚎锛屼腑鏂囨暟鎹寜 `Chinese/CHRONICLE.md` 鎻愪緵鍚屾牱骞翠唤缁撴瀯锛岄〉闈㈡枃妗堜繚鐣欐簮鏂囨。瀹屾暣鍙ュ瓙锛涢粯璁ゅ睍绀哄墠涓変釜骞翠唤锛孲ee More 浣跨敤涓?Culture 鐨?READ FULL MANIFESTO 涓€鑷寸殑閲戣壊鎸夐挳鍔ㄦ晥锛屽睍寮€鍏ㄩ儴骞翠唤鍚庤嫳鏂囨寜閽枃妗堝垏鎹负 `COLLAPSE`銆佷腑鏂囨寜閽枃妗堝垏鎹负 `鏀惰捣`锛涘勾浠芥寜閽儗鏅负 `#202020` 涓旇竟妗嗕负閲戣壊锛宧over 鏃跺垏鎹负閲戣壊瀹炲簳锛沗CHRONICLE` 鏍囬鎸?80px 鎹㈢畻涓?`5rem` medium锛屽彸渚ц鏄庢寜 28px 鎹㈢畻涓?`1.75rem` light锛屽勾浠芥寜閽寜 36px 鎹㈢畻涓?`2.25rem` medium锛涘睍寮€鍗＄墖鍦ㄩ潬杩戜腑杞翠竴渚ф樉绀洪噾鑹茶竟妗嗭紝鏈堜唤鎸?24px 鎹㈢畻涓?`1.5rem` semibold 涓旈鑹?`#D9B27A`锛屾湀浠芥爣棰樹笅鍒掔嚎闈犺繎涓酱锛屾鏂囦负 `1.5rem` light 鐏拌壊骞跺崰鍗＄墖瀹藉害 85%銆?

About Honors 鍖哄潡鏂板 `id="honors"` 鍜?`scroll-mt-[var(--header-height)]`锛屼緵棣栭〉 `/about#honors` 閿氱偣璺宠浆瀹氫綅锛涘勾搴︽暟鎹ˉ鍏?202211銆?02304銆?0240515銆?0241129 鍜?202203 浜旀潯鑽ｈ獕/璧炲姪娲诲姩锛屽叾涓?2023 鐙珛鎴愬勾搴︽姌鍙犻」锛孷iew Award 缁戝畾瀵瑰簲寰俊鍏紬鍙烽摼鎺ャ€?

### Core Value `/about/core-value`

Core Value 椤甸潰鍩轰簬 `core value/` 鍘熷瀷閲嶅缓锛屼粛褰掑睘 About 璺敱灞傜骇锛?

- 椤甸潰鍏ュ彛涓?`src/app/about/core-value/page.tsx`锛屽睍绀虹粍浠朵负 `src/components/pages/CoreValuePage.tsx`锛?
- 澶嶇敤鍏ㄧ珯 `SiteHeader` 涓?`SiteFooter`锛岄《閮ㄥ鑸?active 浠嶄负 ABOUT US锛?
- Hero 浣跨敤鍘熷瀷鑳屾櫙鍥撅紝姝ｆ枃鍖呭惈缁熶竴 `SubpageBreadcrumb` 闈㈠寘灞戯紝鏄剧ず About us / Core Value锛屽瓧鍙蜂负 `1.5rem`锛岀偣鍑昏繑鍥炰笂涓€椤垫垨鍥為€€鍒?`/about`锛?
- 涓変釜浠峰€艰娈佃惤鏀圭敱 `src/components/sections/core-value/CoreValueScrollFlow.tsx` 鎵胯浇锛屾枃妗堟寜 `EN/coreValue.md` 鍜?`Chinese/corevalue.md` 琛ラ綈绗笁鏉♀€滃睘浜烘€?/ Hands-on鈥濈殑瑙ｉ噴娈典笌缁撳熬娈碉紱鑻辨枃姝ｆ枃浣跨敤宸﹀榻愩€佹甯歌瘝璺濆拰 `leading-[1.55]`锛岄伩鍏嶄袱绔榻愭媺澶у崟璇嶉棿闅旓紝涓枃姝ｆ枃淇濈暀涓ょ瀵归綈骞舵敹绱у埌 `leading-[1.65]`锛涘弬鑰?`浜嬩欢 copy/src/app/components/FeaturesSection.tsx` 鐨勬粴鍔ㄩ€昏緫锛氭闈㈢澶栧眰楂樺害涓烘潯鐩暟涔樹互 `100vh`锛屾粴鍔ㄨ繘搴︾洿鎺ョ敱 `container.getBoundingClientRect().top / window.innerHeight` 璁＄畻锛屽乏渚у唴瀹规寜婊氬姩杩涘害婵€娲伙紝鍙充晶鍥剧墖鍖轰娇鐢ㄥ拰鍙傝€冨疄鐜颁竴鑷寸殑 `sticky top-0 h-screen flex items-center justify-center` 缁撴瀯鍥哄畾鍦ㄨ绐楀唴锛沗IntersectionObserver` 浣跨敤鍚堟硶鐨?`rootMargin: "100% 0px"` 鍒ゆ柇鍖哄煙鏄惁鎺ヨ繎瑙嗗彛锛涙粴鍔ㄥ尯鑳屾櫙涓?`#171717`锛屼笉鏄剧ず棰濆鐨?`CORE VALUES`/`Principles behind every dispute we take on` 寮曞鏂囨锛涘彸渚у浘鐗囧爢鍐呭眰淇濈暀 `translate-y-[5rem]` 鍜?`scale-90` 鎺у埗瑙嗚浣嶇疆锛屼袱涓寘瑁瑰眰鍧囪缃?`w-full` 浠ラ伩鍏嶅浘鐗囨爤瀹藉害濉岄櫡锛屽浘鐗囨爤浣跨敤 `aspect-[16/14]` 妯悜姣斾緥骞舵斁瀹藉彸渚у垪瀹斤紱Core Value 椤甸潰绾?`<main>` 涓嶅啀璁剧疆 `overflow-x-hidden`锛岄伩鍏嶇鍏?overflow 鍒涘缓瑁佸壀/婊氬姩涓婁笅鏂囧鑷?sticky 澶辨晥锛?
- 鍙充晶鍥剧墖鍫嗗彔瀵归綈 `浜嬩欢 copy/src/app/components/FeaturesSection.tsx` 鐨?`ImageStack` 鍔ㄦ晥锛氬灞備娇鐢?`aspect-[16/14]`锛屾瘡寮犲浘鐗囦娇鐢?`absolute inset-0` 鍙犳斁鍦ㄥ悓涓€瀹瑰櫒鍐咃紝閫氳繃 `clip-path: inset(...)` 鎸夋粴鍔ㄨ繘搴﹂€愬紶鎻ず锛屽苟鐢?`translateY(px)` 褰㈡垚鍏ュ満鍫嗗彔鍔ㄦ晥锛涚Щ鍔ㄧ鍥為€€涓烘櫘閫氱旱鍚戝浘鏂囧崱鐗囷紱
- 浠峰€艰鏍囬鎸?28px 鎹㈢畻涓?`1.75rem`銆乣#D9B27A` semibold锛岃嫳鏂囦互 `No.1 Our Spiritual Totem: Tiger` 鐨勫悎骞舵牸寮忓睍绀猴紝涓枃涓嶅睍绀?`number` 鍓嶇紑锛涙爣棰樹笅鏂逛笉鏄剧ず涓嬪垝绾匡紱姝ｆ枃鎸?24px 鎹㈢畻涓?`1.5rem` regular锛屽叾涓?No.1 鏂囨琛ュ厖 `Bi An (鐙寸姶)`锛涗腑鏂?`number` 涓虹┖鏃剁粍浠朵娇鐢ㄥ浘鐗囪矾寰勫拰绱㈠紩鐢熸垚绋冲畾 key锛岄伩鍏?React 閲嶅 key 璀﹀憡锛?
- 婊氬姩鍖哄浘鐗囦娇鐢?`/assets/core/core1.webp`銆乣core2.webp`銆乣core3.webp`锛屾潵婧愪负 `src/assets/core/core1.png` 鍒?`core3.png` 鐢熸垚鐨?WebP 鐗堟湰锛?
- 缁撳熬淇濈暀鍘熷瀷寮曠敤娈佃惤涓庡紩鍙峰浘褰€?
- 椤甸潰鍙充笅瑙掍娇鐢?`BackToTop` 鎻愪緵涓嫳鏂囪繑鍥炲叆鍙ｃ€?

椤甸潰闇€瑕佺殑 Core Value Hero 鍘熷瀷鍥剧墖宸插鍒跺埌 `public/assets/prototypes/core-value/*`锛涙粴鍔ㄥ尯鍥剧墖宸插彂甯冨埌 `public/assets/core/*`銆?

### Team `/team`

鍥㈤槦椤甸潰鍩轰簬 `鎴戠殑鍥㈤槦/` 鍘熷瀷閲嶅缓锛屽寘鍚細

- Our team Hero锛屼娇鐢ㄦ湰鍦?`/assets/team/hero.webp` 鍜岀伆鑹叉贩鍚堥伄缃╋紱绉诲姩绔?Hero 楂樺害涓?`100svh`锛屽浘鐗囨寜 `width: 100%`銆乣height: auto` 灞曠ず锛宍Our team` 鏍囬璐磋繎棣栧睆搴曢儴锛涙闈㈢鎭㈠ `67.5rem` 楂樺苟璁╁浘鐗囦互 `h-full w-full object-cover` 閾烘弧鐖跺鍣紱`#`銆乣Our team` 鍜屽壇鏍囬鍦ㄧЩ鍔ㄧ浣跨敤杈冨皬瀛楀彿锛宍md` 浠ヤ笂淇濇寔 90px / 120px / 28px 瀵瑰簲瑙勬牸锛?
- WE ARE SPECIAL FORCES / 鎴戜滑锛屽嵆涓虹簿閿愪箣甯堟爣璇尯锛屾爣棰樺垎涓よ宸﹀榻愬苟浣跨敤 96px 瀵瑰簲 `6rem` italic锛岃鏄庢枃妗堝彸瀵归綈涓斿垎涓夎锛屽瓧鍙蜂负 28px 瀵瑰簲 `1.75rem` medium锛涙爣棰樹笌璇存槑涓嬫柟鏈変竴鏁存潯妯悜涓嬪垝绾匡紱
- Partner 涓?Senior Associate 鍙屽垪浜虹墿鍗＄墖鍒嗗尯锛屾爣棰樹娇鐢ㄤ竴鑷寸殑 64px 瀵瑰簲 `4rem` italic uppercase 鏍煎紡锛?
- 浜虹墿鍗＄墖鏁版嵁鏉ヨ嚜 `teamInfo.md` 鐨勫鍚嶅拰鑱屼綅锛屽彧灞曠ず鑱屼綅鍜屽悕瀛楋紱涓枃鐘舵€佷娇鐢?`Chinese/teamInfo.md` 鐨?`zhName`銆乣zhTitle`锛沋uxuan Liu銆丮in Xu銆丩i Wan銆乑oe Zhang銆乄eifan Qiu 浣跨敤鏈湴 `/assets/team/team1.webp` 鍒?`/assets/team/team6.webp`锛孧engcheng Yun 浣跨敤鏇挎崲鍚庣殑 `/assets/team/team5.png`锛沗src/assets/team/*.png` 鏇挎崲鍚庝細閲嶆柊鍙戝竷鍒?`public/assets/team`锛涘浘鐗囦互缁濆瀹氫綅濉弧鐖跺厓绱犲苟绉婚櫎鐏拌壊钂欏眰锛屼繚鐣欒交寰斁澶э紱濮撳悕涓?55px 瀵瑰簲 `3.4375rem` medium锛岃亴浣嶄负 36px 瀵瑰簲 `2.25rem` extra light锛孎ind out more 涓?28px 瀵瑰簲 `1.75rem` medium锛岄粍鑹叉枃瀛楀拰榛勮壊涓嬪垝绾匡紝涓嶆樉绀烘梺渚?icon锛?
- Find out more 浣跨敤 Next `Link` 鎸夋垚鍛?slug 璺宠浆鍒板悓涓€鍥㈤槦璺敱灞傜骇涓嬬殑 `/team/[slug]`锛?
- 澶嶇敤鍏ㄧ珯瀵艰埅鍜岄〉鑴氾紱椤甸潰绾т笁瑙掑舰鑳屾櫙閫忔槑搴﹂檷涓?20%锛屽苟灏嗗洟闃熷唴瀹瑰尯鎻愬崌涓?`z-10`锛岄伩鍏嶈儗鏅笁瑙掑舰閬尅鍥㈤槦鍒楄〃鍐呭銆?

椤甸潰闇€瑕佺殑鍥㈤槦 Hero 鍥惧拰鎴愬憳鍥惧凡澶嶅埗鍒?`public/assets/team/*`锛涙棫鍘熷瀷鍥㈤槦鍥句粛淇濈暀鍦?`public/assets/prototypes/team/*` 浣滀负澶囩敤銆?

### Team Profile `/team/[slug]`

鍥㈤槦涓汉璇︽儏椤靛熀浜?`涓汉浠嬬粛璇︽儏/` 鍘熷瀷閲嶅缓锛?

- 椤甸潰鍏ュ彛涓?`src/app/team/[slug]/page.tsx`锛宍src/app/team/yuxuan-liu/page.tsx` 淇濈暀 Yuxuan Liu 鐨勫吋瀹归潤鎬佸叆鍙ｏ紝灞曠ず缁勪欢涓?`src/components/pages/TeamProfilePage.tsx`锛?
- 鍥㈤槦鍒楄〃鍜屼釜浜鸿鎯呭叡鐢?`src/data/teamProfiles.ts`锛屽寘鍚?Yuxuan Liu銆丮in Xu銆丩i Wan銆乑oe Zhang銆丮engcheng Yun銆乄eifan Qiu 鐨?slug銆佸鍚嶃€佽亴浣嶃€佸浘鐗囥€侀偖绠便€佹湇鍔¤涓氥€佹暀鑲茶儗鏅€佹墽涓氳祫鏍笺€佽瑷€銆佺ぞ浼氳亴鍔°€佹墽涓氶鍩熴€佹墽涓氱粡鍘嗐€佽崳瑾夊拰涓氱哗锛汸erformance & Achievements 鎸?`EN/teamInfo.md` 鐨勮嫳鏂囦釜浜轰笟缁╂潯鐩暣鐞嗭紝閬垮厤浣跨敤鎴柇鎴栧崰浣嶅唴瀹癸紱鑻辨枃鐘舵€佷笅 Li Wan 鐨?Social Engagements / Practice Area銆乑oe Zhang 鐨?Educational Background / Social Engagements / Practice Area / Work Experience / Awards and Recognition銆丮engcheng Yun 鐨?Practice Area / Practice Experience銆乄eifan Qiu 鐨?Practice Area / Performance & Achievements 鍧囨寜 `EN/teamInfo.md` 瀵归綈锛涗腑鏂囩姸鎬佷娇鐢?`Chinese/teamInfo.md` 涓殑 `zh` 璇︽儏瀵硅薄鍒囨崲濮撳悕銆佽亴浣嶃€佹湇鍔¤涓氥€佹暀鑲茶儗鏅€佷笓涓氳祫鏍笺€佸伐浣滆瑷€銆佺ぞ浼氫换鑱屻€佷笓涓氶鍩熴€佹墽涓氱粡楠屻€佽崳瑾夊拰涓汉涓氱哗锛涜崳瑾夋潯鐩腑浠ヤ腑鑻辨枃鍐掑彿缁撳熬鐨勫紩瀵艰鏄庢寜鏅€氭钀芥覆鏌擄紝涓嶆樉绀哄垪琛ㄥ渾鐐癸紱鏁欒偛鑳屾櫙鎸夎嫳鏂囧垎鍙?`;` 鎴栦腑鏂囧垎鍙?`锛沗 鎷嗗垎涓哄娈靛睍绀猴紝鎵т笟缁忛獙鎸夋崲琛屾媶鍒嗕负澶氭灞曠ず锛孼oe Zhang / 寮犺帀鐨勬暀鑲茶儗鏅浐瀹氭媶涓哄洓娈点€佷腑鏂囨墽涓氱粡楠屽浐瀹氭媶涓轰袱娈碉紱Social Engagements 浠呭湪瀛樺湪闈炵┖鍐呭鏃舵覆鏌擄紝Mengcheng Yun / 浜戞ⅵ鎴愪笉灞曠ず璇ュ尯鍧楋紱
- 澶嶇敤鍏ㄧ珯 `SiteHeader` 涓?`SiteFooter`锛岄《閮ㄥ鑸?active 淇濇寔 OUR TEAM锛?
- Hero 楂樺害鎸?735px 鎹㈢畻涓?`45.9375rem`锛屼娇鐢ㄥ乏涓?`#919191` 鍒板彸涓?`#5a5a5a` 瀵硅绾挎笎鍙橈紝宸︿晶浜虹墿鍥剧墖浣跨敤褰撳墠 slug 瀵瑰簲鐨?`/assets/team/1.png` 鍒?`/assets/team/6.png` 骞朵笌 title logo 鍐呭绾垮榻愶紝鍙充晶鏄剧ず褰撳墠鎴愬憳濮撳悕銆佽亴浣嶃€佷笅鍒掔嚎銆佸甫 Phone icon 鐨勭數璇濆叆鍙ｅ拰甯?Mail icon 鐨勯偖绠卞叆鍙ｏ紱濮撳悕鎸?100px 鎹㈢畻涓?`6.25rem` semibold锛岃亴浣嶆寜 40px 鎹㈢畻涓?`2.5rem` light锛?
- Hero 涓嬫柟淇濈暀缁熶竴 `SubpageBreadcrumb`锛屾樉绀?Our Team / 褰撳墠鎴愬憳濮撳悕锛屽瓧鍙蜂负 `1.5rem`锛屽垎闅旂涓?`/`锛岀埗绾у拰褰撳墠椤圭偣鍑诲潎杩斿洖涓婁竴椤垫垨鍥為€€鍒?`/team`锛?
- 淇℃伅浠嬬粛鍙婂悗缁唴瀹瑰乏鍙宠竟璺濈粺涓€涓?128px锛屽搴?`8rem`锛?
- 淇℃伅浠嬬粛灞忚儗鏅负 `#333231` 鍒?`#433e38` 鐨勭旱鍚戞笎鍙橈紝鍖呭惈 Service Industries銆丳rofessional Qualification銆丒ducational Background銆丩anguage Skills锛屽苟鍦ㄦ垚鍛樺瓨鍦ㄥ唴瀹规椂杩藉姞 Social Engagements锛汱anguage Skills 涓?Professional Qualification 鏀惧湪鍚屼竴鍒楋紝Social Engagements 瀛樺湪鏃跺崟鐙崰涓€鏁磋锛汼ervice Industries 鏍囬涓?`2rem` semibold锛屽垪琛ㄤ负 `1.5rem` light锛?
- 绗簩灞忚儗鏅负 `#171717`锛屽睍绀?Experience& capabilities锛涘乏渚т负 Practice Area 涓?Practice Experience锛屽彸渚т粎鍦ㄦ垚鍛樺瓨鍦ㄧ湡瀹?Honors 鏁版嵁鏃跺睍绀?Honors 鍜岀珫鍚戝垎闅旂嚎锛汳engcheng Yun銆乄eifan Qiu 绛夋棤 Honors 鏉＄洰鐨勬垚鍛樹笉娓叉煋璇ュ尯鍧楋紱
- 绗笁灞忚儗鏅负 `#262626`锛屽睍绀?Performance & Achievements銆佸叚寮犻粯璁や笟缁╁崱鐗囷紱View More 鎸夐挳浣嶄簬榛樿鍗＄墖涓嬫柟锛屾牱寮忓榻?About 鐨?See More锛屽苟浣跨敤 `useState`銆乣grid-rows` 鍜?opacity 杩囨浮瀹炵幇涓?About Honors 鍗＄墖涓€鑷寸殑灞曞紑/鏀惰捣鍔ㄧ敾锛涢〉闈㈠彸涓嬭浣跨敤 `BackToTop` 鎻愪緵涓嫳鏂囪繑鍥炲叆鍙ｃ€?

椤甸潰闇€瑕佺殑涓汉绠€浠嬪浘鐗囧凡澶嶅埗鍒?`public/assets/prototypes/team-profile/*`銆?

### Industries `/industries`

鏈嶅姟琛屼笟椤甸潰鍩轰簬 `鏈嶅姟琛屼笟/` 鍘熷瀷閲嶅缓锛屽寘鍚細

- 椤堕儴 Industries Hero 浣跨敤鏈湴 `/assets/industries/hero.png`锛屾爣棰樺乏瀵归綈骞舵寜 96px 鎹㈢畻涓?`6rem` medium锛屾爣棰樺湪 1920 璁捐鍩哄噯涓嬭窛绂诲睆骞曢《閮?`590px`锛屽搴?`36.875rem`锛?
- 琛屼笟鏈嶅姟璇存槑鍗＄墖绱ф帴鍦?Industries 鏍囬涓嬫柟锛岃儗鏅负 `#464646` 鍒?`#787269` 娓愬彉锛屾鏂囨寜 28px 鎹㈢畻涓?`1.75rem` regular锛屼袱涓瑙掕竟妗嗕笌鍗＄墖杈圭紭淇濈暀鍐呰窛锛?
- 琛屼笟鍗＄墖缃戞牸鎸?1 / 2鍒?/ 2 涓夋甯冨眬锛屾闈㈠乏鍙冲璺濅负 `9rem`锛涚浜屾宸︿晶涓?International Trade 澶у崱锛屽彸渚т负 Finance 涓?Real Estate 涓よ涓€鍒椾笂涓嬫帓鍒楋紱鍗＄墖鍥剧墖浣跨敤 `/assets/industries/in1.webp` 鍒?`/assets/industries/in6.webp`锛屾枃瀛椾綅浜庡乏涓嬫柟骞跺甫榛勮壊涓嬪垝绾匡紝鏍囬鎸?48px 鎹㈢畻涓?`3rem` semibold锛屾寜 Private Equity銆両nternational Trade銆丗inance銆丷eal Estate銆丼ports and E-Sports銆丆yber Tech and Game 鐨勯『搴忓睍绀哄苟淇濈暀鎸囧畾鎹㈣锛涗腑鏂囨爣棰橀殢鍗＄墖 slug 缁戝畾涓虹鍕熻偂鏉冦€佸浗闄呰锤鏄撹涓氥€侀噾铻嶃€佹埧鍦颁骇琛屼笟銆佷綋鑲插強鐢靛瓙绔炴妧琛屼笟銆佷簰鑱旂綉绉戞妧鍙婃父鎴忚涓氾紝閬垮厤澶嶇敤棣栭〉 labels 鏁扮粍閫犳垚鏂囨涓庤烦杞洰鏍囬敊浣嶏紱绗笁琛岄珮搴︿负绗竴琛岀害 1.5 鍊嶏紱
- 鍏釜琛屼笟鍗＄墖鍧囦娇鐢?Next `Link` 璺宠浆鍒?`/industries/[slug]` 璇︽儏椤碉紱
- 澶嶇敤椤佃剼銆?

椤甸潰闇€瑕佺殑鍘熷瀷鍥剧墖宸插鍒跺埌 `public/assets/prototypes/industries/*`锛涜涓氬崱鐗囧浘鐗囧凡浠?`src/assets/industries/in1.png` 鍒?`in6.png` 鍙戝竷鍒?`public/assets/industries/`銆?

### Industry Detail `/industries/[slug]`

琛屼笟璇︽儏椤甸潰鍩轰簬 `琛屼笟璇︽儏/` 鍘熷瀷閲嶅缓锛?

- 椤甸潰鍏ュ彛涓?`src/app/industries/[slug]/page.tsx`锛屽睍绀虹粍浠朵负 `src/components/pages/IndustryDetailPage.tsx`锛?
- `generateStaticParams` 鍜?`generateMetadata` 浠庢湇鍔＄瀹夊叏鐨?`src/data/industryMetadata.ts` 璇诲彇鍏釜琛屼笟 slug銆佽嫳鏂囨爣棰樺拰绠€浠嬶紝鏈煡 slug 鍥為€€鍒?Private Equity metadata锛?
- 澶嶇敤鍏ㄧ珯 `SiteHeader` 涓?`SiteFooter`锛岄《閮ㄥ鑸?active 淇濇寔 INDUSTRIES锛?
- Hero 椤堕儴浣跨敤缁熶竴 `SubpageBreadcrumb`锛屾樉绀?home / 褰撳墠琛屼笟锛堜腑鏂囦负 棣栭〉 / 褰撳墠琛屼笟锛夛紝瀛楀彿涓?`1.5rem`锛屽垎闅旂涓?`/`锛岀埗绾у拰褰撳墠椤圭偣鍑诲潎杩斿洖涓婁竴椤垫垨鍥為€€鍒?`/`锛?
- Hero 鑳屾櫙鍥剧墖浣跨敤鍒楄〃椤靛搴旇涓氬崱鐗囩殑鍚屼竴寮?WebP 鍥剧墖锛屽嵆 `/assets/industries/in1.webp` 鍒?`/assets/industries/in6.webp`锛?
- 鍐呭鍖哄弬鑰冨師鍨嬬殑宸︿晶鐣欑櫧缁撴瀯锛屼娇鐢ㄦ繁鑹插唴瀹瑰崱鐗囧拰鍦嗙偣鍒楄〃灞曠ず鏉ヨ嚜 `industriesInfo.md` 鐨勫搴旇涓氫粙缁嶄笌鏈嶅姟鑼冨洿锛涗腑鏂囩姸鎬佷笅浣跨敤 `Chinese/industriesInfo.md` 瀵瑰簲鍏釜琛屼笟鐨勬爣棰樸€佺畝浠嬪拰鏈嶅姟鑼冨洿锛涢〉闈㈠彸涓嬭浣跨敤 `BackToTop` 鎻愪緵涓嫳鏂囪繑鍥炲叆鍙ｃ€?

### Events `/events`

浜嬩欢椤甸潰鍩轰簬 `浜嬩欢/` 鍘熷瀷閲嶅缓锛屽寘鍚細

- Events 鏍囬 Hero 浣跨敤鏈湴 `/assets/event/hero.webp` 浣滀负鑳屾櫙鍥撅紝鏍囬鍜屾鏂囧眳涓斁鍦ㄥ乏鍙冲璺?`8rem`銆侀珮搴?`40svh` 鐨勬笎鍙樿儗鏅潡涓紝椤甸潰澶栧眰浠嶄繚鎸佹繁鑹茶儗鏅紱鏍囬鎸?100px 鎹㈢畻涓?`6.25rem` semibold italic锛岃鏄庢枃瀛楁寜 36px 鎹㈢畻涓?`2.25rem` regular锛?
- 浜嬩欢鏁版嵁闆嗕腑鍦?`src/data/events.ts`锛屼互 `EN/event.md` 涓殑 28 鏉′簨浠舵棩鏈熶綔涓哄鍑鸿寖鍥达紱鏁版嵁鍖呭惈 slug銆乧ategory銆乼itle銆乣YYYYMMDD` 鏃ユ湡銆乻ummary銆佹鏂囨钀姐€佷腑鏂囬暅鍍忓拰浜嬩欢鍥剧墖锛屽垪琛ㄩ〉鍜岃鎯呴〉鍏辩敤璇ユ暟鎹簮锛?
- 浜嬩欢鍗＄墖榛樿灞曠ず 9 鏉★紝鎸変竴琛屼笁涓€佷笁琛屽睍绀猴紝绗簩灞忓乏鍙冲璺濅负 `6rem`锛屾í鍚戝崱鐗囬棿璺濅负褰撳墠鐗?3 鍊嶏紝绾靛悜闂磋窛淇濇寔鍘熸潵鐨?`gap-y-16`锛屼笉鍐嶆樉绀?LATEST UPDATES 鏍囬鍜屼笅鍒掔嚎锛?
- 鍗＄墖鍥剧墖淇濇寔褰╄壊锛屼綅浜庡崱鐗囧乏涓婅锛屽苟鐩稿瀹瑰櫒鍚戝乏涓婃柟鍋忕Щ锛涗簨浠堕€愭潯缁戝畾 `/assets/event/*` 涓嬬殑鐪熷疄鍥剧墖锛涘垪琛ㄥ皬鍥炬浣跨敤 `4:3` 姣斾緥锛屽浘鐗囨湰韬娇鐢?`object-cover` 鑷€傚簲濉弧鍥炬锛屼笉棰濆鍙犲姞妯＄硦鑳屾櫙鎴栬挋灞傦紱
- 鍗＄墖鍐呭鍙繚鐣欐棩鏈熻鍜屾爣棰樿锛屾棩鏈熶笌鍥剧墖淇濇寔鑷劧闂磋窛锛屾棩鏈熸寜 24px 鎹㈢畻涓?`1.5rem` regular锛屾棩鏈熻鍙充晶鏄剧ず榛勮壊绠ご锛屾爣棰樹腑 `Tiger Dynamics` 涓?`#D1CECA`銆?0px 瀵瑰簲 `1.875rem`銆乶ormal italic锛屽垎闅旂嚎鍚庢鏂囦负 `1.875rem` medium锛屽彸涓嬭娴呰壊涓夎褰㈤珮搴︿负 `6%`锛?
- 鍗＄墖浣跨敤 Next `Link` 璺宠浆鍒?`/events/[slug]` 浜嬩欢璇︽儏椤碉紱
- See More 浣跨敤涓?About Culture 鐨?READ FULL MANIFESTO 涓€鑷寸殑閲戣壊鎻忚竟/瀹炲簳鎸夐挳鍜岀澶?hover 骞崇Щ鍔ㄦ晥锛岀偣鍑诲悗灞曞紑鍏ㄩ儴 42 鏉′簨浠跺苟鍙敹璧凤紱
- 澶嶇敤椤佃剼銆?

椤甸潰闇€瑕佺殑浜嬩欢鍗＄墖鍥惧凡澶嶅埗鍒?`public/assets/prototypes/events/card.png`锛涘綋鍓?Events 鍒楄〃鐪熷疄鍥剧墖宸蹭粠 `src/assets/event/event1-42` 鍚屾鍙戝竷鍒?`public/assets/event/`銆?

### Event Detail `/events/[slug]`

浜嬩欢璇︽儏椤甸潰鍩轰簬 `浜嬩欢璇︽儏/` 鍘熷瀷閲嶅缓锛?

- 椤甸潰鍏ュ彛涓?`src/app/events/[slug]/page.tsx`锛屽睍绀虹粍浠朵负 `src/components/pages/EventDetailPage.tsx`锛?
- `generateStaticParams` 浠?`src/data/events.ts` 涓哄叏閮ㄤ簨浠剁敓鎴愰潤鎬佸弬鏁帮紱
- 澶嶇敤鍏ㄧ珯 `SiteHeader` 涓?`SiteFooter`锛岄《閮ㄥ鑸?active 淇濇寔 EVENTS锛?
- 椤堕儴鍖呭惈缁熶竴 `SubpageBreadcrumb`锛屾樉绀?Events / 褰撳墠浜嬩欢锛屽瓧鍙蜂负 `1.5rem`锛屽垎闅旂涓?`/`锛岀偣鍑昏繑鍥炰笂涓€椤垫垨鍥為€€鍒?`/events`锛涗簨浠舵爣棰樻寜 64px 鎹㈢畻涓?`4rem` semibold锛屾棩鏈熸寜 28px 鎹㈢畻涓?`1.75rem` regular锛?
- 姝ｆ枃鍖哄厛灞曠ず褰撳墠浜嬩欢 summary锛屽啀缁х画娓叉煋鐪熷疄姝ｆ枃娈佃惤锛涜嫳鏂囩姸鎬佹樉绀?`EN/event.md` 涓凡鏈夋鏂囨垨琛ュ厖鑻辨枃鎽樿锛屼腑鏂囩姸鎬佹樉绀?`Chinese/event.md` 瀵瑰簲姝ｆ枃锛涙覆鏌撴椂浼氳瘑鍒?`[鍥剧墖]` / `[Image]` 鍗犱綅骞舵寜 `detailImages` 鎻掑叆姝ｆ枃鍥剧墖锛岃瘑鍒€滄殏鏃舵棤娉曞湪椋炰功鏂囨。澶栧睍绀烘鍐呭鈥濆崰浣嶅苟鎸?`detailVideos` 鍦ㄥ搴斾綅缃彃鍏ュ師鐢?`video` 鎾斁鍣紝鏃犲搴斿獟浣撴椂娓呯悊鍗犱綅鏂囨湰锛涙鏂囧唴瀹瑰崰婊?`max-w-[108rem]` 鐖跺鍣紝涓嶅啀淇濈暀鍙充晶灏侀潰鍥惧垪锛涙鏂囨彃鍥惧拰瑙嗛妗岄潰瀹藉害涓虹埗瀹瑰櫒 70%锛岀Щ鍔ㄧ涓嶈秴鍑哄鍣紱涓昏鏄庢寜 24px 鎹㈢畻涓?`1.5rem` light italic锛涢〉闈㈠彸涓嬭浣跨敤 `BackToTop` 鎻愪緵涓嫳鏂囪繑鍥炲叆鍙ｃ€?

椤甸潰闇€瑕佺殑浜嬩欢璇︽儏鍥剧墖宸插鍒跺埌 `public/assets/prototypes/event-detail/*`銆?

### Contact `/contact`

鑱旂郴鎴戜滑椤甸潰鍩轰簬 `鑱旂郴鎴戜滑/` 鍘熷瀷閲嶅缓锛屽寘鍚細

- Contact 鏍囬鍖轰娇鐢ㄦ湰鍦?`/assets/contact/hero.webp` 浣滀负椤堕儴鑳屾櫙鍥撅紱鏍囬鎸?96px 鎹㈢畻涓?`6rem` medium italic锛屾鏂囨寜 36px 鎹㈢畻涓?`2.25rem` light锛涗腑鏂囪仈绯昏鏄庝娇鐢ㄢ€滃鎮ㄦ湁浠讳綍娉曞緥鐤戦棶鎴栦簤璁紝娆㈣繋闅忔椂涓庢垜浠仈绯汇€傛垜浠瘹鎸氭湡寰呬负鎮ㄦ彁渚涗笓涓氱殑娉曞緥鏈嶅姟锛岃嚧鍔涗簬缁存姢鎮ㄧ殑鍚堟硶鏉冪泭銆傗€濓紱
- Hero 涓嬫柟 Contact us 鍙屾爮妯″潡锛屽乏渚ц儗鏅负 `#A1865F`銆侀粦鑹叉爣棰樸€侀粦鑹叉鏂囥€侀粦鑹茬數璇?閭鍜屽浘鏍囷紝鍙充晶涓哄煄甯傚浘鐗囷紱Contact us 鏍囬鎸?52px 鎹㈢畻涓?`3.25rem` semibold锛岃鏄庢鏂囨寜 28px 鎹㈢畻涓?`1.75rem` italic锛岀數璇濆拰閭鍧囦负 `1.75rem` regular锛岄偖绠辨樉绀轰笅鍒掔嚎锛?
- Join Us 鎷涜仒璇存槑锛學elcome / To / Join Us 鎸?90px 鎹㈢畻涓?`5.625rem` light italic锛屽彸渚ф嫑鑱樿鏄庢寜 28px 鎹㈢畻涓?`1.75rem` regular锛?
- 鍊欓€変汉瑕佹眰鍗＄墖锛屽崱鐗囬《閮ㄤ娇鐢ㄩ噾鑹蹭笅鍒掔嚎鏇夸唬鏁板瓧缂栧彿锛屼笅鍒掔嚎椤堕儴闂磋窛鍔犲ぇ涓旈珮搴︿负褰撳墠鐗堜笁鍊嶏紱鍙充晶涓夎褰㈠眰绾ч珮浜庡崱鐗囪儗鏅€佷綆浜庡崱鐗囧唴瀹癸紝鍥犳瑕嗙洊鍗＄墖鑳屾櫙浣嗕笉閬尅鏂囧瓧鍜屼笅鍒掔嚎锛涘崱鐗囪儗鏅负娣辫壊鏆栫伆娓愬彉锛屾鏂囦负 `1.75rem` semibold锛?
- 绠€鍘嗛偖绠辨彁绀猴紝鍐呭鍙冲榻愶紝鎻愮ず鏂囧瓧鎸?32px 鎹㈢畻涓?`2rem` light italic锛岄偖绠变负 `2rem` regular 涓斾娇鐢?`#D9B27A`锛?
- 鑱旂郴淇℃伅椤佃剼銆?

Contact 椤靛父瑙勫唴瀹瑰尯浣跨敤椤甸潰鍐?`contactShell`锛屾闈㈠乏杈硅窛涓?`9rem`锛屽彸渚т粛娌跨敤鍏ㄧ珯鍐呭绾匡紱Hero 涓嬫柟 Contact us 鍙屾爮妯″潡涓哄叏瀹界粨鏋勶紝宸︿晶鍐呭鍚屾牱浣跨敤 `9rem` 宸﹁竟璺濄€?
Join Us銆佸€欓€変汉鍗＄墖鍜岀畝鍘嗛偖绠卞尯鍩熷寘瑁瑰湪鍚屼竴涓浉瀵瑰鍣ㄥ唴锛屽彸渚у彔鍔?`#1d1d1d` 鐩磋涓夎褰㈣儗鏅紱璇ュ鍣ㄩ€氳繃 `pb-20 -mb-20` 鎶垫秷 Footer 鑷甫椤堕儴澶栬竟璺濓紝浣挎枩杈逛粠 Contact us 鍥剧墖鍙充笅鏂瑰欢浼稿埌 Footer 椤堕儴涓棿銆?

椤甸潰闇€瑕佺殑椤堕儴 Hero 鍥惧凡澶嶅埗鍒?`public/assets/contact/hero.png`锛涘煄甯傚浘銆乴ogo銆佷簩缁寸爜宸插鍒跺埌 `public/assets/prototypes/contact/*`銆?

## 閰嶇疆

`next.config.ts`锛?

- `output: "standalone"`锛?
- 璇诲彇 `NEXT_SNAPSHOT_BASE_PATH` 閰嶇疆 `basePath`銆乣assetPrefix`銆乣trailingSlash`銆?
- 璇诲彇 `NEXT_PUBLIC_ASSET_BASE_URL` 骞舵敞鍏ュ鎴风锛岀敓浜ф瀯寤烘椂鍙皢 `/assets/*` 鍜?`/font/*` 鍒囨崲鍒?OSS銆?

`tsconfig.json`锛?

- `strict: true`锛?
- `allowJs: false`锛?
- 鎺掗櫎鍘熷瀷鐩綍锛歚棣栭〉`銆乣about 椤礰銆乣浜嬩欢`銆乣浜嬩欢 copy`銆乣鏈嶅姟琛屼笟`銆乣鑱旂郴鎴戜滑`銆乣瀹樼綉棣栭〉璁捐`銆乣鎴戠殑鍥㈤槦`銆乣core value`銆乣涓汉浠嬬粛璇︽儏`銆乣浜嬩欢璇︽儏`銆乣琛屼笟璇︽儏`锛屽苟鎺掗櫎鏍圭洰褰曞弬鑰冩枃浠?`EventLandingPage.tsx` 鍜岀嫭绔?`cms` 宸ヤ綔鍖猴紝閬垮厤鏃?Vite/CMS 鍘熷瀷渚濊禆鍙備笌褰撳墠 Next 涓诲簲鐢ㄧ被鍨嬫鏌ャ€?

`src/app/globals.css`锛?

- `body` 浣跨敤 `var(--font-poppins), Arial, Helvetica, sans-serif`锛屽叾涓?`--font-poppins` 鐢?`src/app/layout.tsx` 娉ㄥ叆鐨?`@font-face` 璁剧疆涓?Poppins锛?
- `html` 涓?`body` 璁剧疆 `touch-action: pan-x pan-y`锛岄厤鍚堝鎴风缂╂斁閿侀檺鍒剁Щ鍔ㄧ pinch/double-tap 绛夋祻瑙堝櫒缂╂斁鎵嬪娍锛?
- 瀹氫箟 `client-logo-scroll` keyframes锛?
- `.client-logo-track` 浣跨敤 `animation: client-logo-scroll 103.85s linear infinite` 鍜?`will-change: transform` 淇濇寔 Clients Logo 澧欐寔缁粴鍔紝绗簩琛岄€氳繃 `.client-logo-track-reverse` 鍙嶅悜婊氬姩锛?
- `prefers-reduced-motion` 浠呭叧闂?`html` 鐨勫钩婊戞粴鍔紝涓嶅啀鍏ㄥ眬瑕嗙洊 `animation-duration`銆乣animation-iteration-count` 鍜?`transition-duration`锛岄伩鍏嶇郴缁熷噺灏戝姩鎬佹晥鏋滆缃鑷?See More銆佸浘鐗?hover銆丆lients Logo 绛夐〉闈㈠姩鏁堝叏閮ㄧ灛闂村畬鎴愭垨鍋滄銆?

`src/app/layout.tsx`锛?

- 閫氳繃 `assetUrl("/font/poppins.ttf")` 鐢熸垚瀛椾綋鍦板潃锛屽苟浠ュ唴鑱?`@font-face` 娉ㄥ叆椤甸潰锛涙湰鍦拌鍙?`public/font/poppins.ttf`锛岀敓浜у彲璇诲彇 OSS 瀛椾綋锛?
- `viewport` metadata 杈撳嚭 `width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover`锛屼綔涓虹鐢ㄦ祻瑙堝櫒缂╂斁鐨勯灞傝鍒欙紱
- 閫氳繃 `ViewportZoomLock` 鍦ㄥ鎴风鎸佺画鍚屾 viewport meta锛屾嫤鎴?iOS gesture銆佸鐐硅Е鎺с€佸弻鍑汇€丆trl/Command + 婊氳疆鍜?Ctrl/Command + `+/-/0` 绛夊父瑙佺缉鏀惧叆鍙ｏ紱
- 閫氳繃 `AppProviders` 鎸傝浇鍏ㄧ珯璇█涓婁笅鏂囥€?

## 鍝嶅簲寮忎笌澶у睆缂╂斁

`src/styles/tokens.css` 瀹氫箟鍏ㄥ眬鍝嶅簲寮?token锛屽苟浣跨敤 `--root-font-size` 鎺у埗澶у睆 rem 缂╂斁锛?

  - rem 浠?`1920px` 璁捐绋夸负鍩哄噯锛宍1920px` 鏃?`1rem = 16px`锛?
  - `1440px` 鏃舵寜姣斾緥缂╂斁涓?`1rem = 12px`锛?
  - `--root-font-size: clamp(12px, calc(100vw / 120), 16px)`锛?
  - 瓒呭灞忔渶澶氫繚鎸?`16px`锛岄伩鍏?2K / 4K 灞忔棤闄愭斁澶э紱
- `--shell-sm` 鍜?`--shell-md` 鍦?`90rem` 浠ヤ笂缁熶竴涓?`12rem`锛屽洜姝ゅ叏绔?title 瀵艰埅鍜?`.site-shell` 鍐呭澹冲眰妗岄潰宸﹀彸杈硅窛涓€鑷达紱
- `html` 鍦?`src/app/globals.css` 涓€氳繃 `font-size: var(--root-font-size)` 鎺ュ叆璇ョ瓥鐣ャ€?

椤甸潰澹冲眰銆佹爣棰樸€佹鏂囥€佹寜閽€佸崱鐗囬棿璺濈瓑浼樺厛浣跨敤 rem / token / Tailwind rem 绫伙紱鍥剧墖銆佸叏灞忛珮搴﹀拰缃戞牸浠嶆寜璇箟浣跨敤 `svh`銆佺櫨鍒嗘瘮銆佸楂樻瘮鍜?`max-width`銆?

## 鐜鍙橀噺

| 鍙橀噺 | 鐢ㄩ€?| 榛樿 |
| :--- | :--- | :--- |
| `NEXT_SNAPSHOT_BASE_PATH` | 瀛愯矾寰勯儴缃叉椂璁剧疆 Next basePath 鍜岄潤鎬佽祫婧愬墠缂€ | 绌哄瓧绗︿覆 |
| `NEXT_PUBLIC_BASE_PATH` | 鐢?`next.config.ts` 浠?`NEXT_SNAPSHOT_BASE_PATH` 娉ㄥ叆瀹㈡埛绔紝渚?`ImageWithFallback` 涓?`/assets/*` 鑷姩琛ュ瓙璺緞鍓嶇紑 | 璺熼殢 `NEXT_SNAPSHOT_BASE_PATH` |
| `NEXT_PUBLIC_ASSET_BASE_URL` | 鐢熶骇闈欐€佽祫婧?CDN/OSS 鍓嶇紑锛涢厤缃悗 `assetUrl()` 浼氭妸 `/assets/*` 鍜?`/font/*` 鎸囧悜璇ュ墠缂€ | `.env.production` 涓负 `https://husu2.oss-cn-beijing.aliyuncs.com/husuweb` |

褰撳墠棣栫増鍏紑椤垫病鏈?CMS銆佹暟鎹簱鎴栧悗鍙扮櫥褰曠幆澧冨彉閲忥紱OSS AccessKey 涓嶅啓鍏ラ」鐩幆澧冩枃浠讹紝涓婁紶瀹屾垚鍚庡墠绔彧闇€瑕佸叕寮€璧勬簮鍩熷悕銆?

## CMS 上传策略

`src/app/api/cms/assets/route.ts` 的素材上传流程会先写入 `public/uploads`，再尝试同步到 OSS。为了支持本地开发和未配置 OSS AccessKey 的测试环境，上传接口在检测到 `OSS credentials are not configured.` 时不再回滚本地文件，而是返回成功并附带 warning；只有 OSS 已配置但远程 PUT/DELETE 失败时才返回 `502`。

删除素材时同样兼容未配置 OSS 的本地环境：本地文件与数据库记录会正常删除，不再因为缺少 OSS 凭证阻断 CMS 文件管理。

CMS 文件管理采用分页懒加载：`/api/cms/assets` 支持 `limit` 与 `offset` 返回上传素材页、分页信息和 dashboard 指标，`getCmsBootstrapData` 只注入首屏上传素材；`/api/cms/official-assets` 支持 `limit`、`offset`、`category`、`search`，按页返回 `public/assets` 与 `public/uploads` 生成的 OSS 资源列表。`CmsStudio` 文件管理面板默认加载 40 条，分类/搜索会重新请求第一页，点击“加载更多”继续追加，避免一次性把大量文件放入 CMS 页面状态和渲染树。

CMS 可视化编辑中的虎诉动态列表支持条目置顶、按 `YYYYMMDD` 排序日期升降序重排，并在保存时把动态列表的 `sortDate`、`displayDate` 同步到真实官网 CMS 状态。可视化预览和抽屉图片缩略图通过 `resolvePublicAssetUrl(s)` 解析 `/uploads`、`/assets` 等相对路径，预览请求会指向 `NEXT_PUBLIC_CMS_ASSET_BASE_URL` 对应的 OSS 公网地址。

虎诉动态的 `event.list` 和 `event.detailPages` 合并逻辑以 `id/slug` 作为稳定键，不再按数组下标给新增动态补默认事件字段；可视化编辑同步中英文动态、移动和删除列表项时同样按 slug 对齐，避免新增 event 子页面、CMS 可视化内容、版本预览和线上页面互相串字段。

虎诉动态详情页右侧抽屉生成的 `detailImageN`/`detailVideoN` 字段会在读取旧 `detailImages`/`detailVideos` 列表和当前字段值时统一调用 `resolvePublicAssetUrl`，测试站即使本地 `/uploads` 静态路径缺失，也会在预览和缩略图中加载 OSS 公网地址。

虎诉动态详情页的 metadata 会从当前公开 CMS 状态读取同 slug 的详情页、列表项和 override 标题/摘要，新增动态发布后浏览器标题随推文名称变化；`/events/[slug]` 改为动态渲染，避免构建期预生成旧 event metadata。动态详情图支持 `detailImageWidthN` 和 `detailImageWidths` 字段，留空默认按 70% 宽度显示，可在内容管理或可视化抽屉中填写 10-100 的屏幕宽度比例；内容管理和可视化抽屉里的每个详情照片地址输入框下方会直接显示宽度比例输入框和注释说明，可视化抽屉不再单独显示底层 `Detail image widths` 存储字段。动态详情视频新增规则使用 `[VIDEO]` 占位符生成 `Detail video N` 字段，旧飞书占位文字仅保留兼容识别；CMS 中存在详情图片/视频字段时即使为空也会覆盖静态默认媒体，预览合成和前台本地化均尊重空数组覆盖，空图片/视频不会渲染占位媒体元素。

新增虎诉动态详情页日期以 CMS `displayDate` 为显示优先级，缺失时使用同 slug 的列表/详情 `sortDate` 格式化；`OfficialCmsEventOverride.sortDate` 会覆盖静态事件底稿的 `date`，避免自定义 event 继续继承静态最新动态日期。前台会把 `YYYYMMDD` 展示日期归一化为当前语言的可读日期，新建动态时也会默认写入格式化后的展示日期。

版本发布/恢复写入正式站公开 CMS 状态时，会强制用该版本的 `pageContent` 覆盖 `officialSiteState.previewPageContent`，与版本预览的读取规则保持一致，避免发布后正式站继续读取 payload 中旧的可视化子页面副本。

CMS 文件管理和可视化抽屉上传成功后会在后台消息中直接显示最新 OSS 公网地址；字段内部仍保存 `/uploads/...` 相对路径，由预览和公开接口统一转换，避免数据与具体资源域名强绑定。

OSS 图片地址统一以 `NEXT_PUBLIC_ASSET_BASE_URL` 为准，例如 `https://husu2.oss-cn-beijing.aliyuncs.com/husuweb`。`resolvePublicAssetUrl(s)` 优先读取该变量，CMS 上传到 OSS 时会从同一变量解析公开路径前缀，把 `/uploads/...` 写入 OSS 的 `husuweb/uploads/...` 对象 key，保证后台提示、可视化预览和公开页面使用同一资源前缀。

本地开发的 `.env.local` 同样需要配置 `NEXT_PUBLIC_ASSET_BASE_URL=https://husu2.oss-cn-beijing.aliyuncs.com/husuweb`，Next dev server 重启后客户端图片、视频和 CMS 预览才会加载同一 OSS 前缀。

CMS 文件管理面板不再单独渲染“最近上传文件”卡片区；上传后的 `/uploads` 素材会并入下方 `OfficialAssetBrowser`，统一按页面分类展示并生成完整 `/husuweb` OSS 地址。

CMS 文件管理上传素材按页面分组分页：`/api/cms/assets` 支持 `page` 参数，数据库按 `url_path` 前缀过滤后继续使用 `created_at DESC, id DESC` 排序；前端页面顺序固定为首页、关于我们、虎诉团队、服务行业、虎诉动态、联系我们、虎诉文化、Footer、Title，上传会写入当前选中的页面语义目录（如 `uploads/team`、`uploads/industries`），旧的 `uploads/podcast`、`uploads/media` 会继续归入对应页面。文件管理面板使用局部 CSS 将文字尺寸放大约 1.3 倍。

OSS 静态资源浏览同样使用页面语义分类：`/api/cms/official-assets` 将 `public/assets` 与 `public/uploads` 一级目录映射为首页、关于我们、虎诉团队、服务行业、虎诉动态、联系我们、虎诉文化、Footer、Title 和其他，并按固定顺序返回 `{ id, label }` 分类列表；前端分类按钮展示中文标签，资源卡片同时显示中文分类和原始目录名，上传成功后会触发 OSS 分类列表刷新。

CMS 文件管理复制 OSS 地址使用 Clipboard API 与隐藏 textarea fallback 两条路径，兼容非 HTTPS 测试地址；可视化预览在 iframe 内通过 `PreviewLanguageSync` 强制同步当前语言，语言切换会立即刷新预览快照。`LanguageProvider` 的 `initialLanguage` 只在外部初始语言变化时同步，不再阻止预览内部 CN/EN 按钮切换；版本预览页使用页面 Header 自带语言按钮切换。Header/Footer 的 logo、官网图片和图标字段支持直接上传到 `title` 或 `footer` 上传目录并写回字段。

CMS 左侧全局版本选择器不再提供“未选择版本”空项；默认显示并加载当前已发布版本。只有在“版本发布”面板里选择编辑其他版本、创建版本或发布/恢复版本时，当前编辑版本才会切换到对应版本；若系统没有已发布版本，则退回第一条版本作为明确编辑上下文。

本地 CMS 版本数据中，“稳定”版本的服务行业内容可按版本 payload 精确同步：以“测试”版本的 `officialSiteState.lists.industries`、`pageContent.media`、`pageContent.home.industries` 和 `officialSiteState.previewPageContent` 对应服务行业字段替换，不改变版本名、描述、发布状态和其他页面内容。稳定版服务行业当前来源是 `data/cms.db` 的版本 payload：`officialSiteState.lists.industries` 是服务行业列表、删除和背景图的权威来源，`pageContent.home.industries`、`pageContent.media.cards` 和 `pageContent.media.detailPages` 是可视化/前台投影。服务行业内容管理中的 `img` 会同步覆盖首页卡片和详情页图片；加载版本、保存版本和后端入库时都优先保留 officialState 的图片与 slug 列表，避免旧 pageContent 反向覆盖用户替换的图片地址或把已删除行业补回来。

官网内容管理（首页轮播、HONORS、服务行业、虎诉荣誉、大事记、团队和虎诉动态）保存时必须处于版本编辑状态：内容先写入版本 payload，不再直接写入当前 `data/cms-site.json`。如果编辑的是已发布版本，提交后该版本会自动转为未发布草稿，前台保持原内容，必须在“版本发布”中再次点击发布才会同步到当前站点。虎诉大事记内容管理支持年份级排序，并在年份内为单条事件提供置顶、上移、下移和删除操作；可视化大事记抽屉同样提供年份内置顶、上移、下移，事件同步到正式 CMS 时保留手动顺序，不再按月份强制重排。

CMS 可视化抽屉和页面内容重复项列表只在显示层重编号系统自动生成的尾号标题：当 `title/name/label` 仍等于新增时的自动 `label` 且以数字结尾时，移动或置顶后按当前行号显示，用户手动输入的真实标题不被改写。

文件管理统计卡片中“真实图片数 / 真实视频数 / 真实文件空间”来自 `/api/cms/official-assets` 对 `public/assets` 与 `public/uploads` 的扫描汇总；“当前页上传记录”仍来自 `assets` 数据库按页面前缀过滤后的记录数，用于区分数据库上传记录和真实文件系统素材数。

可视化编辑预览刷新采用 500ms 防抖：Puck 数据和右侧字段状态会正常记录，但 `OfficialPublicCmsProvider` 的 remount key 只在内容停止变化 500ms 后更新，避免每次输入都触发整页预览刷新。预览数据本身也使用 `debouncedPreviewData` 快照，右侧字段输入期间会跳过对 Puck 的即时 `setData` 派发。右侧和抽屉内文本输入统一通过 `BufferedTextControl` 本地缓冲，停止输入约 250ms 或失焦后才写回 CMS 大状态，避免删除文字时频繁重建 Puck 配置和 iframe。可视化同步 About 大事记时会从年份字段、条目 id、标题、月份或正文中自动识别年份，年份整体仍按年份降序输出到真实官网 CMS 状态，同一年内事件保留抽屉手动顺序；当 pageContent 已提供某年份事件时，以 pageContent 为该年份权威来源，不再按月份/正文内容把上一帧 officialState 旧事件追加回来，避免输入月份时每个字母都生成重复事件；大事记抽屉编辑列表也按当前保存顺序分组展示。

About 大事记前台事件正文使用 `whitespace-pre-line` 渲染，CMS 文本域中输入的换行会在页面上保留。

## 閮ㄧ讲

褰撳墠 offweb 鐜浣跨敤 Next.js standalone 杩愯鍖呴儴缃诧細

- 鍏綉鍦板潃锛歚http://8.140.238.44/offweb/`锛?
- 鏋勫缓鍓嶈缃細`NEXT_SNAPSHOT_BASE_PATH=/offweb`銆乣NEXT_TELEMETRY_DISABLED=1`锛?
- 鏈湴鍙戝竷鍖咃細`dist/offweb-standalone.tgz`锛?
- 鏈嶅姟鍣ㄧ洰褰曪細`/opt/husuweb-offweb/current` 鎸囧悜 `/opt/husuweb-offweb/releases/*` 鐗堟湰鐩綍锛?
- systemd 鏈嶅姟锛歚husuweb-offweb.service`锛?
- 搴旂敤鐩戝惉锛歚127.0.0.1:3003`锛?
- Nginx 鍏ュ彛锛歚location /offweb/` 鍙嶅悜浠ｇ悊鍒?`http://127.0.0.1:3003/offweb/`銆?
- public 闈欐€佸浘鐗囩粺涓€閫氳繃 `ImageWithFallback` 杈撳嚭锛岄椤佃棰戝拰瀛椾綋閫氳繃 `assetUrl()` 杈撳嚭锛涘綋閰嶇疆 `NEXT_PUBLIC_ASSET_BASE_URL` 鏃惰祫婧愯姹備細璧?OSS锛屾湭閰嶇疆鏃惰嫢 `NEXT_PUBLIC_BASE_PATH=/offweb`锛岀粍浠朵細鎶?`/assets/...` 鍜?`/font/...` 杞崲涓?`/offweb/assets/...`銆乣/offweb/font/...`锛岄伩鍏嶅瓙璺緞閮ㄧ讲涓嬮潤鎬佽祫婧愯姹傝惤鍒板煙鍚嶆牴璺緞銆?
- 瀛愯矾寰勫唴閮ㄨ烦杞粺涓€浣跨敤 Next `Link`锛屼緥濡?About Culture 鐨?Core Value 鍏ュ彛杈撳嚭涓?`/offweb/about/core-value/`锛涜嚜瀹氫箟 404 椤甸潰 `src/app/not-found.tsx` 鐨?Return Home 杈撳嚭涓?`/offweb/`銆?
- `next.config.ts` 閰嶇疆鏃ц瑷€鍓嶇紑鍏煎 redirect锛歚/zh`銆乣/en` 涓存椂璺宠浆鍒?`/`锛宍/zh/:path*`銆乣/en/:path*` 涓存椂璺宠浆鍒板搴旂殑鏃犺瑷€鍓嶇紑璺緞锛岄伩鍏嶆棫绔欓粯璁ゅ叆鍙?`https://www.tigerpartners.cn/zh`銆乣/en` 璁块棶 404锛涙棫 URL 涓婄殑 `#...` fragment 鐢辨祻瑙堝櫒鍦ㄨ烦杞悗淇濈暀銆?

褰撳墠鏍硅矾寰勭幆澧冧娇鐢ㄥ悓涓€濂?Next.js standalone 杩愯鍖呴儴缃诧細

- 鏈嶅姟鍣?IP锛歚39.106.226.65`锛屾寮忚闂叆鍙ｄ娇鐢ㄧ粦瀹氬煙鍚嶏紱
- 姝ｅ紡鍩熷悕锛歚https://www.tigerpartners.cn/`锛宍www.tigerpartners.cn` 鐨?A 璁板綍鎸囧悜 `39.106.226.65`锛?
- 瑁稿煙 `tigerpartners.cn` 褰撳墠浠嶇敱闃块噷浜?URL 杞彂鍏ュ彛瑙ｆ瀽鍒?`203.107.45.167`锛屽苟 302 璺宠浆鍒?`https://www.tigerpartners.cn`锛?
- 鏋勫缓鍓嶈缃細`NEXT_SNAPSHOT_BASE_PATH=`銆乣NEXT_PUBLIC_ASSET_BASE_URL=`銆乣NEXT_TELEMETRY_DISABLED=1`锛?
- 鏈湴鍙戝竷鍖咃細`dist/tigerpartners-root-latest.tgz`锛?
- 鏈嶅姟鍣ㄧ洰褰曪細`/opt/tigerpartners-web/current` 鎸囧悜 `/opt/tigerpartners-web/releases/20260515-0122`锛?
- systemd 鏈嶅姟锛歚tigerpartners-web.service`锛?
- 搴旂敤鐩戝惉锛歚127.0.0.1:3004`锛?
- Nginx 鍏ュ彛锛歚server_name www.tigerpartners.cn`锛?0/443 鐩戝惉锛宍location /` 鍙嶅悜浠ｇ悊鍒?`http://127.0.0.1:3004`锛?
- HTTPS 璇佷功鐢?Certbot / Let's Encrypt 绛惧彂锛岃瘉涔﹁矾寰勪负 `/etc/letsencrypt/live/www.tigerpartners.cn/fullchain.pem`锛孒TTP 鑷姩璺宠浆 HTTPS锛孋ertbot timer 璐熻矗鑷姩缁湡锛?
- 鏍硅矾寰勬瀯寤轰笉閰嶇疆 OSS 璧勬簮鍓嶇紑锛屽浘鐗囥€佽棰戝拰瀛椾綋闅忓彂甯冨寘鍐?`public` 鐩綍鐩存帴鐢?Next 鏈嶅姟鎻愪緵銆?

## 瀹夎涓庢瀯寤虹姸鎬?

褰撳墠浼氳瘽宸蹭娇鐢ㄧ幇鏈?`node_modules` 鎵ц杩?`npm run build` 骞堕€氳繃锛?

- Next.js 缂栬瘧鎴愬姛锛?
- TypeScript 妫€鏌ユ垚鍔燂紱
- 闈欐€侀〉闈㈢敓鎴愭垚鍔燂紝鍖呭惈 `/`銆乣/about`銆乣/industries`銆乣/events`銆乣/contact`銆?

鏈 offweb 鍙戝竷鍓嶅凡鍋滄鏈湴 `next dev` 杩涚▼锛屼娇鐢?`NEXT_SNAPSHOT_BASE_PATH=/offweb` 閲嶆柊鎵ц `npm run build`锛屾暣鐞?`.next/standalone`銆乣.next/static` 鍜?`public` 鍒?`dist/offweb`锛屽苟鐢熸垚 `dist/offweb-standalone.tgz`銆傛湇鍔″櫒绔凡楠岃瘉 `husuweb-offweb.service` 涓?`active`锛宍http://8.140.238.44/offweb/` 杩斿洖 `200 OK`銆?

2026-05-12 宸叉寜鏍硅矾寰勯噸鏂版墽琛?`npm run build`锛屾暣鐞?`.next/standalone`銆乣.next/static` 鍜?`public` 鍒?`dist/root`锛岀敓鎴?`dist/root-standalone.tgz`锛屼笂浼犲埌 `39.106.226.65:/opt/tigerpartners-web/tigerpartners-root-20260512-0136.tgz`锛岃В鍘嬪埌 `/opt/tigerpartners-web/releases/20260512-0136`锛屽苟鍒囨崲 `current` 鍚庨噸鍚?`tigerpartners-web.service`銆傛湇鍔″櫒鏈満 `http://127.0.0.1:3004/` 鍜屽叕缃?`https://www.tigerpartners.cn/` 鍧囪繑鍥?`200 OK`銆?
闅忓悗宸插皢 Nginx `server_name` 璋冩暣涓?`www.tigerpartners.cn`锛屼娇鐢?Certbot 绛惧彂 Let's Encrypt 璇佷功骞跺惎鐢?HTTP 鍒?HTTPS 璺宠浆锛涘叕缃戦獙璇?`https://www.tigerpartners.cn/`銆乣/about`銆乣/events` 鍜岄潤鎬佽祫婧愬潎杩斿洖 `200 OK`锛宍http://www.tigerpartners.cn/` 杩斿洖 `301` 鍒?HTTPS锛岃８鍩?`http://tigerpartners.cn/` 缁忛樋閲屼簯 URL 杞彂杩斿洖 `302` 鍒?HTTPS www 鍩熷悕銆?

2026-05-13 宸叉寜鏍硅矾寰勯噸鏂版墽琛?`npm run build`锛屾暣鐞?`.next/standalone`銆乣.next/static` 鍜?`public` 鍒?`dist/root`锛岀敓鎴?`dist/tigerpartners-root-latest.tgz`锛屼笂浼犲埌 `39.106.226.65:/opt/tigerpartners-web/tigerpartners-root-20260513-0028.tgz`锛岃В鍘嬪埌 `/opt/tigerpartners-web/releases/20260513-0028`锛屽苟鍒囨崲 `current` 鍚庨噸鍚?`tigerpartners-web.service`銆傛湇鍔″櫒鏈満 `http://127.0.0.1:3004/` 杩斿洖 `200 OK`锛屽叕缃戦獙璇?`https://www.tigerpartners.cn/`銆乣/about`銆乣/events`銆乣/team` 鍧囪繑鍥?`200 OK`锛宍/zh` 鍜?`/en` 杩斿洖涓存椂璺宠浆銆?

2026-05-13 宸插啀娆℃墽琛屾牴璺緞鏋勫缓涓庡彂甯冿紝鍏堝皢 `public/assets/about` 鍏ㄩ噺鍚屾鍒?OSS 骞跺畬鎴愬洖婧?SHA256 鏍￠獙锛屽啀鐢熸垚 `dist/tigerpartners-root-latest.tgz`锛屼笂浼犲埌 `39.106.226.65:/opt/tigerpartners-web/tigerpartners-root-20260513-0058.tgz`锛岃В鍘嬪埌 `/opt/tigerpartners-web/releases/20260513-0058`锛屽垏鎹?`current` 鍚庨噸鍚?`tigerpartners-web.service`銆傚叕缃戦獙璇?`https://www.tigerpartners.cn/`銆乣/about`銆乣/events`銆乣/team` 鍜?`/events/cietac-cup-voice-of-moot-diamond-sponsor` 鍧囪繑鍥?`200 OK`锛汷SS 涓?About Hero銆丄bout bg 鍜屾棫 Events 璇︽儏鍥惧潎杩斿洖 `200 OK`銆?

2026-05-15 宸叉墽琛屾牴璺緞鏋勫缓涓庡彂甯冿紝鐢熸垚 `dist/tigerpartners-root-latest.tgz`锛屼笂浼犲埌 `39.106.226.65:/opt/tigerpartners-web/tigerpartners-root-20260515-0122.tgz`锛岃В鍘嬪埌 `/opt/tigerpartners-web/releases/20260515-0122`锛屽垏鎹?`current` 鍚庨噸鍚?`tigerpartners-web.service`銆傛湇鍔″櫒鏈満 `http://127.0.0.1:3004/` 杩斿洖 `200 OK`銆傞殢鍚庢柊澧炵殑 Zoe Zhang 涓汉椤?Performance & Achievements 鏁版嵁淇浠呬繚鐣欏湪鏈湴宸ヤ綔鍖猴紝灏氭湭閮ㄧ讲銆?

2026-06-22 已将当前 `cms` 分支构建发布到正式站 `https://www.tigerpartners.cn/`，新 release 为 `/opt/tigerpartners-web/releases/20260622-012540`，并用本地 `data/cms.db` 与 `data/cms-site.json` 替换正式站 release 数据目录。正式服安装 Linux 生产依赖后重启 `tigerpartners-web.service`，公网验证首页、CMS 登录页和 `/api/cms/public` 均返回 `200 OK`，公开数据与 `/team` 页面均不再包含 `senior-associate-8`。

2026-06-23 已将正式站切换到新 OSS 配置，release 为 `/opt/tigerpartners-web/releases/20260623-222902`。正式站 `.env.production` 和 `.env.local` 均配置 `OSS_BUCKET=husu2`、`OSS_ENDPOINT=oss-cn-beijing.aliyuncs.com`、`NEXT_PUBLIC_ASSET_BASE_URL=https://husu2.oss-cn-beijing.aliyuncs.com/husuweb` 与 `NEXT_PUBLIC_CMS_ASSET_BASE_URL=https://husu2.oss-cn-beijing.aliyuncs.com/husuweb`；公网验证首页、CMS 登录页和 `/api/cms/public` 均返回 `200 OK`，公开 CMS 数据只包含新 OSS 前缀，不再包含旧 `img-12345` 前缀，正式服务器侧 OSS 临时对象 PUT 返回 `200`、DELETE 返回 `204`。

2026-07-03 已将当前 `cms` 分支代码部署到正式站 `https://www.tigerpartners.cn/`，新 release 为 `/opt/tigerpartners-web/releases/20260703-0032`。本次只部署代码，不覆盖正式 CMS 数据；新 release 的 `data` 和 `public` 软链到 `/opt/tigerpartners-web/releases/20260623-222902/data` 与 `/opt/tigerpartners-web/releases/20260623-222902/public`。远端 source 构建时补装 `lightningcss-linux-x64-gnu` 和 `@tailwindcss/oxide-linux-x64-gnu` 后构建通过，已切换 `current` 并重启 `tigerpartners-web.service`；公网验证首页、CMS 登录页、`/api/cms/public` 和 `/events` 均返回 `200 OK`。

2026-08-03 内容管理的虎诉团队成员编辑器将个人业绩从中英文分离 textarea 改为多组中英文成对编辑框，并支持新增、删除、置顶、上移和下移；仍写回原有 `achievements` 与 `zhAchievements` 数组，前台个人简历按数组顺序展示。同时可视化编辑器的 official state 反向同步改为按当前页面收口：编辑团队页不再同步首页动态或动态列表，避免修改个人简历时把旧 pageContent 中的动态条目补回。

2026-08-03 已将当前 `cms` 分支代码部署到正式站 `https://www.tigerpartners.cn/`，新 release 为 `/opt/tigerpartners-web/releases/20260803-2246`。本次发布包只包含应用代码、内容源文件和构建配置，不包含本地 `data`、`public`、`.env*`、`.next`、`node_modules` 或上传素材；新 release 的 `data` 与 `public` 继续软链到 `/opt/tigerpartners-web/releases/20260623-222902/data` 和 `/opt/tigerpartners-web/releases/20260623-222902/public`。远端构建通过后重启 `tigerpartners-web.service`，服务器本机与公网验证首页、CMS 登录页、公开 CMS API 和团队页均返回 `200 OK`。

## 鏇存柊鏃ュ織

| 鏃堕棿 | 鍒嗘敮 | 鍙樻洿绫诲瀷 | 鎻忚堪 |
| :--- | :--- | :--- | :--- |
| 2026-08-03 22:54 | cms | 部署发布 | 正式站切换到 release `20260803-2246`，仅部署代码，`data/public` 继续复用 `20260623-222902`，公网首页、CMS 登录页、公开 CMS API 和团队页验证通过 |
| 2026-08-03 22:22 | cms | 修复缺陷 | 虎诉团队个人业绩改为多组中英文成对编辑并支持排序；可视化编辑按当前页面同步 official state，避免编辑简历时误改动态列表 |
| 2026-07-03 00:24 | cms | 部署发布 | 正式站切换到 release `20260703-0032`，仅部署代码，`data/public` 复用 `20260623-222902`，公网首页、CMS 登录页、公开 CMS API 和 Events 验证通过 |
| 2026-07-02 23:56 | cms | 修复缺陷 | 可视化预览合成虎诉动态详情媒体时尊重空数组覆盖，清空 Detail image/video 后不再保留旧默认占位元素 |
| 2026-07-02 23:43 | cms | 修复缺陷 | 虎诉动态详情页读取 CMS 详情媒体时尊重空值覆盖，清空 `Detail video N` 后不再回退静态默认视频 |
| 2026-07-02 23:37 | cms | 功能调整 | 虎诉动态详情视频占位规则改为 `[VIDEO]`，空视频地址不会在前台输出 video 标签，并保留旧飞书占位文字兼容 |
| 2026-07-02 23:32 | cms | 文案更新 | 可视化编辑虎诉动态详情页的正文编辑格式说明补充新增视频、多个视频和视频显示位置的操作说明 |
| 2026-07-02 23:25 | cms | UI 调整 | 可视化编辑虎诉动态详情页隐藏底层 `Detail image widths` 字段，只保留每张详情图片下方的宽度比例输入框 |
| 2026-07-02 23:18 | cms | UI 调整 | 可视化编辑虎诉动态详情图片的宽度比例输入框改为跟随对应照片地址显示，不再作为单独字段散落在抽屉列表中 |
| 2026-07-02 23:11 | cms | UI 调整 | 内容管理虎诉动态详情图片改为每个照片地址输入框下方直接显示宽度比例输入框，并补充默认 70%、范围 10-100 的说明 |
| 2026-07-02 22:25 | cms | 修复缺陷 | 动态详情 metadata 改为读取公开 CMS 标题/摘要，详情图新增宽度比例字段，大事记正文换行在前台保留 |
| 2026-06-23 22:41 | cms | 部署发布 | 正式站切换到 release `20260623-222902`，运行新 `husu2` OSS 配置，公网首页、CMS 登录页、公开 CMS API 和 OSS PUT/DELETE 验证通过 |
| 2026-06-23 22:06 | cms | 资源更新 | 已将本地 `public/assets` 与 `public/uploads` 共 293 个文件上传到 `husu2/husuweb`，并抽样验证图片、视频、中文文件名和 uploads URL 均返回 200 |
| 2026-06-23 21:58 | cms | 配置变更 | 本地 OSS 配置切换到 `husu2` bucket，公开资源前缀统一为 `https://husu2.oss-cn-beijing.aliyuncs.com/husuweb`，并替换本地 CMS 数据中的旧 OSS URL |
| 2026-06-22 01:29 | cms | 部署发布 | 将当前团队删除联动修复和本地 CMS 数据库发布到正式站 `/opt/tigerpartners-web/releases/20260622-012540`，正式域名验证通过 |
| 2026-06-22 01:07 | cms | 修复缺陷 | 虎诉团队删除成员时同步刷新团队页 pageContent 投影，并清理 `senior-associate-8` 在当前数据、稳定版和测试版中的残留 |
| 2026-06-22 00:09 | cms | 修复缺陷 | CMS 进入服务行业内容管理时图片优先读取 `pageContent.home/media.cards` 的前台投影图，再回退 official 图，避免前台已替换但后台仍显示默认图 |
| 2026-06-21 23:57 | cms | 新增功能 | 虎诉文化正文 Body 支持以 `- `、`* `、`• ` 开头的无序列表行，并保留普通段落渲染 |
| 2026-06-21 23:37 | cms | 修复缺陷 | 首页服务行业卡片图片改为优先读取 `pageContent.home.industries[].image`，解决首页图片地址栏替换后前台仍使用 official 列表图片的问题 |
| 2026-06-21 23:31 | cms | 修复缺陷 | 服务行业页卡片不再展示 Description；虎诉动态删除列表项时同步删除同 slug 子页面、首页引用和 override，避免 title 下拉框残留 |
| 2026-06-21 23:14 | cms | UI 调整 | 虎诉荣誉内容管理中某年份内新增荣誉条目改为插入列表最前面，和新增年份的排序习惯一致 |
| 2026-06-21 23:12 | cms | 修复缺陷 | 服务行业内容管理新增、删除、排序、改图和文字编辑会防抖自动保存到当前版本草稿，并统一稳定/测试版本现有图片投影 |
| 2026-06-21 23:03 | cms | 修复缺陷 | 修复服务行业内容管理删除或改图后立即保存可能读取上一帧状态的问题，并清理稳定/测试版本中两个旧测试行业 |
| 2026-06-21 22:55 | cms | 修复缺陷 | 修复稳定版服务行业删除或替换图片后，后端版本归一化继续从旧 pageContent 反向补回删除项或旧图片的问题 |
| 2026-06-21 22:46 | cms | 修复缺陷 | 修复服务行业替换图片地址后被旧 pageContent 详情页图片反向覆盖，导致预览/详情页仍显示旧图的问题 |
| 2026-06-21 22:37 | cms | 数据更新 | 将本地 CMS“稳定”版本的服务行业内容替换为“测试”版本的 8 条服务行业内容，并保留稳定版其他内容与发布状态 |
| 2026-06-17 00:45 | cms | 修复缺陷 | 修复测试站可视化新增大事记事件时，月份输入每个字母都会把上一帧旧事件追加成重复事件的问题 |
| 2026-06-15 08:26 | cms | UI 调整 | 为可视化编辑虎诉大事记抽屉补充年份内置顶、上移、下移按钮，并保留手动事件顺序 |
| 2026-06-15 08:13 | cms | 修复缺陷 | 修复 CMS 列表移动/置顶后自动生成标题尾号仍显示旧序号，导致标题序号和展开输入项位置对不上的问题 |
| 2026-06-15 08:07 | cms | 修复缺陷 | 修复新增虎诉动态详情页日期继承静态最新动态日期的问题，统一格式化 `YYYYMMDD` 展示日期，并为虎诉大事记年份内事件增加置顶、上移和下移操作 |
| 2026-06-10 23:15 | cms | 修复缺陷 | 修复虎诉动态详情抽屉生成图片字段仍可能使用本地 `/uploads` 路径，导致测试站预览加载不到新上传图片的问题 |
| 2026-06-10 09:33 | cms | 修复缺陷 | 修复版本发布/恢复后正式站 event 子页面可能读取旧 `officialSiteState.previewPageContent`，导致与版本预览不一致的问题 |
| 2026-06-10 09:15 | cms | 修复缺陷 | 修复虎诉动态新增 event 被按位置套用默认摘要/详情图片，以及可视化中英文子页面按下标同步导致字段串项的问题 |
| 2026-06-10 08:41 | cms | 修复缺陷 | 补齐虎诉动态前台事件合并路径，空封面不再通过 `localizeCmsEvent` 回退为静态默认图片 |
| 2026-06-10 00:32 | cms | 修复缺陷 | 修复虎诉动态新增事件图片留空后，版本预览和 CMS 同步层把空图片回退为默认图片的问题 |
| 2026-06-10 00:10 | cms | 修复缺陷 | 修复服务行业内容管理中编辑 Slug 会导致右侧编辑面板被卸载的问题，并让版本预览按当前 CMS 可视化语言打开 |
| 2026-06-04 22:22 | cms | 修复缺陷 | 修复版本中 `home.industries` 少于 `media.cards` 时，加载可视化或内容管理会用首页列表反向裁掉服务行业页新增项的问题 |
| 2026-06-04 10:05 | cms | 修复缺陷 | 在服务端版本创建、更新、预览读取和发布恢复时用 pageContent 归一化服务行业 officialState，防止线上旧 payload 继续丢失可视化新增行业 |
| 2026-06-04 09:50 | cms | 修复缺陷 | 修复版本发布后再次进入可视化编辑时新增服务行业被旧 officialState 列表裁掉的问题 |
| 2026-06-04 00:01 | cms | 修复缺陷 | 修复服务行业删除后被 pageContent 默认项、旧 slug 合并或可视化 `media.cards` 未同步官方列表而重新补回的问题 |
| 2026-05-30 16:12 | cms | UI 调整 | 内容管理虎诉动态封面图片字段新增上传按钮，上传到 event 分类后自动写回封面地址并显示缩略图 |
| 2026-05-30 15:55 | cms | 修复缺陷 | 修复可视化 pageContent 包装函数自调用导致的栈溢出，并为可视化页面图片字段和内容管理服务行业背景图补充上传入口 |
| 2026-05-30 15:21 | cms | 修复缺陷 | 可视化编辑的 pageContent 更新函数内立即排队同步官网 CMS 草稿，避免新增动态后快速返回内容管理仍看到旧列表 |
| 2026-05-30 15:15 | cms | 修复缺陷 | 可视化编辑变更实时同步父级官网 CMS 内存状态，切回内容管理虎诉动态时无需刷新页面即可看到新增动态 |
| 2026-05-30 15:04 | cms | 修复缺陷 | 可视化编辑虎诉动态新增项改为插入动态列表首位并停留在列表编辑，避免默认跳转动态子页面和新增项落在首屏列表外 |
| 2026-05-30 14:24 | cms | 修复缺陷 | 虎诉动态内容管理新增按钮支持直接创建空白动态，新增或重新加入的动态统一插入列表最上方并自动展开编辑 |
| 2026-05-26 09:12 | cms | 修复缺陷 | 虎诉动态前台改为尊重 CMS 列表顺序，内容管理补齐排序日期字段和时间排序按钮，避免置顶被前台日期排序覆盖 |
| 2026-05-26 10:03 | cms | 修复缺陷 | 可视化动态列表新增置顶/取消置顶，时间排序支持 `YYYYMMDD` 并保留置顶优先级，可视化图片预览统一解析到 OSS 公网地址 |
| 2026-05-26 10:29 | cms | UI 调整 | CMS 文件管理和可视化上传成功提示显示最新 OSS 公网地址，方便定位刚上传的文件 |
| 2026-05-26 22:35 | cms | 配置修正 | OSS 图片地址统一使用 `NEXT_PUBLIC_ASSET_BASE_URL` 的 `/husuweb` 前缀，上传对象 key 同步写入同一前缀 |
| 2026-05-26 22:47 | cms | 配置修正 | `.env.local` 补齐 `NEXT_PUBLIC_ASSET_BASE_URL`，本地 dev server 重启后也加载 `/husuweb` OSS 图片前缀 |
| 2026-05-26 23:02 | cms | UI 调整 | 文件管理新增“最近上传文件”列表，上传素材最新项置顶并显示可复制的 `/husuweb` OSS 地址 |
| 2026-05-26 23:14 | cms | UI 调整 | 文件管理改为按页面分页查看和上传，并将文件管理面板文字整体放大约 1.3 倍 |
| 2026-05-26 23:20 | cms | UI 调整 | OSS 静态资源浏览按页面语义分类展示，分类按钮使用固定中文页面顺序 |
| 2026-05-26 23:30 | cms | UI 调整 | 文件管理移除“最近上传文件”卡片区，上传素材并入 OSS 静态资源分类并按页面语义目录归档 |
| 2026-05-27 09:02 | cms | 修复缺陷 | 官网内容管理保存改为只写入版本草稿，编辑已发布版本不再绕过发布流程；文件管理统计改用真实资源扫描汇总 |
| 2026-05-28 08:38 | cms | 优化重构 | 可视化编辑预览刷新增加 500ms 防抖；大事记同步按年份自动分组并按月份降序排序 |
| 2026-05-28 08:45 | cms | 修复缺陷 | 文件管理 OSS 地址复制兼容 HTTP 测试环境；可视化预览中文切换强制同步；Header/Footer Logo 字段支持直接上传 |
| 2026-05-28 08:50 | cms | UI 调整 | 左侧全局版本选择器移除“未选择版本”空项，并在有版本时自动加载默认版本 |
| 2026-05-28 08:53 | cms | 性能优化 | 可视化编辑右侧输入改用防抖预览快照，输入和删除时不再即时重建 Puck 配置或派发 setData |
| 2026-05-28 08:56 | cms | 修复缺陷 | 左侧版本选择器默认值改为当前已发布版本，未主动编辑其他版本时始终回到发布版本 |
| 2026-05-28 09:02 | cms | 修复缺陷 | 修复预览 CN/EN 被 `initialLanguage` 重置的问题，并为版本预览页增加固定语言切换 |
| 2026-05-28 09:10 | cms | UI 调整 | 移除版本预览页右上角额外中英文按钮，保留页面 Header 自带切换 |
| 2026-05-28 09:17 | cms | 性能优化 | 可视化编辑所有右侧文本框改为本地缓冲提交；大事记抽屉按自动识别年份和月份降序分组展示 |
| 2026-05-28 09:37 | cms | UI 调整 | 可视化 About 大事记抽屉对齐内容管理，提供“新增年份”和年份内“新增事件”，新增事件标签改为年份事件命名 |
| 2026-05-28 09:58 | cms | 修复缺陷 | 服务行业发布读取不再因图片为空丢弃新增行业，并归一化 `/industries/...?...` slug，避免内容管理和可视化子页面找不到新增行业 |
| 2026-05-28 09:59 | cms | 修复缺陷 | 修复 `BufferedTextControl` 聚焦输入期间被旧 value 覆盖的问题，可视化编辑输入框可连续输入和删除 |
| 2026-05-28 10:09 | cms | 修复缺陷 | 可视化页面字段提交时同步更新 Puck 当前数据，并短暂忽略程序化 `setData` 引发的旧 `onChange`，避免输入被预览旧值反写 |
| 2026-05-30 13:48 | cms | 修复缺陷 | 服务行业加载改为合并 officialState 与 pageContent cards/detailPages，避免新增行业第二次进入可视化后右侧子页面编辑项丢失 |
| 2026-05-30 13:56 | cms | 修复缺陷 | 将可视化字段同步 Puck 的 dispatch 移出 `setPuckData` updater，避免 React 报告跨组件渲染期更新 `Preview2` |
| 2026-05-30 14:15 | cms | 修复缺陷 | 首页服务行业卡片 key 改为 slug，并在可视化同步服务行业时按 slug 去重，避免同名行业触发 React 重复 key 警告 |
| 2026-05-26 09:00 | cms | UI 调整 | 虎诉动态 CMS 条目新增“一键置顶”，直接把当前动态移动到 Events 页排序首位 |
| 2026-05-26 08:50 | cms | 性能优化 | CMS 文件管理上传素材和 OSS 公共素材列表改为分页懒加载，默认首屏 40 条并通过“加载更多”追加 |
| 2026-05-25 22:13 | cms | 修复缺陷 | CMS 文件上传在本地未配置 OSS AccessKey 时改为保留 `public/uploads` 本地文件并返回成功，避免 GIF 等素材上传被 502 阻断 |
| 2026-05-18 01:03 | cms | UI 调整 | 内容管理所有左侧导航分栏统一包入 sticky 可滚动容器，服务行业、虎诉荣誉、大事记、合伙人和资深律师均固定在视窗内滚动 |
| 2026-05-18 00:57 | cms | 修复缺陷 | 首页 HONORS 内容管理改为 sticky 年份导航，点击年份直接显示右侧编辑；可视化同步改为首页 Honors 维护 `homeHonorItems`、About Honors 维护虎诉荣誉内容 |
| 2026-05-18 00:48 | cms | UI 调整 | 首页 HONORS 轮播内容管理恢复为左侧年份导航，右侧按当前年份添加、排序和删除具体荣誉条目 |
| 2026-05-18 00:42 | cms | 修复缺陷 | 内容管理左右分栏导航固定左列、编辑表单固定右列；首页 HONORS 下拉按虎诉荣誉年份分组列出具体荣誉，并按 `homeHonorItems` 同步首页预览 |
| 2026-05-18 00:19 | cms | UI 调整 | 官网内容管理条目统一改为左右编辑结构，左侧显示年份、行业或成员身份与排序/删除操作，右侧展示对应可编辑表单 |
| 2026-05-18 00:28 | cms | 修复缺陷 | 官网内容管理改为左侧条目导航、右侧当前条目编辑；虎诉大事记删除、改年和排序统一基于归一化 Chronicle 数据写回，避免 2026 年最后一条事件被旧状态补回 |
| 2026-05-18 00:33 | cms | UI 调整 | CMS 内容管理布局按模块分流：首页 Events 轮播与虎诉动态恢复逐条展开布局，首页 HONORS、虎诉荣誉、虎诉大事记、服务行业、合伙人和资深律师保留左侧导航右侧编辑 |
| 2026-05-18 00:16 | cms | 修复缺陷 | 首页 Events 轮播内容管理改为写入 `home.eventOverrides` 并与可视化首页 Events 字段一致；可视化首页 Honors 抽屉按年份分级展示，并从虎诉荣誉具体年份/月度条目下拉添加 |
| 2026-05-18 00:04 | cms | 修复缺陷 | CMS 首页 HONORS 轮播改为按具体荣誉项选择；服务行业详情卡片回填默认正文并补充格式说明；大事记年份改名、团队新增成员删除与前台读取同步修复 |
| 2026-05-18 00:19 | cms | 内容管理左右结构 | 首页 HONORS、服务行业、虎诉荣誉、虎诉大事记、合伙人和资深律师等内容面板复用左右两栏编辑 shell，贴近旧事件和奖项管理的操作方式 |
| 2026-05-18 00:28 | cms | Chronicle 导航式编辑 | 内容管理列表编辑器切换为左侧导航选择条目、右侧集中编辑表单；大事记事件删除同步写回当前年份列表数据 |
| 2026-05-18 00:33 | cms | 内容管理分组布局 | 首页 Events 轮播与虎诉动态使用原逐条展开编辑；年份类、行业类和人物类模块使用左侧导航定位年份、行业或成员姓名 |
| 2026-05-18 00:16 | cms | 首页轮播与荣誉可视化对齐 | 首页 Events 轮播编辑统一使用首页专属覆盖数据；首页 Honors 可视化列表增加年度分级和基于虎诉荣誉内容的具体荣誉项新增入口 |
| 2026-05-18 00:04 | cms | CMS 内容管理细化 | 首页 HONORS 轮播按具体荣誉项保存 `homeHonorItems`；服务行业详情卡片字段回填行业默认 cards；大事记年份和新增团队成员删除在列表与内容数据中同步更新 |
| 2026-05-17 23:51 | cms | UI 璋冩暣 | 棣栭〉 HONORS 涓嬫媺鍒楄〃鏀逛负濮嬬粓灞曠ず铏庤瘔鑽ｈ獕骞翠唤鍐呭骞舵爣璁板凡鍔犲叆椤癸紱澶т簨璁版柊澧炲勾浠藉悓姝ュ啓鍏ュ勾浠藉垪琛紱鍥㈤槦鏂板鎴愬憳鏀逛负鐩存帴鍒涘缓鍚屾牸寮忕┖鐧芥垚鍛橈紱棣栭〉琛屼笟閾炬帴瀛楁琛?`from=home` |
| 2026-05-17 23:46 | cms | 淇缂洪櫡 | 鏈嶅姟琛屼笟鍐呭绠＄悊琛ラ綈琛屼笟璇︽儏鍗＄墖姝ｆ枃锛涜檸璇夎崳瑾夋暟閲忔枃妗堟敼涓烘寜骞翠唤鑽ｈ獕鏉＄洰鏁拌嚜鍔ㄧ敓鎴愶紝鍒犻櫎鑽ｈ獕鍚庝笉鍐嶈榛樿鍐呭琛ュ洖锛涘ぇ浜嬭鍒犻櫎浜嬩欢鍚庝笉鍐嶈榛樿闈欐€佸唴瀹归噸鏂拌ˉ鍥?|
| 2026-05-17 23:36 | cms | UI 璋冩暣 | 棣栭〉 HONORS 杞挱绠＄悊鏀逛负涓庨椤?Events 杞挱涓€鑷寸殑鈥滈€夋嫨骞翠唤鍚庣偣鍑绘柊澧炲埌杞挱鈥濇搷浣滄柟寮忥紝骞朵繚鐣欏凡閫夊勾浠界殑鎺掑簭鍜屽垹闄?|
| 2026-05-17 23:20 | cms | 淇缂洪櫡 | CMS 澶栭儴鍐呭绠＄悊淇濆瓨鏃跺悓姝ョ敓鎴?`pageContent`锛岄椤典簨浠惰疆鎾€佸鎴?Logo銆佹湇鍔¤涓氥€佽崳瑾夈€佸ぇ浜嬭銆佸洟闃熶笌鍔ㄦ€佸瓙椤甸潰鍦ㄥ彲瑙嗗寲缂栬緫涓娇鐢ㄥ悓涓€浠藉唴瀹规暟鎹?|
| 2026-05-17 23:11 | cms | UI 璋冩暣 | CMS 鐗堟湰閫夋嫨涓婄Щ鍒板悗鍙板乏渚у叏灞€鍏ュ彛锛涘彲瑙嗗寲缂栬緫銆佺珯鐐逛俊鎭拰椤甸潰鍐呭闈㈡澘涓嶅啀鎻愪緵灞€閮ㄧ増鏈笅鎷夛紝缁熶竴璺熼殢褰撳墠 CMS 鐗堟湰涓婁笅鏂?|
| 2026-05-17 23:05 | cms | 淇缂洪櫡 | CMS 鐖剁骇鍔犺浇鍜岀増鏈?payload 鏋勫缓鏃剁粺涓€褰掍竴鍖栧畼缃戠姸鎬侊紱鍐呭绠＄悊淇濆瓨璺熼殢褰撳墠鍏ㄥ眬鐗堟湰锛屼笉鍐嶇粫杩囩増鏈洿鎺ュ啓姝ｅ紡瀹樼綉鐘舵€?|
| 2026-05-17 22:54 | cms | 淇缂洪櫡 | 瀹樼綉鍐呭绠＄悊闈㈡澘娓叉煋鍓嶅厛褰掍竴鍖?CMS 鐘舵€侊紝铏庤瘔鑽ｈ獕琛ラ綈鍐呭鍙珛鍗虫樉绀哄苟闅忎繚瀛樺啓鍏ュ綋鍓嶇増鏈?瀹樼綉鐘舵€?|
| 2026-05-17 22:48 | cms | 淇缂洪櫡 | CMS 铏庤瘔鑽ｈ獕榛樿鍐呭鎺ュ叆 About 鍓嶅彴涓枃璧炲姪鑽ｈ獕琛ュ厖閫昏緫锛岄伩鍏?2024銆?022 绛夊勾浠借崳瑾夋潯鐩湪鍐呭绠＄悊涓粛缂哄け |
| 2026-05-17 22:44 | cms | 淇缂洪櫡 | CMS 瀹樼綉鍐呭鍔犺浇鏃惰嚜鍔ㄨˉ榻愰潤鎬佸畬鏁?Honors 涓?Chronicle 鏉＄洰锛涘彲瑙嗗寲鏂板鍥㈤槦鎴愬憳浼氬悓姝ヨ繘鍏ュ悎浼欎汉/璧勬繁寰嬪笀鍐呭绠＄悊鍒楄〃 |
| 2026-05-17 22:39 | cms | 淇缂洪櫡 | 鐗堟湰鍙戝竷/鎭㈠鍜屽凡鍙戝竷鐗堟湰淇濆瓨鏃跺悓姝ュ埛鏂板姩鎬佸瓙椤甸潰璺敱锛涜€佺増鏈仮澶嶆椂鐢ㄧ増鏈〉闈㈠瓧娈靛洖濉叕寮€ CMS 鐘舵€侊紝閬垮厤姝ｅ紡绔欓儴鍒嗛〉闈粛鏄剧ず鏃у唴瀹?|
| 2026-05-17 22:30 | cms | UI 璋冩暣 | 鍚庡彴鈥滃唴瀹圭鐞嗏€濆鑸Щ闄も€滀簨浠跺拰濂栭」绠＄悊鈥濆拰鈥滆仈绯绘彁浜も€濆叆鍙ｏ紝搴曞眰鏁版嵁/API 淇濈暀 |
| 2026-05-17 22:27 | cms | 淇缂洪櫡 | 鍏变韩鍥剧墖缁勪欢閬囧埌绌?`src` 鏃舵覆鏌撳崰浣嶅鍣紝閬垮厤鏂板棣栭〉鍔ㄦ€佽疆鎾瓑鏈笂浼犲浘鐗囩姸鎬佽Е鍙戞祻瑙堝櫒绌?src 璀﹀憡 |
| 2026-05-17 22:26 | cms | 淇缂洪櫡 | 棣栭〉铏庤瘔鍔ㄦ€佽疆鎾娊灞夌‖杩囨护涓?slide 瀛楁锛屾棫鏁版嵁娈嬬暀鐨?Detail content銆佽鎯呭浘鐗囧拰璇︽儏瑙嗛瀛楁涓嶅啀鏄剧ず鎴栬鏂板椤圭户鎵?|
| 2026-05-17 22:23 | cms | 淇缂洪櫡 | About 澶т簨璁颁笉鍐嶈涓嶅畬鏁寸殑 CMS 骞翠唤鍒楄〃瑁佸壀锛涙柊澧炲洟闃熸垚鍛樺瓙椤甸潰浣跨敤鑷韩 slug 绌烘。妗堟壙鎺?CMS 瑕嗙洊鍐呭锛屼笉鍐嶅洖閫€鍒扮涓€涓悎浼欎汉 |
| 2026-05-17 22:18 | cms | 浼樺寲閲嶆瀯 | 棣栭〉铏庤瘔鍔ㄦ€佽疆鎾敼涓虹嫭绔?slide 瀛楁锛屽彧缁存姢杞挱鍥惧睍绀烘墍闇€淇℃伅锛屼笉鍐嶈姹傛垨鐢熸垚鍔ㄦ€佸瓙椤甸潰鍐呭 |
| 2026-05-17 22:13 | cms | 淇缂洪櫡 | About 澶т簨璁板睍绀轰笌鍚屾淇濈暀瀹屾暣榛樿浜嬩欢锛涙柊澧炲悎浼欎汉/璧勬繁寰嬪笀鏃跺悓姝ュ垱寤轰釜浜哄瓙椤甸潰骞跺彲浠庡垪琛ㄧ洿鎺ヨ繘鍏ョ紪杈戯紱琛屼笟璇︽儏鍗＄墖浼樺厛璇诲彇 CMS 涓庡弻璇厹搴曞瓧娈?|
| 2026-05-17 22:03 | cms | 淇缂洪櫡 | 棣栭〉鍜?About 鑽ｈ獕灞曠ず浼氬皢 CMS 閮ㄥ垎鏁版嵁涓庡畬鏁撮潤鎬佽崳瑾夊悎骞讹紝閬垮厤鍙鍖栭粯璁?3 鏉¤崳瑾夎鐩栧畬鏁村垪琛?|
| 2026-05-17 21:58 | cms | UI 璋冩暣 | CMS Events 鐖跺垪琛ㄩ殣钘?Summary 缂栬緫鍜屽崱鐗囨憳瑕侀瑙堬紝Slug 瀛楁澧炲姞 URL 涓庝腑鑻辨枃缁戝畾鐢ㄩ€旇鏄?|
| 2026-05-17 21:42 | cms | 鏂板鍔熻兘 | CMS 鍔ㄦ€佸瓙椤甸潰鎶藉眽鏂板 Detail content 姝ｆ枃鏍煎紡鎻愮ず锛岃鏄庡浘鐗囧拰瑙嗛鍗犱綅绗︿笌璇︽儏濯掍綋瀛楁鐨勫搴斿叧绯?|
| 2026-05-17 21:34 | cms | 淇缂洪櫡 | Events 鍔ㄦ€?slug 瀛楁鏀逛负涓嫳鏂囧悓姝ユ洿鏂帮紝骞跺湪鐖跺垪琛ㄦ潯鐩笂澧炲姞 Edit detail 鍏ュ彛璺宠浆鍒板搴斿姩鎬佸瓙椤甸潰 |
| 2026-05-17 21:25 | cms | 淇缂洪櫡 | CMS 鍔ㄦ€佸瓙椤甸潰瀛楁鍒楄〃銆佹爣棰樻憳瑕佸拰濯掍綋妲戒綅鐢熸垚鍏ㄩ儴鏀逛负 slug 浼樺厛锛屼慨澶嶇 20 鏉＄瓑闈為鏉″姩鎬佽鎯?content 涓嶆樉绀虹殑闂 |
| 2026-05-17 21:02 | cms | 淇缂洪櫡 | CMS 鍔ㄦ€佸瓙椤甸潰鎶藉眽鏀逛负鎸?slug 瀵归綈涓嫳鏂囨潯鐩紝閬垮厤闈炵涓€涓瓙椤甸潰鍥?index 閿欎綅鐪嬩笉鍒?Detail content |
| 2026-05-17 20:55 | cms | 淇缂洪櫡 | Events 鐖跺垪琛ㄦ柊澧炲唴瀹归」鍚庤嚜鍔ㄥ垏鎹㈠埌鍚?slug 鍔ㄦ€佸瓙椤甸潰鎶藉眽锛岄伩鍏嶅仠鐣欏湪鐖跺垪琛ㄦ椂鐪嬩笉鍒?Detail content |
| 2026-05-17 20:15 | cms | 淇缂洪櫡 | CMS 鏂板 Events 鐖跺垪琛ㄩ」鏃跺悓姝ュ垱寤哄姩鎬佸瓙椤甸潰楠ㄦ灦锛屾柊澧炲姩鎬佸瓙椤甸潰鏃跺己鍒跺啓鍏?Detail content銆佽鎯呭浘鐗囧拰璇︽儏瑙嗛瀛楁 |
| 2026-05-17 20:09 | cms | 淇缂洪櫡 | 鍔ㄦ€佸瓙椤甸潰鎶藉眽鍥哄畾琛ラ綈 Detail content銆佽鎯呭浘鐗囧拰璇︽儏瑙嗛瀛楁锛涗簨浠惰鎯呴〉浼氭覆鏌撴湭琚崰浣嶇娑堣垂鐨勫墿浣欏浘鐗?瑙嗛 |
| 2026-05-17 20:00 | cms | 淇缂洪櫡 | 淇 CMS 鍔ㄦ€佸垪琛ㄦ柊澧炲悗瀛愰〉闈㈤€夋嫨鍣ㄦ棤娉曢€夋嫨鐨勯棶棰橈紝閫夋嫨鍒楄〃鏂板 slug 鏃惰嚜鍔ㄥ垱寤哄悓 slug 鍔ㄦ€佽鎯呴」锛涗簨浠惰鎯呴〉閬垮厤鎽樿涓庢鏂囬噸澶嶆覆鏌?|
| 2026-05-17 19:52 | cms | 淇缂洪櫡 | 淇 Events 鐖堕〉闈?CMS 鍒楄〃鏂板椤逛笉鏄剧ず銆佸睍绀烘棩鏈熶笉鐢熸晥鐨勯棶棰橈紝鍒楄〃鍗＄墖鏀逛负璇诲彇 `event.list` 骞舵媶鍒嗘帓搴忔棩鏈熷拰灞曠ず鏃ユ湡锛涜ˉ榻愭湇鍔¤涓氬瓙椤甸潰鎶藉眽瀛楁鍏滃簳 |
| 2026-05-17 19:39 | cms | 浼樺寲閲嶆瀯 | CMS 鍙鍖栧皢 Events 鐖堕〉闈㈠姩鎬佸垪琛ㄤ笌鍔ㄦ€佸瓙椤甸潰璇︽儏鎷嗗垎绠＄悊锛岀埗椤甸潰鍙繚鐣欏崱鐗囧瓧娈碉紝璇︽儏椤电洿鎺ヨ鍙?`event.detailPages`锛涙湇鍔¤涓氬瓙椤甸潰榛樿琛ラ綈璇︽儏椤甸灞忓浘鍜岀畝浠?|
| 2026-05-17 19:03 | cms | 淇缂洪櫡 | 淇 CMS 鍙鍖栫紪杈戝櫒鍐呴《閮ㄩ〉绛俱€佽瑷€鍒囨崲銆丠eader/Footer 瀛楁銆佸唴瀹规娊灞夋寜閽拰鎻愮ず娑堟伅涓殑涓枃涔辩爜 |
| 2026-05-17 18:50 | cms | 鏂板鍔熻兘 | 鏈嶅姟琛屼笟瀛愰〉闈㈡帴鍏?CMS 鍙鍖栫紪杈戯紝鏀寔鎸夊叿浣撹涓氱淮鎶よ鎯呴〉鏍囬銆侀灞忚儗鏅浘銆佺畝浠嬪拰璇︽儏鍗＄墖锛屽苟璁╅瑙堜笌鍓嶅彴璇︽儏椤佃鍙栧悓涓€浠介〉闈㈠瓧娈?|
| 2026-05-17 18:47 | cms | 鏂板鍔熻兘 | Contact 椤?CMS 鍙鍖栬ˉ榻?Hero 姝ｆ枃/鑳屾櫙鍥俱€佽仈绯诲尯鐢佃瘽/閭/鍙冲浘銆佸姞鍏ヨ檸璇夊彸渚ф鏂囥€佸洓涓嫑鑱樻爮鐩拰绠€鍘嗘姇閫掑瓧娈碉紝骞舵柊澧炲墠鍙版牸寮忓寲鏂囨湰娓叉煋 |
| 2026-05-17 18:24 | cms | 鏂板鍔熻兘 | Team銆佹湇鍔¤涓氬拰铏庤瘔鍔ㄦ€侀〉闈㈣ˉ榻?CMS 鍙鍖栧瓧娈碉紱鍥㈤槦鍒楄〃鎷嗕负鐙珛鍚堜紮浜?璧勬繁寰嬪笀鍗＄墖锛屾湇鍔¤涓氬垪琛ㄦ敼涓烘湰椤靛崱鐗囧唴瀹癸紝浜嬩欢璇︽儏濯掍綋浼樺厛璇诲彇鍙鍖栨潯鐩殑 `detailImageN/detailVideoN` |
| 2026-05-17 18:09 | cms | 淇缂洪櫡 | 淇鐗堟湰鍙戝竷/鎭㈠鍚?CMS 宸︿晶瀵艰埅鍙兘鏃犲搷搴旂殑闂锛岀増鏈搷浣滄垚鍔熷悗涓嶅啀 `window.location.reload()`锛屾敼涓哄師鍦板埛鏂扮増鏈垪琛ㄥ苟閲嶆柊鍔犺浇褰撳墠鍙戝竷鐗堟湰 |
| 2026-05-17 17:55 | cms | 鏂板鍔熻兘 | About 椤?CMS 鍙鍖栬ˉ榻?Hero 鍥剧墖銆佹効鏅乏渚?灞曞紑鏂囨涓庢寜閽€佽崳瑾夊彸渚ф鏂囥€佹枃鍖栨鏂?CTA銆丆ore Value 瀛愰〉闈㈡鏂囦互鍙婂ぇ浜嬭鍒楄〃绠＄悊锛屽苟鍚屾 Honors/Chronicle 鍒版寮?CMS 鐘舵€?|
| 2026-05-17 17:43 | cms | 鏂板鍔熻兘 | Footer 鍙鍖栫紪杈戣ˉ榻愬彸渚ф鏂囥€佸湴鍧€銆佺増鏉冦€佸厤璐ｅ０鏄庢寜閽€佸妗堟枃瀛?閾炬帴鍜屽浘鏍囧瓧娈碉紝`SiteFooter` 鏀逛负璇诲彇 CMS footer 閰嶇疆 |
| 2026-05-17 17:28 | cms | 淇缂洪櫡 | 淇 CMS 鍙鍖?Header/TITLE 淇敼鍚庨瑙堜笉鐢熸晥鐨勯棶棰橈紝姝ｅ紡 CMS 鐘舵€佹柊澧?`header` 閰嶇疆锛岄瑙?Provider 鍒锋柊 key 绾冲叆 `siteSettings` 鎸囩汗锛宍SiteHeader` 鏀逛负璇诲彇 CMS 瀵艰埅銆丩ogo 涓庤瑷€鎸夐挳鏂囨 |
| 2026-05-17 14:45 | cms | 淇缂洪櫡 | 淇棣栭〉鍙鍖栧瓧娈靛彂甯冨悗姝ｅ紡绔欎笉鐢熸晥鐨勯棶棰橈紝姝ｅ紡 CMS 鐘舵€佷繚鐣?`previewPageContent`锛屾棫鐗堟湰鍙戝竷鏃剁敤 `pageContent` 鍥炲～ |
| 2026-05-17 14:40 | cms | 淇缂洪櫡 | 淇 CMS 瀹樼綉鍐呭绠＄悊鍒楄〃 key 璀﹀憡锛涙寮忕珯鏀逛负鏈嶅姟绔鍙栧綋鍓?CMS锛屽叕寮€ CMS 鎺ュ彛鍜岀増鏈彂甯?鎭㈠鎺ュ彛寮哄埗鍔ㄦ€佸苟琛ラ綈鐪熷疄瀹樼綉璺緞鍒锋柊 |
| 2026-05-17 14:37 | cms | 淇缂洪櫡 | 娣卞害淇铏庤瘔鍔ㄦ€佸瓙椤甸潰鏇挎崲璇︽儏鍥剧墖涓嶇敓鏁堢殑闂锛岀敓鎴愬獟浣撳瓧娈靛悓姝ュ啓鍥炲簳灞傚垪琛ㄥ苟淇濈暀鍥剧墖鍗犱綅椤哄簭 |
| 2026-05-17 14:31 | cms | 鏂板鍔熻兘 | 棣栭〉铏庤瘔鍔ㄦ€佽疆鎾柊澧炵嫭绔?`home.eventOverrides` 鍜?See More CTA 瀛楁锛涘彲瑙嗗寲缂栬緫鎭㈠ Header/Footer 鏍忕洰骞惰棣栭〉 Vision銆両ndustries銆丠onors銆丒vents銆丆lients 鏂囨浼樺厛璇诲彇 CMS |
| 2026-05-17 14:11 | cms | 淇缂洪櫡 | 娣卞害淇铏庤瘔鍔ㄦ€佸瓙椤甸潰鏇挎崲鍥剧墖鍚庨瑙堜笉鏇存柊鐨勯棶棰橈紝灏嗗垪琛?item 瀛楁鎸囩汗娉ㄥ叆 Puck 闅愯棌 prop 骞剁敤浜?CMS Provider 鍒锋柊 key |
| 2026-05-17 14:02 | cms | 浼樺寲閲嶆瀯 | CMS 榛樿鍔犺浇宸插彂甯冪増鏈紱棣栭〉 Honors 鏌ョ湅鏇村鎸夐挳鏂板 `ctaLabel` 鍜?`ctaHref` 瀛楁骞跺吋瀹规棫鐗堟湰鍐呭 |
| 2026-05-16 16:18 | cms | 淇缂洪櫡 | 淇 Puck 鎸?`pageContent.updatedAt` 鏁翠綋閲嶆寕杞藉鑷寸殑鏈€澶ф洿鏂版繁搴﹂敊璇紝鏀逛负鍙埛鏂?CMS Provider 棰勮涓婁笅鏂?|
| 2026-05-16 16:11 | cms | 淇缂洪櫡 | 淇 CMS 鎶藉眽瀛楁鏀瑰浘鍚庝簨浠惰鎯呭浘鐗囧鐢ㄦ棫鑺傜偣鐨勯棶棰橈紝浜嬩欢璇︽儏鍥剧墖鑺傜偣鎸?src 閲嶅缓骞跺湪 Provider 灞傚埛鏂伴瑙堜笂涓嬫枃 |
| 2026-05-16 15:57 | cms | 淇缂洪櫡 | 淇 CMS 棰勮缂哄皯 `officialSiteState` 鏃惰烦杩囪檸璇夊姩鎬佽鎯呭獟浣撳悓姝ョ殑闂锛岄粯璁ら瑙堢姸鎬佷篃浼氬悎鎴愪簨浠跺浘鐗囪鐩?|
| 2026-05-16 15:50 | cms | 淇缂洪櫡 | 淇铏庤瘔鍔ㄦ€佽鎯呭浘鐗囧湴鍧€淇敼鍚庨瑙堜笉鏇存柊鐨勯棶棰橈紝璇︽儏濯掍綋妲戒綅鏀逛负涓嫳鏂囧叡鐢ㄥ苟鎸夊綋鍓嶉瑙堣瑷€浼樺厛鍚屾 |
| 2026-05-16 15:44 | cms | 淇缂洪櫡 | CMS 铏庤瘔鍔ㄦ€佸瓙椤甸潰濯掍綋瀛楁鎸夋鏂囧崰浣嶇鐢熸垚鐙珛鍥剧墖/瑙嗛妲戒綅锛屼笂浼犳椂鏇挎崲瀵瑰簲妲戒綅骞朵繚瀛樹负璇︽儏濯掍綋鏁扮粍 |
| 2026-05-16 15:34 | cms | UI 璋冩暣 | CMS 鐗堟湰涓嬫媺绉婚櫎鈥滃綋鍓嶇嚎涓婄増鏈€濋€夐」锛屽彧淇濈暀鐗堟湰绠＄悊涓垱寤虹殑鐗堟湰锛屾湭閫夋嫨鏃舵樉绀哄崰浣嶇姸鎬?|
| 2026-05-16 15:04 | cms | 淇缂洪櫡 | CMS 榛樿涓嶅啀鑷姩鍔犺浇绗竴涓祴璇曠増鏈紱鐗堟湰 payload 绾冲叆 `officialSiteState`锛屽彂甯?鎭㈠鐗堟湰鏃跺悓姝ョ湡瀹炲畼缃戞暟鎹?|
| 2026-05-16 14:47 | cms | 淇缂洪櫡 | 淇宸插彂甯冩祴璇曠増鏈彁浜ゆ洿鏂板悗鏈悓姝ュ埌褰撳墠绔欑偣鐨勯棶棰橈紝鐗堟湰 PUT 鏃惰嫢鐗堟湰宸插彂甯冧細鑷姩鎭㈠鍒扮珯鐐圭姸鎬?|
| 2026-05-16 14:42 | cms | UI 璋冩暣 | 鍙鍖栫紪杈戦《閮ㄩ〉闈㈡爮鏀舵暃涓哄叚涓埗椤甸潰骞舵柊澧炶檸璇夋枃鍖栧瓙椤甸潰鍏ュ彛锛孋ore Value 椤甸潰鏍囬鍜岀粨灏炬枃妗堟帴鍏?CMS 棰勮瀛楁 |
| 2026-05-16 14:15 | cms | 淇缂洪櫡 | 淇 CMS 鐗堟湰棰勮鐐瑰嚮 Events銆両ndustries銆乀eam 瀛愰〉闈㈤摼鎺ヤ細绂诲紑棰勮椤电殑闂锛屽苟绂佺敤鐗堟湰棰勮涓殑 public CMS 浜屾鎷夊彇 |
| 2026-05-16 12:01 | cms | 鏂板鍔熻兘 | Events 瀛愰〉闈㈢紪杈戝鍔犺鎯呭浘鐗囧拰璇︽儏瑙嗛瀛楁锛屽唴瀹规娊灞変腑鐨勫浘鐗?瑙嗛瀛楁鏀寔鐩存帴涓婁紶骞跺啓鍥炲綋鍓嶄簨浠?|
| 2026-05-16 11:52 | cms | 鏂板鍔熻兘 | 鍙鍖栫紪杈戦《閮ㄦ爮鏂板瀛愰〉闈㈤€夋嫨鍣紝Events銆両ndustries銆乀eam 鍙€夋嫨鍏蜂綋鍔ㄦ€併€佽涓氭垨鎴愬憳骞跺湪棰勮鍖烘墦寮€瀵瑰簲璇︽儏椤?|
| 2026-05-16 11:45 | cms | 鏂板鍔熻兘 | 鍙鍖栫紪杈戦粯璁ゅ唴瀹硅ˉ榻愰椤垫湇鍔¤涓氥€佽檸璇夎崳瑾夈€佽檸璇夊姩鎬佸拰瀹㈡埛 Logo 鏉＄洰锛屽苟灏嗚繖浜涙潯鐩悓姝ュ埌鐪熷疄瀹樼綉棰勮鐘舵€?|
| 2026-05-16 11:35 | cms | 淇缂洪櫡 | 淇 Puck 鐑敭鐩戝惉鍦ㄩ儴鍒嗚緭鍏ヤ簨浠朵笂瑙﹀彂 `getModifierState` 杩愯鏃堕敊璇紝骞跺皢鍙鍖栫紪杈戠殑 `pageContent` 浣滀负棰勮涓撶敤鍐呭娉ㄥ叆鐪熷疄瀹樼綉椤甸潰瀛楁 |
| 2026-05-16 11:24 | cms | 淇缂洪櫡 | 淇鍙鍖栫紪杈戦瑙堜笉鍝嶅簲鍙充晶杈撳叆鐨勯棶棰橈細棰勮 CMS Provider 璺熼殢鍒濆鐘舵€佹洿鏂板苟绂佺敤浜屾 public 鎷夊彇锛岄椤甸灞忓拰椤佃剼璇诲彇 CMS 棰勮鎬?|
| 2026-05-16 11:13 | cms | UI 璋冩暣 | 鏂囦欢绠＄悊闈㈡澘绉婚櫎绗簩濂楁棫涓婁紶鏂囦欢绛涢€夊拰鍗＄墖鍒楄〃锛屼粎淇濈暀鎬昏銆佷笂浼犲叆鍙ｅ拰 OSS 闈欐€佽祫婧愭祻瑙?|
| 2026-05-16 10:30 | cms | 淇缂洪櫡 | CMS 鎸?slug 閫愰」琛ラ綈鍥㈤槦鎴愬憳鍜?Events 榛樿鍐呭锛涙湇鍔¤涓氬鍔犱腑鑻辨枃璇︽儏椤垫弿杩扮紪杈戝苟鎺ュ叆琛屼笟璇︽儏椤碉紱棣栭〉浜嬩欢杞挱琛ュ厖姝ｆ枃缂栬緫 |
| 2026-05-16 09:14 | cms | 鏂板鍔熻兘 | 鏂板鐪熷疄瀹樼綉鍒楄〃绠＄悊 API 鍜?CMS 闈㈡澘锛屾湇鍔¤涓氥€侀椤佃疆鎾€丒vents銆丆lients銆丠onors銆丆hronicle銆丳artner銆丼enior Associate 鍒楄〃淇濆瓨鍒?`data/cms-site.json` 骞剁敱鍓嶅彴璇诲彇 |
| 2026-05-16 09:36 | cms | 浼樺寲閲嶆瀯 | CMS 鍐呭绠＄悊鎷嗗垎涓洪椤?Events 杞挱銆侀椤?HONORS 杞挱銆佹湇鍔¤涓氥€佽檸璇夎崳瑾夈€佽檸璇夊ぇ浜嬭銆佸悎浼欎汉銆佽祫娣卞緥甯堝拰铏庤瘔鍔ㄦ€侊紱鏂囦欢绠＄悊鏂板 `public/assets` 鍒嗙被 OSS 璧勬簮娴忚 |
| 2026-05-16 09:45 | cms | 鏂板鍔熻兘 | 鐪熷疄瀹樼綉 CMS 澧炲姞鍐呭瑕嗙洊鏁版嵁锛岃檸璇夎崳瑾夈€佽檸璇夊ぇ浜嬭銆佸洟闃熶釜浜轰俊鎭拰铏庤瘔鍔ㄦ€佸彲鍦ㄥ悗鍙扮紪杈戝苟鐢卞墠鍙颁紭鍏堣鍙?|
| 2026-05-16 09:53 | cms | 浼樺寲閲嶆瀯 | 灏嗙湡瀹炲畼缃戝唴瀹硅鐩栫紪杈戜粠 JSON 鏂囨湰妗嗘敼涓哄崱鐗囧紡琛ㄥ崟锛屾敮鎸佷腑鑻辨枃杈撳叆銆佹柊澧炪€佸垹闄ゃ€佸睍寮€鎶樺彔鍜屼笂涓嬬Щ鍔?|
| 2026-05-16 10:01 | cms | 浼樺寲閲嶆瀯 | 绉婚櫎鐪熷疄瀹樼綉鍐呭绠＄悊涓殑 slug/骞翠唤 textarea 鍒楄〃锛屾湇鍔¤涓氥€侀椤佃疆鎾€侀椤?HONORS銆佸洟闃熷拰鍔ㄦ€佹敼涓哄崱鐗囧紡鎺掑簭銆佹柊澧炲拰鍒犻櫎锛涙枃浠剁鐞嗙粺璁＄撼鍏?`public/assets` 闈欐€佽祫婧?|
| 2026-05-16 10:16 | cms | 浼樺寲閲嶆瀯 | CMS 鍐呭闈㈡澘鑷姩鐢ㄥ綋鍓嶅畼缃?Honors銆丆hronicle銆乀eam 鍜?Events 闈欐€佹暟鎹垵濮嬪寲锛涢椤典簨浠惰疆鎾敮鎸佷腑鑻辨枃缂栬緫锛屾湇鍔¤涓氥€佸洟闃熷拰鍔ㄦ€佸崱鐗囧鍔犵缉鐣ュ浘 |
| 2026-05-15 22:51 | cms | 鍒嗘敮鍚堝苟 | 鎸?`main` 浼樺厛绛栫暐灏?`main` 鍚堝苟鍒?`cms`锛屽苟灏?`AppProviders` 鐨?CMS 鍒濆鐘舵€佸弬鏁版敼涓哄彲閫変互鍏煎 `main` 鏍瑰竷灞€ |
| 2026-05-15 22:33 | main | 閮ㄧ讲鍙戝竷 | 灏?`/client` 棣栭〉閲嶅畾鍚戜笌棣栭〉 SEO 鏍囬浼樺寲鍙戝竷鍒扮敓浜х幆澧冿紱鏈嶅姟鍣ㄧ増鏈洰褰曚负 `/opt/tigerpartners-web/releases/20260515-2230`锛岄獙璇?`/client` 杩斿洖 307 鍒?`/`锛岄椤?title/og:title 涓?`铏庤瘔寰嬪笀浜嬪姟鎵€ | Tiger Partners`锛宍WE KNOW HOW TO WIN` 涓嶅啀浣滀负 `h1` |
| 2026-05-15 22:25 | main | SEO 涓庤矾鐢辫皟鏁?| 棣栭〉 metadata title 鏀逛负 `铏庤瘔寰嬪笀浜嬪姟鎵€ | Tiger Partners`锛岄灞忚瑙夊彛鍙?`WE KNOW HOW TO WIN` 浠庤涔?`h1` 鏀逛负绾瑙夋枃鏈紝鏂板闅愯棌璇箟鏍囬 `铏庤瘔寰嬪笀浜嬪姟鎵€ Tiger Partners`锛沗/client` 宸查厤缃噸瀹氬悜鍒伴椤碉紱鐢熶骇鏋勫缓閫氳繃锛屾湭閮ㄧ讲 |
| 2026-05-15 22:15 | main | UI 璋冩暣 | 涓囧姏涓汉椤垫渶鍚庝笁鏉′笟缁╁竷灞€淇濇寔鍥哄畾 `gap-6` 闂磋窛锛屾敼鐢辩 23 鏉″崱鐗囨媺浼稿惛鏀堕澶栭珮搴︼紝瀹炵幇宸︿笂/鍙充笂涓庡乏涓?鍙充笅鍚屾椂瀵归綈锛涙竻鐞?`.next` 鍚庣敓浜ф瀯寤洪€氳繃锛屾湭閮ㄧ讲 |
| 2026-05-15 22:13 | main | UI 璋冩暣 | 涓囧姏涓汉椤?Performance & Achievements 灞曞紑鍖烘渶鍚庝笁鏉℃敼涓轰笓闂ㄦ闈㈠竷灞€锛氬乏鍒楃 23 鍜岀 25 鏉★紝鍙冲垪绗?24 鏉★紝骞跺湪涓ゅ垪搴曢儴瀵归綈锛涚敓浜ф瀯寤洪€氳繃锛屾湭閮ㄧ讲 |
| 2026-05-15 22:01 | main | UI 璋冩暣 | 涓汉绠€鍘嗚鎯呴〉绉诲姩绔?hero 鍖哄潡璋冩暣涓哄浘鐗囧湪涓汉淇℃伅涓婃柟锛涚‘璁や竾鍔涗腑鑻辨枃涓汉涓氱哗鍧囦负 25 鏉′笖鏈€鍚庝笁鏉″熬閮ㄩ『搴忎竴鑷达紱鐢熶骇鏋勫缓閫氳繃锛屾湭閮ㄧ讲 |
| 2026-05-15 21:59 | main | 璧勬簮鏇存柊 | 鍚屾鏇挎崲 event 椤甸潰灏侀潰鍥?`event2.png`銆乣event8.png`銆乣event10.png`銆乣event16.png`锛屽苟灏?`event16` 鏁版嵁寮曠敤浠?`.jpg` 鏀逛负 `.png`锛? 寮犲浘宸蹭笂浼?OSS锛屾牴璺緞鐢熶骇鏋勫缓閫氳繃骞跺彂甯冨埌 `/opt/tigerpartners-web/releases/20260515-2155` |
| 2026-05-15 10:07 | main | 閮ㄧ讲鍙戝竷 | 鏍硅矾寰勭敓浜ф瀯寤洪€氳繃锛屽苟鍙戝竷鍒?`https://www.tigerpartners.cn/`锛涙湇鍔″櫒鐗堟湰鐩綍涓?`/opt/tigerpartners-web/releases/20260515-0957`锛宍tigerpartners-web.service` 宸查噸鍚笖鍏綉鏍￠獙閫氳繃 |
| 2026-06-22 00:53 | cms | 修复缺陷 | 修复首页虎诉动态轮播 CMS 同步时中文被 PowerShell 编码转换为问号的问题，重新写入 UTF-8 中文 |
| 2026-06-22 00:47 | cms | 内容更新 | 将首页虎诉动态轮播的代码默认值、CMS 当前状态和稳定/测试版本 payload 同步为 Markdown 指定的 5 条 |
| 2026-06-22 00:33 | cms | 内容更新 | 首页虎诉动态轮播按 `当前分支首页虎诉动态与新闻轮播内容.md` 固定为 5 条默认内容，并同步 CMS 默认事件顺序 |
| 2026-05-15 09:54 | main | 璧勬簮鏇存柊 | 灏?`src/assets/event/event2` 涓?1-9 鍙峰皝闈㈠悓姝ヨ鐩栧埌 `public/assets/event/event2`锛岀‘淇?event2 椤甸潰鍓?9 寮犲皝闈㈡寜 `1.jpg`銆乣2.jpg`銆乣3.png` 鑷?`9.png` 鐨勫懡鍚嶉『搴忚鍙栵紱鏈瀯寤恒€佹湭閮ㄧ讲 |
| 2026-05-15 09:46 | main | 鏁版嵁鏇存柊 | 鎸?`EN/liwanPerformance.md` 鍚屾涓囧姏涓汉璇︽儏椤典腑鑻辨枃 Performance & Achievements锛屽叡 25 鏉★紝涓枃涓庤嫳鏂囧潎鎸夋簮鏂囨。椤哄簭灞曠ず锛涙湭鏋勫缓銆佹湭閮ㄧ讲 |
| 2026-05-15 09:41 | main | 鏁版嵁鏇存柊 | 浠?Events 瀵煎嚭鐧藉悕鍗曠Щ闄?`20200902`锛屼簨浠堕〉涓嶅啀灞曠ず鈥滄灙鐐竴鍝?榛勯噾涓囦袱 | 鍏充簬姘戦棿鍊熻捶鍒╃巼鍙告硶淇濇姢瑙勫垯璋冩暣鐨勮В璇烩€濓紱婧愭暟鎹笌闂茬疆璇︽儏鍥炬槧灏勪繚鐣欙紝鏈儴缃?|
| 2026-05-15 09:29 | main | 瑙嗚涓庢枃妗堟洿鏂?| Cyber Tech and Game 鍦ㄩ椤点€両ndustries 鍒楄〃椤靛拰璇︽儏椤电粺涓€浣跨敤 `/assets/home/INDUSTRIES6.png`锛汬ome/About Honors 鑻辨枃璇存槑缁熶竴涓烘寚瀹氫笁琛岋紝閬垮厤 `By Multiple...` 琚媶寮€锛涙湰鍦扮被鍨嬫鏌ラ€氳繃锛屾湭閮ㄧ讲 |
| 2026-05-15 09:22 | main | 鏁版嵁鏇存柊 | Events 椤甸潰鏂板浜嬩欢鍦ㄥ鍑烘椂鎸?`/assets/event/event2/` 鍥剧墖鏂囦欢鍚嶆暟瀛楅『搴忔帓搴忥紝纭繚鍗＄墖鎸?`1` 鑷?`15` 鐨勫懡鍚嶉『搴忓睍绀猴紱鏈湴绫诲瀷妫€鏌ラ€氳繃锛屾湭閮ㄧ讲 |
| 2026-05-15 09:08 | main | 鏁版嵁鏇存柊 | Events 鏃т簨浠惰鎯呭浘鏀圭敤 `eventinfo` 涓寚瀹氬懡鍚嶆枃浠讹細`20210414-1`銆乣20210720-1/2/3`锛屽苟涓?`20210414`銆乣20210315` 鑻辨枃姝ｆ枃琛ュ浘鐗囧崰浣嶏紱`20210315-1` 褰撳墠鏈湪鐩綍涓紝鍏堟寜鐜版湁涓ゅ紶 `20210315-2` 鏂囦欢娓叉煋 |
| 2026-05-15 09:01 | main | 鏁版嵁鏇存柊 | 鎸?`EN/event.md` 淇 Events 涓?`20210720`銆乣20200927` 涓ゆ潯浜嬩欢鑻辨枃鏍囬銆佹憳瑕佸拰姝ｆ枃锛屽苟涓?`20210720` 璇︽儏椤垫柊澧炰笁寮犳彃鍥炬槧灏勶紱鏈湴绫诲瀷妫€鏌ラ€氳繃锛屾湭閮ㄧ讲 |
| 2026-05-15 08:56 | main | 瑙嗚浼樺寲 | 鍥㈤槦涓汉璇︽儏椤垫墜鏈虹 Hero 鏀逛负浣跨敤 `team1.png` 鑷?`team6.png` 鍥㈤槦鍗＄墖鍥撅紝骞跺皢涓汉淇℃伅缃簬鍥剧墖涓婃柟閬垮厤閲嶅彔锛涙湰鍦扮被鍨嬫鏌ラ€氳繃锛屾湭閮ㄧ讲 |
| 2026-05-15 08:52 | main | 鏁版嵁鏇存柊 | 涓?Events 鏃т簨浠?`20210414` 鍜?`20210315` 澧炲姞璇︽儏椤靛浘鐗囨槧灏勶紝鍒嗗埆澶嶇敤鐜版湁 `event25.png`銆乣event27.png`锛涙湰鍦扮被鍨嬫鏌ラ€氳繃锛屾湭閮ㄧ讲 |
| 2026-05-15 08:48 | main | 鏁版嵁鏇存柊 | Zoe Zhang 涓汉椤垫湇鍔¤涓氭敼涓烘寚瀹氫腑鑻辨枃浜旈」锛屽苟灏?Events 宸叉湁鐨?`20210720`銆乣20200927` 涓ゆ潯浜嬩欢鍔犲叆瀵煎嚭鐧藉悕鍗曪紱鏈敼鍔ㄤ簨浠舵簮 md 鏂囦欢锛屾湭閮ㄧ讲 |
| 2026-05-15 01:25 | main | 鏂囨鏇存柊 | 鎸?`EN/zoePerformance.md` 灏?Zoe Zhang 涓汉璇︽儏椤?Performance & Achievements 鏇存柊涓?24 鏉′腑鑻辨枃涓氱哗锛屾湰娆′慨鏀规湭閮ㄧ讲 |
| 2026-05-15 01:24 | main | 璧勬簮鍙戝竷 | 灏?01:20 鐨勬枃妗堜笌璧勬簮璋冩暣鏋勫缓鍙戝竷鍒?`/opt/tigerpartners-web/releases/20260515-0122`锛屾湇鍔￠噸鍚苟閫氳繃鏈嶅姟鍣ㄦ湰鏈?3004 楠岃瘉 |
| 2026-05-15 01:20 | main | 鏂囨涓庤祫婧愭洿鏂?| 鏇存柊棣栭〉銆丄bout銆丗ooter銆乀eam 澶氬鑻辨枃鍒嗚鏂囨锛屼慨姝?Home 琛屼笟绗叚寮犺儗鏅浘銆丄bout Honors 骞翠唤榛勭嚎瀵归綈锛屽苟鍚屾 event2 1/2 鍥惧拰 Mengcheng Yun 鍥剧墖鍒?OSS |
| 2026-05-13 01:02 | main | 璧勬簮鍙戝竷 | 鍚屾 About 鍥剧墖鐩綍鍒?OSS锛屽苟灏嗗綋鍓嶆牴璺緞鏋勫缓鍙戝竷鍒?`/opt/tigerpartners-web/releases/20260513-0058`锛屽叕缃戦獙璇侀€氳繃 |
| 2026-05-13 00:46 | main | 鏂囨淇 | 娓呯悊 `src/data/event2Events.ts` 涓嫳鏂囦簨浠舵暟鎹噷鐨?mojibake 鏍囩偣锛屾寜 `EN/event2.md` 鎭㈠鏅鸿兘寮曞彿銆佹墍鏈夋牸鍜岃繛鎺ュ彿 |
| 2026-05-13 00:39 | main | 鏂囨淇 | 鎸?`EN/event2.md` 淇 2024.11.13 CIETAC Cup 浜嬩欢鑻辨枃娈佃惤涓殑涔辩爜寮曞彿鍜屾墍鏈夋牸 |
| 2026-05-13 00:35 | main | 璧勬簮鍙戝竷 | 灏嗗綋鍓嶆牴璺緞鏋勫缓鍙戝竷鍒?`/opt/tigerpartners-web/releases/20260513-0028` 骞堕噸鍚寮忕珯鏈嶅姟锛屽叕缃?HTTPS 楠岃瘉閫氳繃 |
| 2026-05-13 00:25 | main | 瑙嗚浼樺寲 | 淇 About Chronicle 鎵嬫満绔勾浠芥寜閽€佹椂闂寸嚎鍗＄墖鍜屾爣棰樿鏄庣殑妯悜婧㈠嚭 |
| 2026-05-13 00:20 | main | 瑙嗚浼樺寲 | 淇绉诲姩绔?Home Honors銆丠ome Events 杞挱鎺у埗銆丄bout Vision銆丄bout Honors 鍜?Our Team 棣栧睆鐨勬í鍚戞孩鍑轰笌闂磋窛闂 |
| 2026-05-13 00:09 | main | 瑙嗚浼樺寲 | 浠呬繚鐣?Our Team 鎵嬫満绔?Hero 鍥炬寜瀹藉害鑷€傚簲锛屽叾浠栭〉闈㈡仮澶嶄笂涓€鐗?Hero 濯掍綋閾烘弧锛屽苟鍘嬪皬绉诲姩绔灞忔爣棰樺瓧鍙?|
| 2026-05-13 00:02 | main | 瑙嗚浼樺寲 | 鎵嬫満绔?Hero 濯掍綋鍙栨秷 `height: 100%`锛屼粎寮哄埗瀹藉害 100%锛屾闈㈢缁х画淇濇寔瀹瑰櫒楂樺害閾烘弧 |
| 2026-05-12 23:55 | main | 瑙嗚浼樺寲 | 鎵嬫満绔〉闈㈢骇 Hero 鍥剧墖鍜岄椤?Hero 瑙嗛鏀逛负 `w-screen` 瑙嗗彛瀹藉害閾烘弧灞忓箷锛屾闈㈢淇濇寔鐖跺鍣ㄥ搴?|
| 2026-05-12 23:49 | main | 淇缂洪櫡 | 淇 event2 璇︽儏鍥?`detailImages` 涔辩爜鏂囦欢鍚嶏紝鎭㈠涓?public 涓湡瀹?`寰俊鍥剧墖_*` 璺緞 |
| 2026-05-12 23:46 | main | 淇缂洪櫡 | 浠?`Chinese/event2.md` 閲嶆柊鍚屾 15 鏉?event2 涓枃浜嬩欢锛屼慨澶嶅墠 15 鏉′腑鏂囦贡鐮?|
| 2026-05-12 23:41 | main | 淇缂洪櫡 | 淇 `src/data/event2Events.ts` 涓枃瀛楃涓茬己灏戦棴鍚堝紩鍙峰鑷寸殑 Unterminated string constant |
| 2026-05-12 23:38 | main | 淇缂洪櫡 | Events 璇︽儏瑙嗛鏀逛负鎸夐涔﹁棰戝崰浣嶇浣嶇疆娓叉煋锛岃€屼笉鏄粺涓€杩藉姞鍒版鏂囨湯灏?|
| 2026-05-12 23:30 | main | 瑙嗚浼樺寲 | 缁熶竴绉诲姩绔悇椤甸潰 Hero 濯掍綋瀹藉害閾烘弧鐖跺鍣紝閬垮厤鎸夊浘鐗囪嚜韬昂瀵告敹缂?|
| 2026-05-12 23:24 | main | 鏂板鍔熻兘 | Events 璇︽儏椤典负 2025.06.17 鍜?2024.11.13 涓ゆ潯鍔ㄦ€佹帴鍏ヨ棰戞挱鏀?|
| 2026-05-12 23:12 | main | 瑙嗚浼樺寲 | 铏庤瘔鍔ㄦ€?Events 鍒楄〃鍗＄墖椤堕儴鍥剧墖姣斾緥浠?16:9 璋冩暣涓?4:3 |
| 2026-05-12 22:40 | main | 鏂囨。鏇存柊 | 纭 About Chronicle 2026 骞翠竴鏈堥挶浼柉澶т腑鍗庡尯鎸囧崡璁板綍宸蹭繚鐣欙紝骞朵慨姝ｆ灦鏋勬枃妗ｅ 2026 骞磋褰曡寖鍥寸殑鎻忚堪 |
| 2026-05-12 22:39 | main | 閰嶇疆鍙樻洿 | 涓烘棫绔欒嫳鏂囧墠缂€ `/en` 鍜?`/en/:path*` 琛ュ厖涓存椂璺宠浆锛屽吋瀹瑰甫 hash 鐨勬棫鑻辨枃鍏ュ彛 |
| 2026-05-12 22:37 | main | 閰嶇疆鍙樻洿 | 涓烘棫绔欎腑鏂囧墠缂€ `/zh` 鍜?`/zh/:path*` 娣诲姞涓存椂璺宠浆锛屽吋瀹规棫榛樿鍏ュ彛閬垮厤 404 |
| 2026-05-12 22:34 | main | 淇缂洪櫡 | 淇 Events 鐐瑰嚮 See More 鍚庤繘鍏ヨ鎯呭啀杩斿洖鏃跺睍寮€鐘舵€佷涪澶憋紝瀵艰嚧鏃犳硶鍥炲埌鍘熷垪琛ㄤ綅缃殑闂 |
| 2026-05-12 22:30 | main | 鏂囨鏇存柊 | 鍒樼厹鏆勪腑鑻辨枃鑽ｈ獕璇存槑鏀逛负鍐掑彿缁撳熬锛屽苟璁╄崳瑾夊紩瀵艰鏄庝笉鏄剧ず鍒楄〃鍦嗙偣 |
| 2026-05-12 22:20 | main | 鏂囨鏇存柊 | 鎸変腑鑻辨枃 CHRONICLE.md 鏍″噯 About Chronicle 2026 骞?3-5 鏈堟柊澧炰簨浠讹紝淇涓枃涔辩爜骞惰ˉ榻愪簲鏈堜富瑕佽鍒ら鍩?|
| 2026-05-12 22:18 | main | 璧勬簮鍙戝竷 | 鍚屾鏂扮増 About Hero銆丮engcheng Yun 鍥㈤槦鍗＄墖鍥惧拰涓汉璇︽儏鍥惧埌 public锛屽苟璁╁洟闃熷崱鐗囪鍙栨柊鐗?PNG |
| 2026-05-12 22:07 | main | 鏂板鍔熻兘 | 鏂板鍏ㄧ珯绂佺敤娴忚鍣ㄧ缉鏀捐鍒欙紝缁撳悎 viewport metadata銆佸鎴风浜嬩欢鎷︽埅鍜屽叏灞€ touch-action |
| 2026-05-12 22:03 | main | 瑙嗚浼樺寲 | Core Value 鑻辨枃姝ｆ枃鍙栨秷涓ょ瀵归綈锛屾敼涓哄乏瀵归綈鍜屾洿绱у噾琛岄珮锛岄伩鍏嶅崟璇嶉棿璺濊鎷夊紑 |
| 2026-05-12 21:55 | main | 淇缂洪櫡 | 淇 Home 鏍囩椤垫爣棰樸€佺Щ鍔ㄧ Hero 濯掍綋閾烘弧銆丄bout Chronicle 瀹屾暣鏂囨銆佸洟闃熶釜浜轰笟缁╁畬鏁存枃妗堝拰 Core Value 缂哄け娈佃惤锛屽苟鍚屾鏂扮増 event2 鍥剧墖鍒?public/OSS |
| 2026-05-12 02:01 | main | 璧勬簮鍙戝竷 | 鏁存壒涓婁紶 OSS 涓?`husuweb/assets/home/clientLogo/` 鐨?42 涓鎴?Logo锛屽垹闄よ鐢ㄧ殑 `client-logo-26.png` 鍜?`client-logo-42.png`锛屽苟瀹屾垚绾夸笂鏍￠獙 |
| 2026-05-12 01:57 | main | 璧勬簮鍙戝竷 | 鏁存壒涓婁紶 OSS 涓?`husuweb/assets/event/event2/` 鍜?`husuweb/assets/event/eventinfo2/` 鍏?40 涓浘鐗囨枃浠讹紝骞堕€愪釜瀹屾垚涓嬭浇鍥炴簮鍝堝笇鏍￠獙 |
| 2026-05-12 01:52 | main | 璧勬簮鍙戝竷 | 瑕嗙洊涓婁紶 OSS 涓?About Hero銆丗ooter 浜岀淮鐮佸拰閭变紵甯嗗洟闃熷浘 `team6.webp`锛屽苟瀹屾垚绾夸笂鍝堝笇鏍￠獙 |
| 2026-05-12 01:40 | main | 閰嶇疆鍙樻洿 | 灏嗚檸璇夊畼缃戜粠 `/opt/daxuanweb-root` 杩佺Щ鍒扮嫭绔嬬洰褰?`/opt/tigerpartners-web`锛屾柊寤?`tigerpartners-web.service` 骞舵敼鐢?`127.0.0.1:3004` |
| 2026-05-12 01:18 | main | 閰嶇疆鍙樻洿 | 涓?`www.tigerpartners.cn` 閰嶇疆 Nginx `server_name` 鍜?Let's Encrypt HTTPS 璇佷功锛屽惎鐢?HTTP 鑷姩璺宠浆 HTTPS |
| 2026-05-12 00:52 | main | 閰嶇疆鍙樻洿 | 灏嗗綋鍓?Next standalone 鍙戝竷鍖呴儴缃插埌鏂版湇鍔″櫒鏍硅矾寰?`http://39.106.226.65/`锛屾部鐢?`daxuanweb-root.service` 鍜?Nginx `/` 鍙嶄唬 |
| 2026-05-11 23:49 | main | 淇缂洪櫡 | About Honors 鍚屼竴骞村唴鎸夋湀浠介檷搴忓睍绀猴紝鏈堜唤澶х殑鑽ｈ獕鎺掑湪涓婃柟 |
| 2026-05-11 23:45 | main | 瑙嗚浼樺寲 | 棣栭〉 Clients Logo 澧欐粴鍔ㄩ€熷害鎻愬崌鍒板師鏉ョ殑 1.3 鍊?|
| 2026-05-11 23:41 | main | 璧勬簮鍙戝竷 | About Hero 鍒囨崲鍥?`/assets/about/hero.png` 骞跺悓姝ユ柊鐗?hero 鍥惧埌 public |
| 2026-05-11 23:36 | main | 瑙嗚浼樺寲 | 浜嬩欢璇︽儏椤靛彇娑堝彸渚у皝闈㈠浘鍒楋紝姝ｆ枃鍗犳弧鐖跺鍣紝姝ｆ枃鎻掑浘妗岄潰瀹藉害鏀逛负 70% |
| 2026-05-11 23:33 | main | 璧勬簮鍙戝竷 | 鍚屾鏂扮増 Footer 浜岀淮鐮佸埌 public锛屽苟鍒锋柊 `SiteFooter` 浜岀淮鐮?URL 鐗堟湰鍙傛暟 |
| 2026-05-11 23:28 | main | 鏂板鍔熻兘 | 鏃?28 鏉?Events 璇︽儏椤垫帴鍏?eventinfo 椤哄簭鍥剧墖锛屽苟鏀寔琛屽唴 `[鍥剧墖` 鍗犱綅绗︽彃鍥炬覆鏌?|
| 2026-05-11 23:21 | main | 鏂板鍔熻兘 | Events 鏂板 event2 涓嫳鏂?15 鏉′簨浠讹紝鎺ュ叆 event2 鍒楄〃鍥惧拰 eventinfo2 璇︽儏鍗犱綅鍥鹃『搴忔覆鏌?|
| 2026-05-11 23:00 | main | 鏂囨鏇存柊 | 鎸夌敤鎴锋寚瀹氫腑鏂囩簿纭帾杈炴洿鏂?About Chronicle 2026 骞?3-5 鏈堜笁鏉′腑鏂囪褰?|
| 2026-05-11 22:49 | main | 淇缂洪櫡 | Events 鏁版嵁鎸?`EN/event.md` 鏀舵暃鍒?28 鏉★紝涓枃鏃ユ湡鏀逛负 `YYYY.MM.DD`锛屼慨澶嶆棤鍒嗙被浜嬩欢鏍囬鍓嶇疆 `|`锛屽苟涓鸿鎯呰繑鍥炲鍔犳粴鍔ㄤ綅缃仮澶?|
| 2026-05-04 17:32 | main | 鏂板鍔熻兘 | 鍩轰簬 `tech.md` 鍜?`ada.md` 鎼缓 Next 瀹樼綉棣栫増锛岃縼绉婚椤典笌 About 椤甸潰锛屾渶灏忓寲渚濊禆骞跺垏鎹?Yarn |
| 2026-05-04 17:57 | main | 鏂板鍔熻兘 | 鎺ュ叆鏈嶅姟琛屼笟銆佷簨浠躲€佽仈绯绘垜浠笁涓柊澧炲師鍨嬮〉闈紝琛ュ厖瀵瑰簲璺敱鍜屽叕鍏辩礌鏉?|
| 2026-05-04 18:03 | main | 浼樺寲閲嶆瀯 | 鏍规嵁澶у睆鑷€傚簲瑙勮寖鍔犲叆 rem 鏍瑰瓧鍙风缉鏀剧瓥鐣ワ紝骞跺皝椤跺埌 22px |
| 2026-05-04 18:08 | main | 浼樺寲閲嶆瀯 | 灏嗘墍鏈夐〉闈㈠睍绀虹粍浠朵粠 `src/app` 鎶藉埌 `src/components/pages`锛岃矾鐢辨枃浠朵粎淇濈暀 metadata 鍜屽叆鍙?|
| 2026-05-04 18:33 | main | 浼樺寲閲嶆瀯 | 鏍规嵁 `OVERALL/title/word.md` 閲嶅仛椤堕儴 title 瀵艰埅锛屽姞鍏?logo銆佷腑鑻辨枃鍒囨崲銆佹粴鍔ㄨ儗鏅拰 hover 涓嬪垝绾垮姩鐢?|
| 2026-05-04 22:54 | main | 鏂板鍔熻兘 | 鏍规嵁 `OVERALL/home/word.md` 閲嶅仛棣栭〉 Hero銆乂ision銆佽涓氬崱鐗囥€丠onors 鏃堕棿杞淬€丒vents 涓夊崱杞挱鍜?Clients Logo 澧欎氦浜?|
| 2026-05-04 22:54 | main | 閰嶇疆鍙樻洿 | 鎵╁睍 `tsconfig.json` 鍘熷瀷鐩綍鎺掗櫎鑼冨洿锛屼娇褰撳墠 Next 涓诲簲鐢ㄦ瀯寤哄拰绫诲瀷妫€鏌ラ€氳繃 |
| 2026-05-04 23:07 | main | 浼樺寲閲嶆瀯 | 鏍规嵁 `OVERALL/about/word.md` 璋冩暣 About Hero 涓嬫柟 Vision 鍗＄墖銆丠onors 鎶樺彔鏍峰紡鍜?Chronicle 鎶樺彔鏃堕棿杞?|
| 2026-05-04 23:21 | main | 浼樺寲閲嶆瀯 | 鏍规嵁 `OVERALL/foot/word.md` 缁熶竴鍏ㄧ珯 Footer锛屽苟鎺ュ叆 foot 鐩綍涓嬬殑 logo銆佽仈绯诲浘鏍囥€佷簩缁寸爜鍜屽妗堝浘鏍?|
| 2026-05-04 23:29 | main | 浼樺寲閲嶆瀯 | 鏍规嵁 `OVERALL/events/word.md` 璋冩暣 Events Hero 鏂囨娓愬彉銆丩ATEST UPDATES 鍗＄墖 hover 鍔ㄦ晥鍜屽浘鐗囧亸绉?|
| 2026-05-04 23:41 | main | 浼樺寲閲嶆瀯 | 寰皟 About Honors 灞曞紑澶撮儴鑳屾櫙銆丆hronicle 涓酱灞曞紑鍔ㄦ晥鍜?Culture 宸﹀浘 hover/leave 鍔ㄦ晥 |
| 2026-05-04 23:41 | main | 閰嶇疆鍙樻洿 | 灏?`鎴戠殑鍥㈤槦` 鍘熷瀷鐩綍鍔犲叆 `tsconfig.json` 鎺掗櫎鍒楄〃锛岄伩鍏嶆棫鍘熷瀷渚濊禆褰卞搷涓诲簲鐢ㄧ被鍨嬫鏌?|
| 2026-05-04 23:43 | main | 鏂板鍔熻兘 | 鍩轰簬 `鎴戠殑鍥㈤槦/` 鍘熷瀷鏂板 `/team` 鍥㈤槦椤碉紝鎺ュ叆瀵艰埅銆佸洟闃熺礌鏉愩€佷汉鐗╁崱鐗囧拰鍏ㄧ珯椤佃剼 |
| 2026-05-05 13:06 | main | 浼樺寲閲嶆瀯 | 鏍规嵁棣栭〉琛ュ厖鍙嶉璋冩暣 Hero 鍗曡銆乂ision 杈硅窛鍜屾棆杞爣棰樸€佹寜閽牱寮忋€佹爣棰樺瓧鍙枫€佹枃妗堟崲琛屻€丒vents 鍗＄墖闂磋窛鍜屽鎴?Logo 閫熷害 |
| 2026-05-05 13:21 | main | 浼樺寲閲嶆瀯 | 淇棣栭〉 Hero 瀛楀彿銆乂ision 瑁佸垏銆両ndustries 鏍囬灏哄鍜?Events 杞挱鍥剧墖/鐏板崱杩炴帴闂 |
| 2026-05-05 13:21 | main | 閰嶇疆鍙樻洿 | 杩藉姞鎺掗櫎 `core value`銆乣涓汉浠嬬粛璇︽儏`銆乣浜嬩欢璇︽儏`銆乣琛屼笟璇︽儏` 鍘熷瀷鐩綍锛屾仮澶嶄富搴旂敤绫诲瀷妫€鏌?|
| 2026-05-05 13:31 | main | 鏂板鍔熻兘 | 鍩轰簬 `core value/` 鍘熷瀷鏂板 `/about/core-value` 瀛愰〉闈紝骞舵帴鍏?Culture 鐨?Read Full Manifesto 鎸夐挳 |
| 2026-05-05 13:31 | main | 浼樺寲閲嶆瀯 | 璋冩暣 About Hero 鐏拌壊 Vision 鍗＄墖浣嶇疆锛岀畝鍖?Culture 鏂囨骞舵洿鏂板彸渚ц儗鏅笌宸﹀浘娓愬彉 |
| 2026-05-05 13:36 | main | 浼樺寲閲嶆瀯 | 璋冩暣 Team Hero 瀛楀彿鍜屽叏瀹藉浘鐗囥€丼pecial Forces 涓よ鎺掔増銆丼enior Associate 鏍囬浣嶇疆锛屽苟绉婚櫎浜虹墿鍥剧伆鑹茶挋灞?|
| 2026-05-05 13:39 | main | 鏂板鍔熻兘 | 鍩轰簬 `涓汉浠嬬粛璇︽儏/` 鍘熷瀷鏂板 `/team/yuxuan-liu` 涓汉璇︽儏椤碉紝骞跺皢 Team 鍗＄墖 Find out more 閾炬帴鎺ュ叆璇ヨ矾鐢?|
| 2026-05-05 13:48 | main | 鏂板鍔熻兘 | 鍩轰簬 `琛屼笟璇︽儏/` 鍘熷瀷鏂板 `/industries/[slug]` 琛屼笟璇︽儏椤碉紝骞跺皢 Industries 鍏釜鍗＄墖鎺ュ叆璇︽儏璺敱 |
| 2026-05-05 13:48 | main | 浼樺寲閲嶆瀯 | 璋冩暣 Industries 鍗＄墖缃戞牸涓?1 / 3 / 2 涓夎甯冨眬锛岀浜岃宸︿晶 40% 瀹姐€佸彸渚т袱鍗″钩鍒嗗墿浣欏搴?|
| 2026-05-05 13:52 | main | 鏂板鍔熻兘 | 鍩轰簬 `浜嬩欢璇︽儏/` 鍘熷瀷鏂板 `/events/[slug]` 浜嬩欢璇︽儏椤碉紝骞跺皢 Events 鍗＄墖鎺ュ叆璇︽儏璺敱 |
| 2026-05-05 13:52 | main | 浼樺寲閲嶆瀯 | 璋冩暣 Events Hero 涓哄眳涓爣棰樻鏂囧拰鍏ㄥ睆娓愬彉鑳屾櫙锛屽苟灏?Latest Updates 鏀逛负涓夊垪涓夎 |
| 2026-05-05 16:13 | main | 浼樺寲閲嶆瀯 | 灏嗗叏绔?title 瀵艰埅鍜屼富瑕佸唴瀹瑰３灞傛闈㈠乏鍙宠竟璺濈粺涓€璋冩暣涓?`12rem` |
| 2026-05-05 16:20 | main | 浼樺寲閲嶆瀯 | 灏嗗叏绔?rem 缂╂斁绛栫暐鏀逛负浠?1920px 涓哄熀鍑嗭紝1440px 绛夋瘮缂╁皬 |
| 2026-05-05 16:24 | main | 浼樺寲閲嶆瀯 | 灏嗗叕鍏?title logo 鏀惧ぇ 1.3 鍊嶏紝瀵艰埅鏂囧瓧鏀惧ぇ 1.4 鍊?|
| 2026-05-05 16:26 | main | 浼樺寲閲嶆瀯 | 灏嗗叕鍏?title logo 缁х画鏀惧ぇ 1.2 鍊嶃€佸鑸枃瀛楃户缁斁澶?1.4 鍊嶏紝骞惰缃笂涓?padding 涓?`1.2rem` |
| 2026-05-05 16:27 | main | 浼樺寲閲嶆瀯 | 灏嗛椤?Hero 鏍囬 `we know how to win` 瀛楀彿鏀惧ぇ 1.1 鍊?|
| 2026-05-05 16:34 | main | 浼樺寲閲嶆瀯 | 璋冩暣棣栭〉 Vision 灞忚儗鏅€佸崱鐗囪竟璺濄€佷笁琛屾鏂囧拰 Get To Know Us 鎸夐挳鏍峰紡 |
| 2026-05-05 16:38 | main | 浼樺寲閲嶆瀯 | 淇棣栭〉 Vision 鎸夐挳榛樿鐧藉簳榛戝瓧銆佸崱鐗囧璺濆拰鍙充晶 Vision 瀹氫綅 |
| 2026-05-05 16:41 | main | 浼樺寲閲嶆瀯 | 灏嗛椤?Vision 姝ｆ枃瀛楀彿缁х画鏀惧ぇ 1.2 鍊嶏紝骞朵慨姝ｅ乏渚ф枃瀛楀埌瑙嗙獥 12rem 鍐呭绾?|
| 2026-05-05 16:42 | main | 浼樺寲閲嶆瀯 | 灏嗛椤?Vision 鍙充晶鏍囪瘑鏀逛负鏃嬭浆 180 搴︼紝骞跺皢瀛楀彿缂╁皬鍒板綋鍓?90% |
| 2026-05-05 16:43 | main | 浼樺寲閲嶆瀯 | 灏嗛椤?Vision 鍙充晶鏍囪瘑浠?180 搴﹁皟鏁翠负 270 搴︽棆杞?|
| 2026-05-05 16:44 | main | 浼樺寲閲嶆瀯 | 灏嗛椤?Industries & Services 璇存槑姝ｆ枃鏀惧ぇ鍒?1.8 鍊嶅苟鍗犳弧鐖跺鍣?|
| 2026-05-05 16:46 | main | 浼樺寲閲嶆瀯 | 绉婚櫎棣栭〉 Industries 鍗＄墖 hover 鍚庢爣棰樹笅鏂圭殑姝ｆ枃鎻忚堪 |
| 2026-05-05 16:47 | main | 浼樺寲閲嶆瀯 | 绉婚櫎棣栭〉 Industries 鍗＄墖鍖哄簳閮ㄦí绾匡紝骞跺皢 Honors 鍙充晶璇存槑鏂囧瓧鏀惧ぇ 1.4 鍊?|
| 2026-05-05 16:52 | main | 浼樺寲閲嶆瀯 | 璋冩暣棣栭〉 Honors 瀵归綈涓庡唴瀹瑰瓧鍙凤紝绉婚櫎 See More锛屽苟鏀惧ぇ Events 鍙充晶璇存槑鍜岃疆鎾崱鐗囬棿璺?|
| 2026-05-05 16:55 | main | 浼樺寲閲嶆瀯 | 璋冩暣棣栭〉 Clients 鏍囬宸﹁竟璺濅负 `5rem`锛屽苟绉婚櫎 Logo 澧欏乏鍙抽粦鑹叉笎闅愯挋灞?|
| 2026-05-05 16:58 | main | 浼樺寲閲嶆瀯 | 璋冩暣 About Hero 鏍囬缁勫拰鐏拌壊 Vision 鏂瑰潡鐨勯灞忓瀭鐩翠綅缃?|
| 2026-05-05 17:01 | main | 浼樺寲閲嶆瀯 | 灏嗛椤电浜屽睆 Vision 鑳屾櫙鏀逛负閲嶅绾圭悊鍙犲姞妯悜娓愬彉 |
| 2026-05-05 17:01 | main | 浼樺寲閲嶆瀯 | 淇棣栭〉 Vision 娓愬彉绾圭悊浣滅敤鑼冨洿锛屽皢鍏朵粠鏁村睆鑳屾櫙绉诲埌鍗＄墖鑳屾櫙 |
| 2026-05-05 17:02 | main | 浼樺寲閲嶆瀯 | 绉婚櫎棣栭〉 Vision 鍗＄墖鑳屾櫙绾圭悊锛屾敼涓哄乏涓婂埌鍙充笅瀵硅绾挎笎鍙?|
| 2026-05-05 17:03 | main | 浼樺寲閲嶆瀯 | 绉婚櫎棣栭〉 Vision 鍗＄墖涓婁笅榛戣壊閬僵 |
| 2026-05-05 17:04 | main | 浼樺寲閲嶆瀯 | 璋冩暣棣栭〉 Vision 鍗＄墖娓愬彉涓婇儴棰滆壊锛屼娇鍏舵洿鍋忕伆 |
| 2026-05-05 17:05 | main | 浼樺寲閲嶆瀯 | 缁х画鍘嬫殫棣栭〉 Vision 鍗＄墖娓愬彉涓婇儴棰滆壊 |
| 2026-05-05 17:05 | main | 浼樺寲閲嶆瀯 | 鍐嶆鍘嬫殫棣栭〉 Vision 鍗＄墖娓愬彉涓婇儴棰滆壊 |
| 2026-05-05 17:17 | main | 浼樺寲閲嶆瀯 | 灏嗛椤?Vision 鍗＄墖娓愬彉璧峰鑹叉爣璋冩暣涓?`rgb(36, 36, 36) 9%` |
| 2026-05-05 17:35 | main | 浼樺寲閲嶆瀯 | 鎺ュ叆 `src/font/poppins.ttf` 鏈湴瀛椾綋锛屼娇鍏ㄧ珯鏂囧瓧榛樿浣跨敤 Poppins |
| 2026-05-05 17:52 | main | 浼樺寲閲嶆瀯 | 璋冩暣 About Hero銆丠onors銆丆ulture銆丆hronicle 鐨勬帓鐗堛€佹笎鍙樸€侀鑹插拰灞曞紑鏍峰紡 |
| 2026-05-05 17:59 | main | 浼樺寲閲嶆瀯 | 璋冩暣 Team 椤?Special Forces 鏍囬闂磋窛銆丳artner 鍒嗗尯鍜屼汉鐗╁崱鐗囬摼鎺ユ牱寮?|
| 2026-05-05 18:08 | main | 浼樺寲閲嶆瀯 | 璋冩暣 Industries 椤?Hero 瀵归綈銆佽鏄庡崱鐗囨笎鍙樺拰琛屼笟鍗＄墖缃戞牸灏哄 |
| 2026-05-05 18:12 | main | 浼樺寲閲嶆瀯 | 鎭㈠ Industries 璇存槑鍗＄墖寮曞彿瑁呴グ锛屽苟鎷夋弧琛屼笟鍗＄墖鏍囬涓嬪垝绾?|
| 2026-05-05 18:17 | main | 浼樺寲閲嶆瀯 | 璋冩暣 Events Hero 娓愬彉鑳屾櫙鑼冨洿锛岀Щ闄ょ浜屽睆鏍囬骞舵仮澶嶅崱鐗囧浘鐗囧僵鑹?|
| 2026-05-05 18:22 | main | 浼樺寲閲嶆瀯 | 璋冩暣 Events Hero 涓庣浜屽睆澶栬窛锛屽苟绮剧畝浜嬩欢鍗＄墖鍐呭 |
| 2026-05-05 18:23 | main | 浼樺寲閲嶆瀯 | 灏?Events 绗簩灞忎簨浠跺崱鐗囦箣闂寸殑闂磋窛鎵╁ぇ 3 鍊?|
| 2026-05-05 18:24 | main | 浼樺寲閲嶆瀯 | 灏?Events 鍗＄墖鍥剧墖鍚戜笂鍚戝乏鍋忕Щ閲忕缉灏忓埌鍘熸潵鐨?33% |
| 2026-05-05 18:26 | main | 浼樺寲閲嶆瀯 | 璋冩暣 Events 鍗＄墖鏃ユ湡涓庡浘鐗囬棿璺濓紝骞剁缉灏忓彸涓嬭涓夎褰㈤珮搴?|
| 2026-05-05 18:27 | main | 浼樺寲閲嶆瀯 | 灏?Events 鍗＄墖鏃ユ湡涓庡浘鐗囬棿璺濈户缁鍔?3rem |
| 2026-05-05 18:28 | main | 浼樺寲閲嶆瀯 | 缂╁皬 Events 鍗＄墖鏍囬瀛楀彿骞舵仮澶嶅崱鐗囩旱鍚戦棿璺?|
| 2026-05-05 20:40 | main | 浼樺寲閲嶆瀯 | 灏?Contact 椤典富瑕佸唴瀹瑰乏杈硅窛缁熶竴璋冩暣涓?`9rem` |
| 2026-05-05 20:49 | main | 浼樺寲閲嶆瀯 | 淇 About Culture 鍖哄潡鑳屾櫙鑹层€佸浘鐗囧帇鏆楅伄缃╁拰鍙充晶姘村嵃鏁堟灉 |
| 2026-05-05 20:55 | main | 浼樺寲閲嶆瀯 | 闄嶄綆 About Culture 涓婚伄缃╁乏渚ч€忔槑搴︼紝閬垮厤瑕嗙洊鏁村紶宸﹀浘 |
| 2026-05-05 20:59 | main | 浼樺寲閲嶆瀯 | 鎷夊 About Culture 宸﹀浘鍒板彸渚ц儗鏅殑妫曢噾娓愬彉杩囨浮鑼冨洿 |
| 2026-05-05 21:00 | main | 浼樺寲閲嶆瀯 | 鍘婚櫎 About Culture 宸﹀浘涓讳綋鍖哄煙鐨勯浘鍖栭伄缃╂晥鏋?|
| 2026-05-05 21:02 | main | 浼樺寲閲嶆瀯 | 鍙栨秷 About Culture 澶栧眰鑳屾櫙鑹插拰宸﹀浘鍖哄煙妫曡壊钂欏眰 |
| 2026-05-05 21:03 | main | 浼樺寲閲嶆瀯 | 灏?About Culture 鍖哄潡鏀逛负鍏ㄥ鏃犲杈硅窛涓旈珮搴︾害 80vh |
| 2026-05-05 21:05 | main | 浼樺寲閲嶆瀯 | 涓?About Culture 宸﹀浘鍙充晶 30% 澧炲姞鑳屾櫙鑹插埌閫忔槑鐨勬笎鍙?|
| 2026-05-05 21:16 | main | 浼樺寲閲嶆瀯 | 灏?Contact 鍩庡競鍥剧墖妯″潡绉诲姩鍒?Hero 涓嬫柟锛屽苟鏀逛负宸︿俊鎭彸鍥剧墖鍙屾爮 |
| 2026-05-05 21:18 | main | 浼樺寲閲嶆瀯 | 灏?Contact us 鍙屾爮妯″潡宸︿晶鏂囧瓧鍜屽浘鏍囨敼涓洪粦鑹?|
| 2026-05-05 21:23 | main | 浼樺寲閲嶆瀯 | 璋冩暣 Contact 鎷涜仒鍗＄墖缂栧彿銆佺畝鍘嗛偖绠卞榻愬拰鍙充晶涓夎褰㈣儗鏅?|
| 2026-05-05 21:25 | main | 浼樺寲閲嶆瀯 | 淇 Contact 鍙充晶涓夎褰㈣儗鏅粓鐐癸紝浣垮叾杩炴帴鍒?Footer 椤堕儴涓棿 |
| 2026-05-05 21:26 | main | 浼樺寲閲嶆瀯 | 璋冩暣 Contact 鍊欓€変汉鍗＄墖涓嬪垝绾夸笂杈硅窛鍜屼笁瑙掑舰瑕嗙洊灞傜骇 |
| 2026-05-05 21:28 | main | 浼樺寲閲嶆瀯 | 鍔犵矖 Contact 鍊欓€変汉鍗＄墖涓嬪垝绾匡紝骞跺皢涓夎褰㈡敼鍥炲簳灞傝儗鏅?|
| 2026-05-05 21:29 | main | 浼樺寲閲嶆瀯 | 璋冩暣 Contact 涓夎褰负楂樹簬鍗＄墖鑳屾櫙涓斾綆浜庡崱鐗囧唴瀹圭殑涓棿灞?|
| 2026-05-05 21:30 | main | 浼樺寲閲嶆瀯 | 璋冩暣 Contact 鍊欓€変汉鍗＄墖涓烘埅鍥炬晥鏋滅殑娣辫壊鑳屾櫙銆佷笁瑙掑舰灞傜骇鍜岀矖鏂滀綋姝ｆ枃 |
| 2026-05-05 21:32 | main | 浼樺寲閲嶆瀯 | 灏?Contact 鍙充晶涓夎褰㈤敋鐐规敼鍒板€欓€変汉鍗＄墖鍖哄煙椤堕儴 |
| 2026-05-05 21:36 | main | 浼樺寲閲嶆瀯 | 鎾ゅ洖涓婁竴杞?Contact 涓夎褰㈤敋鐐规敼鍔紝鎭㈠鍒版嫑鑱樺尯鏁翠綋瀹瑰櫒 |
| 2026-05-05 21:50 | main | 鏂板鍔熻兘 | 涓洪椤点€丄bout銆乀eam銆両ndustries 鍜?Events 娣诲姞椤甸潰绾т綆灞傜骇鏂滀笁瑙掕楗?|
| 2026-05-05 21:54 | main | 浼樺寲閲嶆瀯 | 缁熶竴椤甸潰涓夎褰㈠舰鐘跺拰灞傜骇锛屽苟涓?Contact 涓夎褰㈠鍔?30% 閫忔槑搴?|
| 2026-05-05 21:58 | main | 浼樺寲閲嶆瀯 | 灏嗛〉闈笁瑙掑舰閫忔槑搴﹁皟鏁翠负 50%锛屽苟鎶婇潪 Contact 椤靛簳閮ㄥ乏椤剁偣鏀瑰埌 40% |
| 2026-05-06 21:42 | main | 浼樺寲閲嶆瀯 | 璋冩暣棣栭〉 Hero銆乂ision銆両ndustries銆丠onors 鍜?Events 杞挱鐨勫瓧閲嶃€佸瓧鍙蜂笌鍐呭甯冨眬 |
| 2026-05-06 21:55 | main | 浼樺寲閲嶆瀯 | 鎸?1920 璁捐鍩哄噯灏嗛椤垫牳蹇冨瓧浣撳昂瀵告崲绠椾负 rem锛屽苟瀹屽杽 Events 杞挱璇存槑鐩掓笎鍙樺拰涓夎褰㈣楗?|
| 2026-05-06 22:00 | main | 浼樺寲閲嶆瀯 | 璋冩暣棣栭〉 Events 杞挱鍥剧墖涓庤鏄庣洅鍒嗙鏂瑰紡锛岀Щ闄ゅ灞傝竟妗嗗苟灏嗗浘鐗囨枃妗堢Щ鍔ㄥ埌宸︿笅瑙?|
| 2026-05-06 22:05 | main | 浼樺寲閲嶆瀯 | 灏嗛椤?Events 杞挱鑸炲彴鏀逛负鍗犳弧鐖跺鍣紝骞舵妸杞挱鍗″浘鐗囧搴︽寜 995px 鎹㈢畻涓?`62.1875rem` |
| 2026-05-06 22:06 | main | 淇缂洪櫡 | 绉婚櫎棣栭〉 Events 杞挱璇存槑鏂囧瓧鐨勫崟琛屾埅鏂紝浣夸笅鏂瑰崱鐗囧畬鏁存崲琛屽睍绀烘枃妗?|
| 2026-05-06 22:07 | main | 浼樺寲閲嶆瀯 | 灏嗛椤?Events 鍥剧墖鏂囨宸﹁窛鍜屼笅鏂硅鏄庡崱宸﹀彸鍐呰竟璺濇寜 89px 鎹㈢畻涓?`5.5625rem` |
| 2026-05-06 22:09 | main | 淇缂洪櫡 | 淇棣栭〉 Events 鍥剧墖鏂囨宸﹁窛鍩哄噯鍜屾爣棰樺乏绔栫嚎鑼冨洿锛屽苟鍔犻珮杞挱鑸炲彴閬垮厤璇存槑鍗¤鎴柇 |
| 2026-05-06 22:31 | main | 浼樺寲閲嶆瀯 | 灏?Home銆丄bout銆乀eam銆両ndustries銆丒vents 鍜?Contact 鐨?Hero 鑳屾櫙鍒囨崲涓哄鑸洰褰曚笅鐨勬湰鍦?`hero.png` 绱犳潗 |
| 2026-05-06 22:33 | main | 浼樺寲閲嶆瀯 | 鎻愰珮棣栭〉 Hero 鏈湴鑳屾櫙鍥句寒搴︼紝闄嶄綆棣栧睆榛戣壊閬僵寮哄害骞剁缉鐭簳閮ㄦ殫鑹茶繃娓￠珮搴?|
| 2026-05-06 22:35 | main | 浼樺寲閲嶆瀯 | 绉婚櫎棣栭〉 Hero 鏁村睆閬僵锛屼粎淇濈暀搴曢儴 30% 鏆楄壊娓愬彉杩囨浮 |
| 2026-05-06 22:37 | main | 浼樺寲閲嶆瀯 | 灏嗛椤电浜屽睆鍗＄墖鍙充晶 Vision 鏍囪瘑鏀逛负姝ｅ父瀛楅噸锛屽苟鍙栨秷寮哄埗澶у啓 |
| 2026-05-06 22:40 | main | 浼樺寲閲嶆瀯 | 涓洪椤?Industries & Services 鏍囬涓嬫柟澧炲姞鐏拌壊涓嬪垝绾匡紝骞舵帴鍏ユ湰鍦?Industries 鍗＄墖鍥剧墖绱犳潗 |
| 2026-05-06 22:52 | main | 浼樺寲閲嶆瀯 | 灏嗛椤?Industries & Services 鐏拌壊涓嬪垝绾夸粠鏍囬涓嬫柟绉诲姩鍒拌鏄庢鏂囦笅鏂?|
| 2026-05-06 22:54 | main | 浼樺寲閲嶆瀯 | 璋冩暣棣栭〉 Honors 浜斾釜骞翠唤鎸夐挳涓?20px銆佸乏瀵归綈銆乥old 瀛楅噸 |
| 2026-05-06 22:55 | main | 浼樺寲閲嶆瀯 | 璋冩暣棣栭〉 Events 杞挱锛屼娇涓嬫柟璇存槑鍗′粎鍦ㄥ綋鍓嶅睍绀虹殑 active 鍗＄墖涓樉绀?|
| 2026-05-06 22:56 | main | 浼樺寲閲嶆瀯 | 缂╁皬棣栭〉 Events 杞挱涓嬫柟鎺у埗鎸夐挳涓?active 璇存槑鍗＄殑鍨傜洿璺濈 |
| 2026-05-06 23:00 | main | 浼樺寲閲嶆瀯 | 璋冩暣 About Hero 鏍囬涓?96px semibold锛屾鏂囦负 32px medium italic |
| 2026-05-06 23:01 | main | 浼樺寲閲嶆瀯 | 璋冩暣 About Vision 鍗＄墖璇存槑鏂囧瓧涓?24px medium |
| 2026-05-06 23:06 | main | 浼樺寲閲嶆瀯 | 鎸?1920 鍩哄噯璋冩暣 About Vision銆丠onors 鍜?Culture 鍖哄潡鐨勫瓧鍙枫€佸瓧閲嶄笌濂栭」鏂囨 |
| 2026-05-06 23:07 | main | 浼樺寲閲嶆瀯 | 璋冩暣 About Culture 姝ｆ枃/鎸夐挳鍜?Chronicle 鍖哄潡鏍囬銆佸勾浠姐€佹湀浠姐€佹鏂囩殑瀛楀彿瀛楅噸 |
| 2026-05-06 23:09 | main | 浼樺寲閲嶆瀯 | 绉婚櫎 About Hero 棣栧睆钂欏眰锛屼娇娓愬彉钂欏眰浠庣涓€灞忎箣鍚庡紑濮?|
| 2026-05-06 23:12 | main | 浼樺寲閲嶆瀯 | 涓?About Vision 鍗＄墖鎺ュ叆鏈湴鑳屾櫙鍥撅紝骞跺皢璇存槑鏂囧瓧鍥哄畾涓轰袱琛岄噾鑹叉枃鏈?|
| 2026-05-06 23:13 | main | 浼樺寲閲嶆瀯 | 淇 About Vision 璇存槑绗簩琛屾崲琛岄棶棰橈紝寮哄埗绗簩琛屼繚鎸佸崟琛屾樉绀?|
| 2026-05-06 23:16 | main | 浼樺寲閲嶆瀯 | 璋冩暣 About Honors 椤堕儴鏍囬涓庤鏄庢帓鐗堬紝浣胯鏄庡彸瀵归綈涓旂浜岃涓嶆崲琛?|
| 2026-05-06 23:17 | main | 浼樺寲閲嶆瀯 | 灏?About Honors 椤堕儴璇存槑鍙宠竟鐣屽榻愬埌灞忓箷鍙充晶鍐呭绾匡紝鍏佽瓒呭嚭鏍囬澹冲眰 |
| 2026-05-06 23:19 | main | 淇缂洪櫡 | 绉婚櫎 About Honors 椤堕儴璇存槑璐熷彸澶栬窛锛岄伩鍏嶅彸渚ф鏂囪秴鍑鸿绐?|
| 2026-05-06 23:20 | main | 浼樺寲閲嶆瀯 | 灏?About Honors 椤堕儴璇存槑鍙宠竟鐣屾敼涓虹埗鍏冪礌鏈€鍙充晶锛屽苟璁?Vision 鑳屾櫙鍥炬樉寮忔弧楂橀摵婊″崱鐗?|
| 2026-05-06 23:31 | main | 浼樺寲閲嶆瀯 | 鏍规嵁 `teamInfo.md` 鍜屾湰鍦?team 鍥剧墖璋冩暣 Our Team 椤?Hero銆丼pecial Forces銆佹垚鍛樺崱鐗囧唴瀹瑰拰瀛椾綋瑙勬牸 |
| 2026-05-06 23:40 | main | 浼樺寲閲嶆瀯 | 鏍规嵁鏈湴 industries 鍥剧墖鍜屽瓧鍙疯姹傝皟鏁?Industries 椤?Hero 鏍囬銆佽鏄庡崱鐗囧拰鍏釜琛屼笟鍗＄墖 |
| 2026-05-06 23:43 | main | 浼樺寲閲嶆瀯 | 璋冩暣 Industries 鍗＄墖鏂囨鎹㈣锛屽苟鎸夋湰鍦?event 鍥剧墖鍜屽瓧浣撹姹傛洿鏂?Events Hero 涓庝簨浠跺崱鐗?|
| 2026-05-06 23:47 | main | 浼樺寲閲嶆瀯 | 鎸夋寚瀹氬瓧浣撹鏍艰皟鏁?Contact 椤?Hero銆丆ontact us銆丣oin Us銆佸€欓€変汉鍗＄墖鍜岀畝鍘嗛偖绠辨彁绀?|
| 2026-05-06 23:48 | main | 浼樺寲閲嶆瀯 | 灏?Industries 椤?Hero 鏍囬椤堕儴浣嶇疆璋冩暣涓?590px 璁捐鍩哄噯 |
| 2026-05-06 23:52 | main | 浼樺寲閲嶆瀯 | 灏?Team 椤?Zoe Zhang 鐨勫浘鐗囧垏鎹负鏈湴 `/assets/team/team4.png` |
| 2026-05-07 00:08 | main | 浼樺寲閲嶆瀯 | 鎸夋寚瀹氭埅鍥剧粨鏋勯噸鎺?Team 涓汉璇︽儏椤?Hero銆佷俊鎭粙缁嶃€丒xperience 鍜?Performance 鍖哄潡 |
| 2026-05-07 00:17 | main | 浼樺寲閲嶆瀯 | 璋冩暣 Team 涓汉璇︽儏椤?Hero 楂樺害銆佷汉鐗╁浘鏉ユ簮銆佷俊鎭尯鎺掑竷鍜?Experience 鍙屾爮鍐呭 |
| 2026-05-07 00:21 | main | 淇缂洪櫡 | 淇 Team 涓汉璇︽儏椤?View more 鏃犲搷搴旈棶棰橈紝鏀圭敤鍘熺敓 details/summary 灞曞紑 Honors 鍜?Performance 鏇村鍐呭 |
| 2026-05-07 00:23 | main | 浼樺寲閲嶆瀯 | 璋冩暣 Team 涓汉璇︽儏椤甸潰鍖呭睉鏉′负榛戣壊鑳屾櫙锛屽苟灏嗗綋鍓嶉」 Yuxuan Liu 鏀逛负鐧借壊 |
| 2026-05-07 00:27 | main | 浼樺寲閲嶆瀯 | 璋冩暣 Industries 绗簩灞忓崱鐗囧竷灞€锛屽苟璁╄涓氳鎯呴〉浣跨敤瀵瑰簲鍗＄墖鍥剧墖鍜?`industriesInfo.md` 鍐呭 |
| 2026-05-07 00:28 | main | 浼樺寲閲嶆瀯 | 鎸夋寚瀹氬瓧鍙峰拰鍐呭閲嶆帓浜嬩欢璇︽儏椤碉紝淇濈暀鏍囬銆佹棩鏈熴€佷富璇存槑鍜?Educational Background |
| 2026-05-07 00:42 | main | 浼樺寲閲嶆瀯 | Core Value 椤甸潰鎺ュ叆鍙傝€?EventLandingPage 鐨勬粴鍔ㄥ唴瀹逛笌鍙充晶鍥剧墖鍫嗗彔鎻ず鍔ㄧ敾 |
| 2026-05-07 00:44 | main | 浼樺寲閲嶆瀯 | 璋冩暣 Core Value 鍙充晶鍥剧墖鍫嗗彔 sticky 鍋忕Щ锛屾暣浣撲笅绉?5rem |
| 2026-05-07 00:46 | main | 浼樺寲閲嶆瀯 | 璋冩暣 Core Value 浠峰€艰鏍囬鍜屾鏂囨枃瀛楄鏍硷紝骞舵洿鏂?No.1 Tiger 鏂囨 |
| 2026-05-07 00:48 | main | 浼樺寲閲嶆瀯 | 绉婚櫎 Core Value 婊氬姩鍖洪澶栧紩瀵兼枃妗堝拰鏍囬涓嬪垝绾匡紝鑳屾櫙鏀逛负 #171717 骞惰皟鏁村彸渚у浘鐗?sticky 浣嶇疆 |
| 2026-05-07 00:50 | main | 浼樺寲閲嶆瀯 | 閲嶆柊瀵归綈 EventLandingPage 鐨?sticky 鍥剧墖缁撴瀯锛孋ore Value 鍙充晶鍥剧墖鏀逛负 top-0 鍏ㄥ睆鍚搁《瀹瑰櫒 |
| 2026-05-07 00:53 | main | 浼樺寲閲嶆瀯 | Core Value 鍥剧墖鍫嗗彔鍔ㄧ敾鏀逛负鍙傝€冧簨浠?copy 椤圭洰鐨?fixed-height absolute stack 瀹炵幇 |
| 2026-05-07 00:56 | main | 浼樺寲閲嶆瀯 | Core Value 婊氬姩杩涘害璁＄畻杩涗竴姝ュ榻愪簨浠?copy 椤圭洰锛屽苟鎺掗櫎浜嬩欢 copy 鍘熷瀷鐩綍鐨勭被鍨嬫鏌?|
| 2026-05-07 01:01 | main | 淇缂洪櫡 | 灏?Our Team 鐨?Find out more 浠庡浐瀹?Yuxuan Liu 鏀逛负鎸夋垚鍛?slug 璺宠浆瀵瑰簲涓汉璇︽儏 |
| 2026-05-07 01:02 | main | 淇缂洪櫡 | 淇 Core Value 鍙充晶鍥剧墖鏍堝寘瑁瑰眰瀹藉害濉岄櫡瀵艰嚧鍥剧墖涓嶅彲瑙佺殑闂 |
| 2026-05-07 01:04 | main | 淇缂洪櫡 | 绉婚櫎 Core Value 椤甸潰 main 鐨?overflow-x-hidden锛岄伩鍏嶇鍏?overflow 褰卞搷鍙充晶鍥剧墖 sticky 鍥哄畾 |
| 2026-05-07 01:05 | main | 浼樺寲閲嶆瀯 | 灏?Core Value 鍙充晶 sticky 鍥剧墖鍫嗘暣浣撳悜涓婄Щ鍔?5rem |
| 2026-05-07 01:17 | main | 閰嶇疆鍙樻洿 | 鎸?`/offweb` 瀛愯矾寰勯噸鏂版墦鍖呭苟閮ㄧ讲 standalone 杩愯鍖咃紝鏂板 offweb 閮ㄧ讲璇存槑 |
| 2026-05-07 01:25 | main | 淇缂洪櫡 | 涓?`ImageWithFallback` 澧炲姞 basePath 闈欐€佽祫婧愬墠缂€澶勭悊锛屼慨澶?offweb 瀛愯矾寰勯儴缃插浘鐗囧姞杞藉け璐?|
| 2026-05-07 09:35 | main | 淇缂洪櫡 | 淇 About 鍒?Core Value 鐨勫瓙璺緞璺宠浆锛屽苟鏂板鑷畾涔?404 Return Home 鍥炲埌 `/offweb/` |
| 2026-05-07 22:07 | main | 浼樺寲閲嶆瀯 | 璋冩暣棣栭〉 Honors/Events 鏁版嵁鏉ユ簮涓?See More 甯冨眬锛屽苟鏇存柊 Clients 鍖哄煙鏍峰紡 |
| 2026-05-07 22:16 | main | 浼樺寲閲嶆瀯 | 寰皟棣栭〉 Vision 鎸夐挳瀛楄窛銆佽儗鏅笁瑙掑舰灞傜骇銆丒vents 鎺у埗鍖轰笌鏃ユ湡鏍煎紡锛屽苟鎭㈠ Clients 灞忔繁鑹茶儗鏅?|
| 2026-05-07 22:22 | main | 淇缂洪櫡 | 淇棣栭〉 Header 鍥哄畾灞傜骇銆佽儗鏅笁瑙掑舰鍙鎬с€丒vents 鎺у埗鍖鸿创鍙冲拰 About Honors 鏂囨/鏃ユ湡瀵归綈 |
| 2026-05-07 22:32 | main | 浼樺寲閲嶆瀯 | 鎸?EN 鏂囨。閲嶅缓 About Honors 鍜?Chronicle 鏁版嵁锛岃皟鏁?Chronicle See More 灞曞紑鏇村锛屽苟寮卞寲棣栭〉涓夎褰?|
| 2026-05-07 22:38 | main | 浼樺寲閲嶆瀯 | 灏?Title 鑻辨枃瀵艰埅鏀逛负婧愮爜澶у啓锛屽苟鎸夊弬鑰冨浘璋冩暣 About Honors 鏍囬璇存槑涓?View Award 瀵归綈鏂瑰紡 |
| 2026-05-07 22:45 | main | 浼樺寲閲嶆瀯 | 鎸?EN/teamInfo.md 琛ラ綈 Team Profile 涓氱哗鏁版嵁锛岄殣钘忕┖ Honors锛屽苟缁熶竴 View More 灞曞紑鍔ㄧ敾 |
| 2026-05-07 22:52 | main | 浼樺寲閲嶆瀯 | Events 椤垫帴鍏?EN/event.md 鍏ㄩ噺浜嬩欢鏁版嵁锛岀粺涓€ See More 鍔ㄦ晥锛屽苟寰皟棣栭〉 Events 涓?About 鎸夐挳鏍峰紡 |
| 2026-05-07 22:57 | main | 淇缂洪櫡 | 闄嶄綆棣栭〉鍜?About 涓夎褰㈣儗鏅眰绾э紝缁熶竴鏀惰捣鏂囨涓?COLLAPSE锛屽苟璋冩暣 Chronicle See More 鎸夐挳鍔ㄦ晥 |
| 2026-05-07 23:04 | main | 浼樺寲閲嶆瀯 | 璋冩暣棣栭〉 Hero 鏍囬娓愬彉銆丆lients Logo 鍒嗙粍涓庡渾瑙掞紝骞朵负 About Honors 灞曞紑鍖烘帴鍏?awardbg 鍙充晶鑳屾櫙 |
| 2026-05-07 23:12 | main | 浼樺寲閲嶆瀯 | 涓?About Honors 鐨?View Award 鎸夐挳鎺ュ叆 EN/award.md 涓搴旂殑寰俊鍏紬鍙烽摼鎺?|
| 2026-05-07 23:26 | main | 鏂板鍔熻兘 | 鏂板鍏ㄧ珯璇█ Provider 鍜屼腑鏂囬〉闈㈡枃妗堥厤缃紝鎺ュ叆椤靛ご銆侀〉鑴氥€侀椤点€丄bout銆丆ore Value銆乀eam銆両ndustries銆丒vents銆丆ontact 鐨勪腑鑻辨枃鍒囨崲 |
| 2026-05-08 00:05 | main | 鏂板鍔熻兘 | 鎸?Chinese 鏁版嵁鏂囨。琛ュ厖棣栭〉 Honors/Events銆丄bout Honors/Chronicle 鍜?Team 鍗＄墖鐨勪腑鏂囧垪琛ㄦ暟鎹?|
| 2026-05-08 00:22 | main | 鏂板鍔熻兘 | 鍥㈤槦涓汉璇︽儏椤垫帴鍏?`Chinese/teamInfo.md` 涓枃璇︽儏鏁版嵁锛屾敮鎸佸叚浣嶆垚鍛樿鎯呴〉涓讳綋鍐呭涓枃鍒囨崲 |
| 2026-05-08 00:26 | main | 鏂板鍔熻兘 | 琛屼笟璇︽儏椤垫帴鍏?`Chinese/industriesInfo.md` 涓枃鍐呭锛屾敮鎸佸叚涓涓氳鎯呴〉姝ｆ枃涓枃鍒囨崲 |
| 2026-05-08 00:29 | main | 浼樺寲閲嶆瀯 | 灏嗗叕鍏辨敹璧锋寜閽腑鏂囨枃妗堜粠 `COLLAPSE` 璋冩暣涓?`鏀惰捣` |
| 2026-05-08 00:33 | main | 淇缂洪櫡 | 灏嗚涓氳鎯呴〉 metadata 鏁版嵁鎷嗗埌鏈嶅姟绔畨鍏ㄦā鍧楋紝淇 `generateMetadata` 璇诲彇瀹㈡埛绔粍浠跺鍑哄鑷寸殑 undefined 鎶ラ敊 |
| 2026-05-08 00:41 | main | 淇缂洪櫡 | 淇鏈嶅姟琛屼笟鍒楄〃椤靛崱鐗囦腑鏂囨枃妗堝鐢ㄩ椤?labels 瀵艰嚧涓庡崱鐗囬摼鎺ョ洰鏍囬敊浣嶇殑闂 |
| 2026-05-08 09:29 | main | 浼樺寲閲嶆瀯 | 鎸?`img.md` 涓哄ぇ鍥剧敓鎴?WebP 鐗堟湰锛岃皟鏁村浘鐗囧姞杞戒紭鍏堢骇鍜?Core Value 婊氬姩璁＄畻绛栫暐锛屽苟浼樺寲 offweb 鍙戝竷鍖呭浘鐗囦綋绉?|
| 2026-05-08 21:38 | main | 淇缂洪櫡 | 鎭㈠ hover 鍥剧墖娓愯繘缂╂斁鎵嬫劅锛屼氦浜掑浘鐗囦笉鍐嶄娇鐢?lazy 骞舵敼涓哄悓姝ヨВ鐮?|
| 2026-05-08 21:47 | main | 淇缂洪櫡 | 淇 Clients Logo 澧?hover 鏆傚仠鍜屽姩鐢绘椂闀夸緷璧?inline style 瀵艰嚧鐨勪笉婊氬姩闂 |
| 2026-05-08 21:51 | main | 淇缂洪櫡 | 鏀剁獎 `prefers-reduced-motion` 鍏ㄥ眬瑙勫垯锛岄伩鍏嶇郴缁熷姩鏁堝亸濂界鐢ㄥ叏绔?hover/transition/animation |
| 2026-05-08 22:19 | main | 浼樺寲閲嶆瀯 | 棣栭〉 Hero 鏀硅棰戣儗鏅拰娴佸厜鏍囬锛岃ˉ榻?Honors 骞翠唤涓庤涓氳鎯呰烦杞紝鏂板涓ゆ潯浜嬩欢骞朵慨澶?About 浜や簰 |
| 2026-05-08 22:21 | main | 鏂囨。鏇存柊 | 鏄庣‘棣栭〉 Hero 浣跨敤瑙嗛涓嶈蛋鍘嬬缉鍥撅紝鍏朵粬椤甸潰鍜屽崱鐗囧ぇ鍥剧户缁娇鐢?WebP |
| 2026-05-08 22:30 | main | 浼樺寲閲嶆瀯 | 棣栭〉 Events 杞挱鎺ュ叆 `20210218`銆乣20201023` 鍜?`event4/event5`锛孒onors 骞翠唤鏉℃敼涓?5 涓竴灞忚疆鎾獥鍙?|
| 2026-05-08 22:40 | main | 浼樺寲閲嶆瀯 | 鏇存柊涓枃鏂囨銆佸洟闃熸暀鑲茶儗鏅垎娈靛睍绀猴紝骞跺皢 Header/Footer logo 鍒囨崲涓?SVG |
| 2026-05-08 22:44 | main | 浼樺寲閲嶆瀯 | 鍥哄畾 Title logo 瀹藉害涓?86px銆丗ooter logo 瀹藉害涓?152px |
| 2026-05-08 22:46 | main | 浼樺寲閲嶆瀯 | 灏?Title/Footer logo 瀹藉害鎸?rem 琛ㄨ揪骞舵暣浣撴斁澶т袱鍊?|
| 2026-05-08 22:55 | main | 浼樺寲閲嶆瀯 | 鍚屾鏇挎崲鍚庣殑浜岀淮鐮併€丷eal Estate銆丆ulture 鍜屽洟闃熷浘鐗囪祫婧愶紝骞剁缉灏忛椤?Vision 涓枃鏍囪瘑 |
| 2026-05-08 22:58 | main | 浼樺寲閲嶆瀯 | 璋冩暣棣栭〉 Honors 宸﹀彸鎸夐挳涓虹Щ鍔ㄥ綋鍓嶉€変腑骞翠唤骞舵敮鎸侀灏惧惊鐜?|
| 2026-05-08 23:02 | main | 浼樺寲閲嶆瀯 | 鍚屾鏂扮増 logo.svg锛屽苟灏?Title/Footer logo 鏄剧ず瀹藉害缂╁洖褰撳墠鐨?50% |
| 2026-05-08 23:05 | main | 浼樺寲閲嶆瀯 | 灏嗛椤?Clients logo 鍥剧墖楂樺害璋冩暣涓哄崰鐖跺鍣?80% |
| 2026-05-08 23:08 | main | 浼樺寲閲嶆瀯 | 琛ラ綈鏂板 Events 鑻辨枃鏍囬锛屽苟涓洪椤?Events 杞挱鍔犲叆 5 绉掕嚜鍔ㄦ挱鏀?|
| 2026-05-08 23:18 | main | 淇缂洪櫡 | 棣栭〉 Events 鑷姩杞挱鍦?active 鍙樺寲鍚庨噸鏂拌鏃讹紝閬垮厤棣栧熬鎵嬪姩鍒囨崲鏃跺彔鍔犺烦鍔?|
| 2026-05-08 23:22 | main | 浼樺寲閲嶆瀯 | About Vision 鏀逛负鑷劧楂樺害甯冨眬锛孋ulture 宸﹀浘鍘昏挋灞傦紝Contact us 宸︽爮鑳屾櫙鏀逛负 `#A1865F` |
| 2026-05-09 08:50 | main | 浼樺寲閲嶆瀯 | Mengcheng Yun 涓汉璇︽儏椤甸殣钘忕┖ Social Engagements 鍖哄潡 |
| 2026-05-09 08:53 | main | 閰嶇疆鍙樻洿 | 鏂板 OSS 璧勬簮鍓嶇紑鍒囨崲锛屽浘鐗囥€佽棰戝拰瀛椾綋鍙湪鐢熶骇鐜鍔犺浇 OSS 璧勬簮 |
| 2026-05-09 08:57 | main | 璧勬簮鏁寸悊 | 灏?`src/assets/event` 涓?156-193 鍙峰井淇″浘鐗囨寜椤哄簭閲嶅懡鍚嶄负 `event2` 鍒?`event39` |
| 2026-05-09 09:07 | main | 璧勬簮鏁寸悊 | 鎸夌己鍥剧紪鍙疯烦杩?`event7`銆乣event10`銆乣event18`锛屽皢浜嬩欢婧愮礌鏉愰『搴忓欢浼稿埌 `event42` |
| 2026-05-09 09:16 | main | 鏁版嵁涓庤祫婧愭洿鏂?| Events 椤甸潰鎺ュ叆 42 鏉＄湡瀹炰簨浠跺浘鐗囧拰涓嫳鏂囩湡瀹炲唴瀹癸紝璇︽儏椤垫覆鏌撶湡瀹炴鏂囨钀?|
| 2026-05-09 09:25 | main | 璧勬簮鍙戝竷 | 灏?42 寮犵湡瀹?Events 鍥剧墖鍚屾涓婁紶鍒?OSS 鐨?`husuweb/assets/event/` 鍓嶇紑 |
| 2026-05-09 09:29 | main | 瀛愰〉闈氦浜掍紭鍖?| Culture 鏀逛负 Contact us 闀滃儚鍙屾爮鏁堟灉锛屽瓙椤甸潰缁熶竴闈㈠寘灞戝拰杩斿洖椤堕儴锛屽苟淇 Team 涓夎褰㈤伄鎸?|
| 2026-05-09 09:33 | main | 淇缂洪櫡 | 娓呯悊浜嬩欢璇︽儏椤垫鏂囦腑鐨?`[鍥剧墖]` 鍗犱綅鏂囨湰锛屽苟淇閲嶅 React key 璀﹀憡 |
| 2026-05-09 09:35 | main | 淇缂洪櫡 | 淇涓枃浜嬩欢鍒嗙被瑙ｆ瀽娈嬬暀锛屽幓闄も€滆檸璇夊姩鎬佲€濆墠鐨?`????` 鍓嶇紑 |
| 2026-05-09 09:41 | main | 瑙嗚涓庤祫婧愯皟鏁?| Core Value 婊氬姩鍥剧墖鏀逛负 16:14 妯悜姣斾緥锛屽悇椤甸潰 Hero 鍥惧紩鐢ㄤ粠 WebP 鍒囧洖 PNG |
| 2026-05-10 00:09 | main | 棣栭〉涓庡瓙椤甸潰浜や簰浼樺寲 | 璇█鎸夐挳鏄剧ず鐩爣璇█锛岄椤?Events 鍗＄墖璺宠浆璇︽儏锛孋lients/浜岀淮鐮?鍥㈤槦璧勬簮鍚屾锛岃涓氳鎯呴潰鍖呭睉鍥為椤碉紝Zoe 鏁欒偛鑳屾櫙鏀逛负鍥涙 |
| 2026-05-10 00:15 | main | 淇缂洪櫡 | 淇 Core Value 涓枃绌虹紪鍙峰鑷寸殑閲嶅 key 璀﹀憡锛屽苟涓?About Vision See More 鎺ュ叆涓夋灞曞紑鏂囨 |
| 2026-05-10 00:21 | main | 浜や簰浼樺寲 | About Vision See More 灞曞紑鍚庡垏鎹负 Collapse/鏀惰捣锛屾敮鎸佸啀娆＄偣鍑绘敹璧?|
| 2026-05-10 00:28 | main | 璧勬簮鍙戝竷 | 瑕嗙洊涓婁紶 Footer 鍥剧墖鍒?OSS锛屽苟涓?Footer 浜岀淮鐮?URL 澧炲姞鐗堟湰鍙傛暟閬垮厤鏃х紦瀛?|
| 2026-05-10 11:02 | main | 淇缂洪櫡 | 淇 Zoe 涓枃鎵т笟缁忛獙瀛楃涓茶娉曢敊璇紝骞跺湪鍥㈤槦涓汉璇︽儏 Hero 閭涓婃柟娣诲姞鐢佃瘽 |
| 2026-05-10 11:03 | main | 鏂囨鎺掔増 | 灏?Zoe Zhang 涓枃鎵т笟缁忛獙鎸夋崲琛屾媶鍒嗕负涓ゆ鏄剧ず |
| 2026-05-10 11:07 | main | 鏂板鍔熻兘 | Footer 鐨?Disclaimer and Privacy 鏀逛负鐐瑰嚮寮圭獥灞曠ず鍏嶈矗澹版槑涓庨殣绉佹潯娆?|
| 2026-05-10 11:10 | main | 浼樺寲閲嶆瀯 | Footer 浜岀淮鐮佸紩鐢ㄥ垏鎹㈠埌鏂扮殑鐗堟湰鍙傛暟锛屽苟灏嗗叕瀹夊妗堝彿鍜?ICP 澶囨鍙锋敼涓哄閾?|
| 2026-05-10 11:14 | main | 鏁版嵁鏇存柊 | 琛ラ綈棣栭〉鍜?About 铏庤瘔鑽ｈ獕涓?2022銆?023銆?024 骞寸己澶辩殑浜旀潯鑽ｈ獕/璧炲姪娲诲姩 |
| 2026-05-10 11:16 | main | 鏂囨鏇存柊 | 鏇存柊 Min Xu 鑻辨枃 Social Engagements锛岃ˉ鍏呬腑鍥戒綋鑲蹭徊瑁佸鍛樹細浠茶鍛樿韩浠藉苟淇瀛楃涓插紩鍙?|
| 2026-05-10 11:26 | main | 鏂囨鏇存柊 | 鎸?`EN/teamInfo.md` 瀵归綈 Li Wan銆乑oe Zhang銆丮engcheng Yun銆乄eifan Qiu 鑻辨枃鍥㈤槦璇︽儏瀛楁 |
| 2026-05-10 11:31 | main | 鏂囨鏇存柊 | 琛屼笟璇︽儏闈㈠寘灞戞敼涓?industries / 褰撳墠琛屼笟锛屽苟琛ラ綈鍥涗釜鑻辨枃琛屼笟璇︽儏缂哄け鍐呭 |
| 2026-05-10 11:51 | main | 鏂囨鏇存柊 | 涓枃鐘舵€佷笅 Footer 闅愮寮圭獥涓?About Vision See More 灞曞紑鍐呭鍒囨崲涓轰腑鏂囨枃妗?|
| 2026-05-10 11:53 | main | 淇缂洪櫡 | 铏庤瘔鍔ㄦ€佸垪琛ㄥ崱鐗囧浘鐗囨敼涓哄畬鏁村睍绀猴紝閬垮厤鐪熷疄浜嬩欢鍥捐瑁佸垏 |
| 2026-05-10 11:55 | main | 瑙嗚浼樺寲 | 椤堕儴瀵艰埅 title active 涓?hover 涓嬪垝绾垮姞绮?|
| 2026-05-10 12:02 | main | 淇缂洪櫡 | 棣栭〉 Events 杞挱鏀逛负澶嶇敤浜嬩欢搴撶湡瀹炲浘鏂囷紝淇鍚庝袱鏉¤檸鐪艰瀵熷浘鏂囬敊浣?|
| 2026-05-10 12:26 | main | 淇缂洪櫡 | Footer 浜岀淮鐮佸埛鏂扮増鏈彿骞跺悓姝ュ彂甯冪洰褰曪紝鏀逛负瀹屾暣灞曠ず閬垮厤瑁佸垏 |
| 2026-05-10 12:27 | main | 瑙嗚浼樺寲 | Events 鍒楄〃鍗＄墖鍥剧墖澧炲姞鍚屽浘妯＄硦鑷€傚簲鑳屾櫙锛屾秷闄?object-contain 鐧借竟 |
| 2026-05-10 12:28 | main | 閰嶇疆鍙樻洿 | 涓婚」鐩?tsconfig 鎺掗櫎鐙珛 cms 宸ヤ綔鍖猴紝閬垮厤鍏舵湭鎺ュ叆渚濊禆褰卞搷瀹樼綉鏋勫缓 |
| 2026-05-10 12:29 | main | 瑙嗚浼樺寲 | Events 鍒楄〃鍗＄墖鍘婚櫎妯＄硦搴曞浘锛屾敼涓哄浘鐗囨湰韬嚜閫傚簲濉弧鍥炬 |
| 2026-05-10 16:16 | main | 璧勬簮涓庤瑙夋洿鏂?| About Hero 寮曠敤鐢ㄦ埛鎸囧畾 about 鍥剧墖锛屽洟闃熶釜浜鸿鎯?Hero 鏀逛负鎸夋垚鍛樹娇鐢?`1.png` 鍒?`6.png` 鍏ㄥ睆灞曠ず |
| 2026-05-10 15:23 | main | 瑙嗚浼樺寲 | 鍥㈤槦涓汉璇︽儏 Hero 鍙栨秷寮哄埗鏁村睆楂樺害锛屽浘鐗囧楂樿窡闅忓浐瀹?Hero 瀹瑰櫒 |
| 2026-05-10 15:25 | main | 瑙嗚浼樺寲 | Team 椤?Hero 鍙栨秷瑙嗗彛楂樺害缁戝畾锛屼釜浜鸿鎯?Hero 淇℃伅鍧楁闈㈠乏璺濇敼涓?`55.625rem` |
| 2026-05-10 15:27 | main | 瑙嗚浼樺寲 | 鍙栨秷鍥㈤槦涓汉璇︽儏椤?Hero 鍥剧墖钂欏眰锛屼繚鐣欏師鍥剧洿鎺ュ睍绀?|
| 2026-05-10 15:43 | main | 浜や簰浼樺寲 | 浜嬩欢璇︽儏椤甸潰鍖呭睉鐖剁骇鏀逛负棣栭〉锛屽苟灏嗗厹搴曡繑鍥炶矾寰勫垏鎹负 `/` |
| 2026-05-10 15:44 | main | 浜や簰浼樺寲 | 鏈嶅姟琛屼笟璇︽儏椤甸潰鍖呭睉鐖剁骇鏀逛负棣栭〉锛屽苟灏嗗厹搴曡繑鍥炶矾寰勫垏鎹负 `/` |
| 2026-05-10 15:50 | main | 淇缂洪櫡 | 绉婚櫎 Footer 浜岀淮鐮佸灞傜櫧鑹茶儗鏅拰鍐呰竟璺濓紝淇濈暀閫忔槑 PNG 鍘熷鏄剧ず |
| 2026-05-10 15:55 | main | 瑙嗚浼樺寲 | About Vision 宸︿笂鍥炬爣鏀逛负绌哄績涓婂紩鍙凤紝Culture 灏?logo 鑳屾櫙鍒囨崲涓?`/assets/about/bg.png` |
| 2026-05-10 15:58 | main | 瑙嗚浼樺寲 | About Vision 绌哄績寮曞彿鏀逛负鐧借壊骞朵笅绉诲埌姝ｆ枃棣栨宸︿晶锛孋ulture 鑳屾櫙灏忓浘缂╁皬鍒?60% |
| 2026-05-10 16:00 | main | 瑙嗚浼樺寲 | About Vision 姝ｆ枃淇濇寔涓庢爣棰樺悓鍒楀榻愶紝寮曞彿鏀逛负璐磋繎姝ｆ枃棣栬鐨勭櫧鑹叉弿杈硅楗?|
| 2026-05-10 16:04 | main | 瑙嗚浼樺寲 | About Vision 寮曞彿鏀圭敤 `Icon.svg`锛屽唴瀹瑰眳涓榻愭爣棰樺尯锛孋ontact us 鑳屾櫙瑁呴グ鏀圭敤 Culture 鍚屾鍥剧墖 |
| 2026-05-10 16:08 | main | 瑙嗚浼樺寲 | About Vision 鏍囬鍜屾鏂囨敼涓哄悓涓€婊″瀹瑰櫒杈圭晫锛宍Icon.svg` 浠ュ唴宓屾诞鍔ㄦ柟寮忚繘鍏ユ鏂囬娈?|
| 2026-05-10 16:11 | main | 瑙嗚浼樺寲 | About Vision 鏍囬琛屽拰姝ｆ枃瀹瑰櫒缁熶竴宸︿晶鍐呯缉锛宍Icon.svg` 浠庢诞鍔ㄦ敼涓烘鏂囬琛岃鍐呭浘鐗?|
| 2026-05-10 23:07 | main | 瑙嗚浼樺寲 | About Vision 姝ｆ枃鎭㈠涓庢爣棰樺悓杈圭晫锛宍Icon.svg` 鏀逛负棣栨宸︿晶缁濆瀹氫綅瑁呴グ骞跺悜宸﹀亸绉?|
| 2026-05-10 23:08 | main | 瑙嗚浼樺寲 | About Vision 棣栨 `Icon.svg` 鏀逛负浠呴鐣?`2rem` 琛屽唴鍗犱綅锛屽浘鏍囧悜宸︿几鍑哄苟璐撮綈棣栬 |
| 2026-05-10 23:10 | main | 瑙嗚浼樺寲 | About Vision 棣栨 `Icon.svg` 瀹氫綅鏀瑰埌 `2rem` 琛屽唴鍗犱綅璧风偣 |
| 2026-05-10 23:12 | main | 瑙嗚浼樺寲 | About Vision 鍐呭鏈€澶у搴︿粠 `88rem` 璋冩暣涓?`95rem` |
| 2026-05-10 23:13 | main | 瑙嗚浼樺寲 | About Vision 姝ｆ枃鍙栨秷宸﹀唴杈硅窛锛岄娈?`Icon.svg` 鍦ㄤ繚鎸佸彸渚т綅缃熀纭€涓婃斁澶т笁鍊?|
| 2026-05-10 23:16 | main | 瑙嗚浼樺寲 | About Vision 棣栨 `Icon.svg` 鏀逛负璐磋繎姝ｆ枃绗竴琛屽乏渚э紝骞跺皢涓婁竴鐗堝昂瀵哥缉灏?50% |
| 2026-05-10 23:22 | main | 瑙嗚浼樺寲 | About Vision 棣栨姝ｆ枃鍜?`Icon.svg` 鏁翠綋鍚戝乏鍋忕Щ `3rem` |
| 2026-05-10 23:23 | main | 瑙嗚浼樺寲 | About Vision 棣栨鍋忕Щ鏀逛负浠呬綔鐢ㄤ簬绗竴琛岋紝鍚庣画鎹㈣鏂囨湰淇濇寔鍘熷榻?|
| 2026-05-10 23:36 | main | 瑙嗚浼樺寲 | 棣栭〉 Events 杞挱鏀逛负鎸囧畾 4 鏉′簨浠讹紝active 璇存槑鍗℃渶澶氭樉绀?5 琛屽苟鐪佺暐瓒呭嚭鍐呭 |
| 2026-05-11 00:51 | main | 浜や簰浼樺寲 | Events 鍜?Industries 璇︽儏椤甸潰鍖呭睉鎸夊叆鍙ｆ潵婧愭樉绀?Home銆丒vents 鎴?Industries锛屽苟淇濈暀闈欐€佹瀯寤?Suspense 杈圭晫 |
| 2026-05-11 00:55 | main | 淇缂洪櫡 | 棣栭〉 Events 杞挱琛ュ洖 Kinsey Kang Yanan 浜嬩欢锛孫SS bucket 鏂板 GET/HEAD CORS 瑙勫垯浠ユ敮鎸佸瓧浣撹法鍩熷姞杞?|

## 椤圭洰杩涘害

| 鏃堕棿 | 鍒嗘敮 | 瀹屾垚鐨勫姛鑳?/ 宸ヤ綔 | 璇存槑 |
| :--- | :--- | :--- | :--- |
| 2026-08-03 22:54 | cms | 正式站团队编辑修复发布 | `www.tigerpartners.cn` 已切换到 `/opt/tigerpartners-web/releases/20260803-2246`；保留正式 CMS 数据和上传素材，发布团队业绩成对编辑与动态同步隔离修复 |
| 2026-08-03 22:22 | cms | 团队业绩成对编辑和动态同步隔离 | 内容管理团队成员个人业绩支持多组中英文编辑、删除和排序；可视化团队页保存不会再重建首页/动态页事件数据 |
| 2026-07-03 00:24 | cms | 正式站代码部署 | `www.tigerpartners.cn` 已切换到 `/opt/tigerpartners-web/releases/20260703-0032`；保留正式 CMS 数据和上传素材，发布空媒体占位与 `[VIDEO]` 规则修复 |
| 2026-07-02 23:56 | cms | 预览空媒体占位清理 | `CmsPuckVisualEditor` 和 `localizeCmsEvent` 区分未配置与已清空的详情图片/视频，空字段会覆盖默认媒体 |
| 2026-07-02 23:43 | cms | 动态详情空视频覆盖默认媒体 | 前台详情页识别 CMS 中存在的详情媒体字段，空视频/图片字段会阻止静态默认媒体回退，避免空输入仍显示播放器 |
| 2026-07-02 23:37 | cms | 动态详情视频占位符改为 `[VIDEO]` | 可视化抽屉、默认 pageContent 字段生成和前台详情页渲染统一识别 `[VIDEO]`；空视频输入不生成前台视频标签 |
| 2026-07-02 23:32 | cms | 动态详情视频说明补充 | 可视化动态详情抽屉说明文字明确通过视频占位符生成 `Detail video N` 字段，并说明多个视频和显示位置规则 |
| 2026-07-02 23:25 | cms | 可视化详情图片宽度字段收口 | `Detail image widths` 作为底层列表字段保留同步能力，但不再在抽屉中单独展示，避免和图片下方比例框重复 |
| 2026-07-02 23:18 | cms | 可视化动态详情图片比例位置调整 | 可视化抽屉渲染详情图片字段时同步渲染对应宽度比例输入框，填写后仍写回 `detailImageWidths` |
| 2026-07-02 23:11 | cms | 动态详情图片比例编辑位置调整 | 内容管理虎诉动态的详情图片编辑行现在把宽度比例输入框放在对应照片地址输入框下方，并显示默认值和可填范围说明 |
| 2026-07-02 22:25 | cms | 动态详情标题和图片尺寸编辑 | 新增动态发布后的网页标题跟随 CMS 推文标题；动态详情图片可设置屏幕宽度比例；大事记正文支持 CMS 换行显示 |
| 2026-06-23 22:41 | cms | 正式站新 OSS 部署 | `www.tigerpartners.cn` 已切换到 `20260623-222902` release，正式 CMS 上传环境变量和公开资源前缀均指向 `husu2/husuweb`，公开 API 不再输出旧 OSS 域名，正式服务器 OSS PUT/DELETE 验证通过 |
| 2026-06-23 22:06 | cms | 新 OSS 静态资源上传 | `public/assets` 和 `public/uploads` 已同步到新 OSS，`assets/title/logo.svg`、团队图、服务行业图、首页视频、中文事件详情图和 uploads 样本均可公网访问 |
| 2026-06-23 21:58 | cms | 本地 OSS 地址切换 | `.env.local`、`.env.production`、代码默认前缀、`data/cms-site.json` 和 `data/cms.db` 已切换到 `husu2` OSS，上传凭证 PUT/DELETE 测试通过 |
| 2026-06-22 01:29 | cms | 正式站发布 | `www.tigerpartners.cn` 已切换到 release `20260622-012540`，正式站使用本地 CMS 数据库，`senior-associate-8` 不再出现在公开 CMS 数据和团队页 |
| 2026-06-22 01:07 | cms | 虎诉团队删除联动修复 | 团队成员删除改为同步 official 列表、成员 profile 和团队页 pageContent，避免可视化页面残留 slug 在后续保存时重新生成成员 |
| 2026-06-22 00:09 | cms | 服务行业后台图片显示对齐 | 稳定版私募 official 图片已同步为当前前台投影图；前后端版本归一化都以卡片/首页投影图优先显示 |
| 2026-06-21 23:57 | cms | 虎诉文化正文列表渲染 | `CoreValueScrollFlow` 会把虎诉文化 Body 中连续的无序列表行渲染为项目符号列表，方便 CMS 维护正文结构 |
| 2026-06-21 23:37 | cms | 首页服务行业图片来源修复 | 首页服务行业渲染合并 `home.industries` 页面内容和 official 服务行业列表，同 slug 的页面内容图片优先显示 |
| 2026-06-21 23:31 | cms | 服务行业与动态删除联动 | 服务行业前台卡片隐藏说明文字；内容管理和可视化删除动态列表项时会同步清理 `event.detailPages` 以及相关动态引用 |
| 2026-06-21 23:14 | cms | 虎诉荣誉新增项置顶 | 在虎诉荣誉年份内点击“新增荣誉”时，新条目插入到当前年份荣誉列表最前面 |
| 2026-06-21 23:12 | cms | 服务行业版本草稿自动保存 | 服务行业内容管理变更后约 700ms 自动提交当前版本，稳定版和测试版的首页卡片、服务行业页卡片、详情页图片投影已按 official 列表统一 |
| 2026-06-21 23:03 | cms | 服务行业删除保存链路修复 | 服务行业面板使用最新 official/pageContent 引用保存，稳定版和测试版已删除 `cards-1780119755266`、`cards-11`，四处投影均为 6 条 |
| 2026-06-21 22:55 | cms | 稳定版服务行业数据来源收敛 | 版本保存时以 `officialSiteState.lists.industries` 作为服务行业删除和图片权威来源，内容管理编辑会即时同步对应 pageContent 投影 |
| 2026-06-21 22:46 | cms | 服务行业图片地址替换生效 | 服务行业内容管理的背景图片成为首页卡片和详情页图片同步权威来源，旧 pageContent 图片不再覆盖新地址 |
| 2026-06-21 22:37 | cms | 稳定版服务行业内容同步 | 本地版本 `稳定` 的服务行业官方列表、首页服务行业、服务行业页卡片和详情页已同步为 `测试` 版本内容，数量从 3 条变为 8 条 |
| 2026-06-17 00:45 | cms | 大事记输入去重修复 | 可视化同步大事记时同一年事件以 pageContent 为准，不再按文本差异补回旧 officialState 事件，避免输入月份产生重复条目 |
| 2026-06-15 08:26 | cms | 可视化大事记事件排序按钮 | 大事记可视化抽屉内同一年事件支持置顶、上移和下移，保存到正式 CMS 时保留手动顺序 |
| 2026-06-15 08:13 | cms | CMS 列表标题序号显示修复 | 可视化抽屉和页面内容重复项列表在移动/置顶后按当前行号显示系统自动标题尾号，避免与展开输入框位置错位 |
| 2026-06-15 08:07 | cms | 动态详情日期与大事记事件排序 | event 详情页优先显示 CMS `displayDate/sortDate` 并格式化 `YYYYMMDD` 值，自定义动态不再回退到静态最新日期；大事记年份内事件可置顶、上移和下移 |
| 2026-06-10 23:15 | cms | 虎诉动态预览上传图 OSS 化 | 可视化抽屉读取 event 详情图片字段时统一把 `/uploads` 和 `/assets` 相对路径解析为 OSS 公网地址，避免测试站预览依赖本地静态文件 |
| 2026-06-10 09:33 | cms | 版本发布正式站 pageContent 对齐 | 发布和恢复版本时正式站公开 CMS 状态强制写入该版本 `pageContent`，保证 event 子页面正式版、版本预览和可视化编辑使用同一份子页面内容 |
| 2026-06-10 09:15 | cms | 虎诉动态新增 event 子页面对齐 | pageContent 读取按 slug 合并 event 列表和详情页；可视化编辑的中英文同步、移动和删除同样按 slug 定位，新增 event 不再继承默认摘要或详情图片 |
| 2026-06-10 08:41 | cms | 虎诉动态线上空封面修复 | `localizeCmsEvent` 只有在 `image` 字段不存在时才使用静态默认图；字段存在但为空时，首页、动态页和发布后的前台保持无图状态 |
| 2026-06-10 00:32 | cms | 虎诉动态空图片预览修复 | pageContent 保存归一化、可视化 officialState 同步和 Events 列表渲染均区分“字段缺失”和“字段为空”，新增动态无封面时预览保持空占位 |
| 2026-06-10 00:10 | cms | CMS 服务行业编辑与预览语言修复 | 服务行业编辑项展开 ID 改为不依赖 Slug；可视化和版本管理打开 `/cms/version-preview/[id]` 时携带当前语言，版本预览按 `lang` 参数初始化 |
| 2026-06-04 22:22 | cms | 服务行业来源优先级修复 | `CmsStudio`、`CmsPuckVisualEditor` 和 `cms-db` 统一以 `pageContent.media.cards` 作为服务行业权威列表，`home.industries` 只在缺少服务行业页列表时兜底 |
| 2026-06-04 10:05 | cms | 服务端版本行业归一化 | `cms-db` 持久化和读取版本 payload 时按 `pageContent.media.cards`/`home.industries` 重建 `officialSiteState.lists.industries`，兼容旧前端提交和历史版本发布 |
| 2026-06-04 09:50 | cms | 可视化服务行业版本加载修复 | `CmsStudio` 加载版本、当前站点内容和构建版本 payload 时可按 pageContent 反推 `officialState.lists.industries`，避免发布后继续编辑丢失新增行业 |
| 2026-06-04 00:01 | cms | 服务行业删除持久化 | `mergeIndustriesWithPageContent` 不再从旧页面内容扩展官方行业 slug；`CmsPuckVisualEditor` 将 `media.cards` 数量变化写回官方行业；`mergePageContentDefaults` 对服务行业相关 repeater 停止追加已删除默认项 |
| 2026-05-30 16:12 | cms | 虎诉动态封面上传 | `renderEventOverridesEditor` 为动态封面图片增加文件上传控件，复用 `/api/cms/assets` 并将返回的 `/uploads/...` 写入 `events.overrides[slug].image` |
| 2026-05-30 15:55 | cms | 图片字段上传入口补齐 | `CmsPuckVisualEditor` 页面字段支持 image/video/logo 上传写回；`OfficialSiteSectionPanel` 服务行业背景图字段支持上传到 industries 分类并预览缩略图 |
| 2026-05-30 15:21 | cms | 可视化即时同步加固 | `CmsPuckVisualEditor` 用 `updatePageContentState` 包装所有本地 `pageContent` 修改，在同一次更新中拿到 nextPageContent 并异步写回父级 `officialSiteState` |
| 2026-05-30 15:15 | cms | 可视化到内容管理实时同步 | `CmsPuckVisualEditor` 接收 `setOfficialSiteState`，在 `pageContent`/可视化草稿变化后用 `officialPreviewState` 更新父级草稿状态，保持虎诉动态内容管理列表即时一致 |
| 2026-05-30 15:04 | cms | 可视化虎诉动态新增链路修复 | `CmsPuckVisualEditor` 新建 `event.list` 条目时生成“新动态 / New Event”并插入首位，同时自动创建详情页数据但不切换到详情子页面 |
| 2026-05-30 14:24 | cms | 虎诉动态新增置顶 | `renderEventOverridesEditor` 未选择已有动态时生成当天排序日期的新动态 slug 和空白中英文内容，写入 `eventSlugs` 首位并展开对应编辑面板 |
| 2026-05-26 09:12 | cms | 虎诉动态排序生效修复 | `EventsPage` 使用 CMS pageContent 列表顺序渲染；`OfficialCmsEventOverride` 增加 `sortDate`，内容管理可按排序日期重排 `eventSlugs` |
| 2026-05-26 10:03 | cms | 可视化动态排序与 OSS 预览 | `CmsPuckVisualEditor` 动态列表支持置顶和 `YYYYMMDD` 日期排序，预览态和图片缩略图统一通过 OSS 公网地址加载 |
| 2026-05-26 10:29 | cms | 上传结果地址提示 | 文件管理和可视化字段上传完成后显示 `resolvePublicAssetUrl()` 解析出的 OSS 地址，便于直接复制或确认位置 |
| 2026-05-26 22:35 | cms | OSS `/husuweb` 前缀统一 | `public-assets` 优先使用 `NEXT_PUBLIC_ASSET_BASE_URL`，`oss-assets` 根据该变量路径前缀上传和删除 CMS 素材 |
| 2026-05-26 22:47 | cms | 本地 OSS 前缀配置 | `.env.local` 与 `.env.production` 使用同一个 `NEXT_PUBLIC_ASSET_BASE_URL`，保证本地启动和测试服务器图片地址一致 |
| 2026-05-26 23:02 | cms | 上传素材列表恢复 | `AssetsPanel` 渲染 `props.assets` 最近上传网格，区分图片、视频、文件并提供复制 OSS 地址和打开链接操作 |
| 2026-05-26 23:14 | cms | 文件管理页面分页 | `/api/cms/assets` 增加 `page` 过滤；`AssetsPanel` 固定页面顺序、按当前页面加载/追加上传素材并放大面板字号 |
| 2026-05-26 23:20 | cms | OSS 静态资源分类 | `/api/cms/official-assets` 把 `public/assets` 目录映射到页面分类，`OfficialAssetBrowser` 用中文分类按钮筛选 OSS 静态资源 |
| 2026-05-26 23:30 | cms | 上传素材分类归档 | `AssetsPanel` 删除“最近上传文件”展示块；`/api/cms/assets` 将团队和服务行业上传分别写入 `uploads/team`、`uploads/industries`，`/api/cms/official-assets` 合并扫描 `public/uploads` |
| 2026-05-27 09:02 | cms | 版本发布保护与真实文件统计 | `OfficialSiteSectionPanel` 要求选择版本后才能保存；`updateVersionPayload` 编辑已发布版本时取消发布标记且不 restore 当前站点；文件管理统计卡片使用 OSS 扫描 summary |
| 2026-05-28 08:38 | cms | 可视化预览防抖与大事记排序 | `CmsPuckVisualEditor` 使用 500ms 防抖刷新预览 Provider；`syncChronicleFromPageContent` 自动识别年份并对每年事件按月份从大到小排序 |
| 2026-05-28 08:45 | cms | CMS 复制、预览语言和 Logo 上传 | `OfficialAssetBrowser` 复制 OSS 地址增加 fallback；`CmsPuckVisualEditor` 预览语言强制同步，并允许 Header/Footer Logo 字段上传写回 |
| 2026-05-28 08:50 | cms | 版本选择器去空项 | `CmsVersionSelect` 只在无版本时显示“暂无版本”，有版本时自动选中已发布版本或第一条版本 |
| 2026-05-28 08:53 | cms | 可视化输入性能优化 | `CmsPuckVisualEditor` 使用 `debouncedPreviewData`/`debouncedSiteContent` 驱动 Puck 预览，本地输入时跳过同步 Puck setData |
| 2026-05-28 08:56 | cms | 默认发布版本上下文 | `CmsStudio` 在没有 `editingVersionId` 时自动加载 `isPublished` 版本，`CmsVersionSelect` 的 fallback 也优先显示已发布版本 |
| 2026-05-28 09:02 | cms | 预览中文切换修复 | `LanguageProvider` 不再因 `initialLanguage` 重置内部切换；`CmsVersionPreview` 新增固定中文/English 控制 |
| 2026-05-28 09:10 | cms | 版本预览语言按钮清理 | `CmsVersionPreview` 移除固定语言切换条，继续通过官网 Header 内置语言按钮切换 |
| 2026-05-28 09:17 | cms | 可视化编辑输入缓冲与大事记分组 | `BufferedTextControl` 延迟写回字段编辑；`drawerItemRows` 对 About 大事记按年份降序、月份降序排序并渲染年份分组 |
| 2026-05-28 09:37 | cms | 可视化大事记新增逻辑 | `CmsPuckVisualEditor` 的 About 大事记抽屉按内容管理逻辑提供“新增年份”和年份内“新增事件”，新增事件使用年份事件命名并隐藏手动上移/下移 |
| 2026-05-28 09:58 | cms | 服务行业新增链路修复 | `mergeCmsState` 保留空图片新增行业并清理查询参数 slug；可视化服务行业子页面下拉可从 cards 补齐缺失 detailPages |
| 2026-05-28 09:59 | cms | 可视化输入框恢复 | `BufferedTextControl` 聚焦时保留本地 draft，不再被中途提交的旧 pageContent value 覆盖 |
| 2026-05-28 10:09 | cms | 可视化字段反写保护 | 右侧页面字段提交同步 patch `puckData`，`updateDraftContent` 在程序化同步窗口内不再把旧 Puck props 写回 `pageContent` |
| 2026-05-30 13:48 | cms | 服务行业子页面持久化 | `CmsStudio` 加载和同步时从 `previewPageContent` 保留新增服务行业，并把缺失的 `media.detailPages` 合并回内容管理和可视化编辑区 |
| 2026-05-30 13:56 | cms | Puck 同步副作用修复 | `CmsPuckVisualEditor` 使用 `puckDataRef` 计算最新数据，并在异步任务中调用 Puck dispatch，避免 setState updater 内副作用 |
| 2026-05-30 14:15 | cms | 服务行业重复 key 修复 | `HomePage` 使用行业 slug 作为列表 key；`syncIndustriesFromPageContent` 归一化并去重 slug，空 slug 使用 `industry-N` 兜底 |
| 2026-05-26 09:00 | cms | 虎诉动态一键置顶 | `renderEventOverridesEditor` 为非首位动态提供置顶按钮，点击后通过 `moveArrayItem(slugs, index, 0)` 更新 `eventSlugs` 排序 |
| 2026-05-26 08:50 | cms | CMS 文件管理懒加载 | `/api/cms/assets` 与 `/api/cms/official-assets` 支持分页参数，`CmsStudio` 文件管理面板首屏加载 40 条并按需追加，减少大量文件导致的初始加载压力 |
| 2026-05-25 22:13 | cms | CMS 本地素材上传兼容 | `/api/cms/assets` 支持 OSS 未配置时本地落盘保存和删除，配置错误或远程上传失败仍返回 502 便于排查 |
| 2026-05-18 01:03 | cms | 通用左侧导航固定滚动 | `OfficialSiteSectionPanel` 新增 sticky split 渲染层，所有左侧导航型内容管理模块共享固定视窗、独立滚动的左栏交互 |
| 2026-05-18 00:57 | cms | 首页 HONORS 与可视化同步 | 内容管理左侧年份列表固定在视窗内并可独立滚动；`CmsPuckVisualEditor` 分离首页 Honors 列表同步和 About Honors 内容同步，避免首页轮播与可视化区域不对应 |
| 2026-05-18 00:48 | cms | 首页 HONORS 年份导航 | 首页 HONORS 轮播左侧导航改为年份；每个年份右侧从虎诉荣誉的同年具体条目中选择加入轮播，并继续写入 `homeHonorItems` |
| 2026-05-18 00:42 | cms | 内容管理导航式编辑修正 | 首页 HONORS、虎诉荣誉、虎诉大事记、服务行业、合伙人和资深律师左侧导航与右侧编辑区稳定分列；首页 HONORS 可从虎诉荣誉具体条目下拉选择并保存到 `homeHonorItems` |
| 2026-05-17 23:51 | cms | 鍐呭绠＄悊鏂板鏂瑰紡璋冩暣 | 棣栭〉 HONORS 閫夋嫨鍣ㄥ睍绀哄畬鏁磋崳瑾夋潵婧愶紱Chronicle 鏂板骞翠唤鐢熸垚涓嶉噸澶嶅勾浠藉苟鍚屾 `chronicleYears`锛汸artner/Senior Associate 鏂板鎸夐挳鍒涘缓鍙紪杈戠┖鐧芥垚鍛樿€岄潪閫夋嫨宸叉湁鎴愬憳 |
| 2026-05-17 23:46 | cms | 鏈嶅姟琛屼笟銆佽崳瑾夊拰澶т簨璁扮鐞嗕慨澶?| `OfficialCmsIndustryListItem` 澧炲姞涓嫳鏂囪鎯呭崱鐗囧瓧娈靛苟鍚屾鍒拌涓氬瓙椤甸潰锛汬onors count 鐢?awards 闀垮害璁＄畻骞跺皧閲嶅垹闄わ紱Chronicle CMS 鏁版嵁浼樺厛浜庨粯璁ゅ厹搴曪紝鏀寔鍒犻櫎骞翠唤鍜屼簨浠?|
| 2026-05-17 23:36 | cms | 棣栭〉 HONORS 杞挱閫夋嫨娣诲姞 | `OfficialSiteSectionPanel` 涓洪椤?HONORS 澧炲姞鐙珛閫夋嫨鐘舵€佸拰椤堕儴閫夋嫨鍣紝鏈姞鍏ョ殑鑽ｈ獕骞翠唤浼氬嚭鐜板湪涓嬫媺鍒楄〃涓紝鐐瑰嚮鈥滄柊澧炲埌杞挱鈥濆悗杩涘叆杞挱鍒楄〃 |
| 2026-05-17 23:20 | cms | CMS 鍐呭绠＄悊涓庡彲瑙嗗寲鏁版嵁鍚屾 | `OfficialSiteSectionPanel` 淇濆瓨浼氭妸 `officialSiteState` 鍚屾鎶曞奖鍒?`pageContent` 骞跺啓鍏ュ綋鍓嶇増鏈?瀹樼綉鐘舵€侊紝鍔犺浇鐗堟湰鍜屽姞杞藉綋鍓嶇珯鐐规椂涔熶細閲嶆柊鍚屾锛岄伩鍏嶅閮ㄥ唴瀹圭鐞嗕笌鍙鍖栫紪杈戞樉绀轰笉涓€鑷?|
| 2026-05-17 23:11 | cms | 鍏ㄥ眬鐗堟湰鍏ュ彛涓婄Щ | 鍚庡彴宸︿晶 CMS Studio 鏍囬涓嬫柟鏂板鍏ㄥ眬鐗堟湰閫夋嫨鍣紝`CmsPuckVisualEditor` 涓嶅啀娓叉煋鐗堟湰涓嬫媺锛屽彧淇濈暀褰撳墠缂栬緫鐗堟湰鎻愮ず锛涚珯鐐逛俊鎭拰椤甸潰鍐呭闈㈡澘绉婚櫎灞€閮ㄧ増鏈€夋嫨鍣?|
| 2026-05-17 23:05 | cms | 鍏ㄥ眬鐗堟湰涓婁笅鏂囩粺涓€ | `CmsStudio` 鍒濆鍖栥€佸姞杞藉畼缃戠姸鎬併€佸姞杞界増鏈拰鏋勫缓鐗堟湰 payload 鏃堕兘浼氬綊涓€鍖?`officialSiteState`锛涘唴瀹圭鐞嗘ā鍧椾繚瀛樻椂濡傛灉姝ｅ湪缂栬緫鐗堟湰锛屼細鎻愪氦鍒拌鐗堟湰鑰屼笉鏄洿鎺ュ啓 `/api/cms/official` |
| 2026-05-17 22:54 | cms | 鍐呭绠＄悊鑽ｈ獕鍗虫椂琛ラ綈 | `OfficialSiteSectionPanel` 浣跨敤褰掍竴鍖栧悗鐨?`OfficialCmsSiteState` 娓叉煋锛岄伩鍏嶈ˉ榻愰€昏緫鍙洿鏂板悗鍙?state銆佸綋鍓嶅睍寮€闈㈡澘浠嶆樉绀烘棫鑽ｈ獕鍒楄〃 |
| 2026-05-17 22:48 | cms | 铏庤瘔鑽ｈ獕琛ラ綈婧愪慨姝?| `withZhSponsorHonors` 浠?About 鑽ｈ獕妯″潡瀵煎嚭骞剁敤浜?CMS 榛樿鑽ｈ獕鐢熸垚锛孋MS 鍐呭绠＄悊鍙ˉ鍥炲墠鍙伴澶栨彃鍏ョ殑璧炲姪绫昏崳瑾?|
| 2026-05-17 22:44 | cms | Honors/Chronicle 鍜屽洟闃熷垪琛ㄦ仮澶?| 鍐呭绠＄悊闈㈡澘鍚堝苟褰撳墠 CMS 鏁版嵁涓庨潤鎬佸畬鏁存暟鎹紝琛ュ洖缂哄け骞翠唤/浜嬩欢/鑽ｈ獕锛涘洟闃熸垚鍛樻寜鑱屼綅浠?`memberProfiles` 鑷姩褰掑叆 Partner 鎴?Senior Associate 鍒楄〃 |
| 2026-05-17 22:39 | cms | CMS 鐗堟湰鍙戝竷涓€鑷存€т慨澶?| `/api/cms/versions/[id]/[action]` 鍜?`/api/cms/versions/[id]` 瑕嗙洊鍒锋柊 `/events/[slug]`銆乣/industries/[slug]`銆乣/team/[slug]`锛屽苟鍏煎缂哄皯 `officialSiteState` 鐨勫巻鍙茬増鏈?|
| 2026-05-17 22:30 | cms | 鍐呭绠＄悊瀵艰埅绮剧畝 | `CmsStudio` 鐨勫唴瀹圭鐞嗗垎缁勫彧淇濈暀褰撳墠瀹樼綉鍐呭鍏ュ彛鍜屾枃浠剁鐞嗭紝闅愯棌鏃р€滀簨浠跺拰濂栭」绠＄悊鈥濅互鍙娾€滆仈绯绘彁浜も€濆叆鍙?|
| 2026-05-17 22:27 | cms | 绌哄浘鐗囧湴鍧€鍏滃簳 | `ImageWithFallback` 瀵圭┖瀛楃涓插浘鐗囧湴鍧€鐩存帴杩斿洖鍗犱綅瀹瑰櫒锛屾柊澧?CMS 杞挱鎴栧崱鐗囧皻鏈笂浼犲浘鐗囨椂涓嶅啀娓叉煋 `<img src="">` |
| 2026-05-17 22:26 | cms | 棣栭〉鍔ㄦ€佽疆鎾瓧娈甸殧绂?| `CmsPuckVisualEditor` 瀵?`home.events` 鍙毚闇?slug銆佽疆鎾浘銆佸睍绀烘棩鏈熴€佸垎绫汇€佹爣棰樸€佹憳瑕佸拰鐐瑰嚮閾炬帴锛屾柊澧為」浼氬厛娓呯悊妯℃澘璇︽儏瀛楁锛岄伩鍏嶅拰 `event.detailPages` 鑰﹀悎 |
| 2026-05-17 22:23 | cms | 澶т簨璁板勾浠借ˉ鍏ㄤ笌鏂板鎴愬憳璇︽儏缂栬緫淇 | `Chronicle` 浼氬湪 CMS 鎺掑簭骞翠唤鍚庤拷鍔犵己澶遍潤鎬佸勾浠斤紝淇濈暀 2019-2026 绛夊畬鏁存椂闂寸嚎锛涙柊澧炴垚鍛橀瑙堝拰 `/team/[slug]` 璺敱浣跨敤 `createEmptyTeamProfile`锛岃 CMS memberProfiles 鎸?slug 鏇存柊瀵瑰簲瀛愰〉闈?|
| 2026-05-17 22:18 | cms | 棣栭〉铏庤瘔鍔ㄦ€佽疆鎾嫭绔嬬鐞?| `home.events` 浣跨敤鐙珛鐨?slide 瀛楁锛歴lug銆佽疆鎾浘銆佸睍绀烘棩鏈熴€佸垎绫汇€佹爣棰樸€佹憳瑕佸拰鐐瑰嚮閾炬帴锛涙柊澧?slide 鍗充娇娌℃湁 `/events/[slug]` 璇︽儏涔熻兘鍦ㄩ椤靛睍绀?|
| 2026-05-17 22:13 | cms | CMS 澶т簨璁般€佸洟闃熷瓙椤甸潰鍜岃涓氳鎯呬慨澶?| `Chronicle` 鍚堝苟 CMS 閮ㄥ垎鏁版嵁涓庨潤鎬佸畬鏁存椂闂寸嚎锛涘洟闃熸柊澧炲垪琛ㄩ」浼氱敓鎴?`memberProfiles` 瀛愰〉闈㈠苟鎻愪緵 Edit profile锛涜涓氳鎯呴〉璇诲彇 `Detail cards` 骞惰ˉ鍏呯紪杈戞牸寮忚鏄?|
| 2026-05-17 22:03 | cms | 鑽ｈ獕鍒楄〃瀹屾暣鎬т慨澶?| `HomePage` 涓?About Honors 鍦?CMS 鑽ｈ獕鏁版嵁涓嶅畬鏁存椂琛ラ綈鍐呯疆瀹屾暣鑽ｈ獕锛涘彲瑙嗗寲鍙戝竷鍚屾浼氫繚鐣欏凡鏈夎崳瑾夊勾浠藉拰濂栭」锛岄伩鍏嶅啀娆″帇缂╀负灏戦噺鏉＄洰 |
| 2026-05-17 21:58 | cms | 鍔ㄦ€佸垪琛ㄥ瓧娈佃鏄庤皟鏁?| 鍔ㄦ€佺埗椤甸潰鍒楄〃鍙淮鎶ゅ墠鍙板崱鐗囧睍绀烘墍闇€瀛楁锛屾鏂囨憳瑕佽浆鍒板瓙椤甸潰缁存姢锛涘悗鍙?Slug 瀛楁璇存槑鍏朵綔涓?`/events/[slug]` URL 鍜屽弻璇粦瀹氭爣璇?|
| 2026-05-17 21:42 | cms | 鍔ㄦ€佽鎯呮鏂囨搷浣滆鏄?| 鍔ㄦ€佸瓙椤甸潰鍐呭鎶藉眽灞曠ず `[IMAGE]` 鍥剧墖鍗犱綅绗︺€侀涔﹁棰戝崰浣嶇鍜屽墿浣欏獟浣撹嚜鍔ㄨ拷鍔犺鍒欙紝甯姪缂栬緫浜哄憳缁存姢鍥炬枃/瑙嗛姝ｆ枃 |
| 2026-05-17 21:34 | cms | 鍔ㄦ€佺埗鍒楄〃涓庡瓙椤甸潰鍏ュ彛淇 | 淇敼鍔ㄦ€?slug 鏃跺悓姝ヤ腑鑻辨枃鏉＄洰锛岄伩鍏嶄竴鏉″姩鎬佸嚭鐜颁袱涓?URL 鏍囪瘑锛涚埗鍒楄〃鍗＄墖鎻愪緵 Edit detail 鎸夐挳鐩存帴杩涘叆璇︽儏姝ｆ枃缂栬緫 |
| 2026-05-17 21:25 | cms | 鍔ㄦ€佽鎯呮娊灞夊叏閾捐矾 slug 瀹氫綅 | `getPairedDrawerFields`銆佺缉鐣ュ浘/鏍囬/鎽樿鍜岀敓鎴愬獟浣撳瓧娈甸兘浼樺厛鎸?slug 鍙栨潯鐩紝閬垮厤鍙灞傝緭鍏ュ€兼寜 slug銆佸瓧娈靛垪琛ㄤ粛鎸?index 鐨勯敊浣嶉棶棰?|
| 2026-05-17 21:02 | cms | 鍔ㄦ€佸瓙椤甸潰鎸?slug 瀵归綈缂栬緫 | 閫夋嫨浠绘剰铏庤瘔鍔ㄦ€佸瓙椤甸潰鏃讹紝鍙充晶鎶藉眽浼氭寜 slug 鎵惧埌涓嫳鏂囧搴旀潯鐩苟娓叉煋璇︽儏瀛楁锛岄伩鍏嶅彧绗竴涓瓙椤甸潰鑳界湅鍒?`Detail content` |
| 2026-05-17 20:55 | cms | 鍔ㄦ€佹柊澧炲悗鑷姩杩涘叆璇︽儏缂栬緫 | 鍦ㄥ姩鎬佸垪琛ㄩ噷鏂板鍐呭鏃讹紝CMS 浼氬垱寤虹埗椤甸潰鍗＄墖鍜岃鎯呴〉楠ㄦ灦锛屽苟绔嬪嵆鎵撳紑 `event.detailPages` 鐨勬柊鏉＄洰锛岃 `Detail content`銆佽鎯呭浘鍜岃鎯呰棰戝彲鐩存帴缂栬緫 |
| 2026-05-17 20:15 | cms | 鏂板鍔ㄦ€佽鎯呭瓧娈靛垵濮嬪寲 | 鍙鍖栫紪杈戦噷鏂板鍔ㄦ€佸崱鐗囨垨鍔ㄦ€佸瓙椤甸潰鏃讹紝鏁版嵁灞傜洿鎺ュ甫涓?`Detail content`銆佽鎯呭浘鍜岃鎯呰棰戝瓧娈碉紝閬垮厤鏂板缓椤瑰彧鏄剧ず鏍囬/鎽樿 |
| 2026-05-17 20:09 | cms | 鍔ㄦ€佽鎯呮鏂囦笌濯掍綋涓婁紶鍏ュ彛琛ラ綈 | `event.detailPages` 鍙充晶缂栬緫鍖哄缁堟樉绀?Detail content銆丏etail image 1 鍜?Detail video 1锛涙柊澧炲瓙椤甸潰鑷姩甯﹀獟浣撴Ы浣嶏紝鏈啓 `[IMAGE]`/瑙嗛鍗犱綅绗︾殑濯掍綋浼氳拷鍔犳樉绀哄湪璇︽儏姝ｆ枃鏈熬 |
| 2026-05-17 20:00 | cms | 鏂板鍔ㄦ€佸瓙椤甸潰鏄犲皠淇 | 瀛愰〉闈㈤€夋嫨鍣ㄤ細鍚堝苟鍔ㄦ€佸垪琛ㄤ笌璇︽儏椤?slug锛涘垪琛ㄦ柊澧為」灏氭棤璇︽儏鏃讹紝閫夋嫨璇?slug 浼氳嚜鍔ㄨˉ涓€鏉?`event.detailPages` 璇︽儏椤癸紝骞朵笖璇︽儏椤典笉浼氭妸鎽樿娈佃惤鍦ㄦ鏂囬噷閲嶅鏄剧ず |
| 2026-05-17 19:52 | cms | Events 鍒楄〃鏂板涓庢棩鏈熷瓧娈典慨澶?| Events 鐖堕〉闈㈠崱鐗囩洿鎺ョ敱 CMS `event.list` 鐢熸垚锛屾柊澧?slug 鍚庡彲鏄剧ず锛涘垪琛ㄥ瓧娈垫柊澧?`sortDate` 涓?`displayDate`锛屾帓搴忓拰灞曠ず浜掍笉褰卞搷锛涙湇鍔¤涓氳鎯呮娊灞夊己鍒舵樉绀?slug銆佹爣棰樸€侀灞忓浘銆佺畝浠嬪拰璇︽儏鍗＄墖瀛楁 |
| 2026-05-17 19:39 | cms | Events 鐖跺瓙椤甸潰瀛楁鎷嗗垎涓庤涓氳鎯呴粯璁ゅ€间慨姝?| `event.list` 鍙淮鎶ゅ姩鎬佸崱鐗囦俊鎭紝`event.detailPages` 缁存姢璇︽儏鏍囬銆佹憳瑕併€佹鏂囧拰濯掍綋锛岃鎯呴〉涓嶅啀鍙嶅悜瑕嗙洊鐖堕〉闈㈠崱鐗囷紱鏈嶅姟琛屼笟璇︽儏椤归粯璁や娇鐢ㄨ鎯呴〉鍥剧墖涓庣畝浠嬶紝鏃х┖瀛楁浼氳嚜鍔ㄨˉ榛樿鍊?|
| 2026-05-17 19:03 | cms | CMS 鍙鍖栫紪杈戝櫒涔辩爜淇 | `CmsPuckVisualEditor` 鐨勪腑鏂囨爣绛俱€佹寜閽€佷笂浼犳彁绀恒€佺増鏈?璁惧/璇█鏍忓拰鍐呭鎶藉眽鏂囨鎭㈠涓烘甯镐腑鏂囷紝閬垮厤鍚庡彴鎿嶄綔鐣岄潰鍑虹幇 mojibake |
| 2026-05-17 18:50 | cms | 鏈嶅姟琛屼笟璇︽儏椤?CMS 瀛楁琛ラ綈 | 鍙鍖栫紪杈戦€夋嫨鏈嶅姟琛屼笟瀛愰〉闈㈡椂鎵撳紑 `detailPages` 瀛楁锛岃涓氳鎯呴〉浼樺厛璇诲彇 CMS 鏍囬銆佽儗鏅浘銆佺畝浠嬪拰鎸夌┖琛?椤圭洰绗﹀彿瑙ｆ瀽鐨勮鎯呭崱鐗?|
| 2026-05-17 18:47 | cms | Contact 椤?CMS 瀛楁琛ラ綈涓庡瘜鏂囨湰鏍囪 | 鑱旂郴鎴戜滑棣栧睆銆佽仈绯绘枃妗堛€佸彸鍥俱€佹嫑鑱樻鏂囥€佸洓涓爮鐩拰绠€鍘嗘姇閫掗偖绠卞潎杩涘叆鍙鍖栧唴瀹圭鐞嗭紱Contact 鍓嶅彴鏀寔 `**鍔犵矖**`銆乣*鏂滀綋*`銆乣[color=#d9b27a]鏂囧瓧[/color]` |
| 2026-05-17 18:24 | cms | Team/鏈嶅姟琛屼笟/鍔ㄦ€侀〉 CMS 瀛楁琛ラ綈 | Team Hero 鍥剧墖姝ｆ枃銆佸洟闃熷彛鍙峰彸渚ф鏂囥€佸悎浼欎汉/璧勬繁寰嬪笀鍒楄〃銆佹湇鍔¤涓?Hero 鍥剧墖鍜屽崱鐗囨弿杩般€佽檸璇夊姩鎬?Hero 姝ｆ枃鍥剧墖鍧囧彲鍦ㄥ彲瑙嗗寲鍐呭閲岀淮鎶わ紱浜嬩欢璇︽儏鍥剧墖鏀逛负鐩存帴鎸夊崰浣嶇璇诲彇 CMS 鏉＄洰瀛楁 |
| 2026-05-17 18:09 | cms | CMS 鐗堟湰鍙戝竷浜や簰淇 | 鐗堟湰鍙戝竷/鎭㈠瀹屾垚鍚庝繚鎸佸綋鍓嶅悗鍙颁細璇濆拰宸︿晶瀵艰埅鍙偣鍑伙紝鎸夐挳鏄剧ず澶勭悊涓姸鎬侊紝骞剁敤 `loadVersionForEditing` 鍚屾缂栬緫鎬?|
| 2026-05-17 17:55 | cms | About 椤靛彲瑙嗗寲鍐呭琛ラ綈 | `defaultPageContentState` 鏂板 About Hero 鍥剧墖銆乂ision 鏂囨/鎸夐挳銆丠onors 鍙充晶姝ｆ枃銆丆ulture CTA銆丆hronicle 鍒楄〃鍜?Core Value 瀛愰〉闈㈡潯鐩紱鍓嶅彴鍖哄潡璇诲彇 CMS 瀛楁锛屼繚瀛樻椂鍚屾鑽ｈ獕鍜屽ぇ浜嬭鍐呭 |
| 2026-05-17 17:43 | cms | Footer 鍙鍖栧瓧娈佃ˉ榻?| `SiteSettings` 鍜?`OfficialCmsSiteState.footer` 鏂板 Footer 鍙充晶姝ｆ枃銆佸湴鍧€銆佺増鏉冦€佸妗堝拰鍥炬爣瀛楁锛孎ooter 闈㈡澘鏀寔 textarea锛屽墠鍙?Footer 浣跨敤 CMS 鍊煎苟鏀寔鐐瑰嚮瀹氫綅瀵瑰簲瀛楁 |
| 2026-05-17 17:28 | cms | Header/TITLE 鍙鍖栧悓姝ヤ慨澶?| Header/TITLE 鐨勭珯鐐瑰悕銆丩ogo銆佸鑸拰璇█鎸夐挳鏂囨杩涘叆 `OfficialCmsSiteState.header`锛岄瑙堜笌姝ｅ紡 Header 缁熶竴璇诲彇 CMS 鐘舵€侊紝鍏ㄧ珯瀛楁淇敼浼氳Е鍙戝彲瑙嗗寲鍖哄煙鍒锋柊 |
| 2026-05-17 14:45 | cms | 棣栭〉姝ｅ紡绔欏瓧娈靛悓姝?| `OfficialCmsSiteState` 鏂板 `previewPageContent`锛宍stripPreviewOnlyCmsState` 涓嶅啀涓㈠純鍙鍖栭〉闈㈠瓧娈碉紝`restoreVersion` 鍏煎鏃х増鏈?payload 鍥炲～椤甸潰鍐呭 |
| 2026-05-17 14:40 | cms | 姝ｅ紡绔?CMS 鍙戝竷鍚屾淇 | `RootLayout` 娉ㄥ叆褰撳墠鍏紑 CMS 鐘舵€侊紝`/api/cms/public` 绂佺紦瀛樺苟鍔犳椂闂存埑璇锋眰锛涚増鏈彂甯?鎭㈠鍒锋柊 `/`銆丄bout銆丒vents銆両ndustries銆乀eam銆丆ontact 鍜屽叕寮€ CMS 鎺ュ彛 |
| 2026-05-17 14:37 | cms | 浜嬩欢璇︽儏濯掍綋鏇挎崲淇 | `detailImageN`/`detailVideoN` 淇敼鏃跺悓姝ョ淮鎶?`detailImages`/`detailVideos`锛孋MS 浜嬩欢瑕嗙洊涓嶅啀杩囨护绌轰綅锛岃鎯呴〉鎸夋鏂囧崰浣嶇绱㈠紩娓叉煋鏇挎崲鍚庣殑鍥剧墖 |
| 2026-05-17 14:31 | cms | 棣栭〉鍙鍖栧唴瀹硅ˉ榻?| 棣栭〉铏庤瘔鍔ㄦ€佽疆鎾拰瀹屾暣 Events 绠＄悊鎷嗗垎淇濆瓨锛岃疆鎾?See More 鎸夐挳鏂囧瓧/閾炬帴鍙紪杈戯紱Header/Footer 閲嶆柊鎴愪负鍙鍖栫紪杈戝皬鏍忕洰锛岄椤靛悇灞忎富瑕佹爣棰樹笌璇存槑瀛楁鎺ュ叆褰撳墠 CMS 鏂囨 |
| 2026-05-17 14:11 | cms | 浜嬩欢璇︽儏鍥剧墖棰勮娣卞害淇 | `getPageContentFingerprint` 鐜板湪浣滀负 Puck 闅愯棌瀛楁杩涘叆 Live3UiPage props锛屾娊灞夊唴璇︽儏鍥剧墖銆佽鎯呰棰戠瓑鍒楄〃 item 瀛楁鍙樺寲浼氳Е鍙戦瑙堢粍浠堕噸鏂板悎鎴?CMS state |
| 2026-05-17 14:02 | cms | 宸插彂甯冪増鏈粯璁よ繘鍏ヤ笌 Honors CTA 缂栬緫 | CMS 杩涘叆鍚庤嚜鍔ㄥ垏鎹㈠埌 `isPublished` 鐗堟湰锛涢椤佃檸璇夎崳瑾?See more 鎸夐挳鏂囧瓧鍜岄摼鎺ユ帴鍏ュ彲瑙嗗寲鍐呭绠＄悊锛屾棫鐗堟湰浼氳嚜鍔ㄨˉ榻愭柊澧炲瓧娈?|
| 2026-05-16 16:18 | cms | Puck 棰勮鍒锋柊闃插惊鐜?| 鍙鍖栫紪杈戜笉鍐嶇敤 `pageContent.updatedAt` 閲嶆寕杞芥暣涓?Puck锛屽彧鍦?`OfficialPublicCmsProvider` 灞傞殢椤甸潰鍐呭鏇存柊鏃堕棿鍒锋柊棰勮鐘舵€?|
| 2026-05-16 16:11 | cms | 鍙鍖栧浘鐗囨浛鎹㈠埛鏂?| 浜嬩欢璇︽儏鍥剧墖鍜岃棰戣妭鐐?key 鍖呭惈璧勬簮鍦板潃锛宍ImageWithFallback` 鍦?src 鏀瑰彉鏃舵竻闄ら敊璇姸鎬?|
| 2026-05-16 15:57 | cms | 浜嬩欢濯掍綋鍏滃簳棰勮鍚屾 | `officialPreviewState` 鍦ㄦ病鏈夌湡瀹炲畼缃戠姸鎬佹椂浠嶄互榛樿鐘舵€佺户缁墽琛?Events銆丠onors銆乀eam 鍚屾锛岄伩鍏嶈鎯呭浘鐗囧湴鍧€宸叉敼浣嗛瑙堜粛鏄剧ず闈欐€佹棫鍥?|
| 2026-05-16 15:50 | cms | 璇︽儏濯掍綋棰勮鍗虫椂鍚屾 | Event 璇︽儏鍥剧墖/瑙嗛瀛楁浠绘剰璇█杈撳叆閮戒細鍚屾鍒板叡鍚屽獟浣撴Ы浣嶏紝棰勮鐘舵€佹寜褰撳墠璇█浼樺厛鍚堝苟濯掍綋鏁扮粍锛屾墜鍔ㄦ浛鎹?URL 鍚庡彲绔嬪嵆鍒锋柊鍙鍖栧尯鍩?|
| 2026-05-16 15:44 | cms | 铏庤瘔鍔ㄦ€佽鎯呭獟浣撴Ы浣?| Event 瀛愰〉闈㈢紪杈戞牴鎹?`[IMAGE]`銆乣[鍥剧墖]` 鍜岃棰戝崰浣嶇鍔ㄦ€佹樉绀鸿鎯呭浘鐗?瑙嗛 1銆?銆? 绛夊瓧娈碉紝鏀寔閫愬紶鏇挎崲骞跺吋瀹规棫鐨勫琛屽獟浣撴暟鎹?|
| 2026-06-22 00:53 | cms | 首页轮播中文编码修复 | 从 `HomePage.tsx` 的正确 UTF-8 覆盖对象重写 CMS JSON/SQLite 首页 events 中文字段，并用 Unicode 码点校验 |
| 2026-06-22 00:47 | cms | 首页虎诉动态轮播 CMS 同步 | `data/cms-site.json`、`site_state.page_content_json` 和版本 1/2 payload 的首页 events 区块均同步为 5 条 |
| 2026-06-22 00:33 | cms | 首页虎诉动态轮播内容同步 | 首页轮播默认显示 Markdown 指定的 5 条中英文动态，并使用 `YYYY.MM.DD` 中文日期格式 |
| 2026-05-16 15:34 | cms | CMS 鐗堟湰閫夋嫨鏀舵暃 | 鍙鍖栫紪杈戝拰鍐呭缂栬緫闈㈡澘鐨勭増鏈笅鎷夊彧灞曠ず宸插垱寤虹増鏈紝涓嶅啀鎻愪緵鈥滃綋鍓嶇嚎涓婄増鏈€濅綔涓洪€夐」锛岄檷浣庢祴璇曠増鏈拰褰撳墠绔欑偣鍐呭鐨勬贩娣?|
| 2026-05-16 15:04 | cms | 鐗堟湰鍙戝竷鏁版嵁涓€鑷存€?| 鍙鍖栫紪杈戦粯璁ゆ樉绀哄綋鍓嶇嚎涓婄増鏈紝鎵嬪姩閫夋嫨娴嬭瘯鐗堟湰鎵嶈繘鍏ョ増鏈紪杈戯紱娴嬭瘯鐗堟湰淇濆瓨鍜屽彂甯冧細鎼哄甫鏈嶅姟琛屼笟銆佽檸璇夊姩鎬併€佸洟闃熴€佽崳瑾夌瓑鐪熷疄瀹樼綉 CMS 鏁版嵁 |
| 2026-05-16 14:47 | cms | 宸插彂甯冪増鏈彁浜ゅ嵆鍚屾 | `/api/cms/versions/[id]` 鏇存柊宸插彂甯冪増鏈椂浼氳皟鐢ㄧ増鏈仮澶嶉€昏緫鍐欏叆褰撳墠绔欑偣鏁版嵁锛屽悗鍙版彁绀哄悓姝ョ粨鏋?|
| 2026-05-16 14:42 | cms | CMS 椤甸潰灞傜骇璋冩暣 | 鍙鍖栫紪杈戠埗椤甸潰淇濈暀棣栭〉銆佸叧浜庢垜浠€佽檸璇夊洟闃熴€佹湇鍔¤涓氥€佽檸璇夊姩鎬併€佽仈绯绘垜浠紱鍙︽彁渚涜檸璇夋枃鍖?`/about/core-value` 瀛愰〉闈㈢紪杈戝拰鐗堟湰棰勮 |
| 2026-05-16 14:15 | cms | 鐗堟湰棰勮璇︽儏椤靛唴閮ㄨ烦杞?| `/cms/version-preview/[id]` 鍙湪棰勮瀹瑰櫒鍐呮嫤鎴?`/events/[slug]`銆乣/industries/[slug]`銆乣/team/[slug]` 骞舵覆鏌撳搴旇鎯呴〉锛屼繚鎸佺増鏈瑙堜笂涓嬫枃 |
| 2026-05-16 12:01 | cms | 浜嬩欢瀛愰〉闈㈠獟浣撲笂浼?| 浜嬩欢璇︽儏瀛楁鏀寔璇︽儏鍥剧墖銆佽鎯呰棰戝琛岀淮鎶わ紱鍙充晶鎶藉眽鍙笂浼犲浘鐗囨垨瑙嗛鍒?`/uploads/event` 骞惰嚜鍔ㄥ～鍏ュ綋鍓嶅瓧娈碉紝棰勮璇︽儏椤佃鍙?CMS 瑕嗙洊濯掍綋 |
| 2026-05-16 11:52 | cms | 瀛愰〉闈㈠彲瑙嗗寲缂栬緫鍏ュ彛 | 铏庤瘔鍔ㄦ€併€佹湇鍔¤涓氬拰铏庤瘔鍥㈤槦鏍忕洰鍙湪椤堕儴閫夋嫨瀛愰〉闈紝鍙充晶鑷姩鎵撳紑瀵瑰簲鏉＄洰缂栬緫鍖猴紝鏀寔缂栬緫璇︽儏鏍囬銆佹鏂囥€佸浘鐗囧拰鍥㈤槦涓汉淇℃伅 |
| 2026-05-16 11:45 | cms | 鍙鍖栫紪杈戝叿浣撴潯鐩ˉ榻?| 棣栭〉 Industries銆丠onors銆丒vents銆丆lients 浠ュ強 Events 鍒楄〃銆両ndustries 鍗＄墖鍦ㄥ唴瀹规娊灞変腑鍙寜鏉＄洰缂栬緫锛岄瑙堝尯浼氫娇鐢ㄨ繖浜涙潯鐩鐩栧畼缃戝垪琛ㄣ€佽疆鎾€佽崳瑾夊拰瀹㈡埛 Logo |
| 2026-05-16 11:35 | cms | 鍙鍖栫紪杈戝瓧娈垫槧灏勬墿灞?| 棣栭〉 Vision/Industries/Events/Clients銆丄bout Hero/Vision/Honors/Culture/Chronicle銆丒vents銆両ndustries銆乀eam 鍜?Contact 鐨勪富瑕佸彸渚ц緭鍏ュ瓧娈靛彲鍗虫椂鍙嶆槧鍒伴瑙堝尯 |
| 2026-05-16 11:24 | cms | 鍙鍖栭瑙堢姸鎬佸悓姝?| `PublicCmsProvider` 鏀寔绂佺敤鎷夊彇骞跺悓姝ュ垵濮嬬姸鎬侊紝Puck 棰勮浼氬皢鍙充晶杈撳叆妗嗘敼鍔ㄥ彔鍔犲埌鐪熷疄瀹樼綉 CMS 鐘舵€佷腑 |
| 2026-05-16 11:13 | cms | 鏂囦欢绠＄悊闈㈡澘绮剧畝 | 鍒犻櫎鈥滃叏閮ㄩ〉闈⑩€濈瓑鏃т笂浼犳枃浠剁瓫閫夊尯鍩燂紝閬垮厤鏂囦欢绠＄悊鍑虹幇绗簩濂楀垪琛ㄦ爣棰樺拰閲嶅璧勬簮鍗＄墖 |
| 2026-05-16 10:30 | cms | CMS 缂哄け鍐呭琛ラ綈 | 鍚堜紮浜恒€佽祫娣卞緥甯堝拰棣栭〉浜嬩欢杞挱鍦ㄦ棫 CMS 鐘舵€佷笅涔熶細鑷姩琛ラ綈瀹屾暣榛樿鍐呭锛涙湇鍔¤涓氬彲缂栬緫骞跺睍绀鸿鎯呴〉涓嫳鏂囨弿杩?|
| 2026-05-16 09:14 | cms | 鐪熷疄瀹樼綉鍒楄〃绠＄悊 | `/api/cms/official` 鏀寔璇诲彇/淇濆瓨 `OfficialCmsSiteState`锛孋MS 鏂板鈥滃畼缃戝垪琛ㄧ鐞嗏€濓紝棣栭〉銆丒vents銆丄bout 鍜?Team 椤甸潰鏀逛负浼樺厛璇诲彇 CMS 鍒楄〃骞跺洖閫€闈欐€佹暟鎹?|
| 2026-05-16 09:36 | cms | CMS 鍐呭鍒嗗尯涓庤祫婧愬垎绫?| 鍚庡彴鐪熷疄瀹樼綉鍐呭鎷嗕负鐙珛绠＄悊鍏ュ彛锛岄椤?HONORS 浣跨敤鐙珛骞翠唤鍒楄〃锛沗/api/cms/official-assets` 鎵弿 `public/assets` 骞舵寜鐩綍鐢熸垚 OSS 璧勬簮娓呭崟 |
| 2026-05-16 09:45 | cms | CMS 鍐呭鍙紪杈?| `OfficialCmsSiteState.content` 淇濆瓨 Honors銆丆hronicle 鍜?Team Profile 瑕嗙洊鍐呭锛孍vents 瑕嗙洊鍐呭鍦ㄢ€滆檸璇夊姩鎬佲€濅腑缂栬緫锛涘墠鍙伴〉闈紭鍏堣鍙?CMS 瑕嗙洊骞跺洖閫€闈欐€佹暟鎹?|
| 2026-05-16 09:53 | cms | CMS 琛ㄥ崟鍖栫紪杈?| 铏庤瘔鑽ｈ獕銆佽檸璇夊ぇ浜嬭銆佸悎浼欎汉銆佽祫娣卞緥甯堝拰铏庤瘔鍔ㄦ€佺鐞嗛〉鏀逛负绫讳技鈥滀簨浠跺拰濂栭」绠＄悊鈥濈殑鍗＄墖琛ㄥ崟锛屼笉鍐嶈姹傜洿鎺ョ紪杈?JSON |
| 2026-05-16 10:01 | cms | CMS 鍗＄墖鍖栨搷浣滃畬鍠?| 棣栭〉 Events 杞挱銆侀椤?HONORS銆佹湇鍔¤涓氥€佸洟闃熷垎缁勫拰铏庤瘔鍔ㄦ€佸潎閫氳繃鍗＄墖鎿嶄綔缁存姢锛涘彲瑙嗗寲棰勮浣跨敤鐪熷疄瀹樼綉 CMS 鐘舵€侊紝鏂囦欢绠＄悊鎬绘暟鍖呭惈 OSS 闈欐€佽祫婧?|
| 2026-05-16 10:16 | cms | CMS 榛樿鍐呭涓庣缉鐣ュ浘 | Honors銆丆hronicle銆乀eam銆丒vents 闈㈡澘鎵撳紑鍚庝粠褰撳墠瀹樼綉鏁版嵁琛ラ綈鍙紪杈戝唴瀹癸紱棣栭〉浜嬩欢杞挱鍙紪杈戜腑鑻辨枃鏍囬銆佸垎绫汇€佹憳瑕佸拰灏侀潰锛涘崱鐗囨爣棰樺尯灞曠ず灏侀潰鎴栦汉鍛樼缉鐣ュ浘 |
| 2026-05-15 22:51 | cms | main 鍚堝苟鍒?cms | 鍐茬獊鏂囦欢浠?`main` 鐗堟湰涓轰富瀹屾垚鍚堝苟锛屼繚鐣?`cms` 鍒嗘敮 Provider 鍙€?CMS 鐘舵€佸吋瀹瑰眰 |
| 2026-05-15 22:33 | main | SEO 涓?`/client` 鐢熶骇鍙戝竷 | 褰撳墠绾夸笂鐗堟湰 `/opt/tigerpartners-web/releases/20260515-2230` 宸插惎鐢ㄤ腑鏂囬椤垫爣棰樸€侀殣钘忚涔?h1 鍜?`/client` 鍒伴椤电殑鍏煎璺宠浆 |
| 2026-05-15 22:25 | main | 棣栭〉鎼滅储鏍囬浼樺寲 | 棣栭〉鏄惧紡鎻愪緵涓枃 SEO 鏍囬鍜岃涔夋爣棰橈紝闄嶄綆鎼滅储缁撴灉缁х画閲囩敤 `WE KNOW HOW TO WIN` 浣滀负鏍囬鐨勬鐜囷紱鍚屾椂琛ラ綈 `/client` 鍏煎閲嶅畾鍚?|
| 2026-05-15 22:15 | main | 涓囧姏灏鹃儴涓氱哗涓婁笅瀵归綈 | `TeamProfilePage` 涓竾鍔涘熬閮ㄥ乏鍒楁敼涓?`1fr/auto` 琛屽竷灞€锛屽浐瀹氬崱鐗囬棿璺濆苟璁╃ 23 鏉℃壙鎷呴珮搴﹁ˉ鍋?|
| 2026-05-15 22:13 | main | 涓囧姏涓氱哗灏鹃儴甯冨眬 | `TeamProfilePage` 涓轰竾鍔涙渶鍚庝笁鏉′笟缁╁惎鐢ㄥ畾鍒朵袱鍒楀竷灞€锛屾弧瓒冲乏浜屽彸涓€鍜屽簳閮ㄥ榻愬睍绀?|
| 2026-05-15 22:01 | main | 涓汉绠€鍘嗙Щ鍔ㄧ hero 璋冩暣 | `TeamProfilePage` 鍦ㄧЩ鍔ㄧ鍏堟覆鏌撲釜浜虹収鐗囧啀鏄剧ず濮撳悕銆佽亴浣嶃€佺數璇濆拰閭锛涗竾鍔涗笟缁╁熬閮ㄤ腑鑻辨枃鏁版嵁宸叉牳瀵逛竴鑷?|
| 2026-05-15 21:59 | main | event 鍥剧墖鏇挎崲鍙戝竷 | 鏈湴 `src/assets/event` 鏇挎崲鍥惧凡鍚屾鍒?`public/assets/event` 涓?OSS锛岀嚎涓婁簨浠堕〉鍙闂紝鏂扮増鏈湇鍔＄姸鎬佷负 `active` |
| 2026-05-15 10:07 | main | 瀹樼綉鐢熶骇鍙戝竷 | 宸插皢褰撳墠 Next standalone 鏋勫缓鍖呴儴缃插埌 `www.tigerpartners.cn` 鏍硅矾寰勶紝楠岃瘉棣栭〉銆丒vents銆佷竾鍔涗釜浜洪〉銆丄bout 鍜屽叧閿浘鐗囪祫婧愬潎鍙闂?|
| 2026-05-15 09:54 | main | event2 鍓?9 寮犲皝闈㈤『搴忓悓姝?| `public/assets/event/event2` 鐨?1-9 鍙峰皝闈㈠凡涓?`src/assets/event/event2` 鍚屽悕鏂囦欢閫愪竴鍖归厤锛岄〉闈㈤潤鎬佽祫婧愯鍙栭『搴忎笌婧愮洰褰曞懡鍚嶄竴鑷?|
| 2026-05-15 09:46 | main | 涓囧姏涓汉涓氱哗鍚屾 | `src/data/teamProfiles.ts` 涓竾鍔涜嫳鏂?`liWanAchievements` 涓庝腑鏂?`zhTeamDetails["li-wan"].achievements` 宸叉寜 `EN/liwanPerformance.md` 鍚屾涓?25 鏉?|
| 2026-05-04 17:32 | main | Next App Router 鍩虹宸ョ▼ | 鏂板 Next銆乀ypeScript銆乀ailwind v4銆乻tandalone 閰嶇疆 |
| 2026-05-04 17:32 | main | 棣栭〉杩佺Щ | 灏嗛椤靛師鍨嬫暣鐞嗕负 `/` 椤甸潰锛屼繚鐣欎富瑕佽瑙夊尯鍧楀拰鍝嶅簲寮忚鍒?|
| 2026-05-04 17:32 | main | About 椤佃縼绉?| 灏?About 鍘熷瀷鎷嗗垎涓?Hero銆乂ision銆丠onors銆丆ulture銆丆hronicle 鍖哄潡 |
| 2026-05-04 17:32 | main | 渚濊禆绮剧畝 | 鍙繚鐣?Next銆丷eact銆乀ailwind銆乴ucide-react 绛夊綋鍓嶉〉闈㈠疄闄呴渶瑕佺殑渚濊禆 |
| 2026-05-04 17:57 | main | 鏈嶅姟琛屼笟椤佃縼绉?| 鏂板 `/industries`锛岄噸寤?Hero銆佽鏄庡崱鐗囧拰琛屼笟鍗＄墖缃戞牸 |
| 2026-05-04 17:57 | main | 浜嬩欢椤佃縼绉?| 鏂板 `/events`锛岄噸寤轰簨浠舵爣棰樺尯鍜屼簨浠跺崱鐗囧垪琛?|
| 2026-05-04 17:57 | main | 鑱旂郴鎴戜滑椤佃縼绉?| 鏂板 `/contact`锛岄噸寤烘嫑鑱樿鏄庛€佽姹傚崱鐗囥€佸煄甯傚浘鍜岃仈绯婚〉鑴?|
| 2026-05-04 17:57 | main | 鍏叡甯冨眬琛ュ厖 | 鏂板 `SiteFooter`锛屾墿灞?`SiteHeader` 瀵艰埅鍒颁簲涓叕寮€椤甸潰 |
| 2026-05-04 18:03 | main | 澶у睆缂╂斁绛栫暐 | 閫氳繃 `--root-font-size` 鍜?`html font-size` 瀹炵幇 1440px 浠ヤ笂鏁翠綋 rem 鏀惧ぇ |
| 2026-05-04 18:08 | main | 椤甸潰缁勪欢褰掓。 | 鏂板 `src/components/pages/*`锛岄泦涓壙杞介椤点€丄bout銆佹湇鍔¤涓氥€佷簨浠躲€佽仈绯婚〉闈㈠睍绀哄疄鐜?|
| 2026-05-04 18:33 | main | Title 瀵艰埅瀹炵幇 | `SiteHeader` 鏀逛负鍥哄畾閫忔槑瀵艰埅锛屾敮鎸佹粴鍔ㄦ瘺鐜荤拑銆佷腑鑻辨枃鍒囨崲銆佺Щ鍔ㄧ鑿滃崟鍜?active/hover 涓嬪垝绾?|
| 2026-05-04 22:54 | main | 棣栭〉鏁翠綋浜や簰璋冩暣 | 鏍规嵁棣栭〉闇€姹傛枃妗ｅ畬鎴?Hero 瀛楀彿銆乂ision 娓愬彉鍗＄墖銆佽涓?hover 鍗＄墖銆丠onors 骞翠唤鍒囨崲銆丒vents 涓績杞挱鍜?Clients 涓夎 Logo 婊氬姩 |
| 2026-05-04 22:54 | main | 棣栭〉瀹㈡埛 Logo 绱犳潗鍙戝竷 | 灏?`src/assets/home/clientLogo` 涓殑 43 涓?Logo 澶嶅埗鍒?`public/assets/home/clientLogo`锛屼緵棣栭〉闈欐€佽闂?|
| 2026-05-04 22:54 | main | 鏋勫缓妫€鏌ヤ慨澶?| 鎺掗櫎涓嶅弬涓庤繍琛岀殑鏃у師鍨嬬洰褰曞悗锛宍npm run build` 宸查€氳繃 |
| 2026-05-04 23:07 | main | About Vision 鍗＄墖璋冩暣 | 灏?Vision 鍗＄墖鏀逛负鐏拌壊鑳屾櫙锛屽彸渚ц鏄庝笌 VISION 鍚岃锛孲ee More 灞呬腑 |
| 2026-05-04 23:07 | main | About Honors 浜や簰璋冩暣 | Honors 鏍囬涓庢鏂囬琛屽榻愶紝灞曞紑鑳屾櫙鏀逛负 `#777777`锛屾姌鍙犲姩鐢绘敼涓哄钩婊?grid 杩囨浮 |
| 2026-05-04 23:07 | main | About Chronicle 浜や簰璋冩暣 | Chronicle 鏀逛负骞翠唤鎶樺彔鏃堕棿杞达紝澶嶇敤 Honors & Awards 椋庢牸灞曞紑/鎶樺彔鍔ㄦ晥 |
| 2026-05-04 23:21 | main | 鍏ㄧ珯 Footer 缁熶竴 | 棣栭〉銆丄bout銆佹湇鍔¤涓氥€佷簨浠躲€佽仈绯绘垜浠〉闈㈢粺涓€澶嶇敤 `SiteFooter` |
| 2026-05-04 23:21 | main | Footer 绱犳潗鍙戝竷 | 灏?`src/assets/foot` 涓殑 7 涓浘鏍?鍥剧墖澶嶅埗鍒?`public/assets/foot`锛屼緵椤佃剼闈欐€佽闂?|
| 2026-05-04 23:29 | main | Events Hero 璋冩暣 | Hero 鏂囨鍖哄煙鍔犲叆榛戣壊鍒?`#2f2a23` 鐨勬笎鍙樿儗鏅?|
| 2026-05-04 23:29 | main | Events 鍗＄墖浜や簰璋冩暣 | 绗簩灞忓崱鐗囧姞鍏ュ弬鑰冨師鍨嬬殑杈圭嚎銆佽儗鏅€佸浘鐗囧拰 Read More hover 鍔ㄦ晥锛屽浘鐗囧悜宸︿笂鍋忕Щ 10% |
| 2026-05-04 23:41 | main | About Honors 灞曞紑澶撮儴璋冩暣 | 灞曞紑鍚庡勾浠藉崱鐗囧ご閮ㄤ繚鎸佹繁鑹茶儗鏅紝灞曞紑鍐呭缁х画浣跨敤 `#777777` |
| 2026-05-04 23:41 | main | About Chronicle 鍔ㄦ晥璋冩暣 | Chronicle 鏀逛负鍙傝€冨師鍨嬬殑涓酱骞翠唤鎸夐挳銆佹湀浠介」 hover 涓婄Щ銆佽妭鐐瑰彂鍏夊拰灞曞紑浣嶇Щ鍔ㄦ晥 |
| 2026-05-04 23:41 | main | About Culture 鍥剧墖鍔ㄦ晥璋冩暣 | Culture 宸︿晶鍥剧墖鍔犲叆 Join Us 鍥剧墖鍚屾閬僵銆佺伆搴︺€侀€忔槑搴﹀拰缂╂斁 hover/leave 杩囨浮 |
| 2026-05-04 23:43 | main | 鍥㈤槦椤佃縼绉?| 鏂板 `/team` 璺敱鍜?`TeamPage`锛岄噸寤?Hero銆丼pecial Forces 鏍囪鍖哄拰 Senior Associate 浜虹墿鍗＄墖 |
| 2026-05-04 23:43 | main | 鍥㈤槦绱犳潗鍙戝竷 | 灏?`鎴戠殑鍥㈤槦/src/imports/OurTeam` 涓殑鍥剧墖澶嶅埗鍒?`public/assets/prototypes/team` |
| 2026-05-04 23:43 | main | Team 瀵艰埅鎺ュ叆 | `SiteHeader` 鐨?Our team 閾炬帴鏀逛负 `/team`锛屽苟鏀寔鍥㈤槦椤?active 鐘舵€?|
| 2026-05-05 13:06 | main | 棣栭〉 Hero 涓?Vision 璋冩暣 | Hero 鏍囬寮哄埗鍗曡锛孷ision 鍖哄乏鍙宠竟璺濇敼涓?`3rem`锛孷ision 鏍囪瘑鏃嬭浆鏀惧湪鍗＄墖鏈€鍙充晶锛屾寜閽敼涓?Discover More 椋庢牸 |
| 2026-05-05 13:06 | main | 棣栭〉鍐呭鎺掔増璋冩暣 | Industries 鏍囬鏀惧ぇ骞舵敼涓?`#f6ebe4` 鍒?`#d9b27a` 娓愬彉锛孒onors/Events 鍙充晶鏂囨鎸夋寚瀹氳鏁版崲琛?|
| 2026-05-05 13:06 | main | 棣栭〉杞挱涓庡鎴峰璋冩暣 | Events 杞挱鍥剧墖鍜岀伆鑹茶鏄庣洅闂磋窛鏀逛负 `2.5rem`锛屽鎴?Logo 澧欏姩鐢绘椂闀挎敼涓?`135s` |
| 2026-05-05 13:21 | main | 棣栭〉 Hero 瀛楀彿淇 | `we know how to win` 鎸夊綋鍓嶇増鏈缉灏忓埌 70%锛屽苟缁х画淇濇寔鍗曡 |
| 2026-05-05 13:21 | main | 棣栭〉 Vision 鏄剧ず淇 | Vision 鍗＄墖澧炲姞妗岄潰鏈€灏忛珮搴︼紝鍙充晶鏃嬭浆鏂囧瓧鏀逛负瀹屾暣灞呬腑鏄剧ず锛岄伩鍏嶈鍒?|
| 2026-05-05 13:21 | main | 棣栭〉 Industries 涓?Events 淇 | Industries 鏍囬缂╁皬鍒颁笂涓€鐗堢害 0.3 鍊嶏紝Events 杞挱鍥剧墖鍜岀伆鑹插唴瀹瑰崱閲嶆柊杩炴帴 |
| 2026-05-05 13:31 | main | About Hero Vision 浣嶇疆璋冩暣 | 灏嗙伆鑹?Vision 鏂瑰潡宓屽叆 About Hero 鏍囬涓庢鏂囦笅鏂癸紝绉婚櫎 AboutPage 涓嫭绔?Vision 鍖哄潡 |
| 2026-05-05 13:31 | main | About Culture 鍏ュ彛璋冩暣 | Culture 鍙充晶鑳屾櫙鏀逛负 `#D9B27A`锛屾鏂囧彧淇濈暀鎸囧畾涓€鍙ワ紝骞舵柊澧炶烦杞?`/about/core-value` 鐨?Read Full Manifesto 鎸夐挳 |
| 2026-05-05 13:31 | main | Core Value 瀛愰〉闈?| 鏂板 `/about/core-value` 璺敱鍜?`CoreValuePage`锛屽鐢ㄥ叏绔欏鑸〉鑴氬苟浣跨敤鍘熷瀷鍥剧墖涓庝笁娈典环鍊艰鍐呭 |
| 2026-05-05 13:36 | main | Team Hero 涓庢爣璇皟鏁?| Hero 涓诲浘濉弧灞忓箷瀹藉害锛孫ur team 涓庡壇鏍囬缂╁皬鍒?85%锛學E ARE SPECIAL FORCES 缂╁皬鍒?80% 骞舵敼涓轰袱琛屽乏瀵归綈 |
| 2026-05-05 13:36 | main | Team 浜虹墿鍖鸿皟鏁?| Senior Associate 鏍囬绉诲姩鍒版渶鍚庝袱寮犲浘鐗囦笂鏂癸紝浜虹墿鍗＄墖鍥剧墖绉婚櫎鐏拌壊钂欏眰骞朵繚鎸?100% 瀹藉害瀵归綈鐖跺厓绱?|
| 2026-05-05 13:39 | main | Team 涓汉璇︽儏椤?| 鏂板 `/team/yuxuan-liu` 璺敱鍜?`TeamProfilePage`锛屽睍绀轰釜浜虹収鐗囥€佺畝浠嬩俊鎭€佹墽涓氱粡鍘嗗拰鑽ｈ獕鎴愬氨 |
| 2026-05-05 13:39 | main | Team Find out more 璺宠浆 | 鍥㈤槦浜虹墿鍗＄墖鐨?Find out more 鏀逛负 Next `Link`锛岃烦杞埌褰撳墠 Team 璺敱灞傜骇涓嬬殑涓汉璇︽儏椤?|
| 2026-05-05 13:48 | main | Industries 鍗＄墖甯冨眬璋冩暣 | 鍏釜琛屼笟鍗＄墖鏀逛负绗竴琛屽崟鍗°€佺浜岃涓夊崱銆佺涓夎鍙屽崱鐨勬寚瀹氬竷灞€ |
| 2026-05-05 13:48 | main | 琛屼笟璇︽儏椤?| 鏂板 `/industries/[slug]` 鍔ㄦ€佽矾鐢卞拰 `IndustryDetailPage`锛屽睍绀鸿涓氶潰鍖呭睉銆佽鏄庢枃妗堝拰鏈嶅姟鍐呭鍗＄墖 |
| 2026-05-05 13:52 | main | Events Hero 涓庡垪琛ㄨ皟鏁?| Hero 鏍囬鍜屾鏂囧眳涓紝鑳屾櫙鏀逛负 `#56524a` 鍒?`#212121` 鍏ㄥ睆娓愬彉锛孡atest Updates 鏀逛负涔濆崱涓夊垪缃戞牸 |
| 2026-05-05 13:52 | main | 浜嬩欢璇︽儏椤?| 鏂板 `/events/[slug]` 鍔ㄦ€佽矾鐢卞拰 `EventDetailPage`锛屽鐢ㄤ簨浠惰鎯呭師鍨嬪浘鐗囦笌姝ｆ枃缁撴瀯 |
| 2026-05-05 16:13 | main | 鍏ㄧ珯宸﹀彸杈硅窛缁熶竴 | `--shell-sm` / `--shell-md` 妗岄潰鍊肩粺涓€涓?`12rem`锛孒eader 鍜?`.site-shell` 鍐呭浣跨敤涓€鑷存í鍚戣竟璺?|
| 2026-05-05 16:20 | main | rem 鍩哄噯璋冩暣 | `--root-font-size` 鏀逛负 `clamp(12px, calc(100vw / 120), 16px)`锛屽疄鐜?1920 涓鸿璁″熀鍑嗐€?440 绛夋瘮缂╁皬 |
| 2026-05-05 16:24 | main | Title 灏哄璋冩暣 | `SiteHeader` logo 楂樺害鏀惧ぇ 1.3 鍊嶏紝妗岄潰/绉诲姩瀵艰埅鍜岃瑷€鎸夐挳鏂囧瓧鏀惧ぇ 1.4 鍊?|
| 2026-05-05 16:26 | main | Title 浜屾灏哄璋冩暣 | `SiteHeader` logo 楂樺害缁х画鏀惧ぇ 1.2 鍊嶏紝瀵艰埅鍜岃瑷€鎸夐挳鏂囧瓧缁х画鏀惧ぇ 1.4 鍊嶏紝Header 鍐呭眰涓婁笅 padding 鏀逛负 `1.2rem` |
| 2026-05-05 16:27 | main | 棣栭〉 Hero 瀛楀彿寰皟 | `we know how to win` 瀛楀彿 clamp 浠?`1.15rem/3.64vw/3.72rem` 鏀惧ぇ鍒?`1.265rem/4.004vw/4.092rem` |
| 2026-05-05 16:34 | main | 棣栭〉 Vision 灞忚皟鏁?| Vision 灞忓灞傛敼涓虹函 `#171717`锛屽崱鐗囧乏鍙冲璺濇敼涓?`1.2rem`锛屾鏂囦笁琛屾樉绀哄苟鏀惧ぇ 1.1 鍊嶏紝鎸夐挳鏀逛负鐧藉簳榛戝瓧 |
| 2026-05-05 16:38 | main | 棣栭〉 Vision 寰皟 | Vision 鍗＄墖宸﹀彸澶栬窛鏀逛负 `2.5rem`锛屽彸渚ф棆杞?Vision 瀹氫綅鍒拌绐楀彸渚?`12rem` 鍐呭绾匡紝鎸夐挳榛樿鏍峰紡寮哄埗涓虹櫧搴曢粦瀛?|
| 2026-05-05 16:41 | main | 棣栭〉 Vision 姝ｆ枃涓庡榻愬井璋?| 姝ｆ枃瀛楀彿 clamp 璋冩暣涓?`1.65rem/2.64vw/2.772rem`锛屽崱鐗囧唴閮?padding 淇涓?`calc(var(--shell-md) - 1.3rem)` 浠ュ榻愯绐楀乏渚?`12rem` |
| 2026-05-05 16:42 | main | 棣栭〉 Vision 鏍囪瘑寰皟 | 鍙充晶 Vision 鏍囪瘑浠?`rotate-90` 鏀逛负 `rotate-180`锛屽瓧鍙?clamp 缂╁皬鍒?`4.275rem/9vw/7.875rem` |
| 2026-05-05 16:43 | main | 棣栭〉 Vision 鏍囪瘑鏃嬭浆璋冩暣 | 鍙充晶 Vision 鏍囪瘑浠?`rotate-180` 鏀逛负 `rotate-[270deg]` |
| 2026-05-05 16:44 | main | 棣栭〉 Industries 璇存槑姝ｆ枃璋冩暣 | 璇存槑娈佃惤浠?`max-w-[90rem] text-[var(--type-body)]` 鏀逛负 `w-full text-[calc(var(--type-body)*1.8)]` |
| 2026-05-05 16:46 | main | 棣栭〉 Industries 鍗＄墖鎻忚堪绉婚櫎 | 鍒犻櫎琛屼笟鍗＄墖鏁版嵁涓殑 `desc` 瀛楁鍜屽崱鐗囧簳閮?hover 鎻忚堪娈佃惤锛屼粎淇濈暀鏍囬銆佸浘鐗囧拰绠ご浜や簰 |
| 2026-05-05 16:47 | main | 棣栭〉 Industries 涓?Honors 寰皟 | 鍒犻櫎 Industries 鍗＄墖缃戞牸涓嬫柟妯嚎锛汬onors 鏍囬鍖虹綉鏍兼敼涓?`auto 1fr`锛屽彸渚ц鏄庡瓧鍙锋敼涓?`clamp(1.4rem,1.68vw,1.96rem)` |
| 2026-05-05 16:52 | main | 棣栭〉 Honors 涓?Events 寰皟 | Honors 椤堕儴缃戞牸澧炲姞 `items-center`锛屽彸渚ц鏄庢敼涓?`clamp(1.54rem,1.848vw,2.156rem)`锛宎ctive 鏍囬/姝ｆ枃鏀惧ぇ骞剁Щ闄?See More锛汦vents 鍙充晶璇存槑鏀逛负 `clamp(1.3rem,1.56vw,1.82rem)`锛岃疆鎾浘鐗囧拰鐏板崱闂磋窛涓?`2rem` |
| 2026-05-05 16:55 | main | 棣栭〉 Clients 灞忓井璋?| Clients 鏍囬瀹瑰櫒鏀逛负 `pl-[5rem] pr-[var(--shell-md)]`锛屽垹闄?Logo 澧欏乏鍙充袱渚ф笎闅愰伄缃?|
| 2026-05-05 16:58 | main | About Hero 鍨傜洿浣嶇疆寰皟 | About 鏍囬缁勬敼涓洪灞?`55svh` 瀹氫綅锛岀伆鑹?Vision 鏂瑰潡鏀逛负棣栧睆 `90svh` 瀹氫綅锛屽苟澧炲姞 Hero 楂樺害閬垮厤鏂瑰潡琚埅鏂?|
| 2026-05-05 17:01 | main | 棣栭〉 Vision 鑳屾櫙寰皟 | Vision 绗簩灞?section 浣跨敤 `repeating-linear-gradient` 绾圭悊灞傚拰 90 搴︽繁鐏板埌鏆栫伆妯悜娓愬彉鑳屾櫙 |
| 2026-05-05 17:01 | main | 棣栭〉 Vision 鍗＄墖鑳屾櫙淇 | 澶栧眰 section 鎭㈠涓?`#171717`锛屽皢 `repeating-linear-gradient` 绾圭悊灞傚拰妯悜娓愬彉绉诲叆 Vision 鍗＄墖鑳屾櫙 |
| 2026-05-05 17:02 | main | 棣栭〉 Vision 鍗＄墖娓愬彉璋冩暣 | 鍒犻櫎 `repeating-linear-gradient` 绾圭悊灞傦紝鍗＄墖鑳屾櫙鏀逛负 `linear-gradient(to bottom right, ...)` |
| 2026-05-05 17:03 | main | 棣栭〉 Vision 閬僵璋冩暣 | 鍒犻櫎鍗＄墖鍐呴儴绾靛悜榛戣壊 overlay锛岄伩鍏嶅崱鐗囦笂涓嬭竟缂樼户缁彂榛?|
| 2026-05-05 17:04 | main | 棣栭〉 Vision 涓婇儴鐏板害寰皟 | 鍗＄墖娓愬彉鍓嶄袱涓壊鏍囨敼涓?`#4f4f52` 鍜?`#565659`锛屼笅閮?`#403f3f`銆乣#514c45` 淇濇寔涓嶅彉 |
| 2026-05-05 17:05 | main | 棣栭〉 Vision 涓婇儴浜害寰皟 | 鍗＄墖娓愬彉鍓嶄袱涓壊鏍囩户缁帇鏆椾负 `#2f2f32` 鍜?`#38383b`锛屼笅閮ㄨ壊鏍囦繚鎸佷笉鍙?|
| 2026-05-05 17:05 | main | 棣栭〉 Vision 涓婇儴浜害浜屾寰皟 | 鍗＄墖娓愬彉鍓嶄袱涓壊鏍囩户缁帇鏆椾负 `#27272a` 鍜?`#303033`锛屼笅閮ㄨ壊鏍囦繚鎸佷笉鍙?|
| 2026-05-05 17:17 | main | 棣栭〉 Vision 璧峰鑹叉爣璋冩暣 | 鍗＄墖瀵硅绾挎笎鍙樼涓€涓壊鏍囨敼涓?`rgb(36, 36, 36) 9%`锛屽叾浣欒壊鏍囦繚鎸佺幇鏈夎缃?|
| 2026-05-05 17:35 | main | 鍏ㄧ珯瀛椾綋鎺ュ叆 | 浣跨敤 `next/font/local` 鍔犺浇 `src/font/poppins.ttf`锛屽苟閫氳繃 `body` 瀛椾綋鏍堣鐩栧叏绔欓粯璁ゆ枃瀛?|
| 2026-05-05 17:52 | main | About 椤佃瑙夌粏鑺傝皟鏁?| Hero 鏍囬澧炲姞閲戣壊宸︾嚎骞跺榻?12rem 鍐呭绾匡紝Vision 鍗＄墖鏀逛负 5rem 澶栬窛鍜屾柊娓愬彉锛汬onors銆丆ulture銆丆hronicle 鎸夊弽棣堢粺涓€棰滆壊銆佸瓧鍙枫€佽竟妗嗗拰灞曞紑鍐呭鏍峰紡 |
| 2026-05-05 17:59 | main | Team 椤典汉鐗╁尯寰皟 | 鍘绘帀 WE ARE 涓?SPECIAL 涔嬮棿鐨勫ぇ闂撮殧锛屾柊澧?Partner 鏍囬锛屼汉鐗╁浘鐗囧～婊＄埗瀹瑰櫒锛孎ind out more 鍘绘帀 icon 骞朵繚鐣欓粍鑹蹭笅鍒掔嚎 |
| 2026-05-05 18:08 | main | Industries 椤靛竷灞€寰皟 | Hero 鏍囬鏀逛负鍙充晶 12rem 瀵归綈锛岃鏄庡崱鐗囦娇鐢ㄦ寚瀹氱伆閲戞笎鍙樺拰瀵硅榛勮壊杈规锛岃涓氬崱鐗囧尯鏀逛负 9rem 澶栬窛銆佸乏涓嬫枃瀛椾笌 1/2.5/1.5 琛岄珮姣斾緥 |
| 2026-05-05 18:12 | main | Industries 椤电粏鑺備慨姝?| 璇存槑鍗＄墖浠庡瑙掕竟妗嗘仮澶嶄负鍘熸湁寮曞彿瑁呴グ骞舵敼涓洪粍鑹诧紱琛屼笟鍗＄墖鏍囬涓嬪垝绾挎敼涓哄唴瀹瑰尯鍩熷叏瀹?|
| 2026-05-05 18:17 | main | Events 椤佃瑙夊井璋?| Hero 娓愬彉鍧楁敼涓?6rem 宸﹀彸澶栬窛鍜?40svh 楂樺害锛涚浜屽睆绉婚櫎 LATEST UPDATES 鏍囬/涓嬪垝绾匡紝鍗＄墖鍥剧墖鍘婚櫎鐏板害閬僵骞朵繚鎸佸乏涓?-10% 鍋忕Щ |
| 2026-05-05 18:22 | main | Events 椤靛崱鐗囧唴瀹瑰井璋?| Hero 娓愬彉鍧楀乏鍙冲璺濇敼涓?8rem锛岀浜屽睆澶栬窛鏀逛负 6rem锛涗簨浠跺崱鐗囧垹闄ゆ憳瑕佸拰 Read More锛屽彧淇濈暀鏃ユ湡銆侀粍鑹茬澶村拰鏍囬 |
| 2026-05-05 18:23 | main | Events 鍗＄墖闂磋窛寰皟 | 绗簩灞忕綉鏍奸棿璺濅粠 `gap-x-8 gap-y-16` 鏀逛负 `gap-x-24 gap-y-48` |
| 2026-05-05 18:24 | main | Events 鍗＄墖鍥剧墖鍋忕Щ寰皟 | 鍗＄墖鍥剧墖瀹瑰櫒浠?`-left-[10%] -top-[10%]` 鏀逛负 `-left-[3.3%] -top-[3.3%]` |
| 2026-05-05 18:26 | main | Events 鍗＄墖鍐呭闂磋窛寰皟 | 鍐呭鍖洪《閮?padding 鏀逛负 `calc(54% + 3rem)`锛屽彸涓嬭涓夎褰㈤珮搴︿粠 `18%` 鏀逛负 `6%` |
| 2026-05-05 18:27 | main | Events 鍗＄墖鏃ユ湡闂磋窛浜屾寰皟 | 鍐呭鍖洪《閮?padding 浠?`calc(54% + 3rem)` 鏀逛负 `calc(54% + 6rem)` |
| 2026-05-05 18:28 | main | Events 鍗＄墖瀛楀彿涓庨棿璺濆井璋?| 鏍囬瀛楀彿 clamp 璋冩暣涓哄綋鍓?70%锛岀浜屽睆缃戞牸绾靛悜闂磋窛浠?`gap-y-48` 鎭㈠涓?`gap-y-16` |
| 2026-05-05 20:40 | main | Contact 椤佃竟璺濊皟鏁?| 鏂板椤甸潰鍐?`contactShell`锛岃 Hero銆丣oin Us銆佸€欓€変汉鍗＄墖鍜岄偖绠辨彁绀哄尯妗岄潰宸﹁竟璺濈粺涓€涓?`9rem` |
| 2026-05-05 20:49 | main | About Culture 瑙嗚淇 | Culture 鍩虹鑳屾櫙鏀逛负 `#a88d61`锛屽乏鍥鹃檷閫忔槑骞跺彔鍔犳閲?multiply 閬僵锛屼富杩囨浮鏀逛负娣辨閲戝灞傛笎鍙橈紝鍙充晶澧炲姞绾?0.1 閫忔槑搴︾殑鎶借薄鍝佺墝姘村嵃 |
| 2026-05-05 20:55 | main | About Culture 閬僵寰皟 | 涓昏繃娓￠伄缃╁乏渚ч€忔槑搴︿粠杈冮珮瑕嗙洊鏀逛负浣庨€忔槑搴︼紝骞跺皢瀹炶壊杩囨浮鍖哄煙鍙崇Щ锛屼繚鐣欏乏渚у浘鐗囧彲瑙佸害 |
| 2026-05-05 20:59 | main | About Culture 娓愬彉鑼冨洿寰皟 | 涓婚伄缃╂敼涓轰粠 18% 鍒?78% 鎸佺画閫掑閫忔槑搴︾殑澶氭妫曢噾杩囨浮锛岄伩鍏嶆笎鍙樺彧闆嗕腑鍦ㄥ浘鐗囧彸渚у皬鑼冨洿 |
| 2026-05-05 21:00 | main | About Culture 鍥剧墖娓呮櫚搴﹀井璋?| 涓婚伄缃?0%-42% 鏀逛负閫忔槑锛屽浘鐗?opacity 鎻愰珮鍒?`0.68`锛屾閲?multiply 閬僵闄嶄綆鍒?`35%`锛岄伩鍏嶅乏鍥鹃浘鍖?|
| 2026-05-05 21:02 | main | About Culture 鑳屾櫙涓庡乏鍥捐挋灞傝皟鏁?| 鍒犻櫎 section / 瀹瑰櫒 `#a88d61` 鑳屾櫙绫伙紝骞剁Щ闄ゅ乏鍥惧尯鍩?`#9f8458` multiply 钂欏眰 |
| 2026-05-05 21:03 | main | About Culture 灏哄璋冩暣 | 鍒犻櫎 `mx-auto max-w-[120rem]` 瀹藉害闄愬埗锛屽鍣ㄦ敼涓?`w-full min-h-[80vh]`锛屽乏鍥炬闈㈤珮搴﹀悓姝ヤ负 `80vh` |
| 2026-05-05 21:05 | main | About Culture 鍥剧墖鍙充晶娓愬彉 | 鍦ㄥ乏鍥惧唴閮ㄥ鍔?`linear-gradient(to left, #a88d61 0%, rgba(168, 141, 97, 0) 30%)`锛岃鍥剧墖鍙崇紭琛旀帴鍙充晶鑳屾櫙 |
| 2026-05-05 21:16 | main | Contact 淇℃伅妯″潡璋冩暣 | 绉婚櫎搴曢儴鐙珛鍩庡競鍥炬ā鍧楋紝鍦?Hero 鍚庢柊澧炲叏瀹?80vh 鍙屾爮妯″潡锛氬乏渚?Contact us 鏂囨銆佺數璇?閭鍥炬爣淇℃伅锛屽彸渚у睍绀哄煄甯傚浘 |
| 2026-05-05 21:18 | main | Contact 淇℃伅妯″潡棰滆壊璋冩暣 | Contact us 妯″潡宸︿晶鏍囬銆佹鏂囥€佺數璇濄€侀偖绠卞拰 Phone/Mail 鍥炬爣缁熶竴鏀逛负榛戣壊 |
| 2026-05-05 21:23 | main | Contact 鎷涜仒鍖鸿瑙夎皟鏁?| 鍊欓€変汉鍗＄墖鐨?1/2/3/4 鏁板瓧鏇挎崲涓洪噾鑹蹭笅鍒掔嚎锛岀畝鍘嗛偖绠辨彁绀哄彸瀵归綈锛屽苟涓?Contact us 涓嬫柟鍒?Footer 鍓嶅尯鍩熷鍔?`#1d1d1d` 鍙充晶鐩磋涓夎褰㈣儗鏅?|
| 2026-05-05 21:25 | main | Contact 涓夎褰㈣繛鎺ヤ慨姝?| 涓夎褰㈣儗鏅鍣ㄥ鍔?`pb-20 -mb-20`锛岃鐩?Footer `mt-20` 褰㈡垚鐨勯棿闅欙紝璁╂枩杈圭粓鐐瑰榻?Footer 椤堕儴姝ｄ腑闂?|
| 2026-05-05 21:26 | main | Contact 鍗＄墖灞傜骇寰皟 | 鍊欓€変汉鍗＄墖涓嬪垝绾垮鍔?`mt-16`锛屼笁瑙掑舰鑳屾櫙灞傜骇鎻愰珮鍒板崱鐗囪儗鏅笂鏂癸紝鍗＄墖涓嬪垝绾垮拰姝ｆ枃淇濇寔鏇撮珮灞傜骇閬垮厤琚伄鎸?|
| 2026-05-05 21:28 | main | Contact 鍗＄墖涓嬪垝绾夸笌鑳屾櫙淇 | 鍊欓€変汉鍗＄墖涓嬪垝绾夸粠 `h-0.5` 鏀逛负 `h-1.5`锛屼笁瑙掑舰鑳屾櫙灞傜骇浠?`z-20` 鏀瑰洖 `z-0`锛屼綔涓哄尯鍩熻儗鏅澘鏄剧ず |
| 2026-05-05 21:29 | main | Contact 鍗＄墖灞傜骇浜屾淇 | 鍗＄墖鑳屾櫙鎷嗕负鍐呴儴 `z-0` 鑳屾櫙灞傦紝涓夎褰㈣涓?`z-20`锛屽崱鐗囦笅鍒掔嚎鍜屾鏂囦繚鎸?`z-30`锛屽疄鐜颁笁瑙掑舰鐩栦綇鍗＄墖鑳屾櫙浣嗕笉閬尅鍐呭 |
| 2026-05-05 21:30 | main | Contact 鍗＄墖鎴浘鏁堟灉璋冩暣 | 绉婚櫎鍗＄墖鍖?`z-10` stacking context锛岀‘淇濆唴瀹?`z-30` 楂樹簬涓夎褰紱鍗＄墖鑳屾櫙鏀逛负娣辫壊鏆栫伆娓愬彉锛屾鏂囨敼涓虹矖鏂滀綋鐏扮櫧鏂囧瓧 |
| 2026-05-05 21:32 | main | Contact 涓夎褰綅缃慨姝?| 涓夎褰?overlay 浠庢暣涓嫑鑱樺尯瀹瑰櫒绉诲叆鍊欓€変汉鍗＄墖 grid锛岃捣鐐瑰榻愬崱鐗囧尯鍙充笂瑙掞紝楂樺害鍚戜笅寤朵几瑕嗙洊鍒?Footer 鍓?|
| 2026-05-05 21:36 | main | Contact 涓夎褰綅缃洖閫€ | 鎾ゅ洖 `21:32` 鐨勫崱鐗?grid 閿氱偣璋冩暣锛屼笁瑙掑舰 overlay 鎭㈠涓烘嫑鑱樺尯鏁翠綋瀹瑰櫒鐨勭粷瀵瑰畾浣嶈儗鏅?|
| 2026-05-05 21:50 | main | 椤甸潰绾т笁瑙掑舰鑳屾櫙 | 鏂板 `PageTriangle` 鍏变韩缁勪欢锛屽苟鍦?Home銆丄bout銆乀eam銆両ndustries銆丒vents 椤甸潰鎸夊悇鑷尯鍧楄捣鐐规斁缃綆灞傜骇 `#1d1d1d` 鏂滀笁瑙掕儗鏅?|
| 2026-05-05 21:54 | main | 椤甸潰涓夎褰㈠眰绾т笌閫忔槑搴﹁皟鏁?| `PageTriangle` 榛樿褰㈢姸鏀逛负 `polygon(100% 0, 100% 100%, 50% 100%)` 涓斿眰绾т负 `z-0`锛汣ontact 椤典笁瑙掑舰淇濇寔 `z-20` 骞跺鍔?`opacity-30` |
| 2026-05-05 21:58 | main | 椤甸潰涓夎褰㈤€忔槑搴︿笌椤剁偣璋冩暣 | `PageTriangle` 榛樿褰㈢姸鏀逛负 `polygon(100% 0, 100% 100%, 40% 100%)`锛孒ome/About/Team/Industries/Events 浣跨敤 `opacity-50`锛汣ontact 椤典笁瑙掑舰浠?`opacity-30` 鏀逛负 `opacity-50` |
| 2026-05-06 21:42 | main | 棣栭〉瀛椾綋涓庤疆鎾井璋?| Hero 鏍囬鏀逛负瀹為檯澶у啓骞舵斁澶?1.2 鍊嶏紱Vision 鏂囨鎷嗗垎缁嗕綋鏂滀綋涓庣矖浣擄紱Industries 姝ｆ枃/鍗＄墖銆丠onors 璇存槑鍜?Events 杞挱鍐呭鎸夊弽棣堣皟鏁?|
| 2026-05-06 21:55 | main | 棣栭〉 1920 鍩哄噯 rem 鎹㈢畻 | 灏?Hero銆乂ision銆両ndustries銆丠onors銆丒vents 鍜?Clients 鏂囨瀛楀彿鎸?16px 鍩哄噯钀藉埌鍥哄畾 rem锛屽苟琛ュ厖 Events 鎻忚堪鍗℃笎鍙樹笌鍙充笅瑙掍笁瑙掑舰瑙嗚 |
| 2026-05-06 22:00 | main | 棣栭〉 Events 杞挱甯冨眬淇 | 绉婚櫎杞挱鍗″灞傛笎鍙樿竟妗嗭紝淇濇寔鍥剧墖涓庤鏄庣洅鐙珛鍒嗙锛屽苟鎶婂浘鐗囨棩鏈?鏍囬瀹氫綅鍒板乏涓嬭 70% 瀹芥枃瀛楀尯 |
| 2026-05-06 22:05 | main | 棣栭〉 Events 杞挱瀹藉害淇 | 杞挱瀹瑰櫒鏀逛负 `w-full` 鍗犳弧鐖剁骇鍐呭鍖猴紝杞挱鍗″搴﹁缃负 `62.1875rem max-w-full` 瀵瑰簲 995px 璁捐绋垮搴?|
| 2026-05-06 22:06 | main | 棣栭〉 Events 璇存槑鍗℃崲琛屼慨姝?| 鍒犻櫎璇存槑娈佃惤 `truncate`锛岃 Kinsey Kang Yanan 浜嬩欢鎻忚堪鍦ㄤ笅鏂规柟鍧椾腑鎸夊唴瀹硅嚜鐒舵崲琛?|
| 2026-05-06 22:07 | main | 棣栭〉 Events 妯悜鍐呰窛淇 | 鍥剧墖宸︿笅瑙掓枃瀛?`left` 涓庝笅鏂硅鏄庡崱宸﹀彸 padding 缁熶竴璁剧疆涓?`5.5625rem`锛屽搴?89px 璁捐绋胯窛绂?|
| 2026-05-06 22:09 | main | 棣栭〉 Events 杞挱灞曠ず淇 | 鍥剧墖鏃ユ湡鍜屾爣棰樻枃瀛楀疄闄呭乏璺濅繚鎸?`5.5625rem`锛屾爣棰樺乏绔栫嚎浠呭寘瑁规鏂囷紱杞挱鑸炲彴楂樺害鍔犲埌 `64rem / 68rem` 灞曠ず瀹屾暣璇存槑鍗?|
| 2026-05-06 22:31 | main | Hero 鏈湴绱犳潗鎺ュ叆 | 鍙戝竷 `src/assets/{home,about,team,industries,event,contact}/hero.png` 鍒?`public/assets/*/hero.png`锛屽苟鏇挎崲瀵瑰簲椤甸潰 Hero 鑳屾櫙寮曠敤 |
| 2026-05-06 22:33 | main | 棣栭〉 Hero 浜害璋冩暣 | 灏嗛椤?Hero 鍥剧墖 opacity 浠?`60%` 鎻愰珮鍒?`90%`锛屾暣浣撻伄缃╀粠 `black/70` 闄嶄綆鍒?`black/38`锛岃鏈湴鑳屾櫙鍥炬洿娓呮櫚鏄庝寒 |
| 2026-05-06 22:35 | main | 棣栭〉 Hero 閬僵绉婚櫎 | 鍒犻櫎 Hero 鍏ㄥ睆娓愬彉閬僵锛屽彧淇濈暀 `bottom: 0`銆侀珮搴?`30%` 鐨勫簳閮ㄦ殫鑹茶繃娓″眰 |
| 2026-05-06 22:37 | main | 棣栭〉 Vision 鏍囪瘑瀛楅噸璋冩暣 | 鍙充晶鏃嬭浆 `Vision` 浠?`font-light uppercase` 鏀逛负 `font-normal`锛屾寜鏂囨湰鏈韩澶у皬鍐欏睍绀?|
| 2026-05-06 22:40 | main | 棣栭〉 Industries 鍥剧墖鎺ュ叆 | 鍙戝竷 `src/assets/home/INDUSTRIES1.png` 鍒?`INDUSTRIES5.png` 鑷?`public/assets/home`锛屽苟鏇挎崲棣栭〉鍓嶄簲寮犺涓氬崱鐗囧浘鐗?|
| 2026-05-06 22:52 | main | 棣栭〉 Industries 涓嬪垝绾夸綅缃慨姝?| 鐏拌壊妯嚎鏀逛负璺熼殢璇存槑姝ｆ枃涔嬪悗鏄剧ず锛屼笉鍐嶄綅浜?Industries & Services 鏍囬姝ｄ笅鏂?|
| 2026-05-06 22:54 | main | 棣栭〉 Honors 骞翠唤鎸夐挳鎺掔増 | 骞翠唤鎸夐挳鏀逛负 `text-[1.25rem] font-bold justify-start text-left px-4`锛屽搴?20px 宸﹀榻愮矖浣撴牱寮?|
| 2026-05-06 22:55 | main | 棣栭〉 Events active 璇存槑鍗?| Events 杞挱涓嬫柟璇存槑鍧楀鍔?`position === "active"` 鏉′欢娓叉煋锛屽乏鍙抽瑙堝崱鍙樉绀哄浘鐗囧尯鍩?|
| 2026-05-06 22:56 | main | 棣栭〉 Events 鎺у埗鎸夐挳闂磋窛 | 杞挱鑸炲彴楂樺害浠?`64rem / 68rem` 璋冩暣涓?`56rem / 58rem`锛屾帶鍒舵寜閽杈硅窛浠?`mt-4` 璋冩暣涓?`mt-1` |
| 2026-05-06 23:00 | main | About Hero 瀛椾綋璋冩暣 | About us 鏍囬璁剧疆涓?`6rem`銆乣fontWeight: 600`锛孒ero 姝ｆ枃璁剧疆涓?`2rem`銆乣fontWeight: 500`銆乮talic |
| 2026-05-06 23:01 | main | About Vision 璇存槑瀛椾綋璋冩暣 | `VisionCard` 椤堕儴璇存槑浠?clamp 瀛楀彿鏀逛负 `text-[1.5rem] font-medium`锛屽彇娑?capitalize |
| 2026-05-06 23:06 | main | About 鍐呭瀛椾綋绯荤粺璋冩暣 | Vision 鏍囬/姝ｆ枃/See More銆丠onors 鏍囬/璇存槑/骞翠唤/濂栭」灞曞紑鍐呭銆丆ulture 鏍囬鎸夋寚瀹?px 鍊兼崲绠椾负 rem 骞舵洿鏂板瓧閲?|
| 2026-05-06 23:07 | main | About Culture 涓?Chronicle 瀛椾綋璋冩暣 | Culture 姝ｆ枃鏀逛负 `1.75rem` regular銆佹寜閽敼涓?`1.125rem` medium锛汣hronicle 鏍囬/璇存槑/骞翠唤/鏈?姝ｆ枃鎸夋寚瀹?rem 鍜屽瓧閲嶈惤鍦?|
| 2026-05-06 23:09 | main | About Hero 钂欏眰浣嶇疆璋冩暣 | About Hero 鐨勪袱灞傛笎鍙橀伄缃╀粠 `inset-0` 鏀逛负 `top-[100svh] bottom-0`锛岄灞忓畬鏁村睍绀哄師鍥?|
| 2026-05-06 23:12 | main | About Vision 鑳屾櫙鍥炬帴鍏?| 鍙戝竷 `src/assets/about/aboutVision.png` 鍒?`public/assets/about/aboutVision.png`锛屽苟浣滀负 `VisionCard` 鑳屾櫙鍥惧眰浣跨敤 |
| 2026-05-06 23:13 | main | About Vision 涓よ鏂囨淇 | 灏嗚鏄庡鍣ㄥ搴︽斁瀹藉埌 `max-w-[56rem]`锛屽苟缁欑浜岃鍔?`whitespace-nowrap` |
| 2026-05-06 23:16 | main | About Honors 椤堕儴璇存槑鎺掔増 | Honors 椤堕儴璇存槑鏀逛负 `justify-self-end text-right`锛屾媶鎴愪袱涓?block锛岀浜岃浣跨敤 `whitespace-nowrap` |
| 2026-05-06 23:17 | main | About Honors 璇存槑鍙宠竟鐣岃皟鏁?| 椤堕儴璇存槑澧炲姞 `lg:-mr-[var(--shell-md)]`锛岃鍙冲榻愬熀鍑嗙Щ鍔ㄥ埌灞忓箷鍙充晶鍐呭绾?|
| 2026-05-06 23:19 | main | About Honors 璇存槑婧㈠嚭淇 | 鍒犻櫎 `lg:-mr-[var(--shell-md)]`锛屽苟澧炲姞 `max-w-[calc(100vw-var(--shell-md)*2)]` 绾︽潫鍙充晶璇存槑瀹藉害 |
| 2026-05-06 23:20 | main | About Honors 涓?Vision 鑳屾櫙寰皟 | Honors 椤堕儴璇存槑鍒犻櫎 max-width 绾︽潫骞朵娇鐢ㄧ埗缃戞牸鍙宠竟鐣屽榻愶紱Vision 鑳屾櫙鍥句粠 `size-full` 鏀逛负 `h-full w-full` |
| 2026-05-06 23:31 | main | Team 椤靛瓧浣撳拰鎴愬憳鏁版嵁璋冩暣 | Team Hero銆丼pecial Forces銆丳artner 鍒嗗尯銆佹垚鍛樺鍚?鑱屼綅/Find out more 鎸夋寚瀹?px 鎹㈢畻涓?rem锛屾垚鍛樺崱鐗囨敼鐢?`teamInfo.md` 鐨勫鍚嶈亴浣嶅拰鏈湴鍥㈤槦鍥剧墖 |
| 2026-05-06 23:40 | main | Industries 椤靛瓧浣撲笌鍥剧墖璋冩暣 | Industries 鏍囬鏀逛负宸﹀榻?6rem medium锛岃鏄庡崱鐗囩Щ鍒版爣棰樹笅鏂癸紝鍏釜琛屼笟鍗＄墖鎺ュ叆 `in1.png` 鍒?`in6.png` 骞朵娇鐢?3rem semibold 鏍囬 |
| 2026-05-06 23:43 | main | Industries 涓?Events 鏂囨鍥剧墖璋冩暣 | Industries 鍗＄墖鏍囬鏀逛负鎸囧畾澶у皬鍐欎笌鎹㈣锛汦vents Hero 鍜屽崱鐗囨枃妗堟寜 100px/36px/30px/24px 瑙勬牸鏇存柊锛屽苟鎺ュ叆 event1-3 鍥剧墖 |
| 2026-05-06 23:47 | main | Contact 椤靛瓧浣撲笌鏂囨璋冩暣 | Contact Hero銆丆ontact us 鍙屾爮銆丣oin Us銆佸€欓€変汉鍗＄墖鍜屾嫑鑱橀偖绠辨彁绀烘寜 96px/52px/36px/32px/28px 瑙勬牸鏇存柊 |
| 2026-05-06 23:48 | main | Industries Hero 浣嶇疆璋冩暣 | 灏?Industries 鏍囬瀹瑰櫒浠庡瀭鐩村眳涓敼涓洪《閮?`36.875rem` 鍋忕Щ锛屽搴?1920 璁捐绋?590px |
| 2026-05-06 23:52 | main | Team Zoe Zhang 鍥剧墖鎺ュ叆 | 鍙戝竷 `src/assets/team/team4.png` 鍒?public锛屽苟灏?Zoe Zhang 鍗＄墖鍥剧墖浠庡師鍨嬪鐢ㄥ浘鏀逛负 `/assets/team/team4.png` |
| 2026-05-07 00:08 | main | Team Profile 璇︽儏椤甸噸鎺?| 灏?`/team/yuxuan-liu` 鏀逛负瀵硅娓愬彉 Hero銆?28px 鍐呭杈硅窛鐨勪俊鎭粙缁嶅睆銆丒xperience 灞忓拰 Performance 灞?|
| 2026-05-07 00:17 | main | Team Profile 璇︽儏椤电粏鍖?| Hero 鍥哄畾涓?`45.9375rem` 楂樺苟鏀圭敤 `team1.png`锛孡anguage Skills 涓?Professional Qualification 鍚屽垪锛孍xperience 鍖烘敼涓哄乏渚?Practice 鍙屽潡銆佸彸渚?Honors |
| 2026-05-07 00:21 | main | Team Profile 灞曞紑浜や簰 | 涓?Honors 鍜?Performance 鐨?View more 澧炲姞鍙睍寮€/鏀惰捣鍐呭锛屽苟琛ュ厖 `teamInfo.md` 鍚庣画鏉＄洰 |
| 2026-05-07 00:23 | main | Team Profile 闈㈠寘灞戣瑙?| 灏?Our Team / Yuxuan Liu 闈㈠寘灞戞潯璋冩暣涓洪粦鑹茶儗鏅紝褰撳墠椤逛娇鐢ㄧ櫧鑹叉枃瀛?|
| 2026-05-07 00:27 | main | Industries 璇︽儏鍐呭鎺ュ叆 | Finance 涓?Real Estate 鍦ㄥ垪琛ㄧ浜屾鍙充晶涓婁笅鎺掑垪锛岃鎯呴〉 Hero 浣跨敤瀵瑰簲琛屼笟鍗＄墖鍥剧墖骞跺睍绀?`industriesInfo.md` 鏂囨 |
| 2026-05-07 00:28 | main | Events 璇︽儏椤垫帓鐗?| 浜嬩欢璇︽儏椤垫敼涓?64px 鏍囬銆?8px 鏃ユ湡銆?4px light italic 涓昏鏄庡拰 Educational Background 淇℃伅缁撴瀯 |
| 2026-05-07 00:42 | main | Core Value 婊氬姩鍔ㄧ敾 | 鏂板 `CoreValueScrollFlow`锛屼娇鐢?`core1-3.png` 瀹炵幇妗岄潰婊氬姩杩涘害椹卞姩鐨勫彸渚у浘鐗囧爢鍙犳彮绀轰笌宸︿晶浠峰€艰鍐呭鍒囨崲 |
| 2026-05-07 00:44 | main | Core Value 鍥剧墖鍚搁《浣嶇疆 | 鍙充晶鍥剧墖鍫?sticky 瀹瑰櫒鏀逛负 `top-[5rem]`锛屽浘鐗囧爢鏁翠綋鍚戜笅鍋忕Щ `5rem` |
| 2026-05-07 00:46 | main | Core Value 鏂囨瑙勬牸 | 浠峰€艰鏍囬鏀逛负 `1.75rem` 閲戣壊 semibold锛屾鏂囨敼涓?`1.5rem` regular锛屽苟鏇挎崲 No.1 Tiger 娈佃惤 |
| 2026-05-07 00:48 | main | Core Value 瑙嗚缁嗗寲 | 鍒犻櫎婊氬姩鍖洪《閮ㄩ澶栧紩瀵兼枃妗堝拰鏍囬涓嬪垝绾匡紝鑳屾櫙缁熶竴涓?`#171717`锛屽彸渚у浘鐗囧爢鏀逛负 `top-[10rem]` sticky |
| 2026-05-07 00:50 | main | Core Value sticky 鍔ㄧ敾瀵归綈 | 鍙充晶鍥剧墖鍫嗘仮澶嶄负鍙傝€冨姩鐢荤殑 `sticky top-0 h-screen` 灞呬腑瀹瑰櫒锛屽唴灞備笅绉?`10rem` 骞剁缉鏀惧埌 `0.9` |
| 2026-05-07 00:53 | main | Core Value 鍥剧墖鍫嗗彔瀵归綈 | 鍙充晶鍥剧墖鍫嗘敼涓?`浜嬩欢 copy` 鐨勫浐瀹氶珮搴?absolute 鍙犳斁缁撴瀯锛屼娇鐢?px 绾?`translateY` 鍜?`clip-path` 鎻ず |
| 2026-05-07 00:56 | main | Core Value 浜嬩欢 copy 鍔ㄧ敾瀵归綈 | 婊氬姩鐩戝惉鏀逛负涓?`FeaturesSection` 涓€鑷寸殑 window scroll 杩涘害璁＄畻锛屽浘鐗囨爤楂樺害鍜?transform 杩囨浮鏀逛负 inline 鍥哄畾鍊硷紝骞朵粠 `tsconfig.json` 鎺掗櫎 `浜嬩欢 copy` 鍘熷瀷 |
| 2026-05-07 01:01 | main | Team 鍔ㄦ€佷釜浜鸿鎯?| 鏂板 `src/data/teamProfiles.ts` 鍜?`/team/[slug]` 璺敱锛孴eam 鍗＄墖鎸夋垚鍛?slug 璺宠浆骞舵覆鏌撳搴斿鍚嶃€佸浘鐗囥€佽亴浣嶃€侀偖绠卞拰涓汉浠嬬粛鍐呭 |
| 2026-05-07 01:02 | main | Core Value 鍥剧墖鏄剧ず淇 | 涓哄彸渚у浘鐗囧爢鐨勪笅绉诲拰缂╂斁鍖呰９灞傝ˉ鍏?`w-full`锛屼繚璇?`CoreImageStack` 鑳界户鎵?sticky 鍒楀搴︽甯告樉绀?|
| 2026-05-07 01:04 | main | Core Value sticky 淇 | 鍒犻櫎 `CoreValuePage` 鏍?main 涓婄殑 `overflow-x-hidden`锛岃鍙充晶鍥剧墖鍖烘寜瑙嗙獥鑰屼笉鏄鍓鍏堟墽琛?sticky 鍥哄畾 |
| 2026-05-07 01:05 | main | Core Value 鍥剧墖浣嶇疆璋冩暣 | 鍙充晶鍥剧墖鍫嗗亸绉讳粠 `translate-y-[10rem]` 璋冩暣涓?`translate-y-[5rem]`锛屾暣浣撳悜涓婄Щ鍔?5rem |
| 2026-05-07 01:17 | main | offweb 閮ㄧ讲 | 浣跨敤 `NEXT_SNAPSHOT_BASE_PATH=/offweb` 鏋勫缓 standalone 鍖咃紝鍙戝竷鍒?`husuweb-offweb.service` 骞堕€氳繃 Nginx 鏆撮湶 `/offweb/` |
| 2026-05-07 01:25 | main | offweb 鍥剧墖璺緞淇 | `next.config.ts` 娉ㄥ叆 `NEXT_PUBLIC_BASE_PATH`锛宍ImageWithFallback` 鑷姩灏?`/assets/*` 杈撳嚭涓?`/offweb/assets/*` |
| 2026-05-07 09:35 | main | offweb 瀛愯矾寰勮烦杞慨澶?| Culture 鍏ュ彛鏀圭敤 Next `Link`锛岀嚎涓?href 涓?`/offweb/about/core-value/`锛涙柊澧?not-found 椤碉紝Return Home href 涓?`/offweb/` |
| 2026-05-07 22:07 | main | 棣栭〉 Honors/Events 涓?Clients 璋冩暣 | Honors 鏀逛负鎸?`EN/award.md` 骞村害灞曠ず鏈€杩戜笁鏉★紝Events 浣跨敤 `EN/event.md` 鎸囧畾涓夋潯鍜?`assets/home` 鍥剧墖锛孋lients 鍖哄煙鏍峰紡鍚屾璋冩暣 |
| 2026-05-07 22:16 | main | 棣栭〉瑙嗚缁嗚妭淇 | Vision 鎸夐挳瀛楄窛缂╁皬锛岄椤靛唴瀹瑰眰绾ч珮浜庤儗鏅笁瑙掑舰锛孍vents 鎺у埗鍖哄彸瀵归綈涓旀棩鏈熸敼涓鸿嫳鏂囨湀浠芥牸寮忥紝See More 澧炲姞 hover 浣嶇Щ |
| 2026-05-07 22:22 | main | 棣栭〉涓?About Honors 缁嗚妭淇 | Header 绉诲埌 Home 椤跺眰淇濇寔鍚搁《锛屼笁瑙掑舰浣嶄簬鑳屾櫙涔嬩笂鍐呭涔嬩笅锛孍vents 鎺у埗鎸夐挳缁濆璐村彸锛孉bout Honors 姝ｆ枃涓嶅啀婧㈠嚭瑙嗙獥涓旀棩鏈熺疆椤?|
| 2026-05-07 22:32 | main | About 鏁版嵁鎺ュ叆涓庨椤典笁瑙掑舰寰皟 | Honors 浣跨敤 `EN/award.md` 骞村害濂栭」锛孋hronicle 浣跨敤 `EN/CHRONICLE.md` 鍏ㄩ噺鏃堕棿绾匡紝See More 灞曞紑鍏ㄩ儴骞翠唤锛岄椤典笁瑙掑舰涓嬬Щ骞堕檷浣庨€忔槑搴?|
| 2026-05-07 22:38 | main | Title 涓?About Honors 灞曠ず璋冩暣 | Header 鑻辨枃瀵艰埅浣跨敤澶у啓婧愭枃妗堬紱About Honors 鏍囬鏀逛负鏂滀綋閲戣壊锛屽彸渚ц鏄庢寜鍙傝€冨浘鎺掔増锛孷iew Award 鏀寔鍏紬鍙烽摼鎺ュ瓧娈?|
| 2026-05-07 22:45 | main | Team Profile 鐪熷疄涓氱哗涓庡睍寮€浜や簰 | Team 涓汉璇︽儏椤典娇鐢?`EN/teamInfo.md` 鍏ㄩ噺涓汉涓氱哗锛涙棤 Honors 鐨勬垚鍛樹笉灞曠ず Honors 鍖哄潡锛沄iew More 浣跨敤 About 鍚屾鎸夐挳涓?grid 灞曞紑鍔ㄧ敾 |
| 2026-05-07 22:52 | main | Events 鏁版嵁涓庢寜閽氦浜?| Events 鍒楄〃鍜岃鎯呴〉鍏辩敤 `src/data/events.ts` 鐨?28 鏉′簨浠讹紱鍒楄〃 See More 鏀逛负 Culture 鍚屾鎸夐挳鍔ㄦ晥锛涢椤?Events 鎺у埗鎸夐挳灞呬腑锛孉bout Vision/Culture 鎸夐挳闂磋窛鍚屾寰皟 |
| 2026-05-07 22:57 | main | 鑳屾櫙灞傜骇鍜屾敹璧锋寜閽慨澶?| Home/About 椤甸潰鍐呭缁熶竴缃簬涓夎褰㈣儗鏅箣涓婏紱Chronicle See More 鏀逛负 Culture 鍚屾鎸夐挳锛涙墍鏈夊睍寮€鏀惰捣鎬佹枃妗堢粺涓€涓?`COLLAPSE` |
| 2026-05-07 23:04 | main | 棣栭〉涓?About Honors 瑙嗚寰皟 | 棣栭〉 Hero 鏍囬浣跨敤鎸囧畾閲戣壊瀵硅娓愬彉锛汣lients 涓夎 Logo 鏀逛负浜掍笉閲嶅鍒嗙粍骞跺姞灏忓渾瑙掞紱About Honors 灞曞紑鍐呭鍙充晶浣跨敤 `awardbg.png` 鑳屾櫙 |
| 2026-05-07 23:12 | main | About Honors 鍏紬鍙疯烦杞?| View Award 鎸夐挳鎸夊椤圭粦瀹?`EN/award.md` 閲岀殑寰俊鍏紬鍙锋枃绔犻摼鎺ワ紱鏃犲叕浼楀彿閾炬帴鐨勬潯鐩笉鏄剧ず鎸夐挳 |
| 2026-05-07 23:26 | main | 涓枃缃戠珯鏂囨鎺ュ叆 | 鏂板 `src/i18n/LanguageProvider.tsx` 涓?`src/i18n/copy.ts`锛岃瑷€鎸夐挳鍙悓姝ュ垏鎹㈤〉闈富浣撱€侀〉鑴氬拰涓昏浜嬩欢涓枃鎽樿 |
| 2026-05-08 00:05 | main | 涓枃鍒楄〃鏁版嵁鎺ュ叆 | 棣栭〉鑽ｈ獕鍜屽姩鎬併€丄bout 鑽ｈ獕鍜屽ぇ浜嬭銆佸洟闃熷崱鐗囧鍚嶈亴浣嶆寜 `Chinese/awards.md`銆乣Chinese/event.md`銆乣Chinese/CHRONICLE.md`銆乣Chinese/teamInfo.md` 鍒囨崲涓枃 |
| 2026-05-08 00:22 | main | 鍥㈤槦璇︽儏涓枃鍖?| `TeamProfilePage` 鎸夊綋鍓嶈瑷€鏄剧ず `Chinese/teamInfo.md` 鐨勫熀鏈俊鎭€佷笓涓氶鍩熴€佹墽涓氱粡楠屻€佽崳瑾夊拰涓汉涓氱哗 |
| 2026-05-08 00:26 | main | 琛屼笟璇︽儏涓枃鍖?| `/industries/[slug]` 鎸夊綋鍓嶈瑷€鏄剧ず `Chinese/industriesInfo.md` 鐨勮涓氱畝浠嬩笌鏈嶅姟鑼冨洿 |
| 2026-05-08 00:29 | main | 鏀惰捣鎸夐挳涓枃鏂囨 | 鍏叡 `copy.common.collapse` 涓枃鍊兼敼涓?`鏀惰捣`锛岃嫳鏂囦粛淇濇寔 `COLLAPSE` |
| 2026-05-08 00:33 | main | 琛屼笟璇︽儏 metadata 淇 | 鏂板 `src/data/industryMetadata.ts` 渚?`/industries/[slug]` 鏈嶅姟绔?metadata 鍜岄潤鎬佸弬鏁扮敓鎴愪娇鐢?|
| 2026-05-08 00:41 | main | 鏈嶅姟琛屼笟鍗＄墖鏂囨淇 | `/industries` 鍗＄墖鏍囬鏀逛负闅?slug 缁戝畾鐨勪腑鑻辨枃鏂囨锛屽垪琛ㄦ樉绀轰笌璇︽儏璺宠浆淇濇寔涓€鑷?|
| 2026-05-08 09:29 | main | 鍥剧墖鍔犺浇浼樺寲 | 鍏抽敭棣栧睆鍥句娇鐢?eager/high锛岄潪棣栧睆鍥?lazy锛岄〉闈㈠ぇ鍥惧垏鎹负 WebP锛孋ore Value 婊氬姩鍔ㄧ敾浣跨敤 rAF 涓?IntersectionObserver 闄嶄綆鏃犳晥璁＄畻 |
| 2026-05-08 21:38 | main | hover 鍥剧墖鍔ㄧ敾淇 | 棣栭〉琛屼笟銆佷簨浠躲€佽涓氬垪琛ㄣ€佸洟闃熴€丆ontact 鍩庡競鍥惧拰 About Culture 鐨?hover 缂╂斁鍥剧墖鏀逛负鍏堝姞杞藉悓姝ヨВ鐮侊紝閬垮厤鐩存帴鏀惧ぇ |
| 2026-05-08 21:47 | main | Clients Logo 婊氬姩淇 | 绉婚櫎 logo 琛?hover 鏆傚仠瑙勫垯锛屽苟灏嗘粴鍔ㄥ姩鐢绘椂闀垮啓鍏ュ叏灞€ CSS锛屼繚璇佷笁琛?Logo 鎸佺画婊氬姩 |
| 2026-05-08 21:51 | main | 鍏ㄥ眬鍔ㄦ晥瑙勫垯淇 | `prefers-reduced-motion` 涓嶅啀鍘嬬缉鎵€鏈?transition 鍜?animation 鏃堕暱锛屾仮澶?See More銆丩ogo 澧欏拰鍥剧墖 hover 鐨勬甯歌繃娓?|
| 2026-05-08 22:19 | main | 棣栭〉涓?About 浜や簰鏇存柊 | Hero 鎺ュ叆娴锋氮瑙嗛鍜屾祦鍏夋枃瀛楋紱棣栭〉 Honors 榛樿 2026 骞惰ˉ 2020/2019锛涜涓氬崱鐗囪烦璇︽儏锛汦vents 鏂板 20210218/20201023锛涗慨澶?Core Value rootMargin銆丆ulture 鍥剧墖鍜?Chronicle 骞翠唤鎸夐挳 hover |
| 2026-05-08 22:21 | main | 棣栭〉 Hero 璧勬簮绛栫暐璁板綍 | 棣栭〉 Hero 鏄庣‘淇濈暀瑙嗛璧勬簮锛屼笉鍐嶇撼鍏?WebP 鍘嬬缉鍥剧瓥鐣ワ紱闄ゆ寚瀹氬師鍥惧鍏朵綑椤甸潰缁х画浣跨敤 WebP |
| 2026-05-08 22:30 | main | 棣栭〉 Events 涓?Honors 寰皟 | 棣栭〉 Events 杞挱琛ラ綈 2021/2020 涓ゆ潯铏庣溂瑙傚療鍜屽浘鐗囪祫婧愶紱Honors 骞翠唤鎸夐挳鏀逛负姣忓睆 5 涓苟閫氳繃宸﹀彸鎸夐挳寰幆婊戝姩 |
| 2026-05-08 22:40 | main | 鏂囨涓?Logo 缁熶竴 | Awards Won 涓枃鏀逛负鈥滄墍鑾峰椤光€濓紝棣栭〉 Vision 涓枃瀛楀彿闄嶈嚦 80%锛屽洟闃熷彛鍙峰拰鑱旂郴鏂囨鏇存柊锛屼釜浜烘暀鑲茶儗鏅寜鍒嗗彿鍒嗘锛孒eader/Footer 浣跨敤 `logo.svg` |
| 2026-05-08 22:44 | main | Logo 灏哄鏍″噯 | Title/Header logo 鏀逛负 86px 瀹斤紝Footer logo 鏀逛负 152px 瀹斤紝鍧囦繚鎸?SVG 绛夋瘮楂樺害 |
| 2026-05-08 22:46 | main | Logo 灏哄鏀惧ぇ | Title/Header logo 瀹藉害鏀逛负 `10.75rem`锛孎ooter logo 瀹藉害鏀逛负 `19rem`锛屽潎涓轰笂涓€鐗堜袱鍊?|
| 2026-05-08 22:55 | main | 鏇挎崲鍥剧墖璧勬簮鍚屾 | 鏂颁簩缁寸爜鍙戝竷鍒?Footer锛涢椤?Real Estate 鍜屽洟闃?team2 閲嶆柊鐢熸垚 WebP锛汚bout Culture 宸﹀浘鍚屾鏂?PNG锛涢椤?Vision 涓枃鈥滆檸璇夋効鏅€濇敼涓?`7rem` |
| 2026-05-08 22:58 | main | Honors 閫夋嫨浜や簰淇 | 棣栭〉 Honors 宸﹀彸鎸夐挳鏀逛负绉诲姩 active 骞翠唤锛?026 宸︾Щ鍒?2019锛?019 鍙崇Щ鍥?2026锛屽苟淇濇寔 5 涓勾浠界獥鍙ｈ窡闅?|
| 2026-05-08 23:02 | main | Logo 璧勬簮涓庡昂瀵告洿鏂?| 鏂扮増 `logo.svg` 鍙戝竷鍒?Title/Footer public 璺緞锛汬eader 瀹藉害鏀逛负 `5.375rem`锛孎ooter 瀹藉害鏀逛负 `9.5rem` |
| 2026-05-08 23:05 | main | Clients logo 灏哄璋冩暣 | 棣栭〉瀹㈡埛 Logo 澧欎腑姣忎釜 logo 鏀逛负 `h-[80%] w-auto max-w-full`锛屽崰鎹崱鐗囩埗瀹瑰櫒楂樺害 80% |
| 2026-05-08 23:08 | main | Events 杞挱涓庢爣棰樹慨姝?| 鏂板涓ゆ潯浜嬩欢鐨勮嫳鏂囨爣棰樿ˉ榻愬埌棣栭〉鍜?`/events` 鏁版嵁婧愶紱棣栭〉 Events 浣跨敤 `useEffect` 姣?5 绉掕嚜鍔ㄥ垏鎹?|
| 2026-05-08 23:18 | main | Events 棣栧熬鍒囨崲浼樺寲 | 鑷姩杞挱 effect 渚濊禆 active event锛屾墜鍔ㄧ偣鍑诲悗閲嶅惎 5 绉掕鏃讹紝鍑忓皯鏈€鍚庝竴寮犵偣鍙虫椂鐨勮繛缁烦鍔ㄦ劅 |
| 2026-05-08 23:22 | main | About 涓?Contact 瑙嗚璋冩暣 | About Vision 鍘婚櫎鍥哄畾楂樺害渚濊禆骞朵负 See More 淇濈暀涓嬭竟璺濓紱Culture 宸﹀浘鍙栨秷婊ら暅/钂欏眰锛汣ontact us 宸︿晶鑳屾櫙鑹叉敼涓?`#A1865F` |
| 2026-05-09 08:50 | main | Team Profile 淇℃伅鍖鸿皟鏁?| Mengcheng Yun / 浜戞ⅵ鎴愮殑 `socialEngagements` 娓呯┖锛岃鎯呴〉浠呭湪 Social Engagements 鏈夊唴瀹规椂娓叉煋璇ュ尯鍧?|
| 2026-05-09 08:53 | main | OSS 闈欐€佽祫婧愭帴鍏?| 鏂板 `assetUrl()`銆乣.env.production` 鍜?`public/font/poppins.ttf`锛岀敓浜ф瀯寤洪粯璁ゅ皢 `/assets/*`銆侀椤佃棰戝拰瀛椾綋鍔犺浇鍒?OSS 鍓嶇紑 |
| 2026-05-09 08:57 | main | Events 婧愮礌鏉愬懡鍚嶆暣鐞?| 灏?`src/assets/event` 鏂板鍥剧墖浠庡井淇″師濮嬫枃浠跺悕鏁寸悊涓鸿繛缁殑 `event2` 鍒?`event39` |
| 2026-05-09 09:07 | main | Events 婧愮礌鏉愯烦鍙锋暣鐞?| 婧愮礌鏉愬懡鍚嶈烦杩囩己鍥剧紪鍙?7銆?0銆?8锛屽綋鍓嶄簨浠剁礌鏉愯鐩?`event2` 鍒?`event42` 鐨勬湁鏁堢紪鍙?|
| 2026-05-09 09:16 | main | Events 鐪熷疄鍐呭涓庡浘鐗囨帴鍏?| 灏?Events 鍒楄〃鎵╁睍涓?42 鏉＄湡瀹炰簨浠讹紝閫愭潯缁戝畾鐪熷疄鍥剧墖锛屽苟鍦ㄨ鎯呴〉灞曠ず涓嫳鏂囩湡瀹炴鏂?|
| 2026-05-09 09:25 | main | Events 鍥剧墖 OSS 鍚屾 | 涓婁紶 `public/assets/event/event1-42` 鍒?OSS锛屼繚璇佺敓浜х幆澧冭祫婧愬墠缂€涓嬪彲璁块棶 |
| 2026-05-09 09:29 | main | 瀛愰〉闈㈠鑸笌瑙嗚缁熶竴 | 鏂板 `SubpageBreadcrumb` 鍜?`BackToTop`锛岀粺涓€璇︽儏椤佃繑鍥炰笂涓€椤点€佽繑鍥為《閮ㄥ拰闈㈠寘灞戣瑙夛紝骞惰皟鏁?Culture/Team 鑳屾櫙灞傜骇 |
| 2026-05-09 09:33 | main | Events 璇︽儏鍗犱綅娓呯悊 | 浜嬩欢璇︽儏姝ｆ枃娓叉煋鍓嶇Щ闄ゅ浘鐗囧崰浣嶆枃鏈紝骞剁敤 slug + 搴忓彿鐢熸垚娈佃惤 key |
| 2026-05-09 09:35 | main | Events 涓枃鍒嗙被瑙勮寖鍖?| `localizeEvent` 灏嗕腑鏂囨爣棰樺唴鐨勫垎绫诲墠缂€鎷嗗嚭锛岄伩鍏嶅垪琛ㄥ拰璇︽儏鏄剧ず `???? | 铏庤瘔鍔ㄦ€乣 |
| 2026-05-09 09:41 | main | Core Value 涓?Hero 璧勬簮淇 | Core Value 妗岄潰婊氬姩鍥炬敼涓?`16:14` 妯悜灞曠ず锛孉bout/Team/Industries/Events/Contact/Core Value Hero 鍥句娇鐢?PNG |
| 2026-05-10 00:09 | main | 棣栭〉涓庡瓙椤甸潰璧勬簮浜や簰淇 | 鍚屾 42 寮犲鎴?Logo銆佹柊浜岀淮鐮佸拰鍥㈤槦鍥?WebP锛岄椤靛姩鎬佽疆鎾崱鐗囪烦璇︽儏锛孊ack 鎸夐挳鏀逛负杩斿洖涓婁竴椤碉紝琛屼笟璇︽儏闈㈠寘灞戝洖棣栭〉 |
| 2026-05-10 00:15 | main | Core Value 涓?About Vision 淇 | Core Value 涓枃鏍囬涓嶅啀鏄剧ず绌虹紪鍙凤紝缁勪欢 key 鏀逛负绋冲畾缁勫悎锛汚bout Vision See More 灞曞紑鐢ㄦ埛鎸囧畾鐨勪笁娈佃嫳鏂囨効鏅枃妗?|
| 2026-05-10 00:21 | main | About Vision 灞曞紑鏀惰捣 | Vision See More 鎸夐挳鏀逛负灞曞紑/鏀惰捣鍒囨崲锛屽睍寮€鐘舵€佹樉绀?`Collapse` / `鏀惰捣` |
| 2026-05-10 00:28 | main | Footer 浜岀淮鐮佹浛鎹㈢敓鏁?| 鏂颁簩缁寸爜鍚屾鍒?public 鍜?OSS锛孎ooter 寮曠敤澧炲姞鐗堟湰鍙傛暟纭繚绾夸笂鍒锋柊 |
| 2026-05-10 11:02 | main | Team Profile 鐢佃瘽灞曠ず | 鍥㈤槦涓汉璇︽儏 Hero 淇℃伅鍧楁柊澧炵數璇濋摼鎺ワ紝骞朵慨澶?Zoe Zhang 涓枃璇︽儏鏁版嵁涓殑鏈棴鍚堝瓧绗︿覆 |
| 2026-05-10 11:03 | main | Zoe Zhang 鎵т笟缁忛獙鍒嗘 | `TeamProfilePage` 鏀寔鎸夋崲琛屾媶鍒嗘墽涓氱粡楠岋紝Zoe 涓枃鍐呭鎷嗕负涓ゆ |
| 2026-05-10 11:07 | main | Footer 闅愮寮圭獥 | `SiteFooter` 鏂板 Disclaimer modal锛岀偣鍑婚〉鑴?Disclaimer and Privacy 灞曠ず鐢ㄦ埛鎸囧畾鏉℃鍐呭 |
| 2026-05-10 11:10 | main | Footer 浜岀淮鐮佷笌澶囨閾炬帴淇 | Footer 浜岀淮鐮佷娇鐢?`QRcode.png?v=202605101115` 閬垮厤鏃х紦瀛橈紝鍏畨澶囨鍜?ICP 澶囨鍙锋敮鎸佺偣鍑昏烦杞?|
| 2026-05-10 11:14 | main | 铏庤瘔鑽ｈ獕缂哄け鏉＄洰琛ラ綈 | 棣栭〉 Honors 涓?About Honors 琛ュ叆 202211銆?02304銆?0240515銆?0241129銆?02203 浜旀潯涓嫳鏂囪崳瑾夋暟鎹拰鍏紬鍙烽摼鎺?|
| 2026-05-10 11:16 | main | Min Xu 鑻辨枃绠€浠嬫洿鏂?| `src/data/teamProfiles.ts` 涓?`EN/teamInfo.md` 鍚屾鏇存柊 Min Xu Social Engagements 鏂囨锛岄〉闈㈡暟鎹瀯寤洪€氳繃 |
| 2026-05-10 11:26 | main | 鍥㈤槦鑻辨枃璇︽儏鎸夋簮鏂囨。鏍″噯 | Li Wan銆乑oe Zhang銆丮engcheng Yun銆乄eifan Qiu 鐨勮嫳鏂囪鎯呭瓧娈垫寜 `EN/teamInfo.md` 琛ュ叏骞堕€氳繃鏋勫缓 |
| 2026-05-10 11:31 | main | 琛屼笟璇︽儏鑻辨枃鍐呭涓庨潰鍖呭睉淇 | `/industries/[slug]` 闈㈠寘灞戝洖鍒?`/industries`锛岃嫳鏂?Private Equity銆丷eal Estate銆丼ports and E-Sports銆丆yber Tech and Game 鍐呭鎸夋簮鏂囨。琛ラ綈 |
| 2026-05-10 11:51 | main | 涓枃闅愮涓庢効鏅枃妗堣ˉ榻?| `SiteFooter` 闅愮寮圭獥鎸夎瑷€鏄剧ず涓枃鏉℃锛孉bout Vision See More 涓枃灞曞紑鍐呭鏇挎崲涓虹敤鎴锋寚瀹氫笁娈垫枃妗?|
| 2026-05-10 11:53 | main | 铏庤瘔鍔ㄦ€佸垪琛ㄥ浘鐗囧畬鏁村睍绀?| `EventsPage` 灏忓崱鐗囧浘妗嗘敼涓?`16:9` + `object-contain`锛屼繚鐣欏乏涓婂亸绉诲苟閬垮厤鐪熷疄浜嬩欢鍥捐鍒?|
| 2026-05-10 11:55 | main | 椤堕儴瀵艰埅涓嬪垝绾夸紭鍖?| `SiteHeader` 妗岄潰鍜岀Щ鍔?active 涓嬪垝绾跨敱 `1px` 鍔犵矖涓?`0.125rem`锛宧over 灞曞紑绾垮悓姝ュ姞绮?|
| 2026-05-10 12:02 | main | 棣栭〉 Events 杞挱鏁版嵁鍚屾簮 | `HomePage` 閫氳繃 slug 璇诲彇 `src/data/events.ts`锛屾爣棰樸€佹憳瑕併€佹棩鏈熴€佸浘鐗囧拰璇︽儏璺宠浆涓?Events 椤甸潰淇濇寔涓€鑷?|
| 2026-05-10 12:26 | main | Footer 浜岀淮鐮佺紦瀛樹笌灞曠ず淇 | `SiteFooter` 浜岀淮鐮?URL 鐗堟湰鏇存柊涓?`202605101205`锛宒ist 鍙戝竷鐩綍鍚屾褰撳墠 QR 鏂囦欢锛屽浘鐗囧睍绀烘敼涓?`object-contain` |
| 2026-05-10 12:27 | main | Events 鍗＄墖鍥剧墖鑳屾櫙鑷€傚簲 | `EventsPage` 鍗＄墖鍥炬澧炲姞鍚屽浘妯＄硦 cover 鑳屾櫙锛岄《灞備繚鎸?contain 瀹屾暣灞曠ず鍥剧墖 |
| 2026-05-10 12:28 | main | 瀹樼綉鏋勫缓鑼冨洿淇 | `tsconfig.json` 鎺掗櫎鏈撼鍏ュ綋鍓嶅畼缃戣繍琛岄摼璺殑 `cms` 鐩綍锛屾仮澶嶄富搴旂敤绫诲瀷妫€鏌ヨ寖鍥?|
| 2026-05-10 12:29 | main | Events 鍥剧墖鑷€傚簲濉厖 | `EventsPage` 鍗＄墖鍥剧墖绉婚櫎棰濆鑳屾櫙灞傚拰閬僵锛屽崟鍥句娇鐢?`object-cover` 濉弧 `16:9` 鍥炬 |
| 2026-05-10 16:16 | main | About 涓庡洟闃熻鎯?Hero 鍥剧墖鏇挎崲 | `AboutHero` 鎸囧悜 `/assets/about/about.png`锛沗TeamProfilePage` 鎸夋垚鍛?slug 浣跨敤 `/assets/team/1.png` 鑷?`/assets/team/6.png` 浣滀负鍏ㄥ睆棣栧睆鍥?|
| 2026-05-10 15:23 | main | Team Profile Hero 楂樺害鏍″噯 | `TeamProfilePage` Hero 浠?`100svh` 璋冩暣涓?`45.9375rem`锛屽浘鐗囪窡闅忕埗瀹瑰櫒瀹介珮灞曠ず |
| 2026-05-10 15:25 | main | Team Hero 涓庝釜浜轰俊鎭畾浣?| `TeamPage` Hero 鍥哄畾涓?`67.5rem`锛屽浘鐗囪窡闅忕埗瀹瑰櫒楂樺害锛沗TeamProfilePage` 淇℃伅鍧楁闈㈠乏璺濇寜 890px 鎹㈢畻涓?`55.625rem` |
| 2026-05-10 15:27 | main | Team Profile Hero 钂欏眰绉婚櫎 | 鍒犻櫎涓汉璇︽儏 Hero 鐨勫乏鍙虫殫娓愬彉鍜屽簳閮ㄦ笎鍙樺眰锛岃棣栧睆浜虹墿鍥炬棤钂欏眰鏄剧ず |
| 2026-05-10 15:43 | main | Event Detail 闈㈠寘灞戝洖棣栭〉 | `EventDetailPage` 闈㈠寘灞戠埗绾т娇鐢?`copy.nav.home`锛宖allback 杩斿洖棣栭〉锛屽尮閰嶉椤靛姩鎬佸崱鐗囪繘鍏ヨ鎯呯殑璺緞璇箟 |
| 2026-05-10 15:44 | main | Industry Detail 闈㈠寘灞戝洖棣栭〉 | `IndustryDetailPage` 闈㈠寘灞戠埗绾т娇鐢?`copy.nav.home`锛宖allback 杩斿洖棣栭〉锛屽尮閰嶉椤佃涓氬崱鐗囪繘鍏ヨ鎯呯殑璺緞璇箟 |
| 2026-05-10 15:50 | main | Footer 浜岀淮鐮侀€忔槑灞曠ず | `SiteFooter` 鍘绘帀浜岀淮鐮佸鍣ㄧ殑 `bg-white p-1`锛岄伩鍏嶉€忔槑 PNG 琚灞傜櫧搴曡鐩?|
| 2026-05-10 15:55 | main | About Vision 涓?Culture 鍥炬爣鏍″噯 | `VisionCard` 宸︿笂瑁呴グ鏀逛负鎻忚竟绌哄績涓婂紩鍙峰苟涓庢爣棰橀琛屽榻愶紱`Culture` 鑳屾櫙灏?logo 鏀圭敤 `public/assets/about/bg.png` |
| 2026-05-10 15:58 | main | About Vision 姝ｆ枃瀵归綈 | `VisionCard` 鏀逛负鏍囬鍖哄拰姝ｆ枃鍖哄叡浜袱鍒楃綉鏍硷紝鐧借壊鎻忚竟寮曞彿涓庨娈垫鏂囧悓鎺掞紱`Culture` 鑳屾櫙鍥惧搴︿粠 `26.25rem` 璋冧负 `15.75rem` |
| 2026-05-10 16:00 | main | About Vision 寮曞彿寰皟 | `VisionCard` 姝ｆ枃鍒楃户缁笌鏍囬鍒楀叡鐢ㄨ竟璺濓紝寮曞彿鏀逛负姝ｆ枃鍒楀唴缁濆瀹氫綅骞堕潬杩戦琛屾枃瀛?|
| 2026-05-10 16:04 | main | Vision 涓?Contact 鑳屾櫙璧勬簮瀵归綈 | `VisionCard` 浣跨敤 `/assets/about/Icon.svg` 浣滀负姝ｆ枃宸︿晶寮曞彿骞舵敹鎷负灞呬腑鍐呭瀹瑰櫒锛沗ContactPage` Contact us 宸︿晶鑳屾櫙鏀圭敤 `/assets/about/bg.png` |
| 2026-05-10 16:08 | main | Vision 鍐呭杈圭晫涓庡浘鏍囧祵鍏?| `VisionCard` 鍘绘帀鏍囬鍜屾鏂囩殑鐙珛宸﹀垪锛屾爣棰樺尯鍜屾鏂囧尯鍏变韩 `max-w-[88rem]` 宸﹀彸杈圭晫锛岄娈垫鏂囧唴浣跨敤娴姩 `Icon.svg` |
| 2026-05-10 16:11 | main | Vision 寮曞彿宓屽叆鏂瑰紡淇 | `VisionCard` 鏍囬琛屽拰姝ｆ枃鍖哄潎浣跨敤 `lg:pl-[7rem]`锛宍Icon.svg` 鏀逛负棣栨琛屽唴鍏冪礌锛岄伩鍏嶆暣娈垫枃瀛楀洿缁曞浘鐗?|
| 2026-05-10 23:07 | main | Vision 棣栨鍥炬爣瀹氫綅 | `VisionCard` 灏?`Icon.svg` 浠庢枃鏈祦涓Щ鍑猴紝浣跨敤 `left-[-7.625rem] top-[-3.125rem]` 璐磋繎棣栨绗竴琛屽乏渚э紝姝ｆ枃鏂囨湰涓庢爣棰樹繚鎸佺粺涓€宸﹁竟鐣?|
| 2026-05-10 23:08 | main | Vision 鍥炬爣鍗犱綅寰皟 | `VisionCard` 棣栨浣跨敤 `w-[2rem]` 琛屽唴鍗犱綅鍖呰９ `Icon.svg`锛屽浘鏍?`left-[-3.625rem]` 鍚戝乏浼稿嚭锛岄伩鍏嶅畬鏁村浘鏍囧搴︽尋鍘嬫鏂?|
| 2026-05-10 23:10 | main | Vision 鍥炬爣瀹氫綅鐐逛慨姝?| `VisionCard` 棣栨 `Icon.svg` 浠?`left-[-3.625rem]` 鏀逛负 `left-0`锛屽畾浣嶅埌 `2rem` 琛屽唴鍗犱綅璧风偣 |
| 2026-05-10 23:12 | main | Vision 鍐呭瀹藉害璋冩暣 | `VisionCard` 鍐呴儴鍐呭瀹瑰櫒鏀逛负 `max-w-[95rem]`锛屾斁瀹芥爣棰樹笌姝ｆ枃鎺掔増瀹藉害 |
| 2026-05-10 23:13 | main | Vision 姝ｆ枃鍜屽浘鏍囧井璋?| `VisionCard` 姝ｆ枃鍖虹Щ闄?`lg:pl-[7rem]`锛沗Icon.svg` 瀹藉害鏀逛负 `16.875rem`锛屽乏鍋忕Щ鏀逛负 `-11.25rem` 浠ヤ繚鎸佸彸渚ч敋鐐?|
| 2026-05-10 23:16 | main | Vision 棣栨鍥炬爣璐村悎 | `VisionCard` 棣栨 `Icon.svg` 鏀逛负璐磋繎姝ｆ枃绗竴琛屽乏渚э紝瀹藉害浠?`16.875rem` 缂╁皬鍒?`8.4375rem` |
| 2026-05-11 22:49 | main | Events 涓?About 鏁版嵁浜や簰淇 | Events 瀵煎嚭鑼冨洿鎸?`EN/event.md` 杩囨护涓?28 鏉★紝涓枃鏃ユ湡鏄剧ず涓?`YYYY.MM.DD`锛汚bout Chronicle 琛ュ叆 2026 骞?3-5 鏈堜笁鏉¤褰曪紝Honors 骞翠唤鎸夐檷搴忓睍绀猴紱璇︽儏椤?Back 鍙仮澶嶈繘鍏ュ墠婊氬姩浣嶇疆 |
| 2026-05-11 23:00 | main | About Chronicle 涓枃鏂囨鏍″噯 | About Chronicle 2026 骞翠笁鏈堛€佸洓鏈堛€佷簲鏈堜腑鏂囨鏂囨寜鐢ㄦ埛鎻愪緵鐗堟湰鏇挎崲锛岃ˉ鍏?CCAS銆佽锤浠蹭徊瑁佸憳鍚嶅唽鍜屼富瑕佽鍒ら鍩熻〃杩?|
| 2026-05-11 23:21 | main | Events event2 鏂板浜嬩欢鎺ュ叆 | 浠?`EN/event2.md` / `Chinese/event2.md` 鐢熸垚 15 鏉′腑鑻变簨浠舵暟鎹紝澶嶅埗 event2 涓?eventinfo2 鍥剧墖鍒?public锛屽苟璁╀簨浠惰鎯呴〉鎸?`[IMAGE]` 鍗犱綅椤哄簭鎻掑叆璇︽儏鍥剧墖 |
| 2026-05-11 23:28 | main | Events 鏃т簨浠惰鎯呭浘鎺ュ叆 | 浠?`src/assets/event/eventinfo` 鎸夋枃浠跺悕鏃堕棿椤哄簭涓烘棫 28 鏉′簨浠跺垎閰?22 寮犺鎯呭浘锛岃鎯呴〉鍚屾椂鏀寔鏁磋鍜岃鍐呭浘鐗囧崰浣嶇 |
| 2026-05-11 23:33 | main | Footer 浜岀淮鐮佽祫婧愬悓姝?| 灏嗘柊鐗?`src/assets/foot/QRcode.png` 瑕嗙洊鍒?`public/assets/foot/QRcode.png`锛屽苟灏?Footer 寮曠敤鐗堟湰鍒锋柊鍒?`202605112333` |
| 2026-05-11 23:36 | main | Event Detail 鐗堝紡璋冩暣 | `EventDetailPage` 鍒犻櫎鍙充晶浜嬩欢灏侀潰鍥惧鍣紝姝ｆ枃鍖哄煙鍗犳弧鍐呭鐖跺鍣紝璇︽儏鎻掑浘浣跨敤 `md:w-[70%]` 灞呬腑鏄剧ず |
| 2026-05-11 23:41 | main | About Hero 鍥剧墖鍚屾 | `AboutHero` 鑳屾櫙璺緞鏀逛负 `/assets/about/hero.png`锛屽苟灏?`src/assets/about/hero.png` 瑕嗙洊鍙戝竷鍒?`public/assets/about/hero.png` |
| 2026-05-11 23:45 | main | Clients Logo 婊氬姩閫熷害璋冩暣 | `.client-logo-track` 鍔ㄧ敾鏃堕暱浠?`135s` 缂╃煭鍒?`103.85s`锛屽疄鐜?1.3 鍊嶆粴鍔ㄩ€熷害 |
| 2026-05-11 23:49 | main | About Honors 鏈堜唤鎺掑簭 | `Honors` 澧炲姞 `sortAwardsByDateDesc`锛屽湪骞翠唤闄嶅簭鍩虹涓婂姣忎釜骞翠唤鐨勫椤规寜 `date` 闄嶅簭鎺掑簭 |
| 2026-05-12 00:52 | main | 鏍硅矾寰勬湇鍔″櫒閮ㄧ讲 | 浣跨敤鏍硅矾寰勬瀯寤虹殑 `dist/root-standalone.tgz` 鍙戝竷鍒?`/opt/daxuanweb-root/releases/20260512-0046`锛宍current` 鎸囧悜鏂?release锛屽叕缃?IP 楠岃瘉杩斿洖 200 |
| 2026-05-12 01:18 | main | 鍩熷悕 HTTPS 鎺ュ叆 | `www.tigerpartners.cn` 鎸囧悜鏍硅矾寰?Next 鏈嶅姟锛孋ertbot 璇佷功绛惧彂骞跺惎鐢ㄨ嚜鍔ㄧ画鏈燂紱瑁稿煙閫氳繃闃块噷浜?URL 杞彂鍒?HTTPS www 鍩熷悕 |
| 2026-05-12 01:40 | main | 鐙珛閮ㄧ讲鐩綍杩佺Щ | 鏀圭敤 `/opt/tigerpartners-web/releases/20260512-0136` 鍜?`tigerpartners-web.service` 鐙珛鎵胯浇铏庤瘔瀹樼綉锛孨ginx `www.tigerpartners.cn` 鍙嶄唬鍒?`127.0.0.1:3004`锛涚嚎涓?About Hero銆丗ooter 浜岀淮鐮併€侀偙浼熷竼鍥剧墖鍜?Events 鍥剧墖宸蹭笌鏈湴鍝堝笇涓€鑷?|
| 2026-05-12 01:52 | main | OSS 鍏抽敭鍥剧墖鍚屾 | 瑕嗙洊 `husuweb/assets/about/hero.png`銆乣husuweb/assets/foot/QRcode.png` 鍜?`husuweb/assets/team/team6.webp`锛屼笅杞藉洖婧愭牎楠屽潎涓庢湰鍦?SHA256 涓€鑷?|
| 2026-05-12 01:57 | main | OSS Events 鍥剧墖鍚屾 | 涓婁紶 `public/assets/event/event2` 鐨?15 寮犲垪琛ㄥ浘鍜?`public/assets/event/eventinfo2` 鐨?25 寮犺鎯呭浘鍒?OSS锛屽叏閮ㄤ笅杞藉洖婧愭牎楠岄€氳繃 |
| 2026-05-12 02:01 | main | OSS Clients Logo 鍚屾 | 涓婁紶 `public/assets/home/clientLogo` 鐨?42 涓鎴?Logo 鍒?OSS锛沗client-logo-41.png` 鍜屼唬鐮佸疄闄呭紩鐢ㄧ殑 `client-logo-42.jpg` 杩斿洖 200锛屾寚瀹氬垹闄ょ殑 `client-logo-26.png` 杩斿洖 404 |
| 2026-05-12 21:55 | main | 鍐呭涓庤祫婧愪慨姝?| Home metadata 杈撳嚭 `Home | Tiger Partners`锛汬ero 濯掍綋绉诲姩绔己鍒堕摵婊＄埗瀹瑰櫒锛汚bout Chronicle銆乀eam Profile 涓汉涓氱哗鍜?Core Value 鎸夋簮 md 琛ラ綈锛涙柊鐗?event2 鍥剧墖鍚屾鍒?public 鍜?OSS锛岀敓浜ф瀯寤洪€氳繃锛屽彂甯冨寘宸茬敓鎴愪絾杩滅▼閮ㄧ讲鏈墽琛?|
| 2026-05-12 22:03 | main | Core Value 鑻辨枃鎺掔増浼樺寲 | 鑻辨枃姝ｆ枃浣跨敤宸﹀榻愩€佹甯歌瘝璺濆拰 1.55 琛岄珮锛屼腑鏂囨鏂囦繚鐣欎袱绔榻愬苟鏀剁揣鍒?1.65 |
| 2026-05-12 22:07 | main | 鍏ㄧ珯绂佺敤娴忚鍣ㄧ缉鏀?| 鏍瑰竷灞€鎺ュ叆 locked viewport metadata 鍜?`ViewportZoomLock`锛屽叏灞€ CSS 澧炲姞 `touch-action: pan-x pan-y`锛屾嫤鎴父瑙佺Щ鍔ㄧ涓庢闈㈢缉鏀炬搷浣?|
| 2026-05-12 22:18 | main | About 涓庡洟闃熷浘鐗囧悓姝?| 灏?`src/assets/about/hero.png`銆乣src/assets/team/team5.png`銆乣src/assets/team/5.png` 瑕嗙洊鍒?public锛汳engcheng Yun 鍥㈤槦鍗＄墖鏀圭敤 `/assets/team/team5.png` |
| 2026-05-12 22:20 | main | Chronicle 鏂板浜嬩欢鏍″噯 | About Chronicle 2026 骞翠竴鏈堛€佷笁鏈堛€佸洓鏈堛€佷簲鏈堜腑鑻辨枃浜嬩欢鎸?`EN/CHRONICLE.md` 鍜?`Chinese/CHRONICLE.md` 鍚屾锛屼腑鏂囦簲鏈堣ˉ鍏呭浗闄呰锤鏄撱€佸叕鍙歌偂鏉冦€佸缓璁惧伐绋嬪拰鍥介檯鍟嗕簨浠茶棰嗗煙 |
| 2026-05-12 22:30 | main | 鍒樼厹鏆勮崳瑾夎鏄庢牸寮?| 涓嫳鏂囪崳瑾夊拰璁ゅ彲棣栧彞鏀逛负鍐掑彿缁撳熬锛屽苟鍦ㄥ洟闃熶釜浜鸿鎯呴〉瀵瑰啋鍙风粨灏剧殑鑽ｈ獕寮曞鍙ュ彇娑堝渾鐐规爣璇?|
| 2026-05-12 22:34 | main | Events 杩斿洖浣嶇疆淇 | Events 鍗＄墖杩涘叆璇︽儏鏃朵繚瀛?See More 灞曞紑鐘舵€侊紝杩斿洖鍒楄〃鏃跺厛鎭㈠瀹屾暣鍒楄〃鍐嶆墽琛屾粴鍔ㄤ綅缃仮澶?|
| 2026-05-12 22:37 | main | 鏃т腑鏂囧叆鍙ｅ吋瀹?| `next.config.ts` 澧炲姞 `/zh` 鍒?`/`銆乣/zh/:path*` 鍒?`/:path*` 鐨勪复鏃?redirect锛屽吋瀹规棫绔欎腑鏂囪矾寰勫叆鍙?|
| 2026-05-12 22:39 | main | 鏃ц嫳鏂囧叆鍙ｅ吋瀹?| `next.config.ts` 澧炲姞 `/en` 鍒?`/`銆乣/en/:path*` 鍒?`/:path*` 鐨勪复鏃?redirect锛屽吋瀹规棫绔欒嫳鏂囪矾寰勫拰 hash 鍏ュ彛 |
| 2026-05-12 22:40 | main | Chronicle 涓€鏈堣褰曠‘璁?| 纭 About Chronicle 2026 骞翠竴鏈堚€滆檸璇夎崳鐧汇€婇挶浼柉澶т腑鍗庡尯鎸囧崡2026銆嬩簤璁В鍐筹紙涓祫寰嬪笀浜嬪姟鎵€锛夋鍗曘€傗€濊褰曚繚鐣欏湪涓枃鏃堕棿绾夸腑 |
| 2026-05-12 23:12 | main | 铏庤瘔鍔ㄦ€佸崱鐗囧浘鐗囨瘮渚?| `EventsPage` 鍗＄墖椤堕儴鍥剧墖瀹瑰櫒鏀逛负 `aspect-[4/3]`锛屼繚鎸?`object-cover` 濉弧鍗＄墖鍥炬 |
| 2026-05-12 23:24 | main | Events 璇︽儏瑙嗛鎺ュ叆 | `EventDetailPage` 鏀寔 `detailVideos` 娓叉煋鍘熺敓瑙嗛鎾斁鍣紝2025.06.17 鍜?2024.11.13 涓ゆ潯 event2 鍔ㄦ€佺粦瀹氭柊澧?mp4 |
| 2026-05-12 23:30 | main | 绉诲姩绔?Hero 濯掍綋閾烘弧 | 椤甸潰绾?Hero 鍥剧墖鍜岄椤?Hero 瑙嗛缁熶竴澧炲姞 `block`銆乣min-w-full` 涓?`max-w-none`锛岀Щ鍔ㄧ瀹藉害濮嬬粓鍗犳弧鐖跺鍣?|
| 2026-05-12 23:38 | main | Events 瑙嗛鍗犱綅绗︽帓搴?| 2025.06.17 鍜?2024.11.13 涓ゆ潯 event2 姝ｆ枃琛ュ洖椋炰功瑙嗛鍗犱綅绗︼紝璇︽儏椤垫寜姝ｆ枃鍗犱綅椤哄簭鎻掑叆瑙嗛 |
| 2026-05-12 23:41 | main | event2Events 璇硶淇 | 鎵归噺琛ラ綈涓枃浜嬩欢鏁版嵁瀛楃涓查棴鍚堝紩鍙凤紝`tsc --noEmit` 瑙ｆ瀽閫氳繃 |
| 2026-05-12 23:46 | main | event2 涓枃鏁版嵁淇 | `src/data/event2Events.ts` 鐨?15 鏉℃柊澧炰簨浠?`zh` 瀛楁鎸?`Chinese/event2.md` 閲嶆柊鐢熸垚锛屾爣棰樸€佸垎绫汇€佹憳瑕佸拰姝ｆ枃鎭㈠姝ｅ父涓枃 |
| 2026-05-12 23:55 | main | 鎵嬫満绔?Hero 鍏ㄥ睆閾烘弧 | 椤甸潰绾?Hero 鍥剧墖鍜岄椤?Hero 瑙嗛鍦ㄦ墜鏈虹浣跨敤瑙嗗彛瀹藉害閾烘弧灞忓箷锛岄伩鍏嶇獎鍥惧彧鍗犵埗瀹瑰櫒灞€閮ㄥ搴?|
| 2026-05-13 00:02 | main | 鎵嬫満绔?Hero 楂樺害璋冩暣 | 鎵嬫満绔?Hero 濯掍綋鍙栨秷寮哄埗 `height: 100%`锛屽彧淇濈暀瀹藉害 100%锛屾闈㈢浠嶆寜瀹瑰櫒楂樺害閾烘弧 |
| 2026-05-13 00:09 | main | 鎵嬫満绔?Hero 鑼冨洿鏀舵暃 | 浠?Our Team 淇濈暀鎵嬫満绔搴﹁嚜閫傚簲 Hero 鍥撅紝鍏朵綑椤甸潰鎭㈠涓婁竴鐗堥摵婊℃柟寮忥紝骞朵负棣栧睆鏍囬澧炲姞绉诲姩绔瓧鍙?|
| 2026-05-13 00:20 | main | 绉诲姩绔唴瀹规孩鍑轰慨澶?| 鏀剁揣 Home Honors銆丠ome Events銆丄bout Vision銆丄bout Honors 鍜?Our Team 棣栧睆绉诲姩绔瓧鍙枫€佹柇琛屻€佹帶鍒跺尯鎺掑垪涓庨棿璺?|
| 2026-05-13 00:25 | main | About Chronicle 绉诲姩绔慨澶?| Chronicle 骞翠唤鎸夐挳鍙栨秷鎵嬫満绔礋浣嶇Щ锛屼簨浠跺崱鐗囧拰鏍囬璇存槑澧炲姞绉诲姩绔瓧鍙枫€佹柇琛屽拰瀹藉害绾︽潫 |
| 2026-05-13 00:35 | main | 姝ｅ紡绔欏彂甯?| 褰撳墠宸ヤ綔鍖烘瀯寤哄寘鍙戝竷鍒?`www.tigerpartners.cn` 瀵瑰簲鐨?`20260513-0028` release锛屾湇鍔￠噸鍚拰鍏綉楠岃瘉瀹屾垚 |
| 2026-05-13 00:39 | main | CIETAC Cup 鑻辨枃涔辩爜淇 | 2024.11.13 event2 浜嬩欢鑻辨枃鍐呭鎸?`EN/event2.md` 淇 `鈥淐IETAC Cup鈥漙 鍜?`year鈥檚` 绛変贡鐮佹枃鏈?|
| 2026-05-13 00:46 | main | event2 鑻辨枃涔辩爜娓呯悊 | 灏?`event2Events.ts` 涓墿浣?mojibake 鏍囩偣鍏ㄩ儴鎸?`EN/event2.md` 鎭㈠涓?`鈥檂銆乣鈥溾€漙 鍜?`鈥揱 |
| 2026-05-13 01:02 | main | 姝ｅ紡绔欓噸鏂板彂甯?| About 鍥剧墖鐩綍宸插悓姝ュ埌 OSS锛屽綋鍓嶅伐浣滃尯鍙戝竷鍒?`20260513-0058` release锛屾湇鍔￠噸鍚拰鍏綉楠岃瘉瀹屾垚 |
| 2026-05-15 01:20 | main | 棣栭〉涓?About 鏂囨鎺掔増淇 | 棣栭〉 Vision/Event 鑻辨枃璇存槑鏀逛负鎸囧畾涓よ锛孉bout Honors/Chronicle 鑻辨枃璇存槑鏀逛负鎸囧畾鍒嗚锛孎ooter 鍜?Team 鏍囪鎸夋寚瀹氭枃妗堝睍绀?|
| 2026-05-15 01:20 | main | OSS 鍥剧墖鏇挎崲鍚屾 | 鏈湴浜ゆ崲 event2 `1.jpg`/`2.jpg` 鍙婂吋瀹?PNG 鍚庝笂浼?OSS锛屽苟瑕嗙洊涓婁紶 Mengcheng Yun 鍥㈤槦鍗＄墖鍥惧拰涓汉璇︽儏鍥?|
| 2026-05-15 01:24 | main | 姝ｅ紡绔欓噸鏂板彂甯?| 01:20 鐗堟湰宸插彂甯冨埌 `20260515-0122` release锛宍tigerpartners-web.service` 閲嶅惎鎴愬姛锛涙鍚?Zoe 涓汉椤典笟缁╀慨鏀规湭閮ㄧ讲 |
| 2026-05-15 01:25 | main | Zoe 涓汉涓氱哗鏇存柊 | 浠?`EN/zoePerformance.md` 鍚屾 24 鏉′腑鑻辨枃 Performance & Achievements 鍒?`teamProfiles.ts`锛屾湰鍦?`tsc --noEmit` 閫氳繃 |
| 2026-05-15 08:48 | main | Zoe 鏈嶅姟琛屼笟涓?Events 灞曠ず琛ラ綈 | Zoe Zhang 鏈嶅姟琛屼笟鏇存柊涓哄浗闄呰锤鏄撱€佸叕鍙歌偂鏉冦€佸缓璁惧伐绋嬨€侀噾铻嶃€佸浗闄呭晢浜嬩徊瑁侊紱Events 椤甸潰鎭㈠灞曠ず `20210720` 鍜?`20200927` 涓ゆ潯宸叉湁浜嬩欢 |
| 2026-05-15 08:52 | main | Events 鏃т簨浠惰鎯呭浘琛ラ綈 | `eventInfoImagesByDate` 涓?`20210414` 鍜?`20210315` 澧炲姞鍥剧墖鏄犲皠锛岃鎯呴〉鍙寜 `[鍥剧墖]` 鍗犱綅娓叉煋瀵瑰簲鍥剧墖 |
| 2026-05-15 08:56 | main | 鍥㈤槦涓汉椤电Щ鍔ㄧ Hero 璋冩暣 | 鎵嬫満绔釜浜鸿鎯呴〉浣跨敤杩涘叆鍓嶅搴旂殑 `team1.png` 鑷?`team6.png` 鍥㈤槦鍗＄墖鍥撅紝淇℃伅鍖哄湪涓娿€佸浘鐗囧湪涓嬶紝閬垮厤 Hero 鍐呭閲嶅彔 |
| 2026-05-15 09:01 | main | Events 鑻辨枃鍐呭涓庢彃鍥捐ˉ榻?| `20210720` 鍜?`20200927` 鑻辨枃鍐呭鍚屾 `EN/event.md`锛屽苟灏?`20210720` 涓夊紶鏂板璇︽儏鍥惧悓姝ュ埌 `public/assets/event/eventinfo` 鍚庢寜鍗犱綅绗﹂『搴忔覆鏌?|
| 2026-05-15 09:08 | main | Events 鏃т簨浠惰鎯呭浘鍛藉悕鏍″噯 | `eventInfoImagesByDate` 鏀逛负寮曠敤 `20210414-1.jpg`銆乣20210720-1.jpg`銆乣20210720-2.jpg`銆乣20210720-3.jpg`锛屽苟鍚屾鍒?`public`锛沗20210315` 鏆備互褰撳墠瀛樺湪鐨勪袱寮?20210315 鍥剧墖娓叉煋 |
| 2026-05-15 09:22 | main | Events 鏂颁簨浠舵帓搴忔牎鍑?| `src/data/events.ts` 瀵?`event2Events` 鎸夊垪琛ㄥ浘鏂囦欢鍚嶄腑鐨勬暟瀛楀仛绋冲畾鎺掑簭锛孍vents 椤垫柊澧?15 鏉′簨浠舵寜 `event2` 鐩綍鍥剧墖鍛藉悕椤哄簭灞曠ず |
| 2026-05-15 09:29 | main | 琛屼笟鍥剧墖涓?Honors 璇存槑淇 | Cyber Tech and Game 鑳屾櫙鍥剧粺涓€鍒囧埌 `INDUSTRIES6.png` 骞跺悓姝?`public`锛汬ome/About Honors 鑻辨枃鍓爣棰樻寜鎸囧畾涓夎灞曠ず |
| 2026-05-15 09:41 | main | Events 鏃т簨浠朵笅绾?| `20200902` 宸蹭粠 `eventDatesFromEnglishSource` 绉婚櫎锛屼笉鍐嶈繘鍏?Events 椤甸潰鏁版嵁锛涗繚鐣?`allEvents` 涓師濮嬩簨浠跺璞′互渚垮悗缁仮澶?|
