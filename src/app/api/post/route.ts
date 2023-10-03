import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { PostValidator } from '@/lib/validators/post'
import { ZodError } from 'zod'

export async function POST(req: Request) {
  try {
    // check validity of req body
    const body = await req.json()
    const { subredditId, title, content } = PostValidator.parse(body)

    // check if authenticated
    const session = await getAuthSession()
    if (!session) return new Response('Unauthenticated', { status: 401 })

    // check if subreddit exists
    const subreddit = await db.subreddit.findUnique({
      where: { id: subredditId },
      include: {
        subscribers: true,
      },
    })
    if (!subreddit) return new Response('Subreddit does not exist', { status: 404 })

    // check if autho
    const isOwner = subreddit.ownerId === session.user.id
    const subscriber = subreddit.subscribers.some(sub => sub.id === session.user.id)
    if (!isOwner && !subscriber) return new Response('Cannot crate post. You\' not part of this subreddit: join to post', { status: 403 })

    await db.post.create({
      data: {
        title,
        content,
        authorId: session.user.id,
        subredditId,
      },
    })

    return new Response('OK')
  } catch (e) {
    if (e instanceof ZodError) {
      return new Response(e.message, { status: 400 })
    }

    return new Response('Could not create post. Please try again later...', { status: 500 })
  }
}
