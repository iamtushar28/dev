'use client'
import { useState, useRef, useEffect } from "react";

const AutoResizeTextarea = () => {
  const [content, setContent] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height to auto
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Adjust height
    }
  }, [content]); // Run effect when content changes

  return (
    <>
    <textarea
      ref={textareaRef}
      name="blog title"
      id="blog-title"
      placeholder="New post title here..."
      className="placeholder:text-3xl md:placeholder:text-5xl placeholder:font-extrabold placeholder:text-zinc-600 text-3xl md:text-5xl font-extrabold h-auto w-full outline-none resize-none overflow-hidden"
      value={content}
      onChange={(e) => setContent(e.target.value)}
    />
  </>
  );
};

export default AutoResizeTextarea;
