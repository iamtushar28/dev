"use client";
import { useQuery } from "@apollo/client";
import { GET_BLOG_BY_SLUG } from "@/graphql/queries/BlogBySlug";
import { useParams } from "next/navigation";
import BlogPost from "../components/BlogPost";
import BlogSidebar from "../components/BlogSidebar";
import BlogWriter from "../components/BlogWriter";
import MobileBlogSidebar from "../components/MobileBlogSidebar";
import BlogSkelaton from "../components/BlogSkelaton";

export default function BlogPage() {
  const { slug } = useParams(); // ✅ Use `slug` instead of `id`

  const { data, loading, error } = useQuery(GET_BLOG_BY_SLUG, {
    variables: { slug }, // ✅ Pass `slug` variable
    skip: !slug,
  });

  if (loading) return <BlogSkelaton />;
  if (error || !data?.blogBySlug) return <p>Error loading blog.</p>;

  const blog = data.blogBySlug;
  const author = blog.author;

  return (
    <>

      <section className="mt-16 mb-16 md:mb-4 md:p-4 w-full flex flex-wrap md:flex-nowrap gap-4">
        <BlogSidebar blog={blog} />
        <MobileBlogSidebar blog={blog} />
        <BlogPost blog={blog} author={author} />
        <BlogWriter author={author} />
      </section>

    </>
  );
}
