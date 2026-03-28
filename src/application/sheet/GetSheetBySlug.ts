import type { ISheetRepository } from '@/domain/repositories/ISheetRepository'
import type { Sheet } from '@/domain/entities/Sheet'

export class GetSheetBySlug {
    constructor(private readonly sheetRepo : ISheetRepository){}
    
    async execute(slug : string) : Promise<Sheet|null> {
        if (!slug) throw new Error('GetSheetBySlug use case : Slug is required');
        return this.sheetRepo.findOneBySlug(slug);
    }
}