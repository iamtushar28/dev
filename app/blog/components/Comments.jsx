"use client";
import React, { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import BlogDate from "@/app/components/BlogDate";
import CommentsSkelaton from "./CommentsSkelaton";
import { BsThreeDots } from "react-icons/bs";
import DeleteComment from "./DeleteComment";

const fetcher = (url) => fetch(url).then((res) => res.json());

const CommentsList = ({ blogId }) => {

    const { data: session } = useSession(); //getting logged in user

    const [activeCommentId, setActiveCommentId] = useState(null);
    const wrapperRefs = useRef({});
    const buttonRefs = useRef({});

    // Close comment options menu when clicking outside
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

    const { data: commentsData, error, isLoading, mutate } = useSWR(`/api/comments?blog_id=${blogId}`, fetcher);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        if (!commentsData) return;

        const fetchUsers = async () => {
            try {
                const updatedComments = await Promise.all(
                    commentsData.map(async (comment) => {
                        const userRes = await fetch(`/api/user/${comment.user_id}`);
                        const userData = userRes.ok ? await userRes.json() : { name: "Unknown", image: "" };

                        return {
                            ...comment,
                            userName: userData.name || "NA",
                            userProfile: userData.image || "/default-avatar.png",
                        };
                    })
                );

                setComments(updatedComments);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUsers();
    }, [commentsData]);

    if (isLoading) return <CommentsSkelaton />;
    if (error) return <p className="text-red-500">Failed to load comments</p>;
    if (!comments.length) return <p className="text-zinc-400">No comments yet. Be the first to comment!</p>;

    return (
        <div className="mt-6 flex flex-col gap-4">
            {comments.map((comment) => (
                <div key={comment._id} className="flex gap-2">
                    <img
                        src={comment.userProfile}
                        alt={comment.userName}
                        className="h-8 w-8 rounded-full object-cover"
                    />
                    <div className="w-full p-3 border-[0.3px] border-zinc-100 rounded relative">
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col md:flex-row md:items-center md:gap-2 mb-2">
                                <h4 className="font-semibold text-zinc-600 capitalize">
                                    {comment.userName}
                                </h4>
                                <BlogDate createdAt={comment.createdAt} />
                            </div>

                            {/* ✅ Only show options if comment was written by the current user */}
                            {comment.user_id === session?.user?.id && (
                                <button
                                    ref={(el) => (buttonRefs.current[comment._id] = el)}
                                    onClick={() =>
                                        setActiveCommentId(activeCommentId === comment._id ? null : comment._id)
                                    }
                                    className="text-xl h-8 w-8 rounded-full hover:bg-blue-100 hover:text-blue-500 transition-all duration-300 flex justify-center items-center">
                                    <BsThreeDots />
                                </button>
                            )}

                            {/* Option Menu */}
                            {activeCommentId === comment._id && comment.user_id === session?.user?.id && (
                                <div
                                    ref={(el) => (wrapperRefs.current[comment._id] = el)}
                                    className="z-10 absolute top-10 right-0 bg-white shadow-lg rounded-lg p-3 w-48">
                                    <button
                                        className="w-full flex items-start font-semibold cursor-pointer hover:bg-gray-100 p-2 rounded">
                                        Edit 📝
                                    </button>
                                    <DeleteComment commentId={comment._id} blogId={blogId} />
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
