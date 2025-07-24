import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import BlogDate from '../components/BlogDate';
import BookmarkButton from '../components/BookmarkButton';

import { FaRegComment } from "react-icons/fa"; //comment icon

const BlogTemplate = ({ blog }) => {

    // Get current emoji counts and user's reactions
    const emojiCounts = {};
    blog.reactions?.forEach(({ emoji, count }) => {
        emojiCounts[emoji] = count;
    });

    return (
        <div className='w-full h-fit pb-1 bg-white overflow-hidden md:rounded'>

            {/* blog info */}
            <div className='px-2 md:px-4 py-4'>

                {/* Creator Info */}
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

                {/* blog info - title, tags, comments */}
                <div className='mt-3'>

                    {/* blog title */}
                    <Link
                        href={`/blog/${blog.slug}`} // Pass blog ID dynamically
                        className="text-xl md:text-2xl font-semibold hover:text-blue-600 transition-all"
                    >
                        {blog.title}
                    </Link>

                    {/* Tags */}
                    {blog?.tags?.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                            {blog?.tags.map((tag, i) => {
                                const hashColors = [
                                    'text-blue-500',
                                    'text-green-500',
                                    'text-pink-500',
                                    'text-purple-500',
                                    'text-yellow-500',
                                ];
                                const hashColor = hashColors[i % hashColors.length];

                                return (
                                    <button
                                        key={i}
                                        className="text-sm text-zinc-500 px-2 hover:underline"
                                    >
                                        <span className={`${hashColor}`}>#</span>
                                        {tag}
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {/* button - reactions, comment, save blog  */}
                    <div className='mt-4 flex justify-between items-center'>

                        <div className='flex gap-2'>

                            {/* reactions */}
                            <Link
                                href={`/blog/${blog.slug}`}
                                title='add reaction on blog'
                                className='h-8 w-36 md:w-48 hover:bg-zinc-100 rounded transition-all duration-200 flex relative'>

                                <div className='h-6 w-6 text-sm ring-1 bg-slate-100 ring-white rounded-full flex justify-center items-center absolute left-3 top-1 z-40'>💖</div>
                                <div className='h-6 w-6 text-sm ring-1 bg-slate-100 ring-white rounded-full flex justify-center items-center absolute left-7 top-1 z-30'>🦄</div>
                                <div className='h-6 w-6 text-sm ring-1 bg-slate-100 ring-white rounded-full flex justify-center items-center absolute left-11 top-1 z-20'>😲</div>
                                <div className='h-6 w-6 text-sm ring-1 bg-slate-100 ring-white rounded-full flex justify-center items-center absolute left-[3.7rem] top-1 z-10'>🔥</div>
                                <div className='h-6 w-6 text-sm ring-1 bg-slate-100 ring-white rounded-full flex justify-center items-center absolute left-[4.7rem] top-1'>✨</div>

                                <div className='h-6 w-6 text-sm text-zinc-500 rounded-full flex justify-center items-center absolute left-[6.4rem] md:left-[8.2rem] top-1'>
                                    {Object.values(emojiCounts).reduce((acc, v) => acc + v, 0) || 0}
                                    <span className='text-xs ml-2 hidden md:block'>Reactions</span>
                                </div>

                            </Link>

                            {/* comments count */}
                            <Link
                                href={`/blog/${blog.slug}#comments`}
                                title='comment on blog'
                                className='capitalize text-xs text-zinc-500 md:text-sm flex gap-2 items-center px-2 py-1 hover:bg-zinc-100 rounded transition-all duration-200'>
                                <FaRegComment className='text-lg' />
                                {blog.commentsCount}
                                <span className='text-xs hidden md:block'>Comments</span>
                            </Link>

                        </div>

                        {/* save blog */}
                        <BookmarkButton blogId={blog._id} initiallyBookmarked={blog.bookmarked} blogData={blog} />

                    </div>

                </div>

            </div>

        </div>
    )
}

export default BlogTemplate