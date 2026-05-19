import { PostCard, type PostListType } from '@/components/cards/post'

const getPosts = async (): Promise<PostListType> => {
  const response = await fetch(
    `https://pepa.dev/api/v1/posts?blogSlug=${process.env.ORGANI_BLOG_SLUG}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.ORGANI_API_KEY}`,
      },
      cache: 'no-store',
    }
  )

  if (!response.ok) {
    throw new Error(`Failed to load posts: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

const BlogPostListPage = async () => {
  const data = await getPosts()

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-12 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl text-center font-semibold text-slate-900 mb-10">Blog</h1>

        {data.items.length === 0 ? (
          <p className="text-slate-600">No posts found.</p>
        ) : (
          <ul className="space-y-6">
            {data.items.map((post) => (
              <li key={post.id}>
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}

export default BlogPostListPage