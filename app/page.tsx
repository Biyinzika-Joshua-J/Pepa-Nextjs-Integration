import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <Link
        href="/blog"
        className="inline-flex items-center gap-3 rounded-3xl bg-slate-900 px-8 py-5 text-white shadow-lg transition hover:bg-slate-800"
      >
        <span className="text-3xl font-semibold">Blog</span>
        <span
          className="text-2xl inline-block"
          style={{ animation: 'arrow-slide 1.8s ease-in-out infinite' }}
        >
          →
        </span>
      </Link>
    </main>
  )
}
