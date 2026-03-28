import type { ISheetRepository } from '@/domain/repositories/ISheetRepository'

export class GetSheetHeadersBySlug {
    constructor(private readonly sheetRepo: ISheetRepository){}

    async execute(slugs : string[]) : Promise<Record<string,string>> {
        if (!slugs || slugs.length < 1) throw new Error("GetSheetHeadersBySlug use case : At least one slug is required");
        return this.sheetRepo.findHeadersWhereSlugIn(slugs);
    }
}