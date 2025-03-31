import React from 'react'

const SearchSidebar = () => {
    return (
        <div className='hidden md:block w-[24%]'>

            {/* heading */}
            <h2 className='text-2xl font-semibold'>Search results</h2>

            <div className='flex flex-col gap-2 mt-4'>

                {/* post */}
                <button className='w-full px-4 py-2 font-semibold capitalize bg-white text-start rounded flex justify-between items-center transition-all duration-300'>
                   📝 posts
                </button>

                {/* peoples */}
                <button className='w-full px-4 py-2 capitalize hover:bg-white text-start rounded flex justify-between items-center transition-all duration-300'>
                   🧑‍🤝‍🧑 peoples
                </button>

                {/* organisation */}
                <button className='w-full px-4 py-2 capitalize hover:bg-white text-start rounded flex justify-between items-center transition-all duration-300'>
               🏢 organisation
                </button>

                {/* tags */}
                <button className='w-full px-4 py-2 capitalize hover:bg-white text-start rounded flex justify-between items-center transition-all duration-300'>
               🏷️ tags
                </button>

                {/* my post only */}
                <button className='w-full px-4 py-2 capitalize hover:bg-white text-start rounded flex justify-between items-center transition-all duration-300'>
               👨‍💻 my post only
                </button>

            </div>

        </div>
    )
}

export default SearchSidebar