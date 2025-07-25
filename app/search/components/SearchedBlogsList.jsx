"use client";
import React, { useEffect, useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_BLOGS } from "@/graphql/queries/getBlogs";
import { GET_SEARCHED_BLOGS } from "@/graphql/queries/getSearchedBlogs";
import SkeletonList from "./SkeletonList";
import BlogTemplate from "./BlogTemplate";
import { FiSearch } from "react-icons/fi";

const SearchedBlogsList = () => {
  const [query, setQuery] = useState("");

  // Filter state and menu control
  const [filter, setFilter] = useState("newest"); // Default to 'newest'

  // Get all blogs by default
  const { data: allData, loading: loadingAll, error } = useQuery(GET_BLOGS);

  // Lazy query for search
  const [searchBlogs, { data: searchData, loading: loadingSearch }] = useLazyQuery(GET_SEARCHED_BLOGS);

  // Trigger search
  useEffect(() => {
    if (query.trim()) {
      const delay = setTimeout(() => {
        searchBlogs({ variables: { title: query.trim() } });
      }, 1000);
      return () => clearTimeout(delay);
    }
  }, [query, searchBlogs]);

  const blogs = query.trim()
    ? searchData?.searchBlogs ?? []
    : allData?.blogs ?? [];

  const loading = query.trim() ? loadingSearch : loadingAll;

  // Filter and sort blogs based on selected filter
  const getFilteredBlogs = () => {
    if (!allData?.blogs) return [];

    switch (filter) {
      case "popular":
        // Sort by number of total reactions
        return [...allData.blogs].sort((a, b) => {
          const aReactions = a.reactions?.reduce((sum, r) => sum + r.count, 0) || 0;
          const bReactions = b.reactions?.reduce((sum, r) => sum + r.count, 0) || 0;
          return bReactions - aReactions;
        });

      case "trending":
        // Sort by number of comments
        return [...allData.blogs].sort((a, b) => (b.commentsCount || 0) - (a.commentsCount || 0));

      case "newest":
      default:
        // Default: newest blogs first (as returned by server)
        return [...allData.blogs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  };

  return (
    <>
      {/* searchbar - visible only on mobile */}
      <div className="px-2 mb-4 block md:hidden relative">
        <div className="h-10 w-full bg-white rounded border border-gray-200 hover:border-blue-500 hover:ring-2 hover:ring-blue-500 flex justify-center items-center relative transition-all duration-200">
          <button className="h-10 w-10 text-xl font-semibold flex justify-center items-center">
            <FiSearch />
          </button>
          <input
            type="text"
            placeholder="search..."
            className="h-10 w-full outline-none bg-transparent"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Blog list */}
      <div className="w-full md:w-[74%] h-fit">
        <div className="flex justify-end gap-2">

          <button
            onClick={() => {
              setFilter("newest");
            }}
            className={`w-fit px-3 py-1 text-sm capitalize font-semibold ${filter === "newest" ? 'bg-white text-blue-500' : ''} rounded hover:text-blue-500 hover:bg-white transition-all duration-200`}
          >
            ⚡Newest
          </button>

          <button
            onClick={() => {
              setFilter("popular");
            }}
            className={`w-fit px-3 py-1 text-sm capitalize font-semibold ${filter === "popular" ? 'bg-white text-blue-500' : ''} rounded hover:text-blue-500 hover:bg-white transition-all duration-200`}
          >
            ♥️Popular
          </button>

          <button
            onClick={() => {
              setFilter("trending");
            }}
            className={`w-fit px-3 py-1 text-sm capitalize font-semibold ${filter === "trending" ? 'bg-white text-blue-500' : ''} rounded hover:text-blue-500 hover:bg-white transition-all duration-200`}
          >
            🚀Trending
          </button>

        </div>

        <div className="flex flex-col gap-3 mt-5">
          {loading ? (
            <SkeletonList />
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
      </div>
    </>
  );
};

export default SearchedBlogsList;
