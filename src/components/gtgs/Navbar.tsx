'use client'

import { useState, useEffect, useCallback } from 'react'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import Image from 'next/image'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Courses', href: '#courses' },
  { label: 'Departments', href: '#departments' },
  { label: 'Facilities', href: '#facilities' },
  { label: 'Why GTGS', href: '#why-gtgs' },
  { label: 'Student Life', href: '#student-life' },
  { label: 'Practicals', href: '#practicals' },
  { label: 'Our Team', href: '#team' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Support Us', href: '#donation' },
] as const

interface NavbarProps {
  onApplyClick: () => void
}

export default function Navbar({ onApplyClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  function handleApplyNav() {
    setMobileOpen(false)
    onApplyClick()
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-gtgs-navy/95 backdrop-blur-md shadow-lg'
          : 'bg-gradient-to-r from-gtgs-navy to-gtgs-blue/80 backdrop-blur-sm'
      }`}
      role="banner"
    >
      <nav
        className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <a href="#home" className="flex items-center gap-2 transition-opacity hover:opacity-80" aria-label="GTGS Home">
          <Image src="/gtgs-logo.jpg" alt="GTGS Logo" width={36} height={36} className="size-7 rounded-sm object-contain sm:size-8 md:size-9" priority />
          <span className="text-gradient-gold text-lg font-extrabold tracking-tight sm:text-xl md:text-2xl">GTGS</span>
        </a>

        <ul className="hidden items-center gap-1 xl:flex" role="menubar">
          {NAV_LINKS.map((link) => (
            <li key={link.label} role="none">
              {link.label === 'Support Us' ? (
                <a
                  href={link.href}
                  role="menuitem"
                  className="rounded-md bg-gtgs-gold/15 px-2.5 py-2 text-[13px] font-semibold text-gtgs-gold transition-colors hover:bg-gtgs-gold/25 hover:text-gtgs-gold-light lg:text-sm"
                >
                  {link.label}
                </a>
              ) : (
                <a href={link.href} role="menuitem" className="rounded-md px-2.5 py-2 text-[13px] font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white lg:text-sm">
                  {link.label}
                </a>
              )}
            </li>
          ))}
          <li role="none">
            <button
              onClick={onApplyClick}
              className="rounded-md bg-gtgs-gold px-3 py-2 text-[13px] font-bold text-gtgs-navy transition-all hover:bg-gtgs-gold-light lg:text-sm"
            >
              Apply Now
            </button>
          </li>
        </ul>

        <div className="flex items-center gap-2 xl:hidden">
          <Button
            size="sm"
            className="bg-gtgs-gold px-3 text-[12px] font-bold text-gtgs-navy hover:bg-gtgs-gold-light"
            onClick={handleApplyNav}
          >
            Apply
          </Button>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="flex h-10 w-10 items-center justify-center text-white hover:bg-white/10 sm:h-11 sm:w-11" aria-label="Open navigation menu">
                <Menu className="size-5 sm:size-6" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-gtgs-navy/95 backdrop-blur-lg sm:w-72">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 text-white">
                  <Image src="/gtgs-logo.jpg" alt="GTGS Logo" width={24} height={24} className="size-5 rounded-sm object-contain" />
                  <span className="text-gradient-gold font-extrabold">GTGS</span>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4" aria-label="Mobile navigation">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`rounded-lg px-4 py-3 text-base font-medium transition-colors hover:bg-white/10 hover:text-white sm:py-3.5 ${
                      link.label === 'Support Us'
                        ? 'bg-gtgs-gold/15 font-semibold text-gtgs-gold hover:bg-gtgs-gold/25 hover:text-gtgs-gold-light'
                        : 'text-white/90'
                    }`
                  }
                  >
                    {link.label}
                  </a>
                ))}
                <button
                  onClick={handleApplyNav}
                  className="mt-2 rounded-lg bg-gtgs-gold px-4 py-3 text-center text-base font-bold text-gtgs-navy transition-colors hover:bg-gtgs-gold-light"
                >
                  Apply Now
                </button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
