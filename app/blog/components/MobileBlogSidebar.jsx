import React from 'react'
import { MdOutlineAddReaction, MdBookmarkBorder } from "react-icons/md"; //reaction, bookmark icon
import { FaRegComment } from "react-icons/fa"; //comment icon
import { BsThreeDots } from "react-icons/bs"; // setting icon

const MobileBlogSidebar = ({ blog }) => {
    return (
        <div className='block md:hidden'>
            <section className='flex fixed bottom-0 right-0 left-0 w-full py-2 bg-white shadow-lg border-t border-zinc-200 justify-around'>

                {/* like/reaction button */}
                <button className='text-zinc-600 hover:text-pink-500 transition-all duration-200 flex gap-1 items-center'>
                    <MdOutlineAddReaction className='text-2xl' />
                    16
                </button>

                {/* comment button */}
                <button className='text-zinc-600 hover:text-blue-500 transition-all duration-200 flex gap-1 items-center'>
                    <FaRegComment className='text-2xl' />
                    {blog.commentsCount}
                </button>

                {/* bookmark button */}
                <button className='text-zinc-600 hover:text-orange-500 transition-all duration-200 flex gap-1 items-center'>
                    <MdBookmarkBorder className='text-2xl' />
                    28
                </button>

                {/* settings button */}
                <button className='text-2xl h-10 w-10 rounded-full text-zinc-600 hover:bg-zinc-200 transition-all duration-200 flex justify-center items-center'>
                    <BsThreeDots />
                </button>

            </section>
        </div>
    )
}

export default MobileBlogSidebar