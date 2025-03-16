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

export function InvoiceActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="secondary">
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href="">
            <PencilIcon className="mr-2 size-4" />
            Edit Invoice
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="">
            <DownloadIcon className="mr-2 size-4" />
            Download Invoice
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="">
            <Mail className="mr-2 size-4" />
            Reminder Email
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="">
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
