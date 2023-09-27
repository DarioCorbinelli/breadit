import {z} from "zod"

export const CreateSubredditValidator = z.object({
  name: z.string().min(3).max(21)
})

export const JoinLeaveSubredditValidator = z.object({
  subredditId: z.string()
})

export type CreateSubredditPayload = z.infer<typeof CreateSubredditValidator>

export type JoinLeaveSubredditPayload = z.infer<typeof JoinLeaveSubredditValidator>