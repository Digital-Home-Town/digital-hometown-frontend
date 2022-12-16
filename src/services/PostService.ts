import {
  CollectionReference,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  QueryDocumentSnapshot,
  setDoc,
} from "firebase/firestore"
import { toast } from "react-toastify"
import { postCollection } from "src/firebase-config"

import { requestCount } from "./GenericProfileService"

class PostService {
  private collection: CollectionReference<Post>

  constructor(collection: CollectionReference<Post>) {
    this.collection = collection
  }

  async delete(post: Post) {
    deleteDoc(doc(this.collection, post.id))
  }

  getCreated(): number {
    return new Date().getTime()
  }

  async create(post: Post) {
    await setDoc(doc(this.collection), post)
  }

  async update(id: string, post: Post) {
    console.log(`${this.collection.path}: update ${requestCount}`)
    try {
      const userRef = doc(this.collection, id)
      await setDoc(userRef, post)
    } catch (error) {
      toast.error("Fehler beim Speichern des Posts.")
      throw error
    }
  }
  // not needed at the moment to get only one post
  // async get(id: string) {
  //   const resp = await this.getDocument(id)
  //   const post = resp.data()
  //   if (post) {
  //     post.tags = post.tags || []
  //     post.created = post?.created.toDate().getTime() || 0
  //   }
  //   return post
  // }
  // async getDocument(id: string) {
  //   const userRef = doc(this.collection, id)
  //   return await getDoc(userRef)
  // }

  async getAll() {
    const firebaseQuery = query(this.collection, orderBy("created", "desc"))

    const documents = await getDocs(firebaseQuery)

    return this.parsePosts(documents.docs)
  }

  parsePosts(documentData: QueryDocumentSnapshot<Post>[]): Post[] {
    return documentData
      .map((doc) => {
        let post = doc.data()
        post.id = doc.id
        post.tags = post.tags || []
        return post
      })
      .sort((a, b) => b.created - a.created)
  }
}

export default new PostService(postCollection)
