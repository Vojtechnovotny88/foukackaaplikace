# DESIGN SYSTEM --- Efektivní izolace

**Version:** 1.0\
**Status:** Source of truth\
**Brand:** Efektivní izolace\
**Primary use:** websites, landing pages, calculators, lead-generation
interfaces, marketing microsites\
**Design direction:** modern construction × energy efficiency ×
technical precision × residential renovation

> This document is the primary source of truth for visual and UI
> decisions. If an implementation conflicts with this file, this file
> wins unless a newer approved version explicitly overrides it.

------------------------------------------------------------------------

## 0. Executive design direction

Efektivní izolace should look like a technically competent modern
construction company, not like a generic local contractor and not like a
SaaS startup.

The visual system combines:

-   charcoal / graphite architectural surfaces,
-   a vivid brand green used as a controlled functional accent,
-   warm off-white backgrounds rather than sterile pure-white pages,
-   large, condensed-feeling visual hierarchy without sacrificing Czech
    readability,
-   authentic documentary photography,
-   hard-working grids, restrained radii and thin technical rules,
-   oversized numbers and concise claims,
-   asymmetrical editorial composition,
-   clear conversion paths around price calculation and consultation.

**Core visual idea:** **"Measured performance."**\
Every page should feel engineered, economical and concrete. The brand
sells a physical intervention with measurable results; the interface
should therefore prefer evidence, parameters, process and real work over
decoration.

### Why this direction

The existing site already contains strong conversion ingredients:
price-per-m² communication, zero advance payment, one-day installation,
energy-saving messaging, fire classification, technical material
parameters, a price calculator, an energy-savings calculator, references
and a simple four-step process. These are stronger assets than the
current visual presentation and should become the backbone of the new
UI.

The Iron Peak reference is used as a **design-language reference only**:
large editorial typography, contrast between dark and light areas, bold
image treatment, industrial restraint, modular composition and generous
negative space. Do not reproduce its layout, artwork or page structure.

------------------------------------------------------------------------

# 1. BRAND FOUNDATIONS

## 1.1 Brand personality

The brand is:

-   **Precise** --- numbers, dimensions and technical facts are treated
    confidently.
-   **Competent** --- the interface should imply experienced execution,
    not marketing theatre.
-   **Efficient** --- short paths, low friction, concise copy.
-   **Modern** --- contemporary typography and composition without
    trend-chasing.
-   **Trustworthy** --- clear pricing logic, real photos, transparent
    process.
-   **Confident** --- large type, strong contrast, decisive CTA.
-   **Practical** --- understandable to a homeowner without construction
    expertise.
-   **Premium-accessible** --- high quality, never luxury-coded or
    elitist.

The brand is **not** playful, rustic, ornamental, futuristic,
corporate-blue, "eco cliché", or generic SaaS.

## 1.2 Design principles

### 01 --- Evidence before decoration

Prefer a real result, technical parameter, price, measurement or
photograph over an ornamental graphic.

### 02 --- One dominant message per viewport

Do not make every element compete. Each section gets one clear headline
and one visual focal point.

### 03 --- Green means action or proof

Brand green is scarce enough to remain meaningful. Use it primarily for
CTA, active states, key figures and small technical accents.

### 04 --- Contrast creates rhythm

Alternate light and dark sections intentionally. Avoid endless rows of
white cards on a white page.

### 05 --- Real construction, editorial presentation

Photography may be rough, dusty and authentic; layout and typography
around it must be exceptionally clean.

### 06 --- Technical, not complicated

Expose useful specifications but explain them in homeowner language
where necessary.

### 07 --- Conversion without pressure

Price calculation should feel useful before it feels like a lead form.
Ask for contact details only after the user receives meaningful value.

## 1.3 Tone of voice

**Voice:** direct, specific, calm, technically credible.

Prefer: - "Orientační cenu zjistíte během minuty." - "Běžný rodinný dům
zvládneme zpravidla během jednoho dne." - "Kamenná minerální vlna,
reakce na oheň A1." - "Nejdřív spočítat. Potom se rozhodnout."

Avoid: - "Revoluční řešení!" - "Neuvěřitelná sleva!" - "Vaše cesta k
vysněnému bydlení." - vague claims without evidence, - excessive
exclamation marks.

Headlines may be short and assertive. Supporting text should explain the
claim.

------------------------------------------------------------------------

# 2. COLOR SYSTEM

## 2.1 Core palette

The green below is the **systemized digital brand green**. If the
approved logo master contains a different exact green, replace the
`brand-500` value with that master color and regenerate its scale; do
not create a second competing green.

  --------------------------------------------------------------------------
  Token             HEX                                RGB Use
  ----------------- ---------------- --------------------- -----------------
  `brand-50`        `#F3FBE8`                  243,251,232 subtle tint

  `brand-100`       `#E4F6C8`                  228,246,200 highlighted light
                                                           surfaces

  `brand-200`       `#CBEF91`                  203,239,145 decorative/data
                                                           tint

  `brand-300`       `#ADE455`                   173,228,85 charts, secondary
                                                           accents

  `brand-400`       `#91D52B`                   145,213,43 hover on dark

  **`brand-500`**   **`#7FC51B`**           **127,197,27** primary brand
                                                           accent

  `brand-600`       `#65A512`                   101,165,18 hover on light

  `brand-700`       `#4E8012`                    78,128,18 active / text
                                                           accent where
                                                           contrast permits

  `brand-800`       `#3F6514`                    63,101,20 dark green detail

  `brand-900`       `#365516`                     54,85,22 deepest green
  --------------------------------------------------------------------------

### Neutral / semantic colors

  Semantic token          HEX         Role
  ----------------------- ----------- ----------------------------------
  `Primary`               `#171A18`   charcoal brand base
  `Accent`                `#7FC51B`   primary action / signature green
  `Background Dark`       `#171A18`   dark sections
  `Background Dark Alt`   `#202420`   dark elevated areas
  `Background Light`      `#F4F4EF`   default light canvas
  `Surface`               `#FFFFFF`   cards/forms on light
  `Surface Elevated`      `#FAFAF7`   elevated/subtle surface
  `Text Primary`          `#171A18`   main text on light
  `Text Secondary`        `#626861`   supporting text
  `Text Tertiary`         `#858B84`   metadata/captions
  `Text Inverse`          `#F7F8F3`   main text on dark
  `Text Inverse Muted`    `#B9BEB8`   secondary text on dark
  `Border`                `#D8DCD5`   light UI rules
  `Border Dark`           `#343A34`   rules on dark
  `Success`               `#287A46`   success state
  `Warning`               `#A76708`   warning state
  `Error`                 `#B83B32`   destructive/error state

### Color rules

1.  Default page canvas is `Background Light`, not pure white.
2.  Dark sections use `Background Dark`; avoid black `#000000`.
3.  Green should normally occupy **less than \~15% of a page viewport**.
4.  Do not use green as body-copy color.
5.  Large green panels are allowed only for a deliberate conversion
    moment, statistic or campaign block; never alternate every section
    into green.
6.  On `Accent` backgrounds use `Primary` text, not white, unless an
    accessibility test explicitly proves the alternative.
7.  Semantic red/orange/green states are never the sole carrier of
    meaning; pair with icon/text.
8.  Do not introduce gradients as a default brand device.
9.  Photography may introduce natural colors; UI chrome must remain
    inside this palette.

------------------------------------------------------------------------

# 3. TYPOGRAPHY

## 3.1 Font families

### Primary --- `Manrope`

Use for all interface text, body copy, navigation, labels, buttons and
most headings.

**Why:** modern grotesk character, strong numerals, excellent Czech
support, technical without feeling cold, open-source and easy to
reproduce across development environments.

### Display --- `Manrope`

Use the same family at heavier weights for visual consistency. The
system intentionally avoids a decorative second family.

Fallback: `"Manrope", "Inter", "Helvetica Neue", Arial, sans-serif`

If an approved current brand font is later confirmed from original brand
assets, it may replace Manrope only after testing Czech diacritics,
numeric legibility and all type tokens.

## 3.2 Type scale

Desktop values are the upper bound; responsive implementations should
use `clamp()` where indicated.

  Style            Size   Line-height   Weight   Letter spacing Use
  ------------- ------- ------------- -------- ---------------- ----------------------------
  Display XXL     88 px          0.94      700         -0.050em rare hero / campaign
  Display XL      72 px          0.96      700         -0.045em primary desktop hero
  H1              60 px          1.00      700         -0.040em page title
  H2              48 px          1.04      700         -0.035em section title
  H3              32 px          1.12      650         -0.025em card/section subhead
  H4              24 px          1.20      650         -0.018em component title
  Body Large      20 px          1.55      450         -0.010em lead paragraphs
  Body            16 px          1.60      450         -0.005em default copy
  Small           14 px          1.50      500                0 supporting UI
  Label           13 px          1.20      700          0.060em uppercase eyebrow / labels
  Caption         12 px          1.45      550          0.015em metadata

### Responsive type

``` css
--type-display-xxl: clamp(3.5rem, 6.1vw, 5.5rem);
--type-display-xl:  clamp(3rem, 5vw, 4.5rem);
--type-h1:          clamp(2.75rem, 4.2vw, 3.75rem);
--type-h2:          clamp(2.25rem, 3.3vw, 3rem);
--type-h3:          clamp(1.625rem, 2.2vw, 2rem);
--type-h4:          clamp(1.25rem, 1.6vw, 1.5rem);
```

### Typography rules

-   Hero headline: max 9--12 words where possible.
-   Do not center long copy. Default alignment is left.
-   Body text maximum line length: `68ch`; preferred marketing copy:
    `54–62ch`.
-   Use uppercase only for short labels/eyebrows, never paragraphs.
-   Large numbers may use tabular numerals.
-   Avoid thin font weights.
-   Never use more than 3 font weights in one view.
-   Do not create arbitrary type sizes outside the token scale.

------------------------------------------------------------------------

# 4. SPACING SYSTEM

Base unit: **4 px**. Layout rhythm is predominantly multiples of 8.

  Token           Value
  ------------ --------
  `space-0`           0
  `space-1`        4 px
  `space-2`        8 px
  `space-3`       12 px
  `space-4`       16 px
  `space-5`       20 px
  `space-6`       24 px
  `space-8`       32 px
  `space-10`      40 px
  `space-12`      48 px
  `space-16`      64 px
  `space-20`      80 px
  `space-24`      96 px
  `space-32`     128 px
  `space-40`     160 px

### Section rhythm

-   Large desktop standard section: `128px` vertical.
-   Dense technical section: `96px`.
-   Hero: `96–144px` top/bottom depending on header.
-   Tablet: `80–96px`.
-   Mobile: `64–80px`.
-   Do not reduce mobile section gaps below `56px` unless inside a
    compound component.

------------------------------------------------------------------------

# 5. LAYOUT SYSTEM

## 5.1 Containers

-   Maximum site canvas: no artificial full-page max width; backgrounds
    may span viewport.
-   Main content container: **1440 px max**
-   Standard inner container: **1280 px max**
-   Reading/content column: **760 px max**
-   Narrow form copy: **640 px max**

``` css
.container {
  width: min(100% - 48px, 1280px);
  margin-inline: auto;
}
```

Mobile side padding: `20px`.\
Tablet: `32px`.\
Laptop/Desktop: `40–48px`.\
Large desktop: `64px` where the 1280px inner width is not already
limiting content.

## 5.2 Grid

### Desktop ≥ 1280

-   12 columns
-   gutter: 24 px
-   common splits: 5/7, 4/8, 6/6, 8/4

### Laptop 1024--1279

-   12 columns
-   gutter: 20 px

### Tablet 768--1023

-   8 columns
-   gutter: 20 px

### Mobile \< 768

-   4 columns
-   gutter: 16 px
-   outer padding: 20 px

### Layout character

Use controlled asymmetry: - headline may occupy 7 columns while
explanatory copy starts at column 9; - image may extend to viewport edge
while text remains in container; - large statistic can intentionally
break the normal card rhythm.

Never create asymmetry by random offsets.

------------------------------------------------------------------------

# 6. BREAKPOINTS

  Name            Range
  --------------- ---------------
  Mobile          0--599 px
  Large Mobile    600--767 px
  Tablet          768--1023 px
  Laptop          1024--1279 px
  Desktop         1280--1599 px
  Large Desktop   1600 px+

Mobile is a recomposition, not a scaled desktop.

On mobile: - two-column marketing layouts become one column; - primary
CTA becomes full-width where useful; - bento layouts become ordered
vertical narratives; - calculators use one input group per row; - tables
become stacked parameter rows or horizontally scroll only when
comparison semantics require it; - decorative imagery may be cropped
aggressively; - sticky bottom CTA is permitted on high-intent landing
pages.

------------------------------------------------------------------------

# 7. SHAPE LANGUAGE

  Token              Value Use
  --------------- -------- -----------------------------
  `radius-none`          0 technical dividers
  `radius-xs`         2 px tiny technical elements
  `radius-sm`         4 px inputs / compact UI
  `radius-md`         8 px buttons / cards
  `radius-lg`        12 px feature cards / imagery
  `radius-xl`        16 px rare large calculator shell
  `radius-pill`     999 px status tags only

Rules: - Standard card radius: **8 px**. - Buttons: **6 px**. - Inputs:
**6 px**. - Images: **8--12 px**, or square corners when used
edge-to-edge. - Never apply 24--40 px "SaaS blob" rounding. - Border:
`1px` default; `2px` only for selected/focus/emphasis. - Shadows are
exceptional, not structural. Prefer contrast, borders and spacing.

Default shadow if necessary: `0 12px 32px rgba(17, 22, 18, 0.08)`.

------------------------------------------------------------------------

# 8. ICONOGRAPHY & TECHNICAL GRAPHICS

-   Use simple 1.5--2 px stroke icons.
-   Geometric, neutral, no filled cartoon icons.
-   Prefer diagrams, section cuts, dimensions, material texture and
    measurement markers where they communicate real information.
-   Icon containers should usually be absent.
-   If a container is required: 40--48 px square, `radius-sm`, subtle
    neutral background.
-   Avoid generic "house + leaf" symbolism unless necessary for
    comprehension.
-   Decorative lines may resemble measurement ticks, plan annotations or
    construction-grid references, but must remain subtle.

------------------------------------------------------------------------

# 9. BUTTONS

Minimum height desktop: **48 px**.\
Primary conversion button: **52--56 px**.\
Minimum touch target: **44 × 44 px**.

## Primary

-   bg: `Accent`
-   text: `Primary`
-   border: `Accent`
-   radius: 6 px
-   weight: 700
-   horizontal padding: 24 px
-   hover: `brand-400` on dark / `brand-600` where visual contrast
    remains correct
-   active: slight `translateY(1px)`, darker state
-   focus: 3 px external focus ring with sufficient contrast
-   disabled: neutral surface + muted text, no pointer interaction

Use for **"Spočítat cenu" / "Nezávazně spočítat cenu"**.

## Secondary Light

-   transparent / light surface
-   1 px `Text Primary` border
-   text: `Text Primary`
-   hover: `Primary` background + inverse text

## Secondary Dark

-   transparent
-   1 px `Border Dark`
-   text: `Text Inverse`
-   hover: `Text Inverse` background + `Primary` text

## Ghost

-   transparent
-   no persistent border
-   hover background: neutral 5--8% contrast layer

## Text button

-   no container
-   text + directional arrow
-   underline or arrow motion on hover
-   never use as the only CTA in a high-intent hero

### Button content

Use verb-first labels. Avoid "Více", "Odeslat", "Klikněte zde" where a
precise action exists.

------------------------------------------------------------------------

# 10. FORM SYSTEM

## General

Inputs should feel technical and substantial, not soft.

-   height: 52 px standard
-   textarea min-height: 120 px
-   bg: `Surface`
-   border: 1 px `Border`
-   radius: 6 px
-   horizontal padding: 16 px
-   label above field, never placeholder-only
-   label-to-input gap: 8 px
-   field-to-field gap: 20--24 px
-   placeholder: `Text Tertiary`

### Focus

-   border becomes `Primary`
-   2--3 px visible focus ring
-   do not remove native keyboard accessibility

### Error

-   border `Error`
-   error icon + short message below
-   color is not the only indicator

### Success

-   border `Success`
-   optional confirmation icon/text

## Select

Same geometry as input. Use a simple chevron. Native select is
acceptable when it improves mobile usability.

## Checkbox / radio

-   visual control: 20--22 px
-   full label is clickable
-   selected state uses `Primary` + `Accent` where appropriate
-   minimum total target: 44 px high

## Slider

For savings / area calculators: - track: neutral - filled portion:
Accent - thumb: 24 px - always pair slider with a numeric input or
explicit value - keyboard operable

## Calculator inputs

The calculator is a **first-class product component**, not a generic
contact form.

Recommended structure: 1. property/use-case selection, 2. area /
thickness / optional works, 3. immediate price estimate, 4. optional
energy-saving estimate, 5. only then contact capture.

Price result should be visually dominant. Show assumptions close to the
result. Never hide the fact that the result is indicative when it is
indicative.

Desktop: input controls 7--8 cols + sticky result panel 4--5 cols.\
Mobile: result summary follows inputs and may become a sticky compact
bar after the first valid calculation.

------------------------------------------------------------------------

# 11. CARD SYSTEM

Cards should be used only when the content benefits from grouping. Avoid
putting every paragraph into a card.

## Service Card

Purpose: service category / application.

-   image ratio: 4:3 or 3:2
-   title: H3/H4
-   1 short description
-   optional 2--3 parameters
-   text CTA
-   hover: subtle image scale `1.02`, arrow shift
-   no floating shadow

## Benefit Card

Purpose: one strong commercial reason.

-   preferably border-top rather than boxed card
-   oversized index or icon
-   H4 + max \~3 lines body
-   key figure may replace icon

## Statistic Card

Purpose: measurable proof.

-   number: Display/H1 scale
-   unit visually attached
-   one-line descriptor
-   green only on number or small rule
-   can be borderless in a 3--4 item stat rail

## Project / Reference Card

-   authentic project image
-   location / building type / scope metadata
-   optional area, insulation depth, duration
-   image leads; text remains concise
-   hover reveals CTA only if interaction exists

## Technical Parameter Card

-   dark or neutral surface
-   parameter label + large value + unit
-   optional plain-language explanation
-   use tabular numerals
-   works well in bento groups

## Testimonial Card

-   quotation is the focus
-   name / locality / project type
-   no giant decorative quotation marks
-   photo only if authentic and approved

## CTA Card

-   can use `Accent` or `Background Dark`
-   one headline, one supporting sentence, one primary action
-   optional contact alternative
-   no competing tertiary actions

------------------------------------------------------------------------

# 12. NAVIGATION

## Desktop header

Height: **76--84 px**.

Structure: - logo left, - concise nav center/right, - primary "Spočítat
cenu" CTA at far right.

Preferred nav: - Služby - Proč foukaná izolace - Jak to probíhá -
Realizace - Technické informace - Kontakt - CTA

### Sticky behavior

At top over dark hero, header may be transparent/dark.\
After 24--48 px scroll: - becomes opaque `Background Dark` or
`Background Light` according to page theme, - thin bottom border
appears, - height may compress by \~8 px, - no heavy shadow.

## Mobile

-   logo left
-   menu trigger right, 44 px target
-   full-screen or near-full-screen navigation
-   primary CTA visible inside menu
-   high-intent pages may use a compact sticky bottom "Spočítat cenu"
    action.

------------------------------------------------------------------------

# 13. SECTION PATTERNS

## 13.1 Hero

Preferred desktop composition: - dark background, - headline 6--8
columns, - proof/price/CTA cluster, - large authentic photo or
full-bleed image occupying remaining composition, - 1--3 concise proof
points.

Hero must answer: 1. What is being offered? 2. Why should the homeowner
care? 3. What should they do next?

Do not use generic slogans above the actual service.

Suggested hierarchy: - eyebrow: `FOUKANÁ IZOLACE / OSTRAVA + REGIONY` -
H1: direct benefit + service - lead: one short explanatory paragraph -
primary CTA: price calculation - secondary CTA: consultation - proof
rail: price / realization time / payment model, when currently valid.

## 13.2 Benefits

Use 3--4 items. Prefer horizontal rule/grid to a row of floating rounded
cards. Each benefit should be evidence-led.

## 13.3 Services

Use large image-led cards or alternating editorial rows. Service
differences must be understandable without opening detail pages.

## 13.4 Process

Four steps can become a horizontal technical timeline on desktop and a
vertical numbered sequence on mobile. Oversized `01–04` numbers are
encouraged.

## 13.5 References

Use real photos and project facts. Avoid a generic carousel as the only
way to browse work. Desktop can use a 12-column asymmetric gallery.

## 13.6 Gallery

Mix 16:10, 4:3 and portrait crops within a disciplined grid. Captions
may show location / application / year. Never use masonry merely for
decoration if it destroys scanability.

## 13.7 Technical information

Dark section preferred. Combine: - parameter grid, - material detail
photo, - concise explanations, - downloadable/linked documentation if
available.

Numbers should be more prominent than labels.

## 13.8 Pricing / calculator

Treat as a flagship section. Use strong contrast from neighboring
content. Result must update immediately where technically possible.

Do not bury the calculator inside a modal by default.

## 13.9 Energy savings

Use calculator + restrained visualization. Avoid promising a fixed
saving where actual performance depends on building conditions. Show
assumptions and explain the estimate.

## 13.10 Testimonials

2--3 strong authentic statements are preferable to a wall of anonymous
reviews. Include project context.

## 13.11 FAQ

Accordion with 1 px rules, not individual rounded cards. Large readable
question text. One item may be open by default.

## 13.12 CTA section

Near page end, make the decision simple: - "Zjistěte orientační cenu
zateplení." - primary price-calculation action, - secondary
consultation/contact route.

## 13.13 Footer

Dark. Large brand presence but compact information architecture. Include
contact, regions, service links, legal links and company data. Avoid an
oversized multi-column corporate sitemap if the site does not need it.

------------------------------------------------------------------------

# 14. BENTO / MODULAR COMPOSITION

Bento layouts are permitted for technical proof and commercial
arguments, not as a default layout for every section.

A successful bento block combines: - one dominant 2×2 or wide tile, -
2--4 supporting tiles, - at least one photographic tile, - at least one
quantitative tile, - consistent 8--12 px radius, - 16--24 px gaps.

Possible content: - `A1` fire class, - `1 den` typical realization, -
`0 %` advance, - thermal conductivity, - material close-up, -
installation photo.

Do not fill all tiles with icons and paragraphs.

------------------------------------------------------------------------

# 15. IMAGE DIRECTION

## Photography principles

Prioritize: - actual Efektivní izolace installations, - workers actively
applying insulation, - attic and roof structures, - hose / blowing
machinery, - material texture, - before / during / after states, -
authentic Czech family houses, - details that demonstrate workmanship.

Visual character: - documentary, - tactile, - slightly industrial, -
natural light where possible, - honest surfaces and construction
context, - moderate contrast, - neutral color grade.

### Cropping

Crop for action and structure. Hands, machinery, rafters and material
may be used as close-up graphic textures.

### Avoid

-   smiling stock families looking at camera,
-   pristine 3D-rendered houses,
-   obvious AI-generated workers,
-   hard-hat handshake clichés,
-   excessive green color grading,
-   fake "eco" leaves,
-   imagery unrelated to the actual installation method.

### AI-generated imagery

If AI imagery is used for conceptual marketing, never present it as an
actual reference/project. Prefer real photography for evidence.

------------------------------------------------------------------------

# 16. DATA & STATISTICS

Numbers are a signature brand device.

Use: - oversized values, - small precise labels, - clear units, - short
source/context where needed.

Example: `0.034–0.037 W/mK` not "Excellent thermal properties."

Never fabricate or generalize technical values. Product-specific values
must match the actual material documentation used in that context.

------------------------------------------------------------------------

# 17. CONVERSION UX

## CTA hierarchy

### Primary

**Spočítat cenu** / **Nezávazně spočítat cenu**

Use once per major decision stage: - header, - hero, - after
benefit/technical proof, - final CTA.

### Secondary

**Chci konzultaci** / **Kontaktovat nás**

Use for users who cannot or do not want to self-calculate.

### Tertiary

Contextual links: - Jak to funguje - Prohlédnout realizace - Technické
parametry

### Conversion rules

-   Never show two visually identical primary CTAs with different goals
    next to each other.
-   A calculator should deliver value before demanding personal data.
-   Telephone input should use appropriate mobile input type.
-   Keep first-step forms short.
-   Repeat proof close to the form: payment terms, realization speed,
    service region, privacy reassurance.
-   Never use fake scarcity or countdowns.
-   Campaign deadlines must be real and current.
-   Any "up to" saving must be qualified by assumptions.

------------------------------------------------------------------------

# 18. MOTION LANGUAGE

Motion is functional and subtle.

## Timing

-   micro interaction: 120--180 ms
-   UI state transition: 180--240 ms
-   section reveal: 400--650 ms
-   image reveal: max \~700 ms

Preferred easing: `cubic-bezier(0.22, 1, 0.36, 1)`

## Allowed

-   12--24 px upward reveal + fade,
-   staggered stat values,
-   restrained count-up after entering viewport,
-   image crop/scale 1.00 → 1.03 on scroll,
-   2--4 px arrow/button motion,
-   very light parallax on large editorial images.

## Avoid

-   bouncing,
-   spinning icons,
-   scroll hijacking,
-   excessive cursor effects,
-   continuous decorative animations,
-   entrance animation on every small element.

Respect `prefers-reduced-motion`; remove nonessential movement.

------------------------------------------------------------------------

# 19. ACCESSIBILITY

Target: **WCAG 2.2 AA minimum**.

Rules: - body text contrast ≥ 4.5:1, - large text contrast ≥ 3:1, -
visible keyboard focus on every interactive element, - minimum practical
target 44 × 44 px, - forms always use persistent labels, - errors use
text + visual indicator, - never encode meaning with color alone, -
semantic heading hierarchy, - descriptive link/button names, -
meaningful image alt text; decorative images use empty alt, - accordions
expose expanded/collapsed state, - calculator results are announced
appropriately to assistive technology, - support 200% text zoom without
loss of content, - respect reduced motion.

Do not assume that brand green is accessible as text on light
backgrounds; validate the exact pairing.

------------------------------------------------------------------------

# 20. CONTENT DENSITY & COPY RULES

-   Section eyebrow: 1--4 words.
-   H2: preferably 3--8 words.
-   Lead: 1--3 sentences.
-   Benefit copy: ideally under 180 characters.
-   Buttons: 2--5 words.
-   Avoid more than 3 paragraph blocks before a visual break.
-   Break technical content with values, rules, diagrams and
    images---not arbitrary decorative cards.
-   Czech copy uses normal sentence capitalization; avoid ALL CAPS
    except labels.

------------------------------------------------------------------------

# 21. RESPONSIVE COMPONENT BEHAVIOR

## Hero

Desktop: asymmetrical split / image composition.\
Mobile: text first, CTA second, proof row third, image fourth. Never
place crucial copy over a busy photo on mobile.

## Stats

Desktop: 3--4 across.\
Tablet: 2×2.\
Mobile: 1--2 across depending on value length.

## Service cards

Desktop: 2--3 across or editorial split.\
Mobile: full width.

## Calculator

Desktop: controls + sticky result side panel.\
Mobile: sequential controls + persistent compact result after
calculation.

## Technical specs

Desktop: grid/table hybrid.\
Mobile: label/value stacked rows.

## Navigation

Desktop inline.\
Mobile full-screen menu; no miniature desktop nav.

------------------------------------------------------------------------

# 22. DESIGN TOKENS

``` css
:root {
  /* Brand */
  --color-brand-50: #F3FBE8;
  --color-brand-100: #E4F6C8;
  --color-brand-200: #CBEF91;
  --color-brand-300: #ADE455;
  --color-brand-400: #91D52B;
  --color-brand-500: #7FC51B;
  --color-brand-600: #65A512;
  --color-brand-700: #4E8012;
  --color-brand-800: #3F6514;
  --color-brand-900: #365516;

  /* Semantic colors */
  --color-primary: #171A18;
  --color-accent: #7FC51B;
  --color-bg-dark: #171A18;
  --color-bg-dark-alt: #202420;
  --color-bg-light: #F4F4EF;
  --color-surface: #FFFFFF;
  --color-surface-elevated: #FAFAF7;
  --color-text-primary: #171A18;
  --color-text-secondary: #626861;
  --color-text-tertiary: #858B84;
  --color-text-inverse: #F7F8F3;
  --color-text-inverse-muted: #B9BEB8;
  --color-border: #D8DCD5;
  --color-border-dark: #343A34;
  --color-success: #287A46;
  --color-warning: #A76708;
  --color-error: #B83B32;

  /* Typography */
  --font-display: "Manrope", "Inter", "Helvetica Neue", Arial, sans-serif;
  --font-body: "Manrope", "Inter", "Helvetica Neue", Arial, sans-serif;

  --type-display-xxl: clamp(3.5rem, 6.1vw, 5.5rem);
  --type-display-xl: clamp(3rem, 5vw, 4.5rem);
  --type-h1: clamp(2.75rem, 4.2vw, 3.75rem);
  --type-h2: clamp(2.25rem, 3.3vw, 3rem);
  --type-h3: clamp(1.625rem, 2.2vw, 2rem);
  --type-h4: clamp(1.25rem, 1.6vw, 1.5rem);
  --type-body-lg: 1.25rem;
  --type-body: 1rem;
  --type-small: 0.875rem;
  --type-label: 0.8125rem;
  --type-caption: 0.75rem;

  /* Spacing */
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;
  --spacing-5: 20px;
  --spacing-6: 24px;
  --spacing-8: 32px;
  --spacing-10: 40px;
  --spacing-12: 48px;
  --spacing-16: 64px;
  --spacing-20: 80px;
  --spacing-24: 96px;
  --spacing-32: 128px;
  --spacing-40: 160px;

  /* Radius */
  --radius-xs: 2px;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-pill: 999px;

  /* Border */
  --border-width: 1px;
  --border-width-emphasis: 2px;

  /* Layout */
  --container-wide: 1440px;
  --container: 1280px;
  --content-width: 760px;
  --form-width: 640px;

  /* Motion */
  --duration-fast: 160ms;
  --duration-base: 220ms;
  --duration-reveal: 520ms;
  --ease-brand: cubic-bezier(0.22, 1, 0.36, 1);

  /* Shadow — use sparingly */
  --shadow-elevated: 0 12px 32px rgba(17, 22, 18, 0.08);
}
```

------------------------------------------------------------------------

# 23. COMPONENT TOKEN RULES

All components must consume semantic/global tokens. Components may
define aliases but not hard-code replacement values.

Example:

``` css
.button-primary {
  --button-bg: var(--color-accent);
  --button-text: var(--color-primary);
  --button-radius: 6px;
}

.card {
  --card-bg: var(--color-surface);
  --card-border: var(--color-border);
  --card-radius: var(--radius-md);
}
```

If a component needs a value not covered by the system: 1. first attempt
to compose an existing token; 2. if genuinely reusable, add a new token
to this document; 3. only then use it in implementation.

------------------------------------------------------------------------

# 24. DO / DON'T

## Do

-   use strong type and negative space,
-   alternate dark and light environments intentionally,
-   lead with real project imagery,
-   make technical numbers visually attractive,
-   use asymmetry inside a disciplined grid,
-   make price calculation a signature interaction,
-   preserve visible structure and edges,
-   make mobile layouts purpose-built,
-   use green to direct attention.

## Don't

-   imitate generic WordPress contractor templates,
-   turn the site into a rounded SaaS dashboard,
-   use gradients without a specific approved reason,
-   add random accent colors,
-   put every content unit in a card,
-   use heavy shadows,
-   use decorative 3D blobs,
-   use generic stock-family imagery,
-   overuse icons,
-   center every section,
-   use green for entire page backgrounds,
-   fabricate statistics, certifications, savings or references.

------------------------------------------------------------------------

# 25. RECOMMENDED HOMEPAGE RHYTHM

This is a recommended composition, not a mandatory page template:

1.  Dark hero --- offer + price/benefit + calculator CTA + authentic
    installation image.
2.  Light proof rail --- 3--4 commercial facts.
3.  Services --- editorial/image-led.
4.  Dark technical bento --- fire class, λ value, material, installation
    detail.
5.  Light process --- 01--04.
6.  Full-width real-project image break.
7.  References / projects.
8.  High-contrast price calculator.
9.  Energy-savings estimator.
10. Testimonials / trust evidence.
11. FAQ.
12. Strong final CTA.
13. Dark footer.

This sequence alternates **promise → proof → explanation → evidence →
action** rather than simply stacking content categories.

------------------------------------------------------------------------

# 26. SOURCE CONTENT CURRENTLY AVAILABLE

The current public site communicates, among other items:

-   blown insulation for attics and roofs,
-   a prominently displayed price per m²,
-   payment after realization / zero advance,
-   a claim of up to 30% heating-cost reduction,
-   typical one-day realization,
-   non-combustible A1 material,
-   blown stone mineral wool,
-   technical parameters including thermal conductivity, density,
    diffusion resistance and softening temperature,
-   a four-step consultation → measurement → realization → handover
    process,
-   a price calculator,
-   an energy-savings calculator,
-   project photos,
-   service regions and contact details.

These are **content inputs**, not permanent design tokens. Prices,
dates, claims, service regions and product specifications must always be
sourced from current approved business data before publishing.

------------------------------------------------------------------------

# 27. AI IMPLEMENTATION RULES

These rules are mandatory for any AI or developer generating UI for
Efektivní izolace.

1.  **Treat `DESIGN-SYSTEM.md` as the visual source of truth.**
2.  **Always use defined design tokens.**
3.  Never introduce a new UI color unless explicitly requested or the
    design system is formally updated.
4.  Never invent arbitrary font sizes, spacing values or border radii
    when an existing token can be used.
5.  Do not change the typography family without updating the design
    system.
6.  Maintain the defined section spacing and container logic.
7.  Preserve the dark-charcoal + off-white + controlled-green visual
    hierarchy.
8.  Use green strategically for action, active state, proof and key
    data; do not flood the interface with green.
9.  Prefer strong typography, photography, rules and whitespace over
    decorative UI.
10. Preserve the industrial, technical and residential-renovation
    character.
11. Never turn the brand into a generic SaaS interface.
12. Avoid excessive rounded cards, pill buttons, gradients and heavy
    shadows.
13. Do not place every content block inside a card.
14. Use authentic installation photography whenever real imagery is
    available.
15. Do not represent generated imagery as a real completed project.
16. Prefer measurable facts over vague marketing statements.
17. Never invent technical specifications, savings, prices,
    certifications, reviews, deadlines or project results.
18. Any price, promotion or time-limited offer must come from current
    approved data.
19. Every page must have one visually dominant primary conversion
    action.
20. The default primary conversion action is **price calculation**
    unless the page purpose requires otherwise.
21. Use consultation/contact as a secondary conversion route.
22. On calculator flows, provide useful calculated value before
    requesting unnecessary personal data whenever possible.
23. All forms require labels, error states, focus states and keyboard
    accessibility.
24. Meet WCAG AA contrast requirements.
25. Respect `prefers-reduced-motion`.
26. Mobile layouts must be recomposed, not merely scaled down.
27. Keep body text readable and within the defined maximum text width.
28. Use the 12/8/4-column grid according to breakpoint.
29. Use asymmetry only when anchored to the grid.
30. New components must inherit existing tokens and visual grammar.
31. If a new recurring pattern is required, define it in the design
    system before proliferating variants.
32. Use at most one dominant visual idea per section.
33. Do not copy the Iron Peak reference literally. Reuse only high-level
    principles: hierarchy, contrast, editorial spacing, industrial
    restraint and image-led composition.
34. All newly created pages must unmistakably feel like the same
    **Efektivní izolace** brand.
35. When a requested design conflicts with this system, explicitly flag
    the conflict before implementing the exception.

------------------------------------------------------------------------

# 28. IMPLEMENTATION CHECKLIST

Before approving any new page or component, verify:

-   Does it use only approved colors and tokens?
-   Is green scarce enough to retain emphasis?
-   Does typography follow the scale?
-   Is spacing tokenized?
-   Is the grid intentional?
-   Are radii restrained?
-   Is there a clear primary CTA?
-   Are technical/business claims sourced?
-   Is real imagery used where evidence matters?
-   Does the page avoid generic contractor and SaaS clichés?
-   Does mobile have a deliberate composition?
-   Are focus, error and reduced-motion states covered?
-   Does the result still feel like "Measured performance"?

If any answer is "no", revise before release.

------------------------------------------------------------------------

## Document maintenance

Any intentional system-level change should update this file first and
increment the version. Page-specific exceptions should not silently
become new standards.
