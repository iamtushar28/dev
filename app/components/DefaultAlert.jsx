import React from 'react';
import Link from 'next/link';

const DefaultAlert = ({ message, onClose }) => {
  return (
    <div className='fixed inset-0 z-50 px-2 bg-black/5 backdrop-blur-sm flex items-center justify-center'>
      <div className='bg-white p-6 rounded-xl shadow-lg text-start max-w-md w-full'>
        {/* brand logo */}
        <Link
          href={'/'}
          className='bg-black text-white text-base h-fit p-2 font-bold uppercase rounded'>
          Dev
        </Link>

        <p className='text-base mt-6 mb-4'>{message}</p>

        <div className="flex justify-end">
          <button
            className="px-4 py-2 text-sm font-semibold rounded-3xl text-white bg-green-500 hover:bg-green-600 transition"
            onClick={onClose}>
            Continue
          </button>
        </div>

      </div>
    </div>
  );
};

export default DefaultAlert;
