'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import AboutSection from '@/components/gtgs/AboutSection'
import Navbar from '@/components/gtgs/Navbar'
import HeroSection from '@/components/gtgs/HeroSection'
import StatisticsSection from '@/components/gtgs/StatisticsSection'
import WhyChooseGTGS from '@/components/gtgs/WhyChooseGTGS'
import Departments from '@/components/gtgs/Departments'
import CoursesOffered from '@/components/gtgs/CoursesOffered'
import Facilities from '@/components/gtgs/Facilities'
import StudentLife from '@/components/gtgs/StudentLife'
import OurTeam from '@/components/gtgs/OurTeam'
import LivePracticals from '@/components/gtgs/LivePracticals'
import AdmissionPortal from '@/components/gtgs/AdmissionPortal'
import FAQ from '@/components/gtgs/FAQ'
import Announcements from '@/components/gtgs/Announcements'
import Donation from '@/components/gtgs/Donation'
import Footer from '@/components/gtgs/Footer'

export default function Home() {
  const [showAdmission, setShowAdmission] = useState(false)

  // Lock body scroll when modal is open
  useEffect(() => {
    if (showAdmission) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [showAdmission])

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setShowAdmission(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navbar onApplyClick={() => setShowAdmission(true)} />
      <main>
        <HeroSection onApplyClick={() => setShowAdmission(true)} />
        <AboutSection />
        <StatisticsSection />
        <WhyChooseGTGS />
        <Departments />
        <CoursesOffered onApplyClick={() => setShowAdmission(true)} />
        <Facilities />
        <StudentLife />
        <LivePracticals />
        <OurTeam />
        <Announcements />
        <FAQ />
        <Donation />
      </main>
      <Footer />

      {/* Admission Modal Overlay */}
      {showAdmission && (
        <div
          className="modal-overlay fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-black/60 px-4 py-8 backdrop-blur-sm sm:py-12"
          onClick={() => setShowAdmission(false)}
        >
          <div
            className="modal-content relative w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowAdmission(false)}
              className="absolute -top-10 right-0 z-10 flex size-8 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white sm:-top-12"
              aria-label="Close application form"
            >
              <X className="size-4" />
            </button>
            <AdmissionPortal />
          </div>
        </div>
      )}
    </div>
  )
}
