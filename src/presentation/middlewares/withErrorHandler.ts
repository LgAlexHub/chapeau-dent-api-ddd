import type { VercelRequest, VercelResponse } from '@vercel/node'

type Handler = (req: VercelRequest, res: VercelResponse) => Promise<void | VercelResponse>
export const withErrorHandler = (handler: Handler): Handler =>
  async (req, res) => {
    try {
      await handler(req, res)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'Internal server error' })
    }
  }
