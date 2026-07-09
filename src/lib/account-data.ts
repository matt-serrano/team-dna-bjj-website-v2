export type MemberStatus = "Active" | "Trial" | "Paused"

export type Member = {
  id: string
  name: string
  email: string
  plan: string
  status: MemberStatus
  nextClass: string
}

export const currentMember: Member = {
  id: "DNA-1042",
  name: "Alex Morgan",
  email: "alex@example.com",
  plan: "Unlimited",
  status: "Active",
  nextClass: "Adult Gi · Today, 6:30 PM",
}

export const members: Member[] = [
  currentMember,
  {
    id: "DNA-1038",
    name: "Jamie Chen",
    email: "jamie@example.com",
    plan: "Kids Unlimited",
    status: "Active",
    nextClass: "Kids BJJ · Tue, 5:00 PM",
  },
  {
    id: "DNA-1031",
    name: "Taylor Singh",
    email: "taylor@example.com",
    plan: "7-day trial",
    status: "Trial",
    nextClass: "Intro Class · Sun, 11:00 AM",
  },
  {
    id: "DNA-1024",
    name: "Jordan Lee",
    email: "jordan@example.com",
    plan: "2 classes/week",
    status: "Paused",
    nextClass: "No class booked",
  },
]

export const upcomingClasses = [
  { name: "Adult Gi", coach: "Coach Mike", date: "Today", time: "6:30 PM", spots: 8 },
  { name: "No-Gi Fundamentals", coach: "Coach Sarah", date: "Tomorrow", time: "7:00 PM", spots: 5 },
  { name: "Open Mat", coach: "Team session", date: "Saturday", time: "11:00 AM", spots: 14 },
]
