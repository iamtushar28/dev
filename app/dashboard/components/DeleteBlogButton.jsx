"use client";
import React from "react";
import { mutate } from "swr";

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
      className="font-semibold text-red-500 cursor-pointer hover:bg-gray-100 p-2 rounded"
    >
      Delete Blog 🗑️
    </button>
  );
};

export default DeleteBlogButton;
