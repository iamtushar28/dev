import React from 'react'
import Image from 'next/image'
import BlogImage from '@/public/images/myImage.jpg'

const BlogPost = () => {
    return (
        <section className='md:ml-24 w-full md:w-[66%] h-fit pb-8 bg-white rounded overflow-hidden'>

            {/* blog thumbnail image */}
            <Image
                src={BlogImage}
                alt="Blog Image"
                className="w-full h-auto"
            />

            {/* blog info */}
            <div className='p-2 md:px-10 py-6'>

                {/* creater info */}
                <div className='flex gap-2 items-center'>

                    {/* profile image */}
                    <div className='h-10 w-10 md:h-12 md:w-12 rounded-full bg-zinc-200'>

                    </div>

                    {/* name & date of blog post */}
                    <div>

                        <h2 className='font-semibold'>Tushar Suryawanshi</h2>
                        <p className='text-sm text-zinc-500 font-light'>Posted on Feb 15</p>

                    </div>

                </div>

                {/* rections */}
                <div className='mt-4 text-lg flex gap-10 items-center'>
                    <button>
                        💖 3
                    </button>
                    <button>
                        🦄 8
                    </button>
                    <button>
                        😲 12
                    </button>
                    <button>
                        🔥 20
                    </button>
                </div>

                {/* blog info - title, tags, comments */}
                <div className='mt-4'>

                    {/* blog title */}
                    <h2 className='text-2xl md:text-4xl font-extrabold'>
                        The Ultimate JavaScript Project Repository: 500+ Ideas for Developers 🚀
                    </h2>

                    {/* tags */}
                    <div className='mt-4'>
                        <button className='text-zinc-500 px-2 py-1 rounded hover:ring-2 hover:ring-blue-300 hover:bg-blue-100 transition-all duration-200'>
                            #NextJs
                        </button>
                        <button className='text-zinc-500 px-2 py-1 rounded hover:ring-2 hover:ring-blue-300 hover:bg-blue-100 transition-all duration-200'>
                            #Frontend-dev
                        </button>
                        <button className='text-zinc-500 px-2 py-1 rounded hover:ring-2 hover:ring-blue-300 hover:bg-blue-100 transition-all duration-200'>
                            #Javascript
                        </button>

                    </div>

                </div>

            </div>

            {/* blog discreption */}
            <div className='px-4 md:px-10 mb-8'>
                <h2 className='text-2xl font-bold'>Introduction</h2>
                <p className='mt-2 text-lg'>JavaScript is one of the most versatile and widely used programming languages today. Whether you're a beginner, an experienced developer, or someone preparing for technical interviews, working on projects is the best way to learn and grow. But often, developers struggle with the question: "What should I build next?"
                    <br />
                    <br />
                    To solve this, I created the ULTIMATE-JAVASCRIPT-PROJECT repository on GitHub, featuring 500+ project ideas across different categories, from beginner-friendly applications to advanced, real-world solutions.</p>

                <h2 className='text-3xl font-extrabold mt-2'>What’s Inside? 🔥</h2>
                <h2 className='text-xl font-extrabold mt-5 mb-3'>1️⃣ Beginner-Friendly Projects 🎯</h2>
                <p className='text-lg'>If you're just starting out, these projects will help you practice core JavaScript concepts:
                    <br />
                    - To-Do List ✅ <br />
                    - Calculator 🧮 <br />
                    - Weather App 🌤️ <br />
                    - Random Quote Generator 📝 <br />
                    - Expense Tracker 💰</p>

                <h2 className='text-xl font-extrabold mt-5 mb-3'>2️⃣ Frontend Web Projects 🎨</h2>
                <p className='text-lg'>Master HTML, CSS, and JavaScript by building:
                    <br />
                    - E-commerce Website 🛒 <br />
                    - Portfolio Website 🌐 <br />
                    - Chat Application 💬 <br />
                    - Blogging Platform ✍️</p>

            </div>

            <hr />

            {/* comments section */}
            <div className='mt-8 px-2 md:px-10'>

                {/* heading */}
                <h2 className='text-2xl font-bold capitalize'>Comments (2)</h2>

                {/* comment */}
                <div className='flex flex-col gap-4 mt-6'>

                    {/* comment - 1 */}
                    <div className='flex gap-2'>

                        {/* profile image */}
                        <div className='h-8 w-8 rounded-full bg-zinc-200'>
                        </div>

                        {/* comment box */}
                        <div className='w-full h-fit p-3 bg-zinc-100 rounded'>

                            <div className='flex items-center gap-2'>
                                {/* commenter name */}
                                <h4 className='font-semibold text-zinc-600 capitalize'>Ram</h4>
                                {/* time */}
                                <p className='text-xs text-zinc-500'>(6 hours ago)</p>
                            </div>

                            {/* comment */}
                            <p className='text-zinc-600 text-sm'>
                                Good to mention Github address and Live Demo for each of your projects.
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    )
}

export default BlogPost