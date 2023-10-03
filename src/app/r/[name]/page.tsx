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

  const subreddit = await db.subreddit.findUnique({
    where: { name },
    include: {
      posts: true
    }
  })

  if (!subreddit) notFound()

  return (
    <>
      <h1 className='font-bold text-3xl md:text-4xl'>r/{subreddit.name}</h1>
      <ul className='mt-8'>
        <MiniCreatePost session={session} />
        {subreddit.posts.map(post => <div>{post.title}</div> )}
      </ul>
    </>
  )
}

export default page
