"use client"

import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-black backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="hero-reveal flex items-center">
            <Image
              src="/images/TeamDnaLogo.png"
              alt="Team DNA logo"
              width={144}
              height={44}
              className="h-11 w-auto object-contain"
              priority
            />
          </div>

          <nav className="hero-reveal hero-reveal-delay-1 hidden md:flex items-center gap-8">
            <a href="#home" className="text-sm uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors">
              HOME
            </a>
            <a href="#programs" className="text-sm uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors">
              PROGRAMS
            </a>
            <a href="#schedule" className="text-sm uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors">
              SCHEDULE
            </a>
            <a href="#membership" className="text-sm uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors">
              MEMBERSHIP
            </a>
            <a href="#about" className="text-sm uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors">
              ABOUT
            </a>
            <a href="#blog" className="text-sm uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors">
              BLOG
            </a>
            <a href="#faq" className="text-sm uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors">
              FAQ
            </a>
          </nav>

          <div className="hero-reveal hero-reveal-delay-2 hidden md:flex items-center gap-3">
            <Button variant="ghost" className="text-sm font-medium">
              Log in
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-5 text-sm font-medium">
              Get started
            </Button>
          </div>

          <button className="hero-reveal hero-reveal-delay-1 md:hidden p-2 text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/8 bg-black/55 backdrop-blur-xl">
            <nav className="flex flex-col gap-4">
              <a href="#home" className="text-sm uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground">
                HOME
              </a>
              <a href="#programs" className="text-sm uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground">
                PROGRAMS
              </a>
              <a href="#schedule" className="text-sm uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground">
                SCHEDULE
              </a>
              <a href="#membership" className="text-sm uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground">
                MEMBERSHIP
              </a>
              <a href="#about" className="text-sm uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground">
                ABOUT
              </a>
              <a href="#blog" className="text-sm uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground">
                BLOG
              </a>
              <a href="#faq" className="text-sm uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground">
                FAQ
              </a>
              <div className="flex flex-col gap-2 pt-4">
                <Button variant="ghost" className="justify-start">
                  Log in
                </Button>
                <Button className="bg-primary text-primary-foreground rounded-full">Get started</Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
