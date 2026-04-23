import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Programs } from "@/components/programs"
import { Schedule } from "@/components/schedule"
import { Membership } from "@/components/membership"
import { Coaches } from "@/components/coaches"
import { Blog } from "@/components/blog"
import { FAQ } from "@/components/faq"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"

export default function HugoLandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Programs />
      <Schedule />
      <Membership />
      <Coaches />
      <Blog />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  )
}
