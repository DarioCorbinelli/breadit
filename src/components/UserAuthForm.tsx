'use client'

import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { signIn } from 'next-auth/react'
import { FC, HTMLAttributes, useState } from 'react'

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({className, ...props}) => {
  const [isLoading, setIsLoading] = useState(false)
  const {toast} = useToast()

  const loginWithGoogle = async () => {
    setIsLoading(true)

    try {
      await signIn('google', {callbackUrl: window.location.origin})
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Ops. Qualcosa è andato storto",
        description: "C'è stato un errore tentando l'accesso con Google."
      })
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
