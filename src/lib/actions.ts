"use server"
import { parseWithZod } from "@conform-to/zod"
import { requireUser } from "./hooks"
import { invoiceSchema, onboardingShema } from "./zodSchemas"
import { prisma } from "./db"
import { redirect } from "next/navigation"

export async function onboardUser(prevState: any, formData: FormData) {
  const session = await requireUser()

  const submission = parseWithZod(formData, {
    schema: onboardingShema
  })

  if (submission.status !== "success") {
    return submission.reply()
  }

  const data = await prisma.user.update({
    where: {
      id: session.user?.id
    },
    data: {
      firstName: submission.value.firstName,
      lastName: submission.value.lastName,
      address: submission.value.address
    }
  })

  return redirect("/dashboard")
}

export async function createInvoiceAction(prevState: any, FormData: FormData) {
  const session = await requireUser()

  const submission = parseWithZod(FormData, {
    schema: invoiceSchema
  })

  if (submission.status !== "success") {
    return submission.reply()
  }

  const data = await prisma.invoice.create({
    data: {
      invoiceName: submission.value.invoiceName,
      total: submission.value.total,
      status: submission.value.status,
      date: submission.value.date,
      dueDate: submission.value.dueDate,
      fromName: submission.value.fromName,
      fromEmail: submission.value.fromEmail,
      fromAddress: submission.value.fromAddress,
      clientName: submission.value.clientName,
      clientEmail: submission.value.clientEmail,
      clientAddress: submission.value.clientAddress,
      currency: submission.value.currency,
      invoiceNumber: submission.value.invoiceNumber,
      note: submission.value.note,

      invoiceItemDescription: submission.value.invoiceItemDescription,
      invoiceItemQuantity: submission.value.invoiceItemQuantity,
      invoiceItemRate: submission.value.invoiceItemRate,

      userId: session.user?.id
    }
  })

  return redirect("/dashboard/invoices")
}
