"use client";
import React from 'react'
import Link from 'next/link'
import { FaRegComment } from "react-icons/fa"; //comment icon
import { BsThreeDots } from "react-icons/bs"; // setting icon
import BookmarkButton from '@/app/components/BookmarkButton';
import MobileReactionButton from './MobileReactionButton';

const MobileBlogSidebar = ({ blog }) => {

    return (
        <div className='block md:hidden'>
            <section className='z-20 flex fixed bottom-0 right-0 left-0 w-full py-2 bg-white shadow-lg border-t border-zinc-200 justify-around'>

                {/* like/reaction button */}
                <MobileReactionButton blogId={blog._id} blog={blog} />

                {/* comment button */}
                <Link
                    href={`/blog/${blog.slug}#comments`}
                    className='text-zinc-600 hover:text-blue-500 transition-all duration-200 flex gap-2 items-center'>
                    <FaRegComment className='text-2xl' />
                    {blog.commentsCount}
                </Link>

                {/* bookmark button */}
                <BookmarkButton blogId={blog._id} />

                {/* settings button */}
                <button className='text-2xl h-10 w-10 rounded-full text-zinc-600 hover:bg-zinc-200 transition-all duration-200 flex justify-center items-center'>
                    <BsThreeDots />
                </button>

            </section>
        </div>
    )
}

export default MobileBlogSidebar