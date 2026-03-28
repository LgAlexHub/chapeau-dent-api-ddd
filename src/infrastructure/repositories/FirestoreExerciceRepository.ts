import { db } from "@/infrastructure/firebase/firestoreClient";
import type { IExerciceRepository } from "@/domain/repositories/IExerciceRepository";
import type { Exercice } from "@/domain/entities/Exercice";

const COLLECTION = "exercices";

export class FirestoreExerciceRepository implements IExerciceRepository {
    async findOneBySlug(slug: string): Promise<Exercice | null> {
        const snapshot = await db.collection(COLLECTION)
            .where("slug", "==", slug).limit(1).get();
        if (snapshot.empty) return null;
        const doc = snapshot.docs[0];
        return { id: doc.id, ...(doc.data() as Omit<Exercice, "id">) };
    }

    async findManyInSlugs(
        slugs: string[],
    ): Promise<Exercice[]> {
        if (slugs.length < 1) return [];
        const snapshot = await db.collection(COLLECTION)
            .where("slug", "in", slugs)
            .get();
        return snapshot.docs.map(doc => doc.data() as Exercice);
    }

    async create(data: Omit<Exercice, "id">): Promise<Exercice> {
        const ref = await db.collection(COLLECTION).add(data);
        const snapshot = await ref.get();
        return { id: ref.id, ...(snapshot.data() as Omit<Exercice, "id">) };
    }
}
