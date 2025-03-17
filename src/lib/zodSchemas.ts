import { z } from "zod"
export const onboardingShema = z.object({
  firstName: z.string().min(3, "First name is required"),
  lastName: z.string().min(3, "Last name is required"),
  address: z.string().min(3, "Address is required")
})

export const invoiceSchema = z.object({
  invoiceName: z.string().min(1, "Invoice Name is require"),
  total: z.number().min(1, "1$ is minimum"),
  status: z.enum(["PAID", "PENDING"]).default("PENDING"),
  date: z.string().min(1, "Date is require"),

  dueDate: z.number().min(0, "Due Date is require"),

  fromName: z.string().min(1, "Your name is require"),
  fromEmail: z.string().email("Invalid email address"),
  fromAddress: z.string().min(1, "Your address is require"),

  clientName: z.string().min(1, "Client name is require"),
  clientEmail: z.string().email("Invalid email address"),
  clientAddress: z.string().min(1, "Client address is require"),

  currency: z.string().min(1, "Currency is require"),
  invoiceNumber: z.number().min(1, "Minimum invoice number of 1"),
  note: z.string().optional(),

  invoiceItemDescription: z.string().min(1, "Description is require"),
  invoiceItemQuantity: z.number().min(1, "Quantity minimum is 1"),
  invoiceItemRate: z.number().min(1, "Rate min is 1")
})
