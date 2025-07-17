"use client";
import React, { useState, useRef, useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import BlogTemplate from "./BlogTemplate";
import SkeletonLoader from "./SkeletonLoader";
import { useQuery } from "@apollo/client";
import { GET_BLOGS } from "@/graphql/queries/getBlogs";

const Blog = () => {
  // Fetching blogs from GraphQL
  const { data, loading, error } = useQuery(GET_BLOGS);

  // Filter state and menu control
  const [filter, setFilter] = useState("newest"); // Default to 'newest'

  // State to manage the open/close status of filter menu
  const [openFilterMenu, setOpenFilterMenu] = useState(false);

  // Refs for detecting outside clicks
  const wrapperRef = useRef(null);
  const filterButtonRef = useRef(null);

  // Close filter menu on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target) &&
        filterButtonRef.current &&
        !filterButtonRef.current.contains(event.target)
      ) {
        setOpenFilterMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter and sort blogs based on selected filter
  const getFilteredBlogs = () => {
    if (!data?.blogs) return [];

    switch (filter) {
      case "popular":
         // Sort by number of total reactions
        return [...data.blogs].sort((a, b) => {
          const aReactions = a.reactions?.reduce((sum, r) => sum + r.count, 0) || 0;
          const bReactions = b.reactions?.reduce((sum, r) => sum + r.count, 0) || 0;
          return bReactions - aReactions;
        });

      case "trending":
         // Sort by number of comments
        return [...data.blogs].sort((a, b) => (b.commentsCount || 0) - (a.commentsCount || 0));

      case "newest":
      default:
         // Default: newest blogs first (as returned by server)
        return [...data.blogs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  };

  return (
    <section className="w-full md:w-[72%] lg:w-[60%]">

      {/* Top bar */}
      <div className="px-2 md:px-0 flex justify-between items-center relative">
        <div className="flex gap-2">
          <button className="capitalize py-1 px-4 text-lg bg-white rounded font-semibold">
            discover
          </button>
          <button className="capitalize py-1 px-4 text-lg hover:text-blue-500 hover:bg-white rounded transition-all duration-200">
            following
          </button>
        </div>

        {/* Filter Button */}
        <button
          ref={filterButtonRef}
          title="blog filter button"
          onClick={() => setOpenFilterMenu(!openFilterMenu)}
          className="text-xl h-8 w-8 rounded-full hover:bg-blue-100 hover:text-blue-500 transition-all duration-300 flex justify-center items-center"
        >
          <BsThreeDots />
        </button>

        {/* Filter Dropdown */}
        {openFilterMenu && (
          <div
            ref={wrapperRef}
            className="absolute top-10 right-0 bg-white shadow-lg rounded-lg p-3 w-48 z-10"
          >
            <ul className="space-y-2">
              <li
                className="cursor-pointer hover:bg-gray-100 p-2 rounded"
                onClick={() => {
                  setFilter("newest");
                  setOpenFilterMenu(false);
                }}
              >
                Newest ⚡
              </li>
              <li
                className="cursor-pointer hover:bg-gray-100 p-2 rounded"
                onClick={() => {
                  setFilter("popular");
                  setOpenFilterMenu(false);
                }}
              >
                Most Popular ♥️
              </li>
              <li
                className="cursor-pointer hover:bg-gray-100 p-2 rounded"
                onClick={() => {
                  setFilter("trending");
                  setOpenFilterMenu(false);
                }}
              >
                Trending 🚀
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Blog List Section */}
      <div className="mt-2 flex flex-col gap-3">
        {loading ? (
          <SkeletonLoader />
        ) : error ? (
          <p className="text-red-500">Failed to load blogs.</p>
        ) : getFilteredBlogs().length > 0 ? (
          getFilteredBlogs().map((blog) => (
            <BlogTemplate
              key={blog._id}
              blog={{
                ...blog,
                creatorName: blog.author?.name || "Unknown",
                creatorProfile: blog.author?.image || null,
              }}
            />
          ))
        ) : (
          <p>No blogs found.</p>
        )}
      </div>
    </section>
  );
};

export default Blog;
