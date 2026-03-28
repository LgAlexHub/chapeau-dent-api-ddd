import type { ISequenceRepository } from '@/domain/repositories/ISequenceRepository'
import type { ISheetRepository } from '@/domain/repositories/ISheetRepository'
import type { Sequence } from '@/domain/entities/Sequence'

type EnrichedSequence = Sequence & {
  nodes: (Sequence['nodes'][number] & { title: string })[]
}

export class GetSequenceBySlug {
  constructor(
    private readonly sequenceRepo: ISequenceRepository,
    private readonly sheetRepo: ISheetRepository
  ) {}

  async execute(slug: string): Promise<EnrichedSequence | null> {
    if (!slug) throw new Error('GetSequenceBySlug use case : Slug is required')

    const sequence = await this.sequenceRepo.findBySlug(slug)
    if (!sequence) return null

    const sheetHeaders = await this.sheetRepo.findHeadersWhereSlugIn(
      sequence.nodes.map(n => n.targetSlug)
    )

    const enrichedNodes = sequence.nodes.map(node => ({
      ...node,
      title: sheetHeaders[node.targetSlug] ?? node.targetSlug,
    }))

    return { ...sequence, nodes: enrichedNodes }
  }
}