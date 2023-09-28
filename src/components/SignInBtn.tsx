"use client"

import { buttonVariants } from '@/components/ui/Button'
import Link from 'next/link'
import { FC } from 'react'
import type { ClassProp } from 'class-variance-authority/types'
import { VariantProps } from 'class-variance-authority'
import { usePathname } from 'next/navigation'
import type { LinkProps } from 'next/link'

interface SignInBtnProps extends VariantProps<typeof buttonVariants>, Omit<LinkProps, "href"> {}

const SignInBtn: FC<SignInBtnProps & ClassProp> = ({size = "sm", variant = "default", className, ...props}) => {
  const pathname = usePathname()

  return (
    <Link href={`/sign-in${pathname.length > 1 ? `?redirectUrl=${pathname}` : ""}`} className={buttonVariants({size, variant, className})} {...props}>
      Accedi
    </Link>
  )
}

export default SignInBtn
