'use client';
import { useQuery } from '@apollo/client';
import { GET_BOOKMARKED_BLOGS } from '@/graphql/queries/GetBookmarkedBlogs'; 
import BlogTemplate from './BlogTemplate';
import SkeletonLoader from './SkeletonLoader';

export default function ReadingBlogsList() {
  const { data, loading, error } = useQuery(GET_BOOKMARKED_BLOGS);
  
  if (loading) return <SkeletonLoader />;
  if (error) return <p className="text-red-500">Failed to load bookmarked blogs.</p>;
  
  const blogs = data?.bookmarkedBlogs || [];

  return (
    <div className="flex flex-col gap-4 w-full">
      {blogs.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">No bookmarked blogs yet.</p>
      ) : (
        blogs.map((blog) => <BlogTemplate key={blog._id} blog={blog} />)
      )}
    </div>
  );
}
