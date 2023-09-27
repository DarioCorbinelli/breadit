import MiniCreatePost from '@/components/MiniCreatePost'
import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import { FC } from 'react'

interface pageProps {
  params: { name: string }
}

const page: FC<pageProps> = async ({ params: { name } }) => {
  const session = await getAuthSession()

  const subreddit = await db.subreddit.findFirst({
    where: { name },
  })

  if (!subreddit) notFound()

  return (
    <>
      <h1 className='font-bold text-3xl md:text-4xl'>r/{subreddit.name}</h1>
      <ul className='mt-8'>
        <MiniCreatePost session={session} />
      </ul>
    </>
  )
}

export default page
