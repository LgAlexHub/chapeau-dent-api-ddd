import type { RouterType, IRequest } from 'itty-router'
import { SheetController } from '@/controllers/sheetController'
import type { Sheet } from '@/models/SheetModel'

type SheetInput = Omit<Sheet, 'id'>

export const registerSheetRoutes = (router: RouterType) => {
  router.get('/sheets/:slug', (request: IRequest) => {
    const slug = request.params?.slug as string | undefined
    return SheetController.getOne(slug)
  })

  router.post('/sheets', async (request: IRequest) => {
    const body = (await request.json().catch(() => null)) as SheetInput | null
    return SheetController.create(body)
  })
}