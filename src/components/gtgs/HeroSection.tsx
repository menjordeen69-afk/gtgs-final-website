'use client'

import { ChevronDown, ChevronRight, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HeroSectionProps {
  onApplyClick: () => void
}

export default function HeroSection({ onApplyClick }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative flex min-h-svh items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        aria-hidden="true"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gtgs-navy/70 backdrop-blur-[2px]" />

      {/* Animated gradient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="animate-float absolute -top-20 -left-20 h-72 w-72 rounded-full bg-gtgs-gold/10 blur-3xl" />
        <div className="animate-float-reverse absolute -right-20 top-1/3 h-96 w-96 rounded-full bg-gtgs-blue/10 blur-3xl" />
        <div className="animate-float-slow absolute bottom-10 left-1/3 h-64 w-64 rounded-full bg-gtgs-gold/5 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-4xl px-5 pt-20 pb-16 text-center sm:px-6 sm:pt-24 sm:pb-20 md:pt-28 lg:px-8 lg:pb-8">
        <div className="hero-text-animate mb-4 sm:mb-6" style={{ animationDelay: '0.2s' }}>
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-gtgs-gold-light sm:text-xs md:text-sm">
            Sierra Leone&apos;s Premier Vocational Training Institution
          </span>
        </div>

        <h1
          className="hero-text-animate mb-3 text-[26px] leading-[1.15] font-extrabold tracking-tight text-white sm:mb-5 sm:text-4xl sm:leading-[1.15] md:text-5xl md:leading-[1.1] lg:text-6xl xl:text-7xl"
          style={{ animationDelay: '0.4s' }}
        >
          Empowering People.
          <span className="text-gradient-gold"> Transforming Lives.</span>
          <br className="sm:hidden md:inline" />
          {' '}Building the Future.
        </h1>

        <p
          className="hero-text-animate mx-auto mb-6 max-w-xl text-[13px] leading-relaxed text-white/80 sm:mb-8 sm:text-sm sm:max-w-2xl md:text-base md:leading-relaxed lg:text-lg"
          style={{ animationDelay: '0.6s' }}
        >
          GTGS combines hands-on learning with modern technology to prepare
          you for today&apos;s competitive job market. Gain practical skills,
          professional certification, and real-world experience in Sierra Leone.
        </p>

        <div className="hero-text-animate flex flex-col items-center justify-center gap-3 px-2 sm:flex-row sm:gap-4 sm:px-0" style={{ animationDelay: '0.8s' }}>
          <Button
            size="lg"
            className="w-full max-w-xs bg-gtgs-gold px-6 py-5 text-sm font-bold text-gtgs-navy shadow-lg shadow-gtgs-gold/25 transition-all hover:bg-gtgs-gold-light hover:shadow-xl hover:shadow-gtgs-gold/30 active:scale-[0.98] sm:w-auto sm:px-8 sm:py-6 sm:text-base"
            onClick={onApplyClick}
          >
            Apply Now
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full max-w-xs border-white/30 bg-transparent px-6 py-5 text-sm font-semibold text-white transition-all hover:border-white/60 hover:bg-white/10 hover:text-white active:scale-[0.98] sm:w-auto sm:px-8 sm:py-6 sm:text-base"
            asChild
          >
            <a href="#courses">View Courses</a>
          </Button>
        </div>

        {/* Support Us CTA */}
        <div className="hero-text-animate mt-5 sm:mt-6" style={{ animationDelay: '1s' }}>
          <a
            href="#donation"
            className="group inline-flex items-center gap-1.5 text-xs font-medium text-gtgs-gold-light/90 transition-colors hover:text-gtgs-gold sm:text-sm"
          >
            <Heart className="size-3.5 sm:size-4 transition-transform group-hover:scale-110" aria-hidden="true" />
            Support Our Students
            <ChevronRight className="size-3 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="hero-text-animate absolute bottom-4 left-1/2 z-10 hidden -translate-x-1/2 sm:bottom-6 md:block"
        style={{ animationDelay: '1.2s' }}
        aria-hidden="true"
      >
        <ChevronDown className="animate-bounce size-6 text-white/40 sm:size-7" />
      </div>
    </section>
  )
}
