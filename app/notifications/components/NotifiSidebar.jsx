import React from 'react'

const NotifiSidebar = () => {
    return (
        <div className='hidden md:block w-[24%]'>

            {/* heading */}
            <h2 className='text-2xl font-semibold'>Notifications</h2>

            <div className='flex flex-col gap-2 mt-4'>

                {/* All */}
                <button className='w-full px-4 py-2 font-semibold capitalize bg-white text-start rounded flex justify-between items-center transition-all duration-300'>
                    🔔 All
                </button>

                {/* Comments */}
                <button className='w-full px-4 py-2 capitalize hover:bg-white text-start rounded flex justify-between items-center transition-all duration-300'>
                    💬 Comments
                </button>

                {/* Post */}
                <button className='w-full px-4 py-2 capitalize hover:bg-white text-start rounded flex justify-between items-center transition-all duration-300'>
                    📝 Post
                </button>

            </div>

        </div>
    )
}

export default NotifiSidebar