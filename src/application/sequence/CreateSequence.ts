import { Sequence } from '@/domain/entities/Sequence'
import { ISequenceRepository } from '@/domain/repositories/ISequenceRepository'

export class CreateSequence {
  constructor(private readonly sequenceRepository: ISequenceRepository) {}

  async execute(data: Omit<Sequence, 'id'>): Promise<Sequence> {
    // Ici on pourrait ajouter une validation, normalisation du slug, etc.
    return this.sequenceRepository.create(data)
  }
}