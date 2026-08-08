'use client'

import { Monitor, Scissors, UtensilsCrossed, Palette, Droplets, Shirt, Users, Building2 } from 'lucide-react'
import FadeInView from '@/components/ui/fade-in-view'

const FACILITIES = [
  { name: 'Practical Training Classrooms', desc: 'Fully equipped classrooms designed for hands-on learning across all departments, with modern seating and instructional tools.', icon: Building2, color: 'from-blue-500/15 to-blue-600/5', iconColor: 'text-blue-600' },
  { name: 'ICT Laboratory', desc: 'A dedicated computer lab with modern systems for ICT fundamentals, digital literacy, graphic design, and web development.', icon: Monitor, color: 'from-indigo-500/15 to-indigo-600/5', iconColor: 'text-indigo-600' },
  { name: 'Beauty Practical Room', desc: 'A professional beauty and cosmetology training space equipped with styling stations, skincare tools, and beauty therapy supplies.', icon: Scissors, color: 'from-pink-500/15 to-pink-600/5', iconColor: 'text-pink-600' },
  { name: 'Catering Training Area', desc: 'A fully functional kitchen and food preparation area where catering students learn professional cooking and food safety.', icon: UtensilsCrossed, color: 'from-orange-500/15 to-orange-600/5', iconColor: 'text-orange-600' },
  { name: 'Design Studio', desc: 'A creative workspace for graphic design students with design tools, visual reference materials, and collaborative spaces.', icon: Palette, color: 'from-purple-500/15 to-purple-600/5', iconColor: 'text-purple-600' },
  { name: 'Soap Making Workshop', desc: 'A dedicated production workshop equipped with moulds, raw materials, mixing tools, and packaging supplies.', icon: Droplets, color: 'from-cyan-500/15 to-cyan-600/5', iconColor: 'text-cyan-600' },
  { name: 'Gara Tie-Dye Studio', desc: 'A specialised textile studio where students practise traditional Sierra Leonean gara tie-dye techniques and pattern creation.', icon: Shirt, color: 'from-rose-500/15 to-rose-600/5', iconColor: 'text-rose-600' },
  { name: 'Student Waiting Area', desc: 'A comfortable common area where students can relax, collaborate on assignments, and build connections with peers.', icon: Users, color: 'from-amber-500/15 to-amber-600/5', iconColor: 'text-amber-600' },
] as const

export default function Facilities() {
  return (
    <section
      id="facilities"
      className="bg-muted/30 px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:py-28"
      aria-label="Our Facilities"
    >
      <div className="mx-auto max-w-7xl">
        <FadeInView className="mb-10 text-center sm:mb-12 md:mb-14">
          <h2 className="mb-2 text-2xl font-extrabold text-gtgs-navy sm:text-3xl md:text-4xl">Our Facilities</h2>
          <div className="mx-auto mb-3 h-1 w-12 rounded-full bg-gtgs-gold sm:w-16" aria-hidden="true" />
          <p className="mx-auto max-w-lg text-sm text-muted-foreground sm:text-base md:text-lg">
            GTGS provides purpose-built training spaces designed for practical, hands-on learning.
          </p>
        </FadeInView>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {FACILITIES.map((facility, index) => {
            const Icon = facility.icon
            return (
              <FadeInView key={facility.name} delay={index * 50}>
                <div className="premium-card group overflow-hidden rounded-xl bg-white shadow-sm">
                  <div className={`flex h-14 items-center justify-center bg-gradient-to-br ${facility.color} sm:h-16`} >
                    <Icon className={`size-7 ${facility.iconColor} sm:size-8`} aria-hidden="true" />
                  </div>
                  <div className="p-4 sm:p-5">
                    <h3 className="mb-1.5 text-sm font-bold leading-tight text-gtgs-navy sm:text-base md:text-lg">{facility.name}</h3>
                    <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">{facility.desc}</p>
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