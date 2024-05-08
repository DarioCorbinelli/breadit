import { AUTH_ROUTES, DEFAULT_REDIRECT_URL, REDIRECT_URL_COOKIE } from '@/config/auth.config'
import { absoluteUrl } from '@/helpers/routing'
import { auth } from '@/lib/next-auth'
import { i18nMiddleware } from '@/lib/next-intl/middleware'

export default auth((req) => {
  const originalUrl = req.headers.get('referer') || req.nextUrl.href
  const redirectUrl = AUTH_ROUTES.some((r) => originalUrl.includes(r)) ? absoluteUrl(DEFAULT_REDIRECT_URL) : originalUrl
  
  const res = i18nMiddleware(req)
  
  res.cookies.set(REDIRECT_URL_COOKIE, redirectUrl)

  return res
})

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
