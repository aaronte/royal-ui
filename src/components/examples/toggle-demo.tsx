import { BookmarkIcon } from "lucide-react"

import { Toggle } from "@/components/ui/toggle"

export default function ToggleDemo() {
  return (
    <Toggle
      aria-label="Toggle bookmark"
      size="sm"
      variant="outline"
      className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-accent0 data-[state=on]:*:[svg]:stroke-accent0"
    >
      <BookmarkIcon />
      Bookmark
    </Toggle>
  )
}
