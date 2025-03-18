import { prisma } from "@/lib/db"
import { requireUser } from "@/lib/hooks"
import { notFound } from "next/navigation"
import EditInvoice from "./EditInvoice"

async function getData(invoiceId: string, userId: string) {
  const data = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
      userId: userId
    }
  })

  if (!data) {
    return notFound()
  }

  return data
}

type editInvoicePageProps = Promise<{ invoiceId: string }>

export default async function EditInvoicePage({
  params
}: {
  params: editInvoicePageProps
}) {
  const { invoiceId } = await params
  const session = await requireUser()
  const data = await getData(invoiceId, session.user?.id as string)
  return <EditInvoice data={data} />
}
