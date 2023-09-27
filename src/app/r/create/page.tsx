'use client'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { CreateSubredditPayload, CreateSubredditValidator } from '@/lib/validators/subreddit'
import { useRouter } from 'next/navigation'
import { FC, FormEvent, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { toast } from '@/hooks/use-toast'
import { useCustomToasts } from '@/hooks/use-custom-toasts'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const router = useRouter()
  const { loginToast } = useCustomToasts()

  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<CreateSubredditPayload>({ resolver: zodResolver(CreateSubredditValidator) })

  const { mutate: createSubreddit, isLoading } = useMutation({
    mutationFn: async (data: CreateSubredditPayload) => {
      const payload = data

      const { data: subredditName } = await axios.post('/api/subreddit', payload)
      return subredditName as string
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast("/r/create")
        }

        if (err.response?.status === 409) {
          return toast({
            title: 'Subreddit già esistente.',
            description: 'Per piacere scegli un altro nome tra le 3 e le 21 lettere.',
            variant: 'destructive',
          })
        }

        if (err.response?.status === 422) {
          return toast({
            title: 'Nome subreddit non valido.',
            description: 'Per piacere scegli un nome tra le 3 e le 21 lettere.',
            variant: 'destructive',
          })
        }
      }

      toast({
        title: 'Ops... qualcosa è andato storto.',
        description: 'Non è stato possibile creare la subreddit.',
        variant: 'destructive',
      })
    },
    onSuccess: (subredditName) => alert(`will be forwarded to /r/${subredditName}`),
  })

  const formSubmitter = async (data: CreateSubredditPayload) => createSubreddit(data)

  return (
    <div className='rounded-md p-8 bg-card max-w-3xl mx-auto'>
      <h1 className='text-xl font-semibold'>Crea Community</h1>
      <hr className='my-8' />
      <h2 className='text-lg font-medium'>Name</h2>
      <p className='text-xs pb-2'>Il nome della community non potrà più essere cambiato.</p>
      <form onSubmit={handleSubmit(formSubmitter)}>
        <div className='relative'>
          <p className='absolute left-0 inset-y-0 w-8 flex justify-center items-center text-sm text-muted-foreground'>r/</p>
          <Input className='pl-6' {...register('name')} />
        </div>
        <div className='flex items-center justify-end gap-2 mt-2'>
          <Button type='button' variant='ghost' onClick={() => router.back()}>
            Indietro
          </Button>
          <Button type='submit' loader={isLoading} disabled={!isValid}>
            Crea Community
          </Button>
        </div>
      </form>
    </div>
  )
}

export default page
