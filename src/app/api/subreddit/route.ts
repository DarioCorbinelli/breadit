import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { CreateSubredditValidator } from '@/lib/validators/subreddit'
import { z } from 'zod'

export async function POST(req: Request) {
  try {
    // check if logged in
    const session = await getAuthSession()
    if (!session?.user) return new Response('Unauthenticated', { status: 401 })

    // validate req payload
    const body = await req.json()
    const { name } = CreateSubredditValidator.parse(body)

    // check subreddit existance
    const existingSubreddit = await db.subreddit.findFirst({
      where: { name },
    })
    if (existingSubreddit) return new Response('Subreddit already exists', { status: 409 })

    // if everything ok, create subreddit
    const subreddit = await db.subreddit.create({
      data: {
        name,
        ownerId: session.user.id,
      },
    })

    return new Response(subreddit.name)
  } catch (e) {
    if (e instanceof z.ZodError) return new Response(e.message, { status: 422 })

    return new Response('Could not create subreddit', { status: 500 })
  }
}
