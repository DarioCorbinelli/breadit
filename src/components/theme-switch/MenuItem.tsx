import { Icons } from "@/components/Icons"
import { DropdownMenuItem } from "@/components/ui/DropdownMenu"
import { LucideProps } from "lucide-react"
import { useTheme } from "next-themes"
import { FC, ReactNode } from "react"

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

export default MenuItem