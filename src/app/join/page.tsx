'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore, doc, setDoc } from 'firebase/firestore'

function db() {
  const cfg = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  }
  const app = getApps()[0] ?? initializeApp(cfg)
  return { auth: getAuth(app), db: getFirestore(app) }
}

export default function JoinPage() {
  const router = useRouter()
  const params = useSearchParams()
  const groupId = params.get('groupId') ?? ''
  const [joining, setJoining] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleJoin() {
    try {
      setJoining(true)
      setError(null)
      const { auth, db: fdb } = db()
      const uid = auth.currentUser?.uid ?? 'anon-' + Math.random().toString(36).slice(2, 8)
      // Adjust to your schema:
      await setDoc(doc(fdb, 'groups', groupId, 'members', uid), {
        uid,
        joinedAt: Date.now()
      })
      // 👉 navigate to the group page
      router.push(`/groups/${encodeURIComponent(groupId)}`)
    } catch (e: any) {
      setError(e?.message ?? 'Join failed')
    } finally {
      setJoining(false)
    }
  }

  if (!groupId) return <div className="p-6">Missing groupId in URL.</div>

  return (
    <div className="p-6 space-y-3">
      <h1 className="text-xl font-semibold">Join Group</h1>
      <div className="text-sm text-gray-600">Group ID: {groupId}</div>
      <button
        onClick={handleJoin}
        disabled={joining}
        className="rounded-xl px-4 py-2 border"
      >
        {joining ? 'Joining…' : 'Join'}
      </button>
      {error && <div className="text-red-600">{error}</div>}
    </div>
  )
}
