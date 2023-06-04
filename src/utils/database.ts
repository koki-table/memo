/* eslint-disable @typescript-eslint/no-unused-vars */
import { getFirestore, CollectionReference, collection, DocumentData } from 'firebase/firestore'

import { UseAuth } from '@/features/auth'

export const db = getFirestore()

// 当初参考にした箇所
// const createCollection = <T = DocumentData>(collectionName: string) => {
//   return collection(db, collectionName) as CollectionReference<T>
// }
// export const recipesCol = createCollection<Recipe>('recipes')

// dbからのレスポンスに型を追加するためのユーティリティ関数
export const createCollection = <T = DocumentData>(
  collectionName: string,
  user: UseAuth['user']
) => {
  return collection(db, `users/${user!.uid.toString()}/${collectionName}`) as CollectionReference<T>
}
