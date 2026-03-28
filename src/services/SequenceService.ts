import { db } from '@/services/firestoreClient'
import type { Sequence } from '@/models/SequenceModel'

const collectionName = 'sequences'

export async function findAllSequences(): Promise<Sequence[]> {
  const snapshot = await db.collection(collectionName).get()
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Omit<Sequence, 'id'>)
  }))
}

export async function findSequenceBySlug(slug: string): Promise<Sequence | null> {
  const snapshot = await db.collection(collectionName).where('slug', '==', slug).limit(1).get()
  if (snapshot.empty) return null
  const doc = snapshot.docs[0]
  return { id: doc.id, ...(doc.data() as Omit<Sequence, 'id'>) }
}

export async function findOneById(id: string): Promise<Sequence | null> {
  const doc = await db.collection(collectionName).doc(id).get()
  if (!doc.exists) return null
  return { id: doc.id, ...(doc.data() as Omit<Sequence, 'id'>) }
}

export async function createSequence(data: Omit<Sequence, 'id'>): Promise<Sequence> {
  const ref = await db.collection(collectionName).add(data)
  const snap = await ref.get()
  return { id: ref.id, ...(snap.data() as Omit<Sequence, 'id'>) }
}

export async function updateSequence(
  id: string,
  data: Partial<Omit<Sequence, 'id'>>
): Promise<Sequence | null> {
  const ref = db.collection(collectionName).doc(id)
  const doc = await ref.get()
  if (!doc.exists) return null

  await ref.update(data)
  const updated = await ref.get()
  return { id: updated.id, ...(updated.data() as Omit<Sequence, 'id'>) }
}