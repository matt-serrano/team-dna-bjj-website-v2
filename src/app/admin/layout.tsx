import type { Metadata } from "next"
import { AccountShell } from "@/components/account/account-shell"

export const metadata: Metadata = {
  title: {
    default: "Admin portal",
    template: "%s | Team DNA BJJ",
  },
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AccountShell role="admin">{children}</AccountShell>
}
