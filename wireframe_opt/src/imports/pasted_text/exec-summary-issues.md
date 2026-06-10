Executive summary — top 5 issues
1
Catastrophic contrast failure. Measured contrast ratios: body text vs background = 1.22:1. Subtitle text = 1.02:1. Stats numbers = 1.05:1. WCAG AA requires 4.5:1 minimum. The page is objectively unreadable outdoors, on low brightness, or with any ambient glare — which describes most real mobile usage.
2
Registration form is buried 8+ full scrolls deep. The primary conversion action — sign up — requires scrolling past the entire page. On a 6-inch phone, this is roughly 12,000px of scroll distance. Most users have already left.
3
"START QUEST" CTA is invisible as a button. The CTA button area measured at luminance 0.009 — nearly identical to the surrounding dark background. A user who cannot distinguish the button outline will not tap it.
4
The page is over 8,000px tall for a single event registration. The information architecture stacks every section vertically with no meaningful compression, accordion behavior, or progressive disclosure. Scroll fatigue is guaranteed.
5
Hero section wastes ~400px on empty space above the fold. After the navbar, there is a large dark gap before "SIVICAMP 2026" appears. On a real 390px viewport, nothing meaningful is visible until the user scrolls — even the countdown is partially cut off.
Critical issues — fix immediately
  Contrast ratios below 1.1:1 throughout the page
Measured: subtitle text = 1.02:1, body text = 1.22:1, stats = 1.05:1. WCAG AA minimum is 4.5:1 for body text, 3:1 for large text. This is not a stylistic issue — the page fails basic legal accessibility requirements and is unreadable for ~8% of users with any color vision deficiency, and practically unreadable for all users outdoors.
Fix: increase body text to #D4D0FF or #FFFFFF on the dark bg. Minimum contrast 4.5:1. Test every text layer individually.
  Registration form has no mobile-accessible entry point
"REGISTRATION_FORM_V2.1" sits at the very bottom of an extremely long page with no sticky CTA or shortcut to jump there. The form itself has 5+ fields including a custom "TRACK" selector (Participant / Mentor / Sponsor) which relies on visual-only icon buttons with no clear tap state.
Fix: add a sticky "Đăng ký" bottom bar visible after hero scroll. Jump link to form. Or open form in a bottom sheet overlay.
  Monospace / decorative fonts at small sizes
Section labels like "MISSION_301", "// FIRST HACKATHON AT SIVICAMP", "access_requirements — hover to inspect" use thin monospace or spaced-caps fonts at ~10–11px equivalent. These render at under 12px on a real phone at 1x. The phrase "hover to inspect" is an explicit desktop-only instruction appearing on a mobile-first page.
Fix: minimum 14px for any visible label. Remove all hover-dependent copy. Replace with tap/scroll affordances.
  "EXPLORE" ghost button is nearly invisible and too small
The secondary CTA has a 1px border on a near-black background measuring ~1.87:1 contrast. Its tap target appears to be approximately 36px tall — below Apple HIG (44pt) and Google Material (48dp) minimums. It is placed immediately below the primary CTA with insufficient spacing, increasing accidental tap risk.
Fix: min-height 48px, border at least 2px, text color #FFFFFF or high-contrast purple. Add 12px gap between CTAs.
  Sponsor / partner scroll strip is unreadable
The scrolling sponsor strip ("FPT · Vietinbank · Code...") uses dot-separated text that is cut off, and the last entry is cropped mid-word. No visual affordance that this is scrollable. Logo-less — only text abbreviations that don't serve as trust signals.
Fix: use logo images (even monochrome SVG), ensure full names visible, or remove the strip and show logos in a static 2-column grid.
Medium priority improvements
Countdown timer readability
The 4-box countdown (98:21:52:36) uses thin outlined boxes on a dark bg. The label beneath each number (NGÀY, GIỜ, PHÚT, GIÂY) is ~9px — invisible on most phones. Increase to 12px min, add more padding to boxes, and ensure label color has 3:1 contrast minimum.
Stats section (100+, 48h, 3+, 1st) needs context
The 2×2 stat grid uses large colorful numbers but the sublabels (PARTICIPANTS, HACKING, WORKSHOPS, IN EUROPE) are too small to read at mobile scale. Stats mean nothing without legible labels. The purple and cyan color pairing also fails contrast on the mid-purple bg.
Schedule section is dense and filterless
The 17/09 – 19/09 schedule lists items in a single vertical stream with color-coded type pills (CEREMONY, HACK, SOCIAL etc.) but no day filter or tab. On mobile, a 3-day programme should use a sticky day tab bar so users can jump. Currently users must scroll through all events to find their day.
Folder card UI (eligibility section) has no hover fallback
The 4 "requirement cards" (Nền tảng STEM, Thạc sĩ, 18–35 tuổi, Người Việt) appear to be folder-style flippable cards. On mobile, flip on hover doesn't work. Content must be immediately visible, or use a tap-to-expand accordion instead.
SiviTour section has no visual anchor
The city exploration section lists locations (Römerberg, Main Riverbank, Skyline Plaza, EU Community) as text-icon rows without images or maps. For a tour section about a city, the lack of any imagery kills credibility and engagement. Add at least one illustrative image or a static map pin grid.
Form track selector needs clear tap states
The TRACK input shows Participant / Mentor / Sponsor as 3 icon buttons. Selected state appears to be color-only (no border, no check, no size change). Color-only selection state fails accessibility — at minimum add a border or checkmark to selected state.