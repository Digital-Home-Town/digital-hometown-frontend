import React, { ReactNode, createContext, useState } from "react"
import PostService from "src/services/PostService"

export interface PostContextI {
  posts: Post[]
  deletePost: (post: Post) => void
}

const PostContext = createContext<undefined | PostContextI>(undefined)

export function PostProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([])

  React.useEffect(() => {
    const getPosts = async () => {
      const data = await PostService.getAll()
      console.log(data)
      if (data) {
        setPosts(data)
      }
    }
    if (!posts.length) getPosts()
  }, [posts])

  const deletePost = async (post: Post) => {
    await PostService.delete(post)
    setPosts(posts.filter((p) => p.id !== post.id))
  }

  return (
    <PostContext.Provider
      value={{
        posts: posts,
        deletePost: deletePost,
      }}
    >
      {children}
    </PostContext.Provider>
  )
}

export default function usePostContext() {
  const context = React.useContext(PostContext)

  if (context === undefined) {
    throw new Error("usePostContext should be used within an PostProvider.")
  }

  return context
}
