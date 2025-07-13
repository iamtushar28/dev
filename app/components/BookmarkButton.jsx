'use client'
import { useSession } from 'next-auth/react';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa6';
import { useState, useEffect } from 'react';
import DefaultAlert from './DefaultAlert'; // Adjust path if needed

const BookmarkButton = ({ blogId }) => {
  const { data: session } = useSession();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const checkBookmark = async () => {
      if (!session) return;
      try {
        const res = await fetch(`/api/bookmarks?blogId=${blogId}`);
        const data = await res.json();
        if (data.bookmarked) {
          setIsBookmarked(true);
        }
      } catch (err) {
        console.error('Error checking bookmark:', err);
      }
    };
    checkBookmark();
  }, [session, blogId]);

  const handleToggleBookmark = async () => {
    if (!session) {
      setAlertMessage('Please login to bookmark blogs');
      return;
    }

    const method = isBookmarked ? 'DELETE' : 'POST';

    try {
      const res = await fetch('/api/bookmarks', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blogId }),
      });

      if (!res.ok) throw new Error('Failed to toggle bookmark');

      // Update state immediately
      setIsBookmarked((prev) => !prev);

    } catch (err) {
      setAlertMessage('Something went wrong.');
    }
  };

  return (
    <>
      <button
        onClick={handleToggleBookmark}
        className={`p-2 text-xl ${isBookmarked ? 'text-blue-600' : 'text-zinc-500'}`}
        title={isBookmarked ? 'Remove Bookmark' : 'Bookmark this blog'}
      >
        {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
      </button>

      {alertMessage && (
        <DefaultAlert
          message={alertMessage}
          onClose={() => setAlertMessage('')}
        />
      )}
    </>
  );
};

export default BookmarkButton;
