import UserAuth from '@/components/UserAuth'
import { FC } from 'react'

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return <UserAuth type='signIn' />
}

export default page
