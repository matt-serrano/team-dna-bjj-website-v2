"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "What pets does Hugo cover?",
    answer:
      "Hugo currently covers dogs and cats of all breeds and ages. We're working on expanding to other pets soon! Whether you have a playful puppy, a senior cat, or anything in between, we've got you covered.",
  },
  {
    question: "Is there a waiting period?",
    answer:
      "Your Hugo membership activates immediately for our telehealth services and app features. For in-clinic preventive care services, there's a standard 14-day waiting period to ensure we can coordinate with local vet partners.",
  },
  {
    question: "Can I use my own vet?",
    answer:
      "Hugo works with a network of 500+ partner vets across Australia, but we also offer reimbursement options for visits to non-partner vets. We believe you should have the freedom to choose your pet's healthcare provider.",
  },
  {
    question: "What's not covered?",
    answer:
      "Hugo focuses on preventive and wellness care. Pre-existing conditions, emergency surgeries, and specialist treatments aren't covered under our membership. However, our 24/7 vet team can help you navigate these situations and find the best care options.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes! Hugo is flexible. You can cancel your membership anytime with no penalty. If you cancel mid-cycle, we'll prorate your remaining balance. We're confident you'll love Hugo, but we never want you to feel locked in.",
  },
  {
    question: "How does the 24/7 vet chat work?",
    answer:
      "Simply open the Hugo app and tap 'Chat with a Vet'. You'll be connected with a licensed Australian veterinarian within minutes via text or video call. Perfect for quick questions, symptom checks, or peace of mind at 2am!",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-20 md:py-32 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
            <span className="text-sm uppercase tracking-wider text-muted-foreground font-medium">FAQ</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">Got questions?</h2>
          <p className="text-lg text-muted-foreground">
            We&apos;ve got answers. If you can&apos;t find what you&apos;re looking for, chat with our team.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-border rounded-xl overflow-hidden bg-card">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="text-lg font-medium text-foreground pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-200 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <p className="px-6 pb-6 text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
