import type { Metadata } from "next"
import { Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { upcomingClasses } from "@/lib/account-data"

export const metadata: Metadata = { title: "Schedule" }

export default function AdminSchedulePage() {
  return (
    <div className="space-y-7">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Schedule</h1>
          <p className="mt-2 text-muted-foreground">Manage classes, coaches, and capacity.</p>
        </div>
        <Button disabled>Create class</Button>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {upcomingClasses.map((item) => (
          <Card key={`${item.name}-${item.date}`}>
            <CardHeader>
              <CardDescription>{item.date}</CardDescription>
              <CardTitle>{item.name}</CardTitle>
              <CardDescription>{item.coach}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between gap-4">
              <div className="flex gap-5 text-sm text-muted-foreground">
                <span className="flex items-center gap-2"><Clock className="size-4" />{item.time}</span>
                <span className="flex items-center gap-2"><Users className="size-4" />{item.spots} open</span>
              </div>
              <Button disabled size="sm" variant="outline">Edit</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
