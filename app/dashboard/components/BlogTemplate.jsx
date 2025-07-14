'use client'
import React from 'react'
import { useState, useRef, useEffect } from "react";
import Image from 'next/image'
import Link from 'next/link';
import BlogDate from '../../components/BlogDate';
import BookmarkButton from '../../components/BookmarkButton';
import { BsThreeDots } from "react-icons/bs"; //dots icon
import { TbWritingSign } from "react-icons/tb"; //writing icon
import { FaRegComment } from "react-icons/fa"; //comment icon
import DeleteBlogButton from './DeleteBlogButton';

const BlogTemplate = ({ blog }) => {

    const [openBlogOptionMenu, setOpenBlogOptionMenu] = useState(false);
    const wrapperRef = useRef(null);
    const blogOptionButtonRef = useRef(null);

    // Close blog options menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target) &&
                blogOptionButtonRef.current &&
                !blogOptionButtonRef.current.contains(event.target)
            ) {
                setOpenBlogOptionMenu(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className='w-full h-fit pb-1 bg-white overflow-hidden md:rounded'>

            {/* blog info */}
            <div className='px-2 md:px-4 py-4'>

                {/* Creator Info & options for delet and edit blog */}
                <div className='relative flex justify-between items-center'>
                    <div className='flex gap-2 items-center'>

                        {/* Profile Image */}
                        <div className='h-10 w-10 md:h-12 md:w-12 rounded-full overflow-hidden'>
                            {blog.author?.image && (
                                <Image
                                    src={blog.author?.image}
                                    alt="Creator Profile"
                                    priority={false}
                                    width={48}
                                    height={48}
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>

                        {/* Name & Date of Blog Post */}
                        <div>
                            <h2 className='font-semibold'>{blog.author?.name}</h2>
                            <BlogDate createdAt={blog?.createdAt} />
                        </div>

                    </div>

                    {/* Filter Button */}
                    <button
                        ref={blogOptionButtonRef}
                        onClick={() => setOpenBlogOptionMenu(!openBlogOptionMenu)}
                        className="text-xl h-8 w-8 rounded-full hover:bg-blue-100 hover:text-blue-500 transition-all duration-300 flex justify-center items-center"
                    >
                        <BsThreeDots />
                    </button>

                    {/* Filter Menu */}
                    {openBlogOptionMenu && (
                        <div ref={wrapperRef} className="absolute top-10 right-0 bg-white shadow-lg rounded-lg p-3 w-48">
                            <ul className="space-y-2">
                                <button
                                    className='w-full px-4 py-2 text-zinc-800 font-semibold hover:text-blue-500 hover:bg-blue-50 capitalize text-start rounded flex items-center gap-2 transition-all duration-200'>
                                    <TbWritingSign className='text-lg' />
                                    Edit post
                                </button>
                                <DeleteBlogButton blogId={blog._id} />
                            </ul>
                        </div>
                    )}

                </div>

                {/* blog info - title, tags, comments */}
                <div className='mt-3'>

                    {/* blog title */}
                    <Link
                        href={`/blog/${blog._id}`} // Pass blog ID dynamically
                        className="text-xl md:text-2xl font-semibold hover:text-blue-600 transition-all"
                    >
                        {blog.title}
                    </Link>

                    {/* tags */}
                    <div className='mt-2'>
                        <button className='text-sm text-zinc-500 px-2 py-1 rounded hover:ring-2 hover:ring-blue-300 hover:bg-blue-100 transition-all duration-200'>
                            #NextJs
                        </button>
                        <button className='text-sm text-zinc-500 px-2 py-1 rounded hover:ring-2 hover:ring-blue-300 hover:bg-blue-100 transition-all duration-200'>
                            #Frontend-dev
                        </button>
                        <button className='text-sm text-zinc-500 px-2 py-1 rounded hover:ring-2 hover:ring-blue-300 hover:bg-blue-100 transition-all duration-200'>
                            #Javascript
                        </button>
                    </div>

                    {/* button - reactions, comment, save blog  */}
                    <div className='mt-4 flex justify-between items-center'>

                        <div className='flex gap-2'>

                            {/* reactions */}
                            <Link
                                href={`/blog/${blog._id}`}
                                title='add reaction on blog'
                                className='h-8 w-36 md:w-48 hover:bg-zinc-100 rounded transition-all duration-200 flex relative'>
                                <div className='h-6 w-6 text-sm ring-1 bg-slate-100 ring-white rounded-full flex justify-center items-center absolute left-3 top-1 z-40'>💖</div>
                                <div className='h-6 w-6 text-sm ring-1 bg-slate-100 ring-white rounded-full flex justify-center items-center absolute left-7 top-1 z-30'>🦄</div>
                                <div className='h-6 w-6 text-sm ring-1 bg-slate-100 ring-white rounded-full flex justify-center items-center absolute left-11 top-1 z-20'>😲</div>
                                <div className='h-6 w-6 text-sm ring-1 bg-slate-100 ring-white rounded-full flex justify-center items-center absolute left-[3.7rem] top-1 z-10'>🔥</div>
                                <div className='h-6 w-6 text-sm ring-1 bg-slate-100 ring-white rounded-full flex justify-center items-center absolute left-[4.7rem] top-1'>✨</div>
                                <div className='h-6 w-6 text-sm text-zinc-500 rounded-full flex justify-center items-center absolute left-[6.4rem] md:left-[8.2rem] top-1'>{blog.totalReactionsCount ?? '0'} <span className='text-xs ml-2 hidden md:block'>Reactions</span></div>

                            </Link>

                            {/* comments count */}
                            <Link
                                href={`/blog/${blog._id}#comments`}
                                title='comment on blog'
                                className='capitalize text-xs text-zinc-500 md:text-sm flex gap-2 items-center px-2 py-1 hover:bg-zinc-100 rounded transition-all duration-200'>
                                <FaRegComment className='text-lg' />
                                {blog.commentsCount}
                                <span className='text-xs hidden md:block'>Comments</span>
                            </Link>

                        </div>

                        {/* save blog */}
                        <BookmarkButton blogId={blog._id} initiallyBookmarked={blog.bookmarked} />

                    </div>

                </div>

            </div>

        </div>
    )
}

export default BlogTemplate