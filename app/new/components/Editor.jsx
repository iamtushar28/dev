"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { useState } from "react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import ListItem from "@tiptap/extension-list-item";
import Color from "@tiptap/extension-color";
import Heading from "@tiptap/extension-heading";
import Placeholder from "@tiptap/extension-placeholder";
import Toolbar from "./Toolbar";
import BlogTitleEditor from "./BlogTitleEditor";

const Editor = () => {

    const [coverImage, setCoverImage] = useState(null);
    const [imageName, setImageName] = useState(""); // Store selected file name

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setCoverImage(URL.createObjectURL(file)); // Create a preview URL
            setImageName(file.name); // Set file name
        }
    };

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: { keepMarks: true, keepAttributes: false },
                orderedList: { keepMarks: true, keepAttributes: false },
            }),
            TextStyle,
            ListItem,
            Color,
            Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
            Placeholder.configure({
                placeholder: "Your blog starts here...",
            }),
        ],
    });

    if (!editor) return null;

    return (
        <div className="w-full md:w-[80%] min-h-screen md:h-fit max-h-fit py-4 px-2 md:py-8 md:px-8 bg-white rounded">

            {/* heading */}
            <h4 className="text-start font-semibold capitalize">Create Post</h4>


            {/* Add Cover Image Button */}
            <div className="mt-4 mb-1 flex justify-center md:justify-normal items-center gap-3">
                <input type="file" id="coverImage" className="hidden" onChange={handleImageChange} />
                <label htmlFor="coverImage" className="cursor-pointer px-4 py-3 text-zinc-600 capitalize font-semibold bg-white border border-zinc-200 rounded-lg hover:border-blue-600 hover:ring hover:ring-blue-600 transition-all duration-200">
                    Add Cover Image
                </label>
                {imageName && <span className="text-gray-700 hidden md:block">{imageName}</span>} {/* Display file name */}
            </div>
            <p className="text-xs mb-4 text-red-600">Use landscape images only*</p>

            {/* Display the Selected Image */}
            {coverImage && (
                <div className="mb-4">
                    <img src={coverImage} alt="Cover Preview"  className="w-full h-auto object-cover shadow-sm" />
                </div>
            )}

            {/* blog title */}
            <BlogTitleEditor />

            {/* blog edit toolbar */}
            <Toolbar editor={editor} />

            <EditorContent
                editor={editor}
                className="mt-4 px-4 min-h-[300px] w-full text-black text-lg leading-relaxed outline-none prose prose-lg max-w-none border border-zinc-300 rounded-md focus:ring-0 focus:outline-none"
            />
        </div>
    );
};

export default Editor;
