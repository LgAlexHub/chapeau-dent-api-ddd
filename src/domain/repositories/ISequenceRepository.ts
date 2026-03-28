import type { Sequence } from "@/domain/entities/Sequence";

export interface ISequenceRepository {
    findAll(): Promise<Sequence[]>;
    findBySlug(slug: string): Promise<Sequence | null>;
    findOneById(id: string): Promise<Sequence | null>;
    // paginate() : Promise<Sequence[]>;
    create(data: Omit<Sequence, "id">): Promise<Sequence>;
    update(
        id: string,
        data: Partial<Omit<Sequence, "id">>,
    ): Promise<Sequence | null>;
}
