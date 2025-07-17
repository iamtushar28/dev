import React from 'react'
import { discussions } from '../data/discussions'

const Discussions = () => {
    return (
        <section className='hidden sm:hidden md:hidden lg:flex w-[25%] gap-3 flex-col'>

            {/* section 1 - discussions */}
            <section className='w-full h-fit py-4 bg-white rounded flex gap-6 flex-col'>

                {/* title */}
                <h2 className='capitalize font-semibold text-lg px-4'>Active Discussions</h2>

                <hr />

                {discussions.map((links, index) => (
                    
                        <div key={index} className='px-4'>
                            <button className='text-start hover:text-blue-700'>
                                {links.title}
                            </button>
                            <button className='text-zinc-400'>
                                {links.comments} comments
                            </button>
                        </div>
                
                ))}
            </section>

            {/* section 2 - activity/challaange */}
            <section className='w-full h-fit py-6 px-4 bg-white rounded flex gap-4 flex-col'>

                {/* title */}
                <h4 className='text-sm text-zinc-500'>👋What's happening this week?</h4>

                <h2 className='capitalize text-lg font-semibold text-zinc-800'>Challange🥰</h2>

                {/* banner */}
                <div className='border-2 border-zinc-800 p-4 rounded-lg'>

                    {/* title */}
                    <h4 className='capitalize text-zinc-700'>just launched🚀</h4>

                    {/* activity title */}
                    <h2 className='font-semibold text-blue-600 underline mt-2'>Frontend Challenge: February Edition</h2>
                    <h3 className='text-zinc-500 italic'>Submissions due March 23</h3>

                </div>

            </section>

        </section>
    )
}

export default Discussions