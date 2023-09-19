import { Icons } from '@/components/Icons'
import { buttonVariants } from '@/components/ui/Button'
import Link from 'next/link'
import { FC, ReactNode } from 'react'

interface layoutProps {
  children: ReactNode
}

const layout: FC<layoutProps> = ({ children }) => {
  return (
    <div className='max-w-2xl mx-auto absolute inset-y-0 inset-x-4 flex flex-col justify-center gap-24'>
      <div className='relative'>
        <Link href='/' className={buttonVariants({ variant: 'ghost', className: 'gap-1 self-start absolute -top-[10rem]' })}>
          <Icons.back className='h-4 w-4' />
          <span>Home</span>
        </Link>
        {children}
      </div>
    </div>
  )
}

export default layout
