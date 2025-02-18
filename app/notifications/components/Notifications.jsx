import React from 'react'

const Notifications = () => {
    return (
        <div className='w-full md:w-[74%] h-screen md:mt-6'>

            {/* heading */}
            <h2 className='text-2xl font-semibold px-3 mb-3 block md:hidden'>Notifications</h2>

            {/* Notifications */}
            <div className='flex flex-col gap-3'>
                <div className='w-full h-fit p-4 rounded bg-white shadow-sm relative'>

                    <p className='text-zinc-600'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum, a.</p>

                    <p className='text-zinc-500 mt-3'>15 Feb</p>

                    {/* delete notification button */}
                    <button className='px-3 py-1 text-sm hover:bg-zinc-100 text-red-500 rounded transition-all duration-200 absolute bottom-3 right-3'>
                        Delete
                    </button>

                </div>

                <div className='w-full h-fit p-4 rounded bg-white shadow-sm relative'>

                    <p className='text-zinc-600'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum, a.</p>

                    <p className='text-zinc-500 mt-3'>15 Feb</p>

                    {/* delete notification button */}
                    <button className='px-3 py-1 text-sm hover:bg-zinc-100 text-red-500 rounded transition-all duration-200 absolute bottom-3 right-3'>
                        Delete
                    </button>

                </div>
            </div>

        </div>
    )
}

export default Notifications