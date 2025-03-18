import { buttonVariants } from "@/components/ui/button"
import { Ban, PlusCircle } from "lucide-react"
import Link from "next/link"

type EmptyStateProps = {
  title: string
  description: string
  buttonText: string
  href: string
}

export function EmptyState({
  title,
  description,
  buttonText,
  href
}: EmptyStateProps) {
  return (
    <div className="animate-in fade-in-50 flex h-full flex-1 flex-col items-center justify-center rounded-md border-2 border-dashed p-8 text-center">
      <div className="flex size-20 items-center justify-center rounded-full">
        <Ban className="text-primary size-10" />
      </div>
      <h1 className="mt-6 text-xl font-semibold">{title}</h1>
      <p className="text-muted-foreground mx-auto mt-2 mb-8 max-w-sm text-sm">
        {description}
      </p>
      <Link href={href} className={buttonVariants()}>
        <PlusCircle className="mr-2 size-4" /> {buttonText}
      </Link>
    </div>
  )
}
