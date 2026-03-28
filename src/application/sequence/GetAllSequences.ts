import type { ISequenceRepository } from '@/domain/repositories/ISequenceRepository'
import type { Sequence } from '@/domain/entities/Sequence'

export class GetAllSequences {
  constructor(
    private readonly sequenceRepo: ISequenceRepository,
  ) {}

  async execute(): Promise<Sequence[]> {
    return this.sequenceRepo.findAll();

  }
}