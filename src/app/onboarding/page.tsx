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

export default function Onboarding() {
  return (
    <div className="flex min-h-screen w-screen items-center justify-center">
      <Card className="mx-auto w-[350px]">
        <CardHeader className="text-xl">
          <CardTitle>You are almost finished!</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" name="firstName" placeholder="john" />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" name="lastName" placeholder="Doe" />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input name="address" placeholder="Chad Street" />
            </div>

            <SubmitButtton text="Finish onboarding" />
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
