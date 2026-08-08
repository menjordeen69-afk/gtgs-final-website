'use client'

import { Wrench, Users, PartyPopper, Award, Lightbulb, MessageSquare } from 'lucide-react'
import FadeInView from '@/components/ui/fade-in-view'

const LIFE_ASPECTS = [
  { icon: Wrench, title: 'Hands-On Practice', desc: 'Every class at GTGS is built around practical learning. Students spend the majority of their time working on real projects, using actual tools and equipment, so they graduate with genuine skills they can immediately apply.' },
  { icon: Users, title: 'Group Projects & Collaboration', desc: 'Students regularly work together on group assignments that mirror real-world working environments, building teamwork, communication skills, and professional relationships.' },
  { icon: Lightbulb, title: 'Entrepreneurship Mindset', desc: 'Beyond technical skills, GTGS cultivates an entrepreneurial spirit in every student through dedicated business training and mentorship programmes.' },
  { icon: PartyPopper, title: 'Community Events', desc: 'GTGS organises community engagement activities, open days, and public exhibitions where students showcase their work to real audiences.' },
  { icon: Award, title: 'Certificate Ceremonies', desc: 'Upon successful completion, students participate in a formal certificate ceremony celebrating their achievement with families and staff.' },
  { icon: MessageSquare, title: 'Supportive Community', desc: 'GTGS fosters a welcoming, inclusive atmosphere where students from all backgrounds feel valued and encouraged to grow.' },
] as const

export default function StudentLife() {
  return (
    <section
      id="student-life"
      className="bg-white px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:py-28"
      aria-label="Student Life at GTGS"
    >
      <div className="mx-auto max-w-7xl">
        <FadeInView className="mb-10 text-center sm:mb-12 md:mb-14">
          <h2 className="mb-2 text-2xl font-extrabold text-gtgs-navy sm:text-3xl md:text-4xl">
            Life at GTGS
          </h2>
          <div className="mx-auto mb-3 h-1 w-12 rounded-full bg-gtgs-gold sm:w-16" aria-hidden="true" />
          <p className="mx-auto max-w-lg text-sm text-muted-foreground sm:text-base md:text-lg">
            At GTGS, learning goes beyond the classroom. Experience a vibrant, supportive
            community built around practical skills, collaboration, and personal growth.
          </p>
        </FadeInView>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:gap-6 lg:grid-cols-3">
          {LIFE_ASPECTS.map((aspect, index) => {
            const Icon = aspect.icon
            return (
              <FadeInView key={aspect.title} delay={index * 50}>
                <div className="premium-card h-full rounded-xl border bg-white p-5 sm:p-6">
                  <div className="mb-3 flex size-11 items-center justify-center rounded-lg bg-gtgs-blue/10 text-gtgs-blue sm:mb-4 sm:size-12">
                    <Icon className="size-5 sm:size-6" aria-hidden="true" />
                  </div>
                  <h3 className="mb-1.5 text-sm font-bold leading-tight text-gtgs-navy sm:text-base md:text-lg">{aspect.title}</h3>
                  <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">{aspect.desc}</p>
                </div>
              </FadeInView>
            )
          })}
        </div>
      </div>
    </section>
  )
}