import DashboardLinks from "./DashboardLinks"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { signOut } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { requireUser } from "@/lib/hooks"
import { HandCoins, Menu, User2 } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { ReactNode } from "react"
import { Toaster } from "sonner"

async function getUser(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      firstName: true,
      lastName: true,
      address: true
    }
  })

  if (!data?.firstName || !data.lastName || !data.address) {
    redirect("/onboarding")
  }
}

export default async function DashboardLayout({
  children
}: {
  children: ReactNode
}) {
  const session = await requireUser()
  const data = await getUser(session.user?.id as string)

  return (
    <>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <aside className="bg-muted/40 hidden border-r md:block">
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
        </aside>

        <div className="flex flex-col">
          <header className="bg-muted/40 flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <nav className="mt-10 grid gap-2">
                  <DashboardLinks />
                </nav>
              </SheetContent>
            </Sheet>

            <div className="ml-auto flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="rounded-full"
                    variant="outline"
                    size="icon"
                  >
                    <User2 />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/invoices">Invoices</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild>
                    <form
                      className="w-full"
                      action={async () => {
                        "use server"
                        await signOut()
                      }}
                    >
                      <button className="w-full text-left">Log out</button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
          </main>
        </div>
      </div>
      <Toaster richColors closeButton theme="light" />
    </>
  )
}
