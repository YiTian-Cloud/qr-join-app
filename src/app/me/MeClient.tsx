'use client'

import { useEffect, useState } from 'react'
import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'

function initFirebase(): FirebaseApp | null {
  const cfg = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  }
  if (!cfg.apiKey) {
    console.error('Missing Firebase envs (NEXT_PUBLIC_FIREBASE_*)')
    return null
  }
  return getApps()[0] ?? initializeApp(cfg)
}

export default function MeClient() {
  const [user, setUser] = useState<User | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const app = initFirebase()
    if (!app) return
    const auth = getAuth(app)
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u ?? null)
      setReady(true)
    })
    return () => unsub()
  }, [])

  if (!ready) return <div className="p-6">Signing in…</div>
  if (!user) return <div className="p-6">Not signed in.</div>
  return <div className="p-6">Hello, {user.displayName ?? user.email}</div>
}
