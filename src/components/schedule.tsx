"use client"

import { useEffect, useMemo, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ScheduleEventSource {
  id: string
  title: string
  start: string
  end: string
  program?: string
  location?: string
}

interface ScheduleEvent {
  id: string
  title: string
  start: Date
  end: Date
  program?: string
  location?: string
}

const mockScheduleEvents: ScheduleEventSource[] = [
  {
    id: "kids-1",
    title: "Age 5-8 Program",
    start: "2026-04-24T17:00:00-04:00",
    end: "2026-04-24T17:45:00-04:00",
    program: "Kids",
  },
  {
    id: "kids-2",
    title: "Age 8-13 Program",
    start: "2026-04-24T18:00:00-04:00",
    end: "2026-04-24T19:00:00-04:00",
    program: "Kids",
  },
  {
    id: "adult-1",
    title: "Adult & Teen Program",
    start: "2026-04-24T19:15:00-04:00",
    end: "2026-04-24T20:30:00-04:00",
    program: "Adults",
  },
  {
    id: "women-1",
    title: "Women",
    start: "2026-04-26T10:00:00-04:00",
    end: "2026-04-26T11:00:00-04:00",
    program: "Women",
  },
  {
    id: "open-mat-1",
    title: "Open Mat",
    start: "2026-04-26T11:15:00-04:00",
    end: "2026-04-26T12:30:00-04:00",
    program: "All Levels",
  },
  {
    id: "adult-2",
    title: "Adult & Teen Program",
    start: "2026-04-28T18:30:00-04:00",
    end: "2026-04-28T19:45:00-04:00",
    program: "Adults",
  },
  {
    id: "kids-3",
    title: "Age 8-13 Program",
    start: "2026-04-29T18:00:00-04:00",
    end: "2026-04-29T19:00:00-04:00",
    program: "Kids",
  },
]

const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

function normalizeScheduleEvents(events: ScheduleEventSource[]): ScheduleEvent[] {
  return events
    .map((event) => ({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end),
    }))
    .sort((a, b) => a.start.getTime() - b.start.getTime())
}

function toDateKey(date: Date) {
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, "0")
  const day = `${date.getDate()}`.padStart(2, "0")
  return `${year}-${month}-${day}`
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function addMonths(date: Date, months: number) {
  return new Date(date.getFullYear(), date.getMonth() + months, 1)
}

function formatMonthLabel(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(date)
}

function formatDayLabel(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(date)
}

function formatTimeRange(start: Date, end: Date) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  })
  return `${formatter.format(start)} - ${formatter.format(end)}`
}

export function Schedule() {
  const [today, setToday] = useState<Date | null>(null)
  const [now, setNow] = useState<Date | null>(null)
  const [viewMonth, setViewMonth] = useState<Date | null>(null)
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null)

  useEffect(() => {
    const now = new Date()
    setToday(now)
    setNow(now)
    setViewMonth(startOfMonth(now))
    setSelectedDateKey(toDateKey(now))

    const interval = window.setInterval(() => {
      setNow(new Date())
    }, 60000)

    return () => window.clearInterval(interval)
  }, [])

  const events = useMemo(() => normalizeScheduleEvents(mockScheduleEvents), [])

  const eventsByDate = useMemo(() => {
    return events.reduce<Record<string, ScheduleEvent[]>>((accumulator, event) => {
      const key = toDateKey(event.start)
      accumulator[key] = accumulator[key] ? [...accumulator[key], event] : [event]
      return accumulator
    }, {})
  }, [events])

  const calendarDays = useMemo(() => {
    if (!viewMonth) return []

    const firstDayOfMonth = startOfMonth(viewMonth)
    const lastDayOfMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0)
    const startDay = new Date(firstDayOfMonth)
    startDay.setDate(firstDayOfMonth.getDate() - firstDayOfMonth.getDay())
    const endDay = new Date(lastDayOfMonth)
    endDay.setDate(lastDayOfMonth.getDate() + (6 - lastDayOfMonth.getDay()))

    const totalDays =
      Math.floor((endDay.getTime() - startDay.getTime()) / (1000 * 60 * 60 * 24)) + 1

    return Array.from({ length: totalDays }, (_, index) => {
      const date = new Date(startDay)
      date.setDate(startDay.getDate() + index)

      return {
        date,
        key: toDateKey(date),
        isCurrentMonth: date.getMonth() === viewMonth.getMonth(),
        events: eventsByDate[toDateKey(date)] ?? [],
      }
    })
  }, [eventsByDate, viewMonth])

  const selectedDate = useMemo(() => {
    if (!selectedDateKey) return null
    const matchingDay = calendarDays.find((day) => day.key === selectedDateKey)
    return matchingDay?.date ?? null
  }, [calendarDays, selectedDateKey])

  const selectedEvents = selectedDateKey ? eventsByDate[selectedDateKey] ?? [] : []
  const todayKey = today ? toDateKey(today) : null

  const getEventStatus = (event: ScheduleEvent) => {
    if (!now) {
      return "upcoming"
    }

    if (now >= event.start && now <= event.end) {
      return "live"
    }

    if (now > event.end) {
      return "past"
    }

    return "upcoming"
  }

  if (!viewMonth || !selectedDateKey || !today) {
    return (
      <section className="bg-accent py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div id="schedule" className="mx-auto mb-16 max-w-3xl scroll-mt-[4.5rem] text-center">
            <div className="mb-4 inline-flex items-center">
              <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Schedule</span>
            </div>
            <h2 className="mb-6 text-3xl font-bold text-balance text-foreground md:text-5xl">
              Monthly calendar and daily schedule
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="h-[32rem] rounded-3xl border border-border bg-card/80" />
            <div className="h-[32rem] rounded-3xl border border-border bg-card/80" />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-accent py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div id="schedule" className="mx-auto mb-16 max-w-3xl scroll-mt-[4.5rem] text-center">
          <div className="mb-4 inline-flex items-center">
            <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Schedule</span>
          </div>
          <h2 className="mb-6 text-3xl font-bold text-balance text-foreground md:text-5xl">
            Training schedule built around real life
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            See the month at a glance, then check the selected day for class times across kids, teens, adults, and
            women&apos;s training.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-3xl border border-border bg-card p-5 shadow-xl lg:p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">Current Month</p>
                <h3 className="text-2xl font-semibold text-foreground">{formatMonthLabel(viewMonth)}</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setViewMonth((current) => (current ? addMonths(current, -1) : current))}
                  aria-label="Previous month"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition hover:border-primary/50 hover:text-primary"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMonth((current) => (current ? addMonths(current, 1) : current))}
                  aria-label="Next month"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition hover:border-primary/50 hover:text-primary"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="mb-3 grid grid-cols-7 gap-2">
              {weekdayLabels.map((label) => (
                <div
                  key={label}
                  className="flex h-10 items-center justify-center text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground"
                >
                  {label}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((day) => {
                const isSelected = day.key === selectedDateKey
                const isToday = day.key === todayKey

                return (
                  <button
                    key={day.key}
                    type="button"
                    onClick={() => setSelectedDateKey(day.key)}
                    className={`min-h-[5.5rem] rounded-2xl border p-2 text-left transition ${
                      isSelected
                        ? "border-primary bg-primary/10 shadow-lg shadow-primary/10"
                        : day.isCurrentMonth
                          ? "border-border bg-card/95 shadow-sm shadow-black/10 hover:border-primary/40 hover:bg-card"
                          : "border-border/40 bg-transparent opacity-55"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span
                        className={`text-sm font-medium ${
                          isToday ? "text-primary" : day.isCurrentMonth ? "text-foreground" : "text-muted-foreground/70"
                        }`}
                      >
                        {day.date.getDate()}
                      </span>
                      {day.events.length > 0 ? (
                        <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary">
                          {day.events.length}
                        </span>
                      ) : null}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-1">
                      {day.events.slice(0, 3).map((event) => (
                        <span key={event.id} className="h-1.5 w-1.5 rounded-full bg-primary/70" />
                      ))}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-5 shadow-xl lg:p-6">
            <div className="mb-6 border-b border-border pb-5">
              <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
                {selectedDateKey === todayKey ? "Today" : "Selected Day"}
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-foreground">
                {selectedDate ? formatDayLabel(selectedDate) : "Day schedule"}
              </h3>
            </div>

            {selectedEvents.length > 0 ? (
              <div className="space-y-4">
                {selectedEvents.map((event) => {
                  const status = getEventStatus(event)

                  return (
                    <article
                      key={event.id}
                      className={`rounded-2xl border p-5 transition ${
                        status === "live"
                          ? "border-primary bg-foreground text-background shadow-xl shadow-primary/15"
                          : status === "past"
                            ? "border-border/60 bg-accent/15 opacity-45"
                            : "border-border bg-accent/35"
                      }`}
                    >
                    <div className="mb-3 flex items-center justify-between gap-4">
                      <p
                        className={`text-sm font-medium uppercase tracking-[0.18em] ${
                          status === "live" ? "text-background/70" : "text-primary"
                        }`}
                      >
                        {event.program ?? "Class"}
                      </p>
                      <p className={`text-sm ${status === "live" ? "text-background/70" : "text-muted-foreground"}`}>
                        {formatTimeRange(event.start, event.end)}
                      </p>
                    </div>
                    <h4 className={`text-lg font-semibold ${status === "live" ? "text-background" : "text-foreground"}`}>
                      {event.title}
                    </h4>
                    {event.location ? (
                      <p className={`mt-2 text-sm ${status === "live" ? "text-background/70" : "text-muted-foreground"}`}>
                        {event.location}
                      </p>
                    ) : null}
                  </article>
                  )
                })}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-border p-6 text-center">
                <p className="text-lg font-medium text-foreground">No events scheduled for this day.</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Once a Google Calendar feed is connected, this panel can display the live daily agenda automatically.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
