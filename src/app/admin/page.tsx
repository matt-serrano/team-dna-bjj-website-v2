import Link from "next/link"
import { ArrowRight, CalendarCheck, CreditCard, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { members, upcomingClasses } from "@/lib/account-data"

const stats = [
  { label: "Members", value: members.length.toString(), detail: "3 active or trial", icon: Users },
  { label: "Classes ahead", value: upcomingClasses.length.toString(), detail: "27 total spaces", icon: CalendarCheck },
  { label: "Billing setup", value: "Pending", detail: "Connect Stripe", icon: CreditCard },
]

export default function AdminOverviewPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium text-primary">Gym operations</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Admin overview</h1>
        <p className="mt-2 text-muted-foreground">A starting point for managing Team DNA.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map(({ label, value, detail, icon: Icon }) => (
          <Card key={label}>
            <CardHeader>
              <Icon className="size-5 text-primary" />
              <CardDescription>{label}</CardDescription>
              <CardTitle className="text-2xl">{value}</CardTitle>
              <CardDescription>{detail}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Member operations</CardTitle>
          <CardDescription>Review membership status and upcoming training.</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/admin/members" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
            Open member directory <ArrowRight className="size-4" />
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
