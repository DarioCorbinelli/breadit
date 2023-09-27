import { buttonVariants } from '@/components/ui/Button'
import { toast } from '@/hooks/use-toast'
import Link from 'next/link'

export const useCustomToasts = () => {
  const loginToast = (redirectUrl?: string) => {
    const { dismiss } = toast({
      title: 'Accesso richiesto',
      description: "Devi aver eseguito l'accesso per completare l'operazione.",
      variant: 'destructive',
      action: (
        <Link
          href={`/sign-in?redirectUrl=${redirectUrl}`}
          onClick={() => dismiss()}
          className={buttonVariants({ variant: 'outline', className: 'text-white border-white bg-transparent hover:bg-accent/10 hover:text-white' })}
        >
          Accedi
        </Link>
      ),
    })
  }

  return { loginToast }
}
