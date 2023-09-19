"use client"

import { Button, ButtonProps } from '@/components/ui/Button'
import { useRouter } from 'next/navigation'
import { FC } from 'react'

interface BackBtnProps extends ButtonProps {}

const BackBtn: FC<BackBtnProps> = ({...props}) => {
  const router = useRouter()

  return <Button onClick={() => router.back()} {...props} />
}

export default BackBtn