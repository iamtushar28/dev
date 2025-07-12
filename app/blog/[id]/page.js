"use client";
import { useQuery } from "@apollo/client";
import { GET_BLOG_BY_ID } from "@/graphql/queries/getBlogById";
import { useParams } from "next/navigation";
import BlogPost from "../components/BlogPost";
import BlogSidebar from "../components/BlogSidebar";
import BlogWriter from "../components/BlogWriter";
import MobileBlogSidebar from "../components/MobileBlogSidebar";

export default function BlogPage() {
  const { id } = useParams();

  const { data, loading, error } = useQuery(GET_BLOG_BY_ID, {
    variables: { id },
    skip: !id,
  });


  if (loading) return <p>Loading...</p>;
  if (error || !data?.blog) return <p>Error loading blog.</p>;

  const blog = data.blog;
  const author = blog.author;

  return (
    <section className="mt-16 mb-16 md:mb-4 md:p-4 w-full flex flex-wrap md:flex-nowrap gap-4">
      <BlogSidebar blog={blog} />
      <MobileBlogSidebar blog={blog} />
      <BlogPost blog={blog} author={author} />
      <BlogWriter author={author} />
    </section>
  );
}
