import { Heart, Shield, Clock, Smartphone, Calendar, MessageCircle } from "lucide-react"

const features = [
  {
    icon: Heart,
    title: "Personalised Health Plans",
    description: "AI-powered care recommendations tailored to your pet's breed, age, and health history.",
  },
  {
    icon: Shield,
    title: "Preventive Care Coverage",
    description: "Annual check-ups, vaccinations, and dental care included. No surprises, just healthier pets.",
  },
  {
    icon: Clock,
    title: "24/7 Vet Access",
    description: "Connect with licensed veterinarians anytime via chat or video. Peace of mind, always.",
  },
  {
    icon: Smartphone,
    title: "Health Tracking App",
    description: "Monitor your pet's weight, activity, and wellness milestones in one beautiful dashboard.",
  },
  {
    icon: Calendar,
    title: "Smart Reminders",
    description: "Never miss a vaccination, medication, or check-up with intelligent scheduling.",
  },
  {
    icon: MessageCircle,
    title: "Expert Community",
    description: "Access exclusive content and connect with pet nutrition and behaviour specialists.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
            <span className="text-sm uppercase tracking-wider text-muted-foreground font-medium">Features</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Everything your pet needs, in one membership
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            We&apos;ve reimagined pet healthcare to be proactive, not reactive. Here&apos;s how Hugo keeps your furry
            friends thriving.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
