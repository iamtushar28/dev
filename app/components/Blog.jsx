"use client";
import useSWR from 'swr';
import React, { useState, useRef, useEffect } from 'react';
import { BsThreeDots } from "react-icons/bs";
import BlogTemplate from './BlogTemplate';
import SkeletonLoader from './SkeletonLoader';

// Fetcher function
const fetcher = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch data");
    const data = await response.json();

    // Fetch author details for each blog
    const blogsWithAuthors = await Promise.all(
        data.blogs.map(async (blog) => {
            if (blog.authorId) {
                const authorRes = await fetch(`/api/user/${blog.authorId}`);
                if (authorRes.ok) {
                    const authorData = await authorRes.json();
                    return {
                        ...blog,
                        creatorName: authorData.name,
                        creatorProfile: authorData.image,
                    };
                }
            }
            return blog;
        })
    );

    return { blogs: blogsWithAuthors };
};

const Blog = () => {
    const { data, error, isLoading } = useSWR('/api/blog', fetcher, {
        revalidateOnFocus: true, // Auto-refresh when user returns
        refreshInterval: 30000,  // Auto-refresh every 30 seconds
    });

    const [openFilterMenu, setOpenFilterMenu] = useState(false);
    const wrapperRef = useRef(null);
    const filterButtonRef = useRef(null);

    // Close filter menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target) && 
                filterButtonRef.current && !filterButtonRef.current.contains(event.target)) {
                setOpenFilterMenu(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <section className='w-full md:w-[72%] lg:w-[60%]'>
            <div className='flex justify-between items-center relative'>
                <div className='flex gap-2'>
                    <button className='capitalize py-1 px-4 text-lg bg-white rounded font-semibold'>discover</button>
                    <button className='capitalize py-1 px-4 text-lg hover:text-blue-500 hover:bg-white rounded transition-all duration-200'>following</button>
                </div>

                {/* Filter Button */}
                <button 
                    ref={filterButtonRef} 
                    onClick={() => setOpenFilterMenu(!openFilterMenu)} 
                    className='text-xl h-8 w-8 rounded-full hover:bg-blue-100 hover:text-blue-500 transition-all duration-300 flex justify-center items-center'
                >
                    <BsThreeDots />
                </button>

                {/* Filter Menu */}
                {openFilterMenu && (
                    <div 
                        ref={wrapperRef} 
                        className="absolute top-10 right-0 bg-white shadow-lg rounded-lg p-3 w-48"
                    >
                        <ul className="space-y-2">
                            <li className="cursor-pointer hover:bg-gray-100 p-2 rounded">Newest⚡</li>
                            <li className="cursor-pointer hover:bg-gray-100 p-2 rounded">Most Popular♥️</li>
                            <li className="cursor-pointer hover:bg-gray-100 p-2 rounded">Trending🚀</li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Blog List Section */}
            <div className='mt-2 flex flex-col gap-3'>
                {isLoading ? (
                    <SkeletonLoader />
                ) : error ? (
                    <p className="text-red-500">Failed to load blogs.</p>
                ) : data?.blogs?.length > 0 ? (
                    data.blogs.map((blog) => <BlogTemplate key={blog._id} blog={blog} />)
                ) : (
                    <p>No blogs found.</p>
                )}
            </div>
        </section>
    );
};

export default Blog;
