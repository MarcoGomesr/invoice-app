"use server"
import { parseWithZod } from "@conform-to/zod"
import { requireUser } from "./hooks"
import { invoiceSchema, onboardingShema } from "./zodSchemas"
import { prisma } from "./db"
import { redirect } from "next/navigation"
import { emailClient } from "./mailtrap"
import { formatCurrency } from "./utils"

export async function onboardUser(prevState: any, formData: FormData) {
  const session = await requireUser()

  const submission = parseWithZod(formData, {
    schema: onboardingShema
  })

  if (submission.status !== "success") {
    return submission.reply()
  }

  await prisma.user.update({
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

  const sender = {
    email: "hello@demomailtrap.co",
    name: "Mailtrap Test"
  }

  emailClient.send({
    from: sender,
    to: [{ email: "marcogomesr@gmail.com" }],
    template_uuid: "75dc3355-1abc-4ba6-9eab-2a829130af0c",
    template_variables: {
      clientName: submission.value.clientName,
      invoiceNumber: submission.value.invoiceNumber,
      invoiceDueDate: new Intl.DateTimeFormat("en-US", {
        dateStyle: "long"
      }).format(new Date(submission.value.date)),
      total: formatCurrency({
        amount: submission.value.total,
        currency: submission.value.currency as any
      }),
      invoiceLink:
        process.env.NODE_ENV !== "production"
          ? `http://localhost:3000/api/invoice/${data.id}`
          : `http://localhost:3000/api/invoice/${data.id}`
    }
  })

  return redirect("/dashboard/invoices")
}
