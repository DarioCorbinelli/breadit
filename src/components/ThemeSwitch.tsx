'use client'

import { Icons } from '@/components/Icons'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/DropdownMenu'
import { Button } from '@/components/ui/Button'
import { LucideProps } from 'lucide-react'
import { useTheme } from 'next-themes'
import { FC, ReactNode, useEffect, useState } from 'react'

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



// ----------------------------------------------------------------------------------------
// MENU ITEM ------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------

interface MenuItemProps {
  theme: 'light' | 'dark' | 'system'
  children: ReactNode
}

const MenuItem: FC<MenuItemProps> = ({ theme, children }) => {
  const {setTheme} = useTheme()

  let Icon: FC<LucideProps> = Icons.sun
  if (theme === 'dark') Icon = Icons.moon
  else if (theme === 'system') Icon = Icons.system

  return (
    <DropdownMenuItem className='gap-2' onClick={() => setTheme(theme)}>
      <Icon className='h-5 w-5' />
      <p className='text-sm'>{children}</p>
    </DropdownMenuItem>
  )
}