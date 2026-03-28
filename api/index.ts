import { Router, error, json } from 'itty-router'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { registerSheetRoutes } from '@/routes/sheetRoutes'
import { registerSequenceRoutes } from '@/routes/sequenceRoutes'
import { setCorsHeaders } from '@/middlewares/withCors'

const router = Router({ base: '/api' })

router.get('/ping', () => ({ message: 'pong' }))

registerSheetRoutes(router)
registerSequenceRoutes(router)

router.all('*', () => error(404, 'Not found'))

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCorsHeaders(res)
  const url = `http://localhost${req.url}`

  const webRequest = new Request(url, {
    method: req.method || 'GET',
    headers: req.headers as HeadersInit,
    // pour GET/HEAD, laisser body undefined
  })

  const response = await router.fetch(webRequest).then(json).catch(error)
  const body = await response.json()
  res.status(response.status).json(body)
}