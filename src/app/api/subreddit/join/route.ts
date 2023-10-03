import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { JoinLeaveSubredditValidator } from '@/lib/validators/subreddit'
import { ZodError } from 'zod'

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()
    if (!session) return new Response('Unauthenticated', { status: 401 })

    const body = await req.json()
    const { subredditId } = JoinLeaveSubredditValidator.parse(body)

    // check if subreddit exists
    const subreddit = await db.subreddit.findUnique({
      where: {
        id: subredditId,
      },
      include: {
        subscribers: true,
      },
    })
    if (!subreddit) return new Response('Subreddit does not exist', { status: 404 })
    
    // check if user has already joined subreddit or is owner
    const isOwner = subreddit.ownerId === session.user.id
    const subscriberExists = subreddit.subscribers.find((sub) => sub.id === session.user.id)
    if (subscriberExists || isOwner) return new Response('You already joined this subreddit', { status: 409 })

    // subscribe user to subreddit
    await db.subreddit.update({
      where: { id: subredditId },
      data: {
        subscribers: {
          connect: { id: session.user.id },
        },
      },
    })

    return new Response("Joined subreddit")
  } catch (e) {
    if (e instanceof ZodError) return new Response(e.message, {status: 422})

    return new Response("Could not join subreddit. Please try again later...", {status: 500})
  }
}