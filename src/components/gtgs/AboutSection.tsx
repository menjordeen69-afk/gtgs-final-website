'use client'

import { Target, Eye, Heart, Award, BookOpen } from 'lucide-react'
import FadeInView from '@/components/ui/fade-in-view'

const VALUES = [
  { label: 'Excellence', desc: 'Delivering quality education and professional training.' },
  { label: 'Integrity', desc: 'Honesty, transparency, and accountability in all we do.' },
  { label: 'Innovation', desc: 'Encouraging creativity and modern solutions.' },
  { label: 'Professionalism', desc: 'Maintaining high standards in teaching and service.' },
  { label: 'Practical Learning', desc: 'Learning by doing through hands-on experience.' },
  { label: 'Teamwork', desc: 'Working together for student success.' },
  { label: 'Respect', desc: 'Treating every student equally regardless of background.' },
  { label: 'Entrepreneurship', desc: 'Encouraging self-employment and business creation.' },
] as const

const QUICK_FACTS = [
  { icon: BookOpen, label: '7 Departments' },
  { icon: Award, label: 'Professional Certificates' },
  { icon: Target, label: 'Career-Focused Training' },
  { icon: Heart, label: 'Inclusive Environment' },
] as const

export default function AboutSection() {
  return (
    <section
      id="about"
      className="bg-white px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:py-28"
      aria-label="About GTGS"
    >
      <div className="mx-auto max-w-7xl">
        <FadeInView className="mb-10 text-center sm:mb-12 md:mb-14">
          <h2 className="mb-2 text-2xl font-extrabold text-gtgs-navy sm:text-3xl md:text-4xl">
            About GTGS
          </h2>
          <div className="mx-auto mb-3 h-1 w-12 rounded-full bg-gtgs-gold sm:w-16" aria-hidden="true" />
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
            Global Technology &amp; General Services (GTGS) is a Sierra Leonean vocational
            and professional training institution dedicated to equipping young people and
            adults with practical skills for employment, entrepreneurship, and lifelong success.
          </p>
        </FadeInView>

        {/* Quick Facts Bar */}
        <FadeInView delay={50} className="mb-10 sm:mb-12">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {QUICK_FACTS.map((fact) => {
              const Icon = fact.icon
              return (
                <div key={fact.label} className="flex items-center gap-3 rounded-xl border bg-muted/30 p-3 sm:p-4">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gtgs-blue/10 text-gtgs-blue sm:size-10">
                    <Icon className="size-4 sm:size-5" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-semibold text-gtgs-navy sm:text-sm">{fact.label}</span>
                </div>
              )
            })}
          </div>
        </FadeInView>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Mission & Vision */}
          <div className="space-y-6">
            <FadeInView delay={60}>
              <div className="premium-card rounded-xl border bg-white p-5 sm:p-6">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-gtgs-blue/10 sm:size-12">
                    <Target className="size-5 text-gtgs-blue sm:size-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-bold text-gtgs-navy sm:text-lg md:text-xl">Our Mission</h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  To provide affordable, high-quality practical education that empowers
                  individuals with employable skills, entrepreneurial knowledge, and
                  technological competence for the modern workforce.
                </p>
              </div>
            </FadeInView>

            <FadeInView delay={100}>
              <div className="premium-card rounded-xl border bg-white p-5 sm:p-6">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-gtgs-gold/15 sm:size-12">
                    <Eye className="size-5 text-gtgs-gold sm:size-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-bold text-gtgs-navy sm:text-lg md:text-xl">Our Vision</h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  To become Sierra Leone&apos;s leading vocational and technology training
                  institution, producing highly skilled graduates who contribute positively
                  to national development, innovation, and economic growth.
                </p>
              </div>
            </FadeInView>
          </div>

          {/* Core Values */}
          <FadeInView delay={120}>
            <div className="rounded-xl border bg-gradient-to-br from-gtgs-navy to-gtgs-blue p-5 sm:p-6">
              <div className="mb-4 flex items-center gap-2">
                <Heart className="size-5 text-gtgs-gold sm:size-6" aria-hidden="true" />
                <h3 className="text-base font-bold text-white sm:text-lg md:text-xl">Our Core Values</h3>
              </div>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3">
                {VALUES.map((value, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2.5 rounded-lg bg-white/10 px-3.5 py-3"
                  >
                    <span className="mt-0.5 size-2 shrink-0 rounded-full bg-gtgs-gold" aria-hidden="true" />
                    <div>
                      <span className="block text-sm font-semibold text-white">{value.label}</span>
                      <span className="block text-[11px] leading-relaxed text-white/60 sm:text-xs">{value.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeInView>
        </div>
      </div>
    </section>
  )
}
