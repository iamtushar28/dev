import React from 'react';

/**
 * DeleteAlert Modal Component
 *
 * Props:
 * - title (string): Title of the alert
 * - message (string): Description or warning message
 * - onClose (function): Callback for cancel/close
 * - onConfirm (function): Callback for delete confirmation
 * - isDeleting (boolean): Indicates delete in progress
 */

const DeleteAlert = ({ title, message, onClose, onConfirm, isDeleting }) => {
  return (
    <div
      className="fixed inset-0 z-50 px-2 bg-black/5 backdrop-blur-sm flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white p-6 rounded-xl shadow-lg text-start max-w-md w-full">

        {/* Title */}
        <p className="text-lg text-gray-800 mb-4 font-semibold">{title}</p>

        {/* Message */}
        <p className="text-base text-gray-800 mb-4">{message}</p>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">

          {/* Cancel */}
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2 text-sm font-semibold text-gray-800 rounded-3xl border border-zinc-300 hover:bg-zinc-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>

          {/* Confirm/Delete */}
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-4 py-2 text-sm font-semibold text-white rounded-3xl bg-red-500 hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>

        </div>

      </div>
    </div>
  );
};

export default DeleteAlert;
