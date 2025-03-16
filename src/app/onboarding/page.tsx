"use client"

import { useActionState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SubmitButtton } from "@/components/SubmitButtton"
import { onboardUser } from "@/lib/actions"
import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import { onboardingShema } from "@/lib/zodSchemas"

export default function Onboarding() {
  const [lastResult, action] = useActionState(onboardUser, undefined)
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: onboardingShema
      })
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput"
  })

  return (
    <div className="flex min-h-screen w-screen items-center justify-center">
      <Card className="mx-auto w-[380px]">
        <CardHeader className="text-xl">
          <CardTitle>You are almost finished!</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            className="grid gap-4"
            action={action}
            id={form.id}
            onSubmit={form.onSubmit}
            noValidate
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id={fields.firstName.key}
                  name={fields.firstName.name}
                  defaultValue={fields.firstName.initialValue}
                  placeholder="john"
                />
                <p className="text-red-500">{fields.firstName.errors}</p>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id={fields.lastName.key}
                  name={fields.lastName.name}
                  defaultValue={fields.lastName.initialValue}
                  placeholder="Doe"
                />
                <p className="text-red-500">{fields.lastName.errors}</p>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input
                name={fields.address.name}
                key={fields.address.key}
                defaultValue={fields.address.initialValue}
                placeholder="Chad Street"
              />
              <p className="text-red-500">{fields.address.errors}</p>
            </div>

            <SubmitButtton text="Finish onboarding" />
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
