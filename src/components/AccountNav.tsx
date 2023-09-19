"use client"

import { Icons } from '@/components/Icons'
import UserAvatar from '@/components/UserAvatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/DropdownMenu'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { FC } from 'react'

interface AccountNavProps {
  
}

const AccountNav: FC<AccountNavProps> = ({}) => {
  const {data: session} = useSession()
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='rounded-full'>
        <UserAvatar user={session?.user} className='h-8 w-8' />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          {session?.user.name && <p>{session.user.name}</p>}
          {session?.user.email && <p className=' w-[12rem] truncate text-muted-foreground font-normal'>{session.user.email}</p>}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/">Feed</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/r/create">Crea community</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings">Impostazioni</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='gap-2' onSelect={() => signOut({callbackUrl: `${window.location.origin}/sign-in`})}>
          <Icons.logout className='h-4 w-4' /> Esci
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AccountNav
