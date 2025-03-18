"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

const AddComment = ({ blog }) => {
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
  
      if (!response.ok) throw new Error("Failed to submit comment");
      alert("Comment added successfully!");
      reset();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
      {/* Hidden fields for user_id & blog_id */}
      {session && (
        <>
          <input type="hidden" {...register("user_id")} value={session.user.id} readOnly />
          <input type="hidden" {...register("blog_id")} value={blog._id} readOnly />
        </>
      )}

      {/* Comment Input */}
      <textarea
        {...register("comment", { required: "Comment cannot be empty" })}
        className="w-full h-16 p-3 border rounded hover:ring-2 hover:ring-blue-600 outline-none transition-all duration-300"
        placeholder="Write a comment..."
      ></textarea>

      {/* Error Message */}
      {errors.comment && <p className="text-red-500">{errors.comment.message}</p>}

      {/* Submit Button */}
      {session && (
        <div className="w-full flex justify-end mt-2">
          <button type="submit" className="bg-blue-600 px-3 py-2 text-white font-semibold rounded">
            Add Comment
          </button>
        </div>
      )}
    </form>
  );
};

export default AddComment;
