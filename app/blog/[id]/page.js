import { notFound } from "next/navigation";
import BlogPost from "../components/BlogPost";
import BlogSidebar from "../components/BlogSidebar";
import BlogWriter from "../components/BlogWriter";
import MobileBlogSidebar from "../components/MobileBlogSidebar";

// Fetch Blog Data
async function getBlog(id) {
  try {
    if (!id) return null;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}

// Fetch Author Data
async function getAuthor(authorId) {
  try {
    if (!authorId) return null;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${authorId}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Error fetching author:", error);
    return null;
  }
}

export default async function BlogPage({ params }) {
  if (!params || !params.id) {
    return notFound();
  }

  const blog = await getBlog(params.id);

  if (!blog) {
    return notFound();
  }

  // Fetch author details using blog's authorId
  const author = await getAuthor(blog.authorId);

  return (
    <section className="mt-16 mb-16 md:mb-4 md:p-4 w-full flex flex-wrap md:flex-nowrap gap-4">
      <BlogSidebar blog={blog} />
      <MobileBlogSidebar blog={blog} />
      <BlogPost blog={blog} author={author} /> {/*  Pass author details */}
      <BlogWriter author={author} /> {/*  Pass author details */}
    </section>
  );
}
