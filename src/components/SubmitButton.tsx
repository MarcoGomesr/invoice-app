"use client"
import { Loader2 } from "lucide-react"
import { useFormStatus } from "react-dom"
import { Button } from "./ui/button"

type Props = {
  text: string
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined
}

export function SubmitButton({ text, variant }: Props) {
  const { pending } = useFormStatus()
  return (
    <>
      {pending ? (
        <Button disabled className="w-full" variant={variant}>
          <Loader2 className="mr-2 size-4 animate-spin" /> Please wait...
        </Button>
      ) : (
        <Button className="w-full" type="submit" variant={variant}>
          {text}
        </Button>
      )}
    </>
  )
}
