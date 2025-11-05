"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPostForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: payload.title,
          location: payload.location || undefined,
          trip_date: payload.trip_date || undefined,
          cover_image_url: payload.cover_image_url || undefined,
          excerpt: payload.excerpt || undefined,
          content: payload.content,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to create post");
      }

      const post = await res.json();
      form.reset();
      router.push(`/posts/${post.slug}`);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-4 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
      <h2 className="text-lg font-semibold">Write a new post</h2>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-zinc-700">Title</label>
          <input name="title" required className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-900" placeholder="Sunset at the Grand Canyon" />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-700">Location</label>
          <input name="location" className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-900" placeholder="Grand Canyon, AZ" />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-700">Trip Date</label>
          <input type="date" name="trip_date" className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-900" />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-700">Cover Image URL</label>
          <input name="cover_image_url" className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-900" placeholder="https://images.unsplash.com/photo-..." />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-700">Short Summary</label>
        <input name="excerpt" className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-900" placeholder="A breathtaking hike along the rim..." />
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-700">Full Story</label>
        <textarea name="content" required rows={6} className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-900" placeholder="Share the highlights, tips, and moments from your day..."></textarea>
      </div>
      <div className="flex items-center gap-3">
        <button disabled={loading} className="rounded-full bg-zinc-900 px-5 py-2 text-white transition hover:bg-zinc-800 disabled:opacity-60">
          {loading ? "Publishing..." : "Publish Post"}
        </button>
        <span className="text-xs text-zinc-500">Posts are public. You can edit by creating again with the same title and a new slug in the future.</span>
      </div>
    </form>
  );
}
