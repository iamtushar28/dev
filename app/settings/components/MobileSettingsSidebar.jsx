import React from 'react'

const MobileSettingsSidebar = () => {
    return (
        <div className='block md:hidden z-30 fixed bottom-0 left-0 right-0 bg-white border-t w-full p-2'>

            <div className='overflow-y-scroll scroll-smooth flex gap-2'>
                {/* profile */}
                <button className='w-full px-3 py-2 text-sm capitalize font-semibold bg-zinc-100 text-start rounded flex gap-1 items-center transition-all duration-300'>
                    <span className=''>😊</span> profile
                </button>

                {/* Customization */}
                <button className='w-full px-3 py-2 text-sm capitalize text-zinc-600 hover:bg-zinc-100 text-start rounded flex gap-1 items-center transition-all duration-300'>
                    <span className=''>⚙️</span> Customization
                </button>

                {/* Notification */}
                <button className='w-full px-3 py-2 text-sm capitalize text-zinc-600 hover:bg-zinc-100 text-start rounded flex gap-1 items-center transition-all duration-300'>
                    <span className=''>🔔</span> Notification
                </button>

                {/* Notification */}
                <button className='w-full px-3 py-2 text-sm capitalize text-zinc-600 hover:bg-zinc-100 text-start rounded flex gap-1 items-center transition-all duration-300'>
                    <span className=''>👨‍💻</span> account
                </button>

                {/* extensiton */}
                <button className='w-full px-3 py-2 text-sm capitalize text-zinc-600 hover:bg-zinc-100 text-start rounded flex gap-1 items-center transition-all duration-300'>
                    <span className=''>🚀</span> extensiton
                </button>

            </div>

        </div>
    )
}

export default MobileSettingsSidebar