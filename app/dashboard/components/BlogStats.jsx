import React from 'react'

const BlogStats = () => {
    return (
        <section className='w-full px-2 md:px-0'>

            {/* heading */}
            <h2 className='text-2xl font-bold text-zinc-900 mb-4'>Dashboard</h2>

            {/* stats cards */}
            <div className='flex flex-wrap gap-2 md:gap-0 md:justify-between'>

                {/* total post reactions */}
                <div className='h-fit w-[48%] md:w-[32%] p-4 md:p-6 bg-white shadow-sm rounded'>

                    {/* count */}
                    <h2 className='text-2xl md:text-3xl font-semibold'>
                        18
                    </h2>

                    <p className='text-zinc-500 text-sm'>Total post reactions</p>

                </div>

                {/* total post comments */}
                <div className='h-fit w-[48%] md:w-[32%] p-4 md:p-6 bg-white shadow-sm rounded'>

                    {/* count */}
                    <h2 className='text-2xl md:text-3xl font-semibold'>
                        10
                    </h2>

                    <p className='text-zinc-500 text-sm'>Total post comments</p>

                </div>

                {/* total post views */}
                <div className='h-fit w-[48%] md:w-[32%] p-4 md:p-6 bg-white shadow-sm rounded'>

                    {/* count */}
                    <h2 className='text-2xl md:text-3xl font-semibold'>
                        999+
                    </h2>

                    <p className='text-zinc-500 text-sm'>Total post views</p>

                </div>

            </div>

        </section>
    )
}

export default BlogStats