import React from 'react'

const BlogSkelaton = () => {
    return (
        <section className="mt-16 md:mb-4 md:p-4 w-full h-screen flex flex-wrap md:flex-nowrap gap-4 bg-white">


            {/* sidebar */}
            <div className='hidden md:flex fixed left-4 w-20 h-fit py-16 gap-10 flex-col items-center'>

                <div className='h-10 w-10 bg-zinc-100 rounded-full skeleton'></div>
                <div className='h-10 w-10 bg-zinc-100 rounded-full skeleton'></div>
                <div className='h-10 w-10 bg-zinc-100 rounded-full skeleton'></div>
                <div className='h-10 w-10 bg-zinc-100 rounded-full skeleton'></div>

            </div>

            {/* cover image, creator & title */}
            <div className='md:ml-24 w-full md:w-[66%]'>
                {/* image */}
                <div className='w-full h-[20rem] md:h-[26rem] bg-zinc-100 md:rounded-t skeleton'>
                </div>

                {/* Creator Skeleton */}
                <div className='mt-2 px-3 md:px-0 flex gap-3 items-center'>

                    {/* Profile Image */}
                    <div className='h-10 w-10 md:h-12 md:w-12 rounded-full overflow-hidden skeleton'></div>

                    {/* Name & Date Skeleton */}
                    <div className='flex flex-col gap-2'>
                        <div className='h-2 w-48 skeleton'></div>
                        <div className='h-2 w-32 skeleton'></div>
                    </div>
                </div>

                <div className='px-3 md:px-0 flex w-full h-fit mt-6 gap-6 md:gap-10 items-center'>

                    <div className='h-8 w-8 bg-zinc-100 rounded-full skeleton'></div>
                    <div className='h-8 w-8 bg-zinc-100 rounded-full skeleton'></div>
                    <div className='h-8 w-8 bg-zinc-100 rounded-full skeleton'></div>
                    <div className='h-8 w-8 bg-zinc-100 rounded-full skeleton'></div>
                    <div className='h-8 w-8 bg-zinc-100 rounded-full skeleton'></div>

                </div>

                {/* title */}
                <div className='px-3 md:px-0'>
                    <div className='mt-6 w-full h-4 md:h-8 bg-zinc-100 rounded-2xl skeleton'></div>
                </div>

            </div>

            {/* author */}
            <div className='hidden md:flex w-[25%] h-fit flex-col gap-4'>

                <div className='w-full h-72 rounded skeleton'></div>
                <div className='w-full h-72 rounded skeleton'></div>

            </div>

        </section>
    )
}

export default BlogSkelaton