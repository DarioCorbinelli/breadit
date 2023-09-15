import UserAuth from '@/components/UserAuth'
import { getAuthSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { FC } from 'react'

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const session = await getAuthSession()

  if (session) redirect('/')

  return <UserAuth type='signUp' />
}

export default page