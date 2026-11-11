"use client"
import { Combobox, ComboboxInput, ComboboxContent, ComboboxList, ComboboxItem, ComboboxEmpty, ComboboxChips, ComboboxChip, ComboboxChipsInput, ComboboxValue, useComboboxAnchor } from "../ui/combobox"
const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]
export default function ComboboxDemo() {
 const anchor = useComboboxAnchor()
 return <div className="ds-example-stack">
  <section className="ds-example"><h4>Single selection</h4><Combobox items={frameworks}><ComboboxInput aria-label="Framework" placeholder="Select framework…" showClear /><ComboboxContent><ComboboxEmpty>No frameworks found.</ComboboxEmpty><ComboboxList>{(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}</ComboboxList></ComboboxContent></Combobox></section>
  <section className="ds-example"><h4>Multiple selection</h4><Combobox items={frameworks} multiple defaultValue={["Next.js"]}><ComboboxChips ref={anchor}><ComboboxValue>{(values: string[]) => values.map(value => <ComboboxChip key={value}>{value}</ComboboxChip>)}</ComboboxValue><ComboboxChipsInput aria-label="Additional frameworks" placeholder="Add a framework…" /></ComboboxChips><ComboboxContent anchor={anchor}><ComboboxEmpty>No frameworks found.</ComboboxEmpty><ComboboxList>{(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}</ComboboxList></ComboboxContent></Combobox></section>
 </div>
}
