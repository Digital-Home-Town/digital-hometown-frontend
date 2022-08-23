import { CollectionReference, doc, setDoc } from "firebase/firestore"
import { postCollection } from "src/firebase-config"

class PostService {
  private collection: CollectionReference<Post>

  constructor(collection: CollectionReference<Post>) {
    this.collection = collection
  }

  async create(post: Post) {
    await setDoc(doc(this.collection), post)
  }
}

export default new PostService(postCollection)
