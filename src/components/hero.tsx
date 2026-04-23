"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

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

  const avatars = [
    "https://randomuser.me/api/portraits/women/44.jpg",
    "https://randomuser.me/api/portraits/men/32.jpg",
    "https://randomuser.me/api/portraits/women/68.jpg",
    "https://randomuser.me/api/portraits/men/75.jpg",
    "https://randomuser.me/api/portraits/women/90.jpg",
  ]

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slideshowImages.length)
    }, 3500)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <section id="home" className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_0.92fr] lg:items-center">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-accent rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-sm text-foreground font-medium">Beginner-friendly • All levels • Supportive community</span>
              <ArrowRight className="w-4 h-4 text-primary" />
            </div>

            <h1 className="max-w-5xl text-4xl font-bold text-foreground leading-[1.05] tracking-tight mb-6 md:text-6xl lg:text-[4.5rem]">
              <span className="block whitespace-nowrap">Train smarter.</span>
              <span className="block whitespace-nowrap">Build confidence.</span>
              <span className="block whitespace-nowrap text-primary">Feel stronger.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed text-pretty">
              Brazilian Jiu-Jitsu for beginners and experienced athletes — get stronger, learn real self-defense, and
              join a community that pushes you forward.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-base font-medium shadow-lg shadow-primary/25"
              >
                Start Your Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 py-6 text-base font-medium border-border bg-transparent"
              >
                <Play className="w-5 h-5 mr-2 fill-primary text-primary" />
                View Programs
              </Button>
            </div>

            <div className="flex items-center gap-6 mt-12">
              <div className="flex -space-x-3">
                {avatars.map((src, index) => (
                  <div key={index} className="w-10 h-10 rounded-full border-2 border-card bg-accent overflow-hidden">
                    <img
                      src={src || "/placeholder.svg"}
                      alt={`Pet owner ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="w-4 h-4 fill-amber-400 text-amber-400" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">4.9/5</span> from 500+ reviews
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent z-10 pointer-events-none rounded-2xl md:rounded-3xl" />
            <div className="relative h-[420px] sm:h-[500px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 border border-border bg-accent">
              {slideshowImages.map((image, index) => (
                <div
                  key={image.src}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    index === activeSlide ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image src={image.src} alt={image.alt} fill className="object-cover" sizes="(min-width: 1024px) 40vw, 100vw" priority={index === 0} />
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-center gap-2">
              {slideshowImages.map((image, index) => (
                <button
                  key={`${image.src}-indicator`}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-2.5 rounded-full transition-all ${
                    index === activeSlide ? "w-8 bg-primary" : "w-2.5 bg-border hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
