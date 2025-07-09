'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import BlogDate from '@/app/components/BlogDate' // for showing date of blog posting
import AddComment from './AddComment'
import Comments from './Comments'
import CommentsCount from './CommentsCount'

const BlogPost = ({ blog, author }) => {

    const [reactions, setReactions] = useState({
        like: 0,
        unicorn: 0,
        excite: 0,
        fire: 0,
        star: 0,
    });

    // Fetch reactions when the component loads
    const fetchReactions = async () => {
        try {
            const res = await fetch(`/api/reactions?blogId=${blog._id}`);
            const data = await res.json();
            if (res.ok) {
                setReactions(data.reactions); // update the state with the reaction data
            }
        } catch (error) {
            console.error('Failed to fetch reactions', error);
        }
    };

    useEffect(() => {
        fetchReactions();
    }, [blog._id]); // Re-fetch if blog._id changes

    return (
        <section className='md:ml-24 w-full md:w-[66%] h-fit pb-12 bg-white md:rounded'>

            {/* blog thumbnail image */}
            {blog.coverImage && (
                <Image
                    src={blog.coverImage}
                    alt="Blog Cover"
                    className="w-full h-auto object-cover md:rounded-t"
                    width={800} // Adjust as needed
                    height={350} // Adjust as needed
                    layout="responsive"
                />
            )}

            {/* blog info */}
            <div className='px-4 md:px-6 py-6'>
                {/* creator info */}
                <div className='flex gap-2 items-center'>
                    {/* profile image */}
                    <div className='h-10 w-10 md:h-12 md:w-12 rounded-full'>
                        {author.image && (
                            <Image
                                src={author.image}
                                alt="Creator Profile"
                                width={48}
                                height={48}
                                className="w-full h-full rounded-full object-cover"
                            />
                        )}
                    </div>

                    {/* name & date of blog post */}
                    <div>
                        <h2 className='font-semibold'>{author.name}</h2>
                        <p className="text-sm text-zinc-500">
                            {new Date(blog?.createdAt).toLocaleDateString(undefined, {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                            })}
                        </p>

                    </div>
                </div>

                {/* reactions (showing counts) */}
                <div className='mt-4 text-lg flex gap-10 items-center'>
                    <div className="flex items-center">
                        💖 <span className="text-xs">{reactions.like}</span>
                    </div>
                    <div className="flex items-center">
                        🦄 <span className="text-xs">{reactions.unicorn}</span>
                    </div>
                    <div className="flex items-center">
                        😲 <span className="text-xs">{reactions.excite}</span>
                    </div>
                    <div className="flex items-center">
                        🔥 <span className="text-xs">{reactions.fire}</span>
                    </div>
                    <div className="flex items-center">
                        ✨ <span className="text-xs">{reactions.star}</span>
                    </div>
                </div>

                {/* blog info - title, tags, comments */}
                <div className='mt-4'>
                    {/* blog title */}
                    <h2 className='text-2xl md:text-4xl font-extrabold'>
                        {blog.title}
                    </h2>

                    {/* tags */}
                    <div className='mt-4'>
                        <button className='text-zinc-500 px-2 py-1 rounded hover:ring-2 hover:ring-blue-300 hover:bg-blue-100 transition-all duration-200'>
                            #NextJs
                        </button>
                        <button className='text-zinc-500 px-2 py-1 rounded hover:ring-2 hover:ring-blue-300 hover:bg-blue-100 transition-all duration-200'>
                            #Frontend-dev
                        </button>
                        <button className='text-zinc-500 px-2 py-1 rounded hover:ring-2 hover:ring-blue-300 hover:bg-blue-100 transition-all duration-200'>
                            #Javascript
                        </button>
                    </div>
                </div>
            </div>

            {/* blog description */}
            <div className='px-4 md:px-6 mb-8'>
                <div
                    className="prose prose-lg prose-blue max-w-full"
                    dangerouslySetInnerHTML={{ __html: blog.description }}
                />
            </div>

            <hr />

            {/* comments section */}
            <div className='mt-8 px-2 md:px-6' id='comments'>
                {/* heading */}
                <div className='flex items-center gap-2 text-2xl font-bold'>
                    <h2 className='capitalize'>Comments -</h2>
                    <CommentsCount blogId={blog._id} />
                </div>

                {/* for adding comment on blog */}
                <AddComment blog={blog} />

                {/* for showing all comments of blog */}
                <Comments blogId={blog._id} />
            </div>

        </section>
    )
}

export default BlogPost
