'use client'

import { DollarSign, UserCheck, Hammer, Monitor, CalendarClock, Rocket, Award, HeartHandshake, Users, Compass } from 'lucide-react'
import FadeInView from '@/components/ui/fade-in-view'

const BENEFITS = [
  { icon: DollarSign, title: 'Affordable Tuition', desc: 'Quality education at prices accessible to everyone in Sierra Leone.' },
  { icon: UserCheck, title: 'Experienced Tutors', desc: 'Learn from professionals with real industry expertise and teaching experience.' },
  { icon: Hammer, title: 'Practical Learning', desc: 'Hands-on training is the foundation of everything we do at GTGS.' },
  { icon: Monitor, title: 'Modern Training', desc: 'Up-to-date equipment and current industry practices across all departments.' },
  { icon: CalendarClock, title: 'Flexible Schedules', desc: 'Study while working with classes designed to fit your life and commitments.' },
  { icon: Rocket, title: 'Entrepreneurship Support', desc: 'Guidance to start and grow your own business after graduation.' },
  { icon: Award, title: 'Professional Certificates', desc: 'Recognised credentials upon successful completion of your programme.' },
  { icon: HeartHandshake, title: 'Friendly Environment', desc: 'A supportive, professional learning atmosphere for every student.' },
  { icon: Compass, title: 'Career Guidance', desc: 'Expert advice to help you navigate your career path after training.' },
  { icon: Users, title: 'Small Class Sizes', desc: 'Personal attention and better learning outcomes for every student.' },
] as const

export default function WhyChooseGTGS() {
  return (
    <section
      id="why-gtgs"
      className="bg-white px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:py-28"
      aria-label="Why Choose GTGS"
    >
      <div className="mx-auto max-w-7xl">
        <FadeInView className="mb-10 text-center sm:mb-12 md:mb-14">
          <h2 className="mb-2 text-2xl font-extrabold text-gtgs-navy sm:text-3xl md:text-4xl">Why Choose GTGS?</h2>
          <div className="mx-auto mb-3 h-1 w-12 rounded-full bg-gtgs-gold sm:w-16" aria-hidden="true" />
          <p className="mx-auto max-w-lg text-sm text-muted-foreground sm:text-base md:text-lg">
            GTGS offers a unique combination of practical training, professional instruction,
            and genuine commitment to student success.
          </p>
        </FadeInView>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:gap-6 lg:grid-cols-3 xl:grid-cols-5">
          {BENEFITS.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <FadeInView key={benefit.title} delay={index * 40}>
                <div className="premium-card h-full rounded-xl border bg-white p-4 sm:p-5">
                  <div className="mb-3 flex size-11 items-center justify-center rounded-lg bg-gtgs-blue/10 text-gtgs-blue transition-colors group-hover:bg-gtgs-gold/15 group-hover:text-gtgs-gold sm:mb-4 sm:size-12">
                    <Icon className="size-5 sm:size-6" aria-hidden="true" />
                  </div>
                  <h3 className="mb-1.5 text-sm font-bold leading-tight text-gtgs-navy sm:text-base">{benefit.title}</h3>
                  <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">{benefit.desc}</p>
                </div>
              </FadeInView>
            )
          })}
        </div>
      </div>
    </section>
  )
}