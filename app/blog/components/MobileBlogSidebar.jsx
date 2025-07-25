"use client";
import React from 'react'
import Link from 'next/link'
import { FaRegComment } from "react-icons/fa"; //comment icon
import { BsThreeDots } from "react-icons/bs"; // setting icon
import BookmarkButton from '@/app/components/BookmarkButton';
import MobileReactionButton from './MobileReactionButton';
import ShareButton from './ShareButton';

const MobileBlogSidebar = ({ blog }) => {

    return (
        <div className='block md:hidden'>
            <section className='z-20 flex fixed bottom-0 right-0 left-0 w-full py-2 bg-white shadow-lg border-t border-zinc-200 justify-around'>

                {/* like/reaction button */}
                <MobileReactionButton blog={blog} />

                {/* comment button */}
                <Link
                    href={`/blog/${blog.slug}#comments`}
                    className='text-zinc-600 hover:text-blue-500 transition-all duration-200 flex gap-2 items-center'>
                    <FaRegComment className='text-2xl' />
                    {blog.commentsCount}
                </Link>

                {/* bookmark button */}
                <BookmarkButton blogId={blog._id} />

                {/* share button */}
                <ShareButton />

            </section>
        </div>
    )
}

export default MobileBlogSidebar