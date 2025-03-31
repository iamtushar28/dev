'use client'
import React, { useEffect, useState } from 'react';

const CommentsCount = ({ blogId }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!blogId) return;

    const fetchCommentsCount = async () => {
      try {
        const res = await fetch(`/api/comments/count?blog_id=${blogId}`);
        const data = await res.json();

        if (res.ok) {
          setCount(data.count);
        } else {
          console.error("Error fetching count:", data.error);
        }
      } catch (error) {
        console.error("Failed to fetch comments count:", error);
      }
    };

    fetchCommentsCount();
  }, [blogId]);

  return <div>{count}</div>;
};

export default CommentsCount;
