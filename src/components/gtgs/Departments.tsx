'use client'

import { Monitor, Palette, Lightbulb, UtensilsCrossed, Sparkles, Droplets, Scissors } from 'lucide-react'
import FadeInView from '@/components/ui/fade-in-view'

const DEPARTMENTS = [
  {
    name: 'ICT Department',
    desc: 'Technology and computer-related training including ICT fundamentals, digital literacy, and web development.',
    icon: Monitor,
    color: 'from-blue-500/15 to-blue-600/5',
    iconColor: 'text-blue-600',
  },
  {
    name: 'Graphic Design Department',
    desc: 'Creative design and digital media training for visual communication and brand development.',
    icon: Palette,
    color: 'from-purple-500/15 to-purple-600/5',
    iconColor: 'text-purple-600',
  },
  {
    name: 'Entrepreneurship Department',
    desc: 'Business and startup development training to help you launch and manage your own venture.',
    icon: Lightbulb,
    color: 'from-amber-500/15 to-amber-600/5',
    iconColor: 'text-amber-600',
  },
  {
    name: 'Catering Department',
    desc: 'Professional cooking, food preparation, and event catering for the hospitality industry.',
    icon: UtensilsCrossed,
    color: 'from-orange-500/15 to-orange-600/5',
    iconColor: 'text-orange-600',
  },
  {
    name: 'Cosmetology Department',
    desc: 'Beauty therapy, skincare, hair dressing, and professional beauty services training.',
    icon: Sparkles,
    color: 'from-pink-500/15 to-pink-600/5',
    iconColor: 'text-pink-600',
  },
  {
    name: 'Soap Making Department',
    desc: 'Production of soaps, liquid soap, detergents, and cleaning products for business.',
    icon: Droplets,
    color: 'from-cyan-500/15 to-cyan-600/5',
    iconColor: 'text-cyan-600',
  },
  {
    name: 'Gara Tie-Dye Department',
    desc: 'Traditional fabric design, textile skills, and Sierra Leonean cultural craftsmanship.',
    icon: Scissors,
    color: 'from-rose-500/15 to-rose-600/5',
    iconColor: 'text-rose-600',
  },
] as const

export default function Departments() {
  return (
    <section
      id="departments"
      className="bg-muted/30 px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:py-28"
      aria-label="Our Departments"
    >
      <div className="mx-auto max-w-7xl">
        <FadeInView className="mb-10 text-center sm:mb-12 md:mb-14">
          <h2 className="mb-2 text-2xl font-extrabold text-gtgs-navy sm:text-3xl md:text-4xl">Our Departments</h2>
          <div className="mx-auto mb-3 h-1 w-12 rounded-full bg-gtgs-gold sm:w-16" aria-hidden="true" />
          <p className="mx-auto max-w-lg text-sm text-muted-foreground sm:text-base md:text-lg">
            Seven specialised departments, each focused on giving you practical,
            job-ready skills in high-demand fields.
          </p>
        </FadeInView>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {DEPARTMENTS.map((dept, index) => {
            const Icon = dept.icon
            return (
              <FadeInView key={dept.name} delay={index * 50}>
                <div className={`premium-card group overflow-hidden rounded-xl bg-white shadow-sm sm:shadow ${index === 6 ? 'sm:col-span-2 xl:col-span-1' : ''}`}>
                  <div className={`flex h-14 items-center justify-center bg-gradient-to-br ${dept.color} sm:h-16`}>
                    <Icon className={`size-7 ${dept.iconColor} sm:size-8`} aria-hidden="true" />
                  </div>
                  <div className="p-4 sm:p-5">
                    <h3 className="mb-1.5 text-sm font-bold leading-tight text-gtgs-navy sm:text-base md:text-lg">{dept.name}</h3>
                    <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">{dept.desc}</p>
                  </div>
                </div>
              </FadeInView>
            )
          })}
        </div>
      </div>
    </section>
  )
}