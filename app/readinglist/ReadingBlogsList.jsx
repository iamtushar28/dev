"use client";
import useSWR from "swr";
import BlogTemplate from "./BlogTemplate";
import SkeletonLoader from "./SkeletonLoader"

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ReadingBlogsList() {
    const { data, error, isLoading } = useSWR("/api/bookmarks/reading-list", fetcher);

    if (isLoading) {
        return <SkeletonLoader/>;
    }

    if (error) {
        return <p className="text-red-500">Failed to load bookmarked blogs.</p>;
    }

    const blogs = data?.blogs || [];

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
