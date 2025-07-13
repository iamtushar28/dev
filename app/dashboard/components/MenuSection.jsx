"use client";
import React from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { GET_USER_BLOGS } from "@/graphql/queries/getUserBlogs";
import BlogTemplate from "./BlogTemplate";
import SkelatonLoader from "./SkelatonLoader";

const MenuSection = () => {
    const { data, loading, error } = useQuery(GET_USER_BLOGS);
    const blogs = data?.getUserBlogs || [];

    return (
        <section className="w-full">
            <h2 className="text-zinc-900 capitalize font-semibold mb-3 pl-2 md:pl-2">Posts</h2>

            <div className="flex flex-col gap-4 mb-4">
                {loading ? (
                    <SkelatonLoader />
                ) : error ? (
                    <p className="text-red-500 text-center">Failed to load posts.</p>
                ) : blogs.length === 0 ? (
                    <div className="bg-white flex flex-col items-center justify-center gap-4 h-96 text-center">
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
                    blogs.map((blog) => <BlogTemplate key={blog._id} blog={blog} />)
                )}
            </div>
        </section>
    );
};

export default MenuSection;
