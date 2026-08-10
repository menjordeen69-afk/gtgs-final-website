'use client'

import { UtensilsCrossed, Scissors, Camera, Play } from 'lucide-react'
import FadeInView from '@/components/ui/fade-in-view'

const VIDEOS = [
  {
    department: 'Catering & Hospitality',
    icon: UtensilsCrossed,
    description: 'Students gain real-world culinary experience through hands-on food preparation, event catering, and professional kitchen training.',
    video: '/practicals/catering-video.mp4',
  },
  {
    department: 'Cosmetology & Beauty',
    icon: Scissors,
    description: 'Practical training in hairdressing, beauty therapy, and makeup artistry using professional tools and real clients.',
    video: null,
  },
]

export default function LivePracticals() {
  return (
    <section
      id="practicals"
      className="relative overflow-hidden bg-gradient-to-b from-gtgs-navy to-[oklch(0.18_0.06_250)] px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:py-28"
      aria-label="Live Practicals at GTGS"
    >
      {/* Decorative orbs */}
      <div className="pointer-events-none absolute top-20 left-10 -z-10 h-64 w-64 rounded-full bg-gtgs-gold/5 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-20 right-10 -z-10 h-80 w-80 rounded-full bg-gtgs-blue/5 blur-3xl" aria-hidden="true" />

      <div className="mx-auto max-w-7xl">
        <FadeInView className="mb-12 text-center sm:mb-16">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-gtgs-gold/15 px-4 py-1.5">
            <Camera className="size-3.5 text-gtgs-gold" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-wider text-gtgs-gold sm:text-sm">
              Real Training, Real Results
            </span>
          </div>
          <h2 className="mb-3 text-2xl font-extrabold text-white sm:text-3xl md:text-4xl lg:text-5xl">
            Live Practicals
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base md:text-lg">
            At GTGS, we believe in learning by doing. Our students spend the majority of their time
            in hands-on practical sessions, building real skills they can use immediately in the workplace.
          </p>
        </FadeInView>

        <div className="space-y-16 sm:space-y-20">
          {VIDEOS.map((section, sectionIdx) => {
            const Icon = section.icon
            return (
              <FadeInView key={section.department} delay={sectionIdx * 150}>
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-12">
                  {/* Text side */}
                  <div className="lg:w-1/3">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2">
                      <Icon className="size-4 text-gtgs-gold" aria-hidden="true" />
                      <span className="text-sm font-bold text-white">{section.department}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-white/60 sm:text-base">
                      {section.description}
                    </p>
                  </div>

                  {/* Video / Placeholder */}
                  <div className="lg:w-2/3">
                    {section.video ? (
                      <div className="relative overflow-hidden rounded-2xl bg-white/5 shadow-2xl">
                        <video
                          controls
                          preload="metadata"
                          poster=""
                          className="aspect-video w-full object-cover"
                          playsInline
                        >
                          <source src={section.video} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    ) : (
                      <div className="flex aspect-video items-center justify-center rounded-2xl border-2 border-dashed border-white/10 bg-white/5">
                        <div className="text-center">
                          <Camera className="mx-auto mb-2 size-8 text-white/20" aria-hidden="true" />
                          <p className="text-sm text-white/30">More practical videos coming soon</p>
                        </div>
                      </div>
                    )}
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
