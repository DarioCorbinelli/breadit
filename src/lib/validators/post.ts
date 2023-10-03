import {z} from "zod"

export const PostValidator = z.object({
  title: z.string().min(3).max(128),
  subredditId: z.string(),
  content: z.any()
})

export type PostPayload = z.infer<typeof PostValidator>