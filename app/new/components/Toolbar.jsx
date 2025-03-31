import React from "react";
import {
    BiBold,
    BiItalic,
    BiStrikethrough,
    BiListUl,
    BiListOl,
} from "react-icons/bi";
import { BsTypeH1, BsTypeH2 } from "react-icons/bs";
import { BsCode, BsBlockquoteLeft } from "react-icons/bs";
import { AiOutlineRedo, AiOutlineUndo } from "react-icons/ai";

const Toolbar = ({ editor }) => {
    if (!editor) return null;

    return (
        <div className="flex flex-wrap gap-2 mt-6 mb-6">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-2 rounded text-xl ${editor.isActive("bold") ? "ring-2 text-blue-600 ring-blue-600" : "bg-white"} border`}
            >
                <BiBold />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-2 rounded text-xl ${editor.isActive("italic") ? "ring-2 text-blue-600 ring-blue-600" : "bg-white"} border`}
            >
                <BiItalic />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`p-2 rounded text-xl ${editor.isActive('heading', { level: 2 }) ? "ring-2 text-blue-600 ring-blue-600" : "bg-white"} border`}
            >
                <BsTypeH1 />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={`p-2 rounded text-xl ${editor.isActive('heading', { level: 3 }) ? "ring-2 text-blue-600 ring-blue-600" : "bg-white"} border`}
            >
                <BsTypeH2 />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={`p-2 rounded text-xl ${editor.isActive("strike") ? "ring-2 text-blue-600 ring-blue-600" : "bg-white"} border`}
            >
                <BiStrikethrough />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-2 rounded text-xl ${editor.isActive("bulletList") ? "ring-2 text-blue-600 ring-blue-600" : "bg-white"} border`}
            >
                <BiListUl />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-2 rounded text-xl ${editor.isActive("orderedList") ? "ring-2 text-blue-600 ring-blue-600" : "bg-white"} border`}
            >
                <BiListOl />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={`p-2 rounded text-xl ${editor.isActive("codeBlock") ? "ring-2 text-blue-600 ring-blue-600" : "bg-white"} border`}
            >
                <BsCode />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`p-2 rounded text-xl ${editor.isActive("blockquote") ? "ring-2 text-blue-600 ring-blue-600" : "bg-white"} border`}
            >
                <BsBlockquoteLeft />
            </button>

            <button
                onClick={() => editor.chain().focus().undo().run()}
                className="p-2 rounded text-xl bg-white border hover:ring-2 hover:ring-blue-600 hover:text-blue-600 transition-all duration-200"
            >
                <AiOutlineUndo />
            </button>

            <button
                onClick={() => editor.chain().focus().redo().run()}
                className="p-2 rounded text-xl bg-white border hover:ring-2 hover:ring-blue-600 hover:text-blue-600 transition-all duration-200"
            >
                <AiOutlineRedo />
            </button>

            <button
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
                className="p-2 rounded text-sm bg-white border hover:ring-2 hover:ring-blue-600 hover:text-blue-600 transition-all duration-200"
            >
                Horizontal rule
            </button>



        </div>
    );
};

export default Toolbar;
