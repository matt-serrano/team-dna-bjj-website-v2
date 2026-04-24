import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section className="bg-primary py-20 md:py-32">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="mb-6 text-3xl font-bold text-balance text-primary-foreground md:text-5xl">
          Unlock confidence, fitness, and self-defense with Brazilian Jiu-Jitsu!
        </h2>
        <p className="mx-auto mb-10 max-w-3xl text-lg text-pretty text-primary-foreground/80">
          Whether you&apos;re starting your fitness journey, learning self-defense, or looking for a supportive
          community for yourself or your child, DNA BJJ offers a welcoming place to begin.
        </p>

        <div className="mb-10 grid gap-4 text-left sm:grid-cols-3">
          <div className="rounded-2xl border border-primary-foreground/20 bg-primary-foreground/8 p-5">
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary-foreground">
              For Adults
            </h3>
            <p className="text-sm leading-relaxed text-primary-foreground/80">
              Get stronger, healthier, and more confident while building focus and relieving stress.
            </p>
          </div>
          <div className="rounded-2xl border border-primary-foreground/20 bg-primary-foreground/8 p-5">
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary-foreground">
              For Parents
            </h3>
            <p className="text-sm leading-relaxed text-primary-foreground/80">
              Give your child a place to build discipline, respect, self-esteem, and practical self-defense skills.
            </p>
          </div>
          <div className="rounded-2xl border border-primary-foreground/20 bg-primary-foreground/8 p-5">
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary-foreground">
              Why DNA BJJ
            </h3>
            <p className="text-sm leading-relaxed text-primary-foreground/80">
              Flexible class times, experienced instructors, and a safe, supportive environment for beginners.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="rounded-full bg-primary-foreground px-8 py-6 text-base font-medium text-primary hover:bg-primary-foreground/90"
          >
            Get your free trial class
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full border-primary-foreground/30 bg-transparent px-8 py-6 text-base font-medium text-primary-foreground hover:bg-primary-foreground/10"
          >
            Talk to our team
          </Button>
        </div>

        <p className="mt-6 text-sm text-primary-foreground/60">
          No experience? No problem. Start your journey toward a stronger, more confident you.
        </p>
      </div>
    </section>
  )
}
