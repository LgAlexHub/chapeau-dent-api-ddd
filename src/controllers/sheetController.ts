import { error } from 'itty-router'
import { findOneBySlug, createSheet } from '@/services/SheetService'
import type { Sheet } from '@/models/SheetModel'

type SheetInput = Omit<Sheet, 'id'>

export const SheetController = {
  async getOne(slug?: string) {
    if (!slug) {
      return error(400, 'Missing slug')
    }
    const sheet = await findOneBySlug(slug)
    if (!sheet) {
      return error(404, 'Sheet not found')
    }
    return sheet
  },

  async create(body: SheetInput | null) {
    if (!body || typeof body !== 'object') {
      return error(400, 'Missing body')
    }
    const sheet = await createSheet(body)
    return sheet
  },
}