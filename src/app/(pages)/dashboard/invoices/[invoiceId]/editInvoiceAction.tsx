"use server"
import { prisma } from "@/lib/db"
import { requireUser } from "@/lib/hooks"
import { emailClient } from "@/lib/mailtrap"
import { formatCurrency } from "@/lib/utils"
import { invoiceSchema } from "@/lib/zodSchemas"
import { parseWithZod } from "@conform-to/zod"
import { redirect } from "next/navigation"

export async function editInvoiceAction(prevState: any, formData: FormData) {
  const session = await requireUser()

  const submission = parseWithZod(formData, {
    schema: invoiceSchema
  })

  if (submission.status !== "success") {
    return submission.reply()
  }

  const data = await prisma.invoice.update({
    where: {
      id: formData.get("id") as string,
      userId: session.user?.id
    },

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
      invoiceItemRate: submission.value.invoiceItemRate
    }
  })

  const sender = {
    email: "hello@demomailtrap.co",
    name: "Mailtrap Test"
  }

  emailClient.send({
    from: sender,
    to: [{ email: "marcogomesr@gmail.com" }],
    template_uuid: "9e15a020-a197-4475-b713-d7ee14e8e72d",
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
          : `https://invoice-emfvoxz6c-marcogomesrs-projects.vercel.app/api/invoice/${data.id}`
    }
  })

  return redirect("/dashboard/invoices")
}
