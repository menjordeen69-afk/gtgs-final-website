'use client'

import { Users, BookOpen, GraduationCap, TrendingUp, Award, Briefcase, Clock, Heart } from 'lucide-react'
import FadeInView from '@/components/ui/fade-in-view'
import { useCountUp } from '@/hooks/useCountUp'

interface StatItem {
  icon: typeof Users
  target: number
  suffix: string
  label: string
}

const STATISTICS: StatItem[] = [
  { icon: Users, target: 120, suffix: '+', label: 'Students Enrolled' },
  { icon: BookOpen, target: 8, suffix: '+', label: 'Courses Offered' },
  { icon: GraduationCap, target: 45, suffix: '+', label: 'Graduates' },
  { icon: TrendingUp, target: 78, suffix: '%', label: 'Employment Rate' },
  { icon: Briefcase, target: 15, suffix: '+', label: 'Businesses Started' },
  { icon: Award, target: 12, suffix: '+', label: 'Certified Tutors' },
  { icon: Clock, target: 2, suffix: '+', label: 'Years of Excellence' },
  { icon: Heart, target: 5, suffix: '', label: 'Departments' },
]

const CIRCUMFERENCE = 2 * Math.PI * 32

function StatCard({ stat }: { stat: StatItem }) {
  const { count, ref } = useCountUp(stat.target, {
    duration: 2000,
    startOnView: true,
  })

  const progress = stat.target > 0 ? count / stat.target : 0
  const dashOffset = CIRCUMFERENCE * (1 - progress)
  const Icon = stat.icon

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-lg bg-gradient-to-br from-gtgs-blue to-gtgs-navy p-3 shadow-md sm:rounded-xl sm:p-5 md:p-6"
    >
      <div className="flex flex-col items-center gap-1.5 sm:gap-3">
        <div className="relative flex size-14 items-center justify-center sm:size-16 md:size-20">
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 72 72" aria-hidden="true">
            <circle cx="36" cy="36" r="32" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
            <circle
              cx="36" cy="36" r="32"
              fill="none"
              stroke="oklch(0.82 0.14 85)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={dashOffset}
              className="transition-[stroke-dashoffset] duration-[2000ms] ease-out"
            />
          </svg>
          <Icon className="size-5 text-gtgs-gold sm:size-6 md:size-7" aria-hidden="true" />
        </div>
        <div className="text-center">
          <p className="text-lg font-extrabold leading-tight text-white sm:text-xl md:text-2xl lg:text-3xl">
            {count.toLocaleString()}
            <span className="text-gtgs-gold">{stat.suffix}</span>
          </p>
          <p className="mt-0.5 text-[10px] font-medium leading-tight text-white/70 sm:text-xs">
            {stat.label}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function StatisticsSection() {
  return (
    <section
      className="relative overflow-hidden bg-gtgs-navy px-4 py-10 sm:px-6 sm:py-14 md:py-16 lg:py-20"
      aria-label="Our Statistics"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="animate-float absolute left-[5%] top-[8%] h-16 w-16 rounded-full bg-gtgs-blue/10 sm:h-32 sm:w-32 md:h-40 md:w-40" />
        <div className="animate-float-reverse absolute bottom-[8%] right-[3%] h-14 w-14 rounded-xl bg-gtgs-gold/5 sm:h-24 sm:w-24 md:h-32 md:w-32" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <FadeInView className="mb-6 text-center sm:mb-8 md:mb-10 lg:mb-12">
          <h2 className="mb-2 text-xl font-extrabold text-white sm:text-2xl md:text-3xl lg:text-4xl">
            Our Impact in Numbers
          </h2>
          <div className="mx-auto mb-2.5 h-1 w-12 rounded-full bg-gtgs-gold sm:mb-3 sm:w-16" aria-hidden="true" />
          <p className="mx-auto max-w-sm text-xs text-white/70 sm:max-w-md sm:text-sm md:text-base">
            Numbers that reflect our commitment to practical skills development in Sierra Leone.
          </p>
        </FadeInView>

        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:gap-4 md:grid-cols-4">
          {STATISTICS.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  )
}