import Link from "next/link";

export type PostCardProps = {
  title: string;
  slug: string;
  cover_image_url?: string | null;
  location?: string | null;
  trip_date?: string | null;
  excerpt?: string | null;
};

export default function PostCard({ title, slug, cover_image_url, location, trip_date, excerpt }: PostCardProps) {
  return (
    <Link href={`/posts/${slug}`} className="group block overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md">
      {cover_image_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={cover_image_url} alt={title} className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
      ) : (
        <div className="h-48 w-full bg-zinc-100" />
      )}
      <div className="p-4">
        <div className="flex items-center justify-between text-sm text-zinc-600">
          <span>{location || "USA"}</span>
          {trip_date && <span>{new Date(trip_date).toLocaleDateString()}</span>}
        </div>
        <h3 className="mt-2 line-clamp-2 text-lg font-semibold text-zinc-900">{title}</h3>
        {excerpt && <p className="mt-1 line-clamp-2 text-sm text-zinc-600">{excerpt}</p>}
      </div>
    </Link>
  );
}
