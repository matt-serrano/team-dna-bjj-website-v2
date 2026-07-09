import * as React from "react"
import { cn } from "@/lib/utils"

type BadgeProps = React.ComponentProps<"span"> & {
  tone?: "default" | "success" | "warning" | "muted"
}

const tones = {
  default: "bg-primary/15 text-primary",
  success: "bg-emerald-400/15 text-emerald-300",
  warning: "bg-amber-400/15 text-amber-300",
  muted: "bg-muted text-muted-foreground",
}

export function Badge({ className, tone = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium", tones[tone], className)}
      {...props}
    />
  )
}
