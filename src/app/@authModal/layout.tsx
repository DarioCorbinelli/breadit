import BackBtn from '@/components/BackBtn'
import { Icons } from '@/components/Icons'
import { FC, ReactNode } from 'react'

interface layoutProps {
  children: ReactNode
}

const layout: FC<layoutProps> = ({ children }) => {
  return (
    <div className='absolute z-10 inset-0 flex justify-center items-center bg-foreground/50 container'>
      <div className='flex-1 bg-background rounded-lg max-w-md px-4 pt-20 pb-12 relative'>
        <BackBtn size='icon' variant='link' className='absolute top-4 right-4'>
          <Icons.close className='w-5 h-5 text-muted-foreground' />
        </BackBtn>
        {children}
      </div>
    </div>
  )
}

export default layout
