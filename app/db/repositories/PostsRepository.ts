import { pool } from "@/app/db/pool";

export type Post = {
  id: number;
  title: string;
  slug: string;
  cover_image_url: string | null;
  location: string | null;
  trip_date: string | null; // ISO date string
  excerpt: string | null;
  content: string;
  published: boolean;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
};

export async function listPublishedPosts(limit = 50): Promise<Post[]> {
  const { rows } = await pool.query(
    `SELECT id, title, slug, cover_image_url, location, trip_date, excerpt, content, published, created_at, updated_at
     FROM posts
     WHERE published = TRUE
     ORDER BY COALESCE(trip_date, created_at) DESC
     LIMIT $1`,
    [limit]
  );
  return rows as Post[];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { rows } = await pool.query(
    `SELECT id, title, slug, cover_image_url, location, trip_date, excerpt, content, published, created_at, updated_at
     FROM posts WHERE slug = $1 LIMIT 1`,
    [slug]
  );
  return rows[0] || null;
}

export async function slugExists(slug: string): Promise<boolean> {
  const { rowCount } = await pool.query(`SELECT 1 FROM posts WHERE slug = $1`, [slug]);
  return (rowCount ?? 0) > 0;
}

export async function getUniqueSlug(base: string): Promise<string> {
  let candidate = base;
  let i = 2;
  // Loop to find an unused slug; small scale and safe for this use-case
  // For larger scale, consider doing this in a transaction.
  // eslint-disable-next-line no-constant-condition
  while (true) {
    // eslint-disable-next-line no-await-in-loop
    const exists = await slugExists(candidate);
    if (!exists) return candidate;
    candidate = `${base}-${i++}`;
  }
}

export type CreatePostInput = {
  title: string;
  slug: string;
  cover_image_url?: string | null;
  location?: string | null;
  trip_date?: string | null; // ISO date string (YYYY-MM-DD)
  excerpt?: string | null;
  content: string;
  published?: boolean;
};

export async function createPost(input: CreatePostInput): Promise<Post> {
  const {
    title,
    slug,
    cover_image_url = null,
    location = null,
    trip_date = null,
    excerpt = null,
    content,
    published = true,
  } = input;

  const { rows } = await pool.query(
    `INSERT INTO posts (title, slug, cover_image_url, location, trip_date, excerpt, content, published)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING id, title, slug, cover_image_url, location, trip_date, excerpt, content, published, created_at, updated_at`,
    [title, slug, cover_image_url, location, trip_date, excerpt, content, published]
  );
  return rows[0] as Post;
}
