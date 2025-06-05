"use client"

import { SubmitButton } from "@/components/SubmitButton"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useActionState, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { formatCurrency } from "@/lib/utils"
import { invoiceSchema } from "@/lib/zodSchemas"
import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import type { Prisma } from "@prisma/client"
import { CalendarIcon } from "lucide-react"
// import { editInvoiceAction } from "@/lib/actions"
import { editInvoiceAction } from "./editInvoiceAction"

type editInvoiceProps = {
  data: Prisma.InvoiceGetPayload<{}>
}

export default function EditInvoice({ data }: editInvoiceProps) {
  const [lastResult, action] = useActionState(editInvoiceAction, undefined)

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: invoiceSchema
      })
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput"
  })

  const [selectedDate, setSelectedDate] = useState(data.date)
  const [rate, setRate] = useState(data.invoiceItemRate.toString())
  const [quantity, setQuantity] = useState(data.invoiceItemQuantity.toString())
  const [currency, setCurrency] = useState(data.currency)

  const calculateTotal = (Number(quantity) || 0) * (Number(rate) || 0)

  return (
    <Card className="mx-auto w-full max-w-4xl">
      <CardContent className="p-6">
        <form noValidate action={action} id={form.id} onSubmit={form.onSubmit}>
          <input
            name={fields.date.name}
            type="hidden"
            value={selectedDate.toISOString()}
          />
          <input
            name={fields.total.name}
            type="hidden"
            value={calculateTotal}
          />
          <input name="id" type="hidden" value={data.id} />

          <div className="mb-6 flex w-fit flex-col gap-1">
            <div className="flex items-center gap-4">
              <Badge variant="secondary">Draft</Badge>
              <Input
                defaultValue={data.invoiceName}
                key={fields.invoiceName.key}
                name={fields.invoiceName.name}
                placeholder="Test 123"
              />
            </div>
            {fields.invoiceName.errors && (
              <p className="text-sm text-red-500">
                {fields.invoiceName.errors}
              </p>
            )}
          </div>

          <div className="mb-6 grid gap-6 md:grid-cols-3">
            <div>
              <Label className="mb-2">Invoice No.</Label>
              <div className="flex">
                <span className="bg-muted flex items-center rounded-l-md border border-r-0 px-3">
                  #
                </span>
                <Input
                  className="rounded-l-none"
                  defaultValue={data.invoiceNumber}
                  key={fields.invoiceNumber.key}
                  name={fields.invoiceNumber.name}
                  placeholder="5"
                />
              </div>
              {fields.invoiceNumber.errors && (
                <p className="text-sm text-red-500">
                  {fields.invoiceNumber.errors}
                </p>
              )}
            </div>

            <div>
              <Label className="mb-2">Currency</Label>
              <Select
                defaultValue={currency}
                key={fields.currency.key}
                name={fields.currency.name}
                onValueChange={(value) => setCurrency(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">
                    USD - United States Dollar
                  </SelectItem>
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                </SelectContent>
              </Select>
              {fields.currency.errors && (
                <p className="text-sm text-red-500">{fields.currency.errors}</p>
              )}
            </div>
          </div>

          <div className="mb-6 grid gap-6 md:grid-cols-2">
            <div className="grid gap-2">
              <Label>From</Label>
              <div className="space-y-2">
                <Input
                  defaultValue={data.fromName}
                  key={fields.fromName.key}
                  name={fields.fromName.name}
                  placeholder="Your Name"
                />
                {fields.fromName.errors && (
                  <p className="text-sm text-red-500">
                    {fields.fromName.errors}
                  </p>
                )}
                <Input
                  defaultValue={data.fromEmail}
                  key={fields.fromEmail.key}
                  name={fields.fromEmail.name}
                  placeholder="Your Email"
                />
                {fields.fromEmail.errors && (
                  <p className="text-sm text-red-500">
                    {fields.fromEmail.errors}
                  </p>
                )}
                <Input
                  defaultValue={data.fromAddress}
                  key={fields.fromAddress.key}
                  name={fields.fromAddress.name}
                  placeholder="Your Address"
                />
                {fields.fromAddress.errors && (
                  <p className="text-sm text-red-500">
                    {fields.fromAddress.errors}
                  </p>
                )}
              </div>
            </div>
            <div className="grid gap-2">
              <Label>To</Label>
              <div className="space-y-2">
                <Input
                  defaultValue={data.clientName}
                  key={fields.clientName.key}
                  name={fields.clientName.name}
                  placeholder="Client Name"
                />
                {fields.clientName.errors && (
                  <p className="text-sm text-red-500">
                    {fields.clientName.errors}
                  </p>
                )}
                <Input
                  defaultValue={data.clientEmail}
                  key={fields.clientEmail.key}
                  name={fields.clientEmail.name}
                  placeholder="Client Email"
                />
                {fields.clientEmail.errors && (
                  <p className="text-sm text-red-500">
                    {fields.clientEmail.errors}
                  </p>
                )}
                <Input
                  defaultValue={data.clientAddress}
                  key={fields.clientAddress.key}
                  name={fields.clientAddress.name}
                  placeholder="Client Address"
                />
                {fields.clientAddress.errors && (
                  <p className="text-sm text-red-500">
                    {fields.clientAddress.errors}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mb-6 grid gap-6 md:grid-cols-2">
            <div className="grid gap-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button className="w-[280px] justify-start" variant="outline">
                    <CalendarIcon />
                    {selectedDate ? (
                      new Intl.DateTimeFormat("en-US", {
                        dateStyle: "long"
                      }).format(selectedDate)
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    fromDate={new Date()}
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => setSelectedDate(date || new Date())}
                  />
                </PopoverContent>
              </Popover>
              {fields.date.errors && (
                <p className="text-sm text-red-500">{fields.date.errors}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label>Invoice Due</Label>
              <Select
                defaultValue={data.dueDate.toString()}
                key={fields.dueDate.key}
                name={fields.dueDate.name}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select due date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Due on Reciept</SelectItem>
                  <SelectItem value="15">Net 15</SelectItem>
                  <SelectItem value="30">Net 30</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-red-500">{fields.dueDate.errors}</p>
            </div>
          </div>
          <div>
            <div className="mb-2 grid grid-cols-12 gap-4 font-medium">
              <p className="col-span-6">Description</p>
              <p className="col-span-2">Quantity</p>
              <p className="col-span-2">Rate</p>
              <p className="col-span-2">Amount</p>
            </div>
            <div className="mb-4 grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <Textarea
                  defaultValue={data.invoiceItemDescription}
                  key={fields.invoiceItemDescription.key}
                  name={fields.invoiceItemDescription.name}
                  placeholder="Item name & description"
                />
                {fields.invoiceItemDescription.errors && (
                  <p className="text-sm text-red-500">
                    {fields.invoiceItemDescription.errors}
                  </p>
                )}
              </div>
              <div className="col-span-2">
                <Input
                  defaultValue={fields.invoiceItemQuantity.initialValue}
                  key={fields.invoiceItemQuantity.key}
                  name={fields.invoiceItemQuantity.name}
                  placeholder="0"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                {fields.invoiceItemQuantity.errors && (
                  <p className="text-sm text-red-500">
                    {fields.invoiceItemQuantity.errors}
                  </p>
                )}
              </div>

              <div className="col-span-2">
                <Input
                  key={fields.invoiceItemRate.key}
                  name={fields.invoiceItemRate.name}
                  placeholder="0"
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                />
                {fields.invoiceItemRate.errors && (
                  <p className="text-sm text-red-500">
                    {fields.invoiceItemRate.errors}
                  </p>
                )}
              </div>

              <div className="col-span-2">
                <Input
                  disabled
                  placeholder="0"
                  value={formatCurrency({
                    amount: calculateTotal,
                    currency: currency as any
                  })}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="w-1/3">
              <div className="flex justify-between py-2">
                <span>Subtotal</span>
                <span>
                  {formatCurrency({
                    amount: calculateTotal,
                    currency: currency as any
                  })}
                </span>
              </div>
              <div className="flex justify-between border-t py-2">
                <span>Total ({currency})</span>
                <span className="font-medium underline underline-offset-2">
                  {formatCurrency({
                    amount: calculateTotal,
                    currency: currency as any
                  })}
                </span>
              </div>
            </div>
          </div>

          <div>
            <Label className="mb-2">Note</Label>
            <Textarea
              defaultValue={data.note ?? undefined}
              key={fields.note.key}
              name={fields.note.name}
              placeholder="Add your Notes right here..."
            />
          </div>

          <div className="mt-6 flex items-center justify-end">
            <div>
              <SubmitButton text="Update Invoice" />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
