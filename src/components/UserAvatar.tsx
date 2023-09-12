import { Icons } from '@/components/Icons'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { AvatarProps } from '@radix-ui/react-avatar'
import { User } from 'next-auth'
import { FC } from 'react'

interface UserAvatarProps extends AvatarProps {
  user?: Pick<User, 'image' | 'name'>
}

const UserAvatar: FC<UserAvatarProps> = ({ user, ...props }) => {
  return (
    <Avatar {...props}>
      {user?.image ? (
        <AvatarImage src={user.image} />
      ) : (
        <AvatarFallback>
          <span className='sr-only'>{user?.name}</span>
          <Icons.user />
        </AvatarFallback>
      )}
    </Avatar>
  )
}

export default UserAvatar
