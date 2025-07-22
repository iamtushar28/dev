'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '@/graphql/mutations/addComment';
import { GET_BLOG_BY_SLUG } from '@/graphql/queries/BlogBySlug';
import DefaultAlert from '../../components/DefaultAlert';

const AddComment = ({ blog, session }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [alertMessage, setAlertMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const [addComment] = useMutation(ADD_COMMENT, {
    update(cache, { data: { addComment } }) {
      const existing = cache.readQuery({
        query: GET_BLOG_BY_SLUG,
        variables: { slug: blog.slug },
      });

      if (!existing?.blogBySlug) return;

      cache.writeQuery({
        query: GET_BLOG_BY_SLUG,
        variables: { slug: blog.slug },
        data: {
          blogBySlug: {
            ...existing.blogBySlug,
            comments: [addComment, ...(existing.blogBySlug.comments || [])],
            commentsCount: (existing.blogBySlug.commentsCount || 0) + 1,
          },
        },
      });
    },
    onCompleted: () => {
      setIsUploading(false);
      reset();
    },
    onError: (error) => {
      console.error('Add comment failed:', error);
      setIsUploading(false);
      setAlertMessage('Failed to submit comment. Please try again.');
    },
  });

  const onSubmit = (data) => {
    if (!session) return;

    setIsUploading(true);

    addComment({
      variables: {
        blogId: blog._id,
        userId: session.user.id,
        comment: data.comment,
      },
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
        <div className="flex gap-2 w-full">
          {session && (
            <img
              src={session.user.image}
              alt="User image"
              className="h-8 w-8 rounded-full object-cover"
            />
          )}
          <textarea
            {...register('comment', { required: 'Comment required!' })}
            className="w-full h-16 p-3 border rounded hover:ring-2 hover:ring-blue-600 outline-none transition-all duration-300"
            placeholder="Write a comment..."
          />
        </div>

        {errors.comment && (
          <p className="text-red-500 text-sm">{errors.comment.message}</p>
        )}

        {session && (
          <div className="w-full flex justify-end mt-2">
            <button
              type="submit"
              className={`px-3 py-2 text-white font-semibold rounded ${isUploading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
              }`}
              disabled={isUploading}
            >
              {isUploading ? 'Adding...' : 'Add Comment'}
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
