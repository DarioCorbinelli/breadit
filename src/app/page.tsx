import { Icons } from '@/components/Icons'
import { buttonVariants } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <h1 className='text-4xl font-bold'>Il tuo feed</h1>
      <div className='grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-y-4 gap-x-4 mt-4'>
        <div>posts</div>
        <div className='border rounded-md order-first md:order-last'>
          <div className='p-4 bg-secondary border-b'>
            <p className='flex items-center gap-1 font-medium'>
              <Icons.home className='h-4 w-4' />
              <span>Home</span>
            </p>
          </div>
          <div className='p-4 pb-8'>
            <p className='text-sm leading-6'>La tua Breadit homepage. Torna qua ogni volta che vuoi per restare al passo con le tue community preferite.</p>
            <Link href="/r/create" className={cn(buttonVariants(), "w-full mt-6")}>Crea Community</Link>
          </div>
        </div>
      </div>
    </>
  )
}
