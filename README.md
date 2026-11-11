# Royal

Royal is a design system built on shadcn/ui and Radix. It has a set of tokens, the shadcn components restyled to use them, and a specimen page that shows every component in light and dark. Projects install it through the shadcn CLI, straight from this repository.

## Use it in a project

Royal needs Next.js with Tailwind CSS 4 and shadcn/ui on the Radix base.

1. If the project doesn't use shadcn/ui yet, set it up on Radix:

   ```sh
   npx shadcn@latest init -b radix
   ```

2. Install the theme:

   ```sh
   npx shadcn@latest add https://raw.githubusercontent.com/aaronte/royal-ui/main/public/r/royal.json
   ```

   This copies `tokens.css` and `royal.css` into `lib/royal/` and imports them after Tailwind. It points shadcn's colour, radius and font variables at Royal's tokens for light and dark, and adds Source Serif 4, Instrument Sans and IBM Plex Mono to the root layout with `next/font`.

3. Add components by name:

   ```sh
   npx shadcn@latest add https://raw.githubusercontent.com/aaronte/royal-ui/main/public/r/button.json
   ```

   Each component also installs the theme and any Royal components it uses. Every file in `src/components/ui` is available under its file name, for example `dialog.json`.

To use short names, add the registry to `components.json`:

```json
{
  "registries": {
    "@royal": "https://raw.githubusercontent.com/aaronte/royal-ui/main/public/r/{name}.json"
  }
}
```

Then `npx shadcn@latest add @royal/button @royal/dialog` works.

Dark mode follows a `dark` class on `<html>`. With next-themes, use `attribute="class"`.

### Things to know

- Royal's component rules sit in Tailwind's `utilities` layer, after Tailwind's own utilities. A utility class you add to a Royal component wins only when its selector is at least as strong as Royal's rule for that property.
- The theme adds a second `@custom-variant dark` line to your stylesheet. It replaces shadcn's default so that `dark:` utilities don't outrank Royal's rules. Keep it after the first one.
- Questionnaire: in `next dev` with `cacheComponents` on (the default for new Next.js 16.4 apps), the upstream `@shadcn/react` 0.3.1 primitive fails with "Maximum update depth exceeded". Production builds work.

## Work on Royal

```sh
npm install
npm run dev
```

The specimen page runs at http://localhost:3003. After changing a component or a stylesheet, run `npm run registry` and commit `registry.json` and `public/r` with the change. CI fails if they don't match the source.

- `src/styles/tokens.css`: every token, as `--royal-*` custom properties at `:root`, with a dark block for `.dark`.
- `src/styles/royal.css`: the stylesheet projects install, which restyles the shadcn components.
- `src/styles/catalog.css` and `src/styles/specimen.css`: the specimen page only.
- `src/components/ui`: the components. `src/components/examples` has one demo each.
- `scripts/registry.mjs`: writes `registry.json` from the source.
- `docs/shadcn`: where the components came from, what was changed, and the review notes. `docs/CHECKLIST.md` tracks what is left before launch.

## Licence

The component source comes from shadcn/ui under the MIT licence. The notice is in `docs/shadcn/LICENSE.md`.
