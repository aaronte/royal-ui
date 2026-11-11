# Component review — 2026-11-08

Reviewed all 67 catalog entries in the local browser. This covers the supplied specimens and the interactions below, not every possible application composition of each API.

## Defects corrected

- Switch: the animated property differed from the property moving the thumb. The thumb now uses an interruptible 160ms transform transition with the shared easing. Keyboard and reduced-motion changes are immediate. Default and compact sizes, both disabled states, and label interaction are included in the specimen.
- Radio: overlapping Tailwind 3 transform and Tailwind 4 translate utilities offset the dot. The dot is explicitly centred, with a clear unchecked border. Keyboard selection and disabled options are retained.
- Scoped compatibility: overlapping transforms are neutralized inside this library; native `hidden` attributes take precedence over flex/grid utility classes. This fixes Questionnaire showing inactive steps.
- Explicit light appearance: OS dark styles no longer partially recolour this white canvas. Examples use navy tokens, including selected badges, checkboxes, and bookmarks.
- Primitive composition: `data-royal-control` preserves a control's theme identity when a trigger or FormControl changes its `data-slot`. Public slots and primitive props are retained.
- Actual component coverage: the Combobox specimen now exercises the reusable Base UI component, including chips; Form exercises the exported Form/FormField components rather than a separate Field composition.
- Accessibility: named combobox triggers, clear/remove actions, form descriptions and validation messages, and slider thumb labels. Progress forwards its value and maximum to the primitive; custom maxima and indeterminate states are demonstrated.
- Visual consistency: visible skeletons and keyboard caps, white field surfaces, consistent small headings, aligned toast action buttons, and a light tooltip arrow.
- Mobile: button groups wrap, carousel arrows remain inside the specimen, and Collapsible/Context Menu examples shrink to their container.

## Browser checks

- All 67 default specimens: inspected rendered appearance and checked for horizontal overflow and visible text below 12px.
- At 320px: checked all 67 entries for page/specimen overflow. Corrected and rechecked the four exceptions above.
- At 375px, 414px, and both sides of the tablet breakpoint (767px/769px): rechecked switch, radio, carousel, collapsible, tabs, and questionnaire containment.
- Switch: default 32×20px, 16px thumb, 12px travel; compact 26×16px, 12px thumb, 10px travel. Confirmed pointer transition property/timing and immediate keyboard changes. Radio dot centre error was below 0.01px in both axes.
- Dialog: centred, contained in viewport, Escape dismissal and focus return. Select, dropdown menu, tooltip, and combobox popup interactions retain their primitive behavior and portal scope.
- Combobox: filtering, single selection, multi-selection, and chip display. Escape on a closed combobox retains the upstream Base UI behavior of clearing the selection.
- Form: required-field validation, valid local submission, linked descriptions/errors, and 34px control sizing through FormControl.
- Questionnaire: inactive steps hidden; choice and Next advance the step counter.
- Slider: arrow key changes value. Resizable: arrow key changes the panel split. Carousel and Collapsible respond to their buttons; OTP accepts typed digits.
- Toast: action produces the example undo confirmation. Skeletons use the visible rule token and pulse animation.

## Automated checks

Run `npm run typecheck`, scoped ESLint, `npm run design:ui:check`, and `npm run design:check`. Generated CSS remains scoped to the catalog and its internal Tailwind properties/keyframes are namespaced.
