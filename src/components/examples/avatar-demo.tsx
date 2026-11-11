import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export default function AvatarDemo() {
  return (
    <div className="flex flex-row flex-wrap items-center gap-12">
      <Avatar>
        <AvatarImage
          src="/design-system/avatars/sarah-chen.jpg"
          alt="Sarah Chen"
        />
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
      <Avatar className="rounded-lg">
        <AvatarImage
          src="/design-system/avatars/alex-kim.jpg"
          alt="Alex Kim"
        />
        <AvatarFallback>AK</AvatarFallback>
      </Avatar>
      <div className="flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background *:data-[slot=avatar]:grayscale">
        <Avatar>
          <AvatarImage
            src="/design-system/avatars/sarah-chen.jpg"
            alt="Sarah Chen"
          />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage
            src="/design-system/avatars/rebecca-farrah.jpg"
            alt="Rebecca Farrah"
          />
          <AvatarFallback>RF</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage
            src="/design-system/avatars/saskia-de-vries.jpg"
            alt="Saskia de Vries"
          />
          <AvatarFallback>SV</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}
