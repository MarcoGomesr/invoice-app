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
import { SubmitButton } from "@/components/SubmitButton"
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
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute top-0 right-0 bottom-0 left-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]">
          <Card className="mx-auto w-[380px]">
            <CardHeader className="text-xl">
              <CardTitle>You are almost finished!</CardTitle>
              <CardDescription>
                Enter your information to create an account
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form
                noValidate
                action={action}
                className="grid gap-4"
                id={form.id}
                onSubmit={form.onSubmit}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      defaultValue={fields.firstName.initialValue}
                      id={fields.firstName.key}
                      name={fields.firstName.name}
                      placeholder="john"
                    />
                    <p className="text-red-500">{fields.firstName.errors}</p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      defaultValue={fields.lastName.initialValue}
                      id={fields.lastName.key}
                      name={fields.lastName.name}
                      placeholder="Doe"
                    />
                    <p className="text-red-500">{fields.lastName.errors}</p>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    defaultValue={fields.address.initialValue}
                    key={fields.address.key}
                    name={fields.address.name}
                    placeholder="Chad Street"
                  />
                  <p className="text-red-500">{fields.address.errors}</p>
                </div>

                <SubmitButton text="Finish onboarding" />
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
