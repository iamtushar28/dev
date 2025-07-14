'use client';

import { useSession } from 'next-auth/react';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa6';
import { useState, useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import { GET_BOOKMARKED_BLOGS } from '@/graphql/queries/GetBookmarkedBlogs';
import DefaultAlert from './DefaultAlert';

const BookmarkButton = ({ blogId, initiallyBookmarked }) => {
  const { data: session } = useSession();
  const [isBookmarked, setIsBookmarked] = useState(initiallyBookmarked);
  const [alertMessage, setAlertMessage] = useState('');
  const client = useApolloClient();

  useEffect(() => {
    setIsBookmarked(initiallyBookmarked);
  }, [initiallyBookmarked]);

  const handleToggleBookmark = async () => {
    if (!session) {
      setAlertMessage('Please login to bookmark blogs');
      return;
    }

    const optimisticState = !isBookmarked;
    setIsBookmarked(optimisticState);

    try {
      const method = optimisticState ? 'POST' : 'DELETE';

      const res = await fetch('/api/bookmarks', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blogId }),
      });

      if (!res.ok) throw new Error('Failed to toggle bookmark');

      // ✅ Update local bookmark icon state on the blog card
      client.cache.modify({
        id: client.cache.identify({ __typename: 'Blog', _id: blogId }),
        fields: {
          bookmarked() {
            return optimisticState;
          },
        },
      });

      // ✅ Refetch the reading list (will add/remove the blog automatically)
      await client.refetchQueries({
        include: ['GetBookmarkedBlogs', 'GetUserBlogs'],
      });

      client.query({
        query: GET_BOOKMARKED_BLOGS,
        fetchPolicy: 'network-only',
      });


    } catch (err) {
      console.error('Bookmark toggle failed:', err);
      setIsBookmarked((prev) => !prev); // revert
      setAlertMessage('Something went wrong.');
    }
  };

  return (
    <>
      <button
        onClick={handleToggleBookmark}
        className={`p-2 text-xl transition-colors duration-200 ${isBookmarked ? 'text-blue-600' : 'text-zinc-500'
          }`}
        title={isBookmarked ? 'Remove Bookmark' : 'Bookmark this blog'}
      >
        {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
      </button>

      {alertMessage && (
        <DefaultAlert message={alertMessage} onClose={() => setAlertMessage('')} />
      )}
    </>
  );
};

export default BookmarkButton;
