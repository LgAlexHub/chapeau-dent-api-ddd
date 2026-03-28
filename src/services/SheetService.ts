import { db } from '@/services/firestoreClient'
import type { Sheet } from '@/models/SheetModel'

const collectionName = 'sheets'

export async function findOneById(id: string): Promise<Sheet | null> {
  const doc = await db.collection(collectionName).doc(id).get()
  if (!doc.exists) return null
  return { id: doc.id, ...(doc.data() as Omit<Sheet, 'id'>) }
}

export async function findOneBySlug(slug: string): Promise<Sheet | null> {
  const snapshot = await db
    .collection('sheets')
    .where('slug', '==', slug)
    .limit(1)
    .get()

  if (snapshot.empty) {
    return null
  }

  const doc = snapshot.docs[0]
  return {
    id: doc.id,
    ...(doc.data() as Omit<Sheet, 'id'>)
  }
}

export async function createSheet(data: Omit<Sheet, 'id'>): Promise<Sheet> {
  const ref = await db.collection(collectionName).add(data)
  const snapshot = await ref.get()
  return { id: ref.id, ...(snapshot.data() as Omit<Sheet, 'id'>) }
}

export async function updateSheet(
  id: string,
  data: Partial<Omit<Sheet, 'id'>>
): Promise<Sheet | null> {
  const ref = db.collection(collectionName).doc(id)
  const doc = await ref.get()
  if (!doc.exists) return null

  await ref.update(data)
  const updated = await ref.get()
  return { id: updated.id, ...(updated.data() as Omit<Sheet, 'id'>) }
}

export async function findHeadersWhereSlugIn(slugs: string[]): Promise<Record<string, string>> {
  if (slugs.length < 1) return {}

  const sheetHeaders: Record<string, string> = {}

  const snapshot = await db.collection(collectionName)
    .where('slug', 'in', slugs)
    .select('slug', 'skillTitle')
    .get()

  snapshot.docs.forEach(doc => {
    const { slug, skillTitle } = doc.data()
    if (slug && skillTitle) sheetHeaders[slug] = skillTitle
  })

  return sheetHeaders
}


// export async function dumpAll(): Promise<Sheet[]> {
//   const snapshot = await db.collection(collectionName).get()
//   return snapshot.docs.map(doc => ({
//     id: doc.id,
//     ...(doc.data() as Omit<Sheet, 'id'>)
//   }))
// }