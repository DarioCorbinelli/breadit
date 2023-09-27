import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import { FC } from 'react'

interface pageProps {
  params: { name: string }
}

const page: FC<pageProps> = async ({ params: { name } }) => {
  const subreddit = await db.subreddit.findFirst({
    where: { name }
  })

  if (!subreddit) notFound()

  return <div>{name} - posts</div>
}

export default page
