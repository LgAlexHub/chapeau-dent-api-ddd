import type { IExerciceRepository } from '@/domain/repositories/IExerciceRepository'
import type { Exercice } from '@/domain/entities/Exercice'

export class GetExerciceBySlug {
    constructor(private readonly exerciceRepo : IExerciceRepository){}
    
    async execute(slugs : string[]) : Promise<Exercice[]> {
        if (slugs.length < 1) throw new Error('GetExerciceBySlug use case : Slug is required');
        return this.exerciceRepo.findManyInSlugs(slugs);
    }
}