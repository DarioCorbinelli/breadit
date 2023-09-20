import Link from 'next/link'
import { FC } from 'react'

interface pageProps {
  
}

const page: FC<pageProps> = ({}) => {
  return <div>create community <Link href="/sign-in?redirectUrl=/r/create">login</Link></div>
}

export default page