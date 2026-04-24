"use client"

import { useMemo, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const faqSections = [
  {
    label: "BJJ Basics",
    description: "Core questions about Brazilian Jiu-Jitsu and who it is for.",
    items: [
      {
        question: "What is BJJ?",
        answer:
          "Brazilian Jiu-Jitsu is a martial art built around technique, leverage, and control rather than size alone. Students learn how to escape pressure, control positions, and apply submissions such as joint locks and chokeholds. It is widely respected as one of the most effective self-defense systems in the world. For younger kids, training is age-appropriate, and children ages 4-8 do not practice submissions.",
      },
      {
        question: "Do I need to be in shape to do Brazilian Jiu-Jitsu?",
        answer:
          "No. You do not need to be in shape before you start. BJJ is one of the best ways to build fitness, confidence, and consistency over time. Everyone begins at a different point, and progress comes from showing up and learning step by step. If you would like to watch a class before starting, that can be arranged through info@dnabjj.com.",
      },
      {
        question: "Is it good for kids?",
        answer:
          "Yes. BJJ is excellent for kids because it builds confidence, discipline, coordination, and resilience. It gives children an individual skill set while still letting them grow inside a team environment. It can also be especially helpful for kids who have experienced bullying, and classes include conversations around anti-bullying and handling difficult situations with confidence.",
      },
      {
        question: "Is it a good sport for adults?",
        answer:
          "Yes. BJJ gives adults a practical way to learn self-defense, improve fitness, and work toward meaningful long-term goals. It is also a great environment for building friendships, staying mentally engaged, and being part of a strong community.",
      },
    ],
  },
  {
    label: "Getting Started",
    description: "What to expect when you begin training and how memberships work.",
    items: [
      {
        question: "How do I get started?",
        answer:
          "The first step is to complete the waiver. After that, fill out the contact form for the program you are interested in, since intro sessions are not booked by phone. Once that is submitted, an intro day is scheduled, usually Sunday for kids and Monday for adults. After the intro class, you can train as much as you like for 7 days so you can decide whether BJJ is the right fit. A uniform is provided for the trial, and you can purchase your own afterward.",
      },
      {
        question: "What will I learn in an intro class?",
        answer:
          "Intro classes cover the essentials so new students feel comfortable right away. You will learn how to tie your belt, how to secure your uniform properly, how class structure works, and how to move through the warm-up. That includes forward rolls, backward rolls, safe standing mechanics, and other BJJ-specific movement patterns. It is also a great time to ask questions about training, class times, or anything else on your mind.",
      },
      {
        question: "Is one day a week good enough?",
        answer:
          "Absolutely. The best training schedule is the one you can sustain consistently over time. BJJ is something many people stay with for life, so it is better to build a routine that fits your life now than to force an unrealistic pace. Plans are available for 1, 2, 3, and unlimited sessions depending on your goals.",
      },
      {
        question: "Will you renew my subscription automatically?",
        answer:
          "Yes. Memberships paid through PayPal renew automatically. If you need to pause your membership, you can email info@dnabjj.com and the team will help you with the next steps.",
      },
      {
        question: "Can I cancel my membership?",
        answer:
          "Yes. Things change, and the team understands that. A 30-day notice is requested so everything can be stopped properly. If you expect that you may need to pause from time to time, the PayPal option is usually the simplest way to manage that flexibility.",
      },
      {
        question: "Do you offer any discounts?",
        answer:
          "Yes. A family rate is available for 3 or more members paying through the same account, as long as they are from the same household.",
      },
      {
        question: "Can I request a refund?",
        answer:
          "Refunds are not offered. For that reason, monthly plans are usually the best place to start so you only commit to what you know you can use.",
      },
    ],
  },
  {
    label: "About DNA",
    description: "Practical details about the gym, classes, and competition culture.",
    items: [
      {
        question: "Do you have showers?",
        answer: "Yes. There is one shower available for students who need to get ready after training, including anyone heading straight to work.",
      },
      {
        question: "Does your team do competitions?",
        answer:
          "Yes. In-house events are usually the first step because they help students build confidence in a familiar environment. From there, anyone interested can gradually explore larger competitions. Everyone has different goals, so the best place to start is by deciding what you or your child want from training.",
      },
      {
        question: "When are classes?",
        answer:
          "Class times are listed on the website and should always be treated as the most up-to-date schedule. Open mats may also be added around holidays or special dates.",
      },
    ],
  },
]

export function FAQ() {
  const [activeSection, setActiveSection] = useState(0)

  const section = faqSections[activeSection]

  const visibleSections = useMemo(() => {
    return faqSections.map((item, index) => ({
      ...item,
      isActive: index === activeSection,
    }))
  }, [activeSection])

  const showSection = (index: number) => {
    setActiveSection(index)
  }

  const showPreviousSection = () => {
    const nextIndex = (activeSection - 1 + faqSections.length) % faqSections.length
    showSection(nextIndex)
  }

  const showNextSection = () => {
    const nextIndex = (activeSection + 1) % faqSections.length
    showSection(nextIndex)
  }

  return (
    <section className="bg-background py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div id="faq" className="mb-16 scroll-mt-[4.5rem] text-center">
          <div className="mb-4 inline-flex items-center">
            <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">FAQ</span>
          </div>
          <h2 className="mb-6 text-3xl font-bold text-foreground text-balance md:text-5xl">Got questions?</h2>
          <p className="text-lg text-muted-foreground">
            We&apos;ve got answers. If you can&apos;t find what you&apos;re looking for, reach out to the team.
          </p>
        </div>

        <div className="relative mb-10">
          <button
            type="button"
            onClick={showPreviousSection}
            aria-label="Show previous FAQ section"
            className="absolute left-0 top-1/2 z-10 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border/80 bg-card/90 text-foreground shadow-lg shadow-black/20 transition hover:border-primary/50 hover:text-primary lg:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="grid gap-4 md:grid-cols-3">
            {visibleSections.map((item, index) => (
              <button
                key={item.label}
                type="button"
                onClick={() => showSection(index)}
                className={`rounded-2xl border p-5 text-left transition-all duration-300 ${
                  item.isActive
                    ? "border-primary/60 bg-card shadow-xl shadow-primary/10"
                    : "border-border bg-card/70 hover:border-primary/30"
                }`}
              >
                <div className="mb-2 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  {item.label}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={showNextSection}
            aria-label="Show next FAQ section"
            className="absolute right-0 top-1/2 z-10 hidden h-11 w-11 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border/80 bg-card/90 text-foreground shadow-lg shadow-black/20 transition hover:border-primary/50 hover:text-primary lg:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">
          <button
            type="button"
            onClick={showPreviousSection}
            aria-label="Show previous FAQ section"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition hover:border-primary/50 hover:text-primary"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={showNextSection}
            aria-label="Show next FAQ section"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition hover:border-primary/50 hover:text-primary"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-8 text-center">
          <h3 className="mb-3 text-2xl font-semibold text-foreground">{section.label}</h3>
          <p className="text-muted-foreground">{section.description}</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
          {section.items.map((faq) => (
            <div key={faq.question} className="overflow-hidden rounded-xl border border-border bg-card">
              <div className="p-5">
                <span className="pr-4 text-base font-medium text-foreground md:text-lg">{faq.question}</span>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
