"use client";
import React from "react";
import { mutate } from "swr";
import { RiDeleteBin6Line } from "react-icons/ri"; //delet icon

const DeleteComment = ({ commentId, blogId }) => {
    const deleteComment = async () => {
        try {
            const res = await fetch(`/api/comments?comment_id=${commentId}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Failed to delete");

            // Correctly revalidate the comment list for this blog
            mutate(`/api/comments?blog_id=${blogId}`);
        } catch (err) {
            console.error("Error deleting comment:", err);
        }
    };

    return (
        <button
            onClick={deleteComment}
           className='w-full px-4 py-2 text-zinc-800 font-semibold hover:text-blue-500 hover:bg-blue-50 capitalize text-start rounded flex items-center gap-2 transition-all duration-200'
        >
            <RiDeleteBin6Line/>
            Delete
        </button>
    );
};

export default DeleteComment;
