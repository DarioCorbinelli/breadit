'use client'

import EditorOutput from '@/components/EditorOutput'
import { Icons } from '@/components/Icons'
import { formatTimeToNow } from '@/lib/utils'
import { Comment, Post, Subreddit, User } from '@prisma/client'
import Link from 'next/link'
import { FC, useRef } from 'react'
import { useIsClient, useIsMounted } from 'usehooks-ts'

interface PostProps extends Pick<Post, 'title' | 'content' | 'createdAt' | 'id'> {
  author: User
  subredditName: string
  comments: Comment[]
}

const Post: FC<PostProps> = ({ id, title, content, createdAt, author: { username }, subredditName, comments }) => {
  const postRef = useRef<HTMLDivElement>(null)

  return (
    <li className='bg-card rounded-sm shadow overflow-hidden'>
      <div className='p-8 flex justify-between items-center gap-8'>
        <div>votes</div>
        <div className='flex-1 space-y-1 max-h-56 overflow-clip relative' ref={postRef}>
          <div className='text-xs text-muted-foreground'>
            <Link className='text-foreground text-sm underline underline-offset-2' href={`/r/${subredditName}`}>
              r/{subredditName}
            </Link>{' '}
            <span>•</span> <span>Pubblicato da u/{username}</span> <span>{formatTimeToNow(createdAt)}</span>
          </div>
          <h3 className='font-medium text-lg'>
            <Link href={`/r/${subredditName}/${id}`}>{title}</Link>
          </h3>
          <EditorOutput content={content} />
          {postRef.current?.clientHeight === 224 && <span className='absolute inset-x-0 bottom-0 top-[50%] bg-gradient-to-t from-card to-transparent' />}
        </div>
      </div>
      <div className='p-4 bg-background text-sm'>
        <Link href={`/r/${subredditName}/${id}`}>
          <Icons.message className='w-4 h-4 inline-block mr-2' /> {comments.length} comments
        </Link>
      </div>
    </li>
  )
}

export default Post
