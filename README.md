# Add a blog to your app in under 5 minutes using [Pepa](https://pepa.dev)

## What is Pepa?

Pepa is a hosted headless blogging backend that gives you posts, authors, categories, tags, and SEO fields through a simple REST API.

## What this example includes

- Next.js 16 app router project with Tailwind CSS.
- Home page with a centered CTA button linking to `/blog`.
- Blog list page at `app/blog/page.tsx` that fetches posts from Pepa and renders them as cards.
- Reusable post card component in `components/cards/post.tsx`.
- Post detail page at `app/blog/[slug]/page.tsx` with:
  - centered title and published date
  - featured image
  - centered category badges
  - rendered HTML content
  - small centered author card
  - top-left back button to `/blog`
- Light-only styling and Tailwind-based UI.

## Environment variables

Copy the example file and set your Pepa values:

```bash
cp .env.example .env.local
```

Then set:

- `ORGANI_API_KEY` — your Pepa API key
- `ORGANI_BLOG_SLUG` — the slug of the blog you want to render

Example `.env.example`:

```env
ORGANI_API_KEY=organi_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
ORGANI_BLOG_SLUG=your-blog-slug
```

## How the integration works

### Blog list page

The list page fetches from Pepa using:

```ts
https://pepa.dev/api/v1/posts?blogSlug=${process.env.ORGANI_BLOG_SLUG}
```

It renders each post using `components/cards/post.tsx`, including:

- featured image
- title
- excerpt
- published date
- author name
- blog name
- categories/tags count
- `Read more` button linking to the post detail page

### Post detail page

The detail page fetches a single post using:

```ts
https://pepa.dev/api/v1/post?blogSlug=${process.env.ORGANI_BLOG_SLUG}&postSlug=${slug}
```

It renders:

- a back button to `/blog`
- published date and title centered at the top
- featured image if present
- centered category badges
- HTML content from `htmlContent`
- a small author card with avatar, name, and bio

## Run locally

```bash
pnpm install
pnpm dev
```

Then open `http://localhost:3000`.

## Project files to review

- `app/page.tsx` — homepage button to `/blog`
- `app/blog/page.tsx` — blog list server component
- `components/cards/post.tsx` — post card component with featured image support
- `app/blog/[slug]/page.tsx` — post detail page layout and data fetching
- `app/globals.css` — Tailwind import and light mode styling

## Notes

- Uses the Next.js app router and server-side data fetching.
- The detail page awaits `params` because it can be a promise in the app router.
- This example uses plain `img` tags for featured images; you can switch to `next/image` if needed.
- Dark mode support is intentionally removed for a simple light UI.
