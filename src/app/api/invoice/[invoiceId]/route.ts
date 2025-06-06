import { prisma } from "@/lib/db"
import { formatCurrency } from "@/lib/utils"
import jsPDF from "jspdf"
import { NextResponse } from "next/server"

export async function GET(
  requrest: Request,
  {
    params
  }: {
    params: Promise<{ invoiceId: string }>
  }
) {
  const { invoiceId } = await params

  const data = await prisma.invoice.findUnique({
    where: {
      id: invoiceId
    },
    select: {
      invoiceName: true,
      invoiceNumber: true,
      currency: true,
      fromName: true,
      fromEmail: true,
      fromAddress: true,
      clientName: true,
      clientEmail: true,
      clientAddress: true,
      date: true,
      dueDate: true,
      invoiceItemDescription: true,
      invoiceItemQuantity: true,
      invoiceItemRate: true,
      total: true,
      note: true
    }
  })

  if (!data) {
    return NextResponse.json({ error: "Invoice not found" }, { status: 404 })
  }

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  })

  //set font
  pdf.setFont("helvetica")

  //set header
  pdf.setFontSize(24)
  pdf.text(data.invoiceName, 20, 20)

  //From Section
  pdf.setFontSize(12)
  pdf.text("From", 20, 40)
  pdf.setFontSize(10)
  pdf.text([data.fromName, data.fromEmail, data.fromAddress], 20, 45)

  //Client Section
  pdf.setFontSize(12)
  pdf.text("Bill to", 20, 70)
  pdf.setFontSize(10)
  pdf.text([data.clientName, data.clientEmail, data.clientAddress], 20, 75)

  //Invoice details
  pdf.setFontSize(10)
  pdf.text(`Invoice Number: #${data.invoiceNumber}`, 120, 40)
  pdf.text(
    `Date: ${new Intl.DateTimeFormat("en-US", {
      dateStyle: "long"
    }).format(data.date)}`,
    120,
    45
  )
  pdf.text(`Due Date: Net ${data.dueDate}`, 120, 50)

  //Item table head
  pdf.setFontSize(10)
  pdf.setFont("helvetica", "bold")
  pdf.text("Description", 20, 100)
  pdf.text("Quantity", 100, 100)
  pdf.text("Rate", 130, 100)
  pdf.text("Total", 160, 100)

  //dra header line
  pdf.line(20, 102, 190, 102)

  //Item Details
  pdf.setFont("helvetica")
  pdf.text(data.invoiceItemDescription, 20, 110)
  pdf.text(data.invoiceItemQuantity.toString(), 100, 110)
  pdf.text(
    formatCurrency({
      amount: data.invoiceItemRate,
      currency: data.currency as any
    }),
    130,
    110
  )
  pdf.text(
    formatCurrency({
      amount: data.total,
      currency: data.currency as any
    }),
    160,
    110
  )

  pdf.line(20, 115, 190, 115)
  pdf.setFont("helvetica")
  pdf.text(`Total (${data.currency})`, 130, 130)
  pdf.text(
    formatCurrency({
      amount: data.total,
      currency: data.currency as any
    }),
    160,
    130
  )

  //aditional notes
  if (data.note) {
    pdf.setFont("helvetica", "normal")
    pdf.setFontSize(10)
    pdf.text("Note: ", 20, 150)
    pdf.text(data.note, 20, 155)
  }

  //generate pdf as buffer
  const pdfBuffer = Buffer.from(pdf.output("arraybuffer"))

  //return pdf as download
  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline"
    }
  })
}
