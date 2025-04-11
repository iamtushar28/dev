import React from 'react'

const MobileDashboardSidebar = () => {
    return (
        <div className='block md:hidden z-50 fixed bottom-0 left-0 right-0 bg-white border-t w-full p-2'>

            <div className='overflow-y-scroll scroll-smooth flex gap-2'>
                {/* profile */}
                <button className='w-full px-3 py-2 text-sm capitalize font-semibold bg-zinc-100 text-start rounded flex gap-3 items-center transition-all duration-300'>
                    post
                    <span className='text-blue-500'>20</span>
                </button>

                {/* Customization */}
                <button className='w-full px-3 py-2 text-sm capitalize text-zinc-600 hover:bg-zinc-100 text-start rounded flex gap-3 items-center transition-all duration-300'>
                followers
                <span className='text-blue-500'>10</span>
                </button>

                {/* Notification */}
                <button className='w-fit px-3 py-2 text-sm capitalize text-zinc-600 hover:bg-zinc-100 text-start rounded flex gap-3 items-center transition-all duration-300'>
                following
                <span className='text-blue-500'>8</span>
                </button>

                {/* Notification */}
                <button className='w-full px-3 py-2 text-sm text-nowrap capitalize text-zinc-600 hover:bg-zinc-100 text-start rounded flex gap-3 items-center transition-all duration-300'>
                following tags
                <span className='text-blue-500'>6</span>
                </button>

                {/* extensiton */}
                <button className='w-full px-3 py-2 text-sm capitalize text-zinc-600 hover:bg-zinc-100 text-start rounded flex gap-1 items-center transition-all duration-300'>
                analytics
                </button>

            </div>

        </div>
    )
}

export default MobileDashboardSidebar