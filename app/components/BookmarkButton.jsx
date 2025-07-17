'use client';

import { useSession } from 'next-auth/react';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa6';
import { useState, useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import { GET_BOOKMARKED_BLOGS } from '@/graphql/queries/GetBookmarkedBlogs';
import DefaultAlert from './DefaultAlert';

/**
 * BookmarkButton Component
 * Allows logged-in users to bookmark or unbookmark a blog post.
 * Provides optimistic UI updates and synchronizes Apollo cache.
 */

const BookmarkButton = ({ blogId, initiallyBookmarked }) => {
  const { data: session } = useSession();
  const [isBookmarked, setIsBookmarked] = useState(initiallyBookmarked);
  const [alertMessage, setAlertMessage] = useState('');
  const client = useApolloClient();

  // Sync local state with prop changes (e.g., after re-render or refetch)
  useEffect(() => {
    setIsBookmarked(initiallyBookmarked);
  }, [initiallyBookmarked]);

  // Toggle bookmark status
  const handleToggleBookmark = async () => {
    if (!session) {
      setAlertMessage('Please login to bookmark blogs');
      return;
    }

    const optimisticState = !isBookmarked;
    setIsBookmarked(optimisticState); // Optimistic UI update

    try {
      // Determine method based on desired state
      const method = optimisticState ? 'POST' : 'DELETE';

      // Send request to API route
      const res = await fetch('/api/bookmarks', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blogId }),
      });

      if (!res.ok) throw new Error('Failed to toggle bookmark');

      // ✅ Update Apollo cache manually for this blog
      client.cache.modify({
        id: client.cache.identify({ __typename: 'Blog', _id: blogId }),
        fields: {
          bookmarked() {
            return optimisticState;
          },
        },
      });

      // ✅ Refetch bookmark and user blog lists
      await client.refetchQueries({
        include: ['GetBookmarkedBlogs', 'GetUserBlogs'],
      });

      // Optional: force re-fetch to ensure fresh data
      client.query({
        query: GET_BOOKMARKED_BLOGS,
        fetchPolicy: 'network-only',
      });

    } catch (err) {
      console.error('Bookmark toggle failed:', err);
      setIsBookmarked((prev) => !prev); // Revert optimistic update
      setAlertMessage('Something went wrong.');
    }
  };

  return (
    <>
      <button
        onClick={handleToggleBookmark}
        className={`p-2 text-xl transition-colors duration-200 ${
          isBookmarked ? 'text-blue-600' : 'text-zinc-500'
        }`}
        title={isBookmarked ? 'Remove Bookmark' : 'Bookmark this blog'}
      >
        {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
      </button>

      {/* Alert for login or error messages */}
      {alertMessage && (
        <DefaultAlert message={alertMessage} onClose={() => setAlertMessage('')} />
      )}
    </>
  );
};

export default BookmarkButton;
