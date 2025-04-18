"use client";
import React, { useEffect, useState } from "react";
import SkeletonList from "./SkeletonList";
import BlogTemplate from "./BlogTemplate";
import { FiSearch } from "react-icons/fi";

const SearchedBlogsList = () => {
  const [query, setQuery] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch blogs (all or by search)
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/blog/search?title=${encodeURIComponent(query.trim())}`);
        const data = await res.json();
        setBlogs(data || []);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
        setBlogs([]);
      }
      setLoading(false);
    };

    const delayDebounce = setTimeout(fetchBlogs, 400); // debounce
    return () => clearTimeout(delayDebounce);
  }, [query]);

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
        {/* quick filter section */}
        <div className="flex justify-end gap-2">
          <button className="w-fit px-3 py-1 text-sm font-semibold capitalize text-blue-500 bg-white rounded">
            Popular
          </button>
          <button className="w-fit px-3 py-1 text-sm capitalize hover:text-blue-500 hover:bg-white rounded">
            Newest
          </button>
          <button className="w-fit px-3 py-1 text-sm capitalize hover:text-blue-500 hover:bg-white rounded">
            Oldest
          </button>
        </div>

        {/* Blog List Section */}
        <div className="flex flex-col gap-3 mt-5">
          {loading ? (
            <SkeletonList />
          ) : blogs.length > 0 ? (
            blogs.map((blog) => (
              <BlogTemplate key={blog._id} blog={blog} />
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
