"use client"

import { useMemo, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const programs = [
  {
    title: "Age 5-8 Program",
    description:
      "An energetic beginner-friendly class focused on movement, listening, confidence, and early Jiu-Jitsu fundamentals.",
  },
  {
    title: "Age 8-13 Program",
    description:
      "A structured youth program that develops technique, discipline, self-defense, and athletic confidence in a supportive setting.",
  },
  {
    title: "Adult & Teen Program",
    description:
      "Technical training for beginners and experienced students with a balance of drilling, live rounds, and real skill development.",
  },
  {
    title: "Women",
    description:
      "A welcoming space to build confidence, learn practical self-defense, and train Brazilian Jiu-Jitsu with strong community support.",
  },
]

export function Programs() {
  const [startIndex, setStartIndex] = useState(0)

  const visiblePrograms = useMemo(() => {
    return Array.from({ length: 3 }, (_, index) => {
      const programIndex = (startIndex + index) % programs.length
      return {
        ...programs[programIndex],
        position: index,
      }
    })
  }, [startIndex])

  const showPrevious = () => {
    setStartIndex((current) => (current - 1 + programs.length) % programs.length)
  }

  const showNext = () => {
    setStartIndex((current) => (current + 1) % programs.length)
  }

  return (
    <section className="bg-background py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div id="programs" className="mx-auto mb-16 max-w-3xl scroll-mt-[4.5rem] text-center">
          <div className="mb-4 inline-flex items-center">
            <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Programs</span>
          </div>
          <h2 className="mb-6 text-3xl font-bold text-foreground text-balance md:text-5xl">
            Training paths for every stage
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Programs designed for everyone, with coaching that meets students at every stage.
          </p>
        </div>

        <div className="group relative">
          <button
            type="button"
            onClick={showPrevious}
            aria-label="Show previous program"
            className="absolute -left-4 top-1/2 z-10 hidden h-11 w-11 -translate-x-full -translate-y-1/2 items-center justify-center rounded-full border border-border/80 bg-card/90 text-foreground opacity-0 shadow-lg shadow-black/20 transition duration-300 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 hover:border-primary/50 hover:text-primary md:flex lg:-left-5"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="grid flex-1 gap-6 md:grid-cols-3 lg:gap-8">
            {visiblePrograms.map((program) => {
              const isFeatured = program.position === 1

              return (
                <article
                  key={`${program.title}-${startIndex}`}
                  className={`rounded-2xl border p-8 transition-all duration-300 ${
                    isFeatured
                      ? "border-primary/60 bg-card shadow-2xl shadow-primary/10 md:-translate-y-4 md:scale-[1.04]"
                      : "border-border bg-card/80 md:scale-[0.96] md:opacity-75"
                  }`}
                >
                  <div
                    className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl ${
                      isFeatured ? "bg-primary/15" : "bg-primary/10"
                    }`}
                  >
                    <span className="text-sm font-semibold uppercase tracking-wide text-primary">DNA</span>
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-foreground">{program.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{program.description}</p>
                </article>
              )
            })}
          </div>

          <button
            type="button"
            onClick={showNext}
            aria-label="Show next program"
            className="absolute -right-4 top-1/2 z-10 hidden h-11 w-11 translate-x-full -translate-y-1/2 items-center justify-center rounded-full border border-border/80 bg-card/90 text-foreground opacity-0 shadow-lg shadow-black/20 transition duration-300 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 hover:border-primary/50 hover:text-primary md:flex lg:-right-5"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3 md:hidden">
          <button
            type="button"
            onClick={showPrevious}
            aria-label="Show previous program"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition hover:border-primary/50 hover:text-primary"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={showNext}
            aria-label="Show next program"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition hover:border-primary/50 hover:text-primary"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
