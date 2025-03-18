import { prisma } from "@/lib/db"
import { Graph } from "./Graph"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { InvoiceStatus } from "@prisma/client"
import { requireUser } from "@/lib/hooks"

async function getInvoices(userId: string) {
  const rawData = await prisma.invoice.findMany({
    where: {
      status: InvoiceStatus.PAID,
      userId: userId,
      createdAt: {
        lte: new Date(),
        gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      }
    },
    select: {
      createdAt: true,
      total: true
    },
    orderBy: {
      createdAt: "asc"
    }
  })

  //Group and Aggreate data by date
  const aggregateDate = rawData.reduce(
    (acc: { [key: string]: number }, current) => {
      const date = new Date(current.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric"
      })

      acc[date] = (acc[date] || 0) + current.total
      return acc
    },
    {}
  )

  //Convert to array and format object
  const transformedData = Object.entries(aggregateDate)
    .map(([date, amount]) => ({
      date,
      amount,
      originalDate: new Date(date + ", " + new Date().getFullYear())
    }))
    .sort((a, b) => a.originalDate.getTime() - b.originalDate.getTime())
    .map(({ date, amount }) => ({
      date,
      amount
    }))

  return transformedData
}

export default async function InvoiceGraph() {
  const session = await requireUser()
  const data = await getInvoices(session.user?.id as string)
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Paid Invoices</CardTitle>
        <CardDescription>
          Invoices which have been paid in the last 30 days
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Graph data={data} />
      </CardContent>
    </Card>
  )
}
