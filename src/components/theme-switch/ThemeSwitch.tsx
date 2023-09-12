'use client'

import { Icons } from '@/components/Icons'
import MenuItem from '@/components/theme-switch/MenuItem'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/DropdownMenu'
import { Button } from '@/components/ui/Button'
import { LucideProps } from 'lucide-react'
import { useTheme } from 'next-themes'
import { FC, useEffect, useState } from 'react'

interface ThemeSwitchProps {}

const ThemeSwitch: FC<ThemeSwitchProps> = ({}) => {
  const [isMounted, setIsMounted] = useState(false)
  const { theme } = useTheme()

  const ActiveThemeIcon: FC<LucideProps> = theme === 'light' ? Icons.sun : Icons.moon

  useEffect(() => setIsMounted(true), [])

  if (!isMounted)
    return (
      <Button variant='ghost' size='icon'>
        <Icons.loader className='h-5 w-5 animate-spin' />
      </Button>
    )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon'>
          <ActiveThemeIcon className='h-5 w-5' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <MenuItem theme='light'>Giorno</MenuItem>
        <MenuItem theme='dark'>Notte</MenuItem>
        <MenuItem theme='system'>Sistema</MenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ThemeSwitch
