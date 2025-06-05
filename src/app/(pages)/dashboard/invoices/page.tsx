import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import InvoiceList from "./InvoiceList"

import { PlusIcon } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

export default function InvoicesPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold">Invoices</CardTitle>
            <CardDescription>Manage your invoices</CardDescription>
          </div>
          <Link className={buttonVariants()} href="/dashboard/invoices/create">
            <PlusIcon /> Create invoice
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<Skeleton className="w-full" />}>
          <InvoiceList />
        </Suspense>
      </CardContent>
    </Card>
  )
}
