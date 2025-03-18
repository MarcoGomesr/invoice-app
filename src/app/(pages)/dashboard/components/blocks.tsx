import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { prisma } from "@/lib/db"
import { requireUser } from "@/lib/hooks"
import { formatCurrency } from "@/lib/utils"
import { InvoiceStatus } from "@prisma/client"
import { Activity, CreditCard, DollarSign, Users } from "lucide-react"

async function getData(userId: string) {
  const [data, openInvoices, paidinvoices] = await Promise.all([
    prisma.invoice.findMany({
      where: {
        userId: userId
      },
      select: {
        total: true
      }
    }),
    prisma.invoice.findMany({
      where: {
        userId: userId,
        status: InvoiceStatus.PENDING
      },
      select: {
        id: true
      }
    }),

    prisma.invoice.findMany({
      where: {
        userId: userId,
        status: InvoiceStatus.PAID
      },
      select: {
        id: true
      }
    })
  ])

  return {
    data,
    openInvoices,
    paidinvoices
  }
}

export default async function Blocks() {
  const session = await requireUser()
  const { data, openInvoices, paidinvoices } = await getData(
    session.user?.id as string
  )
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="text-muted-foreground size-4" />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold">
            {formatCurrency({
              amount: data.reduce((acc, invoice) => acc + invoice.total, 0),
              currency: "USD"
            })}
          </h2>
          <p className="text-muted-foreground text-xs">Based on total volume</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">
            Total Invoices Issued
          </CardTitle>
          <Users className="text-muted-foreground size-4" />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold">+{data.length}</h2>
          <p className="text-muted-foreground text-xs">Total Invoices Isued!</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">Paid Invoices</CardTitle>
          <CreditCard className="text-muted-foreground size-4" />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold">+{paidinvoices.length}</h2>
          <p className="text-muted-foreground text-xs">
            Total Invoices which have been paid!
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">
            Pending Invoices
          </CardTitle>
          <Activity className="text-muted-foreground size-4" />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold">+{openInvoices.length}</h2>
          <p className="text-muted-foreground text-xs">
            Invoices which are currently pending!
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
