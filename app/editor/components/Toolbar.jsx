import React from "react";
import {
    BiBold,
    BiItalic,
    BiStrikethrough,
    BiListUl,
    BiListOl,
} from "react-icons/bi";
import { BsCode, BsBlockquoteLeft } from "react-icons/bs";
import { AiOutlineClear, AiOutlineRedo, AiOutlineUndo } from "react-icons/ai";

const Toolbar = ({ editor }) => {
    if (!editor) return null;

    return (
        <div className="flex flex-wrap gap-2 mt-6 mb-6">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-2 rounded ${editor.isActive("bold") ? "bg-blue-200" : "bg-white"} border`}
            >
                <BiBold />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-2 rounded ${editor.isActive("italic") ? "bg-blue-200" : "bg-white"} border`}
            >
                <BiItalic />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={`p-2 rounded ${editor.isActive("strike") ? "bg-blue-200" : "bg-white"} border`}
            >
                <BiStrikethrough />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-2 rounded ${editor.isActive("bulletList") ? "bg-blue-200" : "bg-white"} border`}
            >
                <BiListUl />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-2 rounded ${editor.isActive("orderedList") ? "bg-blue-200" : "bg-white"} border`}
            >
                <BiListOl />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={`p-2 rounded ${editor.isActive("codeBlock") ? "bg-blue-200" : "bg-white"} border`}
            >
                <BsCode />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`p-2 rounded ${editor.isActive("blockquote") ? "bg-blue-200" : "bg-white"} border`}
            >
                <BsBlockquoteLeft />
            </button>

            <button
                onClick={() => editor.chain().focus().undo().run()}
                className="p-2 rounded bg-white border"
            >
                <AiOutlineUndo />
            </button>

            <button
                onClick={() => editor.chain().focus().redo().run()}
                className="p-2 rounded bg-white border"
            >
                <AiOutlineRedo />
            </button>


        </div>
    );
};

export default Toolbar;
