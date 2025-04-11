import React from 'react'
import { sidebarLinks } from '../data/sidebarLinks'

import { FiGithub, FiLinkedin } from "react-icons/fi"; //github icon

const Sidebar = () => {
    return (
        <section className='flex h-fit flex-col gap-1'>

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
                <h4 className='capitalize font-semibold text-zinc-800 mt-3 mb-3'>others</h4>

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
             <button className='underline text-blue-500 hidden'>Tushar</button>🥰. DEV Community © 2025 - 2026.
            </div>

        </section>
    )
}

export default Sidebar