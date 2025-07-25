"use client";
import React from 'react'
import Link from 'next/link';
import { FaRegComment } from "react-icons/fa"; //comment icon
import { BsThreeDots } from "react-icons/bs"; // setting icon
import { TbShare3 } from "react-icons/tb"; //share icon
import BookmarkButton from '@/app/components/BookmarkButton';
import ReactionButton from './ReactionButton';
import ShareButton from './ShareButton';

const BlogSidebar = ({ blog }) => {

    return (
        <section className='hidden md:flex fixed left-0 w-20 h-fit py-20 gap-10 flex-col items-center'>

            {/* like/reaction component */}
            <ReactionButton blog={blog} />

            {/* comment button */}
            <Link
                href={`/blog/${blog.slug}#comments`}
                className='text-zinc-600 hover:text-blue-500 transition-all duration-200 flex flex-col justify-center items-center'>
                <FaRegComment className='text-2xl' />
                {blog.commentsCount}
            </Link>

            {/* bookmark button */}
            <BookmarkButton blogId={blog._id} initiallyBookmarked={blog.bookmarked} />

            {/* share button */}
            <ShareButton />

        </section>
    )
}

export default BlogSidebar