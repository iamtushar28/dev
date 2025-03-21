import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import BlogDate from './BlogDate';

import { FaRegComment } from "react-icons/fa"; //comment icon
import { FaRegBookmark } from "react-icons/fa6"; //bookmrk icon

const BlogTemplate = ({ blog }) => {
    return (
        <div className='w-full h-fit bg-white rounded overflow-hidden'>

            {/* Cover Image (if uploaded) */}
            <Link
                href={`/blog/${blog._id}`} // Pass blog ID dynamically
            >
                {blog.coverImage && (
                    <Image
                        src={blog.coverImage}
                        alt="Blog Cover"
                        className="w-full h-auto max-h-72 object-cover"
                        width={500}
                        height={300}
                    />
                )}
            </Link>

            {/* blog info */}
            <div className='p-2 md:p-4'>

                {/* Creator Info */}
                <div className='flex gap-2 items-center'>

                    {/* Profile Image */}
                    <div className='h-10 w-10 md:h-12 md:w-12 rounded-full overflow-hidden'>
                        {blog.creatorProfile && (
                            <Image
                                src={blog.creatorProfile}
                                alt="Creator Profile"
                                width={48}
                                height={48}
                                className="w-full h-full object-cover"
                            />
                        )}
                    </div>

                    {/* Name & Date of Blog Post */}
                    <div>
                        <h2 className='font-semibold'>{blog.creatorName}</h2>
                        <BlogDate createdAt={blog?.createdAt} />
                    </div>

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

                        <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>

                            {/* reactions */}
                            <button className='h-8 w-48 hover:bg-zinc-100 rounded transition-all duration-200 flex relative'>

                                <div className='h-6 w-6 text-sm ring-1 bg-slate-100 ring-white rounded-full flex justify-center items-center absolute left-3 top-1 z-40'>
                                    💖
                                </div>
                                <div className='h-6 w-6 text-sm ring-1 bg-slate-100 ring-white rounded-full flex justify-center items-center absolute left-7 top-1 z-30'>
                                    🦄
                                </div>
                                <div className='h-6 w-6 text-sm ring-1 bg-slate-100 ring-white rounded-full flex justify-center items-center absolute left-11 top-1 z-20'>
                                    😲
                                </div>
                                <div className='h-6 w-6 text-sm ring-1 bg-slate-100 ring-white rounded-full flex justify-center items-center absolute left-[3.7rem] top-1 z-10'>
                                    🔥
                                </div>
                                <div className='h-6 w-6 text-sm ring-1 bg-slate-100 ring-white rounded-full flex justify-center items-center absolute left-[4.7rem] top-1'>
                                    ✨
                                </div>

                                {/* reactions count */}
                                <div className='w-24 h-6 text-zinc-500 absolute left-[5.8rem] top-2 text-sm'>
                                    284 rections
                                </div>

                            </button>

                            {/* add comment */}
                            <Link
                             href={`/blog/${blog._id}#comments`}
                            className='capitalize text-xs text-zinc-500 md:text-sm flex gap-2 items-center px-2 py-1 hover:bg-zinc-100 rounded transition-all duration-200'>
                                <FaRegComment className='text-lg' />
                                {blog.commentsCount} comment
                            </Link>

                        </div>

                        {/* save blog */}
                        <button className='text-xl text-zinc-500 hover:scale-90 transition-all duration-200'>
                            <FaRegBookmark />
                        </button>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default BlogTemplate