import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section className="py-20 md:py-32 bg-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6 text-balance">
          Ready to give your pet the care they deserve?
        </h2>
        <p className="text-lg text-primary-foreground/80 mb-10 max-w-2xl mx-auto text-pretty">
          Join 1,000+ Australian pet parents who&apos;ve made the switch to proactive, stress-free pet healthcare. Your
          furry friend will thank you.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-full px-8 py-6 text-base font-medium"
          >
            Start your free trial
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full px-8 py-6 text-base font-medium border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
          >
            Talk to our team
          </Button>
        </div>
        <p className="text-sm text-primary-foreground/60 mt-6">
          14-day free trial · No credit card required · Cancel anytime
        </p>
      </div>
    </section>
  )
}
