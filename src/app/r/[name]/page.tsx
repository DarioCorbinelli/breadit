import EditorOutput from '@/components/EditorOutput'
import MiniCreatePost from '@/components/MiniCreatePost'
import Post from '@/components/Post'
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
      posts: {
        include: {
          author: true,
          comments: true
        }
      }
    }
  })

  if (!subreddit) notFound()

  return (
    <>
      <h1 className='font-bold text-3xl md:text-4xl'>r/{subreddit.name}</h1>
      <ul className='mt-8 space-y-4'>
        <MiniCreatePost session={session} />
        {subreddit.posts.map(post => <Post key={post.id} subredditName={subreddit.name} {...post} /> )}
      </ul>
    </>
  )
}

export default page
