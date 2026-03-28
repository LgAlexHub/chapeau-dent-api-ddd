import { Exercice } from '@/domain/entities/Exercice'
import { IExerciceRepository } from '@/domain/repositories/IExerciceRepository'

export class CreateExercice {
  constructor(private readonly exerciceRepository: IExerciceRepository) {}

  async execute(data: Omit<Exercice, 'id'>): Promise<Exercice> {
    // Ici on pourrait ajouter une validation, normalisation du slug, etc.
    return this.exerciceRepository.create(data)
  }
}