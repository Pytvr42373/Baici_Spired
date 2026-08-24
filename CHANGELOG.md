# Changelog

## 2026-08-24

- Fixed talent-tree typography and contrast across all four themes, added theme-specific power/lore colors and clearer unlocked, available, locked, and maxed states, and shortened talent descriptions without changing their effects.
- Improved event overlays for readability and safer scrolling: widened the card, increased body and choice typography, added spacing, and kept the back control clear on small screens. Shortened all ten event narratives, labels, tips, and quiz prompts for faster scanning without changing outcomes. Added theme-aware, high-contrast toast colors, including a clear mech border, and bumped the CSS/data cache keys.
- Tightened the loaded map geometry in `js/game.js`: four-column centers remain 67px apart, normal hit radius is 33px (1px gap), Boss hit radius remains 40px, seven row centers are now about 75.43px apart, and labels use +42px (normal) / +44px (Boss) offsets to clear adjacent nodes while staying inside the 560px viewBox. Bumped the game script cache key.
- Improved the 320×560 map across minimal, pink, mech, and egg: larger readable labels/icons and node bodies, overlap-safe hit areas, higher-contrast palette-specific paths, and clearer completed/current/Boss states. Fixed map labels to use `--ink` and refreshed map asset cache keys.
- Fixed battle end not returning to the map: after a normal battle that dropped no relic (gold-loot branch), `floorClear()` never called `returnToMap()`, leaving the player stuck on the game screen with a dead enemy. Added `returnToMap()` to the gold branch; relic, elite, boss (next-act / end-run), and multi-enemy branches verified intact.
- Kept attack and defense controls visibly red and blue in every battle state, with selected-state emphasis limited to opacity, shadow, and lift.

## 2026-08-23

- Allowed `.env.example` to be tracked while keeping other `.env.*` files ignored.
- Fixed enemy block duration, difficulty-scaled damage, talent timing, starting gold, thorn damage, potion slots, and shop affordability.
- Preserved talent effects in saves and added compatibility restoration for existing saves.
- Namespaced word progress by vocabulary tier and migrated existing learning records without resetting progress.
- Updated camp review tracking and restricted repeatable review and zero-progress abandon rewards.
- Bumped static asset cache keys so browsers load the corrected scripts.

## 2026-08-11

- Added repository-specific `AGENTS.md` guidance for future coding sessions.
- Refreshed `AGENTS.md` after the frontend was split into HTML, CSS, and JavaScript modules.
- Added repository-level ignore rules for agent instructions and private local files.
