import { signOut } from "@/lib/auth"
import { requireUser } from "@/lib/hooks"
import Blocks from "./components/blocks"
import InvoiceGraph from "@/app/(pages)/dashboard/components/InvoiceGraph"
import RecenteInvoices from "./components/RecentInvoices"
import { prisma } from "@/lib/db"
import { EmptyState } from "./components/EmptyState"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

async function getData(userId: string) {
  return await prisma.invoice.findMany({
    where: {
      userId: userId
    },
    select: {
      id: true
    }
  })
}
export default async function DashboardPage() {
  const session = await requireUser()
  const data = await getData(session.user?.id as string)

  return (
    <>
      {data.length < 1 ? (
        <EmptyState
          title="No invoices found"
          description="Create an invoice to see it"
          buttonText="Create invoice"
          href="/dashboard/invoices/create"
        />
      ) : (
        <Suspense fallback={<Skeleton className="h-full w-full flex-1" />}>
          <Blocks />
          <div className="grid gap-4 md:gap-8 lg:grid-cols-3">
            <InvoiceGraph />
            <RecenteInvoices />
          </div>
        </Suspense>
      )}
    </>
  )
}
