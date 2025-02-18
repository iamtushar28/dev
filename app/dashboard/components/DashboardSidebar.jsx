import React from 'react'

const DashboardSidebar = () => {
  return (
    <section className='hidden md:flex w-72 h-screen flex-col gap-2'>

      {/* post */}
      <button className='w-full px-4 py-2 font-semibold capitalize bg-white text-start rounded flex justify-between items-center'>
        post
        <span className='px-2 py-1 text-sm bg-blue-50 text-blue-400 rounded'>
          99
        </span>
      </button>

      {/* follower */}
      <button className='w-full px-3 py-2 capitalize hover:bg-white text-start rounded flex justify-between items-center transition-all duration-300'>
        followers
        <span className='px-2 py-1 text-sm bg-blue-50 text-blue-400 rounded'>
          30
        </span>
      </button>

      {/* following user */}
      <button className='w-full px-3 py-2 capitalize hover:bg-white text-start rounded flex justify-between items-center transition-all duration-300'>
        following users
        <span className='px-2 py-1 text-sm bg-blue-50 text-blue-400 rounded'>
          28
        </span>
      </button>

      {/* following tags */}
      <button className='w-full px-3 py-2 capitalize hover:bg-white text-start rounded flex justify-between items-center transition-all duration-300'>
        following tags
        <span className='px-2 py-1 text-sm bg-blue-50 text-blue-400 rounded'>
          40
        </span>
      </button>

      {/* following organisation */}
      <button className='w-full px-3 py-2 capitalize hover:bg-white text-start rounded flex justify-between items-center transition-all duration-300'>
        following organisation
        <span className='px-2 py-1 text-sm bg-blue-50 text-blue-400 rounded'>
          10
        </span>
      </button>

      {/* analytics */}
      <button className='w-full px-3 py-2 capitalize hover:bg-white text-start rounded flex justify-between items-center transition-all duration-300'>
        analytics
      </button>

    </section>
  )
}

export default DashboardSidebar