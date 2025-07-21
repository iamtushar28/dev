"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { useApolloClient } from "@apollo/client";
import { GET_USER_BLOGS } from "@/graphql/queries/getUserBlogs";
import { GET_BLOGS } from "@/graphql/queries/getBlogs";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import ListItem from "@tiptap/extension-list-item";
import Color from "@tiptap/extension-color";
import Heading from "@tiptap/extension-heading";
import Placeholder from "@tiptap/extension-placeholder";
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Youtube from '@tiptap/extension-youtube'

import Toolbar from "./Toolbar";
import DefaultAlert from '../../components/DefaultAlert'

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
// load all languages with "all" or common languages with "common"
import { all, createLowlight } from 'lowlight'
import 'highlight.js/styles/atom-one-light.css';

const Editor = () => {

    // create a lowlight instance with all languages loaded
    const lowlight = createLowlight(all);

    const client = useApolloClient(); //initialize client
    const [title, setTitle] = useState("");
    const [titleError, setTitleError] = useState("");
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
            StarterKit.configure({
                codeBlock: false,
                history: true,
                bulletList: { keepMarks: true },
                orderedList: { keepMarks: true },
            }),
            TextStyle,
            ListItem,
            Color,
            Image,
            Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
            Placeholder.configure({ placeholder: "Start writing your blog..." }),

            CodeBlockLowlight.configure({
                lowlight,
                defaultLanguage: 'javascript', // optional fallback
            }),

            Image.configure({
                allowBase64: true,
                inline: true,
                HTMLAttributes: {
                    class: 'my-custom-media-class',
                },
            }),

            Link.configure({
                openOnClick: false,
                autolink: true,
                defaultProtocol: 'https',
                protocols: ['http', 'https'],
                isAllowedUri: (url, ctx) => {
                    try {
                        // construct URL
                        const parsedUrl = url.includes(':') ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`)

                        // use default validation
                        if (!ctx.defaultValidate(parsedUrl.href)) {
                            return false
                        }

                        // disallowed protocols
                        const disallowedProtocols = ['ftp', 'file', 'mailto']
                        const protocol = parsedUrl.protocol.replace(':', '')

                        if (disallowedProtocols.includes(protocol)) {
                            return false
                        }

                        // only allow protocols specified in ctx.protocols
                        const allowedProtocols = ctx.protocols.map(p => (typeof p === 'string' ? p : p.scheme))

                        if (!allowedProtocols.includes(protocol)) {
                            return false
                        }

                        // disallowed domains
                        const disallowedDomains = ['example-phishing.com', 'malicious-site.net']
                        const domain = parsedUrl.hostname

                        if (disallowedDomains.includes(domain)) {
                            return false
                        }

                        // all checks have passed
                        return true
                    } catch {
                        return false
                    }
                },
                shouldAutoLink: url => {
                    try {
                        // construct URL
                        const parsedUrl = url.includes(':') ? new URL(url) : new URL(`https://${url}`)

                        // only auto-link if the domain is not in the disallowed list
                        const disallowedDomains = ['example-no-autolink.com', 'another-no-autolink.com']
                        const domain = parsedUrl.hostname

                        return !disallowedDomains.includes(domain)
                    } catch {
                        return false
                    }
                },
            }),

            Youtube.configure({
                controls: false,
                nocookie: true,
                HTMLAttributes: {
                    class: 'my-custom-media-class',
                },
            }),

        ],
    });

    // add image url
    const addImage = useCallback(() => {
        const url = window.prompt('Enter image URL:')
        if (url) {
            editor?.chain().focus().setImage({ src: url }).run()
        }
    }, [editor])

    // add link
    const setLink = useCallback(() => {
        const previousUrl = editor.getAttributes('link').href
        const url = window.prompt('URL', previousUrl)

        // cancelled
        if (url === null) {
            return
        }

        // empty
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run()

            return
        }

        // update link
        try {
            editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
        } catch (e) {
            alert(e.message)
        }
    }, [editor])

    // add youtube video
    const addYoutubeVideo = useCallback(() => {
        const previousUrl = ''; // No previous YouTube src tracking in this case
        const url = window.prompt('Enter YouTube URL', previousUrl);

        if (url === null) return; // Cancelled

        if (url.trim() === '') {
            return alert('URL is required!');
        }

        // Optional: Basic validation
        const isYouTubeUrl = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/.test(url);
        if (!isYouTubeUrl) {
            return alert('Please enter a valid YouTube URL.');
        }

        // Insert YouTube video
        try {
            editor.commands.setYoutubeVideo({
                src: url,
            });

        } catch (e) {
            alert(e.message);
        }
    }, [editor]);


    if (!editor) return null;

    const handleSave = async () => {

        if (!title.trim()) {
            setTitleError("Title is required!");
            return;
        } else {
            setTitleError(""); // Clear previous error if title is valid
        }

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
                await client.query({
                    query: GET_USER_BLOGS,
                    fetchPolicy: "network-only",
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
            </div>

            {/* Display Cover Image */}
            {coverImage && <img src={coverImage} alt="Cover Preview" className="w-full h-auto object-cover shadow-sm" />}

            {/* Blog Title */}
            <textarea
                ref={textareaRef}
                placeholder="New post title here..."
                className="text-3xl font-extrabold w-full outline-none resize-none overflow-hidden placeholder:text-zinc-600 mt-6"
                value={title}
                onChange={(e) => {
                    setTitle(e.target.value);
                    if (titleError && e.target.value.trim()) {
                        setTitleError(""); // Clear the error once there's input
                    }
                }}
            />

            {/* Toolbar */}
            <Toolbar editor={editor} onImageUpload={addImage} onLinkUpload={setLink} onYTVideoEmbed={addYoutubeVideo} />

            {/* Blog Editor */}
            <div className="prose prose-lg prose-blue max-w-full">
                <EditorContent
                    editor={editor}
                    className="mt-4 p-4 h-[30rem] w-full text-black text-lg border border-blue-300 rounded-md prose-ul:list-disc prose-ol:list-decimal overflow-y-scroll"
                />
            </div>

            {/* Save Button */}
            <div className="mt-6 flex items-center gap-10">

                <button
                    onClick={handleSave}
                    className={`px-5 py-2 text-white rounded-lg font-semibold transition ${isUploading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    disabled={isUploading}
                >
                    {isUploading ? "Publishing..." : "Publish"}
                </button>


                {titleError && (
                    <p className="py-2 pl-4 pr-16 bg-red-50 shadow text-red-500 text-sm rounded-lg">{titleError}</p>
                )}

            </div>

        </div>
    );
};

export default Editor;
