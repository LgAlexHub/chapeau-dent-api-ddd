import { error } from 'itty-router'
import { findAllSequences, findSequenceBySlug, createSequence } from '@/services/SequenceService'
import { findHeadersWhereSlugIn } from '@/services/SheetService'
import type { Sequence } from '@/models/SequenceModel'

type SequenceInput = Omit<Sequence, 'id'>

export const SequenceController = {
  async getOne(slug?: string) {
    if (!slug) {
      return error(400, 'Missing slug parameter')
    }

    const sequence = await findSequenceBySlug(slug)
    if (!sequence) {
      return error(404, 'Sequence not found')
    }

    const sheetHeaders = await findHeadersWhereSlugIn(
      sequence.nodes.map(n => n.targetSlug)
    )

    const enrichedNodes = sequence.nodes.map(node => ({
      ...node,
      title: sheetHeaders[node.targetSlug] ?? node.targetSlug,
    }))

    return { ...sequence, nodes: enrichedNodes }
  },

  async getAll() {
    const sequences = await findAllSequences()
    return sequences
  },

  async create(body: SequenceInput | null) {
    if (!body || typeof body !== 'object') {
      return error(400, 'Missing body')
    }
    const sequence = await createSequence(body)
    return sequence
  },
}