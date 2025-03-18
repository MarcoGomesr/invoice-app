import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { prisma } from "@/lib/db"
import { requireUser } from "@/lib/hooks"
import { formatCurrency } from "@/lib/utils"

async function getDate(userId: string) {
  return await prisma.invoice.findMany({
    where: {
      userId: userId
    },
    select: {
      id: true,
      clientName: true,
      clientEmail: true,
      total: true,
      currency: true
    },
    orderBy: {
      createdAt: "desc"
    },
    take: 7
  })
}

export default async function RecenteInvoices() {
  const session = await requireUser()
  const data = await getDate(session.user?.id as string)
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Invoices</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        {data.map((item) => (
          <div className="flex items-center gap-4" key={item.id}>
            <Avatar className="hidden size-9 sm:flex">
              <AvatarFallback>{item.clientName.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <p className="text-sm leading-none font-medium">
                {item.clientName}
              </p>
              <p className="text-muted-foreground text-sm">
                {item.clientEmail}
              </p>
            </div>
            <div className="ml-auto font-medium">
              +
              {formatCurrency({
                amount: item.total,
                currency: item.currency as any
              })}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
