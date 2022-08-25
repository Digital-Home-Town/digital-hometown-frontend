import { CollectionReference, doc, getDoc, getDocs, query, setDoc } from "firebase/firestore"
import { postCollection } from "src/firebase-config"

class PostService {
  private collection: CollectionReference<Post>

  constructor(collection: CollectionReference<Post>) {
    this.collection = collection
  }

  async create(post: Post) {
    await setDoc(doc(this.collection), post)
  }

  async get(id: string) {
    const resp = await this.getDocument(id)
    const profile = resp.data()
    return profile
  }

  async getAll() {
    // const orderBy = profileQuery?.orderBy || "displayName"
    // const limit = profileQuery?.limit || 10

    const firebaseQuery = query(this.collection)

    const documents = await getDocs(firebaseQuery)
    const profiles = documents.docs.map((doc) => doc.data())
    return profiles
  }

  async getDocument(id: string) {
    const userRef = doc(this.collection, id)
    return await getDoc(userRef)
  }
}

export default new PostService(postCollection)
