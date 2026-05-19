import Link from 'next/link'
import React from 'react'

export type PostDetail = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  featuredImageUrl: string | null
  publishedAt: string
  readingTimeMins: number | null
  blog: {
    id: string
    name: string
    slug: string
  }
  author: {
    name: string
    slug: string
    avatarUrl: string | null
    bio: string | null
    socialLinks: Array<{ label: string; url: string }> | null
  } | null
  categoryCount: number
  tagCount: number
  htmlContent: string
  seoTitle: string
  seoDescription: string | null
  categories: Array<{ id: string; name: string; slug: string }>
  tags: Array<{ id: string; name: string; slug: string }>
}

const getPost = async (slug: string): Promise<PostDetail> => {
  const response = await fetch(
    `https://pepa.dev/api/v1/post?blogSlug=${process.env.ORGANI_BLOG_SLUG}&postSlug=${slug}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.ORGANI_API_KEY}`,
      },
      cache: 'no-store',
    }
  )

  if (!response.ok) {
    console.log(response)
    throw new Error(`Failed to load post: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

const BlogPostDetailPage = async ({ params }: { params: { slug: string } | Promise<{ slug: string }> }) => {
  const resolvedParams = await params
  const post = await getPost(resolvedParams.slug)

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-12">
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition"
          >
            <span className="text-lg">←</span>
            <span>Back to posts</span>
          </Link>
        </div>

        <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
          <div className="text-center">
            <p className="text-sm text-slate-500 mb-3">Published {new Date(post.publishedAt).toLocaleDateString()}</p>
            <h1 className="text-4xl font-semibold text-slate-900 mb-6">{post.title}</h1>
          </div>

          {post.featuredImageUrl ? (
            <div className="mb-6 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
              <img
                src={post.featuredImageUrl}
                alt={post.title}
                className="w-full object-cover"
              />
            </div>
          ) : null}

          {post.categories.length > 0 && (
            <div className="mb-8 flex flex-wrap justify-center gap-2">
              {post.categories.map((category) => (
                <span
                  key={category.id}
                  className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700"
                >
                  {category.name}
                </span>
              ))}
            </div>
          )}

          <div className="prose prose-slate mx-auto text-slate-800" dangerouslySetInnerHTML={{ __html: post.htmlContent }} />

          <div className="mt-10 mx-auto w-full max-w-sm rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-slate-200 text-xl font-semibold text-slate-700">
              {post.author?.avatarUrl ? (
                <img
                  src={post.author.avatarUrl}
                  alt={post.author.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span>{post.author?.name?.slice(0, 1) ?? '?'}</span>
              )}
            </div>
            <p className="text-lg font-semibold text-slate-900">{post.author?.name ?? 'Unknown author'}</p>
            {post.author?.bio ? (
              <p className="mt-2 text-sm text-slate-600">{post.author.bio}</p>
            ) : (
              <p className="mt-2 text-sm text-slate-500">Author info not available.</p>
            )}
          </div>
        </article>
      </div>
    </main>
  )
}

export default BlogPostDetailPage