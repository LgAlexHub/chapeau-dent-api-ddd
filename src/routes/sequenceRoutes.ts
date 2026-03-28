import type { RouterType, IRequest } from 'itty-router'
import { SequenceController } from '@/controllers/sequenceController'
import type { Sequence } from '@/models/SequenceModel'

type SequenceInput = Omit<Sequence, 'id'>

export const registerSequenceRoutes = (router: RouterType) => {
  // GET /api/sequences
  router.get('/sequences', () => {
    return SequenceController.getAll()
  })

  // GET /api/sequences/:slug
  router.get('/sequences/:slug', (request: IRequest) => {
    const slug = request.params?.slug as string | undefined
    return SequenceController.getOne(slug)
  })

  // POST /api/sequences
  router.post('/sequences', async (request: IRequest) => {
    const body = (await request.json().catch(() => null)) as SequenceInput | null
    return SequenceController.create(body)
  })
}