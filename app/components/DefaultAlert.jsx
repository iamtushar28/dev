import React from 'react';
import Link from 'next/link';

/**
 * DefaultAlert Component
 * Displays a centered modal with a message and a continue button.
 * Used for general-purpose alerts (e.g., login required, errors).
 */

const DefaultAlert = ({ message, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 px-2 bg-black/10 backdrop-blur-sm flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">

        {/* App/Brand Badge */}
        <Link
          href="/"
          className="inline-block bg-black text-white text-sm px-3 py-1 font-bold uppercase rounded"
        >
          Dev
        </Link>

        {/* Alert Message */}
        <p className="text-base text-gray-800 mt-6 mb-4">{message}</p>

        {/* Continue Button */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 rounded-3xl transition"
          >
            Continue
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default DefaultAlert;
