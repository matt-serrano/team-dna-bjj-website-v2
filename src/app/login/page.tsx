import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Sign in | Team DNA BJJ",
  description: "Sign in to your Team DNA member or admin account.",
}

export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" />
          Back to website
        </Link>
        <Card className="bg-card/95">
          <CardHeader className="items-center text-center">
            <Image src="/images/TeamDnaLogo.png" alt="Team DNA" width={160} height={49} className="mb-3 h-12 w-auto" priority />
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>Account authentication will be connected in the next implementation phase.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild size="lg" className="w-full rounded-xl">
              <Link href="/account">Preview member account</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full rounded-xl">
              <Link href="/admin">Preview admin account</Link>
            </Button>
            <p className="pt-2 text-center text-xs text-muted-foreground">
              These preview links are temporary and do not provide authorization.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
