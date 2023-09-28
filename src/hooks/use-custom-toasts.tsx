import SignInBtn from '@/components/SignInBtn'
import { toast } from '@/hooks/use-toast'

export const useCustomToasts = () => {
  const loginToast = () => {
    const { dismiss } = toast({
      title: 'Accesso richiesto',
      description: "Devi aver eseguito l'accesso per completare l'operazione.",
      variant: 'destructive',
      action: <SignInBtn onClick={() => dismiss()} size='default' variant='outline' className='text-white border-white bg-transparent hover:bg-accent/10 hover:text-white' />,
    })
  }

  return { loginToast }
}
