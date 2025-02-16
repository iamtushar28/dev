'use client'
import React from 'react'
import { useState, useEffect, useRef } from 'react'

import { BsThreeDots } from "react-icons/bs"; //dots icon
import BlogListTemplate from './BlogListTemplate';

const Blog = () => {

    const [openFilterMenu, setOpenFilterMenu] = useState(false);
    const wrapperRef = useRef(null);
    const filterButtonRef = useRef(null);

    const toggleFilterMenu = () => {
        setOpenFilterMenu((prev) => !prev);
    };

    // Hide FilterMenu menu when clicked outside
    const handleClickOutside = (event) => {
        if (
            openFilterMenu && // Only check if menu is already open
            wrapperRef.current &&
            !wrapperRef.current.contains(event.target) &&
            filterButtonRef.current &&
            !filterButtonRef.current.contains(event.target) // Ensure click is not on the button
        ) {
            setOpenFilterMenu(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openFilterMenu]); // Depend on `openFilterMenu` to correctly track its state


    return (
        <section className='w-full md:w-[72%] lg:w-[60%]'>

            {/* buttons - discover, following, filter blogs */}
            <div className='flex justify-between items-center relative'>

                <div className='flex gap-2'>
                    {/* discover blogs btn */}
                    <button className='capitalize py-1 px-4 text-lg bg-white rounded font-semibold'>
                        discover
                    </button>

                    {/* following blogs btn */}
                    <button className='capitalize py-1 px-4 text-lg hover:text-blue-500 hover:bg-white rounded transition-all duration-200'>
                        following
                    </button>
                </div>

                {/* filter blogs section */}
                <button ref={filterButtonRef} onClick={toggleFilterMenu} className='text-xl h-8 w-8 rounded-full hover:bg-blue-100 hover:text-blue-500 transition-all duration-300 flex justify-center items-center'>
                    <BsThreeDots />
                </button>

                {/* filter options for blogs */}
                {openFilterMenu && (
                    <div ref={wrapperRef} className='w-64 h-fit p-4 rounded bg-white absolute top-10 right-0 flex flex-col gap-2 shadow-lg'>

                        <h4 className='font-semibold'>Relavent</h4>

                        {/* devide line */}
                        <div className='h-[0.6px] w-full bg-zinc-200'></div>

                        <div>
                            <button className='w-full px-3 py-2 text-zinc-600 hover:text-blue-500 hover:bg-blue-50 capitalize text-start rounded flex items-center gap-2 hover:scale-95 transition-all duration-200'>
                                top this week
                            </button>
                            <button className='w-full px-3 py-2 text-zinc-600 hover:text-blue-500 hover:bg-blue-50 capitalize text-start rounded flex items-center gap-2 hover:scale-95 transition-all duration-200'>
                                top this month
                            </button>
                            <button className='w-full px-3 py-2 text-zinc-600 hover:text-blue-500 hover:bg-blue-50 capitalize text-start rounded flex items-center gap-2 hover:scale-95 transition-all duration-200'>
                                top this year
                            </button>
                            <button className='w-full px-3 py-2 text-zinc-600 hover:text-blue-500 hover:bg-blue-50 capitalize text-start rounded flex items-center gap-2 hover:scale-95 transition-all duration-200'>
                                top this infinity
                            </button>
                        </div>

                        {/* devide line */}
                        <div className='h-[0.6px] w-full bg-zinc-200'></div>

                        <button className='w-full px-3 py-2 text-zinc-600 hover:text-blue-500 hover:bg-blue-50 capitalize text-start rounded flex items-center gap-2 hover:scale-95 transition-all duration-200'>
                            ⚡latest
                        </button>

                    </div>
                )}

            </div>

            {/* section for - blogs list */}
            <div className='mt-2 flex flex-col gap-3'>

                <BlogListTemplate />
                <BlogListTemplate />
                <BlogListTemplate />
                <BlogListTemplate />
                <BlogListTemplate />

            </div>


        </section>
    )
}

export default Blog