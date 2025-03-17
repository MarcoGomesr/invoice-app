"use client"

import { useActionState, useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { SubmitButtton } from "@/components/SubmitButtton"

import { CalendarIcon } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Prisma } from "@prisma/client"
import { invoiceSchema } from "@/lib/zodSchemas"
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
        <form id={form.id} action={action} onSubmit={form.onSubmit} noValidate>
          <input
            type="hidden"
            name={fields.date.name}
            value={selectedDate.toISOString()}
          />
          <input
            type="hidden"
            name={fields.total.name}
            value={calculateTotal}
          />
          <input type="hidden" name="id" value={data.id} />

          <div className="mb-6 flex w-fit flex-col gap-1">
            <div className="flex items-center gap-4">
              <Badge variant="secondary">Draft</Badge>
              <Input
                name={fields.invoiceName.name}
                key={fields.invoiceName.key}
                defaultValue={data.invoiceName}
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
                  placeholder="5"
                  name={fields.invoiceNumber.name}
                  key={fields.invoiceNumber.key}
                  defaultValue={data.invoiceNumber}
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
                name={fields.currency.name}
                key={fields.currency.key}
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
                  name={fields.fromName.name}
                  key={fields.fromName.key}
                  placeholder="Your Name"
                  defaultValue={data.fromName}
                />
                {fields.fromName.errors && (
                  <p className="text-sm text-red-500">
                    {fields.fromName.errors}
                  </p>
                )}
                <Input
                  name={fields.fromEmail.name}
                  key={fields.fromEmail.key}
                  placeholder="Your Email"
                  defaultValue={data.fromEmail}
                />
                {fields.fromEmail.errors && (
                  <p className="text-sm text-red-500">
                    {fields.fromEmail.errors}
                  </p>
                )}
                <Input
                  name={fields.fromAddress.name}
                  key={fields.fromAddress.key}
                  placeholder="Your Address"
                  defaultValue={data.fromAddress}
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
                  name={fields.clientName.name}
                  key={fields.clientName.key}
                  defaultValue={data.clientName}
                  placeholder="Client Name"
                />
                {fields.clientName.errors && (
                  <p className="text-sm text-red-500">
                    {fields.clientName.errors}
                  </p>
                )}
                <Input
                  name={fields.clientEmail.name}
                  key={fields.clientEmail.key}
                  defaultValue={data.clientEmail}
                  placeholder="Client Email"
                />
                {fields.clientEmail.errors && (
                  <p className="text-sm text-red-500">
                    {fields.clientEmail.errors}
                  </p>
                )}
                <Input
                  name={fields.clientAddress.name}
                  key={fields.clientAddress.key}
                  defaultValue={data.clientAddress}
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
                  <Button variant="outline" className="w-[280px] justify-start">
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
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => setSelectedDate(date || new Date())}
                    fromDate={new Date()}
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
                name={fields.dueDate.name}
                key={fields.dueDate.key}
                defaultValue={data.dueDate.toString()}
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
                  name={fields.invoiceItemDescription.name}
                  key={fields.invoiceItemDescription.key}
                  defaultValue={data.invoiceItemDescription}
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
                  name={fields.invoiceItemQuantity.name}
                  key={fields.invoiceItemQuantity.key}
                  defaultValue={fields.invoiceItemQuantity.initialValue}
                  type="number"
                  placeholder="0"
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
                  name={fields.invoiceItemRate.name}
                  key={fields.invoiceItemRate.key}
                  type="number"
                  placeholder="0"
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
                  value={formatCurrency({
                    amount: calculateTotal,
                    currency: currency as any
                  })}
                  placeholder="0"
                  disabled
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
              name={fields.note.name}
              key={fields.note.key}
              defaultValue={data.note ?? undefined}
              placeholder="Add your Notes right here..."
            />
          </div>

          <div className="mt-6 flex items-center justify-end">
            <div>
              <SubmitButtton text="Update Invoice" />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
