'use client'

import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, CheckCircle, Loader2, Upload, X, ChevronLeft, ChevronRight, FileText, User, GraduationCap, Paperclip } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'

const DEPARTMENTS = ['ICT', 'Graphic Design', 'Entrepreneurship', 'Catering', 'Cosmetology', 'Soap Making', 'Gara Tie-Dye']
const EXPERIENCE_LEVELS = ['No Experience', 'Beginner (less than 1 year)', 'Intermediate (1-3 years)', 'Advanced (3+ years)']

const DOCUMENT_TYPES = [
  { key: 'nationalId', label: 'National ID / Passport', required: true },
  { key: 'wassce', label: 'WASSCE / Academic Certificate', required: true },
  { key: 'birthCert', label: 'Birth Certificate', required: false },
  { key: 'passportPhoto', label: 'Passport Photograph', required: true },
  { key: 'otherDoc', label: 'Other Supporting Document', required: false },
]

const applicationSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  gmail: z.string()
    .min(1, 'Gmail address is required')
    .refine((val) => val.endsWith('@gmail.com'), 'Please enter a valid Gmail address (must end with @gmail.com)')
    .email('Please enter a valid email format'),
  phoneNumber: z.string().min(6, 'Phone number is required'),
  gender: z.string().min(1, 'Please select your gender'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  residentialAddress: z.string().min(3, 'Residential address is required'),
  department: z.string().min(1, 'Please select a department'),
  experienceLevel: z.string().optional(),
  personalStatement: z.string().optional(),
})

type ApplicationForm = z.infer<typeof applicationSchema>

interface UploadedFile {
  key: string
  file: File
  preview?: string
}

const STEPS = [
  { label: 'Personal Info', icon: User },
  { label: 'Programme', icon: GraduationCap },
  { label: 'Documents', icon: Paperclip },
]

export default function AdmissionPortal() {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [files, setFiles] = useState<UploadedFile[]>([])
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  const { register, handleSubmit, setValue, watch, reset, trigger, formState: { errors } } = useForm<ApplicationForm>({ resolver: zodResolver(applicationSchema), mode: 'onChange' })

  const selectedDepartment = watch('department')

  function handleFileChange(docKey: string, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      setError(`${file.name} is too large. Max 5MB per file.`)
      return
    }
    setFiles((prev) => {
      const filtered = prev.filter((f) => f.key !== docKey)
      const preview = file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
      return [...filtered, { key: docKey, file, preview }]
    })
    setError('')
  }

  function removeFile(docKey: string) {
    setFiles((prev) => prev.filter((f) => f.key !== docKey))
    const input = fileInputRefs.current[docKey]
    if (input) input.value = ''
  }

  async function onNextStep() {
    let valid = false
    if (step === 0) {
      valid = await trigger(['fullName', 'gmail', 'phoneNumber', 'gender', 'dateOfBirth', 'residentialAddress'])
    } else if (step === 1) {
      valid = await trigger(['department'])
    } else {
      return
    }
    if (valid) {
      setStep((s) => s + 1)
      setError('')
    }
  }

  async function onSubmit(data: ApplicationForm) {
    const requiredDocs = DOCUMENT_TYPES.filter((d) => d.required)
    const missing = requiredDocs.filter((d) => !files.find((f) => f.key === d.key))
    if (missing.length > 0) {
      setError(`Please upload: ${missing.map((d) => d.label).join(', ')}`)
      return
    }

    setLoading(true)
    setError('')
    try {
      const formData = new FormData()
      formData.append('data', JSON.stringify({ ...data, email: data.gmail }))
      files.forEach((f) => formData.append(f.key, f.file))

      const res = await fetch('/api/applications', {
        method: 'POST',
        body: formData,
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Submission failed')
      setSubmitted(true)
      reset()
      setFiles([])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg rounded-2xl bg-white p-8 text-center shadow-2xl sm:p-10">
        <div className="mx-auto mb-5 flex size-20 items-center justify-center rounded-full bg-emerald-50 shadow-inner">
          <CheckCircle className="size-10 text-emerald-500" />
        </div>
        <h3 className="text-2xl font-extrabold text-gtgs-navy">Application Submitted!</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Thank you for applying to GTGS. We have received your application and supporting documents. Our admissions team will review everything and contact you within 5-7 business days.
        </p>
        <Button className="mt-8 bg-gtgs-gold text-gtgs-navy hover:bg-gtgs-gold-light" onClick={() => { setSubmitted(false); setStep(0) }}>
          Submit Another Application
        </Button>
      </div>
    )
  }

  return (
    <Card className="border-0 shadow-2xl">
      {/* Header */}
      <div className="border-b bg-gradient-to-r from-gtgs-navy to-gtgs-blue px-6 py-4 sm:px-8">
        <h2 className="text-lg font-bold text-white sm:text-xl">Admission Portal</h2>
        <p className="mt-0.5 text-xs text-white/60 sm:text-sm">
          Complete the form below to apply. <span className="text-gtgs-gold-light">*</span> = required
        </p>
      </div>

      {/* Step indicator */}
      <div className="border-b px-6 py-3 sm:px-8">
        <div className="flex items-center justify-between">
          {STEPS.map((s, i) => {
            const Icon = s.icon
            const isActive = i <= step
            const isCurrent = i === step
            return (
              <div key={s.label} className="flex items-center gap-2">
                <div className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold transition-all sm:text-sm ${isCurrent ? 'bg-gtgs-navy text-white shadow-md' : isActive ? 'bg-gtgs-gold/20 text-gtgs-navy' : 'bg-muted text-muted-foreground'}`}>
                  <Icon className="size-3.5" aria-hidden="true" />
                  <span className="hidden sm:inline">{s.label}</span>
                  <span className="sm:hidden">{i + 1}</span>
                </div>
                {i < STEPS.length - 1 && <div className={`mx-1 h-px w-6 sm:w-10 md:w-16 ${i < step ? 'bg-gtgs-gold' : 'bg-border'}`} />}
              </div>
            )
          })}
        </div>
      </div>

      <CardContent className="p-6 sm:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Step 0: Personal Information */}
                {step === 0 && (
                  <div className="space-y-5">
                    <div>
                      <h3 className="mb-1 text-base font-bold text-gtgs-navy sm:text-lg">Personal Information</h3>
                      <p className="text-xs text-muted-foreground sm:text-sm">Tell us about yourself.</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium">Full Name <span className="text-red-500">*</span></label>
                        <Input placeholder="John Kamara" {...register('fullName')} />
                        {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName.message}</p>}
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium">Your Gmail Address <span className="text-red-500">*</span></label>
                        <Input type="email" placeholder="yourname@gmail.com" {...register('gmail')} />
                        {errors.gmail && <p className="mt-1 text-xs text-red-500">{errors.gmail.message}</p>}
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium">Phone Number <span className="text-red-500">*</span></label>
                        <Input placeholder="+232 XX XXX XXX" {...register('phoneNumber')} />
                        {errors.phoneNumber && <p className="mt-1 text-xs text-red-500">{errors.phoneNumber.message}</p>}
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium">Gender <span className="text-red-500">*</span></label>
                        <Select onValueChange={(v) => { setValue('gender', v, { shouldValidate: true }) }}>
                          <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.gender && <p className="mt-1 text-xs text-red-500">{errors.gender.message}</p>}
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium">Date of Birth <span className="text-red-500">*</span></label>
                        <Input type="date" {...register('dateOfBirth')} />
                        {errors.dateOfBirth && <p className="mt-1 text-xs text-red-500">{errors.dateOfBirth.message}</p>}
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium">Residential Address <span className="text-red-500">*</span></label>
                        <Input placeholder="Freetown, Sierra Leone" {...register('residentialAddress')} />
                        {errors.residentialAddress && <p className="mt-1 text-xs text-red-500">{errors.residentialAddress.message}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 1: Programme Information */}
                {step === 1 && (
                  <div className="space-y-5">
                    <div>
                      <h3 className="mb-1 text-base font-bold text-gtgs-navy sm:text-lg">Programme Information</h3>
                      <p className="text-xs text-muted-foreground sm:text-sm">Choose your desired programme of study.</p>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">Department <span className="text-red-500">*</span></label>
                      <Select onValueChange={(v) => { setValue('department', v, { shouldValidate: true }) }}>
                        <SelectTrigger><SelectValue placeholder="Select a department" /></SelectTrigger>
                        <SelectContent>
                          {DEPARTMENTS.map((dept) => (
                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.department && <p className="mt-1 text-xs text-red-500">{errors.department.message}</p>}
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">Experience Level</label>
                      <Select onValueChange={(v) => { setValue('experienceLevel', v) }}>
                        <SelectTrigger><SelectValue placeholder="Select experience level" /></SelectTrigger>
                        <SelectContent>
                          {EXPERIENCE_LEVELS.map((level) => (
                            <SelectItem key={level} value={level}>{level}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">Personal Statement</label>
                      <Textarea placeholder="Tell us why you want to join this programme and what you hope to achieve..." rows={5} {...register('personalStatement')} />
                      <p className="mt-1 text-[11px] text-muted-foreground">Optional, but helps us understand your goals.</p>
                    </div>
                  </div>
                )}

                {/* Step 2: Document Upload */}
                {step === 2 && (
                  <div className="space-y-5">
                    <div>
                      <h3 className="mb-1 text-base font-bold text-gtgs-navy sm:text-lg">Upload Documents</h3>
                      <p className="text-xs text-muted-foreground sm:text-sm">Upload the required documents below. Accepted formats: JPG, PNG, PDF (max 5MB each).</p>
                    </div>
                    <div className="space-y-3">
                      {DOCUMENT_TYPES.map((doc) => {
                        const uploaded = files.find((f) => f.key === doc.key)
                        return (
                          <div key={doc.key} className="rounded-lg border p-3.5 sm:p-4">
                            <div className="flex items-center justify-between gap-3">
                              <div className="flex items-center gap-2.5 min-w-0">
                                {uploaded ? (
                                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 sm:size-10">
                                    <FileText className="size-4 sm:size-5" aria-hidden="true" />
                                  </div>
                                ) : (
                                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground sm:size-10">
                                    <Upload className="size-4 sm:size-5" aria-hidden="true" />
                                  </div>
                                )}
                                <div className="min-w-0">
                                  <p className="text-sm font-medium text-gtgs-navy truncate">{doc.label}</p>
                                  {uploaded && <p className="text-[11px] text-emerald-600 truncate">{uploaded.file.name}</p>}
                                </div>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                {doc.required && <span className="rounded bg-red-50 px-2 py-0.5 text-[10px] font-semibold text-red-600 sm:text-xs">Required</span>}
                                {uploaded ? (
                                  <Button type="button" variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => removeFile(doc.key)}>
                                    <X className="size-4" aria-hidden="true" />
                                  </Button>
                                ) : (
                                  <Button type="button" variant="outline" size="sm" onClick={() => fileInputRefs.current[doc.key]?.click()}>
                                    <Upload className="mr-1.5 size-3.5" aria-hidden="true" />
                                    Upload
                                  </Button>
                                )}
                              </div>
                            </div>
                            <input
                              ref={(el) => { fileInputRefs.current[doc.key] = el }}
                              type="file"
                              accept=".jpg,.jpeg,.png,.pdf"
                              className="hidden"
                              onChange={(e) => handleFileChange(doc.key, e)}
                            />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {error && <div className="rounded-lg bg-red-50 border border-red-100 p-3.5 text-sm text-red-600">{error}</div>}

                {/* Navigation buttons */}
                <div className="flex items-center justify-between pt-2">
                  {step > 0 ? (
                    <Button type="button" variant="outline" onClick={() => setStep((s) => s - 1)}>
                      <ChevronLeft className="mr-1 size-4" aria-hidden="true" />
                      Back
                    </Button>
                  ) : (
                    <div />
                  )}
                  {step < STEPS.length - 1 ? (
                    <Button type="button" onClick={onNextStep} className="bg-gtgs-navy hover:bg-gtgs-blue">
                      Next Step
                      <ChevronRight className="ml-1 size-4" aria-hidden="true" />
                    </Button>
                  ) : (
                    <Button type="submit" disabled={loading} className="bg-gtgs-gold text-gtgs-navy font-bold hover:bg-gtgs-gold-light">
                      {loading ? <><Loader2 className="mr-2 size-4 animate-spin" /> Submitting...</> : <><Send className="mr-2 size-4" /> Submit Application</>}
                    </Button>
                  )}
                </div>

                <p className="text-center text-xs text-muted-foreground">
                  By submitting, you confirm all information is accurate.
                </p>
            </form>
          </CardContent>
        </Card>
  )
}
