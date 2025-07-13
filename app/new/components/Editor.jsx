"use client";
import { useApolloClient } from "@apollo/client";
import { GET_BLOGS } from "@/graphql/queries/getBlogs";
import { useEditor, EditorContent } from "@tiptap/react";
import { useState, useRef, useEffect } from "react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import ListItem from "@tiptap/extension-list-item";
import Color from "@tiptap/extension-color";
import Heading from "@tiptap/extension-heading";
import Placeholder from "@tiptap/extension-placeholder";
import Toolbar from "./Toolbar";
import DefaultAlert from '../../components/DefaultAlert'

const Editor = () => {
    const client = useApolloClient(); //initialize client
    const [title, setTitle] = useState("");
    const textareaRef = useRef(null);
    const [coverImage, setCoverImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [alertMessage, setAlertMessage] = useState(""); // ✅ Alert message state

    // Adjust textarea height dynamically
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [title]);

    // Handle cover image selection
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Revoke previous preview to avoid memory leak
            if (coverImage) URL.revokeObjectURL(coverImage);
            setCoverImage(URL.createObjectURL(file));
            setImageFile(file);
        }
    };

    // Initialize TipTap Editor
    const editor = useEditor({
        extensions: [
            StarterKit.configure({ bulletList: { keepMarks: true }, orderedList: { keepMarks: true } }),
            TextStyle,
            ListItem,
            Color,
            Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
            Placeholder.configure({ placeholder: "Start writing your blog..." }),
        ],
    });

    if (!editor) return null;

    const handleSave = async () => {
        setIsUploading(true);
        const content = editor.getHTML();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", content);
        if (imageFile) formData.append("coverImage", imageFile);

        try {
            const response = await fetch("/api/blog", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            setIsUploading(false);

            if (response.ok) {
                setAlertMessage(result.message); // ✅ Success

                // ✅ Clear editor after successful post
                setTitle("");                        // Clear title
                editor.commands.clearContent();      // Clear editor content
                setCoverImage(null);                 // Remove cover image preview
                setImageFile(null);                  // Reset image file reference

                // ✅ Ask Apollo to re-fetch blogs from the server
                await client.query({
                    query: GET_BLOGS,
                    fetchPolicy: "network-only", // force refresh from server
                });
                
            } else {
                setAlertMessage(result.error || "Something went wrong."); // ✅ Error
            }
        } catch (error) {
            console.error("Error publishing blog:", error);
            setAlertMessage("Failed to publish blog."); // ✅ Network/Error
            setIsUploading(false);
        }
    };


    return (
        <div className="w-full md:w-[80%] min-h-screen py-4 px-2 md:py-8 md:px-8 bg-white rounded">

            {/* ✅ Alert Component */}
            {alertMessage && (
                <DefaultAlert message={alertMessage} onClose={() => setAlertMessage('')} />
            )}

            <h4 className="text-start font-semibold capitalize">Create Post</h4>

            {/* Cover Image Upload */}
            <div className="mt-4 mb-1 w-fit flex flex-col justify-center gap-3">
                <input type="file" id="coverImage" className="hidden" onChange={handleImageChange} />
                <label htmlFor="coverImage" className="cursor-pointer px-4 py-3 bg-white border border-gray-200 rounded-lg hover:ring-2 hover:ring-blue-600 transition font-semibold text-zinc-600">
                    Add Cover Image
                </label>
                <p className="text-xs mb-4 text-red-600">Use landscape images only*</p>
            </div>

            {/* Display Cover Image */}
            {coverImage && <img src={coverImage} alt="Cover Preview" className="w-full h-auto object-cover shadow-sm" />}

            {/* Blog Title */}
            <textarea
                ref={textareaRef}
                placeholder="New post title here..."
                className="text-3xl font-extrabold w-full outline-none resize-none overflow-hidden placeholder:text-zinc-600 mt-6"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            {/* Toolbar */}
            <Toolbar editor={editor} />

            {/* Blog Editor */}
            <div className="prose prose-lg prose-blue max-w-full">
                <EditorContent
                    editor={editor}
                    className="mt-4 p-4 min-h-[300px] w-full text-black text-lg border border-gray-300 rounded-md prose-ul:list-disc prose-ol:list-decimal"
                />
            </div>

            {/* Save Button */}
            <div className="mt-6">
                <button
                    onClick={handleSave}
                    className={`px-5 py-2 text-white rounded-lg font-semibold transition ${isUploading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    disabled={isUploading}
                >
                    {isUploading ? "Publishing..." : "Publish"}
                </button>
            </div>
        </div>
    );
};

export default Editor;
