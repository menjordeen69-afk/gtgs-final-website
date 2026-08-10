'use client'

import Image from 'next/image'
import { GraduationCap, BookOpen, ChefHat, PenTool, Users } from 'lucide-react'
import FadeInView from '@/components/ui/fade-in-view'

const TEAM = [
  {
    name: 'Susan Kenewa',
    role: 'Catering Tutor',
    icon: ChefHat,
    image: '/tutors/susan-kenewa.jpg',
    bio: 'Expert in culinary arts, food preparation, and event catering with years of professional experience.',
  },
  {
    name: 'Mariama Sam',
    role: 'Registrar',
    icon: PenTool,
    image: '/tutors/mariama-sam.jpg',
    bio: 'Manages student admissions, records, and academic affairs to keep everything running smoothly.',
  },
  {
    name: 'Hajaratu Pamela Kanu',
    role: 'Tutor',
    icon: BookOpen,
    image: '/tutors/hajaratu-kanu.jpg',
    bio: 'Dedicated to hands-on practical training and mentoring students toward professional excellence.',
  },
  {
    name: 'ICT Tutor',
    role: 'ICT Department',
    icon: GraduationCap,
    image: '/tutors/tutor-1.jpg',
    bio: 'Equips students with essential digital skills, from computer fundamentals to advanced IT concepts.',
  },
  {
    name: 'Department Tutor',
    role: 'Faculty Member',
    icon: Users,
    image: '/tutors/tutor-2.jpg',
    bio: 'Committed to delivering practical, career-focused education that prepares students for the workforce.',
  },
]

export default function OurTeam() {
  return (
    <section
      id="team"
      className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:py-28"
      aria-label="Our Team"
    >
      <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-gtgs-gold/5 blur-3xl" aria-hidden="true" />

      <div className="mx-auto max-w-7xl">
        <FadeInView className="mb-12 text-center sm:mb-16">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-gtgs-gold sm:text-sm">
            Meet the Experts
          </p>
          <h2 className="mb-3 text-2xl font-extrabold text-gtgs-navy sm:text-3xl md:text-4xl lg:text-5xl">
            Our Team
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
            Experienced professionals dedicated to equipping you with practical skills
            and real-world knowledge for your career journey.
          </p>
        </FadeInView>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {TEAM.map((member, i) => {
            const Icon = member.icon
            return (
              <FadeInView key={member.name} delay={i * 80}>
                <div className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-lg">
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gtgs-navy/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                      <div className="mb-1.5 inline-flex items-center gap-1.5 rounded-lg bg-white/15 px-2.5 py-1 backdrop-blur-sm">
                        <Icon className="size-3 text-gtgs-gold" aria-hidden="true" />
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-white sm:text-xs">{member.role}</span>
                      </div>
                      <h3 className="text-base font-bold text-white sm:text-lg">{member.name}</h3>
                    </div>
                  </div>
                  <div className="p-4 sm:p-5">
                    <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">{member.bio}</p>
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
