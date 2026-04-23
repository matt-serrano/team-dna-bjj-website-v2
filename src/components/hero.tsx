"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronLeft, ChevronRight, Play } from "lucide-react"

const slideshowImages = [
  {
    src: "/happy-dog-and-cat-with-owner-using-mobile-app-pet-.jpg",
    alt: "Placeholder slide one",
  },
  {
    src: "/happy-family-with-cat-portrait.jpg",
    alt: "Placeholder slide two",
  },
  {
    src: "/happy-pet-owner-.jpg",
    alt: "Placeholder slide three",
  },
  {
    src: "/woman-with-cavoodle-puppy-portrait.jpg",
    alt: "Placeholder slide four",
  },
  {
    src: "/woman-with-golden-retriever-dog-portrait.jpg",
    alt: "Placeholder slide five",
  },
  {
    src: "/young-man-with-tabby-cat-portrait.jpg",
    alt: "Placeholder slide six",
  },
]

export function Hero() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [autoplayPausedUntil, setAutoplayPausedUntil] = useState<number | null>(null)

  const pauseAutoplay = () => {
    setAutoplayPausedUntil(Date.now() + 15000)
  }

  const showPreviousSlide = () => {
    pauseAutoplay()
    setActiveSlide((current) => (current - 1 + slideshowImages.length) % slideshowImages.length)
  }

  const showNextSlide = () => {
    pauseAutoplay()
    setActiveSlide((current) => (current + 1) % slideshowImages.length)
  }

  const showSlide = (index: number) => {
    pauseAutoplay()
    setActiveSlide(index)
  }

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (autoplayPausedUntil !== null && Date.now() < autoplayPausedUntil) {
        return
      }

      setActiveSlide((current) => (current + 1) % slideshowImages.length)
    }, 3500)

    return () => window.clearInterval(interval)
  }, [autoplayPausedUntil])

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-transparent">
      <div className="relative z-20 mx-auto max-w-7xl px-4 pt-20 pb-24 sm:px-6 md:pt-28 md:pb-32 lg:px-8 2xl:max-w-[1500px] 2xl:px-12">
        <div className="grid min-h-[calc(100vh-11rem)] gap-14 lg:grid-cols-[1fr_0.92fr] lg:items-start 2xl:min-h-[calc(100vh-9.5rem)] 2xl:grid-cols-[1.02fr_0.98fr] 2xl:gap-[4.5rem]">
          <div className="max-w-4xl lg:-mt-4 2xl:max-w-[52rem] 2xl:pt-4">
            <h1 className="mb-6 max-w-5xl text-4xl font-bold leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-[4.5rem] 2xl:max-w-[58rem] 2xl:text-[5.6rem]">
              <span className="block whitespace-nowrap">Train smarter.</span>
              <span className="block whitespace-nowrap">Build confidence.</span>
              <span className="block whitespace-nowrap text-primary">Feel stronger.</span>
            </h1>

            <p className="mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty md:text-xl 2xl:max-w-3xl 2xl:text-[1.35rem]">
              Brazilian Jiu-Jitsu for beginners and experienced athletes — get stronger, learn real self-defense, and
              join a community that pushes you forward.
            </p>

            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Button
                size="lg"
                className="rounded-full bg-primary px-8 py-6 text-base font-medium text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 2xl:px-10 2xl:text-[1.05rem]"
              >
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-border bg-transparent px-8 py-6 text-base font-medium 2xl:px-10 2xl:text-[1.05rem]"
              >
                <Play className="mr-2 h-5 w-5 fill-primary text-primary" />
                View Programs
              </Button>
            </div>

            <div className="mt-12 flex items-center gap-6 2xl:mt-14">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card/80 p-2 shadow-lg shadow-black/20">
                <Image
                  src="/images/google-logo.png"
                  alt="Google"
                  width={30}
                  height={30}
                  className="h-[1.875rem] w-[1.875rem] object-contain"
                />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="h-4 w-4 fill-amber-400 text-amber-400" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground 2xl:text-[0.95rem]">
                  <span className="font-semibold text-foreground">4.9/5</span> from 500+ reviews
                </p>
              </div>
            </div>
          </div>

          <div className="relative lg:-mt-2 2xl:pt-3">
            <div className="pointer-events-none absolute inset-0 z-10 rounded-2xl bg-gradient-to-t from-background/30 via-transparent to-transparent md:rounded-3xl" />
            <div className="relative h-[420px] overflow-hidden rounded-2xl border border-border bg-accent shadow-2xl shadow-primary/10 sm:h-[500px] md:rounded-3xl 2xl:h-[600px]">
              {slideshowImages.map((image, index) => (
                <div
                  key={image.src}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    index === activeSlide ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1280px) 42vw, (min-width: 1024px) 40vw, 100vw"
                    priority={index === 0}
                  />
                </div>
              ))}

            </div>

            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={showPreviousSlide}
                aria-label="Previous slide"
                className="flex h-6 w-6 items-center justify-center rounded-full text-white/75 transition hover:bg-white/10 hover:text-white"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {slideshowImages.map((image, index) => (
                <button
                  key={`${image.src}-indicator`}
                  type="button"
                  onClick={() => showSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-2.5 rounded-full transition-all ${
                    index === activeSlide ? "w-8 bg-primary" : "w-2.5 bg-border hover:bg-muted-foreground/50"
                  }`}
                />
              ))}

              <button
                type="button"
                onClick={showNextSlide}
                aria-label="Next slide"
                className="flex h-6 w-6 items-center justify-center rounded-full text-white/75 transition hover:bg-white/10 hover:text-white"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
