import { SubmitButton } from "@/components/SubmitButton"
import { buttonVariants } from "@/components/ui/button"
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
import WarningGif from "@public/warning-gif.gif"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
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
  const session = await requireUser()
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
          <Image alt="Warning gif" className="rounded-lg" src={WarningGif} />
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <Link
            className={buttonVariants({ variant: "secondary" })}
            href="/dashboard/invoices"
          >
            Cancel
          </Link>
          <form
            action={async () => {
              "use server"
              await DeleteInvoice(invoiceId)
            }}
          >
            <SubmitButton text="Delete Invoice" variant="destructive" />
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}
