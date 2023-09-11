'use client'

import { signIn, signOut, useSession } from 'next-auth/react'

export default function Home() {
  const { data: session, status } = useSession()

  return (
    <main>
      <button onClick={() => signIn("google")}>sign in</button>
      {session?.user?.image && <img src={session?.user?.image} alt="img" />}
      ciao
    </main>
  )
}
