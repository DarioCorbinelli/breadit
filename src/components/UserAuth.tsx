import { Icons } from '@/components/Icons'
import UserAuthForm from '@/components/UserAuthForm'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { FC, HTMLAttributes } from 'react'

interface UserAuthProps extends HTMLAttributes<HTMLDivElement> {
  type: 'signIn' | 'signUp'
}

const UserAuth: FC<UserAuthProps> = ({ className, type, ...props }) => {
  return (
    <div className={cn('max-w-sm mx-auto flex flex-col items-center text-center gap-4', className)} {...props}>
      <Icons.logo className='h-10 w-10' />
      <h1 className='text-3xl font-semibold'>{type === 'signIn' ? 'Bentornato' : 'Benvenuto'}</h1>
      <p className='text-sm'>Continuando {type === 'signIn' ? 'accederai al tuo account Breadit' : 'creerai un nuovo account Breadit'} e accetti il nostro User Agreement e Privacy Policy.</p>
      <UserAuthForm className='mt-2' />
      {type === 'signIn' ? (
        <p className='text-sm text-muted-foreground mt-2'>
          Non hai ancora un account?{' '}
          <Link href='/sign-up' className='underline underline-offset-2'>
            Registrati
          </Link>
        </p>
      ) : (
        <p className='text-sm text-muted-foreground mt-2'>
          Hai già un account?{' '}
          <Link href='/sign-in' className='underline underline-offset-2'>
            Accedi
          </Link>
        </p>
      )}
    </div>
  )
}

export default UserAuth
