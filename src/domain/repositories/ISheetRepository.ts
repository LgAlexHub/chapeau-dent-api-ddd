import type { Sheet } from "@/domain/entities/Sheet";

export interface ISheetRepository {
    findOneBySlug(slug: string): Promise<Sheet | null>;
    findHeadersWhereSlugIn(slugs: string[]): Promise<Record<string, string>>;
    create(data: Omit<Sheet, "id">): Promise<Sheet>;
}
