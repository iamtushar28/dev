'use client'
import React, { useRef, useState } from "react";
import Menu from "./Menu";
import MainContent from "./MainContent";
import BlogTitleEditor from "./BlogTitleEditor";

const BlogEditor = () => {
    const contentRef = useRef(null);

    const handleFormat = (command, value = null) => {
        if (contentRef.current) {
            contentRef.current.focus(); // Ensure focus before command execution

            setTimeout(() => {
                if (command === "formatBlock") {
                    document.execCommand("formatBlock", false, value);
                } else {
                    document.execCommand(command, false, value);
                }
            }, 10);
        }
    };

    const [coverImage, setCoverImage] = useState(null);
      const [imageName, setImageName] = useState(""); // Store selected file name
    
      const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          setCoverImage(URL.createObjectURL(file)); // Create a preview URL
          setImageName(file.name); // Set file name
        }
      };
    

    return (
        <div className="w-full md:w-[80%] min-h-screen md:h-fit max-h-fit py-4 md:py-8 md:px-8 bg-white rounded">

            {/* Add Cover Image Button */}
            <div className="mt-4 mb-4 flex justify-center md:justify-normal items-center gap-3">
                <input type="file" id="coverImage" className="hidden" onChange={handleImageChange} />
                <label htmlFor="coverImage" className="cursor-pointer px-4 py-3 text-zinc-600 capitalize font-semibold bg-white border border-zinc-200 rounded-lg hover:border-blue-600 hover:ring hover:ring-blue-600 transition-all duration-200">
                    Add Cover Image
                </label>
                {imageName && <span className="text-gray-700 hidden md:block">{imageName}</span>} {/* Display file name */}
            </div>

            {/* Display the Selected Image */}
            {coverImage && (
                <div className="mb-4">
                    <img src={coverImage} alt="Cover Preview" className="w-full h-fit object-cover md:rounded shadow-sm" />
                </div>
            )}

            <BlogTitleEditor/>

            <Menu onFormat={handleFormat} />
            <MainContent contentRef={contentRef} />
        </div>
    );
};

export default BlogEditor;
