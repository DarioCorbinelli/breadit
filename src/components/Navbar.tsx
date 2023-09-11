import { Icons } from '@/components/Icons'
import ThemeSwitcher from '@/components/theme-switch/ThemeSwitch'
import Link from 'next/link'
import { FC } from 'react'

interface NavbarProps {
  
}

const Navbar: FC<NavbarProps> = ({}) => {
  return <div className='bg-navigation border-b py-2'>
    <div className='container flex justify-between items-center'>
      {/* logo */}
      <Link href="/" className='flex items-center gap-2'>
        <Icons.logo className='w-8 lg:w-6' />
        <span className='hidden lg:block text-sm'>Breadit</span>
      </Link>

      {/* search bar */}

      {/* account */}
      <div>
        <ThemeSwitcher />
      </div>
    </div>
  </div>
}

export default Navbar