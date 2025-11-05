import { NextRequest, NextResponse } from "next/server";
import { listPublishedPosts, createPost, getUniqueSlug } from "@/app/db/repositories/PostsRepository";
import { slugify } from "@/app/utils/slugify";

export async function GET() {
  try {
    const posts = await listPublishedPosts(100);
    return NextResponse.json(posts);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to load posts" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, content } = body ?? {};

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    const baseSlug = slugify(body.slug || title);
    const uniqueSlug = await getUniqueSlug(baseSlug);

    const post = await createPost({
      title,
      slug: uniqueSlug,
      cover_image_url: body.cover_image_url || null,
      location: body.location || null,
      trip_date: body.trip_date || null,
      excerpt: body.excerpt || null,
      content,
      published: true,
    });

    return NextResponse.json(post, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
