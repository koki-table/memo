/* eslint-disable @typescript-eslint/no-unused-vars */
import { getFirestore, CollectionReference, collection, DocumentData } from 'firebase/firestore'

import { Note } from '@/types/Note'

export const firestore = getFirestore()

// This is just a helper to add the type to the db responses
const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(firestore, collectionName) as CollectionReference<T>
}

export const notesCol = createCollection<Note>('notes')
