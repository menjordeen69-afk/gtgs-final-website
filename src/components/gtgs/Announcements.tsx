'use client'

import { useState, useEffect } from 'react'
import { Megaphone, Newspaper, CalendarDays, Bell, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import FadeInView from '@/components/ui/fade-in-view'

const CATEGORY_CONFIG: Record<string, { icon: typeof Megaphone; label: string; color: string }> = {
  announcement: { icon: Megaphone, label: 'Announcement', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  news: { icon: Newspaper, label: 'News', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  event: { icon: CalendarDays, label: 'Event', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  notice: { icon: Bell, label: 'Notice', color: 'bg-amber-100 text-amber-700 border-amber-200' },
}

interface Post {
  id: string
  title: string
  content: string
  category: string
  published: boolean
  createdAt: string
  updatedAt: string
}

export default function Announcements() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(json => setPosts((json.posts || []).slice(0, 6)))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading || posts.length === 0) return null

  return (
    <section
      id="announcements"
      className="bg-muted/30 px-4 py-16 sm:px-6 sm:py-20 md:py-24"
      aria-label="Announcements"
    >
      <div className="mx-auto max-w-6xl">
        <FadeInView className="mb-10 text-center sm:mb-12">
          <h2 className="mb-2 text-2xl font-extrabold text-gtgs-navy sm:text-3xl md:text-4xl">
            Latest Updates
          </h2>
          <div className="mx-auto mb-3 h-1 w-12 rounded-full bg-gtgs-gold sm:w-16" aria-hidden="true" />
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Stay informed with the latest news, events, and announcements from GTGS.
          </p>
        </FadeInView>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
          {posts.map((post, index) => {
            const config = CATEGORY_CONFIG[post.category] || CATEGORY_CONFIG.announcement
            const Icon = config.icon
            const isExpanded = expanded === post.id
            const isLong = post.content.length > 150

            return (
              <FadeInView key={post.id} delay={index * 40}>
                <div className="group h-full rounded-2xl border bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6">
                  <div className="mb-3 flex items-center justify-between">
                    <Badge variant="outline" className={`gap-1 text-[11px] ${config.color}`}>
                      <Icon className="size-3" /> {config.label}
                    </Badge>
                    <span className="text-[11px] text-muted-foreground/60">
                      {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <h3 className="mb-2 text-base font-bold text-gtgs-navy leading-snug sm:text-lg">
                    {post.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {isExpanded || !isLong
                      ? post.content
                      : post.content.slice(0, 150) + '...'
                    }
                  </p>
                  {isLong && (
                    <button
                      onClick={() => setExpanded(isExpanded ? null : post.id)}
                      className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-gtgs-gold hover:text-gtgs-gold-light transition-colors"
                    >
                      {isExpanded ? 'Show less' : 'Read more'}
                      <ArrowRight className={`size-3 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    </button>
                  )}
                </div>
              </FadeInView>
            )
          })}
        </div>
      </div>
    </section>
  )
}
