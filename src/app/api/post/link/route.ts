import axios from 'axios'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const href = url.searchParams.get('url')

  if (!href) return new Response('Invalid url', { status: 400 })

  const { data: html } = await axios.get(href)
  const { title, description, imageUrl } = parseHTML(html)

  const resPayload = {
    success: 1,
    meta: {
      title,
      description,
      image: imageUrl,
    },
  }

  return new Response(JSON.stringify(resPayload))
}

function parseHTML(html: string) {
  // Regex per estrarre il titolo
  const titleRegex = /<title>(.*?)<\/title>/i
  const titleMatch = html.match(titleRegex)
  const title = titleMatch ? titleMatch[1] : ''

  // Regex per estrarre la descrizione dalla meta tag 'description'
  const descriptionRegex = /<meta\s+name="description"\s+content="(.*?)"/i
  const descriptionMatch = html.match(descriptionRegex)
  const description = descriptionMatch ? descriptionMatch[1] : ''

  // Regex per estrarre l'URL dell'immagine dalla meta tag 'og:image'
  const imageUrlRegex = /<meta\s+property="og:image"\s+content="(.*?)"/i
  const imageUrlMatch = html.match(imageUrlRegex)
  const imageUrl = imageUrlMatch ? imageUrlMatch[1] : ''

  return { title, description, imageUrl }
}
