import { db } from "@/infrastructure/firebase/firestoreClient";
import type { ISequenceRepository } from "@/domain/repositories/ISequenceRepository";
import type { Sequence } from "@/domain/entities/Sequence";

const COLLECTION = "sequences";

export class FirestoreSequenceRepository implements ISequenceRepository {
    async findAll(): Promise<Sequence[]> {
        const snapshot = await db.collection(COLLECTION).get();
        return snapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<Sequence, "id">),
        }));
    }

    async findBySlug(slug: string): Promise<Sequence | null> {
        const snapshot = await db.collection(COLLECTION)
            .where("slug", "==", slug).limit(1).get();
        if (snapshot.empty) return null;
        const doc = snapshot.docs[0];
        return { id: doc.id, ...(doc.data() as Omit<Sequence, "id">) };
    }

    async findOneById(id: string): Promise<Sequence | null> {
        const doc = await db.collection(COLLECTION).doc(id).get();
        if (!doc.exists) return null;
        return { id: doc.id, ...(doc.data() as Omit<Sequence, "id">) };
    }

    async create(data: Omit<Sequence, "id">): Promise<Sequence> {
        const ref = await db.collection(COLLECTION).add(data);
        const snap = await ref.get();
        return { id: ref.id, ...(snap.data() as Omit<Sequence, "id">) };
    }

    async update(
        id: string,
        data: Partial<Omit<Sequence, "id">>,
    ): Promise<Sequence | null> {
        const ref = db.collection(COLLECTION).doc(id);
        const doc = await ref.get();
        if (!doc.exists) return null;
        await ref.update(data);
        const updated = await ref.get();
        return { id: updated.id, ...(updated.data() as Omit<Sequence, "id">) };
    }
}
