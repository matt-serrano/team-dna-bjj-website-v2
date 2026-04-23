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
import { DNABackground } from "@/components/dna-background"

export default function HugoLandingPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0">
          <DNABackground
            speed={0.3}
            colorPrimary="#ffffff"
            colorAccent="#22A7B3"
            opacity={1}
            density={44}
            scale={1.34}
          />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,167,179,0.16),transparent_32%),linear-gradient(180deg,rgba(4,5,6,0.14),rgba(4,5,6,0.34))]" />
      </div>

      <div className="relative z-10">
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
    </div>
  )
}
