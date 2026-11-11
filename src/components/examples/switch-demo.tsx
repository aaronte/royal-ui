import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function SwitchDemo() {
  return <div className="grid gap-5">
    <div className="flex items-center gap-3"><Switch id="airplane-mode" /><Label htmlFor="airplane-mode">Airplane mode</Label></div>
    <div className="flex items-center gap-3"><Switch id="compact-switch" size="sm" /><Label htmlFor="compact-switch">Compact</Label></div>
    <div className="flex items-center gap-3"><Switch id="disabled-switch" disabled /><Label htmlFor="disabled-switch">Disabled</Label></div>
    <div className="flex items-center gap-3"><Switch id="disabled-on-switch" disabled defaultChecked /><Label htmlFor="disabled-on-switch">Disabled, on</Label></div>
  </div>
}
