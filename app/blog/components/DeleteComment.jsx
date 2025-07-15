"use client";
import React from "react";
import { useApolloClient } from "@apollo/client";
import { GET_BLOG_BY_ID } from "@/graphql/queries/getBlogById";
import { GET_BLOGS } from "@/graphql/queries/getBlogs";
import { RiDeleteBin6Line } from "react-icons/ri"; //delet icon

const DeleteComment = ({ commentId, blog, blogId }) => {
    const client = useApolloClient();
    const deleteComment = async () => {
        try {
            const res = await fetch(`/api/comments?comment_id=${commentId}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Failed to delete comment");

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

        } catch (err) {
            console.error("Error deleting comment:", err);
        }
    };

    return (
        <button
            onClick={deleteComment}
            className='w-full px-4 py-2 text-zinc-800 font-semibold hover:text-blue-500 hover:bg-blue-50 capitalize text-start rounded flex items-center gap-2 transition-all duration-200'
        >
            <RiDeleteBin6Line />
            Delete
        </button>
    );
};

export default DeleteComment;
