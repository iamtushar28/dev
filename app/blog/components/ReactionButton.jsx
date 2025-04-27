"use client";

import React, { useState, useEffect } from "react";
import { MdOutlineAddReaction } from "react-icons/md";
import { useSession } from "next-auth/react";

const ReactionButton = ({ blogId }) => {
    const { data: session } = useSession();
    const [showOptions, setShowOptions] = useState(false);

    const [reactions, setReactions] = useState({
        like: 0,
        unicorn: 0,
        excite: 0,
        fire: 0,
        star: 0,
    });

    const fetchReactions = async () => {
        try {
            const res = await fetch(`/api/reactions?blogId=${blogId}`);
            const data = await res.json();
            if (res.ok) {
                setReactions(data.reactions);
            }
        } catch (error) {
            console.error('Failed to fetch reactions', error);
        }
    };

    useEffect(() => {
        fetchReactions();
    }, []);

    const handleReaction = async (reactionType) => {
        if (!session?.user?.id) {
            alert('Please login.');
            return;
        }

        try {
            const res = await fetch('/api/reactions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    blogId,
                    reactionType,
                    userId: session.user.id,
                }),
            });

            const data = await res.json();
            if (res.ok) {
                setReactions(data.reactions);
            }
        } catch (error) {
            console.error('Failed to react', error);
        }
    };



    return (
        <>
            {/* like/reaction button */}
            <button
                onMouseEnter={() => setShowOptions(true)}
                onMouseLeave={() => setShowOptions(false)}
                className='text-zinc-600 hover:text-pink-500 w-16 transition-all duration-200 flex flex-col justify-center items-center'>
                <MdOutlineAddReaction className='text-2xl' />
            </button>

            {/* reaction block */}
            {showOptions && (
                <div
                    onMouseEnter={() => setShowOptions(true)}
                    onMouseLeave={() => setShowOptions(false)}
                    className='w-80 h-16 bg-white flex justify-around items-center absolute z-20 top-14 left-16 rounded-2xl shadow'>

                    {/* like btn */}
                    <button onClick={() => handleReaction('like')} className='text-xl p-2 rounded-full hover:bg-zinc-100'>
                        💖 <span className='text-xs'>{reactions.like}</span>
                    </button>

                    {/* unicorn btn */}
                    <button onClick={() => handleReaction('unicorn')} className='text-xl p-2 rounded-full hover:bg-zinc-100'>
                        🦄 <span className='text-xs'>{reactions.unicorn}</span>
                    </button>

                    {/* excite btn */}
                    <button onClick={() => handleReaction('excite')} className='text-xl p-2 rounded-full hover:bg-zinc-100'>
                        😲 <span className='text-xs'>{reactions.excite}</span>
                    </button>

                    {/* fire btn */}
                    <button onClick={() => handleReaction('fire')} className='text-xl p-2 rounded-full hover:bg-zinc-100'>
                        🔥 <span className='text-xs'>{reactions.fire}</span>
                    </button>

                    {/* star btn */}
                    <button onClick={() => handleReaction('star')} className='text-xl p-2 rounded-full hover:bg-zinc-100'>
                        ✨ <span className='text-xs'>{reactions.star}</span>
                    </button>

                </div>
            )}
        </>
    )
}

export default ReactionButton
