const programs = [
  {
    title: "Fundamentals",
    description: "Structured classes for newer students building strong mechanics, timing, and confidence.",
  },
  {
    title: "All Levels",
    description: "Mixed sessions that balance technical depth, positional work, and live rounds.",
  },
  {
    title: "Competition",
    description: "Higher-intensity training for athletes preparing for sharper pace and performance.",
  },
];

export function Programs() {
  return (
    <section id="programs" className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
            <span className="text-sm uppercase tracking-wider text-muted-foreground font-medium">Programs</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Training paths for every stage
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            A clean section placeholder for the academy program lineup, designed to slot into the imported homepage
            without changing its visual language.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {programs.map((program) => (
            <article
              key={program.title}
              className="p-8 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <span className="text-primary font-semibold text-sm uppercase tracking-wide">DNA</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{program.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{program.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
