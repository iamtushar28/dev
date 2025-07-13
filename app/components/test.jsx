import React from 'react'
import Link from 'next/link'

const DeleteAlert = ({ message, onClose, onConfirm }) => {
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 z-[60] h-screen w-full px-2 flex justify-center items-center bg-black bg-opacity-75'>
      <div className='w-full md:w-[36rem] h-fit py-8 bg-white rounded flex gap-6 flex-col justify-center items-center'>
        <Link
          href={'/'}
          className='bg-black hidden text-white text-xl h-fit px-2 py-1 font-bold uppercase rounded'>
          Dev
        </Link>

        <p className='font-semibold text-center px-4'>{message}</p>

        <div className='flex gap-12 items-center'>
          <button
            className='px-4 py-2 text-white font-semibold bg-red-500 hover:bg-red-600 rounded'
            onClick={onConfirm}>
            Delete
          </button>
          <button
            className='px-4 py-2 text-black font-semibold border border-black hover:bg-zinc-100 rounded'
            onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAlert;
