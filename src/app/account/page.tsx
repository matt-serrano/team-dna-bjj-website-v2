import Link from "next/link"
import { ArrowRight, CalendarDays, CheckCircle2, CreditCard } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { currentMember } from "@/lib/account-data"

export default function MemberOverviewPage() {
  return (
    <div className="space-y-8">
      <div>
        <Badge tone="success">{currentMember.status} member</Badge>
        <h1 className="mt-4 text-3xl font-bold tracking-tight">Hi, {currentMember.name.split(" ")[0]}</h1>
        <p className="mt-2 text-muted-foreground">Here&apos;s what is happening with your training.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CalendarDays className="size-5 text-primary" />
            <CardDescription>Next class</CardDescription>
            <CardTitle>{currentMember.nextClass}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CreditCard className="size-5 text-primary" />
            <CardDescription>Current plan</CardDescription>
            <CardTitle>{currentMember.plan}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CheckCircle2 className="size-5 text-primary" />
            <CardDescription>Waiver</CardDescription>
            <CardTitle>Signed and current</CardTitle>
          </CardHeader>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Keep your week moving</CardTitle>
          <CardDescription>Browse the schedule and reserve your next class.</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/account/classes" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
            View available classes <ArrowRight className="size-4" />
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
