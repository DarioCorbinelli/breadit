import AccountNav from '@/components/AccountNav'
import { Icons } from '@/components/Icons'
import SignInBtn from '@/components/SignInBtn'
import ThemeSwitcher from '@/components/ThemeSwitch'
import { getAuthSession } from '@/lib/auth'
import Link from 'next/link'
import { FC } from 'react'

interface NavbarProps {}

const Navbar: FC<NavbarProps> = async ({}) => {
  const session = await getAuthSession()

  return (
    <div className='bg-navigation border-b py-2 relative z-10 '>
      <div className='container flex justify-between items-center'>
        {/* logo */}
        <Link href='/' className='flex items-center gap-2 outline-offset-4'>
          <Icons.logo className='w-8 lg:w-6' />
          <span className='hidden lg:block text-sm'>Breadit</span>
        </Link>

        {/* search bar */}

        {/* account */}
        <div className='flex items-center gap-4'>
          <ThemeSwitcher />
          {session ? (
            <AccountNav />
          ) : (
            <SignInBtn size="sm" />
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
