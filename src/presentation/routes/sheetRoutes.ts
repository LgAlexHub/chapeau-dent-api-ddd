import { Sheet } from '@/domain/entities/Sheet'
import { ISheetController } from '@/presentation/controllers/sheetController'
import type { RouterType, IRequest } from 'itty-router'

type SheetInput = Omit<Sheet, 'id'>

export const registerSheetRoutes = (router: RouterType, SheetController: ISheetController) => {
  router.get('/sheets/:slug', (request: IRequest) => {
    const slug = request.params?.slug as string | undefined
    return SheetController.getOne(slug)
  })

  router.post('/sheets', async (request: IRequest) => {
    const body = (await request.json().catch(() => null)) as SheetInput | null
    return SheetController.create(body)
  })
}