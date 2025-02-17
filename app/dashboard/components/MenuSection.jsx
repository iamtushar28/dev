import React from 'react'

const MenuSection = () => {
    return (
        <section className='w-full'>

            {/* heading */}
            <h2 className='text-zinc-900 capitalize font-semibold mb-3 pl-2 md:pl-2'>Posts</h2>

            {/* content */}
            <div className='w-full h-96 bg-white shadow-sm rounded flex gap-4 flex-col justify-center items-center'>

                <p className='text-sm md:text-lg text-zinc-800 text-center'>This is where you can manage your posts, but you haven't written anything yet.</p>

                <button className='px-4 py-2 w-fit capitalize text-white font-semibold rounded bg-blue-600 hover:bg-blue-700 transition-all duration-200'>
                Write your first post now
                </button>

            </div>

        </section>
    )
}

export default MenuSection