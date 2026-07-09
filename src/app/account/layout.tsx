import type { Metadata } from "next"
import { AccountShell } from "@/components/account/account-shell"

export const metadata: Metadata = {
  title: {
    default: "Member account",
    template: "%s | Team DNA BJJ",
  },
  robots: { index: false, follow: false },
}

export default function MemberLayout({ children }: { children: React.ReactNode }) {
  return <AccountShell role="member">{children}</AccountShell>
}
