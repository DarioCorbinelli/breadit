import UserAuth from '@/components/UserAuth'
import { getAuthSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { FC } from 'react'

interface pageProps {
  searchParams: { [key: string]: string | undefined }
}

const page: FC<pageProps> = async ({ searchParams }) => {
  const session = await getAuthSession()

  if (session) redirect(searchParams.redirectUrl || '/')

  return <UserAuth type='signUp' redirectUrl={searchParams.redirectUrl} />
}

export default page
