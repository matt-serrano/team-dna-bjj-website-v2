const posts = [
  {
    title: "What the blog section can hold",
    excerpt: "Long-form academy updates, competition notes, event recaps, and technical writing.",
  },
  {
    title: "Why it belongs on the homepage",
    excerpt: "It helps the site feel active, current, and more complete without changing the core design.",
  },
  {
    title: "Ready for future content",
    excerpt: "This placeholder keeps the base design structured so real posts can drop in later.",
  },
];

export function Blog() {
  return (
    <section id="blog" className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
            <span className="text-sm uppercase tracking-wider text-muted-foreground font-medium">Blog</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Space for stories, insights, and updates
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {posts.map((post) => (
            <article key={post.title} className="rounded-2xl border border-border bg-card p-8">
              <div className="h-40 rounded-xl bg-accent mb-6" />
              <h3 className="text-xl font-semibold text-foreground mb-3">{post.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
