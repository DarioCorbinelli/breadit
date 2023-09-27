import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { FC, ReactNode } from 'react'
import { format } from 'date-fns'
import { notFound } from 'next/navigation'
import JoinLeaveSubreddit from '@/components/JoinLeaveSubreddit'

interface layoutProps {
  children: ReactNode
  params: { name: string }
}

const layout: FC<layoutProps> = async ({ children, params: { name } }) => {
  const session = await getAuthSession()

  const subreddit = await db.subreddit.findFirst({
    where: { name },
    include: {
      owner: true,
      subscribers: true
    }
  })

  if (!subreddit) notFound()

  return (
    <div className='grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-y-4 gap-x-4'>
      <div>{children}</div>
      <div className='border rounded-lg overflow-hidden'>
        <div className='bg-background p-6'>
          <h3 className='font-semibold'>Abount r/{name}</h3>
        </div>
        <dl className='p-6 bg-card text-sm space-y-4'>
          <div className='flex justify-between gap-4'>
            <dt className='text-muted-foreground'>Data creazione:</dt>
            <dd className='text-secondary-foreground'>{format(subreddit.createdAt, "dd/MM/yyyy")}</dd>
          </div>
          <hr />
          <div className='flex justify-between gap-4'>
            <dt className='text-muted-foreground'>Membri:</dt>
            <dd className='text-secondary-foreground'>{subreddit.subscribers.length + 1}</dd>
          </div>
          <hr />
          {subreddit.ownerId === session?.user.id ? <div className='flex justify-between gap-4'>
            <p className='text-muted-foreground'>Hai creato tu questa community</p>
          </div> : <JoinLeaveSubreddit isSubscribed={!!subreddit.subscribers.find(sub => sub.id === session?.user.id)} subredditId={subreddit.id} subredditName={subreddit.name} /> }
        </dl>
      </div>
    </div>
  )
}

export default layout
