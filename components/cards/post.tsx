export type PostListType = {
  items: Post[];
};

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featuredImageUrl: string | null;
  publishedAt: string;
  readingTimeMins: number | null;
  blog: Blog;
  author: Author | null;
  categoryCount: number;
  tagCount: number;
}

export interface Blog {
  id: string;
  name: string;
  slug: string;
}

export interface Author {
  name: string;
  slug: string;
  avatarUrl: string | null;
}

type PostCardProps = {
  post: Post;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="mx-auto max-w-3xl rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
      {post.featuredImageUrl ? (
        <div className="mb-6 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
          <img
            src={post.featuredImageUrl}
            alt={post.title}
            className="h-64 w-full object-cover"
          />
        </div>
      ) : null}
      <h2 className="text-2xl font-semibold text-slate-900 mb-3">
        <a href={`/blog/${post.slug}`} className="hover:text-slate-700 transition-colors">
          {post.title}
        </a>
      </h2>
      {post.excerpt && <p className="text-slate-600 leading-7 mb-5">{post.excerpt}</p>}
      <p className="text-sm text-slate-500">
        {new Date(post.publishedAt).toLocaleDateString()} ·{' '}
        {post.categoryCount} category{post.categoryCount === 1 ? '' : 'ies'} · {post.tagCount} tag{post.tagCount === 1 ? '' : 's'}
      </p>
      <p className="mt-4 text-slate-700">
        By {post.author?.name ?? 'Unknown author'} in {post.blog.name}
      </p>
      <div className="mt-6">
        <a
          href={`/blog/${post.slug}`}
          className="inline-flex items-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          Read more <span className="ml-2">→</span>
        </a>
      </div>
    </article>
  )
}
