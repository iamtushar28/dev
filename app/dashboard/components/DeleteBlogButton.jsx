"use client";
import React from "react";
import { mutate } from "swr";
import { RiDeleteBin6Line } from "react-icons/ri"; //delet icon

const DeleteBlogButton = ({ blogId }) => {
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    try {
      const res = await fetch("/api/blog", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blogId }),
      });

      if (!res.ok) {
        const errData = await res.json();
        alert(errData.error || "Failed to delete blog.");
        return;
      }

      // ✅ Refresh the blogs list from /api/blog/user
      mutate("/api/blog/user");

    } catch (error) {
      console.error("Delete failed:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className='w-full px-4 py-2 text-zinc-800 font-semibold hover:text-blue-500 hover:bg-blue-50 capitalize text-start rounded flex items-center gap-2 transition-all duration-200'
    >
      <RiDeleteBin6Line />
      Delete Post
    </button>
  );
};

export default DeleteBlogButton;
