import { notFound } from "next/navigation";
import { getPostBySlug } from "@/app/db/repositories/PostsRepository";

export const dynamic = "force-dynamic";

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-6">
        <p className="text-sm text-zinc-600">{post.location || "USA"} • {post.trip_date ? new Date(post.trip_date).toLocaleDateString() : new Date(post.created_at).toLocaleDateString()}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900">{post.title}</h1>
      </div>
      {post.cover_image_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.cover_image_url} alt={post.title} className="mb-6 w-full rounded-xl object-cover" />
      )}
      <article className="max-w-none">
        {post.excerpt && <p className="text-lg text-zinc-700">{post.excerpt}</p>}
        <div className="mt-4 whitespace-pre-wrap leading-7 text-zinc-800">{post.content}</div>
      </article>
    </div>
  );
}
