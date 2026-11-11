# Royal component library

The catalog on the specimen page (`/#components`) contains 64 shadcn UI components and three compositional recipes: Data Table, Date Picker, and Typography. The catalog includes Direction and the newer Attachment, Bubble, Message, Message Scroller, Marker, Code Block, Questionnaire, and Trace components.

Source: official shadcn registry, retrieved 2026-11-08. See `registry-manifest.json` for URLs and source dependencies, `catalog.json` for the specimen inventory, and `LICENSE.md` for the upstream MIT license.

## Implementation

Import components from `@/components/ui/<name>`. Their upstream exports, variant props, controlled/uncontrolled behavior, render/asChild composition, and primitive accessibility features are retained. The default styling is Royal: the tokens in `src/styles/tokens.css` and the overrides in `src/styles/royal.css`. Destructive variants use the named `--royal-color-error` token; charts use the five `--royal-color-series-N` colours in both themes.

Overlays (menus, tooltips, dialogs, sheets) render into `<body>` through each primitive's own portal, as upstream does. Royal's tokens and the shadcn variable mapping sit at `:root`, so they apply there. Wrap tooltip consumers in `TooltipProvider`.

The source was adapted in these narrow ways:

- Imports point to this library, and the registry's multi-library icon placeholder resolves to Lucide.
- Buttons add `royal-button` (and `royal-primary` on the default variant) for Royal's border, shadow and hover. Sizes and variants remain available.
- The field-error iterator uses `Array.from` for this project's TypeScript target. Slider labels are forwarded to individual thumbs so their values are named for assistive technology.
- Example-only AI backend calls were replaced with local specimens for Message, Message Scroller, and Trace. These components accept their original props; the page does not connect to an AI service.
- Examples use local tokens, project-compatible links, and the current DayPicker `autoFocus` prop.

## CSS

The app runs Tailwind 4 directly; `src/app/globals.css` sets the order. Tailwind's theme and base reset sit in layers. The page styles (`src/styles/specimen.css`), Tailwind's utilities and Royal's overrides (`src/styles/royal.css`) follow unlayered, in that order. They stay unlayered because Sonner and Vaul inject unlayered CSS at runtime, and anything in a layer would lose to it.

The `.ds-library` and `.editorial-system` scopes are written as `:where()`, so they add no specificity. A Royal rule beats a component's own utility class only when its selector is stronger, or equally strong and later. That matches how the rules behaved in aaronte.com, where the utilities carried an extra scope class. The Sonner rules keep the full `.ds-library` class to outrank Sonner's own CSS.

Run `npm run typecheck`, `npm run lint` and `npm run build` after a change.

The official example content is sample content. Forms and toasts demonstrate local state and validation; they do not submit data to an external service. Data Table includes sorting, filtering, visibility, selection, and pagination. The original component source supports further configurations beyond the default specimen shown in the picker.

The follow-up component review and its checks are recorded in `QA.md`. The
specimen follows the page theme. `data-royal-control` preserves theme identity
through primitive/FormControl slot composition, while keeping upstream public
slots. Switch/radio geometry, native hidden states, progress semantics, and
responsive example widths have been reconciled with the shared system.
