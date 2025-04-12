"use client";
import React from "react";
import { mutate } from "swr";

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
            className="w-full flex items-start font-semibold text-red-500 cursor-pointer hover:bg-gray-100 p-2 rounded"
        >
            Delete 🗑️
        </button>
    );
};

export default DeleteComment;
