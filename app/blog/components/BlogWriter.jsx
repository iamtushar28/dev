import React from 'react'

const BlogWriter = () => {
    return (
        <section className='w-full md:w-[26%] flex flex-col gap-4'>
            {/* section 1 - author detils */}
            <section className='w-full h-fit pb-4 bg-white rounded overflow-hidden'>

                {/* black banner */}
                <div className='h-8 w-full bg-zinc-900'></div>

                {/* blog author name, profile image */}
                <div className='px-4 flex items-center gap-2'>

                    {/* profile image */}
                    <div className='h-12 w-12 md:h-12 md:w-12 rounded-full bg-zinc-200 -mt-3'>
                    </div>

                    {/* name */}
                    <h2 className='text-lg font-semibold text-zinc-800 -mb-4'>Tushar Suryawanshi</h2>

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
                        Software Engineer | Frontend developer | Next JS | React JS | Tailwind CSS
                    </p>
                </div>

                {/* author location */}
                <div className='px-4 mt-4'>
                    <h4 className='text-zinc-600 font-semibold text-xs uppercase'>Location</h4>
                    <h3 className='text-zinc-500 text-sm mt-1'>SATARA</h3>
                </div>

                {/* joined date */}
                <div className='px-4 mt-4'>
                    <h4 className='text-zinc-600 font-semibold text-xs uppercase'>joined date</h4>
                    <h3 className='text-zinc-500 text-sm mt-1'>15 Feb 2025</h3>
                </div>

            </section>

            {/* section 2 - more blogs of author */}
            <section className='w-full h-fit p-4 bg-white rounded flex flex-col gap-4'>

                {/* heading */}
                <div className='text-lg font-semibold'>More from <button className='text-blue-600'>Tushar</button></div>

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