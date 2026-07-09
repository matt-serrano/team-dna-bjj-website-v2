import type { Metadata } from "next"
import { Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { currentMember } from "@/lib/account-data"

export const metadata: Metadata = { title: "Membership" }

export default function MembershipPage() {
  return (
    <div className="space-y-7">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Membership</h1>
        <p className="mt-2 text-muted-foreground">Plan details and billing controls will live here.</p>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <CardTitle>{currentMember.plan}</CardTitle>
            <Badge tone="success">{currentMember.status}</Badge>
          </div>
          <CardDescription>Membership ID {currentMember.id}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <ul className="space-y-3 text-sm">
            {["Unlimited weekly classes", "Open mat access", "Member event pricing"].map((benefit) => (
              <li key={benefit} className="flex items-center gap-3">
                <Check className="size-4 text-primary" /> {benefit}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3 border-t border-border pt-5">
            <Button disabled>Manage billing</Button>
            <Button disabled variant="outline">Request a pause</Button>
          </div>
          <p className="text-xs text-muted-foreground">Billing actions will be enabled when Stripe is connected.</p>
        </CardContent>
      </Card>
    </div>
  )
}
