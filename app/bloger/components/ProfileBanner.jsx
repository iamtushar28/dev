'use client'
import { useSession } from "next-auth/react"; //getting user session
import { useState, useEffect } from "react";
import Image from 'next/image'
import Link from "next/link";

import { FiCalendar, FiExternalLink } from "react-icons/fi"; //calender, link icon
import { CiLocationOn } from "react-icons/ci" //location icon

const ProfileBanner = () => {

    const { data: session } = useSession(); // Get user session
    const [userData, setUserData] = useState(null);

    // Fetch user data
    useEffect(() => {
        if (session?.user?.email) {
            fetch("/api/user")
                .then(async (res) => {
                    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
                    return res.json();
                })
                .then((data) => {
                    if (!data.error) setUserData(data);
                })
                .catch(() => { }); // No console logs
        }
    }, [session]);

    return (
        <div className='w-full flex flex-col justify-center items-center'>

            {/* background strip */}
            <div
                className="w-full h-28 md:h-36"
                style={{ backgroundColor: userData?.brandColor || "#18181b" }} // Default to zinc-900 if not set
            ></div>

            {/* section 1 - profile banner */}
            <section className='w-full md:w-[78%] h-fit px-4 pb-11 -mt-14 bg-white shadow-sm md:rounded-lg flex gap-6 flex-col items-start md:items-center relative'>

                {/* profile image */}
                <div
                    className="h-16 w-16 md:h-28 md:w-28 -mt-9 md:-mt-12 ring-4 md:ring-[6px] rounded-full flex justify-center items-center"
                    style={{ boxShadow: `0 0 0 5px ${userData?.brandColor || '#18181b'}` }} // Default to zinc-900
                >
                    <Image
                        src={session?.user?.image}
                        alt='profile image'
                        width={112}
                        height={112}
                        className='h-16 w-16 md:h-28 md:w-28 rounded-full' />
                </div>

                {/* follow button */}
                <div className='absolute top-2 right-4 md:top-5 md:right-8'>
                    <Link
                    href={'/settings'}
                    className='px-3 py-1 md:px-4 md:py-2 w-fit capitalize text-white font-semibold rounded bg-blue-600 hover:bg-blue-700 transition-all duration-200'>
                        Edit
                    </Link>
                </div>

                {/* bloger name */}
                <h2 className='text-2xl md:text-3xl font-bold capitalize text-zinc-800'>{session?.user?.name}</h2>

                {/* about */}
                <p className='text-start md:text-center md:px-24 text-zinc-900'>{userData?.bio}</p>

                {/* joining date, location & portfolio link */}
                <div className='flex gap-8 md:gap-12 items-center'>

                    {/* joining date */}
                    <button className='hidden md:flex items-center gap-1 text-sm text-zinc-600'>
                        <FiCalendar className='text-xl' />
                        {userData?.joinedAt
                            ? new Date(userData.joinedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
                            : 'N/A'}
                    </button>


                    {/* location */}
                    <button className='flex items-center gap-1 text-sm text-zinc-600'>
                        <CiLocationOn className='text-xl' />
                        {userData?.location}
                    </button>

                    {/* website link */}
                    {userData?.website && (
                        <Link
                            href={userData.website}
                            className='flex items-center gap-1 text-sm text-zinc-600 hover:text-blue-600 transition-all duration-200'
                            target="_blank" // Opens in a new tab
                            rel="noopener noreferrer" // Security best practice
                        >
                            <FiExternalLink className='text-xl' />
                            {userData.website}
                        </Link>
                    )}

                </div>

            </section>

        </div>
    )
}

export default ProfileBanner