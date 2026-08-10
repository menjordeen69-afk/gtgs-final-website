'use client'

import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Send, Eye, EyeOff, Loader2, Megaphone, Newspaper, CalendarDays, Bell, Wifi, WifiOff, RefreshCw, Download, CloudOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { useOfflineSync } from '@/hooks/useOfflineSync'

const CATEGORIES = [
  { value: 'announcement', label: 'Announcement', icon: Megaphone, color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { value: 'news', label: 'News', icon: Newspaper, color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  { value: 'event', label: 'Event', icon: CalendarDays, color: 'bg-purple-100 text-purple-700 border-purple-200' },
  { value: 'notice', label: 'Notice', icon: Bell, color: 'bg-amber-100 text-amber-700 border-amber-200' },
] as const

interface Post {
  id: string
  title: string
  content: string
  category: string
  published: boolean
  createdAt: string
  updatedAt: string
}

interface PostsManagerProps {
  password: string
}

export default function PostsManager({ password }: PostsManagerProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [formTitle, setFormTitle] = useState('')
  const [formContent, setFormContent] = useState('')
  const [formCategory, setFormCategory] = useState('announcement')
  const [formPublished, setFormPublished] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const { isOnline, pendingCount, isSyncing, lastSyncResult, syncNow, queueAction } = useOfflineSync(password)

  const authHeaders = { 'Authorization': `Bearer ${password}`, 'Content-Type': 'application/json' }

  async function loadPosts() {
    setLoading(true)
    try {
      const res = await fetch('/api/posts', {
        headers: { 'Authorization': `Bearer ${password}` },
      })
      if (res.ok) {
        // Admin sees ALL posts (published + draft)
        // We need a separate admin endpoint, but for now we use the sync endpoint to get all
        // Actually let's fetch all posts by using the admin password
        const json = await res.json()
        // Public endpoint only returns published, so we also check local queue
        const localPosts = getLocalPosts()
        const merged = [...localPosts.filter(lp => !json.posts.find((p: Post) => p.id === lp.id)), ...json.posts]
        setPosts(merged.sort((a: Post, b: Post) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
      }
    } catch {
      // Offline: load from localStorage
      setPosts(getLocalPosts())
    } finally {
      setLoading(false)
    }
  }

  function getLocalPosts(): Post[] {
    if (typeof window === 'undefined') return []
    try {
      const raw = localStorage.getItem('gtgs-local-posts')
      return raw ? JSON.parse(raw) : []
    } catch { return [] }
  }

  function saveLocalPosts(posts: Post[]) {
    if (typeof window === 'undefined') return
    localStorage.setItem('gtgs-local-posts', JSON.stringify(posts))
  }

  useEffect(() => { loadPosts() }, [])

  function resetForm() {
    setFormTitle('')
    setFormContent('')
    setFormCategory('announcement')
    setFormPublished(true)
    setEditingPost(null)
    setShowForm(false)
    setError('')
  }

  function startEdit(post: Post) {
    setEditingPost(post)
    setFormTitle(post.title)
    setFormContent(post.content)
    setFormCategory(post.category)
    setFormPublished(post.published)
    setShowForm(true)
    setError('')
  }

  async function handleSave() {
    if (!formTitle.trim() || formTitle.trim().length < 3) {
      setError('Title is required (min 3 characters).')
      return
    }
    if (!formContent.trim() || formContent.trim().length < 10) {
      setError('Content is required (min 10 characters).')
      return
    }

    setSaving(true)
    setError('')

    const payload = {
      title: formTitle.trim(),
      content: formContent.trim(),
      category: formCategory,
      published: formPublished,
    }

    if (isOnline) {
      try {
        const url = editingPost ? '/api/posts' : '/api/posts'
        const method = editingPost ? 'PUT' : 'POST'
        const body = editingPost ? { ...payload, id: editingPost.id } : payload

        const res = await fetch(url, { method, headers: authHeaders, body: JSON.stringify(body) })
        if (!res.ok) {
          const json = await res.json().catch(() => ({}))
          throw new Error((json as Record<string, string>).error || 'Save failed')
        }
        await loadPosts()
        resetForm()
      } catch (err) {
        // If online but request fails, save locally and queue
        saveOffline(editingPost ? 'update' : 'create', payload)
        setError('Saved offline. Will sync when connection is stable.')
      }
    } else {
      // Offline: save locally and queue for sync
      saveOffline(editingPost ? 'update' : 'create', payload)
      resetForm()
    }

    setSaving(false)
  }

  function saveOffline(type: 'create' | 'update', data: Record<string, unknown>) {
    const localPosts = getLocalPosts()
    const now = new Date().toISOString()

    if (type === 'create') {
      const newPost: Post = {
        id: `LOCAL-${Date.now()}`,
        title: data.title as string,
        content: data.content as string,
        category: data.category as string,
        published: data.published as boolean,
        createdAt: now,
        updatedAt: now,
      }
      localPosts.unshift(newPost)
      queueAction('create', newPost)
    } else if (editingPost) {
      const index = localPosts.findIndex(p => p.id === editingPost.id)
      if (index !== -1) {
        localPosts[index] = { ...localPosts[index], ...data, updatedAt: now }
      } else {
        localPosts.unshift({ ...editingPost, ...data, updatedAt: now })
      }
      queueAction('update', { ...data, id: editingPost.id })
    }

    saveLocalPosts(localPosts)
    setPosts(localPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
  }

  async function handleDelete(id: string) {
    if (isOnline) {
      try {
        const res = await fetch(`/api/posts?id=${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${password}` } })
        if (res.ok) {
          setPosts(prev => prev.filter(p => p.id !== id))
          setDeleteConfirm(null)
          return
        }
      } catch { /* fall through to offline */ }
    }
    // Offline delete
    queueAction('delete', { id })
    const localPosts = getLocalPosts().filter(p => p.id !== id)
    saveLocalPosts(localPosts)
    setPosts(localPosts)
    setDeleteConfirm(null)
  }

  async function handleExport() {
    try {
      const res = await fetch('/api/export?format=json', {
        headers: { 'Authorization': `Bearer ${password}` },
      })
      if (!res.ok) throw new Error('Export failed')
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `gtgs-data-${new Date().toISOString().slice(0, 10)}.json`
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      setError('Export failed. Check your connection.')
    }
  }

  function getCategoryBadge(category: string) {
    const cat = CATEGORIES.find(c => c.value === category)
    if (!cat) return <Badge variant="outline">{category}</Badge>
    const Icon = cat.icon
    return (
      <Badge variant="outline" className={`gap-1 text-[11px] ${cat.color}`}>
        <Icon className="size-3" /> {cat.label}
      </Badge>
    )
  }

  return (
    <div className="space-y-4">
      {/* Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border bg-white p-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
            isOnline ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'
          }`}>
            {isOnline ? <Wifi className="size-3.5" /> : <WifiOff className="size-3.5" />}
            {isOnline ? 'Online' : 'Offline'}
          </div>
          {pendingCount > 0 && (
            <button
              onClick={syncNow}
              disabled={isSyncing}
              className="flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 transition-colors hover:bg-amber-100 disabled:opacity-50"
            >
              {isSyncing ? <Loader2 className="size-3.5 animate-spin" /> : <CloudOff className="size-3.5" />}
              {pendingCount} pending
            </button>
          )}
          {lastSyncResult && (
            <span className="text-[11px] text-muted-foreground">{lastSyncResult}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="mr-1.5 size-3.5" /> Download Data
          </Button>
          <Button size="sm" onClick={() => { resetForm(); setShowForm(true) }} className="bg-gtgs-navy hover:bg-gtgs-blue">
            <Plus className="mr-1.5 size-3.5" /> New Post
          </Button>
        </div>
      </div>

      {error && <div className="rounded-lg bg-red-50 border border-red-100 p-3 text-sm text-red-600">{error}</div>}

      {/* Post Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={resetForm}>
          <div className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gtgs-navy">{editingPost ? 'Edit Post' : 'Create New Post'}</h3>
              <Button variant="ghost" size="icon" onClick={resetForm} className="text-muted-foreground">
                &times;
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium">Title <span className="text-red-500">*</span></label>
                <Input
                  placeholder="e.g. New ICT Course Starting Next Week"
                  value={formTitle}
                  onChange={e => setFormTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium">Category</label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {CATEGORIES.map(cat => {
                    const Icon = cat.icon
                    return (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => setFormCategory(cat.value)}
                        className={`flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition-all ${
                          formCategory === cat.value
                            ? 'border-gtgs-navy bg-gtgs-navy/5 text-gtgs-navy'
                            : 'border-border text-muted-foreground hover:border-gtgs-navy/30'
                        }`}
                      >
                        <Icon className="size-3.5" /> {cat.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium">Content <span className="text-red-500">*</span></label>
                <Textarea
                  placeholder="Write your post content here..."
                  rows={6}
                  value={formContent}
                  onChange={e => setFormContent(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="text-sm font-medium">Publish immediately</p>
                  <p className="text-xs text-muted-foreground">Unpublished posts are saved as drafts.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormPublished(!formPublished)}
                  className={`flex size-10 items-center justify-center rounded-lg transition-colors ${
                    formPublished ? 'bg-emerald-100 text-emerald-600' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {formPublished ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
                </button>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" onClick={resetForm} className="flex-1">Cancel</Button>
                <Button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 bg-gtgs-navy hover:bg-gtgs-blue"
                >
                  {saving ? <Loader2 className="mr-1.5 size-4 animate-spin" /> : <Send className="mr-1.5 size-4" />}
                  {editingPost ? 'Update' : 'Publish'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Posts List */}
      {loading ? (
        <div className="flex items-center justify-center py-12 text-muted-foreground">
          <Loader2 className="mr-2 size-5 animate-spin" /> Loading posts...
        </div>
      ) : posts.length === 0 ? (
        <div className="py-16 text-center">
          <Megaphone className="mx-auto mb-3 size-10 text-muted-foreground/30" />
          <p className="text-sm text-muted-foreground">No posts yet. Create your first announcement!</p>
          <p className="mt-1 text-xs text-muted-foreground/60">
            Posts will appear on the website once published.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map(post => (
            <div key={post.id} className={`rounded-xl border bg-white p-4 shadow-sm transition-all hover:shadow-md sm:p-5 ${!post.published ? 'opacity-70' : ''}`}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    {getCategoryBadge(post.category)}
                    {!post.published && <Badge variant="outline" className="text-[11px] bg-gray-100 text-gray-500 border-gray-200">Draft</Badge>}
                    {post.id.startsWith('LOCAL-') && <Badge variant="outline" className="text-[11px] bg-amber-50 text-amber-600 border-amber-200">Offline</Badge>}
                  </div>
                  <h4 className="text-base font-bold text-gtgs-navy sm:text-lg">{post.title}</h4>
                  <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{post.content}</p>
                  <p className="mt-2 text-[11px] text-muted-foreground/60">
                    {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Button variant="ghost" size="sm" onClick={() => startEdit(post)}>
                    <Pencil className="mr-1 size-3.5" /> <span className="hidden sm:inline">Edit</span>
                  </Button>
                  {deleteConfirm === post.id ? (
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleDelete(post.id)}>Delete</Button>
                      <Button variant="ghost" size="sm" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
                    </div>
                  ) : (
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => setDeleteConfirm(post.id)}>
                      <Trash2 className="size-3.5" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
