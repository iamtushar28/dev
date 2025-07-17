'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useApolloClient } from '@apollo/client';
import { ADD_COMMENT } from '@/graphql/mutations/addComment';
import { GET_BLOG_BY_ID } from '@/graphql/queries/getBlogById';
import DefaultAlert from '../../components/DefaultAlert';

const AddComment = ({ blog, session }) => {
  const client = useApolloClient();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [alertMessage, setAlertMessage] = useState(''); //handling alert message state
  const [isUploading, setIsUploading] = useState(false); //handling add comment status

  const [addComment] = useMutation(ADD_COMMENT, {
    update(cache, { data: { addComment } }) {

      setIsUploading(true); //porcessing comment
      const blogId = blog._id;

      const existing = cache.readQuery({
        query: GET_BLOG_BY_ID,
        variables: { id: blogId },
      });

      if (existing?.blog) {
        cache.writeQuery({
          query: GET_BLOG_BY_ID,
          variables: { id: blogId },
          data: {
            blog: {
              ...existing.blog,
              comments: [addComment, ...(existing.blog.comments || [])],
              commentsCount: (existing.blog.commentsCount || 0) + 1,
            },
          },
        });
      }

      setIsUploading(false);
    },
    onCompleted: () => reset(),
    onError: (error) => {
      console.error('Add comment failed:', error);
      setAlertMessage('Failed to submit comment. Please try again.');
    },
  });

  const onSubmit = (data) => {
    if (!session) return;

    setIsUploading(true); // ✅ Start loading before mutation fires

    addComment({
      variables: {
        blogId: blog._id,
        userId: session.user.id,
        comment: data.comment,
      },
    }).finally(() => {
      setIsUploading(false); // ✅ Ensure loading ends
    });

  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
        <div className='flex gap-2 w-full'>
          {session && (<img
            src={session.user.image}
            alt="User image"
            className="h-8 w-8 rounded-full object-cover"
          />
          )}
          <textarea
            {...register('comment', { required: 'Comment required!' })}
            className="w-full h-16 p-3 border rounded hover:ring-2 hover:ring-blue-600 outline-none transition-all duration-300"
            placeholder="Write a comment..."
          ></textarea>
        </div>

        {errors.comment && (
          <p className="text-red-500 text-sm">{errors.comment.message}</p>
        )}

        {session && (
          <div className="w-full flex justify-end mt-2">
            <button
              type="submit"
              className={`px-3 py-2 text-white font-semibold rounded ${isUploading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
            >
              {isUploading ? "Adding..." : "Add Comment"}
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
