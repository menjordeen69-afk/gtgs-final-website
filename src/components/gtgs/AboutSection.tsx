'use client'

import { Target, Eye, Heart, Award, BookOpen, Quote, GraduationCap, Briefcase, Shield, Globe, User, CheckCircle } from 'lucide-react'
import FadeInView from '@/components/ui/fade-in-view'

const ROLES = [
  { icon: GraduationCap, title: 'CEO & Founder', org: 'Global Technology & General Services (GTGS)' },
  { icon: Briefcase, title: 'Success Ambassador & Facilitator', org: 'Interweave Solutions — MBS Programme' },
  { icon: Shield, title: 'National Auditor III', org: 'TEVOC Council Sierra Leone' },
  { icon: Globe, title: 'National Director of ICT', org: 'Global Christian Chaplain Corps Sierra Leone' },
] as const

const VALUES = [
  { label: 'Excellence', desc: 'We pursue the highest standards in education and training.' },
  { label: 'Integrity', desc: 'Honesty, transparency, and accountability guide everything we do.' },
  { label: 'Innovation', desc: 'We embrace creativity and modern solutions to learning.' },
  { label: 'Discipline', desc: 'We instill self-discipline as the foundation of success.' },
  { label: 'Respect', desc: 'We treat every individual with dignity and fairness.' },
  { label: 'Teamwork', desc: 'We achieve more together than we ever could alone.' },
  { label: 'Service', desc: 'We exist to serve our students, community, and nation.' },
] as const

const MISSION_POINTS = [
  'To provide quality and affordable skills training.',
  'To empower individuals through practical education.',
  'To promote entrepreneurship and self-reliance.',
  'To develop ethical, disciplined, and productive citizens.',
  'To contribute to national development through workforce preparation and innovation.',
] as const

export default function AboutSection() {
  return (
    <section
      id="about"
      className="bg-white px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:py-28"
      aria-label="About GTGS"
    >
      <div className="mx-auto max-w-6xl">

        {/* ─── Section Header ─── */}
        <FadeInView className="mb-12 text-center sm:mb-16 md:mb-20">
          <h2 className="mb-3 text-3xl font-extrabold text-gtgs-navy sm:text-4xl md:text-5xl">
            About Us
          </h2>
          <div className="mx-auto mb-4 h-1 w-14 rounded-full bg-gtgs-gold sm:w-20" aria-hidden="true" />
          <p className="mx-auto max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
            Global Technology &amp; General Services (GTGS) was established with a clear vision of providing quality technical, vocational, and professional education that responds to the growing demand for practical skills in Sierra Leone and beyond.
          </p>
        </FadeInView>

        {/* ═══════════════════════════════════════════════
            1. CEO SPOTLIGHT — The Founder’s Story
           ═══════════════════════════════════════════════ */}
        <FadeInView delay={30} className="mb-16 sm:mb-20 md:mb-24">
          <div className="overflow-hidden rounded-2xl shadow-xl sm:rounded-3xl">
            <div className="grid lg:grid-cols-2">
              {/* Left: CEO Avatar Area */}
              <div className="relative flex items-center justify-center bg-gradient-to-br from-gtgs-navy to-gtgs-blue p-10 sm:p-14 lg:p-16">
                <div className="relative text-center">
                  <div className="absolute -inset-6 rounded-full bg-gtgs-gold/15 blur-3xl" aria-hidden="true" />
                  <div className="relative mx-auto flex size-44 items-center justify-center rounded-full bg-white/10 shadow-2xl ring-2 ring-gtgs-gold/30 sm:size-52 lg:size-60">
                    <User className="size-20 text-white/30 sm:size-24 lg:size-28" aria-hidden="true" />
                  </div>
                  <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-gtgs-gold/80 sm:text-sm">
                    Our Founder
                  </p>
                </div>
              </div>

              {/* Right: CEO Story */}
              <div className="flex flex-col justify-center bg-white p-8 sm:p-10 lg:p-12 xl:p-14">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-gtgs-gold sm:text-sm">
                  Chief Executive Officer
                </p>
                <h3 className="mb-5 text-2xl font-extrabold text-gtgs-navy sm:text-3xl lg:text-4xl">
                  Isaiah T. Mboma
                </h3>

                <div className="relative mb-6 rounded-xl border-l-[3px] border-gtgs-gold bg-gtgs-navy/[0.03] py-4 pl-5 pr-4">
                  <Quote className="absolute -left-4 -top-1.5 size-7 text-gtgs-gold/40" aria-hidden="true" />
                  <p className="relative text-sm italic leading-relaxed text-gtgs-navy/80 sm:text-base lg:text-lg">
                    &ldquo;Leadership is not measured by position but by the positive impact one makes in the lives of others.&rdquo;
                  </p>
                </div>

                <div className="space-y-4 text-sm leading-[1.8] text-muted-foreground sm:text-[15px]">
                  <p>
                    <span className="font-semibold text-gtgs-navy">Isaiah T. Mboma</span> is a Sierra Leonean educator, facilitator, technology enthusiast, and community development advocate passionate about empowering people through skills development, leadership, entrepreneurship, and service. He believes that meaningful transformation begins with education, discipline, integrity, and a commitment to helping others succeed.
                  </p>
                  <p>
                    His journey into technology began with studies in Computer Hardware Engineering and Computer Software, where he acquired hands-on expertise in ICT. Driven by a desire to strengthen his capacity in management and organizational systems, he advanced to earn a Bachelor of Science in Procurement, Warehousing, and Supply Chain Management through the Institute of Business Administration and Technology (IBATECH), affiliated with Ngala University.
                  </p>
                  <p>
                    Recognizing that many young people possess great potential but lack access to affordable skills training, Isaiah founded GTGS to bridge this gap — offering market-driven courses that prepare students for employment, entrepreneurship, and lifelong learning.
                  </p>
                  <p className="font-medium text-gtgs-navy">
                    His vision is to build institutions that develop skilled professionals, ethical leaders, and empowered entrepreneurs who can transform their communities and the nation of Sierra Leone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeInView>

        {/* ═══════════════════════════════════════════════
            2. LEADERSHIP & SERVICE — Alternating Card Grid
           ═══════════════════════════════════════════════ */}
        <FadeInView delay={50} className="mb-16 sm:mb-20 md:mb-24">
          <h3 className="mb-3 text-center text-xl font-extrabold text-gtgs-navy sm:text-2xl">
            Leadership &amp; Service
          </h3>
          <p className="mx-auto mb-8 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground sm:text-base">
            Beyond GTGS, Isaiah serves in several national and international capacities, contributing to governance, education, and community development across Sierra Leone.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
            {ROLES.map((role, index) => {
              const Icon = role.icon
              const isEven = index % 2 === 0
              return (
                <div
                  key={role.title}
                  className={`group rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-7 ${
                    isEven ? 'bg-white' : 'bg-gtgs-navy/[0.03]'
                  }`}
                >
                  <div className={`mb-4 inline-flex size-12 items-center justify-center rounded-xl transition-colors sm:size-13 ${
                    isEven
                      ? 'bg-gtgs-navy/5 text-gtgs-navy group-hover:bg-gtgs-navy group-hover:text-white'
                      : 'bg-gtgs-gold/10 text-gtgs-gold group-hover:bg-gtgs-gold group-hover:text-white'
                  }`}>
                    <Icon className="size-6" aria-hidden="true" />
                  </div>
                  <p className={`mb-1.5 text-base font-bold sm:text-lg ${
                    isEven ? 'text-gtgs-navy' : 'text-gtgs-navy'
                  }`}>
                    {role.title}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {role.org}
                  </p>
                </div>
              )
            })}
          </div>
        </FadeInView>

        {/* ═══════════════════════════════════════════════
            3. HISTORY OF GTGS — Story Block
           ═══════════════════════════════════════════════ */}
        <FadeInView delay={60} className="mb-16 sm:mb-20 md:mb-24">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left: Image Area */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gtgs-navy/5 to-gtgs-blue/5 p-8 sm:p-10 lg:p-12">
              <div className="absolute -bottom-8 -right-8 size-48 rounded-full bg-gtgs-gold/10 blur-2xl" aria-hidden="true" />
              <div className="relative grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center justify-center rounded-xl bg-white p-5 shadow-md sm:p-6">
                  <BookOpen className="mb-2 size-8 text-gtgs-navy" aria-hidden="true" />
                  <span className="text-2xl font-extrabold text-gtgs-navy sm:text-3xl">7</span>
                  <span className="text-xs font-medium text-muted-foreground sm:text-sm">Departments</span>
                </div>
                <div className="flex flex-col items-center justify-center rounded-xl bg-white p-5 shadow-md sm:p-6">
                  <Award className="mb-2 size-8 text-gtgs-gold" aria-hidden="true" />
                  <span className="text-2xl font-extrabold text-gtgs-navy sm:text-3xl">100%</span>
                  <span className="text-xs font-medium text-muted-foreground sm:text-sm">Practical</span>
                </div>
                <div className="flex flex-col items-center justify-center rounded-xl bg-white p-5 shadow-md sm:p-6">
                  <GraduationCap className="mb-2 size-8 text-gtgs-blue" aria-hidden="true" />
                  <span className="text-2xl font-extrabold text-gtgs-navy sm:text-3xl">Cert.</span>
                  <span className="text-xs font-medium text-muted-foreground sm:text-sm">Professional</span>
                </div>
                <div className="flex flex-col items-center justify-center rounded-xl bg-white p-5 shadow-md sm:p-6">
                  <Heart className="mb-2 size-8 text-red-400" aria-hidden="true" />
                  <span className="text-2xl font-extrabold text-gtgs-navy sm:text-3xl">All</span>
                  <span className="text-xs font-medium text-muted-foreground sm:text-sm">Welcome</span>
                </div>
              </div>
            </div>

            {/* Right: History Text */}
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-gtgs-gold sm:text-sm">
                Our Story
              </p>
              <h3 className="mb-5 text-xl font-extrabold text-gtgs-navy sm:text-2xl lg:text-3xl">
                History of Global Technology<br className="hidden sm:inline" /> and General Services
              </h3>
              <div className="space-y-4 text-sm leading-[1.8] text-muted-foreground sm:text-[15px]">
                <p>
                  Global Technology and General Services (GTGS) was established with a clear vision of providing quality technical, vocational, and professional education that responds to the growing demand for practical skills in Sierra Leone and beyond.
                </p>
                <p>
                  Recognizing that many young people possess great potential but lack access to affordable skills training, GTGS was founded to bridge this gap by offering market-driven courses that prepare students for employment, entrepreneurship, and lifelong learning.
                </p>
                <p>
                  Since its establishment, the institution has remained committed to producing skilled, disciplined, innovative, and responsible graduates capable of contributing meaningfully to national development.
                </p>
                <p>
                  Today, GTGS continues to expand its programmes, strengthen partnerships, and maintain high standards in teaching, practical training, and student development.
                </p>
              </div>
            </div>
          </div>
        </FadeInView>

        {/* ═══════════════════════════════════════════════
            4. VISION — Full-width Statement
           ═══════════════════════════════════════════════ */}
        <FadeInView delay={70} className="mb-16 sm:mb-20 md:mb-24">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gtgs-navy via-gtgs-navy to-gtgs-blue px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
            <div className="absolute -top-16 -right-16 size-64 rounded-full bg-gtgs-gold/10 blur-3xl" aria-hidden="true" />
            <div className="absolute -bottom-12 -left-12 size-48 rounded-full bg-white/5 blur-3xl" aria-hidden="true" />
            <div className="relative mx-auto max-w-3xl text-center">
              <div className="mb-5 inline-flex items-center justify-center size-14 rounded-2xl bg-gtgs-gold/15 sm:size-16">
                <Eye className="size-7 text-gtgs-gold sm:size-8" aria-hidden="true" />
              </div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gtgs-gold sm:text-sm">
                Our Vision
              </p>
              <p className="text-lg font-semibold leading-relaxed text-white sm:text-xl lg:text-2xl lg:leading-[1.7]">
                To become a leading institution of excellence in technical, vocational, entrepreneurship, and professional education, producing competent graduates who transform society through innovation, creativity, and practical skills.
              </p>
            </div>
          </div>
        </FadeInView>

        {/* ═══════════════════════════════════════════════
            5. MISSION — Card with Bullet Points
           ═══════════════════════════════════════════════ */}
        <FadeInView delay={80} className="mb-16 sm:mb-20 md:mb-24">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left: Mission Text */}
            <div className="order-2 lg:order-1">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-gtgs-gold sm:text-sm">
                Our Mission
              </p>
              <h3 className="mb-5 text-xl font-extrabold text-gtgs-navy sm:text-2xl lg:text-3xl">
                What We Are Called to Do
              </h3>
              <ul className="space-y-4">
                {MISSION_POINTS.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-gtgs-gold/15">
                      <CheckCircle className="size-3.5 text-gtgs-gold" aria-hidden="true" />
                    </div>
                    <span className="text-sm leading-relaxed text-muted-foreground sm:text-[15px]">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Visual / Image Area */}
            <div className="relative order-1 overflow-hidden rounded-2xl bg-gtgs-navy p-8 sm:p-10 lg:order-2 lg:p-12">
              <div className="absolute -top-10 -right-10 size-40 rounded-full bg-gtgs-gold/10 blur-2xl" aria-hidden="true" />
              <div className="relative text-center">
                <div className="mb-6 inline-flex items-center justify-center size-16 rounded-2xl bg-white/10 sm:size-20">
                  <Target className="size-8 text-white sm:size-10" aria-hidden="true" />
                </div>
                <p className="text-lg font-bold text-white sm:text-xl">
                  Empowering People.<br />Transforming Lives.<br />Building the Future.
                </p>
                <div className="mx-auto mt-6 h-0.5 w-16 rounded-full bg-gtgs-gold" aria-hidden="true" />
                <p className="mt-4 text-sm leading-relaxed text-white/60">
                  Every programme we offer is designed with one goal: to give our students the practical skills and confidence they need to succeed.
                </p>
              </div>
            </div>
          </div>
        </FadeInView>

        {/* ═══════════════════════════════════════════════
            6. CORE VALUES — Navy Card Grid
           ═══════════════════════════════════════════════ */}
        <FadeInView delay={90}>
          <div className="overflow-hidden rounded-2xl border bg-gradient-to-br from-gtgs-navy to-gtgs-blue p-6 sm:p-8 lg:p-10">
            <div className="mb-8 text-center">
              <div className="mb-4 inline-flex items-center justify-center size-12 rounded-xl bg-gtgs-gold/15">
                <Heart className="size-6 text-gtgs-gold" aria-hidden="true" />
              </div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-gtgs-gold sm:text-sm">
                What We Stand For
              </p>
              <h3 className="text-xl font-extrabold text-white sm:text-2xl">
                Institutional Values
              </h3>
              <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
                At Global Technology and General Services, we believe that success is built on strong values.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
              {VALUES.map((value, index) => (
                <div
                  key={index}
                  className="group rounded-xl border border-white/10 bg-white/[0.06] px-5 py-4 transition-all duration-300 hover:bg-white/10 sm:px-6 sm:py-5"
                >
                  <div className="mb-2 flex items-center gap-2.5">
                    <span className="flex size-2 rounded-full bg-gtgs-gold" aria-hidden="true" />
                    <span className="text-sm font-bold text-white sm:text-base">{value.label}</span>
                  </div>
                  <p className="pl-[18px] text-xs leading-relaxed text-white/50 sm:text-sm">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeInView>

      </div>
    </section>
  )
}
