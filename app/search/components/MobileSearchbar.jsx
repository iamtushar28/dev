import React from 'react'
import { FiSearch } from "react-icons/fi";//search


const MobileSearchbar = () => {
    return (
        <div className='px-2 mb-4 block md:hidden relative'>

            {/* searchbar - hidden at mobile screen */}
            <div className='h-10 w-full bg-white rounded border border-gray-200 hover:border-blue-500 hover:ring-2 hover:ring-blue-500 flex justify-center items-center relative transition-all duration-200'>

                {/* search icon */}
                <button className='h-10 w-10 text-xl font-semibold flex justify-center items-center'>
                    <FiSearch />
                </button>

                {/* search box */}
                <input
                    type="text"
                    placeholder='search...'
                    className='h-10 w-full outline-none'
                />

            </div>

            <div className='absolute top-12 left-0 right-0 w-full h-60 bg-white shadow-sm border-t border-b border-gray-300'>

            </div>

        </div>
    )
}

export default MobileSearchbar