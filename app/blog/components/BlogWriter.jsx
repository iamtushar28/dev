import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FiExternalLink } from "react-icons/fi"; //calender, link icon


const BlogWriter = ({ author }) => {
    return (
        <section className='w-full md:w-[26%] flex flex-col gap-4'>
            {/* section 1 - author detils */}
            <section className='w-full h-fit pb-4 bg-white md:rounded overflow-hidden'>

                {/* black banner */}
                <div
                    className='h-8 w-full'
                    style={{ backgroundColor: author?.brandColor || "#18181b" }} // Default to zinc-900 if not set
                >
                </div>

                {/* blog author name, profile image */}
                <div className='px-4 flex items-center gap-2'>

                    {/* profile image */}
                    <div className='h-12 w-12 md:h-12 md:w-12 rounded-full -mt-3'>
                        {author.image && (
                            <Image
                                src={author.image}
                                alt="Creator Profile"
                                width={48}
                                height={48}
                                className="w-full h-full rounded-full object-cover"
                            />
                        )}
                    </div>

                    {/* name */}
                    <h2 className='text-lg font-semibold text-zinc-800 -mb-4'>{author.name}</h2>

                </div>

                {/* follow button */}
                <div className='px-4 mt-4'>
                    <button className='p-2 w-full capitalize text-white font-semibold rounded bg-blue-500 hover:bg-blue-600 transition-all duration-200'>
                        follow
                    </button>
                </div>

                {/* about author */}
                <div className='px-4 mt-4'>
                    <p className='text-zinc-600'>
                        {author.bio}
                    </p>
                </div>

                {/* website link */}
                {author?.website && (
                    <div className='px-4 mt-4'>
                        <h4 className='text-zinc-600 font-semibold text-xs uppercase'>website</h4>
                        <Link
                            href={author.website}
                            className='flex items-center mt-1 gap-1 text-sm text-zinc-600 hover:text-blue-600 transition-all duration-200'
                            target="_blank" // Opens in a new tab
                            rel="noopener noreferrer" // Security best practice
                        >
                            <FiExternalLink />
                            {author.website}
                        </Link>
                    </div>
                )}

                <div className='flex gap-4'>
                    {/* author location */}
                    <div className='px-4 mt-4'>
                        <h4 className='text-zinc-600 font-semibold text-xs uppercase'>Location</h4>
                        <h3 className='text-zinc-500 text-sm mt-1'>{author.location || "NA"}</h3>
                    </div>

                    {/* joined date */}
                    <div className='px-4 mt-4'>
                        <h4 className='text-zinc-600 font-semibold text-xs uppercase'>joined date</h4>
                        <h3 className='text-zinc-500 text-sm mt-1'>
                            {new Date(author?.joinedAt).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                            })}
                        </h3>
                    </div>
                </div>

            </section>

            {/* section 2 - more blogs of author */}
            <section className='w-full h-fit p-4 bg-white rounded flex flex-col gap-4'>

                {/* heading */}
                <div className='text-lg font-semibold'>More from <button className='text-blue-600'>DEV</button></div>

                <hr />

                {/* blogs list */}
                <div>
                    {/* title */}
                    <button className='text-zinc-600 hover:text-blue-600 text-start'>
                        Free APIs You Need to Know About in 2025
                    </button>

                    {/* tags */}
                    <div>
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

                </div>

                <hr />

                {/* blogs list */}
                <div>
                    {/* title */}
                    <button className='text-zinc-600 hover:text-blue-600 text-start'>
                        Free APIs You Need to Know About in 2025
                    </button>

                    {/* tags */}
                    <div>
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

                </div>

            </section>

        </section>
    )
}

export default BlogWriter