'use client'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { sidebarLinks } from '../data/sidebarLinks'
import { closeMobileSidebar } from '../redux-store/sidebarSlice'; //import closeMobileSidebar from redux-store

import { FiGithub, FiLinkedin } from "react-icons/fi"; //github icon
import { BsPlusLg } from "react-icons/bs"; //plus icon

const MobileSidebar = () => {

    // getting status of sidebar - close or open
    const isMobileSidebarOpen = useSelector((state) => state.sidebar.isMobileSidebarOpen);
    const dispatch = useDispatch();

    return (
        <section className={`fixed top-0 left-0 py-4 flex w-[85%] h-screen bg-white flex-col gap-1 z-50 shadow-lg ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-all duration-200`}>

            <div className='overflow-y-scroll scroll-smooth'>
                
                {/* brand logo */}
                <div className='px-5 pb-4 flex justify-between items-center'>
                    <div className='flex gap-2 items-center'>
                        <button className='bg-black text-white h-fit w-fit px-2 py-1 font-bold uppercase rounded'>
                            Dev
                        </button>
                        <h2 className='text-zinc-800 capitalize font-semibold'>community</h2>
                    </div>

                    {/* close sidebar button */}
                    <button onClick={() => dispatch(closeMobileSidebar())} className='rotate-45 text-2xl'>
                        <BsPlusLg />
                    </button>
                </div>

                {/* Sidebar links */}
                {sidebarLinks.map((link, index) => (
                    <button
                        key={index}
                        className='group w-full px-4 py-2 text-zinc-600 hover:text-blue-500 hover:bg-blue-100 capitalize text-start rounded flex items-center gap-2 hover:scale-95 transition-all duration-200'
                    >
                        <span className='text-xl'>{link.icon}</span>
                        <span className='group-hover:underline'>{link.title}</span>
                    </button>
                ))}

                {/* other links */}
                <div className=''>
                    <h4 className='capitalize font-semibold text-zinc-800 mt-3 mb-3 px-4'>others</h4>

                    <button className='w-full px-4 py-2 text-zinc-600 hover:text-blue-500 hover:bg-blue-100 capitalize text-start rounded flex items-center gap-2 hover:scale-95 transition-all duration-200'>
                        <span className='text-xl'>🤖</span>
                        code of conduct
                    </button>

                    <button className='w-full px-4 py-2 text-zinc-600 hover:text-blue-500 hover:bg-blue-100 capitalize text-start rounded flex items-center gap-2 hover:scale-95 transition-all duration-200'>
                        <span className='text-xl'>🔒</span>
                        privcy policy
                    </button>

                    <button className='w-full px-4 py-2 text-zinc-600 hover:text-blue-500 hover:bg-blue-100 capitalize text-start rounded flex items-center gap-2 hover:scale-95 transition-all duration-200'>
                        <span className='text-xl'>📝</span>
                        terms of use
                    </button>

                </div>

                {/* social links */}
                <div className='px-4'>

                    <h4 className='capitalize font-semibold text-zinc-800 mt-3 mb-3'>social links</h4>

                    <div className='flex'>
                        {/* github */}
                        <button className='text-xl h-10 w-10 rounded-full hover:bg-blue-50 flex justify-center items-center hover:scale-90 transition-all duration-200'>
                            <FiGithub />
                        </button>

                        {/* linkedin */}
                        <button className='text-xl h-10 w-10 rounded-full hover:bg-blue-50 flex justify-center items-center hover:scale-90 transition-all duration-200'>
                            <FiLinkedin />
                        </button>

                    </div>

                </div>

                {/* footer section */}
                <div className='px-4 mt-4 text-sm text-zinc-500'>
                    DEV Community © 2025.
                </div>

            </div>

        </section>
    )
}

export default MobileSidebar