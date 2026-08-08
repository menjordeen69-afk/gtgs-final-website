'use client'

import { Monitor, BookOpen, Scissors, UtensilsCrossed, Shirt, GraduationCap, Heart, ShieldCheck, TrendingUp, Users, HandCoins, Smartphone, Building, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import FadeInView from '@/components/ui/fade-in-view'

const DONATION_NEEDS = [
  { icon: Monitor, title: 'Computers & Laptops', target: 'Le 25,000,000', raised: 'Le 5,200,000', progress: 21, desc: 'Desktop computers and laptops for the ICT lab to help students gain digital skills.' },
  { icon: BookOpen, title: 'Learning Materials', target: 'Le 8,000,000', raised: 'Le 3,100,000', progress: 39, desc: 'Textbooks, workbooks, and digital resources for all seven departments.' },
  { icon: Scissors, title: 'Beauty Equipment', target: 'Le 6,500,000', raised: 'Le 1,800,000', progress: 28, desc: 'Professional cosmetology tools, skincare products, and hair dressing supplies.' },
  { icon: UtensilsCrossed, title: 'Catering Tools', target: 'Le 10,000,000', raised: 'Le 4,500,000', progress: 45, desc: 'Kitchen equipment, cookware, and food supplies for catering training.' },
  { icon: Shirt, title: 'Sewing & Dyeing Kits', target: 'Le 4,000,000', raised: 'Le 1,200,000', progress: 30, desc: 'Fabrics, dyes, sewing machines, and textile tools for Gara Tie-Dye.' },
  { icon: GraduationCap, title: 'Student Scholarships', target: 'Le 15,000,000', raised: 'Le 6,000,000', progress: 40, desc: 'Financial support for students who cannot afford tuition.' },
] as const

const IMPACT_STATS = [
  { value: '68M+', label: 'Total Target (Le)', icon: TrendingUp },
  { value: '150+', label: 'Students Impacted', icon: Users },
  { value: '6', label: 'Funding Categories', icon: HandCoins },
  { value: '100%', label: 'Goes to Students', icon: ShieldCheck },
] as const

const PAYMENT_METHODS = [
  {
    name: 'Orange Money',
    number: '076 000 000',
    nameLabel: 'Account Name',
    accountName: 'GTGS Institution',
    icon: Smartphone,
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-700',
    instructions: 'Dial *144#, select Send Money, enter the number and amount.',
  },
  {
    name: 'Afrimoney',
    number: '078 000 000',
    nameLabel: 'Account Name',
    accountName: 'GTGS Institution',
    icon: Smartphone,
    color: 'from-blue-600 to-blue-700',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    instructions: 'Dial *161#, select Transfer, enter the number and amount.',
  },
  {
    name: 'Bank Transfer',
    number: '003 001 2345 01',
    nameLabel: 'Account Name',
    accountName: 'Global Technology & General Services',
    icon: Building,
    color: 'from-gtgs-navy to-gtgs-blue',
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-700',
    bankName: 'Sierra Leone Commercial Bank',
    instructions: 'Visit any branch or use your bank\'s mobile app to transfer.',
  },
  {
    name: 'Cashless Payment',
    number: 'Coming Soon',
    nameLabel: '',
    accountName: '',
    icon: Zap,
    color: 'from-emerald-500 to-emerald-600',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-700',
    instructions: 'We are working to bring you seamless digital payment options. Stay tuned!',
    soon: true,
  },
] as const

export default function Donation() {
  return (
    <section
      id="donation"
      className="relative overflow-hidden bg-gradient-to-br from-gtgs-navy via-[oklch(0.22 0.1 250)] to-gtgs-navy px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:py-28"
      aria-label="Support GTGS"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="animate-float absolute left-[3%] top-[12%] h-20 w-20 rounded-full bg-gtgs-gold/5 sm:h-32 sm:w-32" />
        <div className="animate-float-reverse absolute bottom-[10%] right-[5%] h-16 w-16 rounded-xl bg-white/5 sm:h-28 sm:w-28" />
        <div className="animate-float-slow absolute left-[40%] top-[60%] h-12 w-12 rounded-full bg-gtgs-blue/8" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <FadeInView className="mb-12 text-center sm:mb-14 md:mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gtgs-gold/30 bg-gtgs-gold/10 px-4 py-1.5">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-gtgs-gold opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-gtgs-gold" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-gtgs-gold sm:text-xs">Support Our Mission</span>
          </div>
          <div className="mb-3 flex items-center justify-center gap-2 sm:mb-4">
            <Heart className="size-5 text-gtgs-gold sm:size-6" aria-hidden="true" />
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl md:text-4xl lg:text-5xl">
              Invest in Sierra Leone&apos;s Future
            </h2>
          </div>
          <div className="mx-auto mb-3 h-1 w-12 rounded-full bg-gtgs-gold sm:w-16" aria-hidden="true" />
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base md:text-lg">
            Your contribution directly equips young Sierra Leoneans with practical skills,
            professional certification, and the confidence to build a better future.
            Every Leone counts.
          </p>
        </FadeInView>

        {/* Impact Stats Bar */}
        <FadeInView delay={50} className="mb-12 sm:mb-14 md:mb-16">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {IMPACT_STATS.map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="rounded-xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm sm:p-5">
                  <Icon className="mx-auto mb-2 size-5 text-gtgs-gold sm:size-6" aria-hidden="true" />
                  <p className="text-xl font-extrabold text-white sm:text-2xl md:text-3xl">{stat.value}</p>
                  <p className="mt-0.5 text-[11px] font-medium text-white/60 sm:text-xs">{stat.label}</p>
                </div>
              )
            })}
          </div>
        </FadeInView>

        {/* Funding Needs with Progress Bars */}
        <FadeInView className="mb-12 sm:mb-14 md:mb-16">
          <h3 className="mb-6 text-center text-lg font-bold text-white sm:mb-8 sm:text-xl md:text-2xl">
            What We Need
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:gap-6 lg:grid-cols-3">
            {DONATION_NEEDS.map((item, index) => {
              const Icon = item.icon
              return (
                <FadeInView key={item.title} delay={index * 40}>
                  <div className="glass rounded-xl p-5 transition-all duration-300 hover:bg-white/15 sm:p-6">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gtgs-gold/15 text-gtgs-gold sm:size-11">
                        <Icon className="size-5 sm:size-6" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-white sm:text-base">{item.title}</h4>
                        <p className="text-[11px] text-white/50 sm:text-xs">{item.desc}</p>
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div className="mt-4">
                      <div className="mb-1.5 flex items-center justify-between text-xs">
                        <span className="font-semibold text-gtgs-gold">{item.raised} raised</span>
                        <span className="text-white/50">of {item.target}</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-gtgs-gold to-gtgs-gold-light transition-all duration-1000"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                      <p className="mt-1 text-right text-[11px] font-semibold text-white/60">{item.progress}%</p>
                    </div>
                  </div>
                </FadeInView>
              )
            })}
          </div>
        </FadeInView>

        {/* Payment Methods Section */}
        <FadeInView className="mb-12 sm:mb-14 md:mb-16">
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-lg font-bold text-white sm:text-xl md:text-2xl">How to Donate</h3>
            <p className="mt-2 text-xs text-white/60 sm:text-sm">Choose any of these convenient local payment methods.</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:gap-6 lg:grid-cols-4">
            {PAYMENT_METHODS.map((method, index) => {
              const Icon = method.icon
              return (
                <FadeInView key={method.name} delay={index * 60}>
                  <div className={`relative rounded-xl border p-5 transition-all duration-300 ${method.soon ? 'border-white/10 bg-white/5 opacity-70' : 'border-white/10 bg-white/8 hover:border-gtgs-gold/30 hover:bg-white/12'}`}>
                    {method.soon && (
                      <span className="absolute -top-2.5 right-3 rounded-full bg-emerald-500 px-2.5 py-0.5 text-[10px] font-bold text-white sm:text-xs">Coming Soon</span>
                    )}
                    <div className={`mb-3 flex size-11 items-center justify-center rounded-xl bg-gradient-to-br ${method.color} text-white sm:size-12`}>
                      <Icon className="size-5 sm:size-6" aria-hidden="true" />
                    </div>
                    <h4 className={`text-base font-bold ${method.soon ? 'text-white/70' : 'text-white'}`}>{method.name}</h4>
                    {'bankName' in method && method.bankName && (
                      <p className="mt-0.5 text-[11px] text-white/50">{method.bankName}</p>
                    )}
                    {!method.soon && (
                      <div className={`mt-3 rounded-lg ${method.bgColor} p-3`}>
                        <p className={`text-[10px] font-medium ${method.textColor} uppercase tracking-wider`}>Number</p>
                        <p className={`mt-0.5 text-base font-bold ${method.textColor} sm:text-lg`}>{method.number}</p>
                        {method.accountName && (
                          <>
                            <p className={`mt-2 text-[10px] font-medium ${method.textColor} uppercase tracking-wider`}>{method.nameLabel}</p>
                            <p className={`mt-0.5 text-xs font-semibold ${method.textColor}`}>{method.accountName}</p>
                          </>
                        )}
                      </div>
                    )}
                    <p className="mt-3 text-[11px] leading-relaxed text-white/50 sm:text-xs">{method.instructions}</p>
                  </div>
                </FadeInView>
              )
            })}
          </div>
        </FadeInView>

        {/* CTA */}
        <FadeInView delay={200}>
          <div className="mx-auto max-w-xl rounded-2xl border border-gtgs-gold/20 bg-gradient-to-br from-gtgs-gold/10 to-transparent p-6 text-center backdrop-blur-sm sm:p-8 md:p-10">
            <HandCoins className="mx-auto mb-3 size-10 text-gtgs-gold sm:mb-4 sm:size-12" aria-hidden="true" />
            <h3 className="mb-2 text-xl font-bold text-white sm:text-2xl md:text-3xl">Every Contribution Matters</h3>
            <p className="mb-6 text-sm leading-relaxed text-white/70 sm:text-base">
              Whether you donate Le 10,000 or Le 10,000,000, your support
              directly transforms the life of a young person in Sierra Leone.
              Together, we can build a skilled nation.
            </p>
            <Button
              size="lg"
              className="w-full bg-gtgs-gold px-8 py-6 text-base font-bold text-gtgs-navy shadow-lg shadow-gtgs-gold/25 transition-all hover:bg-gtgs-gold-light hover:shadow-xl hover:shadow-gtgs-gold/30 sm:text-lg"
              asChild
            >
              <a href="mailto:globaltechnologyandgeneralserv@gmail.com?subject=Donation%20Inquiry%20-%20GTGS%20Support">
                Contact Us to Donate
              </a>
            </Button>
            <p className="mt-4 text-[11px] text-white/40 sm:text-xs">
              After making your donation, send us a confirmation email or WhatsApp message
              so we can properly acknowledge your support.
            </p>
          </div>
        </FadeInView>
      </div>
    </section>
  )
}
