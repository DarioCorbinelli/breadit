import { db } from "@/lib/db"
import { PrismaAdapter } from "@auth/prisma-adapter"
import type {AuthOptions} from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import {nanoid} from "nanoid"

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async session({session, token}) {
      session.user.id = token.id
      session.user.username = token.username

      return session
    },
    async jwt({token}) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email
        }
      })

      token.id = dbUser!.id
      token.username = dbUser?.username

      if (!dbUser?.username) {
        const updatedUser = await db.user.update({
          where: {
            id: dbUser!.id
          },
          data: {
            username: nanoid(11)
          }
        })

        token.username = updatedUser.username
      }

      return token
    }
  }
}