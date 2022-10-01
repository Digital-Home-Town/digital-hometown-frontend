import {
  CollectionReference,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  serverTimestamp,
  deleteDoc,
  limit,
} from "firebase/firestore"
import { postCollection } from "src/firebase-config"

class PostService {
  private collection: CollectionReference<Post>

  constructor(collection: CollectionReference<Post>) {
    this.collection = collection
  }

  async delete(post: Post) {
    deleteDoc(doc(this.collection, post.id))
  }

  async create(post: Post) {
    post.created = serverTimestamp()
    await setDoc(doc(this.collection), post)
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
    const firebaseQuery = query(this.collection, orderBy("created", "desc"), limit(20))

    const documents = await getDocs(firebaseQuery)
    const posts = documents.docs.map((doc) => {
      let post_ = doc.data()
      post_.id = doc.id
      post_.tags = post_.tags || []
      post_.created = post_?.created.toDate().getTime() || 0
      console.log("Post", post_)
      return post_
    })
    return posts
  }
}

export default new PostService(postCollection)
