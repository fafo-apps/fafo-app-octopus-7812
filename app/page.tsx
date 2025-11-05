import Link from "next/link";
import { listPublishedPosts } from "@/app/db/repositories/PostsRepository";
import PostCard from "@/app/components/PostCard";
import NewPostForm from "@/app/components/NewPostForm";

export default async function Home() {
  const posts = await listPublishedPosts(24);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">USA Trip Blog</h1>
        <p className="mt-2 text-zinc-600">Capture your journey across the United States with stories and photos. 🎒📸</p>
      </header>

      <NewPostForm />

      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Latest posts</h2>
          <Link href="/" className="text-sm text-zinc-600 hover:text-zinc-900">Refresh</Link>
        </div>
        {posts.length === 0 ? (
          <p className="text-zinc-600">No posts yet. Use the form above to publish your first story.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {posts.map((p) => (
              <PostCard key={p.slug} title={p.title} slug={p.slug} cover_image_url={p.cover_image_url || undefined} location={p.location || undefined} trip_date={p.trip_date || undefined} excerpt={p.excerpt || undefined} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
