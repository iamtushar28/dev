"use client";
import React, { useState, useEffect } from "react";
import useSWR from "swr";
import BlogDate from "@/app/components/BlogDate";
import CommentsSkelaton from "./CommentsSkelaton";

const fetcher = (url) => fetch(url).then((res) => res.json());

const CommentsList = ({ blogId }) => {
    const { data: commentsData, error, isLoading } = useSWR(`/api/comments?blog_id=${blogId}`, fetcher);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true); // Control skeleton visibility

    useEffect(() => {
        if (!commentsData) return;

        setLoading(true); // Show skeleton while fetching user data

        const fetchUsers = async () => {
            try {
                const updatedComments = [...commentsData];

                for (let i = 0; i < updatedComments.length; i++) {
                    const comment = updatedComments[i];
                    const userRes = await fetch(`/api/user/${comment.user_id}`);
                    const userData = userRes.ok ? await userRes.json() : { name: "Unknown", image: "" };

                    updatedComments[i] = {
                        ...comment,
                        userName: userData.name || "NA",
                        userProfile: userData.image || "/default-avatar.png",
                    };

                    setComments([...updatedComments.slice(0, i + 1)]); // Update incrementally
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false); // Hide skeleton after first batch loads
            }
        };

        fetchUsers();
    }, [commentsData]);

    if (isLoading || loading) return <CommentsSkelaton />;
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
                    <div className="w-full p-3 border-[0.3px] border-zinc-100 rounded">
                        <div className="flex flex-col md:flex-row md:items-center md:gap-2 mb-2">
                            <h4 className="font-semibold text-zinc-600 capitalize">
                                {comment.userName}
                            </h4>
                            <BlogDate createdAt={comment.createdAt} />
                        </div>
                        <p className="text-zinc-600 text-sm">{comment.comment}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CommentsList;
