import React from 'react'

const Tags = ({ blogTags }) => {
    return (
        <>
            {blogTags?.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1 md:gap-2">
                    {blogTags.map((tag, i) => {
                        const hashColors = [
                            'text-blue-500',
                            'text-green-500',
                            'text-pink-500',
                            'text-purple-500',
                            'text-yellow-500',
                        ];
                        const hashColor = hashColors[i % hashColors.length];

                        return (
                            <button
                                key={i}
                                className="text-xs md:text-sm text-zinc-500 hover:underline"
                            >
                                <span className={`${hashColor}`}>#</span>
                                {tag}
                            </button>
                        );
                    })}
                </div>
            )}
        </>
    )
}

export default Tags