"use server"

import { prisma } from "@/lib/db"
import { requireUser } from "@/lib/hooks"
import { redirect } from "next/navigation"

export async function DeleteInvoice(invoiceId: string) {
  const session = await requireUser()

  const data = await prisma.invoice.delete({
    where: {
      userId: session.user?.id,
      id: invoiceId
    }
  })

  return redirect("/dashboard/invoices")
}
