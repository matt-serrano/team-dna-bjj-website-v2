"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <HugoLogo />
            <span className="font-semibold text-foreground text-xl">Hugo</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              How it works
            </a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
            <a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Reviews
            </a>
            <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              FAQ
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" className="text-sm font-medium">
              Log in
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-5 text-sm font-medium">
              Get started
            </Button>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground">
                Features
              </a>
              <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground">
                How it works
              </a>
              <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground">
                Pricing
              </a>
              <a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground">
                Reviews
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

function HugoLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="3" fill="currentColor" className="text-primary" />
      <circle cx="16" cy="8" r="3" fill="currentColor" className="text-primary" />
      <circle cx="8" cy="16" r="3" fill="currentColor" className="text-primary" />
      <circle cx="16" cy="16" r="3" fill="currentColor" className="text-primary" />
    </svg>
  )
}
