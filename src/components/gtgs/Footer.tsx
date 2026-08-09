'use client'

import Image from 'next/image'
import { MapPin, Phone, Mail, Facebook, MessageCircle, UserCircle } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

const QUICK_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Courses', href: '#courses' },
  { label: 'Departments', href: '#departments' },
  { label: 'Facilities', href: '#facilities' },
  { label: 'Student Life', href: '#student-life' },
  { label: 'Admission', href: '#admission' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Support Us', href: '#donation' },
] as const

const PROGRAMME_LINKS = [
  'ICT Fundamentals',
  'Graphic Design',
  'Digital Marketing',
  'Catering',
  'Cosmetology',
  'Entrepreneurship',
] as const

const DEPARTMENT_LINKS = [
  'ICT Department',
  'Graphic Design Dept.',
  'Entrepreneurship Dept.',
  'Catering Department',
  'Cosmetology Department',
  'Soap Making Department',
  'Gara Tie-Dye Department',
] as const

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      id="contact"
      className="bg-gradient-to-b from-gtgs-navy to-[oklch(0.18_0.06_250)]"
      role="contentinfo"
    >
      <div className="mx-auto max-w-7xl px-4 pt-8 pb-5 sm:px-6 sm:pt-12 sm:pb-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-8 lg:grid-cols-4 lg:gap-x-8">
          {/* About */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-3 flex items-center gap-2">
              <Image
                src="/gtgs-logo.jpg"
                alt="GTGS Logo"
                width={28}
                height={28}
                className="size-6 rounded-sm object-contain sm:size-7"
              />
              <span className="text-gradient-gold text-lg font-extrabold sm:text-xl md:text-2xl">GTGS</span>
            </div>
            <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-gtgs-gold-light sm:text-xs">
              Knowledge • Skills • Success
            </p>
            <p className="mb-4 max-w-xs text-[11px] leading-relaxed text-white/60 sm:text-xs md:text-sm">
              A Sierra Leonean vocational and professional training institution
              dedicated to equipping young people and adults with practical
              skills for employment, entrepreneurship, and lifelong success.
            </p>
            {/* Social */}
            <div className="flex items-center gap-2">
              <a
                href="https://www.tiktok.com/@globaltechnology.sl"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow GTGS on TikTok"
                className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white/60 transition-colors hover:bg-gtgs-gold/20 hover:text-gtgs-gold sm:size-11"
              >
                <svg className="size-3.5 sm:size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.73a8.19 8.19 0 0 0 4.76 1.52V6.79a4.84 4.84 0 0 1-1-.1z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Follow GTGS on Facebook"
                className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white/60 transition-colors hover:bg-gtgs-gold/20 hover:text-gtgs-gold sm:size-11"
              >
                <Facebook className="size-3.5 sm:size-4" aria-hidden="true" />
              </a>
              <a
                href="https://wa.me/23234046770"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with GTGS on WhatsApp"
                className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white/60 transition-colors hover:bg-gtgs-gold/20 hover:text-gtgs-gold sm:size-11"
              >
                <MessageCircle className="size-3.5 sm:size-4" aria-hidden="true" />
              </a>
              <a
                href="mailto:globaltechnologyandgeneralserv@gmail.com"
                aria-label="Email GTGS"
                className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white/60 transition-colors hover:bg-gtgs-gold/20 hover:text-gtgs-gold sm:size-11"
              >
                <Mail className="size-3.5 sm:size-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-2.5 text-[11px] font-bold uppercase tracking-wider text-gtgs-gold sm:mb-3 sm:text-xs md:text-sm">
              Quick Links
            </h3>
            <ul className="space-y-1.5 sm:space-y-2 md:space-y-3" role="list">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[11px] text-white/60 transition-colors hover:text-white sm:text-xs md:text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programmes */}
          <div>
            <h3 className="mb-2.5 text-[11px] font-bold uppercase tracking-wider text-gtgs-gold sm:mb-3 sm:text-xs md:text-sm">
              Programmes
            </h3>
            <ul className="space-y-1.5 sm:space-y-2 md:space-y-3" role="list">
              {PROGRAMME_LINKS.map((p) => (
                <li key={p}>
                  <a
                    href="#courses"
                    className="text-[11px] text-white/60 transition-colors hover:text-white sm:text-xs md:text-sm"
                  >
                    {p}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="mb-2.5 text-[11px] font-bold uppercase tracking-wider text-gtgs-gold sm:mb-3 sm:text-xs md:text-sm">
              Contact & Hours
            </h3>
            <ul className="space-y-2.5 sm:space-y-3 md:space-y-4" role="list">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-3.5 shrink-0 text-gtgs-gold/70 sm:size-4" aria-hidden="true" />
                <span className="text-[11px] leading-relaxed text-white/60 sm:text-xs md:text-sm">
                  Freetown, Sierra Leone
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-3.5 shrink-0 text-gtgs-gold/70 sm:size-4" aria-hidden="true" />
                <a
                  href="tel:+23234046770"
                  className="text-[11px] text-white/60 transition-colors hover:text-white sm:text-xs md:text-sm"
                >
                  +232 34 046 770
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-3.5 shrink-0 text-gtgs-gold/70 sm:size-4" aria-hidden="true" />
                <a
                  href="mailto:globaltechnologyandgeneralserv@gmail.com"
                  className="text-[11px] text-white/60 transition-colors hover:text-white sm:text-xs md:text-sm"
                >
                  globaltechnologyandgeneralserv@gmail.com
                </a>
              </li>
            </ul>
            {/* Office Hours */}
            <div className="mt-3 rounded-lg bg-white/5 p-3 sm:mt-4 sm:p-4">
              <h4 className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-gtgs-gold sm:mb-2 sm:text-xs">
                Office Hours
              </h4>
              <div className="space-y-1 text-[10px] text-white/60 sm:text-xs">
                <p>Mon – Fri: 8:00 AM – 5:00 PM</p>
                <p>Saturday: 9:00 AM – 2:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-5 bg-white/10 sm:my-6" />

        <div className="flex flex-col items-center justify-between gap-1.5 text-center sm:flex-row sm:text-left sm:gap-2">
          <p className="text-[10px] text-white/40 sm:text-xs">
            &copy; {currentYear} Global Technology & General Services. All rights reserved.
          </p>
          <p className="text-[10px] text-white/40 sm:text-xs">
            Empowering People. Transforming Lives. Building the Future.
          </p>
          <a
            href="/admin"
            className="text-white/10 transition-colors hover:text-white/30"
            aria-label="Admin dashboard"
          >
            <UserCircle className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}
