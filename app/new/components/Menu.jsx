import React from 'react'

import { BiBold, BiItalic, BiLink, BiListOl, BiListUl, BiCode, BiCodeBlock, BiImage, BiUnderline, BiStrikethrough } from "react-icons/bi"; // icons
import { BsTypeH1, BsTypeH2, BsTypeH3 } from "react-icons/bs"; //headings icons

const Menu = () => {
    return (
        <section className='h-fit p-2 border rounded flex gap-4 flex-wrap justify-center md:justify-around items-center border-zinc-100'>

            {/* bold button */}
            <button className='h-8 w-8 hover:bg-blue-100 hover:text-blue-600 text-2xl flex justify-center items-center rounded'>
                <BiBold />
            </button>

            {/* italic button */}
            <button className='h-8 w-8 hover:bg-blue-100 hover:text-blue-600 text-2xl flex justify-center items-center rounded'>
                <BiItalic />
            </button>

            {/* link button */}
            <button className='h-8 w-8 hover:bg-blue-100 hover:text-blue-600 text-2xl flex justify-center items-center rounded'>
                <BiLink />
            </button>

            {/* ordered list button */}
            <button className='h-8 w-8 hover:bg-blue-100 hover:text-blue-600 text-2xl flex justify-center items-center rounded'>
                <BiListOl />
            </button>

            {/* unordered list button */}
            <button className='h-8 w-8 hover:bg-blue-100 hover:text-blue-600 text-2xl flex justify-center items-center rounded'>
                <BiListUl />
            </button>

            {/* h-1 button */}
            <button className='h-8 w-8 hover:bg-blue-100 hover:text-blue-600 text-2xl flex justify-center items-center rounded'>
                <BsTypeH1 />
            </button>

            {/* h-2 button */}
            <button className='h-8 w-8 hover:bg-blue-100 hover:text-blue-600 text-2xl flex justify-center items-center rounded'>
                <BsTypeH2 />
            </button>

            {/* h-3 button */}
            <button className='h-8 w-8 hover:bg-blue-100 hover:text-blue-600 text-2xl flex justify-center items-center rounded'>
                <BsTypeH3 />
            </button>

            {/* underline button */}
            <button className='h-8 w-8 hover:bg-blue-100 hover:text-blue-600 text-2xl flex justify-center items-center rounded'>
                <BiUnderline />
            </button>

            {/* Strikethrough button */}
            <button className='h-8 w-8 hover:bg-blue-100 hover:text-blue-600 text-2xl flex justify-center items-center rounded'>
                <BiStrikethrough />
            </button>

            {/* code button */}
            <button className='h-8 w-8 hover:bg-blue-100 hover:text-blue-600 text-2xl flex justify-center items-center rounded'>
                <BiCode />
            </button>

            {/* code block button */}
            <button className='h-8 w-8 hover:bg-blue-100 hover:text-blue-600 text-2xl flex justify-center items-center rounded'>
                <BiCodeBlock />
            </button>

            {/* image button */}
            <button className='h-8 w-8 hover:bg-blue-100 hover:text-blue-600 text-2xl flex justify-center items-center rounded'>
                <BiImage />
            </button>

        </section>
    )
}

export default Menu