# Royal

Royal is a design system built on shadcn/ui and Radix. It has a set of tokens, the shadcn components restyled to use them, and a specimen page that shows every component in light and dark.

It is moving here from aaronte.com and can't be installed yet. The shadcn registry is the next step. `docs/CHECKLIST.md` tracks what is left.

## Run it

```sh
npm install
npm run dev
```

The specimen page runs at http://localhost:3003.

## Where things are

- `src/styles/tokens.css`: every token, as `--royal-*` custom properties at `:root`, with a dark block for `.dark`.
- `src/styles/royal.css`: the overrides that restyle the shadcn components.
- `src/styles/specimen.css`: the specimen page and its hand-built controls.
- `src/components/ui`: the components. `src/components/examples` has one demo each.
- `src/components/specimen`: the specimen page.
- `docs/shadcn`: where the components came from, what was changed, and the review notes.

## Fonts

Royal's font tokens read next/font variables (`--font-source-serif`, `--font-instrument-sans`, `--font-ibm-plex-mono`). Put those font classes on `<html>`, as `src/app/layout.tsx` does, or the tokens resolve to nothing.

## Licence

The component source comes from shadcn/ui under the MIT licence. The notice is in `docs/shadcn/LICENSE.md`.
