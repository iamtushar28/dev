'use client'
import React, { useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react';
import Image from 'next/image'
import AddComment from './AddComment'
import Comments from './Comments'
import BlogDate from '@/app/components/BlogDate'
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-light.css'; // You can change theme here
import Summarizer from './Summarizer';

const BlogPost = ({ blog, author }) => {

    const { data: session } = useSession();

    const contentRef = useRef(null);

    useEffect(() => {
        if (contentRef.current) {
            const codeBlocks = contentRef.current.querySelectorAll('pre code');

            // 💡 Unset previously highlighted blocks
            codeBlocks.forEach((block) => {
                block.removeAttribute('data-highlighted');
            });

            // ✅ Re-run highlight.js
            requestAnimationFrame(() => {
                hljs.highlightAll();
            });
        }
    }, [blog.description]);


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
            <div className='px-4 md:px-10 py-6'>
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
                        <BlogDate createdAt={blog?.createdAt} />
                    </div>
                </div>

                {/* reactions (showing counts) */}
                <div className='mt-4 text-xl md:text-2xl flex gap-6 md:gap-12 items-center'>
                    {["💖", "🦄", "😲", "🔥", "✨"].map((emoji) => {
                        const count = blog.reactions?.find((r) => r.emoji === emoji)?.count || 0;
                        return (
                            <div key={emoji} className="flex items-center">
                                {emoji} <span className="text-xs ml-1">{count}</span>
                            </div>
                        );
                    })}
                </div>


                {/* blog info - title, tags, comments */}
                <div className='mt-4'>
                    {/* blog title */}
                    <h2 className='text-2xl md:text-4xl font-extrabold'>
                        {blog.title}
                    </h2>

                    {/* Tags */}
                    {blog?.tags?.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1">
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

                    {/* blog summarizer */}
                    {session && (
                        <Summarizer blogDescription={blog.description} />
                    )}

                </div>
            </div>

            {/* blog description */}
            <div className='px-4 md:px-10 mb-8'>
                <div
                    ref={contentRef}
                    className="md:text-xl prose prose-lg prose-blue max-w-full"
                    dangerouslySetInnerHTML={{ __html: blog.description }}
                />
            </div>

            <hr />

            {/* comments section */}
            <div className='mt-8 px-2 md:px-6' id='comments'>
                {/* heading */}
                <div className='flex items-center gap-2 text-2xl font-bold'>
                    <h2 className='capitalize'>Comments - {blog.commentsCount}</h2>
                </div>

                {/* for adding comment on blog */}
                <AddComment blog={blog} session={session} />

                {/* for showing all comments of blog */}
                <Comments blogId={blog._id} blog={blog} />
            </div>

        </section>
    )
}

export default BlogPost
