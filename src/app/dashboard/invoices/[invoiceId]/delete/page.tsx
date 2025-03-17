import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { prisma } from "@/lib/db"
import { requireUser } from "@/lib/hooks"
import Image from "next/image"
import { redirect } from "next/navigation"
import WarningGif from "@public/warning-gif.gif"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { SubmitButtton } from "@/components/SubmitButtton"
import { DeleteInvoice } from "./deleteAction"

async function Authorize(invoiceId: string, userId: string) {
  const data = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
      userId: userId
    }
  })

  if (!data) {
    return redirect("/dashboard/invoices")
  }
}

type Params = Promise<{ invoiceId: string }>

export default async function DeleteInvoicePage({
  params
}: {
  params: Params
}) {
  const { invoiceId } = await params
  const session = requireUser()
  await Authorize(invoiceId, session.user?.id as string)
  return (
    <div className="flex flex-1 items-center justify-center">
      <Card className="w-[500]">
        <CardHeader>
          <CardTitle>Delete Invoice</CardTitle>
          <CardDescription>
            Are you sure that you want to delete this invoice?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Image src={WarningGif} alt="Warning gif" className="rounded-lg" />
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <Link
            href="/dashboard/invoices"
            className={buttonVariants({ variant: "secondary" })}
          >
            Cancel
          </Link>
          <form
            action={async () => {
              "use server"
              await DeleteInvoice(invoiceId)
            }}
          >
            <SubmitButtton variant="destructive" text="Delete Invoice" />
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}
