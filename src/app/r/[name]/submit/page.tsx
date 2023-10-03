import Editor from '@/components/Editor'
import { Button } from '@/components/ui/Button'
import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { notFound, redirect } from 'next/navigation'
import { FC } from 'react'

interface pageProps {
  params: { name: string }
}

const page: FC<pageProps> = async ({ params: { name: subredditName } }) => {
  const subreddit = await db.subreddit.findUnique({
    where: {name: subredditName}
  })
  if (!subreddit) return notFound()

  const session = await getAuthSession()
  if (!session) redirect(`/sign-in?redirectUrl=/r/${subredditName}/submit`)

  return (
    <div className='space-y-6'>
      <h3 className='border-b w-fit pb-4'>
        <strong>Scrivi Post</strong> in r/{subredditName}
      </h3>
      <Editor />
      <Button type='submit' form='post-editor-form' className='w-full'>Posta</Button>
    </div>
  )
}

export default page
