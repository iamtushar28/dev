'use client';
import { useApolloClient } from "@apollo/client";
import { GET_BLOG_BY_ID } from "@/graphql/queries/getBlogById";
import { GET_BLOGS } from "@/graphql/queries/getBlogs";
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import DefaultAlert from '../../components/DefaultAlert';

const AddComment = ({ blog }) => {
  const client = useApolloClient();
  const { data: session } = useSession();

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [alertMessage, setAlertMessage] = useState('');

  const onSubmit = async (data) => {
    if (!session) return;

    try {
      const newComment = {
        user_id: session.user.id,
        blog_id: blog._id,
        comment: data.comment,
        createdAt: new Date().toISOString(),
      };

      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error('Failed to submit comment');

      // ✅ Clear form
      reset();

      // ✅ Refetch cached queries
      await client.refetchQueries({
        include: ['GetBlogComments', 'getBlogById', 'getBlogs'], // Must match operation names
      });

      // ✅ Force network fetch to ensure fresh data (including updated commentCount)
      await Promise.all([
        client.query({
          query: GET_BLOG_BY_ID,
          variables: { id: blog._id },
          fetchPolicy: 'network-only',
        }),
        client.query({
          query: GET_BLOGS,
          fetchPolicy: 'network-only',
        }),
      ]);


      // setAlertMessage('Comment added successfully! ✅');
    } catch (error) {
      console.error('Error adding comment:', error);
      setAlertMessage('Failed to submit comment. Please try again.');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
        {session && (
          <>
            <input type="hidden" {...register('user_id')} value={session.user.id} readOnly />
            <input type="hidden" {...register('blog_id')} value={blog._id} readOnly />
          </>
        )}

        <textarea
          {...register('comment', { required: 'Comment cannot be empty' })}
          className="w-full h-16 p-3 border rounded hover:ring-2 hover:ring-blue-600 outline-none transition-all duration-300"
          placeholder="Write a comment..."
        ></textarea>

        {errors.comment && (
          <p className="text-red-500">{errors.comment.message}</p>
        )}

        {session && (
          <div className="w-full flex justify-end mt-2">
            <button
              type="submit"
              className="bg-blue-600 px-3 py-2 text-white font-semibold rounded"
            >
              Add Comment
            </button>
          </div>
        )}
      </form>

      {alertMessage && (
        <DefaultAlert
          message={alertMessage}
          onClose={() => setAlertMessage('')}
        />
      )}
    </>
  );
};

export default AddComment;
