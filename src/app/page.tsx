import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { LogoCloud } from "@/components/logo-cloud"
import { Features } from "@/components/features"
import { HowItWorks } from "@/components/how-it-works"
import { Pricing } from "@/components/pricing"
import { Testimonials } from "@/components/testimonials"
import { FAQ } from "@/components/faq"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"

export default function HugoLandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <LogoCloud />
      <Features />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  )
}
