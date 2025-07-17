'use client';

import React from 'react';

/**
 * BlogStats Component
 * Displays summary statistics for the user's blogs
 * @param {Array} blogs - List of blog objects
 */
const BlogStats = ({ blogs }) => {
    const totalBlogs = blogs?.length || 0;

    // Sum all reaction counts from each blog
    const totalReactions = blogs?.reduce((acc, blog) => {
        const blogReactions = blog.reactions?.reduce((sum, r) => sum + (r.count || 0), 0);
        return acc + blogReactions;
    }, 0) || 0;

    // Sum all comments count
    const totalComments = blogs?.reduce((acc, blog) => acc + (blog.commentsCount || 0), 0) || 0;

    return (
        <section className="w-full px-2 md:px-0">
            {/* Heading */}
            <h2 className="text-2xl font-bold text-zinc-900 mb-4">Dashboard</h2>

            {/* Stat cards */}
            <div className="flex flex-wrap gap-2 md:gap-0 md:justify-between">

                {/* Total blog posts */}
                <div className="h-fit w-[48%] md:w-[32%] p-4 md:p-6 bg-white shadow-sm rounded">
                    <h2 className="text-2xl md:text-3xl font-semibold">{totalBlogs}</h2>
                    <p className="text-zinc-500 text-sm">Total blog posts</p>
                </div>

                {/* Total post reactions */}
                <div className="h-fit w-[48%] md:w-[32%] p-4 md:p-6 bg-white shadow-sm rounded">
                    <h2 className="text-2xl md:text-3xl font-semibold">{totalReactions}</h2>
                    <p className="text-zinc-500 text-sm">Total post reactions</p>
                </div>

                {/* Total post comments */}
                <div className="h-fit w-[48%] md:w-[32%] p-4 md:p-6 bg-white shadow-sm rounded">
                    <h2 className="text-2xl md:text-3xl font-semibold">{totalComments}</h2>
                    <p className="text-zinc-500 text-sm">Total post comments</p>
                </div>

            </div>
        </section>
    );
};

export default BlogStats;
