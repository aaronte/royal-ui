"use client"
import dynamic from "next/dynamic"
import { useState, useRef, useEffect } from "react"
import { DesignPortalContext } from "@/lib/portal"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"
const components = [
  { id: "accordion", label: "Accordion", Demo: dynamic(() => import("@/components/examples/accordion-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "alert", label: "Alert", Demo: dynamic(() => import("@/components/examples/alert-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "alert-dialog", label: "Alert Dialog", Demo: dynamic(() => import("@/components/examples/alert-dialog-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "aspect-ratio", label: "Aspect Ratio", Demo: dynamic(() => import("@/components/examples/aspect-ratio-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "attachment", label: "Attachment", Demo: dynamic(() => import("@/components/examples/attachment-example"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "avatar", label: "Avatar", Demo: dynamic(() => import("@/components/examples/avatar-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "badge", label: "Badge", Demo: dynamic(() => import("@/components/examples/badge-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "breadcrumb", label: "Breadcrumb", Demo: dynamic(() => import("@/components/examples/breadcrumb-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "bubble", label: "Bubble", Demo: dynamic(() => import("@/components/examples/bubble-example"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "button", label: "Button", Demo: dynamic(() => import("@/components/examples/button-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "button-group", label: "Button Group", Demo: dynamic(() => import("@/components/examples/button-group-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "calendar", label: "Calendar", Demo: dynamic(() => import("@/components/examples/calendar-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "card", label: "Card", Demo: dynamic(() => import("@/components/examples/card-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "carousel", label: "Carousel", Demo: dynamic(() => import("@/components/examples/carousel-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "chart", label: "Chart", Demo: dynamic(() => import("@/components/examples/chart-bar-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "checkbox", label: "Checkbox", Demo: dynamic(() => import("@/components/examples/checkbox-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "code-block", label: "Code Block", Demo: dynamic(() => import("@/components/examples/code-block-example"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "collapsible", label: "Collapsible", Demo: dynamic(() => import("@/components/examples/collapsible-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "combobox", label: "Combobox", Demo: dynamic(() => import("@/components/examples/combobox-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "command", label: "Command", Demo: dynamic(() => import("@/components/examples/command-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "context-menu", label: "Context Menu", Demo: dynamic(() => import("@/components/examples/context-menu-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "data-table", label: "Data Table", Demo: dynamic(() => import("@/components/examples/data-table-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "date-picker", label: "Date Picker", Demo: dynamic(() => import("@/components/examples/date-picker-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "dialog", label: "Dialog", Demo: dynamic(() => import("@/components/examples/dialog-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "direction", label: "Direction", Demo: dynamic(() => import("@/components/examples/direction-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "drawer", label: "Drawer", Demo: dynamic(() => import("@/components/examples/drawer-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "dropdown-menu", label: "Dropdown Menu", Demo: dynamic(() => import("@/components/examples/dropdown-menu-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "empty", label: "Empty", Demo: dynamic(() => import("@/components/examples/empty-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "field", label: "Field", Demo: dynamic(() => import("@/components/examples/field-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "form", label: "Form", Demo: dynamic(() => import("@/components/examples/form-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "hover-card", label: "Hover Card", Demo: dynamic(() => import("@/components/examples/hover-card-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "input", label: "Input", Demo: dynamic(() => import("@/components/examples/input-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "input-group", label: "Input Group", Demo: dynamic(() => import("@/components/examples/input-group-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "input-otp", label: "Input OTP", Demo: dynamic(() => import("@/components/examples/input-otp-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "item", label: "Item", Demo: dynamic(() => import("@/components/examples/item-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "kbd", label: "Keyboard", Demo: dynamic(() => import("@/components/examples/kbd-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "label", label: "Label", Demo: dynamic(() => import("@/components/examples/label-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "marker", label: "Marker", Demo: dynamic(() => import("@/components/examples/marker-example"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "menubar", label: "Menubar", Demo: dynamic(() => import("@/components/examples/menubar-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "message", label: "Message", Demo: dynamic(() => import("@/components/examples/message-example"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "message-scroller", label: "Message Scroller", Demo: dynamic(() => import("@/components/examples/message-scroller-example"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "native-select", label: "Native Select", Demo: dynamic(() => import("@/components/examples/native-select-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "navigation-menu", label: "Navigation Menu", Demo: dynamic(() => import("@/components/examples/navigation-menu-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "pagination", label: "Pagination", Demo: dynamic(() => import("@/components/examples/pagination-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "popover", label: "Popover", Demo: dynamic(() => import("@/components/examples/popover-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "progress", label: "Progress", Demo: dynamic(() => import("@/components/examples/progress-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "questionnaire", label: "Questionnaire", Demo: dynamic(() => import("@/components/examples/questionnaire-example"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "radio-group", label: "Radio Group", Demo: dynamic(() => import("@/components/examples/radio-group-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "resizable", label: "Resizable", Demo: dynamic(() => import("@/components/examples/resizable-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "scroll-area", label: "Scroll Area", Demo: dynamic(() => import("@/components/examples/scroll-area-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "select", label: "Select", Demo: dynamic(() => import("@/components/examples/select-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "separator", label: "Separator", Demo: dynamic(() => import("@/components/examples/separator-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "sheet", label: "Sheet", Demo: dynamic(() => import("@/components/examples/sheet-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "sidebar", label: "Sidebar", Demo: dynamic(() => import("@/components/examples/sidebar-example"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "skeleton", label: "Skeleton", Demo: dynamic(() => import("@/components/examples/skeleton-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "slider", label: "Slider", Demo: dynamic(() => import("@/components/examples/slider-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "sonner", label: "Toast (Sonner)", Demo: dynamic(() => import("@/components/examples/sonner-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "spinner", label: "Spinner", Demo: dynamic(() => import("@/components/examples/spinner-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "switch", label: "Switch", Demo: dynamic(() => import("@/components/examples/switch-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "table", label: "Table", Demo: dynamic(() => import("@/components/examples/table-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "tabs", label: "Tabs", Demo: dynamic(() => import("@/components/examples/tabs-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "textarea", label: "Textarea", Demo: dynamic(() => import("@/components/examples/textarea-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "toggle", label: "Toggle", Demo: dynamic(() => import("@/components/examples/toggle-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "toggle-group", label: "Toggle Group", Demo: dynamic(() => import("@/components/examples/toggle-group-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "tooltip", label: "Tooltip", Demo: dynamic(() => import("@/components/examples/tooltip-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "trace", label: "Trace", Demo: dynamic(() => import("@/components/examples/trace-example"), { loading: () => <p role="status">Loading specimen…</p> }) },
  { id: "typography", label: "Typography", Demo: dynamic(() => import("@/components/examples/typography-demo"), { loading: () => <p role="status">Loading specimen…</p> }) },
]
export default function ComponentCatalog({ theme = "light" }: { theme?: "light" | "dark" }) {
 const [query, setQuery] = useState("")
 const [selected, setSelected] = useState("accordion")
 const [container, setContainer] = useState<HTMLDivElement | null>(null)
 const preview = useRef<HTMLDivElement>(null)
 const active = components.find(item => item.id === selected)!
 const matches = components.filter(item => item.label.toLowerCase().includes(query.toLowerCase()))
 useEffect(() => { if (preview.current) preview.current.scrollTop = 0 }, [selected])
 return <div className="ds-library" ref={setContainer}>
  <DesignPortalContext.Provider value={container}><TooltipProvider>
   <div className="ds-catalog-layout">
    <aside className="ds-catalog-index" aria-label="Component catalog">
     <label htmlFor="component-search">Find a component <span>{components.length}</span></label>
     <input id="component-search" type="search" placeholder="Search components" value={query} onChange={e => setQuery(e.target.value)} />
     <div className="ds-catalog-list">{matches.map(item => <button key={item.id} aria-pressed={selected === item.id} onClick={() => setSelected(item.id)}>{item.label}</button>)}{!matches.length && <p>No components match “{query}”.</p>}</div>
    </aside>
    <div className="ds-catalog-main">
     <div className="ds-catalog-heading"><h3>{active.label}</h3><a href={`https://ui.shadcn.com/docs/components/${active.id}`} target="_blank" rel="noreferrer">Documentation ↗</a></div>
     <div className="ds-catalog-preview" ref={preview} aria-label={`${active.label} specimen`} key={selected}><active.Demo /></div>
     <p className="ds-catalog-note">Interactive specimen · Sample content</p>
    </div>
   </div>
   <Toaster theme={theme} position="bottom-right" />
  </TooltipProvider></DesignPortalContext.Provider>
 </div>
}
