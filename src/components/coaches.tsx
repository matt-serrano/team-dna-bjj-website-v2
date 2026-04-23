const coaches = [
  { name: "Head Coach", role: "Technical direction and academy standards" },
  { name: "Program Coach", role: "Foundations, structure, and student development" },
  { name: "Competition Coach", role: "Preparation, pacing, and strategy" },
];

export function Coaches() {
  return (
    <section id="about" className="py-20 md:py-32 bg-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center mb-4">
            <span className="text-sm uppercase tracking-wider text-muted-foreground font-medium">About</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            A section ready for the coaching team
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {coaches.map((coach) => (
            <article key={coach.name} className="rounded-2xl bg-card border border-border p-8 shadow-lg shadow-primary/5">
              <div className="w-20 h-20 rounded-full bg-primary/10 mb-6" />
              <h3 className="text-xl font-semibold text-foreground">{coach.name}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{coach.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
