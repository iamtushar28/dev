'use client'
import { useSession, signIn, signOut } from "next-auth/react";
import React from 'react'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link';
import Image from "next/image";
import { useDispatch } from 'react-redux';
import { toggleMobileSidebar } from '../redux-store/sidebarSlice'

import { IoSettingsOutline } from "react-icons/io5"; //setting icon
import { FiSearch } from "react-icons/fi";//search
import { MdMenu } from "react-icons/md"; //menu
import { RiNotification2Line } from "react-icons/ri";//notification icon
import { TbLogout2, TbWritingSign } from "react-icons/tb"; //logout, writing icon
import { LuClipboardList, LuLayoutDashboard } from "react-icons/lu"; //list, dashboard icon
import { RxCross2 } from "react-icons/rx"; //cross icon

const Navbar = () => {

    const { data: session } = useSession();

    // for opening and closing profile menu
    const dispatch = useDispatch();
    const [openProfileMenu, setOpenProfileMenu] = useState(false);
    const wrapperRef = useRef(null);
    const buttonRef = useRef(null);

    const toggleProfileMenu = () => {
        setOpenProfileMenu((prev) => !prev);
    };

    // Hide profile menu when clicked outside
    const handleClickOutside = (event) => {
        if (
            openProfileMenu && // Only check if menu is already open
            wrapperRef.current &&
            !wrapperRef.current.contains(event.target) &&
            buttonRef.current &&
            !buttonRef.current.contains(event.target) // Ensure click is not on the button
        ) {
            setOpenProfileMenu(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openProfileMenu]); // Depend on `openProfileMenu` to correctly track its state

    // for getting search result
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [showBox, setShowBox] = useState(false);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (query.trim()) {
                fetch(`/api/blog/search?title=${query}`)
                    .then(res => res.json())
                    .then(data => {
                        setResults(data);
                        setShowBox(true);
                    });
            } else {
                setResults([]);
                setShowBox(false);
            }
        }, 600); // debounce delay

        return () => clearTimeout(delayDebounce);
    }, [query]);


    return (
        <nav className='z-50 w-full h-16 px-2 md:px-6 bg-white shadow-sm flex justify-between items-center fixed top-0 right-0 left-0'>

            {/* section 1 - logo, searchbar */}
            <section className='flex items-center gap-4 w-[60%]'>

                {/* toogle sidebr button */}
                <button onClick={() => dispatch(toggleMobileSidebar())} className='text-2xl block md:hidden'>
                    <MdMenu />
                </button>

                {/* brand logo */}
                <Link
                    href={'/'}
                    className='bg-black text-white h-fit px-2 py-1 font-bold uppercase rounded'>
                    Dev
                </Link>

                {/* searchbar - hidden at mobile screen */}
                <div className='hidden md:flex h-10 w-[40rem] rounded border border-gray-300 hover:border-blue-500 hover:ring-2 hover:ring-blue-500 justify-center items-center relative transition-all duration-200'>

                    {/* search icon */}
                    <button className='h-10 w-10 text-xl font-semibold flex justify-center items-center'>
                        <FiSearch />
                    </button>

                    {/* search box */}
                    <input
                        type="text"
                        placeholder='search...'
                        className='h-10 w-full outline-none bg-transparent'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />

                    {query && (
                        <button
                            className='h-10 w-10 text-xl font-semibold flex justify-center items-center'
                            onClick={() => setQuery('')}
                        >
                            <RxCross2 />
                        </button>
                    )}

                </div>

                {/* search suggestion box */}
                {showBox && results.length > 0 && (
                    <div className="absolute top-14 left-[5.5rem] w-[40rem] max-h-[30rem] rounded bg-white shadow-sm border border-gray-300 overflow-y-auto">

                        {/* searched blog */}
                        {results.map((blog) => (
                            <div
                                key={blog._id}
                                className="p-4 hover:bg-blue-50 cursor-pointer"
                            >
                                <Link
                                    // redirect to blog detail if needed
                                    href={`/blog/${blog._id}`}>

                                    <h4 className="capitalize text-sm text-zinc-600">{blog.creatorName}</h4>
                                    <h2 className="text-lg font-semibold">{blog.title}</h2>
                                    <h6 className="text-sm text-zinc-600">
                                        {new Date(blog.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </h6>
                                </Link>
                            </div>
                        ))}

                    </div>
                )}

            </section>

            {/* section 2 - login, create post, user, notifiction */}
            <section className='flex gap-1 md:gap-4 items-center'>

                {/* search button - hidden at desktop */}
                <Link
                    href={'/search'}
                    title="search"
                    className='md:hidden h-10 w-10 text-2xl hover:bg-blue-50 rounded-full transition-all duration-200 flex justify-center items-center'>
                    <FiSearch />
                </Link>


                {session ? (
                    <>
                        {/* create post button - hidden at mobile */}
                        <div className='hidden md:block'>
                            <Link
                                href={'/new'}
                                className='p-2 capitalize border border-blue-500 text-blue-500 font-semibold rounded hover:bg-blue-500 hover:text-white transition-all duration-200 flex gap-1 items-center'>
                                <TbWritingSign className='text-xl' />
                                create post
                            </Link>
                        </div>

                        {/* Notification button */}
                        <div className="relative">
                            <Link
                                href={"/notifications"}
                                className="h-10 w-10 text-2xl hover:bg-blue-50 rounded-full transition-all duration-200 flex justify-center items-center"
                            >
                                <RiNotification2Line />
                            </Link>

                            {/* Notification count */}
                            <div className="h-5 w-5 rounded-full text-xs text-white bg-red-500 flex justify-center items-center absolute top-0 right-0">
                                2
                            </div>
                        </div>

                        {/* User button */}
                        <button ref={buttonRef} onClick={toggleProfileMenu} className="">
                            <Image
                                src={session.user.image}
                                alt="User image"
                                width={40}
                                height={40}
                                className="rounded-full"
                            />
                        </button>
                    </>
                ) : (
                    <>
                        <div className=''>
                            <Link
                                href={'/signin'}
                                name="login button"
                                className='p-2 capitalize border border-blue-500 text-blue-500 font-semibold rounded hover:bg-blue-500 hover:text-white transition-all duration-200 flex gap-1 items-center'>
                                Log In
                            </Link>
                        </div>
                    </>
                )}


            </section>

            {/* section 3 - user modal (name, dashboard, settings, logout, reading list) */}
            {openProfileMenu && (
                <section ref={wrapperRef} className='md:w-[17rem] h-fit p-4 bg-white rounded absolute top-[5rem] left-2 right-2 md:top-14 md:right-6 md:left-auto flex gap-2 flex-col justify-center items-start shadow z-50'>

                    {/* user name */}
                    <button
                        className='w-full px-4 py-2 text-black hover:text-blue-500 hover:bg-blue-50 capitalize text-start rounded'>
                        <h2 className='font-semibold capitalize'>{session.user.name}</h2>
                    </button>

                    {/* devide line */}
                    <div className='h-[0.5px] w-full bg-zinc-200'></div>

                    {/* links - dashboard, settings, logout, reading list*/}
                    <div className='w-full'>

                        {/* dashboard link */}
                        <Link
                            href={'/dashboard'}
                            className='w-full px-4 py-2 text-zinc-500 hover:text-blue-500 hover:bg-blue-50 capitalize text-start rounded flex items-center gap-2 hover:scale-95 transition-all duration-200'>
                            <LuLayoutDashboard className='text-lg' />
                            dashboard
                        </Link>

                        {/* create post link */}
                        <Link
                            href={'/new'}
                            className='w-full px-4 py-2 text-zinc-500 hover:text-blue-500 hover:bg-blue-50 capitalize text-start rounded flex items-center gap-2 hover:scale-95 transition-all duration-200'>
                            <TbWritingSign className='text-lg' />
                            create post
                        </Link>

                        {/* reading list link */}
                        <Link
                            href={'/readinglist'}
                            className='w-full px-4 py-2 text-zinc-500 hover:text-blue-500 hover:bg-blue-50 capitalize text-start rounded flex items-center gap-2 hover:scale-95 transition-all duration-200'>
                            <LuClipboardList className='text-lg' />
                            reading list
                        </Link>

                        {/* settings link */}
                        <Link
                            href={'/settings'}
                            className='w-full px-4 py-2 text-zinc-500 hover:text-blue-500 hover:bg-blue-50 capitalize text-start rounded flex items-center gap-2 hover:scale-95 transition-all duration-200'>
                            <IoSettingsOutline className='text-lg' />
                            settings
                        </Link>

                        {/* devide line */}
                        <div className='h-[0.5px] w-full bg-zinc-200 mt-2 mb-2'></div>

                        {/* sign out link */}
                        <button
                            onClick={() => signOut()}
                            className='w-full px-4 py-2 text-zinc-500 hover:text-blue-500 hover:bg-blue-50 capitalize text-start rounded flex items-center gap-2 hover:scale-95 transition-all duration-200'>
                            <TbLogout2 className='text-lg' />
                            sign out
                        </button>

                    </div>

                </section>
            )}

        </nav>
    )
}

export default Navbar