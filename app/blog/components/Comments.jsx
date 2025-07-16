"use client";

import React, { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { BsThreeDots } from "react-icons/bs";
import { TbWritingSign } from "react-icons/tb";
import DeleteComment from "./DeleteComment";
import BlogDate from "@/app/components/BlogDate";

const CommentsList = ({ blog }) => {
  const { data: session } = useSession();
  const [activeCommentId, setActiveCommentId] = useState(null);
  const wrapperRefs = useRef({});
  const buttonRefs = useRef({});

  const comments = blog?.comments || [];

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      const wrapperRef = wrapperRefs.current[activeCommentId];
      const buttonRef = buttonRefs.current[activeCommentId];
      if (
        wrapperRef &&
        !wrapperRef.contains(event.target) &&
        buttonRef &&
        !buttonRef.contains(event.target)
      ) {
        setActiveCommentId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeCommentId]);

  if (!comments.length)
    return <p className="text-zinc-400">No comments yet. Be the first to comment!</p>;

  return (
    <div className="mt-6 flex flex-col gap-4">
      {comments.map((comment) => (
        <div key={comment._id} className="flex gap-2">
          <img
            src={comment.author?.image || "/default-avatar.png"}
            alt={comment.author?.name || "User"}
            className="h-8 w-8 rounded-full object-cover"
          />
          <div className="w-full p-3 border-[0.3px] border-zinc-100 rounded relative">
            <div className="flex justify-between items-center">
              <div className="flex flex-col md:flex-row md:items-center md:gap-2 mb-2">
                <h4 className="font-semibold text-zinc-600 capitalize">
                  {comment.author?.name || "NA"}
                </h4>
                <BlogDate createdAt={comment.createdAt} />
              </div>

              {comment.author?._id === session?.user?.id && (
                <button
                  ref={(el) => (buttonRefs.current[comment._id] = el)}
                  onClick={() =>
                    setActiveCommentId(
                      activeCommentId === comment._id ? null : comment._id
                    )
                  }
                  className="text-xl h-8 w-8 rounded-full hover:bg-blue-100 hover:text-blue-500 transition-all duration-300 flex justify-center items-center"
                >
                  <BsThreeDots />
                </button>
              )}

              {activeCommentId === comment._id &&
                comment.author?._id === session?.user?.id && (
                  <div
                    ref={(el) => (wrapperRefs.current[comment._id] = el)}
                    className="z-10 absolute top-10 right-0 bg-white shadow-lg rounded-lg p-3 w-48"
                  >
                    <DeleteComment
                      commentId={comment._id}
                      blog={blog}
                      blogId={blog._id}
                    />
                  </div>
                )}
            </div>
            <p className="text-zinc-600 text-sm">{comment.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentsList;
