import { prisma } from "@/lib/db"
import { requireUser } from "@/lib/hooks"
import { emailClient } from "@/lib/mailtrap"
import { NextResponse } from "next/server"

export async function POST(
  requrest: Request,
  {
    params
  }: {
    params: Promise<{ invoiceId: string }>
  }
) {
  try {
    const session = await requireUser()

    const { invoiceId } = await params

    const invoiceData = await prisma.invoice.findUnique({
      where: {
        id: invoiceId,
        userId: session.user?.id
      }
    })

    if (!invoiceData) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 })
    }

    const sender = {
      email: "hello@demomailtrap.co",
      name: "Mailtrap Test"
    }

    emailClient.send({
      from: sender,
      to: [{ email: "marcogomesr@gmail.com" }],
      template_uuid: "2cb8eeb5-2548-452a-9f3f-a053fb8b0082",
      template_variables: {
        first_name: invoiceData.clientName,
        company_info_name: "Invoice",
        company_info_address: "Calle serrano",
        company_info_city: "Alicante/alacant",
        company_info_zip_code: "03003",
        company_info_country: "Spain"
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: "Frailed to send Email reminder" },
      { status: 500 }
    )
  }
}
