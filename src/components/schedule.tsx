const scheduleRows = [
  { day: "Monday", focus: "Fundamentals", time: "6:00 PM" },
  { day: "Tuesday", focus: "No-Gi / Competition", time: "7:00 PM" },
  { day: "Thursday", focus: "All Levels", time: "6:30 PM" },
  { day: "Saturday", focus: "Open Mat", time: "11:00 AM" },
];

export function Schedule() {
  return (
    <section id="schedule" className="py-20 md:py-32 bg-accent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center mb-4">
            <span className="text-sm uppercase tracking-wider text-muted-foreground font-medium">Schedule</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Weekly training rhythm
          </h2>
        </div>

        <div className="bg-card rounded-3xl overflow-hidden shadow-xl border border-border">
          <div className="grid grid-cols-3 px-6 py-4 border-b border-border text-xs uppercase tracking-wider text-muted-foreground font-medium">
            <span>Day</span>
            <span>Focus</span>
            <span>Time</span>
          </div>
          {scheduleRows.map((row) => (
            <div key={row.day} className="grid grid-cols-3 px-6 py-5 border-b border-border last:border-b-0">
              <span className="font-medium text-foreground">{row.day}</span>
              <span className="text-muted-foreground">{row.focus}</span>
              <span className="text-muted-foreground">{row.time}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
