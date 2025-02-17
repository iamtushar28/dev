import React from 'react'
import Image from 'next/image'
import ProfileImage from '@/public/images/profile.jpeg'

import { FiCalendar, FiExternalLink } from "react-icons/fi"; //calender, link icon

const ProfileBanner = () => {
    return (
        <div className='flex flex-col justify-center items-center'>

            {/* background strip */}
            <div className='w-full h-28 md:h-36 bg-zinc-900'></div>

            {/* section 1 - profile banner */}
            <section className='w-full md:w-[78%] h-fit px-4 pb-11 -mt-14 bg-white shadow-sm md:rounded-lg flex gap-6 flex-col items-start md:items-center relative'>

                {/* profile image */}
                <div className='h-16 w-16 md:h-28 md:w-28 -mt-9 md:-mt-12 ring-4 md:ring-[6px] ring-zinc-900 rounded-full flex justify-center items-center'>
                    <Image src={ProfileImage} alt='profile image' className='h-16 w-16 md:h-28 md:w-28 rounded-full' />
                </div>

                {/* follow button */}
                <div className='absolute top-2 right-4 md:top-5 md:right-8'>
                    <button className='px-3 py-1 md:px-4 md:py-2 w-fit capitalize text-white font-semibold rounded bg-blue-600 hover:bg-blue-700 transition-all duration-200'>
                        Follow
                    </button>
                </div>

                {/* bloger name */}
                <h2 className='text-2xl md:text-3xl font-bold capitalize text-zinc-800'>Tushar suryawanshi</h2>

                {/* about */}
                <p className='text-start md:text-center md:px-24 text-zinc-900'>Hi, I’m Arpit Gupta, creator of innovative tools like SecretStack, CloudStack, and ElasticStack. I’m passionate about building open-source solutions that simplify complex developer workflows.</p>

                {/* joining date & portfolio link */}
                <div className='flex gap-8 md:gap-12 items-center'>

                    {/* joining date */}
                    <button className='flex items-center gap-1 text-sm text-zinc-600'>
                        <FiCalendar className='text-xl' />
                        Joined at Feb 10
                    </button>

                    {/* web link */}
                    <button className='flex items-center gap-1 text-sm text-zinc-600 hover:text-blue-600 transition-all duration-200'>
                        <FiExternalLink className='text-xl' />
                        www.tushar.in
                    </button>

                </div>

            </section>

        </div>
    )
}

export default ProfileBanner