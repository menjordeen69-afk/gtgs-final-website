'use client'

import { Target, Eye, Heart, Award, BookOpen, Quote, GraduationCap, Briefcase, Shield, Globe, User } from 'lucide-react'
import FadeInView from '@/components/ui/fade-in-view'

const ROLES = [
  { icon: GraduationCap, title: 'CEO & Founder', org: 'Global Technology & General Services (GTGS)' },
  { icon: Briefcase, title: 'Success Ambassador & Facilitator', org: 'Interweave Solutions — MBS Programme' },
  { icon: Shield, title: 'National Auditor III', org: 'TEVOC Council Sierra Leone' },
  { icon: Globe, title: 'National Director of ICT', org: 'Global Christian Chaplain Corps Sierra Leone' },
] as const

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
            About Us
          </h2>
          <div className="mx-auto mb-3 h-1 w-12 rounded-full bg-gtgs-gold sm:w-16" aria-hidden="true" />
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
            Led by a vision of transformation, GTGS was founded to empower Sierra Leoneans
            with the practical skills they need to build a better future.
          </p>
        </FadeInView>

        {/* ─── CEO Spotlight ─── */}
        <FadeInView delay={30} className="mb-12 sm:mb-16">
          <div className="overflow-hidden rounded-2xl border bg-gradient-to-br from-gtgs-navy via-gtgs-navy to-gtgs-blue shadow-xl">
            <div className="grid lg:grid-cols-5">
              {/* CEO Photo / Avatar */}
              <div className="relative flex items-center justify-center bg-gradient-to-br from-gtgs-navy to-gtgs-blue p-8 lg:col-span-2 lg:p-12">
                <div className="relative">
                  <div className="absolute -inset-3 rounded-full bg-gtgs-gold/20 blur-2xl" aria-hidden="true" />
                  <div className="relative flex size-40 items-center justify-center rounded-full bg-white/10 shadow-2xl ring-2 ring-gtgs-gold/30 sm:size-48 lg:size-56">
                    <User className="size-20 text-white/40 sm:size-24 lg:size-28" aria-hidden="true" />
                  </div>
                </div>
              </div>

              {/* CEO Info */}
              <div className="flex flex-col justify-center p-6 sm:p-8 lg:col-span-3 lg:p-10 xl:p-12">
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-gtgs-gold sm:text-sm">
                  Founder & Chief Executive Officer
                </p>
                <h3 className="mb-4 text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl">
                  Isaiah T. Mboma
                </h3>

                <div className="relative mb-6 rounded-xl border-l-2 border-gtgs-gold bg-white/5 py-4 pl-5 pr-4">
                  <Quote className="absolute -left-3 -top-2 size-6 text-gtgs-gold/60" aria-hidden="true" />
                  <p className="relative text-sm italic leading-relaxed text-white/80 sm:text-base lg:text-lg">
                    &ldquo;Leadership is not measured by position but by the positive impact
                    one makes in the lives of others.&rdquo;
                  </p>
                </div>

                <div className="space-y-3 text-sm leading-relaxed text-white/70 sm:text-[15px]">
                  <p>
                    Isaiah T. Mboma is a Sierra Leonean educator, facilitator, technology enthusiast,
                    and community development advocate passionate about empowering people through
                    skills development, leadership, entrepreneurship, and service. He believes that
                    meaningful transformation begins with education, discipline, integrity, and a
                    commitment to helping others succeed.
                  </p>
                  <p>
                    His journey into technology began with studies in Computer Hardware Engineering
                    and Computer Software, where he acquired hands-on expertise in ICT. Driven by a
                    desire to strengthen his capacity in management and organizational systems, he
                    advanced to earn a Bachelor of Science in Procurement, Warehousing, and Supply
                    Chain Management through the Institute of Business Administration and Technology
                    (IBATECH), affiliated with Ngala University.
                  </p>
                  <p>
                    His vision is clear: to build institutions that develop skilled professionals,
                    ethical leaders, and empowered entrepreneurs who can transform their communities
                    and the nation of Sierra Leone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeInView>

        {/* ─── Leadership & Roles ─── */}
        <FadeInView delay={50} className="mb-12 sm:mb-16">
          <h3 className="mb-6 text-center text-lg font-bold text-gtgs-navy sm:text-xl">
            Leadership &amp; Service
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4">
            {ROLES.map((role) => {
              const Icon = role.icon
              return (
                <div
                  key={role.title}
                  className="group rounded-xl border bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-5"
                >
                  <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-gtgs-navy/5 text-gtgs-navy transition-colors group-hover:bg-gtgs-navy group-hover:text-white sm:size-11">
                    <Icon className="size-5 sm:size-5" aria-hidden="true" />
                  </div>
                  <p className="text-sm font-bold text-gtgs-navy sm:text-base">{role.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">{role.org}</p>
                </div>
              )
            })}
          </div>
        </FadeInView>

        {/* ─── Quick Facts Bar ─── */}
        <FadeInView delay={60} className="mb-12 sm:mb-16">
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

        {/* ─── Institution Mission & Vision ─── */}
        <FadeInView delay={80} className="mb-10 sm:mb-12">
          <h3 className="mb-6 text-center text-lg font-bold text-gtgs-navy sm:text-xl">
            The Institution
          </h3>
        </FadeInView>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Mission & Vision */}
          <div className="space-y-6">
            <FadeInView delay={90}>
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

            <FadeInView delay={110}>
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
          <FadeInView delay={130}>
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
