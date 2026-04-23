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
          <div className="flex items-center">
            <Image
              src="/images/TeamDnaLogo.png"
              alt="Team DNA logo"
              width={144}
              height={44}
              className="h-11 w-auto object-contain"
              priority
            />
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Home
            </a>
            <a href="#programs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Programs
            </a>
            <a href="#schedule" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Schedule
            </a>
            <a href="#membership" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Membership
            </a>
            <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
            <a href="#blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Blog
            </a>
            <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              FAQ
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" className="text-sm font-medium">
              Log in
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-5 text-sm font-medium">
              Get started
            </Button>
          </div>

          <button className="md:hidden p-2 text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/8 bg-black/55 backdrop-blur-xl">
            <nav className="flex flex-col gap-4">
              <a href="#home" className="text-sm text-muted-foreground hover:text-foreground">
                Home
              </a>
              <a href="#programs" className="text-sm text-muted-foreground hover:text-foreground">
                Programs
              </a>
              <a href="#schedule" className="text-sm text-muted-foreground hover:text-foreground">
                Schedule
              </a>
              <a href="#membership" className="text-sm text-muted-foreground hover:text-foreground">
                Membership
              </a>
              <a href="#about" className="text-sm text-muted-foreground hover:text-foreground">
                About
              </a>
              <a href="#blog" className="text-sm text-muted-foreground hover:text-foreground">
                Blog
              </a>
              <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground">
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
