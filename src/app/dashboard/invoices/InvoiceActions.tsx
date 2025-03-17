"use client"

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import {
  CheckCircle,
  DownloadIcon,
  Mail,
  MoreHorizontal,
  PencilIcon,
  Trash
} from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

type InvoiceActionsProps = {
  id: string
}

export function InvoiceActions({ id }: InvoiceActionsProps) {
  const habdleSendReminder = () => {
    toast.promise(
      fetch(`/api/email/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      }),
      {
        loading: "Sending reminder...",
        success: "Reminder email sent successfully",
        error: "Failed to send reminder email"
      }
    )
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="secondary">
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/invoices/${id}`}>
            <PencilIcon className="mr-2 size-4" />
            Edit Invoice
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href={`/api/invoice/${id}`} target="_blank">
            <DownloadIcon className="mr-2 size-4" />
            Download Invoice
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={habdleSendReminder}>
          <Mail className="mr-2 size-4" />
          Reminder Email
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href={`/dashboard/invoices/${id}/delete`}>
            <Trash className="mr-2 size-4" />
            Delete Invoice
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="">
            <CheckCircle className="mr-2 size-4" />
            Mark as Paid
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
