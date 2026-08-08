'use client'

import Image from 'next/image'
import { Monitor, Palette, UtensilsCrossed, Lightbulb, Scissors, Sparkles, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import FadeInView from '@/components/ui/fade-in-view'

interface CoursesOfferedProps {
  onApplyClick?: () => void
}

const COURSES = [
  {
    icon: Monitor,
    title: 'ICT & Digital Skills',
    description: 'From computer fundamentals to digital marketing, gain the tech skills that employers demand.',
    courses: ['ICT Fundamentals', 'Computer Applications', 'Digital Literacy', 'Social Media Management', 'Digital Marketing', 'Website Fundamentals'],
    image: '/students/student-1.jpg',
    gradient: 'from-blue-500/20 to-cyan-500/10',
    accent: 'bg-blue-500',
  },
  {
    icon: Palette,
    title: 'Graphic Design',
    description: 'Master visual communication and create stunning designs for print and digital media.',
    courses: ['Adobe Photoshop', 'Illustration', 'Brand Identity', 'Print Design', 'Social Media Graphics'],
    image: '/students/student-2.jpg',
    gradient: 'from-purple-500/20 to-pink-500/10',
    accent: 'bg-purple-500',
  },
  {
    icon: UtensilsCrossed,
    title: 'Catering & Hospitality',
    description: 'Learn professional cooking, food presentation, and event catering from expert chefs.',
    courses: ['Food Preparation', 'Event Catering', 'Pastry & Baking', 'Food Safety & Hygiene'],
    image: '/students/student-3.jpg',
    gradient: 'from-orange-500/20 to-amber-500/10',
    accent: 'bg-orange-500',
  },
  {
    icon: Lightbulb,
    title: 'Entrepreneurship',
    description: 'Develop business acumen and learn how to launch and manage your own venture.',
    courses: ['Business Planning', 'Small Business Management', 'Financial Literacy', 'Marketing Strategy'],
    image: '/students/student-5.jpg',
    gradient: 'from-emerald-500/20 to-teal-500/10',
    accent: 'bg-emerald-500',
  },
  {
    icon: Scissors,
    title: 'Fashion & Craft',
    description: 'Explore Sierra Leonean textile traditions and modern craft techniques for income generation.',
    courses: ['Gara Tie-Dye', 'Soap Making', 'Liquid Soap Production', 'Detergent Making'],
    image: '/students/student-6.jpg',
    gradient: 'from-rose-500/20 to-red-500/10',
    accent: 'bg-rose-500',
  },
  {
    icon: Sparkles,
    title: 'Cosmetology & Beauty',
    description: 'Professional beauty therapy, hairstyling, and cosmetics for the modern salon industry.',
    courses: ['Beauty Therapy', 'Hair Dressing', 'Makeup Artistry', 'Skincare'],
    image: '/students/student-7.jpg',
    gradient: 'from-pink-500/20 to-fuchsia-500/10',
    accent: 'bg-pink-500',
  },
]

const STUDENT_IMAGES = [1, 2, 3, 4, 5, 6, 7]

export default function CoursesOffered({ onApplyClick }: CoursesOfferedProps) {
  return (
    <section
      id="courses"
      className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:py-28"
      aria-label="Courses Offered"
    >
      <div className="pointer-events-none absolute top-0 right-0 -z-10 h-96 w-96 rounded-full bg-gtgs-gold/5 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 left-0 -z-10 h-96 w-96 rounded-full bg-gtgs-blue/5 blur-3xl" aria-hidden="true" />

      <div className="mx-auto max-w-7xl">
        <FadeInView className="mb-12 text-center sm:mb-16">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-gtgs-gold sm:text-sm">
            What We Teach
          </p>
          <h2 className="mb-3 text-2xl font-extrabold text-gtgs-navy sm:text-3xl md:text-4xl lg:text-5xl">
            Courses We Offer
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
            Practical, career-focused programmes designed to give you real skills for real opportunities.
            All beginners are welcome — no prior experience needed.
          </p>
        </FadeInView>

        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {COURSES.map((course, i) => {
            const Icon = course.icon
            return (
              <FadeInView key={course.title} delay={i * 100}>
                <div className="course-card group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                  <div className="img-zoom relative h-48 w-full sm:h-52">
                    <Image
                      src={course.image}
                      alt={`GTGS student learning ${course.title}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${course.gradient}`} />
                    <div className="absolute bottom-3 left-3">
                      <div className="flex items-center gap-2 rounded-xl bg-white/90 px-3 py-1.5 shadow-sm backdrop-blur-sm">
                        <div className={`flex size-7 items-center justify-center rounded-lg ${course.accent} text-white`}>
                          <Icon className="size-3.5" aria-hidden="true" />
                        </div>
                        <span className="text-xs font-bold text-gtgs-navy sm:text-sm">{course.title}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <p className="mb-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                      {course.description}
                    </p>
                    <ul className="mt-auto space-y-1.5 border-t border-gray-50 pt-3">
                      {course.courses.map((c) => (
                        <li key={c} className="flex items-center gap-2">
                          <span className="size-1 shrink-0 rounded-full bg-gtgs-gold" aria-hidden="true" />
                          <span className="text-xs text-gtgs-navy/80 sm:text-sm">{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeInView>
            )
          })}
        </div>

        <FadeInView delay={400} className="mt-14 sm:mt-16">
          <p className="mb-5 text-center text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground sm:text-sm">
            Our Students in Action
          </p>
          <div className="relative overflow-hidden rounded-2xl">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" aria-hidden="true" />
            <div className="flex" style={{ animation: 'marquee 30s linear infinite' }}>
              {[...STUDENT_IMAGES, ...STUDENT_IMAGES].map((n, i) => (
                <div key={i} className="relative mr-3 h-32 w-48 flex-shrink-0 sm:mr-4 sm:h-40 sm:w-56">
                  <Image
                    src={`/students/student-${n}.jpg`}
                    alt="GTGS student"
                    fill
                    className="rounded-lg object-cover"
                    sizes="224px"
                  />
                  <div className="absolute inset-0 rounded-lg bg-gtgs-navy/20" />
                </div>
              ))}
            </div>
          </div>
        </FadeInView>
        <FadeInView delay={500} className="mt-10 text-center sm:mt-12">
          <Button
            onClick={onApplyClick}
            className="bg-gtgs-navy px-8 py-5 text-sm font-bold text-white shadow-lg transition-all hover:bg-gtgs-blue hover:shadow-xl active:scale-[0.98] sm:px-10 sm:py-6 sm:text-base"
          >
            Apply Now
            <ArrowRight className="ml-2 size-4" aria-hidden="true" />
          </Button>
        </FadeInView>
      </div>
    </section>
  )
}
