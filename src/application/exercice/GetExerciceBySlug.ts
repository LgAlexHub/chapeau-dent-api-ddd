import type { IExerciceRepository } from '@/domain/repositories/IExerciceRepository'
import type { Exercice } from '@/domain/entities/Exercice'

export class GetExerciceBySlug {
    constructor(private readonly exerciceRepo : IExerciceRepository){}
    
    async execute(slug : string) : Promise<Exercice|null> {
        if (!slug) throw new Error('GetExerciceBySlug use case : Slug is required');
        return this.exerciceRepo.findOneBySlug(slug);
    }
}