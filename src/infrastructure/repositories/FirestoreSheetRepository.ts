import { db } from "@/infrastructure/firebase/firestoreClient";
import type { ISheetRepository } from "@/domain/repositories/ISheetRepository";
import type { Sheet } from "@/domain/entities/Sheet";

const COLLECTION = "sheets";

export class FirestoreSheetRepository implements ISheetRepository {
    async findOneById(id: string): Promise<Sheet | null> {
        const doc = await db.collection(COLLECTION).doc(id).get();
        if (!doc.exists) return null;
        return { id: doc.id, ...(doc.data() as Omit<Sheet, "id">) };
    }

    async findOneBySlug(slug: string): Promise<Sheet | null> {
        const snapshot = await db.collection(COLLECTION)
            .where("slug", "==", slug).limit(1).get();
        if (snapshot.empty) return null;
        const doc = snapshot.docs[0];
        return { id: doc.id, ...(doc.data() as Omit<Sheet, "id">) };
    }

    async findHeadersWhereSlugIn(
        slugs: string[],
    ): Promise<Record<string, string>> {
        if (slugs.length < 1) return {};
        const result: Record<string, string> = {};
        const snapshot = await db.collection(COLLECTION)
            .where("slug", "in", slugs)
            .select("slug", "skillTitle")
            .get();
        snapshot.docs.forEach((doc) => {
            const { slug, skillTitle } = doc.data();
            if (slug && skillTitle) result[slug] = skillTitle;
        });
        return result;
    }

    async create(data: Omit<Sheet, "id">): Promise<Sheet> {
        const ref = await db.collection(COLLECTION).add(data);
        const snapshot = await ref.get();
        return { id: ref.id, ...(snapshot.data() as Omit<Sheet, "id">) };
    }
}
