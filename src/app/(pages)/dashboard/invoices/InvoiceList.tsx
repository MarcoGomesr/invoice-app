import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { prisma } from "@/lib/db"
import { requireUser } from "@/lib/hooks"
import { formatCurrency } from "@/lib/utils"
import { EmptyState } from "../components/EmptyState"
import { InvoiceActions } from "./InvoiceActions"

async function getData(userId: string) {
  return await prisma.invoice.findMany({
    where: {
      userId: userId
    },
    select: {
      id: true,
      clientName: true,
      total: true,
      createdAt: true,
      status: true,
      invoiceName: true,
      invoiceNumber: true,
      currency: true
    },
    orderBy: {
      createdAt: "desc"
    }
  })
}

export default async function InvoiceList() {
  const session = await requireUser()

  const data = await getData(session.user?.id as string)
  return (
    <>
      {data.length === 0 ? (
        <EmptyState
          buttonText="Create invoice"
          description="Create an invoices to get stated "
          href="/dashboard/invoices/create"
          title="No invoices found"
        />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>#{invoice.invoiceNumber}</TableCell>
                <TableCell>{invoice.clientName}</TableCell>
                <TableCell>
                  {formatCurrency({
                    amount: invoice.total,
                    currency: invoice.currency as any
                  })}
                </TableCell>
                <TableCell>
                  <Badge>{invoice.status}</Badge>
                </TableCell>
                <TableCell>
                  {new Intl.DateTimeFormat("en-US", {
                    dateStyle: "medium"
                  }).format(invoice.createdAt)}
                </TableCell>
                <TableCell className="text-right">
                  <InvoiceActions id={invoice.id} status={invoice.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  )
}
