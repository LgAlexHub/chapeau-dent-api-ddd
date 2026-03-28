import { Router, error, json } from 'itty-router'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { setCorsHeaders } from '@/presentation/middlewares/withCors'

// Infrastructure
import { FirestoreSheetRepository } from '@/infrastructure/repositories/FirestoreSheetRepository'
import { FirestoreSequenceRepository } from '@/infrastructure/repositories/FirestoreSequenceRepository'

// Application — Use Cases
import { GetSheetBySlug } from '@/application/sheet/GetSheetBySlug'
import { CreateSheet } from '@/application/sheet/CreateSheet'
import { GetAllSequences } from '@/application/sequence/GetAllSequences'
import { GetSequenceBySlug } from '@/application/sequence/GetSequenceBySlug'
import { CreateSequence } from '@/application/sequence/CreateSequence'

// Presentation
import { makeSheetController } from '@/presentation/controllers/sheetController'
import { makeSequenceController } from '@/presentation/controllers/sequenceController'
import { registerSheetRoutes } from '@/presentation/routes/sheetRoutes'
import { registerSequenceRoutes } from '@/presentation/routes/sequenceRoutes'

// ── Composition ───────────────────────────────────────────────────────────────
const sheetRepo = new FirestoreSheetRepository()
const sequenceRepo = new FirestoreSequenceRepository()

const sheetController = makeSheetController(
  new GetSheetBySlug(sheetRepo),
  new CreateSheet(sheetRepo)
)

const sequenceController = makeSequenceController(
  new GetAllSequences(sequenceRepo),
  new GetSequenceBySlug(sequenceRepo, sheetRepo),
  new CreateSequence(sequenceRepo)
)

// ── Router ────────────────────────────────────────────────────────────────────
const router = Router({ base: '/api' })
router.get('/ping', () => ({ message: 'pong' }))
registerSheetRoutes(router, sheetController)
registerSequenceRoutes(router, sequenceController)
router.all('*', () => error(404, 'Not found'))

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCorsHeaders(res)
  const url = `http://localhost${req.url}`
  const webRequest = new Request(url, {
    method: req.method || 'GET',
    headers: req.headers as HeadersInit,
  })
  const response = await router.fetch(webRequest).then(json).catch(error)
  const body = await response.json()
  res.status(response.status).json(body)
}