import React from 'react'
import { useState, useRef, useEffect } from "react";


const MaineContent = () => {
  const [content, setContent] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height to auto
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Adjust height
    }
  }, [content]); // Run effect when content changes
  return (
    <div className='py-5'>
      <textarea
        ref={textareaRef}
        name="blog content"
        id="blog-content"
        placeholder="New post content here..."
        className="placeholder:text-lg placeholder:text-zinc-600 text-lg h-auto w-full p-4 outline-none resize-none overflow-hidden"
        value={content}
        onChange={(e) => setContent(e.target.value)} />
    </div>
  )
}

export default MaineContent