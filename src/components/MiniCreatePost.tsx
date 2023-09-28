'use client'

import { Icons } from '@/components/Icons'
import UserAvatar from '@/components/UserAvatar'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Session } from 'next-auth'
import { usePathname, useRouter } from 'next/navigation'
import { FC } from 'react'

interface MiniCreatePostProps {
  session?: Session | null
}

const MiniCreatePost: FC<MiniCreatePostProps> = ({ session }) => {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <li className='bg-card rounded-md shadow px-6 py-4 flex justify-between gap-6'>
      <div className='relative'>
        <UserAvatar user={session?.user} />
        {session?.user && <span className='absolute block w-3 h-3 bg-green-500 top-0 right-0 rounded-full' />}
      </div>
      <Input placeholder='Scrivi post...' readOnly onClick={() => router.push(pathname + '/submit')} />
      <Button size='icon' variant='ghost' onClick={() => router.push(pathname + '/submit')}>
        <Icons.image className='text-secondary-foreground' />
      </Button>
      <Button size='icon' variant='ghost' onClick={() => router.push(pathname + '/submit')}>
        <Icons.link className='text-secondary-foreground' />
      </Button>
    </li>
  )
}

export default MiniCreatePost
