'use client'

import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { signIn } from 'next-auth/react'
import { FC, HTMLAttributes, useState } from 'react'

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({className, ...props}) => {
  const [isLoading, setIsLoading] = useState(false)

  const loginWithGoogle = async () => {
    setIsLoading(true)

    try {
      await signIn('google', {callbackUrl: window.location.origin})
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("w-full", className)} {...props}>
      <Button className='w-full gap-2' icon={Icons.google} loader={isLoading} onClick={() => loginWithGoogle()}>
        Google
      </Button>
    </div>
  )
}

export default UserAuthForm
