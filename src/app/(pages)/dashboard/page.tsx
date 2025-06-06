import InvoiceGraph from "@/app/(pages)/dashboard/components/InvoiceGraph"
import { Skeleton } from "@/components/ui/skeleton"
import { prisma } from "@/lib/db"
import { requireUser } from "@/lib/hooks"
import { Suspense } from "react"
import { EmptyState } from "./components/EmptyState"
import RecenteInvoices from "./components/RecentInvoices"
import Blocks from "./components/blocks"

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
          buttonText="Create invoice"
          description="Create an invoice to see it"
          href="/dashboard/invoices/create"
          title="No invoices found"
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
