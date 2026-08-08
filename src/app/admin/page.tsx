'use client'

import { useState } from 'react'
import { Lock, Download, Eye, X, CheckCircle, XCircle, FileText, LogOut, Users, Shield, Trash2, RefreshCw, Search, Paperclip } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Document {
  fileName: string
  fileType: string
  fileSize: number
  key: string
  savedPath: string
}

interface Application {
  id: string
  fullName: string
  email: string
  phoneNumber: string
  gender: string
  dateOfBirth: string
  residentialAddress: string
  department: string
  experienceLevel?: string
  personalStatement?: string
  status: string
  submittedAt: string
  documents?: Document[]
}

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700 border-amber-200',
  approved: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  rejected: 'bg-red-100 text-red-700 border-red-200',
}

const DOC_LABELS: Record<string, string> = {
  nationalId: 'National ID / Passport',
  wassce: 'WASSCE Certificate',
  birthCert: 'Birth Certificate',
  passportPhoto: 'Passport Photo',
  otherDoc: 'Other Document',
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / 1048576).toFixed(1) + ' MB'
}

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [applications, setApplications] = useState<Application[]>([])
  const [selectedApp, setSelectedApp] = useState<Application | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  async function login() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin', {
        headers: { 'Authorization': `Bearer ${password}` },
      })
      if (res.ok) {
        const json = await res.json()
        setApplications(json.applications || [])
        setAuthenticated(true)
      } else if (res.status === 429) {
        setError('Too many failed attempts. Locked for 15 minutes.')
      } else {
        const json = await res.json().catch(() => ({}))
        const remaining = (json as Record<string, unknown>).remainingAttempts
        setError(remaining ? `Incorrect password. ${remaining} attempt${Number(remaining) > 1 ? 's' : ''} remaining.` : 'Incorrect password')
      }
    } catch {
      setError('Connection failed')
    } finally {
      setLoading(false)
    }
  }

  async function refreshData() {
    try {
      const res = await fetch('/api/admin', {
        headers: { 'Authorization': `Bearer ${password}` },
      })
      if (res.ok) {
        const json = await res.json()
        setApplications(json.applications || [])
      }
    } catch { /* ignore */ }
  }

  async function updateStatus(id: string, status: string) {
    const res = await fetch('/api/admin', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${password}`,
      },
      body: JSON.stringify({ id, status }),
    })
    if (res.ok) {
      setApplications((prev) => prev.map(a => a.id === id ? { ...a, status } : a))
      if (selectedApp?.id === id) setSelectedApp((prev) => prev ? { ...prev, status } : null)
    }
  }

  async function deleteApplication(id: string) {
    const res = await fetch(`/api/admin?id=${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${password}` },
    })
    if (res.ok) {
      setApplications((prev) => prev.filter(a => a.id !== id))
      if (selectedApp?.id === id) setSelectedApp(null)
      setDeleteConfirm(null)
    }
  }

  async function downloadDocument(savedPath: string, fileName: string) {
    try {
      const res = await fetch(`/api/documents?file=${encodeURIComponent(savedPath)}`, {
        headers: { 'Authorization': `Bearer ${password}` },
      })
      if (!res.ok) return
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = fileName
      a.click()
      URL.revokeObjectURL(url)
    } catch { /* ignore */ }
  }

  function viewDocument(savedPath: string) {
    const url = `/api/documents?file=${encodeURIComponent(savedPath)}&token=${password}`
    window.open(url, '_blank')
  }

  async function exportCSV() {
    const res = await fetch('/api/admin?format=csv', {
      headers: { 'Authorization': `Bearer ${password}` },
    })
    if (res.ok) {
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `gtgs-applications-${new Date().toISOString().slice(0, 10)}.csv`
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') login()
  }

  // Filtered applications
  const filtered = applications
    .filter(a => {
      if (statusFilter !== 'all' && a.status !== statusFilter) return false
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        return (
          a.fullName.toLowerCase().includes(q) ||
          a.email.toLowerCase().includes(q) ||
          a.department.toLowerCase().includes(q) ||
          a.id.toLowerCase().includes(q) ||
          (a.phoneNumber && a.phoneNumber.includes(q))
        )
      }
      return true
    })
    .slice().reverse()

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gtgs-navy to-gtgs-blue px-4">
        <Card className="w-full max-w-sm border-0 shadow-2xl">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-3 flex size-14 items-center justify-center rounded-2xl bg-gtgs-gold/15">
              <Shield className="size-7 text-gtgs-gold" />
            </div>
            <CardTitle className="text-xl text-gtgs-navy">GTGS Admin</CardTitle>
            <p className="text-sm text-muted-foreground">Enter the admin password to continue.</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                type="password"
                placeholder="Admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pl-10"
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button onClick={login} disabled={loading || !password} className="w-full bg-gtgs-navy hover:bg-gtgs-blue">
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const pending = applications.filter(a => a.status === 'pending').length
  const approved = applications.filter(a => a.status === 'approved').length
  const rejected = applications.filter(a => a.status === 'rejected').length

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-40 border-b bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-gtgs-navy">
              <Shield className="size-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-gtgs-navy sm:text-lg">Admin Dashboard</h1>
              <p className="text-[11px] text-muted-foreground">GTGS Application Management</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={refreshData} title="Refresh">
              <RefreshCw className="mr-1.5 size-3.5" />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
            <Button variant="outline" size="sm" onClick={exportCSV}>
              <Download className="mr-1.5 size-3.5" />
              <span className="hidden sm:inline">Export CSV</span>
            </Button>
            <Button variant="outline" size="sm" onClick={() => { setAuthenticated(false); setPassword('') }}>
              <LogOut className="mr-1.5 size-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        {/* Stats Cards */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          <Card className="p-4 sm:p-5">
            <div className="flex items-center gap-2">
              <Users className="size-5 text-gtgs-blue" />
              <p className="text-2xl font-extrabold text-gtgs-navy">{applications.length}</p>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Total Applications</p>
          </Card>
          <Card className="p-4 sm:p-5">
            <div className="flex items-center gap-2">
              <FileText className="size-5 text-amber-500" />
              <p className="text-2xl font-extrabold text-gtgs-navy">{pending}</p>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Pending Review</p>
          </Card>
          <Card className="p-4 sm:p-5">
            <div className="flex items-center gap-2">
              <CheckCircle className="size-5 text-emerald-500" />
              <p className="text-2xl font-extrabold text-gtgs-navy">{approved}</p>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Approved</p>
          </Card>
          <Card className="p-4 sm:p-5">
            <div className="flex items-center gap-2">
              <XCircle className="size-5 text-red-500" />
              <p className="text-2xl font-extrabold text-gtgs-navy">{rejected}</p>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Rejected</p>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, phone, department, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'pending', 'approved', 'rejected'].map(s => (
              <Button
                key={s}
                variant={statusFilter === s ? 'default' : 'outline'}
                size="sm"
                className={statusFilter === s ? 'bg-gtgs-navy hover:bg-gtgs-blue' : ''}
                onClick={() => setStatusFilter(s)}
              >
                {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Applications Table */}
        <Card>
          <CardContent className="p-0">
            {filtered.length === 0 ? (
              <div className="py-16 text-center">
                <FileText className="mx-auto mb-3 size-10 text-muted-foreground/30" />
                <p className="text-sm text-muted-foreground">
                  {applications.length === 0 ? 'No applications received yet.' : 'No applications match your search.'}
                </p>
                <p className="mt-1 text-xs text-muted-foreground/60">
                  {applications.length === 0 ? 'Applications submitted through the portal will appear here.' : 'Try adjusting your search or filter.'}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b bg-muted/50">
                    <tr>
                      <th className="px-4 py-3 font-semibold text-gtgs-navy">Applicant</th>
                      <th className="hidden px-4 py-3 font-semibold text-gtgs-navy sm:table-cell">Department</th>
                      <th className="hidden px-4 py-3 font-semibold text-gtgs-navy md:table-cell">Documents</th>
                      <th className="px-4 py-3 font-semibold text-gtgs-navy">Status</th>
                      <th className="hidden px-4 py-3 font-semibold text-gtgs-navy md:table-cell">Date</th>
                      <th className="px-4 py-3 font-semibold text-gtgs-navy">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filtered.map((app) => (
                      <tr key={app.id} className="hover:bg-muted/30">
                        <td className="px-4 py-3">
                          <p className="font-medium text-gtgs-navy">{app.fullName}</p>
                          <p className="text-xs text-muted-foreground">{app.email}</p>
                        </td>
                        <td className="hidden px-4 py-3 sm:table-cell">
                          <span className="text-sm">{app.department}</span>
                        </td>
                        <td className="hidden px-4 py-3 md:table-cell">
                          {app.documents && app.documents.length > 0 ? (
                            <div className="flex items-center gap-1">
                              <Paperclip className="size-3.5 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">{app.documents.length} file{app.documents.length > 1 ? 's' : ''}</span>
                            </div>
                          ) : (
                            <span className="text-xs text-muted-foreground">None</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="outline" className={`text-[11px] ${STATUS_COLORS[app.status] || ''}`}>
                            {app.status}
                          </Badge>
                        </td>
                        <td className="hidden px-4 py-3 text-xs text-muted-foreground md:table-cell">
                          {new Date(app.submittedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm" onClick={() => setSelectedApp(app)}>
                              <Eye className="mr-1 size-3.5" /> <span className="hidden lg:inline">View</span>
                            </Button>
                            {deleteConfirm === app.id ? (
                              <div className="flex items-center gap-1">
                                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => deleteApplication(app.id)}>
                                  Confirm
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => setDeleteConfirm(null)}>
                                  Cancel
                                </Button>
                              </div>
                            ) : (
                              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => setDeleteConfirm(app.id)}>
                                <Trash2 className="size-3.5" />
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Application Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setSelectedApp(null)}>
          <div className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gtgs-navy">Application Details</h2>
                <p className="text-xs text-muted-foreground">{selectedApp.id}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setSelectedApp(null)}><X className="size-4" /></Button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b py-2">
                <span className="text-muted-foreground">Full Name</span>
                <span className="font-medium text-gtgs-navy">{selectedApp.fullName}</span>
              </div>
              <div className="flex justify-between border-b py-2">
                <span className="text-muted-foreground">Gmail</span>
                <span className="font-medium text-gtgs-navy">{selectedApp.email}</span>
              </div>
              <div className="flex justify-between border-b py-2">
                <span className="text-muted-foreground">Phone</span>
                <span className="font-medium text-gtgs-navy">{selectedApp.phoneNumber}</span>
              </div>
              <div className="flex justify-between border-b py-2">
                <span className="text-muted-foreground">Gender</span>
                <span className="font-medium text-gtgs-navy">{selectedApp.gender || 'N/A'}</span>
              </div>
              <div className="flex justify-between border-b py-2">
                <span className="text-muted-foreground">Date of Birth</span>
                <span className="font-medium text-gtgs-navy">{selectedApp.dateOfBirth || 'N/A'}</span>
              </div>
              <div className="flex justify-between border-b py-2">
                <span className="text-muted-foreground">Address</span>
                <span className="font-medium text-gtgs-navy">{selectedApp.residentialAddress || 'N/A'}</span>
              </div>
              <div className="flex justify-between border-b py-2">
                <span className="text-muted-foreground">Department</span>
                <span className="font-medium text-gtgs-navy">{selectedApp.department}</span>
              </div>
              <div className="flex justify-between border-b py-2">
                <span className="text-muted-foreground">Experience</span>
                <span className="font-medium text-gtgs-navy">{selectedApp.experienceLevel || 'N/A'}</span>
              </div>
              <div className="flex justify-between border-b py-2">
                <span className="text-muted-foreground">Submitted</span>
                <span className="font-medium text-gtgs-navy">{new Date(selectedApp.submittedAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</span>
              </div>
              {selectedApp.personalStatement && (
                <div className="border-b py-2">
                  <p className="text-muted-foreground">Personal Statement</p>
                  <p className="mt-1 text-sm text-gtgs-navy leading-relaxed">{selectedApp.personalStatement}</p>
                </div>
              )}

              {/* Documents Section */}
              {selectedApp.documents && selectedApp.documents.length > 0 && (
                <div className="border-b py-2">
                  <p className="mb-2 text-muted-foreground">Uploaded Documents ({selectedApp.documents.length})</p>
                  <div className="space-y-2">
                    {selectedApp.documents.map((doc, i) => (
                      <div key={i} className="flex items-center justify-between gap-2 rounded-lg border p-2.5">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted">
                            <FileText className="size-4 text-muted-foreground" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-gtgs-navy truncate">{DOC_LABELS[doc.key] || doc.key}</p>
                            <p className="text-[10px] text-muted-foreground truncate">{doc.fileName} &middot; {formatFileSize(doc.fileSize)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="size-8 p-0"
                            title="View"
                            onClick={() => viewDocument(doc.savedPath)}
                          >
                            <Eye className="size-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="size-8 p-0"
                            title="Download"
                            onClick={() => downloadDocument(doc.savedPath, doc.fileName)}
                          >
                            <Download className="size-3.5" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Status Actions */}
            <div className="mt-5 flex gap-2">
              {selectedApp.status !== 'approved' && (
                <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700" onClick={() => updateStatus(selectedApp.id, 'approved')}>
                  <CheckCircle className="mr-1.5 size-4" /> Approve
                </Button>
              )}
              {selectedApp.status !== 'rejected' && (
                <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white" onClick={() => updateStatus(selectedApp.id, 'rejected')}>
                  <XCircle className="mr-1.5 size-4" /> Reject
                </Button>
              )}
              {selectedApp.status !== 'pending' && (
                <Button className="flex-1 bg-amber-500 hover:bg-amber-600 text-white" onClick={() => updateStatus(selectedApp.id, 'pending')}>
                  Reset to Pending
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}