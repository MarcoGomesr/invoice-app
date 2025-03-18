import CreateInvoice from "@/app/(pages)/dashboard/invoices/create/CreateInvoice"
import { prisma } from "@/lib/db"
import { requireUser } from "@/lib/hooks"

async function getUserData(userId: string) {
  return await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      firstName: true,
      lastName: true,
      address: true,
      email: true
    }
  })
}

export default async function InvoiceCreatePage() {
  const session = await requireUser()
  const data = await getUserData(session?.user?.id as string)
  return (
    <CreateInvoice
      firstName={data?.firstName as string}
      lastName={data?.lastName as string}
      address={data?.address as string}
      email={data?.email as string}
    />
  )
}
