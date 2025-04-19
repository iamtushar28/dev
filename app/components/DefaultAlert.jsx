import React from 'react';
import Link from 'next/link';

const DefaultAlert = ({ message, onClose }) => {
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 z-50 h-screen w-full px-2 flex justify-center items-center bg-black bg-opacity-75'>
      <div className='w-full md:w-[36rem] h-fit py-8 bg-white rounded flex gap-4 flex-col justify-center items-center'>
        {/* brand logo */}
        <Link
          href={'/'}
          className='bg-black hidden text-white text-xl h-fit px-2 py-1 font-bold uppercase rounded'>
          Dev
        </Link>

        <p className='text-lg font-semibold text-center px-4'>{message}</p>

        <button
          className='px-4 py-2 text-white font-semibold bg-black rounded'
          onClick={onClose}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default DefaultAlert;
