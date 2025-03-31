import React from 'react'

import { FaRegComment } from "react-icons/fa"; //comment icon
import { FaRegBookmark } from "react-icons/fa6"; //bookmrk icon

const SearchedBlogsList = () => {
    return (
        <div className='w-full md:w-[74%] h-screen'>

            {/* quick filter section */}
            <div className='flex justify-end gap-2'>

                {/* Popular */}
                <button className='w-fit px-3 py-1 text-sm font-semibold capitalize text-blue-500 bg-white rounded flex justify-between items-center transition-all duration-300'>
                    Popular
                </button>

                {/* Newest */}
                <button className='w-fit px-3 py-1 text-sm capitalize hover:text-blue-500 hover:bg-white rounded flex justify-between items-center transition-all duration-300'>
                    Newest
                </button>

                {/* Oldest */}
                <button className='w-fit px-3 py-1 text-sm capitalize hover:text-blue-500 hover:bg-white rounded flex justify-between items-center transition-all duration-300'>
                    Oldest
                </button>

            </div>

            {/* blog list */}
            <div className='flex flex-col gap-3 mt-5'>
                {/* blog-1 */}
                <div className='w-full h-fit p-4 md:p-6 bg-white shadow-sm md:rounded'>

                    {/* creater info */}
                    <div className='flex gap-2 items-center'>

                        {/* profile image */}
                        <div className='h-10 w-10 rounded-full bg-zinc-200'>

                        </div>

                        {/* name & date of blog post */}
                        <div>

                            <h2 className='font-semibold'>Tushar Suryawanshi</h2>
                            <p className='text-sm text-zinc-500 font-light'>Feb 15</p>

                        </div>

                    </div>

                    <div className='mt-2'>

                        {/* blog title */}
                        <h2 className='text-xl font-bold'>
                            The Ultimate JavaScript Project Repository: 500+ Ideas for Developers 🚀
                        </h2>

                        {/* tags */}
                        <div className='mt-2'>
                            <button className='text-zinc-500 text-sm px-2 py-1 rounded hover:ring-2 hover:ring-blue-300 hover:bg-blue-100 transition-all duration-200'>
                                #NextJs
                            </button>
                            <button className='text-zinc-500 text-sm px-2 py-1 rounded hover:ring-2 hover:ring-blue-300 hover:bg-blue-100 transition-all duration-200'>
                                #Frontend-dev
                            </button>
                            <button className='text-zinc-500 text-sm px-2 py-1 rounded hover:ring-2 hover:ring-blue-300 hover:bg-blue-100 transition-all duration-200'>
                                #Javascript
                            </button>

                        </div>

                        {/* button - reactions, comment, save blog  */}
                        <div className='mt-2 flex justify-between items-center'>

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
                {/* blog-2 */}
                <div className='w-full h-fit p-4 md:p-6 bg-white shadow-sm md:rounded'>

                    {/* creater info */}
                    <div className='flex gap-2 items-center'>

                        {/* profile image */}
                        <div className='h-10 w-10 rounded-full bg-zinc-200'>

                        </div>

                        {/* name & date of blog post */}
                        <div>

                            <h2 className='font-semibold'>Tushar Suryawanshi</h2>
                            <p className='text-sm text-zinc-500 font-light'>Feb 15</p>

                        </div>

                    </div>

                    <div className='mt-2'>

                        {/* blog title */}
                        <h2 className='text-xl font-bold'>
                            The Ultimate JavaScript Project Repository: 500+ Ideas for Developers 🚀
                        </h2>

                        {/* tags */}
                        <div className='mt-2'>
                            <button className='text-zinc-500 text-sm px-2 py-1 rounded hover:ring-2 hover:ring-blue-300 hover:bg-blue-100 transition-all duration-200'>
                                #NextJs
                            </button>
                            <button className='text-zinc-500 text-sm px-2 py-1 rounded hover:ring-2 hover:ring-blue-300 hover:bg-blue-100 transition-all duration-200'>
                                #Frontend-dev
                            </button>
                            <button className='text-zinc-500 text-sm px-2 py-1 rounded hover:ring-2 hover:ring-blue-300 hover:bg-blue-100 transition-all duration-200'>
                                #Javascript
                            </button>

                        </div>

                        {/* button - reactions, comment, save blog  */}
                        <div className='mt-2 flex justify-between items-center'>

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
            </div>

        </div>
    )
}

export default SearchedBlogsList