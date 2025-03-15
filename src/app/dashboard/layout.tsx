import DashboardLinks from "@/components/DashboardLinks"
import { requireUser } from "@/lib/hooks"
import { HandCoins } from "lucide-react"
import Link from "next/link"
import { ReactNode } from "react"

export default async function DashboardLayout({
  children
}: {
  children: ReactNode
}) {
  const session = await requireUser()

  return (
    <>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="bg-muted/40 hidden border-r md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px]">
              <Link href="/" className="flex items-center gap-2">
                <HandCoins className="size-7 rounded-md bg-blue-500 p-1 text-white" />{" "}
                <p className="text-xl font-bold">
                  Invoice <span className="text-blue-500">Marco</span>
                </p>
              </Link>
            </div>
            <div className="flex-1">
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                <DashboardLinks />
              </nav>
            </div>
          </div>
        </div>
        <div className="bg-red-600">2</div>
      </div>
    </>
  )
}
