'use client'

import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { toggleMobileSidebar } from '../redux-store/sidebarSlice'

import { IoSettingsOutline } from "react-icons/io5"; //setting icon
import { FiSearch } from "react-icons/fi";//search
import { MdMenu } from "react-icons/md"; //menu
import { RiNotification2Line } from "react-icons/ri";//notification icon
import { FaRegUser } from "react-icons/fa"; //user icon
import { TbLogout2, TbWritingSign } from "react-icons/tb"; //logout, writing icon
import { LuClipboardList, LuLayoutDashboard } from "react-icons/lu"; //list, dashboard icon

const Navbar = () => {

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


    return (
        <nav className='z-50 w-full h-16 px-2 md:px-6 bg-white shadow-sm flex justify-between items-center fixed top-0 right-0 left-0'>

            {/* section 1 - logo, searchbar */}
            <section className='flex items-center gap-4 w-[60%]'>

                {/* toogle sidebr button */}
                <button onClick={() => dispatch(toggleMobileSidebar())} className='text-2xl block md:hidden'>
                    <MdMenu />
                </button>

                {/* brand logo */}
                <button className='bg-black text-white h-fit px-2 py-1 font-bold uppercase rounded'>
                    Dev
                </button>

                {/* searchbar - hidden at mobile screen */}
                <div className='hidden md:flex h-10 w-9/12 rounded border border-gray-300 hover:border-blue-500 hover:ring-2 hover:ring-blue-500 justify-center items-center relative transition-all duration-200'>

                    {/* search icon */}
                    <button className='h-10 w-10 text-xl font-semibold flex justify-center items-center'>
                        <FiSearch />
                    </button>

                    {/* search box */}
                    <input type="text" placeholder='search...' className='h-10 w-full outline-none bg-transparent' />

                </div>

            </section>

            {/* section 2 - login, create post, user, notifiction */}
            <section className='flex gap-1 md:gap-4 items-center'>

                {/* search button - hidden at desktop */}
                <button className='md:hidden h-10 w-10 text-2xl hover:bg-blue-50 rounded-full transition-all duration-200 flex justify-center items-center'>
                    <FiSearch />
                </button>

                {/* create post button - hidden at mobile */}
                <div className='hidden md:block'>
                    <button className='p-2 capitalize border border-blue-500 text-blue-500 font-semibold rounded hover:bg-blue-500 hover:text-white transition-all duration-200 flex gap-1 items-center'>
                        <TbWritingSign className='text-xl' />
                        create post
                    </button>
                </div>

                {/* notifiction button */}
                <div className='relative'>
                    <button className='h-10 w-10 text-2xl hover:bg-blue-50 rounded-full transition-all duration-200 flex justify-center items-center'>
                        <RiNotification2Line />
                    </button>

                    {/* notifiction count */}
                    <div className='h-5 w-5 rounded-full text-xs text-white bg-red-500 flex justify-center items-center absolute top-0 right-0'>
                        2
                    </div>

                </div>

                {/* user button */}
                <button ref={buttonRef} onClick={toggleProfileMenu} className='h-10 w-10 text-xl hover:bg-blue-50 rounded-full transition-all duration-200 flex justify-center items-center'>
                    <FaRegUser />
                </button>

            </section>


            {/* section 3 - user modal (name, dashboard, settings, logout, reading list) */}
            {openProfileMenu && (
                <section ref={wrapperRef} className='md:w-[17rem] h-fit p-4 bg-white rounded absolute top-[5rem] left-2 right-2 md:top-14 md:right-6 md:left-auto flex gap-2 flex-col justify-center items-start shadow z-50'>

                    {/* user name */}
                    <button className='w-full px-4 py-2 text-zinc-500 hover:text-blue-500 hover:bg-blue-50 capitalize text-start rounded'>
                        <h2 className='font-semibold capitalize'>Tushar Suryawanshi</h2>
                        <h4 className=''>@iamtushar28</h4>
                    </button>

                    {/* devide line */}
                    <div className='h-[0.5px] w-full bg-zinc-200'></div>

                    {/* links - dashboard, settings, logout, reading list*/}
                    <div className='w-full'>

                        {/* dashboard link */}
                        <button className='w-full px-4 py-2 text-zinc-500 hover:text-blue-500 hover:bg-blue-50 capitalize text-start rounded flex items-center gap-2 hover:scale-95 transition-all duration-200'>
                            <LuLayoutDashboard className='text-lg' />
                            dashboard
                        </button>

                        {/* create post link */}
                        <button className='w-full px-4 py-2 text-zinc-500 hover:text-blue-500 hover:bg-blue-50 capitalize text-start rounded flex items-center gap-2 hover:scale-95 transition-all duration-200'>
                            <TbWritingSign className='text-lg' />
                            create post
                        </button>

                        {/* reading list link */}
                        <button className='w-full px-4 py-2 text-zinc-500 hover:text-blue-500 hover:bg-blue-50 capitalize text-start rounded flex items-center gap-2 hover:scale-95 transition-all duration-200'>
                            <LuClipboardList className='text-lg' />
                            reading list
                        </button>

                        {/* settings link */}
                        <button className='w-full px-4 py-2 text-zinc-500 hover:text-blue-500 hover:bg-blue-50 capitalize text-start rounded flex items-center gap-2 hover:scale-95 transition-all duration-200'>
                            <IoSettingsOutline className='text-lg' />
                            settings
                        </button>

                        {/* devide line */}
                        <div className='h-[0.5px] w-full bg-zinc-200 mt-2 mb-2'></div>

                        {/* sign out link */}
                        <button className='w-full px-4 py-2 text-zinc-500 hover:text-blue-500 hover:bg-blue-50 capitalize text-start rounded flex items-center gap-2 hover:scale-95 transition-all duration-200'>
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