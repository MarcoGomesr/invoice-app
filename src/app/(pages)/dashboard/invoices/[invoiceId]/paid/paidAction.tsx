import { prisma } from "@/lib/db"
import { requireUser } from "@/lib/hooks"
import { redirect } from "next/navigation"

export async function PaidAction(invoiceId: string) {
  const session = await requireUser()

  await prisma.invoice.update({
    where: {
      userId: session.user?.id,
      id: invoiceId
    },
    data: {
      status: "PAID"
    }
  })

  return redirect("/dashboard/invoices")
}
