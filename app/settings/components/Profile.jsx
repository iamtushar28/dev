import React from 'react'
import Image from 'next/image'
import ProfileImage from '@/public/images/profile.jpeg'

const Profile = () => {
    return (
        <section className='w-full'>

            {/* user name */}
            <h2 className='text-xl text-center md:text-3xl px-3 text-blue-600 font-semibold'>@tushar_suryawanshi_ab7e8d</h2>

            {/* user details section */}
            <div className='w-full h-fit p-6 mt-4 bg-white md:rounded-lg shadow-sm flex flex-col gap-6'>

                {/* heading */}
                <h3 className='text-xl font-bold text-zinc-900'>User</h3>

                {/* user name */}
                <div>

                    <h6 className='text-zinc-800 mb-2 text-sm font-semibold'>Name</h6>
                    <input type="text" value={'Tushar Suryawanshi'} className='w-full px-2 py-2 capitalize border border-zinc-300 focus:ring-2 focus:ring-blue-600 rounded outline-none transition-all duration-200' />

                </div>

                {/* user email */}
                <div>

                    <h6 className='text-zinc-800 mb-2 text-sm font-semibold'>Email</h6>
                    <input type="text" value={'tushar28@gmail.com'} className='w-full px-2 py-2 capitalize border border-zinc-300 focus:ring-2 focus:ring-blue-600 rounded outline-none transition-all duration-200' />

                </div>

                {/* user name */}
                <div>

                    <h6 className='text-zinc-800 mb-2 text-sm font-semibold'>Username</h6>
                    <input type="text" value={'tushar28'} className='w-full px-2 py-2 border border-zinc-300 focus:ring-2 focus:ring-blue-600 rounded outline-none transition-all duration-200' />

                </div>

                {/* profile image */}
                <div>

                    <h6 className='text-zinc-800 mb-2 text-sm font-semibold'>Profile Image</h6>

                    <div className='flex gap-3 items-center'>
                        {/* image */}
                        <Image src={ProfileImage} alt='ProfileImage' className='h-12 w-12 rounded-full' />

                        {/* choose file button */}
                        <button className='px-3 py-1 md:px-4 md:py-2 w-fit capitalize text-zinc-600 font-semibold rounded bg-zinc-100 hover:bg-zinc-200 transition-all duration-200'>
                            Choose file
                        </button>
                    </div>

                </div>

            </div>

            {/* basic details section */}
            <div className='w-full h-fit p-6 mt-4 bg-white md:rounded-lg shadow-sm flex flex-col gap-6'>

                {/* heading */}
                <h3 className='text-xl font-bold text-zinc-900'>Basic</h3>

                {/* website url */}
                <div>

                    <h6 className='text-zinc-800 mb-2 text-sm font-semibold'>Website URL</h6>
                    <input type="text" placeholder='www.tushar.in' className='w-full px-2 py-2 border border-zinc-300 focus:ring-2 focus:ring-blue-600 rounded outline-none transition-all duration-200' />

                </div>

                {/* user location */}
                <div>

                    <h6 className='text-zinc-800 mb-2 text-sm font-semibold'>Location</h6>
                    <input type="text" className='w-full px-2 py-2 capitalize border border-zinc-300 focus:ring-2 focus:ring-blue-600 rounded outline-none transition-all duration-200' />

                </div>

                {/* user bio */}
                <div>

                    <h6 className='text-zinc-800 mb-2 text-sm font-semibold'>User Bio</h6>
                    <textarea name="bio" id="bio" placeholder='A short bio...' className='w-full px-2 py-2 capitalize border border-zinc-300 focus:ring-2 focus:ring-blue-600 rounded outline-none transition-all duration-200'></textarea>

                </div>

            </div>

        </section>
    )
}

export default Profile