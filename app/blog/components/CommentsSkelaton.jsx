import React from 'react';

const CommentsSkeleton = () => {
    return (
        <>
            <div className='flex flex-col gap-2 mt-2'>
                {Array.from({ length: 2 }).map((_, index) => (
                    <div key={index} className='flex gap-2 animate-pulse'>
                        {/* User image */}
                        <div className='h-8 w-8 rounded-full bg-zinc-200'></div>

                        {/* Comment section */}
                        <div className="w-full p-3 border border-zinc-100 rounded">
                            {/* User name & date */}
                            <div className='flex gap-2 mb-3'>
                                <div className='w-28 h-2 bg-zinc-200'></div>
                                <div className='w-28 h-2 bg-zinc-200'></div>
                            </div>

                            {/* Comment */}
                            <div className='flex flex-col gap-2'>
                                <div className='w-full h-2 bg-zinc-200'></div>
                                <div className='w-[50%] h-2 bg-zinc-200'></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default CommentsSkeleton;
