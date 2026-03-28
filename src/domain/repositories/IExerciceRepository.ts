import type { Exercice } from "@/domain/entities/Exercice";

export interface IExerciceRepository {
    findOneBySlug(slug: string): Promise<Exercice | null>;
    findManyInSlugs(slugs: string[]): Promise<Exercice[]>;
    create(data: Omit<Exercice, "id">): Promise<Exercice>;
}
