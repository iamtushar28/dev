"use client";

import React, { useState, useEffect, useRef } from "react";
import { MdOutlineAddReaction } from "react-icons/md";
import { useSession } from "next-auth/react";
import { useMutation } from "@apollo/client";
import { TOGGLE_REACTION } from "@/graphql/mutations/toggleReaction";
import { GET_BLOG_BY_SLUG } from "@/graphql/queries/BlogBySlug";

const EMOJIS = ["💖", "🦄", "😲", "🔥", "✨"];

const MobileReactionButton = ({ blog, blogId }) => {
  const { data: session } = useSession();
  const [showOptions, setShowOptions] = useState(false);
  const wrapperRef = useRef(null);
  const buttonRef = useRef(null);

  const [toggleReaction] = useMutation(TOGGLE_REACTION);

  // Event listener to close the emoji popup
  const handleClickOutside = (event) => {
    if (
      showOptions &&
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showOptions]);

  const handleReactionClick = async (emoji) => {
    if (!session) {
      alert("Please login.");
      return;
    }

    try {
      await toggleReaction({
        variables: { blogId, emoji },
        optimisticResponse: {
          toggleReaction: {
            __typename: "EmojiCount",
            emoji,
            count:
              (blog.reactions.find((r) => r.emoji === emoji)?.count || 0) +
              (blog.userReactions.includes(emoji) ? -1 : 1),
          },
        },
        update: (cache, { data: { toggleReaction } }) => {
          const existing = cache.readQuery({
            query: GET_BLOG_BY_SLUG,
            variables: { id: blogId },
          });

          if (!existing?.blog) return;

          const updatedReactions = (existing.blog.reactions || []).map((r) => ({
            ...r,
          }));
          const idx = updatedReactions.findIndex(
            (r) => r.emoji === toggleReaction.emoji
          );

          if (idx !== -1) {
            updatedReactions[idx].count = toggleReaction.count;
          } else {
            updatedReactions.push(toggleReaction);
          }

          let updatedUserReactions = new Set(existing.blog.userReactions || []);
          if (updatedUserReactions.has(emoji)) {
            updatedUserReactions.delete(emoji);
          } else {
            updatedUserReactions.add(emoji);
          }

          cache.writeQuery({
            query: GET_BLOG_BY_SLUG,
            variables: { id: blogId },
            data: {
              blog: {
                ...existing.blog,
                reactions: updatedReactions,
                userReactions: Array.from(updatedUserReactions),
              },
            },
          });
        },
      });
    } catch (error) {
      console.error("Failed to react", error);
    }
  };

  const emojiCounts = {};
  blog.reactions?.forEach(({ emoji, count }) => {
    emojiCounts[emoji] = count;
  });

  const userReacted = new Set(blog.userReactions || []);

  return (
    <>
      {/* Trigger button */}
      <button
        ref={buttonRef}
        onClick={() => setShowOptions(true)}
        className="text-zinc-600 hover:text-pink-500 transition-all duration-200 flex gap-2 items-center"
      >
        <MdOutlineAddReaction className="text-2xl" />
        {Object.values(emojiCounts).reduce((acc, v) => acc + v, 0) || "0"}
      </button>

      {/* Reaction Panel */}
      {showOptions && (
        <div
          ref={wrapperRef}
          className="w-80 px-2 h-16 bg-white flex justify-around items-center absolute z-20 bottom-16 left-4 rounded-2xl shadow"
        >
          {EMOJIS.map((emoji) => {
            const count = emojiCounts[emoji] || 0;
            const reacted = userReacted.has(emoji);

            return (
              <button
                key={emoji}
                onClick={() => handleReactionClick(emoji)}
                className={`text-xl p-2 rounded-full transition hover:scale-110 duration-200 ${
                  reacted ? "bg-pink-100" : "hover:bg-zinc-100"
                }`}
              >
                {emoji} <span className="text-xs">{count}</span>
              </button>
            );
          })}
        </div>
      )}
    </>
  );
};

export default MobileReactionButton;
