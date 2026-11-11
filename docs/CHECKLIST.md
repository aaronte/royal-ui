# Royal launch checklist

"Live" means three things are true: Royal has its own repo, its registry and docs are deployed at a public URL, and one other project installs from it.

Written 2026-11-10 in aaronte.com, where Royal started at `/design-system`. It moved to `aaronte/royal-ui` the same day, before phases 2 and 4 were finished, because two phase 2 items and the registry depend on running Tailwind 4 without the scoped build that aaronte.com needed. Paths below that start with `src/app/design-system` or `design/` refer to aaronte.com.

## 0. Decisions (Aaron)

- [x] Name: Royal. `royal-ui` for the repo and npm, `@royal` as the registry namespace.
- [x] Heading typeface: Source Serif 4. `DESIGN.md` still names a geometric sans as the lead for the site, so it needs a correction (phase 8).
- [x] Themes: light and dark.
- [x] Glass and the pointer reflection: both ship.
- [x] Primitives: Radix. `qr-code` and `opendoor` use Base UI, so either one would carry both libraries after adopting Royal.
- [x] Replacement avatars: the four sample people already used in the 10KC chat demo.
- [x] Replacement photos: generated with Higgsfield and saved as files in the repo, so there is no stock licence to track.
- [x] Replacement links: `#`, until Royal has docs pages to point at.
- [x] First consuming project: none for now (2026-11-10). Phase 7 waits until one is picked.
- [x] Docs address: `aaronte.com/royal-ui`. The registry is then at `https://aaronte.com/royal-ui/r/<item>.json`.
- [x] Repo visibility: public.

## 1. Tokens

- [x] Rename every token with a `--royal-` prefix. Done 2026-11-10: each token keeps its old name after the prefix (`--royal-color-accent`). The old names collided with the variables Tailwind 4 emits for shadcn's `accent`, `muted` and `ease-out`, and the two workarounds in `catalog.css` are gone. One mapping stays on purpose: Tailwind's ease-out utility takes Royal's curve.
- [x] Define the tokens at `:root` instead of `.editorial-system`. Done 2026-11-10. Dark is a `.dark` class on the root element. The specimen page writes its six edited colours to the root element too, so the colours mixed from them follow, and removes them when the page unmounts. Font tokens read next/font variables, so a project has to set those on the root element. This page sets them lower down and redeclares the font tokens on its `main`.
- [x] Add a heading size scale. Done 2026-11-10: `--royal-text-display` 42px, `title` 32px, `heading` 24px and `subheading` 18px. Below 768px display is 32px and title is 28px, which replaces the per-rule mobile sizes.
- [x] Add shadow tokens. Done 2026-11-10: 14 `--royal-shadow-*` tokens named by role (control, overlay, dialog, focus and so on). Multi-layer shadows list tokens with commas. The 2px blue bar on a highlighted select item is drawn with a shadow and stays a literal.
- [x] Set heading tracking per size. Done 2026-11-10: -0.05em at 42px, -0.04em at 32px, -0.03em at 24px, -0.015em at 18px. Host Grotesk headings use a looser set.
- [x] Replace raw 10, 12, 40 and 56px values with the spacing scale, or extend the scale. Done 2026-11-10: steps are now numbered in 4px units (`--royal-space-3` is 12px) and 12, 40 and 56px were added. The two 10px gaps became 12px (radio to label) and 8px (slider to value). Padding inside buttons and fields stays literal, because it is set against the fixed control heights.
- [x] Use one error colour. Done 2026-11-10: the hand-built form's invalid field, error text and attention box use `--royal-color-error`, like the catalog.
- [x] Design the dark theme. Done 2026-11-10: a dark block in `tokens.css`, taken from `design/royal/mocks/dark-dashboard.html`. The accent `#2555e8` measures 3.2:1 on the dark ground, so it stays for fills and blue text uses `--royal-color-accent-text` (`#8aa4ff`, 8.0:1). Checked by eye across the page, all 67 catalog components and 15 open overlays.
- [x] Decide the light values of the tokens added with the dark theme (`--royal-color-raised`, `faint`, `good`, `warn`, `series-1` to `5`, and `--royal-radius-card`). They were picked without review and most have no component using them yet. The series colours were approved for light charts on 2026-11-10, so charts look the same in both themes. The other light values were accepted as they are the same day, to revisit when a component uses them.
- [x] Switch dark with a `.dark` class. Done 2026-11-10: the dark variant in `design/shadcn/utilities.css` now matches a `.dark` ancestor, and the root element takes the class from the Dark theme button.
- [ ] Optional: keep tokens in JSON and generate the CSS. Needed only if a native app will consume Royal.

## 2. Components

- [ ] Replace the hand-built `Checkbox`, `Tabs`, switch, `SelectControl` and `RangeControl` with the shadcn versions in `ui/`.
- [x] Remove the `.ds-library` scope from the override rules in `catalog.css` (201 lines). Unblocked in royal-ui, where Tailwind 4 runs unscoped. Found 2026-11-10 in aaronte.com: the generated Tailwind 4 utilities are prefixed with `.ds-library` to keep them off the Tailwind 3 site, and every override is written one class above them. Unscoping the overrides alone changes which rule wins against both the utilities and the page's own element rules. Do it in the new repo, once Tailwind 4 runs unscoped. Done 2026-11-11 in royal-ui. `royal.css` now holds only rules that target Royal's components, unscoped, inside Tailwind's utilities layer after its own utilities, plus the variable mapping at `:root`. The catalog's rules for its example markup moved to `catalog.css`. Pixel-identical in both themes.
- [x] Move the `.royal-button` and finish rules out of `design-system.css` into the shipped stylesheet. Done 2026-11-11. Reflective ships as the default finish. The specimen's Matte and Frosted options still work through `data-finish`, except on buttons inside overlays, which always show Reflective. The page keeps its full rules for the hand-built buttons.
- [ ] Package glass as registry items: the material classes from `Materials.tsx` and the `PointerReflection` component. Keep its `prefers-reduced-motion` check and the `@supports` fallback for browsers that cannot blur a backdrop.
- [x] Remove `DesignPortalContext` from the 12 overlay components. Global tokens make it unnecessary. Unblocked in royal-ui. Found 2026-11-10 in aaronte.com: an overlay portalled to `body` leaves `.ds-library`, so none of the generated utilities match it. Do it in the new repo with the item above. Done 2026-11-11: overlays render into `<body>`. The specimen writes every edited token to `<html>`, so overlays follow the pickers. Overlays match the old captures pixel for pixel.
- [x] Clean the 8 modified components: `button`, `checkbox`, `input`, `radio-group`, `select`, `sonner`, `switch`, `textarea`. Standard `cn` import path, `ds-` class names renamed. Done 2026-11-10. The `cn` import was already standard: `cn` is shadcn's npm package, and the upstream registry lists it as a dependency. The names the components rely on are now `royal-button`, `royal-primary`, `royal-radio-dot`, `royal-checkbox-mark`, `royal-checkbox-mixed-mark` and `data-royal-control`. Page layout classes keep `ds-`.
- [x] Move the combobox off `@base-ui/react`, or accept it as the one Base UI dependency. It is the only component not on Radix. Accepted 2026-11-11: the combobox keeps `@base-ui/react`, and its registry item lists it as a dependency.

## 3. Example content

- [x] Replace the 6 GitHub avatar URLs in `avatar-demo.tsx` and `hover-card-demo.tsx`. Done 2026-11-10 with local files in `public/design-system/avatars/`. The hover card's `@nextjs` and Vercel copy became a sample profile for Alex Kim.
- [x] Replace the 30 Unsplash URLs in `attachment-example.tsx` and `aspect-ratio-demo.tsx`. Done 2026-11-10. They were 6 distinct photos, now 6 generated JPEGs in `public/design-system/photos/` (Higgsfield, model `gpt_image_2_6`, 1.6 MB in total).
- [x] Replace the `ui.shadcn.com` links with `#` and the shadcn names in the navigation menu, input group and attachment examples. Done 2026-11-10: 12 links, and the visible text now reads Royal, `@royal` and `aaronte.com/royal-ui`.
- [x] Rewrite the stock sample copy. Done 2026-11-10 in 17 example files: the accordion, alerts, alert dialog, sign in card, profile forms, typography article, navigation menu and sidebar text, and every shadcn or Radix team name.
- [ ] Optional: the neutral sample data is still shadcn's (invoice rows, fruit list, framework list, the "Move Goal" drawer, the bug report form). Replace it if the catalog should share nothing with shadcn's docs.
- [x] Keep `LICENSE.md`. The component source is MIT and the notice has to stay. Kept at `docs/shadcn/LICENSE.md`.

## 4. Registry

- [x] Write `registry.json`: one theme item (tokens, shadcn variable mapping, override stylesheet) and one item per modified component. Done 2026-11-11. `scripts/registry.mjs` writes it from the source: the `royal` theme item, three font items, the `use-mobile` hook, and all 64 components, not only the modified ones, so a project gets the tested source.
- [x] List each item's dependencies, using `design/shadcn/registry-manifest.json`. Done 2026-11-11, read from each file's imports rather than the manifest, so they can't drift. Versions come from `package.json`.
- [x] Add a `shadcn build` script that writes to `public/r/`. Done 2026-11-11: `npm run registry`. GitHub serves `public/r` as raw files, so the registry works before any deploy.
- [x] Install from the local build into a scratch Tailwind 4 and shadcn project, and compare it to the catalog. Done 2026-11-11 in a new Next.js 16.4 app after `shadcn init -b radix` with the Nova preset. All 64 components install, typecheck and build. For each of the 67 examples, every component element has the same computed styles as in the catalog, in light and dark. Getting there moved the rules components relied on from the catalog into `royal.css`, and made the theme set the dark variant. Known issue: the questionnaire loops in `next dev` with `cacheComponents` on; production is fine.

## 5. New repo

- [x] Create `aaronte/royal-ui`. Done 2026-11-10, public.
- [x] Move the tokens, stylesheets, `ui/`, `examples/`, `lib/`, `hooks/`, the catalog page and the `design/shadcn/` docs. Done 2026-11-10. Imports use the standard shadcn paths (`@/components/ui`, `@/lib`, `@/hooks`). The page's font classes moved to `<html>`, so the font tokens resolve at `:root`.
- [x] Run on Tailwind 4 only. Drop `scripts/design-ui.mjs` and the 7,529-line `catalog.generated.css`. Done 2026-11-10. Against aaronte.com, 128 of 136 catalog and page screenshots are pixel-identical in both themes, and all 15 overlays match apart from placeholder text. The differences left come from Tailwind 4's base reset: placeholder text is ink at 50% instead of Tailwind 3's `#9ca3af`, and table header cells lose the browser's 1px padding, so the calendar is 2px shorter. Two things on the old page were side effects: the site's Tailwind 3 build also styled the catalog (its `space-y` rules), and the page's margin reset outranked Tailwind 4's `space-y`. The reset is removed, since Tailwind 4's base reset already does it.
- [ ] Split `DesignSystem.tsx` into readable files and rename the `editorial-system-v1` storage key.
- [ ] Fix stale wording: "midnight navy" in `design-system.css`, "navy tokens" in `QA.md`, Georgia in `.hallmark/preflight.json`, and "editorial system" throughout.
- [x] Add CI: typecheck, lint, registry build. Done 2026-11-11: `.github/workflows/ci.yml`. It also fails if `registry.json` or `public/r` don't match the source.
- [x] Write a README with the install commands. Started 2026-11-10: the README explains how to run the specimen and where things are. Install commands wait for the registry. Done 2026-11-11.
- [ ] Optional: reserve `royal-ui` on npm.

## 6. Deploy

- [ ] Create a Vercel project for the repo and set `basePath: '/royal-ui'` in its Next config. Not needed for installing: the registry is served from GitHub. Still needed for the docs site at `aaronte.com/royal-ui`.
- [ ] In this repo, add a rewrite in `next.config.js` from `/royal-ui/:path*` to that project. aaronte.com is on Vercel and already has a `rewrites()` block.
- [ ] Remove `noindex` from the docs page, if it should be public.
- [ ] Confirm `https://aaronte.com/royal-ui/r/button.json` returns the built item. Until then, `https://raw.githubusercontent.com/aaronte/royal-ui/main/public/r/button.json` is the live URL.

## 7. First consumer

On hold. No project is chosen yet, so phases 1 to 6 can finish without this one.

- [ ] Add the `@royal` registry to the project's `components.json`.
- [ ] Install the theme and the components it uses.
- [ ] Load Source Serif 4 and Instrument Sans.
- [ ] Check every screen that uses a restyled component at desktop width and at 320px, in light and in dark.
- [ ] Log what was missing or wrong back in the Royal repo.

Royal is live when this phase is done.

## 8. This repo, after launch

- [ ] Remove the moved files and redirect `/design-system` to `/royal-ui`.
- [ ] Update `DESIGN.md` and `AGENTS.md` to point at Royal, and correct the heading typeface note in `DESIGN.md`.
- [ ] Adopt Royal page by page. This needs the Tailwind 4 migration, or a directory that Tailwind 3 ignores.
