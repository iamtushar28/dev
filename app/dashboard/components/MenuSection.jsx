"use client";
import React from "react";
import Link from "next/link";
import useSWR from "swr";
import BlogTemplate from "./BlogTemplate";

const fetcher = (url) => fetch(url).then((res) => res.json());

const MenuSection = () => {
    const { data, error, isLoading } = useSWR("/api/blog/user", fetcher);

    const blogs = data?.blogs || [];

    return (
        <section className="w-full">
            {/* heading */}
            <h2 className="text-zinc-900 capitalize font-semibold mb-3 pl-2 md:pl-2">Posts</h2>

            {/* content box */}
            <div className="flex flex-col gap-4 p-4">

                {isLoading ? (
                    <p className="text-center text-sm text-gray-500">Loading your posts...</p>
                ) : error ? (
                    <p className="text-red-500 text-center">Failed to load posts.</p>
                ) : blogs.length === 0 ? (
                    <div className={`${blogs.length === 0 ? 'bg-white' : ''} flex flex-col items-center justify-center gap-4 h-96 text-center`}>
                        <p className="text-sm md:text-lg text-zinc-800">
                            This is where you can manage your posts, but you haven't written anything yet.
                        </p>
                        <Link
                            href="/new"
                            className="px-4 py-2 capitalize text-white font-semibold rounded bg-blue-600 hover:bg-blue-700 transition-all duration-200"
                        >
                            Write your first post now
                        </Link>
                    </div>
                ) : (
                    blogs.map((blog) => (
                        <BlogTemplate key={blog._id} blog={blog} />
                    ))
                )}
            </div>
        </section>
    );
};

export default MenuSection;
