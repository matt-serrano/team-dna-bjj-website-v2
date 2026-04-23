const membershipTiers = [
  {
    name: "Starter",
    detail: "A base plan for consistent weekly training.",
  },
  {
    name: "Unlimited",
    detail: "Full access for students training across multiple sessions.",
  },
  {
    name: "Competition",
    detail: "Built for athletes wanting more structure and intensity.",
  },
];

export function Membership() {
  return (
    <section id="membership" className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center mb-4">
            <span className="text-sm uppercase tracking-wider text-muted-foreground font-medium">Membership</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Clean plans, simple structure
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {membershipTiers.map((tier, index) => (
            <div
              key={tier.name}
              className={`p-8 rounded-2xl border ${
                index === 1 ? "bg-primary text-primary-foreground border-primary shadow-2xl shadow-primary/20" : "bg-card border-border"
              }`}
            >
              <h3 className={`text-xl font-semibold mb-3 ${index === 1 ? "text-primary-foreground" : "text-foreground"}`}>
                {tier.name}
              </h3>
              <p className={index === 1 ? "text-primary-foreground/80" : "text-muted-foreground"}>{tier.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
