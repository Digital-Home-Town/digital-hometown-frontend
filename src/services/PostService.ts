import {
  CollectionReference,
  deleteDoc,
  doc,
  getDocs,
  orderBy as fOrderBy,
  query,
  QueryDocumentSnapshot,
  setDoc,
} from "firebase/firestore"
import { orderBy } from "lodash"
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

  async removePostsFromUser(userId: string) {
    const posts = await this.getAll()

    for (let post of posts) {
      if (post.author.id === userId) {
        this.delete(post)
      }
    }
  }

  async getAll() {
    const firebaseQuery = query(this.collection, fOrderBy("created", "desc"))

    const documents = await getDocs(firebaseQuery)

    return this.parsePosts(documents.docs)
  }

  parsePosts(documentData: QueryDocumentSnapshot<Post>[], currentUser?: User | Club | undefined | null): Post[] {
    const posts = documentData.map((doc) => {
      let post = doc.data()
      post.id = doc.id
      post.tags = post.tags || []
      return post
    })
    return orderBy(posts, "created", "desc")
      .filter((post) => !currentUser?.blocked?.includes(post.author.id))
      .filter((post) => {
        // display posts of the current user regardless of validity date
        if (currentUser?.id === post.author.id) {
          return true
        }

        // if no validity is set, the post is valid
        if (!(post.validityStart && post.validityEnd)) {
          return true
        }

        // validityStart is not set, check only if validityEnd is valid
        if (!post.validityStart && post.validityEnd >= new Date().getTime()) {
          return true
        }

        // validityEnd is not set, check only if validityStart is valid
        if (!post.validityEnd && post.validityStart <= new Date().getTime()) {
          return true
        }

        // if validity is set, check if it is valid
        if (post.validityStart <= new Date().getTime() && post.validityEnd >= new Date().getTime()) {
          return true
        }

        return false
      })
  }
}

export default new PostService(postCollection)
