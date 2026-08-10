'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

interface PendingAction {
  id: string
  type: 'create' | 'update' | 'delete'
  data: Record<string, unknown>
  timestamp: number
}

const STORAGE_KEY = 'gtgs-offline-queue'

function getQueue(): PendingAction[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveQueue(queue: PendingAction[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(queue))
}

export function useOfflineSync(password: string) {
  const [isOnline, setIsOnline] = useState(true)
  const [pendingCount, setPendingCount] = useState(0)
  const [isSyncing, setIsSyncing] = useState(false)
  const [lastSyncResult, setLastSyncResult] = useState<string | null>(null)
  const syncTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Track online/offline status
  useEffect(() => {
    if (typeof window === 'undefined') return
    setIsOnline(navigator.onLine)

    function goOnline() { setIsOnline(true) }
    function goOffline() { setIsOnline(false) }

    window.addEventListener('online', goOnline)
    window.addEventListener('offline', goOffline)
    return () => {
      window.removeEventListener('online', goOnline)
      window.removeEventListener('offline', goOffline)
    }
  }, [])

  // Count pending items
  useEffect(() => {
    setPendingCount(getQueue().length)
  }, [isOnline, isSyncing])

  // Auto-sync when coming online
  useEffect(() => {
    if (isOnline && pendingCount > 0 && !isSyncing) {
      syncTimeoutRef.current = setTimeout(() => syncNow(), 1500)
    }
    return () => {
      if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current)
    }
  }, [isOnline, pendingCount])

  const syncNow = useCallback(async () => {
    const queue = getQueue()
    if (queue.length === 0) {
      setLastSyncResult(null)
      return
    }

    setIsSyncing(true)
    setLastSyncResult(null)

    try {
      const res = await fetch('/api/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${password}`,
        },
        body: JSON.stringify({ actions: queue }),
      })

      if (res.ok) {
        const json = await res.json()
        if (json.failed === 0) {
          // All succeeded, clear the queue
          saveQueue([])
          setLastSyncResult(`Synced ${json.synced} item${json.synced > 1 ? 's' : ''} successfully.`)
        } else {
          // Some failed, remove only the successful ones
          const failedIds = new Set(
            json.results.filter((r: { success: boolean }) => !r.success).map((r: { id?: string }, i: number) => queue[i]?.id)
          )
          const remaining = queue.filter(a => failedIds.has(a.id))
          saveQueue(remaining)
          setLastSyncResult(`Synced ${json.synced}, ${json.failed} failed.`)
        }
      } else {
        setLastSyncResult('Sync failed. Will retry when online.')
      }
    } catch {
      setLastSyncResult('Network error. Changes saved offline.')
      setIsOnline(false)
    } finally {
      setIsSyncing(false)
      setPendingCount(getQueue().length)
    }
  }, [password])

  const queueAction = useCallback((type: 'create' | 'update' | 'delete', data: Record<string, unknown>) => {
    const action: PendingAction = {
      id: data.id as string || `pending-${Date.now()}`,
      type,
      data,
      timestamp: Date.now(),
    }
    const queue = getQueue()
    queue.push(action)
    saveQueue(queue)
    setPendingCount(queue.length)

    // If online, try to sync immediately
    if (navigator.onLine) {
      syncNow()
    }
  }, [syncNow])

  return { isOnline, pendingCount, isSyncing, lastSyncResult, syncNow, queueAction }
}
