"use client";
import { signIn } from "next-auth/react";
import React from 'react'
import Link from 'next/link'
import { FcGoogle } from "react-icons/fc"; //google icon
import { BsGithub } from "react-icons/bs"; //git hub icon
import { FaSquareFacebook } from "react-icons/fa6"; //facebook icon

const SignIn = () => {
    return (
        <section className='w-full h-screen bg-white py-8 px-3 md:px-0 md:py-12 flex gap-4 md:gap-6 flex-col justify-center items-center'>

            {/* brand logo */}
            <Link
                href={'/'}
                className='bg-black text-white text-xl h-fit px-2 py-1 font-bold uppercase rounded'>
                Dev
            </Link>

            {/* headline */}
            <h1 className='text-2xl md:text-3xl font-bold text-zinc-800'>Join the DEV Community</h1>

            {/* sign in options */}

            {/* google */}
            <button
                onClick={() => signIn("google", { callbackUrl: "/" })}
                className='h-12 w-full md:w-[45%] border rounded hover:bg-zinc-100 text-center text-sm font-semibold relative transition-all duration-200'>
                Continue with Google
                <FcGoogle className='absolute top-3 left-4 text-2xl' />
            </button>

            {/* github */}
            <button
                onClick={() => signIn("github", { callbackUrl: "/" })}
                className='h-12 w-full md:w-[45%] border rounded hover:bg-zinc-100 text-center text-sm font-semibold relative transition-all duration-200'>
                Continue with Github
                <BsGithub className='absolute top-3 left-4 text-2xl' />
            </button>

            {/* facebook */}
            <button className='h-12 w-full md:w-[45%] border rounded hover:bg-zinc-100 text-center text-sm font-semibold relative transition-all duration-200'>
                Continue with Facebook
                <FaSquareFacebook className='absolute top-3 left-4 text-2xl text-blue-600' />
            </button>

            <div className="hidden">
                {/* devider */}
                <div className='w-full md:w-[45%] flex gap-5 justify-center items-center'>

                    <div className='w-[42%] h-[1.2px] bg-zinc-200'></div>
                    OR
                    <div className='w-[42%] h-[1.2px] bg-zinc-200'></div>

                </div>

                {/* form section */}

                {/* user email */}
                <div className='w-full md:w-[45%]'>

                    <h6 className='text-zinc-800 mb-2 text-sm font-semibold'>Email</h6>
                    <input type="text" className='w-full px-2 py-2 capitalize border border-zinc-300 focus:ring-2 focus:ring-blue-600 rounded outline-none transition-all duration-200' />

                </div>

                {/* user password */}
                <div className='w-full md:w-[45%]'>

                    <h6 className='text-zinc-800 mb-2 text-sm font-semibold'>Password</h6>
                    <input type="text" className='w-full px-2 py-2 capitalize border border-zinc-300 focus:ring-2 focus:ring-blue-600 rounded outline-none transition-all duration-200' />

                </div>

                {/* submit button */}
                <button className='w-full md:w-[45%] py-2 capitalize text-white font-semibold rounded bg-blue-600 hover:bg-blue-700 transition-all duration-200'>
                    Sign In
                </button>
            </div>

            {/* devider */}
            <div className='w-full md:w-[45%] h-[1.2px] bg-zinc-200'></div>

            <div className='flex gap-2 items-center'>
                <p>New to Dev Community?</p>
                <Link href={'/signup'}
                    className='text-blue-600 hover:underline'
                >
                    Create Account
                </Link>
            </div>

        </section>
    )
}

export default SignIn