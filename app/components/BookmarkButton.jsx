'use client';

import { useSession } from 'next-auth/react';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa6';
import { useState, useEffect } from 'react';

const BookmarkButton = ({ blogId }) => {
  const { data: session } = useSession();
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Check on mount if this blog is already bookmarked
  useEffect(() => {
    const checkBookmark = async () => {
      if (!session) return;

      const res = await fetch(`/api/bookmarks?blogId=${blogId}`);
      const data = await res.json();

      if (data.bookmarked) {
        setIsBookmarked(true);
      }
    };

    checkBookmark();
  }, [session, blogId]);

  const handleToggleBookmark = async () => {
    if (!session) {
      alert('Please login to bookmark blogs');
      return;
    }

    const method = isBookmarked ? 'DELETE' : 'POST';

    const res = await fetch('/api/bookmarks', {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ blogId }),
    });

    if (res.ok) {
      setIsBookmarked(!isBookmarked);
    } else {
      const data = await res.json();
      console.error(data.error || 'Error toggling bookmark');
    }
  };

  return (
    <button
      onClick={handleToggleBookmark}
      className={`p-2 text-xl ${isBookmarked ? 'text-blue-600' : 'text-zinc-500'}`}
      title={isBookmarked ? 'Remove Bookmark' : 'Bookmark this blog'}
    >
      {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
    </button>
  );
};

export default BookmarkButton;
