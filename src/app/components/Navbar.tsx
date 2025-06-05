import { RainbowButton } from "@/components/ui/magicui/rainbow-button"
import { HandCoins } from "lucide-react"
import Link from "next/link"

export default function Navbar() {
  return (
    <div className="flex items-center justify-between py-5">
      <Link className="flex items-center gap-2" href="/">
        <HandCoins className="size-7 rounded-md bg-blue-500 p-1 text-white" />{" "}
        <p className="text-xl font-bold">
          Invoice <span className="text-blue-500">Marco</span>
        </p>
      </Link>
      <Link href="/login">
        <RainbowButton>Get Started</RainbowButton>
      </Link>
    </div>
  )
}
