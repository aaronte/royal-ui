import * as icons from "lucide-react"
import type { LucideProps, LucideIcon } from "lucide-react"
export function IconPlaceholder({ lucide, tabler, hugeicons, phosphor, remixicon, ...props }: LucideProps & { lucide?: string; tabler?: string; hugeicons?: string; phosphor?: string; remixicon?: string }) {
 const name = (lucide ?? "circle").split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join("")
 const Icon = (icons as unknown as Record<string, LucideIcon>)[name] ?? icons.Circle
 void tabler; void hugeicons; void phosphor; void remixicon
 return <Icon {...props} />
}
