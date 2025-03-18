"use client";
import React, { useEffect, useState } from "react";
import BlogDate from "@/app/components/BlogDate";
import CommentsSkelaton from "./CommentsSkelaton";

const CommentsList = ({ blogId }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await fetch(`/api/comments?blog_id=${blogId}`);
                if (!res.ok) throw new Error("Failed to fetch comments");
                const data = await res.json();

                // Fetch user details for each comment
                const commentsWithUserData = await Promise.all(
                    data.map(async (comment) => {
                        const userRes = await fetch(`/api/user/${comment.user_id}`);
                        const userData = userRes.ok ? await userRes.json() : { name: "Unknown", image: "" };

                        return {
                            ...comment,
                            userName: userData.name || "NA",
                            userProfile: userData.image,
                        };
                    })
                );

                setComments(commentsWithUserData);
            } catch (error) {
                console.error("Error fetching comments:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [blogId]);

    return (
        <div className="mt-6">
            {loading ? (
                <>
                    <CommentsSkelaton />
                </>
            ) : comments.length === 0 ? (
                <p className="text-zinc-400">No comments yet. Be the first to comment!</p>
            ) : (
                <div className="flex flex-col gap-4 mt-4">
                    {comments.map((comment) => (
                        <div key={comment._id} className="flex gap-2">

                            {/* User Profile Image */}
                            <img
                                src={comment.userProfile}
                                alt={comment.userName}
                                className="h-8 w-8 rounded-full object-cover"
                            />

                            {/* Comment Box */}
                            <div className="w-full p-3 border-[0.3px] border-zinc-100 rounded">
                                <div className="flex flex-col md:flex-row md:items-center md:gap-2 mb-2">

                                    {/* Commenter Name */}
                                    <h4 className="font-semibold text-zinc-600 capitalize">
                                        {comment.userName}
                                    </h4>

                                    {/* Time */}
                                    <BlogDate createdAt={comment.createdAt} />

                                </div>

                                {/* Comment Text */}
                                <p className="text-zinc-600 text-sm">{comment.comment}</p>

                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CommentsList;
