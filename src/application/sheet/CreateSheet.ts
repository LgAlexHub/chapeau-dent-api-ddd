import type { ISheetRepository } from '@/domain/repositories/ISheetRepository'
import type { Sheet } from '@/domain/entities/Sheet'

export class CreateSheet {
  constructor(private readonly sheetRepo: ISheetRepository) {}

  async execute(data: Omit<Sheet, 'id'>): Promise<Sheet> {
    // Ici on pourrait ajouter une validation, normalisation du slug, etc.
    return this.sheetRepo.create(data)
  }
}