import React from 'react'

const SettingsSidebar = () => {
    return (
        <div className='hidden w-[24%] md:flex flex-col gap-2'>

            {/* profile */}
            <button className='w-full px-3 py-2 capitalize font-semibold bg-white text-start rounded flex gap-1 items-center transition-all duration-300'>
                <span className='text-lg'>😊</span> profile
            </button>

            {/* Customization */}
            <button className='w-full px-3 py-2 capitalize text-zinc-600 hover:bg-white text-start rounded flex gap-1 items-center transition-all duration-300'>
                <span className='text-lg'>⚙️</span> Customization
            </button>

            {/* Notification */}
            <button className='w-full px-3 py-2 capitalize text-zinc-600 hover:bg-white text-start rounded flex gap-1 items-center transition-all duration-300'>
                <span className='text-lg'>🔔</span> Notification
            </button>

            {/* Notification */}
            <button className='w-full px-3 py-2 capitalize text-zinc-600 hover:bg-white text-start rounded flex gap-1 items-center transition-all duration-300'>
                <span className='text-lg'>👨‍💻</span> account
            </button>

            {/* extensiton */}
            <button className='w-full px-3 py-2 capitalize text-zinc-600 hover:bg-white text-start rounded flex gap-1 items-center transition-all duration-300'>
                <span className='text-lg'>🚀</span> extensiton
            </button>

        </div>
    )
}

export default SettingsSidebar