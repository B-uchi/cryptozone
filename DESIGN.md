---
name: CryptoZone
description: Live crypto market data printed like currency: intaglio-green notes, guilloche drawn from price, a ledger on cotton paper.
colors:
  paper: "#eef2ec"
  panel: "#f8faf6"
  sunk: "#e2e9e1"
  ink: "#0d261e"
  muted: "#465f55"
  faint: "#586e64"
  rule: "#c4d3c8"
  note: "#0e4a38"
  note-ink: "#e8f4ec"
  note-dim: "#a0cbb5"
  note-serial: "#f8bb98"
  mint: "#cfe6d8"
  serial: "#b8401e"
  up: "#12784f"
  down: "#a3253f"
  paper-dark: "#0a1d17"
  panel-dark: "#0f271f"
  sunk-dark: "#071611"
  ink-dark: "#e2eee6"
  muted-dark: "#a0baad"
  faint-dark: "#739183"
  rule-dark: "#244237"
  note-dark: "#145c45"
  note-ink-dark: "#ecf7f0"
  note-dim-dark: "#aad8c0"
  mint-dark: "#1e4637"
  serial-dark: "#e87a52"
  note-serial-dark: "#fac0a0"
  up-dark: "#4acd91"
  down-dark: "#f5718a"
typography:
  display:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 7vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.03em"
    fontVariation: "\"wdth\" 125"
    fontFeature: "\"tnum\", \"lnum\""
  headline:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    fontVariation: "\"wdth\" 100"
  label:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    letterSpacing: "0.12em"
  serial:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.7rem"
    fontWeight: 600
    letterSpacing: "0.08em"
    fontVariation: "\"wdth\" 85"
    fontFeature: "\"tnum\", \"zero\""
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
  note: "14px"
  full: "9999px"
spacing:
  gutter: "16px"
  gutter-sm: "24px"
  panel: "20px"
  panel-lg: "24px"
  row: "12px"
  section: "56px"
  section-lg: "80px"
components:
  button-solid:
    backgroundColor: "{colors.note}"
    textColor: "{colors.note-ink}"
    rounded: "{rounded.lg}"
    padding: "0 14px"
    height: "36px"
  button-outline:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "0 14px"
    height: "36px"
  button-outline-hover:
    backgroundColor: "{colors.sunk}"
  button-quiet:
    textColor: "{colors.muted}"
    rounded: "{rounded.lg}"
    padding: "0 14px"
    height: "36px"
  button-quiet-hover:
    backgroundColor: "{colors.sunk}"
    textColor: "{colors.ink}"
  segment-active:
    backgroundColor: "{colors.note}"
    textColor: "{colors.note-ink}"
    typography: "{typography.serial}"
    rounded: "{rounded.md}"
    height: "32px"
  chip-topic-active:
    backgroundColor: "{colors.note}"
    textColor: "{colors.note-ink}"
    rounded: "{rounded.full}"
    padding: "0 14px"
    height: "32px"
  chip-coin:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "4px 12px 4px 4px"
  input-field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    height: "44px"
  search-trigger:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.faint}"
    rounded: "{rounded.lg}"
    height: "36px"
    width: "256px"
  panel-card:
    backgroundColor: "{colors.panel}"
    rounded: "{rounded.note}"
    padding: "20px"
  note-face:
    backgroundColor: "{colors.note}"
    textColor: "{colors.note-ink}"
    rounded: "{rounded.note}"
    padding: "28px 40px"
---

# Design System: CryptoZone

## Overview

**Creative North Star: "The Intaglio Note"**

The market is a sheet of security-printed currency. Every hero surface is a banknote face: a deep intaglio-green field with a double engraved frame, a guilloche rosette seeded by the coin it represents, a wave band whose lines literally trace the price series, a copper serial number, and a microprint rule along the bottom edge. Everything around the notes is the paper they are printed on: cool cotton-rag neutrals, hairline rules, and a quiet ledger of tabular numbers.

Density is a trading ledger, not a dashboard of cards. The market table, movers list, and supply data are plain rows on paper separated by hairlines; panels exist only to group a tool (chart, converter, supply). Ornament is generated from live data and never drawn as decoration for its own sake: the rosette is seeded from a coin's id, the band from Bitcoin's 24h sparkline, the serial from a hash of the coin. Numbers are the hero, set in wide, heavy Archivo like a note's denomination.

The world explicitly refuses the neon-on-black glass crypto dashboard: no glows, no gradients-as-brand, no glassy cards. Dark mode is the same note printed on night paper, not a different aesthetic.

**Key Characteristics:**
- Two materials only: paper (neutral surfaces, ledger rows) and note (green intaglio field for heroes and the one active choice in a control).
- Guilloche, microprint and serials are procedurally generated from real data.
- One variable family, Archivo, used at three widths: 125 for denominations, 100 for UI, 85 for serials.
- Gain/loss always carries sign and arrow alongside green/oxblood.
- Flat paper; only notes, dialogs and solid buttons lift.

## Colors

A restrained banknote palette: cool green-grey paper, one deep intaglio green, copper for serials and focus, and a green/oxblood pair reserved strictly for market direction. Tokens are space-separated RGB custom properties on `:root` and `.dark` (`--paper`, `--note`, ...) consumed through Tailwind as `rgb(var(--x) / alpha)`; the `-dark` frontmatter keys are the `.dark` values of the same variables.

### Primary
- **Intaglio Green** (note): the note field for the Market Note, coin Note Face and 404 note; also the active segment in period/topic controls, the solid button, the supply meter fill, and the brand mark tile. Its rarity on a screen is what makes the note read as the hero.
- **Note Ink** (note-ink): text and frame lines printed on the green field (9:1 on note).
- **Note Dim** (note-dim): secondary text, guilloche line colour and microprint on the note.

### Secondary
- **Copper Serial** (serial): serial numbers, the active nav underline, active sort chevron, starred-state star, error icon, and the global focus ring. Never a fill.

### Tertiary
- **Ledger Green** (up) and **Oxblood** (down): price direction only: `Change` text, sparklines, the chart line and hatch, row flash animations. Never used for brand, buttons or decoration.

### Neutral
- **Cotton Paper** (paper): page background and input wells.
- **Panel White** (panel): tool panels, segmented-control trays, the search trigger, the command palette.
- **Sunk Paper** (sunk): hover fill for rows and quiet buttons, selected palette option, the market strip, skeleton base.
- **Engraver's Ink** (ink): primary text (14:1 on paper).
- **Muted Ink** (muted): secondary text, table labels, quiet button text.
- **Faint Ink** (faint): ranks, ticker symbols, axis labels, placeholders, icons.
- **Hairline** (rule): every border and divider; at 70% opacity for row dividers.
- **Mint Tint** (mint): coin-icon fallback disc and the watchlist count badge.

### Named Rules
**The Direction-Only Rule.** Up and down colours mean price direction and nothing else, and they never appear without a sign and an arrow.

**The One Note Rule.** Intaglio Green fills at most one hero surface per screen plus the single selected item of a control. Panels, cards and rows are paper.

**The Copper Thread Rule.** Copper marks identity and attention (serials, active indicator, focus ring, starred state) as a thin line or glyph, never as a background.

## Typography

**Display Font:** Archivo (variable, wdth 62–125) with ui-sans-serif, system-ui
**Body Font:** Archivo at wdth 100
**Label/Mono Font:** Archivo at wdth 85 for serials; no monospace, tabular figures carry alignment instead.

**Character:** One grotesque stretched three ways: wide and black for money, normal for reading, condensed and tracked for codes, the way a note mixes denomination numerals, legend text and serials from one engraver's hand.

### Hierarchy
- **Display / Denomination** (800, wdth 125, -0.03em, line-height 0.9): the market cap on the Market Note (3.25rem → 6rem), the coin price on the Note Face (2.75rem → 4.5rem), page titles on Market/News/Watchlist (2.25rem → 3rem, leading 1), the 404, and the CryptoZone wordmark. Tabular lining numerals.
- **Headline** (700, 1.5rem, -0.015em): section heads ("Market leaders", "Headlines", "About"), coin name on the note (to 1.875rem), lead story title (to 1.875rem, leading 1.15).
- **Title** (700, 1.125rem, -0.01em): panel heads (Movers, Convert, Supply, Market data).
- **Body** (400–600, 0.875rem–1rem, leading 1.5; prose 1.02rem leading-relaxed, max 60–68ch): table cells, descriptions, news dek. Numbers always use tabular figures (`num`).
- **Label** (600, 0.6875rem, uppercase, 0.12em, muted): table column headers and command-palette group headers only.
- **Serial** (600, wdth 85, 0.08em, uppercase, tabular + slashed zero): ranks, ticker symbols, serial numbers, issue dates, period segments, kbd hints, category tags.
- **Microprint** (600, 5.5px, 0.18em, uppercase, aria-hidden): repeated legend text as a printed rule, on the note's bottom edge and above the footer. Decorative texture, never information.

### Named Rules
**The Three Widths Rule.** Width encodes role: 125 is money, 100 is language, 85 is a code. Do not set prose wide or prices condensed.

**The Tabular Rule.** Every number on screen uses tabular lining figures so columns and live updates never jitter.

## Layout

A single centred column, max 1280px, with 16px gutters (24px from 640px). Each page opens with its hero at the top of the column: the full-width Market Note on Overview, the Note Face on a coin, or a wide-set denomination title on index pages. Below it, content splits into a main ledger plus a 340px rail at `lg` (`minmax(0,1fr) 340px`, 32–48px gap) and stacks on mobile.

Vertical rhythm is generous between sections (56px, 80px before the news block, 96px before the footer) and tight inside them: table rows at 12px vertical padding, panels at 20–24px. A 32px market strip of global stats sits above a 60px sticky header (paper at 75–90% with backdrop blur). The market table drops columns progressively (volume below `lg`, cap below `md`, sparkline below `sm`) rather than becoming cards. News uses a 1/2/3-column grid at `sm`/`lg` with 32px column and 48px row gaps.

## Elevation & Depth

Paper is flat. Depth comes from tone (paper → panel → sunk) and hairline rules. Shadows are reserved for objects that sit on the paper: the note itself, the command palette, solid buttons, and the coin-icon medallion on a note. Shadow colour is a tinted green-black (`--shadow`), never neutral grey.

### Shadow Vocabulary
- **Note** (`box-shadow: 0 1px 1px rgb(var(--shadow) / 0.12), 0 12px 32px -12px rgb(var(--shadow) / 0.35)`): note faces and the command palette dialog.
- **Lift** (`box-shadow: 0 1px 2px rgb(var(--shadow) / 0.10), 0 8px 24px -10px rgb(var(--shadow) / 0.30)`): solid buttons, the skip link, the coin medallion.

### Named Rules
**The Flat Paper Rule.** Panels, rows, chips and inputs carry a hairline border and no shadow. If it is printed on the paper, it does not float.

## Shapes

Softly cut corners, like a trimmed note: 14px on notes, panels, dialogs, error/empty states and lead imagery; 8px on buttons, inputs, segmented trays, the chart stat grid and news thumbnails; 6px for segments inside a tray; 4px on tags, kbd and the change badge; full pills for chips, topic tabs, star buttons and coin icons. Notes carry a double engraved inner frame (inset 8px at 10px radius, inset 13px at 7px radius, note-ink at 15% and 10%). Dashed hairlines mark ledger rows in Market data and the borders of empty/error states, which are also filled with a 45° hatch.

## Components

### Buttons
Restrained and compact; colour is reserved for the one action that matters.
- **Shape:** gently cut (8px), 36px tall, 14px horizontal padding, 600 weight, 14px text, icon gap 8px.
- **Solid:** Intaglio Green with Note Ink and the Lift shadow; hover drops to 90% opacity green. Used for the single primary action of an empty state.
- **Outline:** panel fill, hairline border, ink text; hover deepens border to faint and fill to sunk. Retry, pagination, load more.
- **Quiet:** no fill, muted text; hover sunk fill and ink text. Section "Full market →" links, menu toggle.
- **All:** press scales to 0.98; disabled at 40% opacity; 150ms transitions; copper 2px focus ring offset 2px.

### Chips
- **Coin chip:** full pill, panel fill, hairline border, 20px coin icon inset left, 600 weight; hover sunk fill and faint border.
- **Topic tab (News):** 32px full pill, muted text; active is Intaglio Green with Note Ink.
- **Tag:** serial type at ~0.6rem, 4px radius, hairline border, muted text; categories on news cards and coin tags.

### Segmented Control
A panel tray (8px radius, hairline, 2px inset) holding 32px serial-type segments at 6px radius. The active segment is Intaglio Green; inactive segments are muted with sunk hover. Used for chart periods, market period, and (with icons) the light/dark/system theme switch, where the active state is sunk rather than green.

### Cards / Containers
- **Corner Style:** 14px.
- **Background:** panel on paper.
- **Shadow Strategy:** none (Flat Paper Rule).
- **Border:** 1px hairline.
- **Internal Padding:** 20px, 24px for the chart and market data panels.

### Inputs / Fields
- **Style:** 40–44px tall, 8px radius, hairline border; paper fill for converter wells, panel fill for the market filter. Units sit inside the right edge in serial type. Numeric fields use tabular 600 weight.
- **Focus:** border darkens to faint (`focus` / `focus-within`); keyboard focus also gets the copper ring.

### Navigation
Wordmark (brand mark tile + "CryptoZone" in denomination type) left, four text links in 600 weight, muted with ink hover. The active link turns ink and gets a 2px copper underline sitting on the header's bottom rule. A search trigger (panel, hairline, 256px, with a `⌘K` kbd in serial type) and the theme tray sit right. Below `md`, links collapse into a full-width stacked list with hairline separators and 18px type, revealed with the rise animation.

### Market Table (signature)
A ledger, not a grid of cards: star button, serial rank, coin icon + name + serial ticker, tabular price, `Change`, cap, volume and an 112×36 sparkline coloured by direction. Rows divide with hairlines at 70%, hover to sunk at 70% and underline the coin name. Price cells flash green or oxblood (22% tint fading over 1.4s) when a live poll changes the value. Sortable headers are label type with a chevron that turns copper when active.

### Note Face (signature)
The green note: double engraved frame, a 560–620px guilloche rosette bleeding off the right edge (note-dim strokes, copper inner petals; 20% opacity on mobile, 70% at `lg`), a top line with a serial legend left and a copper serial number right (`CZ 001 5515`), the denomination, a hairline-topped stat row, an optional guilloche band traced from a price series, and a microprint rule in the bottom border strip with the issue date. Change badges on the note invert to a Note Ink chip with green text.

### Price Chart
Direction-coloured 2px line over a 35° hatch fill of the same colour that fades out downward, dashed hairline gridlines, right-hand axis in faint tabular 11px, H and L markers in muted 600. Hover or arrow keys show a crosshair, a ringed point and an ink price tag on the axis.

### States
Skeletons shimmer from sunk to rule over 1.6s. Error and empty states are hatched paper inside a dashed 14px border with a copper icon, a 18px headline, muted explanation and an outline retry. The watchlist empty state uses a paper panel with a rule-coloured rosette.

## Do's and Don'ts

### Do:
- **Do** render every hero as a note: Intaglio Green field, double inner frame, data-seeded rosette, copper serial, microprint edge.
- **Do** derive ornament from data: seed rosettes with the coin id, trace guilloche bands from a real price series, hash serials from the coin.
- **Do** pair every gain/loss colour with a sign and an up/down-right arrow, and give it screen-reader text.
- **Do** set money in denomination type (Archivo wdth 125, 800) and every number in tabular figures.
- **Do** keep panels flat on paper with 1px hairlines and 14px corners; reserve the Note and Lift shadows for notes, dialogs and solid buttons.
- **Do** use the copper ring (2px, offset 2px) for all keyboard focus.
- **Do** collapse table columns progressively on small screens instead of turning rows into cards.
- **Do** honour reduced motion: the global override flattens all animation and transition durations.

### Don't:
- **Don't** build neon-on-black glass dashboards: no glows, glassy translucent cards, or gradient brand fills.
- **Don't** use up/down green or oxblood for buttons, brand, links or decoration.
- **Don't** fill more than one hero surface per screen with Intaglio Green.
- **Don't** put information in microprint; it is aria-hidden texture at 5.5px.
- **Don't** introduce a second typeface or a monospace; use Archivo's width axis and tabular figures.
- **Don't** use copper as a background fill or for body text.
- **Don't** add drop shadows to panels, rows, chips or inputs.
