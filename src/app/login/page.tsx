import { auth, signIn } from "@/lib/auth"
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
import { redirect } from "next/navigation"

export default async function LoginPage() {
  const session = await auth()

  if (session) {
    redirect("/dashboard")
  }

  return (
    <>
      <div className="flex h-screen w-full items-center justify-center px-4">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              action={async (formData) => {
                "use server"
                await signIn("nodemailer", formData)
              }}
              className="flex flex-col gap-4"
            >
              <div className="space-y-4">
                <div className="flex flex-col gap-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    name="email"
                    type="email"
                    id="email"
                    placeholder="hello@hello.com"
                  />
                </div>
              </div>
              <SubmitButtton />
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
