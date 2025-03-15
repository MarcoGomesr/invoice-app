import { signOut } from "@/lib/auth"
import { requireUser } from "@/lib/hooks"

export default async function DashboardPage() {
  const session = await requireUser()

  return (
    <>
      <div>Dashboard</div>
      <form
        action={async () => {
          "use server"
          await signOut()
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </>
  )
}
