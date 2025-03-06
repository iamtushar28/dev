'use client'
import React, { useState, useEffect, useRef } from 'react';
import { BsThreeDots } from "react-icons/bs"; 
import BlogTemplate from './BlogTemplate';
import SkeletonLoader from './SkeletonLoader';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openFilterMenu, setOpenFilterMenu] = useState(false);

    const wrapperRef = useRef(null);
    const filterButtonRef = useRef(null);

    const toggleFilterMenu = () => {
        setOpenFilterMenu((prev) => !prev);
    };

    // Hide FilterMenu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                openFilterMenu &&
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target) &&
                filterButtonRef.current &&
                !filterButtonRef.current.contains(event.target)
            ) {
                setOpenFilterMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [openFilterMenu]);

    // Fetch blogs and cache them in sessionStorage
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                setError(null);

                // Check if blogs are already cached
                const cachedBlogs = sessionStorage.getItem("cachedBlogs");
                if (cachedBlogs) {
                    setBlogs(JSON.parse(cachedBlogs));
                    setLoading(false);
                    return;
                }

                const response = await fetch('/api/blog');
                if (!response.ok) throw new Error(`Failed to fetch blogs. Status: ${response.status}`);

                let data = await response.json();
                if (!data.blogs || !Array.isArray(data.blogs)) throw new Error("Invalid blog data");

                // Fetch author details
                const blogsWithAuthors = await Promise.all(
                    data.blogs.map(async (blog) => {
                        if (blog.authorId) {
                            const authorRes = await fetch(`/api/user/${blog.authorId}`);
                            if (authorRes.ok) {
                                const authorData = await authorRes.json();
                                return {
                                    ...blog,
                                    creatorName: authorData.name,
                                    creatorProfile: authorData.image
                                };
                            }
                        }
                        return blog;
                    })
                );

                // Store fetched blogs in sessionStorage
                sessionStorage.setItem("cachedBlogs", JSON.stringify(blogsWithAuthors));
                setBlogs(blogsWithAuthors);
            } catch (error) {
                console.error("Error fetching blogs:", error);
                setError("Failed to load blogs.");
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <section className='w-full md:w-[72%] lg:w-[60%]'>
            {/* Buttons - Discover, Following, Filter */}
            <div className='flex justify-between items-center relative'>
                <div className='flex gap-2'>
                    <button className='capitalize py-1 px-4 text-lg bg-white rounded font-semibold'>discover</button>
                    <button className='capitalize py-1 px-4 text-lg hover:text-blue-500 hover:bg-white rounded transition-all duration-200'>following</button>
                </div>

                <button ref={filterButtonRef} onClick={toggleFilterMenu} className='text-xl h-8 w-8 rounded-full hover:bg-blue-100 hover:text-blue-500 transition-all duration-300 flex justify-center items-center'>
                    <BsThreeDots />
                </button>

                {openFilterMenu && (
                    <div ref={wrapperRef} className='w-64 h-fit p-4 rounded bg-white absolute top-10 right-0 flex flex-col gap-2 shadow-lg'>
                        <h4 className='font-semibold'>Relevant</h4>
                        <div className='h-[0.6px] w-full bg-zinc-200'></div>
                        {["top this week", "top this month", "top this year", "top all time"].map((filter) => (
                            <button key={filter} className='w-full px-3 py-2 text-zinc-600 hover:text-blue-500 hover:bg-blue-50 capitalize text-start rounded flex items-center gap-2 hover:scale-95 transition-all duration-200'>{filter}</button>
                        ))}
                        <div className='h-[0.6px] w-full bg-zinc-200'></div>
                        <button className='w-full px-3 py-2 text-zinc-600 hover:text-blue-500 hover:bg-blue-50 capitalize text-start rounded flex items-center gap-2 hover:scale-95 transition-all duration-200'>⚡ latest</button>
                    </div>
                )}
            </div>

            {/* Blog List Section */}
            <div className='mt-2 flex flex-col gap-3'>
                {loading ? (
                    <SkeletonLoader />
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : blogs.length > 0 ? (
                    blogs.map((blog) => <BlogTemplate key={blog._id} blog={blog} />)
                ) : (
                    <p>No blogs found.</p>
                )}
            </div>
        </section>
    );
}

export default Blog;
