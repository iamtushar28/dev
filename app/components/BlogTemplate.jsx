'use client';
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import BlogDate from './BlogDate'
import BookmarkButton from './BookmarkButton'
import { useInView } from 'react-intersection-observer'
import { FaRegComment } from "react-icons/fa"

const BlogTemplate = ({ blog }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  //show only first 96 character of title
  const truncateText = (text, limit) => {
    if (text.length <= limit) return text;
    return text.slice(0, text.slice(0, limit).lastIndexOf(" ")) + "...";
  };


  // Get current emoji counts and user's reactions
  const emojiCounts = {};
  blog.reactions?.forEach(({ emoji, count }) => {
    emojiCounts[emoji] = count;
  });

  return (
    <div ref={ref} className='w-full h-fit pb-1 bg-white overflow-hidden md:rounded'>
      {/* Cover Image */}
      <Link href={`/blog/${blog.slug}`}>
        {inView && blog.coverImage && (
          <Image
            src={blog.coverImage}
            alt="Blog Cover"
            priority={false}
            className="w-full h-auto max-h-72 object-cover"
            width={500}
            height={300}
          />
        )}
      </Link>

      {/* blog info */}
      <div className='p-2 md:p-4'>

        {/* Creator Info */}
        <div className='flex gap-2 items-center'>
          <div className='h-10 w-10 md:h-12 md:w-12 rounded-full overflow-hidden'>
            {blog.creatorProfile && (
              <Image
                src={blog.creatorProfile}
                alt="Creator Profile"
                priority={false}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          <div>
            <h2 className='font-semibold'>{blog.creatorName}</h2>
            <BlogDate createdAt={blog?.createdAt} />
          </div>
        </div>

        {/* Blog Title */}
        <div className='mt-3'>

          <Link
            href={`/blog/${blog.slug}`}
            className="text-xl md:text-2xl font-semibold hover:text-blue-600 transition-all"
          >
            {truncateText(blog.title, 96)}
          </Link>

          {/* Tags */}
          {blog?.tags?.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {blog?.tags.map((tag, i) => {
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
                    className="text-sm text-zinc-500 px-2 hover:underline"
                  >
                    <span className={`${hashColor}`}>#</span>
                    {tag}
                  </button>
                );
              })}
            </div>
          )}

          {/* Reactions, Comments, Save */}
          <div className='mt-4 flex justify-between items-center'>
            <div className='flex gap-4 md:gap-8'>

              {/* reaction count */}
              <Link
                href={`/blog/${blog.slug}`}
                title='add reaction on blog'
                className='h-8 w-36 md:w-48 hover:bg-zinc-100 rounded transition-all duration-200 flex relative'>
                <div className='h-6 w-6 text-sm ring-1 bg-slate-100 ring-white rounded-full flex justify-center items-center absolute left-3 top-1 z-40'>💖</div>
                <div className='h-6 w-6 text-sm ring-1 bg-slate-100 ring-white rounded-full flex justify-center items-center absolute left-7 top-1 z-30'>🦄</div>
                <div className='h-6 w-6 text-sm ring-1 bg-slate-100 ring-white rounded-full flex justify-center items-center absolute left-11 top-1 z-20'>😲</div>
                <div className='h-6 w-6 text-sm ring-1 bg-slate-100 ring-white rounded-full flex justify-center items-center absolute left-[3.7rem] top-1 z-10'>🔥</div>
                <div className='h-6 w-6 text-sm ring-1 bg-slate-100 ring-white rounded-full flex justify-center items-center absolute left-[4.7rem] top-1'>✨</div>

                <div className='h-6 w-6 text-sm text-zinc-500 rounded-full flex justify-center items-center absolute left-[6.4rem] md:left-[8.2rem] top-1'>

                  {Object.values(emojiCounts).reduce((acc, v) => acc + v, 0) || 0}

                  <span className='text-xs ml-2 hidden md:block'>Reactions</span></div>

              </Link>

              {/* comments count */}
              <Link
                href={`/blog/${blog.slug}#comments`}
                title='comment on blog'
                className='capitalize text-xs text-zinc-500 md:text-sm flex gap-2 items-center px-2 py-1 hover:bg-zinc-100 rounded transition-all duration-200'>
                <FaRegComment className='text-lg' />
                {blog.commentsCount}
                <span className='text-xs hidden md:block'>Comments</span>
              </Link>
            </div>

            {/* bookmark blog button */}
            <BookmarkButton blogId={blog._id} initiallyBookmarked={blog.bookmarked} />

          </div>

        </div>
      </div>
    </div>
  )
}

export default BlogTemplate;
