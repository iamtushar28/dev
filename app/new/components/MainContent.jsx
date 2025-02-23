import React, { useState, useEffect } from "react";

const MainContent = ({ contentRef }) => {
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    if (contentRef.current) {
      setIsEmpty(contentRef.current.innerHTML.trim() === "");
    }
  }, []);

  const handleInput = () => {
    setIsEmpty(contentRef.current.innerHTML.trim() === "");
  };

  return (
    <div
      ref={contentRef}
      contentEditable="true"
      onInput={handleInput}
      className="mt-4 py-5 rounded-md p-4 min-h-[200px] w-full text-black text-lg leading-relaxed outline-none prose prose-lg max-w-none relative"
      data-placeholder="Start your blog here..."
      suppressContentEditableWarning={true} // Prevents React warnings
    >
      {isEmpty && (
        <span className="absolute text-gray-400 pointer-events-none select-none">
          Start your blog here...
        </span>
      )}
    </div>
  );
};

export default MainContent;
