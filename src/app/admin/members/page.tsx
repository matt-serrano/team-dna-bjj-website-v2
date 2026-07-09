import type { Metadata } from "next"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { members, type MemberStatus } from "@/lib/account-data"

export const metadata: Metadata = { title: "Members" }

const toneByStatus: Record<MemberStatus, "success" | "warning" | "muted"> = {
  Active: "success",
  Trial: "warning",
  Paused: "muted",
}

export default function MembersPage() {
  return (
    <div className="space-y-7">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Members</h1>
          <p className="mt-2 text-muted-foreground">Membership and attendance directory scaffold.</p>
        </div>
        <Button disabled>Add member</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Member directory</CardTitle>
          <CardDescription>{members.length} sample records</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full min-w-2xl text-left text-sm">
            <thead className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="pb-3 font-medium">Member</th>
                <th className="pb-3 font-medium">Plan</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Next class</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {members.map((member) => (
                <tr key={member.id}>
                  <td className="py-4 pr-5">
                    <p className="font-medium">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.email}</p>
                  </td>
                  <td className="py-4 pr-5">{member.plan}</td>
                  <td className="py-4 pr-5"><Badge tone={toneByStatus[member.status]}>{member.status}</Badge></td>
                  <td className="py-4 text-muted-foreground">{member.nextClass}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
