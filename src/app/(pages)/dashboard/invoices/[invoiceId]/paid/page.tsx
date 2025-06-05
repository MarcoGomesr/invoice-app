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
import PaidGif from "@public/paid-gif.gif"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { PaidAction } from "./paidAction"

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

export default async function PaidPage({ params }: { params: Params }) {
  const { invoiceId } = await params
  const session = await requireUser()
  await Authorize(invoiceId, session.user?.id as string)

  return (
    <div className="flex flex-1 items-center justify-center">
      <Card className="w-[500]">
        <CardHeader>
          <CardTitle>Mark as Paid?</CardTitle>
          <CardDescription>
            Are you sure you want to mark this invoice as paid?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Image alt="paid day" className="rounded-lg" src={PaidGif} />
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <Link
            className={buttonVariants({ variant: "outline" })}
            href="/dashboard/invoices"
          >
            Cancel
          </Link>
          <form
            action={async () => {
              "use server"
              await PaidAction(invoiceId)
            }}
          >
            <SubmitButton text="Mark as Paid" />
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}
