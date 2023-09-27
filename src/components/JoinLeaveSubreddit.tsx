'use client'

import { Button } from '@/components/ui/Button'
import { useCustomToasts } from '@/hooks/use-custom-toasts'
import { toast } from '@/hooks/use-toast'
import { JoinLeaveSubredditPayload } from '@/lib/validators/subreddit'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { FC, startTransition } from 'react'

interface JoinLeaveSubredditProps {
  isSubscribed: boolean
  subredditId: string
  subredditName: string
}

const JoinLeaveSubreddit: FC<JoinLeaveSubredditProps> = ({ isSubscribed, subredditId, subredditName }) => {
  const router = useRouter()
  const { loginToast } = useCustomToasts()

  const { mutate: leaveSubreddit, isLoading: isUnsubLoading } = useMutation({
    mutationFn: async () => {
      const payload: JoinLeaveSubredditPayload = { subredditId }

      const { data } = await axios.post('/api/subreddit/leave', payload)
      return data as string
    },
    onSuccess: () => {
      startTransition(() => {
        router.refresh()

        toast({
          title: 'Community abbandonata',
          description: `Non fai più parte di r/${subredditName}`,
        })
      })
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) return loginToast(`/r/${subredditName}`)
      }

      toast({
        title: 'Si è verificato un problema.',
        description: 'Qualcosa è andato storto. Per favore prova di nuovo.',
        variant: 'destructive',
      })
    },
  })

  const { mutate: joinSubreddit, isLoading: isSubLoading } = useMutation({
    mutationFn: async () => {
      const payload: JoinLeaveSubredditPayload = { subredditId }

      const { data } = await axios.post('/api/subreddit/join', payload)
      return data as string
    },
    onSuccess: () => {
      startTransition(() => {
        router.refresh()

        toast({
          title: 'Fantastico!',
          description: `Fai ora parte di r/${subredditName}`,
        })
      })
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) return loginToast(`/r/${subredditName}`)
      }

      toast({
        title: 'Si è verificato un problema.',
        description: 'Qualcosa è andato storto. Per favore prova di nuovo.',
        variant: 'destructive',
      })
    },
  })

  return isSubscribed ? (
    <Button className='w-full' onClick={() => leaveSubreddit()} loader={isUnsubLoading}>
      Abbandona
    </Button>
  ) : (
    <Button className='w-full' onClick={() => joinSubreddit()} loader={isSubLoading}>
      Partecipa
    </Button>
  )
}

export default JoinLeaveSubreddit
