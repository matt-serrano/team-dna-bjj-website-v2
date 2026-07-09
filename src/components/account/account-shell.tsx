"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { CalendarDays, CreditCard, LayoutDashboard, LogOut, Settings, Users } from "lucide-react"
import { cn } from "@/lib/utils"

const memberLinks = [
  { href: "/account", label: "Overview", icon: LayoutDashboard },
  { href: "/account/classes", label: "Classes", icon: CalendarDays },
  { href: "/account/membership", label: "Membership", icon: CreditCard },
  { href: "/account/profile", label: "Profile", icon: Settings },
]

const adminLinks = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/members", label: "Members", icon: Users },
  { href: "/admin/schedule", label: "Schedule", icon: CalendarDays },
]

export function AccountShell({
  children,
  role,
}: {
  children: React.ReactNode
  role: "member" | "admin"
}) {
  const pathname = usePathname()
  const links = role === "admin" ? adminLinks : memberLinks

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-border bg-black/40 p-5 lg:block">
        <Link href="/" className="mb-10 block">
          <Image src="/images/TeamDnaLogo.png" alt="Team DNA home" width={144} height={44} className="h-11 w-auto" />
        </Link>
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {role === "admin" ? "Admin portal" : "Member portal"}
        </p>
        <nav className="space-y-1">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                  active ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <Icon className="size-4" />
                {label}
              </Link>
            )
          })}
        </nav>
        <Link href="/" className="absolute bottom-6 left-5 right-5 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">
          <LogOut className="size-4" />
          Back to website
        </Link>
      </aside>
      <div className="lg:pl-64">
        <header className="border-b border-border bg-background/90 px-5 py-4 backdrop-blur lg:px-10">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <span className="text-sm font-medium lg:hidden">{role === "admin" ? "DNA Admin" : "DNA Member"}</span>
            <nav className="flex gap-1 overflow-x-auto lg:hidden">
              {links.map(({ href, label }) => (
                <Link key={href} href={href} className="rounded-lg px-3 py-2 text-xs text-muted-foreground hover:bg-muted">
                  {label}
                </Link>
              ))}
            </nav>
            <span className="ml-auto hidden text-sm text-muted-foreground lg:block">
              {role === "admin" ? "Gym operations" : "Welcome back"}
            </span>
          </div>
        </header>
        <main className="mx-auto max-w-6xl p-5 lg:p-10">{children}</main>
      </div>
    </div>
  )
}
