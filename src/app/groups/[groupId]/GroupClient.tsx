'use client'

import { useEffect, useState } from 'react'
import { initializeApp, getApps } from 'firebase/app'
import { getFirestore, doc, getDoc, collection, getDocs } from 'firebase/firestore'

function getDb() {
  const cfg = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  }
  const app = getApps()[0] ?? initializeApp(cfg)
  return getFirestore(app)
}

type Member = { id: string; displayName?: string; email?: string }

export default function GroupClient({ groupId }: { groupId: string }) {
  const [group, setGroup] = useState<any>(null)
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const db = getDb()
        const gSnap = await getDoc(doc(db, 'groups', groupId))
        if (gSnap.exists()) setGroup({ id: gSnap.id, ...gSnap.data() })

        const mSnap = await getDocs(collection(db, 'groups', groupId, 'members'))
        setMembers(mSnap.docs.map(d => ({ id: d.id, ...(d.data() as any) })))
      } finally {
        setLoading(false)
      }
    })()
  }, [groupId])

  if (loading) return <div className="p-6">Loading…</div>
  if (!group) return <div className="p-6">Group not found.</div>

  return (
    <div className="p-6 space-y-3">
      <h1 className="text-xl font-semibold">{group.name ?? groupId}</h1>
      <div className="text-sm text-gray-600">Group ID: {groupId}</div>

      <h2 className="font-medium mt-4">Members</h2>
      {members.length ? (
        <ul className="list-disc pl-6">
          {members.map(m => (
            <li key={m.id}>{m.displayName || m.email || m.id}</li>
          ))}
        </ul>
      ) : (
        <div>No members yet.</div>
      )}
    </div>
  )
}
