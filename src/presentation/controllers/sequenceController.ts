import { error } from 'itty-router'
import type { GetAllSequences } from '@/application/sequence/GetAllSequences'
import type { GetSequenceBySlug } from '@/application/sequence/GetSequenceBySlug'
import type { Sequence } from '@/domain/entities/Sequence'
import { CreateSequence } from '@/application/sequence/CreateSequence'

export interface ISequenceController {
  getAll(): Promise<unknown>
  getOne(slug?: string): Promise<unknown>
  create(body: Omit<Sequence, 'id'> | null): Promise<unknown>
}

export const makeSequenceController = (
  getAllSequences: GetAllSequences,
  getSequenceBySlug: GetSequenceBySlug,
  createSequence: CreateSequence
) => ({
  async getAll() {
    return getAllSequences.execute()
  },

  async getOne(slug?: string) {
    if (!slug) return error(400, 'Missing slug parameter')
    const sequence = await getSequenceBySlug.execute(slug)
    if (!sequence) return error(404, 'Sequence not found')
    return sequence
  },

  async create(body: Omit<Sequence, 'id'> | null) {
    if (!body || typeof body !== 'object') return error(400, 'Missing body')
    return createSequence.execute(body)
  }
})