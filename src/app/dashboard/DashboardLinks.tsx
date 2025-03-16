"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { HomeIcon, User2 } from "lucide-react"

export const dashboardLinks = [
  {
    id: 0,
    name: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon
  },
  {
    id: 1,
    name: "Invoices",
    href: "/dashboard/invoices",
    icon: User2
  }
]
export default function DashboardLinks() {
  const pathname = usePathname()
  return (
    <>
      {dashboardLinks.map((link) => (
        <Link
          className={cn(
            pathname === link.href
              ? "text-primary bg-primary/10"
              : "text-muted-foreground hover:text-foreground",
            "hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
          )}
          href={link.href}
          key={link.id}
        >
          <link.icon className="size-4" />
          {link.name}
        </Link>
      ))}
    </>
  )
}
