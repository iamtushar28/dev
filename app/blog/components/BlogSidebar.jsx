"use client";
import React from 'react'
import Link from 'next/link';
import { FaRegComment } from "react-icons/fa"; //comment icon
import { BsThreeDots } from "react-icons/bs"; // setting icon
import CommentsCount from './CommentsCount';
import BookmarkButton from '@/app/components/BookmarkButton';
import ReactionButton from './ReactionButton';

const BlogSidebar = ({ blog }) => {

    return (
        <section className='hidden md:flex fixed left-0 w-20 h-fit py-20 gap-10 flex-col items-center'>

            {/* like/reaction component */}
            <ReactionButton blogId={blog._id} />

            {/* comment button */}
            <Link
                href={`/blog/${blog._id}#comments`}
                className='text-zinc-600 hover:text-blue-500 transition-all duration-200 flex flex-col justify-center items-center'>
                <FaRegComment className='text-2xl' />
                <CommentsCount blogId={blog._id} />
            </Link>

            {/* bookmark button */}
            <BookmarkButton blogId={blog._id} />

            {/* settings button */}
            <button className='text-2xl h-10 w-10 rounded-full text-zinc-600 hover:bg-zinc-200 transition-all duration-200 flex justify-center items-center'>
                <BsThreeDots />
            </button>

        </section>
    )
}

export default BlogSidebar