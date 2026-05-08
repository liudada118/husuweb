Use the following single English prompt for Figma (copy–paste as is):

---

Create a desktop web page frame named “AWARDS” with width 1440px. Set the background color to #030604 (BG / Primary). Use a centered content container of 1200px maximum width, aligned to a 12-column grid with 24px gutters and ~160px left/right margins. Use vertical spacing of 96–120px between sections, 24–32px between titles and content, and 8–12px between paragraphs.

Add a fixed header at the top with height 80px, full width. Background is #030604. On the left, place logo text using a bold 24–28px style labeled “Text / Logo”. On the right, add navigation items using a 14px all-caps style labeled “Text / Nav” (e.g. Home, About, Awards, Cases, Media, Contact). Mark “Awards” as the active menu item with a 1px bottom border in gold (#D6B36A).

Under the header, create a “Top Bar / Hero Strip” section with height about 280–320px, using a horizontal auto layout with two columns: left text, right portrait. Background is #030604 with a very subtle radial glow behind the portrait (FX / Glow GreenGold). In the left column, add a small label “AWARDS” in 12px “Text / Caption” using the accent gold color (#D6B36A). Below it, add the slogan as a main line in 22–44px “Text / Section / Title” or “Text / Hero / Title” (all caps, white). Use the literal word “Slogan” as placeholder text. Optionally add a short supporting line in “Text / Body” style (14–16px, #E4E4E4) as a generic description placeholder. In the right column, place a portrait image of the lawyer with aspect ratio around 3:4, inside a card-like container with background #0C0E0C or #111111, 24–32px padding, and a subtle 1px border rgba(255,255,255,0.08).

SECTION 1 – LEGAL AWARDS  
Below the hero strip, add a new section called “Legal Awards”. Add a section header aligned to the main container. At the top of this block, place an optional small label “SECTION” using “Text / Caption” (12px, accent gold). Below it, add the main section title “Legal Awards” using “Text / Section / Title” (22–24px, all caps, white). Under the title, add a short horizontal line of 40–80px width using either a subtle divider color (#2A2A2A) or accent gold (#D6B36A). Leave 32px spacing, then create a grid for award cards.

Create a reusable component named “Card / Award” based on a simple image + text card. Each card uses background #111111 (BG / Card), a 1px border rgba(255,255,255,0.08), padding 24px, and corner radius 4–8px. Inside each card, at the top, add a 16:9 rectangle placeholder labeled “Award Image” (background #0C0E0C). Below the image, add an award title using “Text / Card / Title” (16–18px, white) with placeholder text “Award Title” (do not change these words). Under the title, add a link row: text “View Awarding Institution” using “Text / Caption” or “Text / Body” (12–14px, color #D6B36A), plus an external link icon on the right. Place multiple “Card / Award” instances in a 3-column grid (or 2 columns if needed) with 24px gaps between columns and 32px between rows. Do not insert specific legal award names; keep these cards as templates.

SECTION 2 – NEW MEDIA AWARDS  
Add a new section below with 96–120px top margin. Insert a section header similar to the previous one: optional small label “NEW MEDIA” in “Text / Caption” (accent gold), and the main title “New Media Awards” in “Text / Section / Title” (all caps, white), with a short horizontal line beneath.

Inside this section, create two vertical subsections stacked with 48–64px spacing: one for Bilibili and one for Xiaoyuzhou.

SUBSECTION 2.1 – BILIBILI AWARDS  
For the Bilibili subsection, add a small internal header row using horizontal auto layout. On the left, add the title “Bilibili Awards” using “Text / Card / Title” (16–18px, color #D6B36A or white). On the right, keep an optional placeholder for a handle or platform label in “Text / Caption”. Below this internal header, leave 24–32px spacing and add a grid or list of award cards. Reuse the same “Card / Award” component but you may omit external links if not needed.

Create four award cards, each using background #111111, border rgba(255,255,255,0.08), padding 24px. At the top of each card, place a small Bilibili icon placeholder on the left. Beneath or next to it, add the award title using “Text / Card / Title” with the following exact texts, one per card:

Card 1 title: “Ten Thousand Followers Plaque”  
Card 2 title: “Ten Thousand Charging Supporters Plaque”  
Card 3 title: “2025 Knowledge Content Creator of the Year”  
Card 4 title: “2025 Outstanding Lecturer of the Year”

Below each title, optionally add a meta line with “Text / Caption” (12px, #A0A0A0) as a placeholder for date or category. Arrange these cards in either a 2-column grid or a single-column vertical list with 24–32px spacing.

SUBSECTION 2.2 – XIAOYUZHOU PODCAST AWARDS  
Create another internal header row for this subsection. On the left, add the title “Xiaoyuzhou Podcast Awards” using “Text / Card / Title”. On the right, keep an optional caption placeholder. Below the header, leave 24–32px spacing and add two award cards in the same style.

For these two cards, use background #111111, 1px border rgba(255,255,255,0.08), padding 24px. At the top, include a small podcast icon placeholder. Then set the card titles exactly as follows:

Card 1 title:  
“2025 “Stories from Daxuange’s Live Room” – Ten Thousand Subscribers Plaque”

Card 2 title:  
“2025 “Tiger Legal Talks” – Thirty Thousand Subscribers Plaque”

Use “Text / Card / Title” for these titles, in white. Optionally, add a caption line for meta info. Place the two cards in a 2-column layout or stacked vertically depending on space.

SECTION 3 – TIGER LITIGATION AWARDS  
Add a new section below with 96–120px spacing from the previous section. Insert a section header. Add a small label “LITIGATION” using “Text / Caption” (accent gold), then the main title “Tiger Awards” using “Text / Section / Title” (all caps, white), followed by a short gold or subtle divider line below the title.

Under the header, leave 32px spacing and add a grid of award cards. Use the same “Card / Award” pattern: background #111111, 1px border rgba(255,255,255,0.08), padding 24px, corner radius 4–8px. Each card includes a 16:9 award image placeholder at the top and a title below. Use “Text / Card / Title” and set a placeholder title as “Tiger Award Title” (keep this exact phrase). Optionally add a gold-colored link text “View Awarding Institution” under the title if external pages are planned. Arrange multiple cards in a 2- or 3-column grid with 24px horizontal and 32px vertical gaps. Do not invent or modify award names; keep them as placeholders.

FOOTER  
At the bottom of the page, add a full-width footer block with background #030604 and an optional top divider line (#2A2A2A). Inside the footer, center the content within the same 1200px container. At the top of the footer, place the large logo text using “Text / Logo” (e.g. the lawyer’s full name). Below it, add one or two lines of small text using “Text / Caption” (12px, #A0A0A0) for copyright and firm information. Use vertical padding of 40–64px for the footer.

Maintain the defined color system:  
BG / Primary: #030604  
BG / Section: #0C0E0C  
BG / Card: #111111  
Text / Primary: #FFFFFF  
Text / Secondary: #E4E4E4  
Text / Muted: #A0A0A0  
Accent / Gold: #D6B36A  

Do not change any of the given English labels and award titles. Only structure them into the described layout and components.