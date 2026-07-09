import type { Metadata } from "next"
import { Clock, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { upcomingClasses } from "@/lib/account-data"

export const metadata: Metadata = { title: "Classes" }

export default function ClassesPage() {
  return (
    <div className="space-y-7">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Classes</h1>
        <p className="mt-2 text-muted-foreground">A preview of the member booking experience.</p>
      </div>
      <div className="space-y-3">
        {upcomingClasses.map((item) => (
          <Card key={`${item.name}-${item.date}`}>
            <CardHeader className="flex-row items-start justify-between gap-4">
              <div>
                <Badge>{item.date}</Badge>
                <CardTitle className="mt-3">{item.name}</CardTitle>
                <CardDescription>{item.coach}</CardDescription>
              </div>
              <Button disabled title="Booking will be connected to the scheduling backend">Reserve</Button>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-5 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><Clock className="size-4" />{item.time}</span>
              <span className="flex items-center gap-2"><MapPin className="size-4" />Team DNA mats</span>
              <span>{item.spots} spots available</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
