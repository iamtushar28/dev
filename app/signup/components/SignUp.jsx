"use client";
import React from "react";
import { signIn } from "next-auth/react";
import Link from 'next/link'
import { FcGoogle } from "react-icons/fc"; //google icon
import { BsGithub } from "react-icons/bs"; //git hub icon
import { FaSquareFacebook } from "react-icons/fa6"; //facebook icon

const SignUp = () => {
    
  return (
    <section className='mt-16 w-full min-h-screen max-h-fit bg-white py-8 px-3 md:px-0 md:py-12 flex gap-4 md:gap-6 flex-col justify-center items-center'>

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
    className='h-12 w-full md:w-[45%] border rounded hover:bg-zinc-50 text-center text-sm font-semibold relative'>
        Continue with Google
        <FcGoogle className='absolute top-3 left-4 text-2xl' />
    </button>

    {/* github */}
    <button 
    onClick={() => signIn("github", { callbackUrl: "/" })}
    className='h-12 w-full md:w-[45%] border rounded hover:bg-zinc-50 text-center text-sm font-semibold relative'>
        Continue with Github
        <BsGithub className='absolute top-3 left-4 text-2xl' />
    </button>

    {/* facebook */}
    <button className='h-12 w-full md:w-[45%] border rounded hover:bg-zinc-50 text-center text-sm font-semibold relative'>
        Continue with Facebook
        <FaSquareFacebook className='absolute top-3 left-4 text-2xl text-blue-600' />
    </button>

    <p className='text-center text-sm text-zinc-400 italic'>By signing up, you are agreeing to our <span className='text-blue-500'>privacy policy</span>, <span className='text-blue-500'>terms of use</span> and <span className='text-blue-500'>code of conduct.</span></p>

    {/* devider */}
    <div className='w-full md:w-[45%] h-[1.2px] bg-zinc-200'></div>

    <div className='flex gap-2 items-center'>
        <p>Already have an acoount?</p>
        <Link href={'/signin'} 
        className='text-blue-600 hover:underline'
        >
        Log In
        </Link>
    </div>

</section>
  )
}

export default SignUp