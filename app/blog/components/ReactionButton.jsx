"use client";

import React, { useState } from "react";
import { MdOutlineAddReaction } from "react-icons/md";
import { useSession } from "next-auth/react";
import { useMutation } from "@apollo/client";
import { TOGGLE_REACTION } from "@/graphql/mutations/toggleReaction";
import { GET_BLOG_BY_SLUG } from "@/graphql/queries/BlogBySlug";

const EMOJIS = ["💖", "🦄", "😲", "🔥", "✨"];

const ReactionButton = ({ blog }) => {
  const { data: session } = useSession();
  const [showOptions, setShowOptions] = useState(false);

  const [toggleReaction] = useMutation(TOGGLE_REACTION);

  // These recompute each render
  const emojiCounts = {};
  blog.reactions?.forEach(({ emoji, count }) => {
    emojiCounts[emoji] = count;
  });

  const userReacted = new Set(blog.userReactions || []);

  const handleReactionClick = async (emoji) => {
    if (!session) return;

    const prevCount = emojiCounts[emoji] || 0;
    const hasReacted = userReacted.has(emoji);

    try {
      await toggleReaction({
        variables: { blogId: blog._id, emoji },

        optimisticResponse: {
          toggleReaction: {
            __typename: "EmojiCount",
            emoji,
            count: hasReacted ? prevCount - 1 : prevCount + 1,
          },
        },

        update: (cache, { data: { toggleReaction } }) => {
          const existing = cache.readQuery({
            query: GET_BLOG_BY_SLUG,
            variables: { slug: blog.slug }, // ✅ use slug
          });

          if (!existing?.blogBySlug) return;

          const updatedReactions = [...(existing.blogBySlug.reactions || [])];
          const idx = updatedReactions.findIndex((r) => r.emoji === emoji);

          if (idx !== -1) {
            updatedReactions[idx] = {
              ...updatedReactions[idx],
              count: toggleReaction.count,
            };
          } else {
            updatedReactions.push({
              emoji,
              count: toggleReaction.count,
              __typename: "EmojiCount",
            });
          }

          const updatedUserReactions = new Set(existing.blogBySlug.userReactions || []);
          if (hasReacted) {
            updatedUserReactions.delete(emoji);
          } else {
            updatedUserReactions.add(emoji);
          }

          cache.writeQuery({
            query: GET_BLOG_BY_SLUG,
            variables: { slug: blog.slug }, // ✅ match query
            data: {
              blogBySlug: {
                ...existing.blogBySlug,
                reactions: updatedReactions,
                userReactions: Array.from(updatedUserReactions),
              },
            },
          });
        },
      });
    } catch (error) {
      console.error("Reaction failed:", error.message);
    }
  };

  return (
    <div className="relative">
      {/* Reaction Button */}
      <button
        onMouseEnter={() => setShowOptions(true)}
        onMouseLeave={() => setShowOptions(false)}
        className="text-zinc-600 hover:text-pink-500 w-16 transition-all duration-200 flex flex-col justify-center items-center"
      >
        <MdOutlineAddReaction className="text-2xl" />
        <span className="text-sm">
          {Object.values(emojiCounts).reduce((acc, v) => acc + v, 0) || 0}
        </span>
      </button>

      {/* Reaction Panel */}
      {showOptions && (
        <div
          onMouseEnter={() => setShowOptions(true)}
          onMouseLeave={() => setShowOptions(false)}
          className="w-96 px-2 h-16 bg-white flex justify-around items-center absolute z-20 -top-5 left-16 rounded-2xl shadow"
        >
          {EMOJIS.map((emoji) => {
            const count = emojiCounts[emoji] || 0;
            const reacted = userReacted.has(emoji);
            return (
              <button
                key={emoji}
                onClick={() => handleReactionClick(emoji)}
                className={`text-lg p-2 rounded-full transition hover:scale-110 duration-200 ${
                  reacted ? "bg-pink-100" : "hover:bg-gray-100"
                }`}
              >
                {emoji} <span className="text-xs">{count}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ReactionButton;
