'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import FadeInView from '@/components/ui/fade-in-view'

const FAQS = [
  {
    question: 'Do I need previous experience?',
    answer: 'No. All beginners are welcome at GTGS. Our courses are designed to take you from foundational skills to professional competence, regardless of your starting point.',
  },
  {
    question: 'Do I receive a certificate?',
    answer: 'Yes. Students receive a professional certificate after successfully completing their course. This certificate is recognised and can support your career or business applications.',
  },
  {
    question: 'Are practical classes included?',
    answer: 'Yes. Practical learning is the foundation of GTGS. Every course includes hands-on projects, real-world assignments, and practical sessions that build genuine skills.',
  },
  {
    question: 'Can I study while working?',
    answer: 'Yes. GTGS offers flexible learning schedules designed to accommodate working professionals, entrepreneurs, and anyone with other commitments.',
  },
  {
    question: 'Can I register online?',
    answer: 'Yes. Students can apply directly through our website. Simply fill out the admission form and our team will guide you through the next steps.',
  },
  {
    question: 'Who can attend GTGS?',
    answer: 'GTGS welcomes school leavers, university students, job seekers, entrepreneurs, working professionals, women empowerment groups, and youth organisations. Everyone is welcome.',
  },
  {
    question: 'What facilities does GTGS have?',
    answer: 'GTGS is equipped with practical training classrooms, an ICT laboratory, a beauty practical room, a catering training area, a project workshop, a student waiting area, and administrative offices.',
  },
] as const

export default function FAQ() {
  return (
    <section
      id="faq"
      className="bg-muted/40 px-4 py-10 sm:px-6 sm:py-14 md:py-16 lg:py-20"
      aria-label="Frequently Asked Questions"
    >
      <div className="mx-auto max-w-3xl">
        <FadeInView className="mb-6 text-center sm:mb-8 md:mb-10 lg:mb-12">
          <h2 className="mb-2 text-xl font-extrabold text-gtgs-navy sm:text-2xl md:text-3xl lg:text-4xl">
            Frequently Asked Questions
          </h2>
          <div className="mx-auto mb-2.5 h-1 w-12 rounded-full bg-gtgs-gold sm:mb-3 sm:w-16" aria-hidden="true" />
          <p className="mx-auto max-w-sm text-xs text-muted-foreground sm:max-w-md sm:text-sm md:text-base">
            Find answers to common questions about studying at GTGS.
          </p>
        </FadeInView>

        <FadeInView delay={100}>
          <Accordion type="single" collapsible className="rounded-xl bg-white p-3 shadow-sm sm:rounded-2xl sm:p-5 md:p-6">
            {FAQS.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-xs font-semibold text-gtgs-navy hover:no-underline sm:text-sm">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[11px] leading-relaxed text-muted-foreground sm:text-sm">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeInView>
      </div>
    </section>
  )
}
