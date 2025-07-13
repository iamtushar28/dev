import React from 'react';

const DeleteAlert = ({ title, message, onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 z-50 px-2 bg-black/5 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg text-start max-w-md w-full">

        <p className="text-lg text-gray-800 mb-4 font-semibold">{title}</p>
        <p className="text-base text-gray-800 mb-4">{message}</p>

        <div className="flex justify-end gap-4">

          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-gray-800 rounded-3xl border border-zinc-300 hover:bg-zinc-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-semibold text-white rounded-3xl bg-red-500 hover:bg-red-600 transition"
          >
            Delete
          </button>

        </div>
      </div>
    </div>
  );
};

export default DeleteAlert;
