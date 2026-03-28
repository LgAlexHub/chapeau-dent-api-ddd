import type { RouterType, IRequest } from 'itty-router'
import { ISequenceController } from '@/presentation/controllers/sequenceController'
import { Sequence } from '@/domain/entities/Sequence'

type SequenceInput = Omit<Sequence, 'id'>

export const registerSequenceRoutes = (router: RouterType, SequenceController : ISequenceController) => {
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
    if (!body) return;
    return SequenceController.create(body)
  })
}