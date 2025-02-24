import React from 'react'
import Image from 'next/image'
import BlogImage from '@/public/images/js.png'

import { FaRegComment } from "react-icons/fa"; //comment icon
import { FaRegBookmark } from "react-icons/fa6"; //bookmrk icon

const BlogListTemplate = () => {
    return (
        <div className='w-full h-fit pb-4 md:pb-6 bg-white rounded overflow-hidden'>

            {/* blog thumbnail image */}
            <Image
                src={BlogImage}
                alt="Blog Image"
                className="w-full h-auto max-h-72 object-cover"
            />

            {/* blog info */}
            <div className='p-2 md:p-4'>

                {/* creater info */}
                <div className='flex gap-2 items-center'>

                    {/* profile image */}
                    <div className='h-10 w-10 md:h-12 md:w-12 rounded-full bg-zinc-200'>

                    </div>

                    {/* name & date of blog post */}
                    <div>

                        <h2 className='font-semibold'>Tushar Suryawanshi</h2>
                        <p className='text-sm text-zinc-500'>15 feb (1 hour ago)</p>

                    </div>

                </div>

                {/* blog info - title, tags, comments */}
                <div className='mt-3'>

                    {/* blog title */}
                    <h2 className='text-xl md:text-2xl font-semibold'>Frontend Challenge with Next Js: February Edition is coming soon</h2>

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

                        <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>

                            {/* reactions */}
                            <button className='h-8 w-48 hover:bg-zinc-100 rounded transition-all duration-200 flex relative'>

                                <div className='h-6 w-6 text-sm ring-1 bg-slate-100 ring-white rounded-full flex justify-center items-center absolute left-3 top-1 z-40'>
                                    💖
                                </div>
                                <div className='h-6 w-6 text-sm ring-1 bg-slate-100 ring-white rounded-full flex justify-center items-center absolute left-7 top-1 z-30'>
                                    🦄
                                </div>
                                <div className='h-6 w-6 text-sm ring-1 bg-slate-100 ring-white rounded-full flex justify-center items-center absolute left-11 top-1 z-20'>
                                    😲
                                </div>
                                <div className='h-6 w-6 text-sm ring-1 bg-slate-100 ring-white rounded-full flex justify-center items-center absolute left-[3.7rem] top-1 z-10'>
                                    🔥
                                </div>
                                <div className='h-6 w-6 text-sm ring-1 bg-slate-100 ring-white rounded-full flex justify-center items-center absolute left-[4.7rem] top-1'>
                                    ✨
                                </div>

                                {/* reactions count */}
                                <div className='w-24 h-6 text-zinc-500 absolute left-[5.8rem] top-2 text-sm'>
                                    284 rections
                                </div>

                            </button>

                            {/* add comment */}
                            <button className='capitalize text-xs text-zinc-500 md:text-sm flex gap-2 items-center px-2 py-1 hover:bg-zinc-100 rounded transition-all duration-200'>
                                <FaRegComment className='text-lg' />
                                200 comment
                            </button>

                        </div>

                        {/* save blog */}
                        <button className='md:text-xl text-zinc-500 hover:scale-90 transition-all duration-200'>
                            <FaRegBookmark />
                        </button>

                    </div>

                </div>

            </div>

            {/* comments section */}
            <div className='px-4 flex flex-col gap-4'>

                {/* comment - 1 */}
                <div className='flex gap-2'>

                    {/* profile image */}
                    <div className='h-8 w-8 rounded-full bg-zinc-200'>
                    </div>

                    {/* comment box */}
                    <div className='w-full h-fit p-4 bg-zinc-100 rounded'>

                        <div className='flex items-center gap-2'>
                            {/* commenter name */}
                            <h4 className='font-semibold text-zinc-600 capitalize'>Jay</h4>
                            {/* time */}
                            <p className='text-xs text-zinc-500'>(4 hours ago)</p>
                        </div>

                        {/* comment */}
                        <p className='text-zinc-600 text-sm'>
                            This is very helpful. Thanks for sharing 👏🏻
                        </p>

                    </div>

                </div>

                {/* comment - 2 */}
                <div className='flex gap-2'>

                    {/* profile image */}
                    <div className='h-8 w-8 rounded-full bg-zinc-200'>
                    </div>

                    {/* comment box */}
                    <div className='w-full h-fit p-4 bg-zinc-100 rounded'>

                        <div className='flex items-center gap-2'>
                            {/* commenter name */}
                            <h4 className='font-semibold text-zinc-600 capitalize'>Ram</h4>
                            {/* time */}
                            <p className='text-xs text-zinc-500'>(6 hours ago)</p>
                        </div>

                        {/* comment */}
                        <p className='text-zinc-600 text-sm'>
                            Good to mention Github address and Live Demo for each of your projects.
                        </p>

                    </div>

                </div>

                {/* see all coment button */}
                <div className='px-10'>
                    <button className='text-sm text-zinc-600 px-3 py-2 font-semibold w-fit hover:bg-zinc-100 rounded transition-all duration-200'>
                        See all 10 comments
                    </button>
                </div>

            </div>

        </div>
    )
}

export default BlogListTemplate