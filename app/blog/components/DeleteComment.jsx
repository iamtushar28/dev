// components/DeleteComment.js
'use client';

import { useMutation } from '@apollo/client';
import { DELETE_COMMENT } from '@/graphql/mutations/deleteComment';
import { GET_BLOG_BY_ID } from '@/graphql/queries/getBlogById';
import { RiDeleteBin6Line } from "react-icons/ri";

const DeleteComment = ({ commentId, blogId }) => {
    const [deleteComment, { loading }] = useMutation(DELETE_COMMENT, {
        update(cache, { data: { deleteComment } }) {
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
                            comments: existing.blog.comments.filter(
                                (comment) => comment._id !== deleteComment._id
                            ),
                            commentsCount: Math.max((existing.blog.commentsCount || 1) - 1, 0),
                        },
                    },
                });
            }
        },
        onError: (err) => {
            console.error('Delete failed:', err.message);
        },
    });

    const handleDelete = () => {
        deleteComment({ variables: { commentId, blogId } });
    };

    return (
        <button
            onClick={handleDelete}
            disabled={loading}
            className="w-full px-4 py-2 text-red-600 font-semibold hover:text-white hover:bg-red-500 capitalize text-start rounded flex items-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >

            <RiDeleteBin6Line />
            {loading ? "Deleting..." : "Delete"}

        </button>
    );
};

export default DeleteComment;
