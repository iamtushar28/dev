import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import BlogDate from '../../components/BlogDate';
import CommentsCount from '../../blog/components/CommentsCount';
import BookmarkButton from '../../components/BookmarkButton';

import { FaRegComment } from "react-icons/fa"; //comment icon

const BlogTemplate = ({ blog }) => {
    return (
        <div className='w-full h-fit pb-2 pt-2 bg-white overflow-hidden md:rounded'>

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
                                priority={false}
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

                        <div className='flex gap-2'>

                            {/* reactions */}
                            <Link
                                href={`/blog/${blog._id}`}
                                className='h-8 w-48 hover:bg-zinc-100 rounded transition-all duration-200 flex relative'>
                                <div className='h-6 w-6 text-sm ring-1 bg-slate-100 ring-white rounded-full flex justify-center items-center absolute left-3 top-1 z-40'>💖</div>
                                <div className='h-6 w-6 text-sm ring-1 bg-slate-100 ring-white rounded-full flex justify-center items-center absolute left-7 top-1 z-30'>🦄</div>
                                <div className='h-6 w-6 text-sm ring-1 bg-slate-100 ring-white rounded-full flex justify-center items-center absolute left-11 top-1 z-20'>😲</div>
                                <div className='h-6 w-6 text-sm ring-1 bg-slate-100 ring-white rounded-full flex justify-center items-center absolute left-[3.7rem] top-1 z-10'>🔥</div>
                                <div className='h-6 w-6 text-sm ring-1 bg-slate-100 ring-white rounded-full flex justify-center items-center absolute left-[4.7rem] top-1'>✨</div>
                            </Link>

                            {/* comment count */}
                            <Link
                                href={`/blog/${blog._id}#comments`}
                                className='capitalize text-xs text-zinc-500 md:text-sm flex gap-2 items-center px-2 py-1 hover:bg-zinc-100 rounded transition-all duration-200'>
                                <FaRegComment className='text-lg' />
                                <CommentsCount blogId={blog._id} />
                            </Link>

                        </div>

                        {/* save blog */}
                        <BookmarkButton blogId={blog._id} />

                    </div>

                </div>

            </div>

        </div>
    )
}

export default BlogTemplate