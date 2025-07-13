"use client";
import React, { useState } from "react";
import { useApolloClient } from "@apollo/client";
import { GET_USER_BLOGS } from "@/graphql/queries/getUserBlogs";
import { GET_BLOGS } from "@/graphql/queries/getBlogs";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteAlert from "../../components/DeleteAlert";

const DeleteBlogButton = ({ blogId }) => {
  const client = useApolloClient(); //initialize client

  const [showModal, setShowModal] = useState(false);

  const handleDeleteConfirmed = async () => {
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

      // ✅ Ask Apollo to re-fetch both blogs and user blogs
      await client.query({
        query: GET_BLOGS,
        fetchPolicy: "network-only", //refresh blog at home page
      });

      await client.query({
        query: GET_USER_BLOGS,
        fetchPolicy: "network-only", //refresh blogs at dashboard
      });

      setShowModal(false); // Close modal after successful deletion

    } catch (error) {
      console.error("Delete failed:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className='w-full px-4 py-2 text-zinc-800 font-semibold hover:text-blue-500 hover:bg-blue-50 capitalize text-start rounded flex items-center gap-2 transition-all duration-200'
      >
        <RiDeleteBin6Line />
        Delete Post
      </button>

      {showModal && (
        <DeleteAlert
          title="Delet Blog?"
          message="This will delete blog post."
          onClose={() => setShowModal(false)}
          onConfirm={handleDeleteConfirmed}
        />
      )}
    </>
  );
};

export default DeleteBlogButton;
