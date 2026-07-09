import type { Metadata } from "next"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { currentMember } from "@/lib/account-data"

export const metadata: Metadata = { title: "Profile" }

export default function ProfilePage() {
  return (
    <div className="space-y-7">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="mt-2 text-muted-foreground">Personal and emergency contact information.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Member details</CardTitle>
          <CardDescription>This read-only scaffold will become an editable, validated form.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-5 sm:grid-cols-2">
          <Detail label="Full name" value={currentMember.name} />
          <Detail label="Email" value={currentMember.email} />
          <Detail label="Member ID" value={currentMember.id} />
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Waiver</p>
            <Badge tone="success" className="mt-2">Signed</Badge>
          </div>
          <div className="sm:col-span-2">
            <Button disabled>Edit profile</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-2 font-medium">{value}</p>
    </div>
  )
}
