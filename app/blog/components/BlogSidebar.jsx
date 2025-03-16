import React from 'react'
import { MdOutlineAddReaction, MdBookmarkBorder } from "react-icons/md"; //reaction, bookmark icon
import { FaRegComment } from "react-icons/fa"; //comment icon
import { BsThreeDots } from "react-icons/bs"; // setting icon

const BlogSidebar = ({blog}) => {
    return (
        <section className='hidden md:flex fixed left-0 w-20 h-fit py-20 gap-10 flex-col items-center'>

            {/* like/reaction button */}
            <button className='text-zinc-600 hover:text-pink-500 transition-all duration-200'>
                <MdOutlineAddReaction className='text-2xl'/>
                16
            </button>

            {/* comment button */}
            <button className='text-zinc-600 hover:text-blue-500 transition-all duration-200'>
                <FaRegComment className='text-2xl'/>
                {blog.commentsCount}
            </button>

            {/* bookmark button */}
            <button className='text-zinc-600 hover:text-orange-500 transition-all duration-200'>
                <MdBookmarkBorder className='text-2xl' />
                28
            </button>

            {/* settings button */}
            <button className='text-2xl h-10 w-10 rounded-full text-zinc-600 hover:bg-zinc-200 transition-all duration-200 flex justify-center items-center'>
                <BsThreeDots />
            </button>

        </section>
    )
}

export default BlogSidebar