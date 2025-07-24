import React from "react";
import {
    BiBold,
    BiItalic,
    BiStrikethrough,
    BiListUl,
    BiListOl,
    BiLinkAlt,
} from "react-icons/bi";
import { BsTypeH1, BsTypeH2, BsTypeH3 } from "react-icons/bs";
import { CiImageOn } from "react-icons/ci";
import { FaYoutube } from "react-icons/fa";
import { BsCode, BsBlockquoteLeft } from "react-icons/bs";
import { AiOutlineRedo, AiOutlineUndo } from "react-icons/ai";

const Toolbar = ({ editor, onImageUpload, onLinkUpload, onYTVideoEmbed }) => {
    if (!editor) return null;

    return (
        <div className="flex flex-wrap gap-2 mt-6 mb-6">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-2 rounded text-xl ${editor.isActive("bold") ? "ring-2 text-blue-600 ring-blue-600" : "bg-white"} hover:ring-2 ring-blue-600 border transition-all duration-200`}
            >
                <BiBold />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-2 rounded text-xl ${editor.isActive("italic") ? "ring-2 text-blue-600 ring-blue-600" : "bg-white"} hover:ring-2 ring-blue-600 border transition-all duration-200`}
            >
                <BiItalic />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`p-2 rounded text-xl ${editor.isActive('heading', { level: 1 }) ? "ring-2 text-blue-600 ring-blue-600" : "bg-white"} hover:ring-2 ring-blue-600 border transition-all duration-200`}
            >
                <BsTypeH1 />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`p-2 rounded text-xl ${editor.isActive('heading', { level: 2 }) ? "ring-2 text-blue-600 ring-blue-600" : "bg-white"} hover:ring-2 ring-blue-600 border transition-all duration-200`}
            >
                <BsTypeH2 />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={`p-2 rounded text-xl ${editor.isActive('heading', { level: 3 }) ? "ring-2 text-blue-600 ring-blue-600" : "bg-white"} hover:ring-2 ring-blue-600 border transition-all duration-200`}
            >
                <BsTypeH3 />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={`p-2 rounded text-xl ${editor.isActive("strike") ? "ring-2 text-blue-600 ring-blue-600" : "bg-white"} hover:ring-2 ring-blue-600 border transition-all duration-200`}
            >
                <BiStrikethrough />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-2 rounded text-xl ${editor.isActive("bulletList") ? "ring-2 text-blue-600 ring-blue-600" : "bg-white"} hover:ring-2 ring-blue-600 border transition-all duration-200`}
            >
                <BiListUl />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-2 rounded text-xl ${editor.isActive("orderedList") ? "ring-2 text-blue-600 ring-blue-600" : "bg-white"} hover:ring-2 ring-blue-600 border transition-all duration-200`}
            >
                <BiListOl />
            </button>

            <button
                onClick={onLinkUpload}
                className={`p-2 rounded text-xl hover:ring-2 ring-blue-600 border transition-all duration-200`}
            >
                <BiLinkAlt />
            </button>

            <button
                onClick={onImageUpload}
                className={`p-2 rounded text-xl hover:ring-2 ring-blue-600 border transition-all duration-200`}
            >
                <CiImageOn />
            </button>
            <button
                onClick={onYTVideoEmbed}
                className={`p-2 rounded text-xl text-red-500 hover:ring-2 ring-blue-600 border transition-all duration-200`}
            >
                <FaYoutube/>
            </button>

            <button
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={`p-2 rounded text-xl ${editor.isActive("codeBlock") ? "ring-2 text-blue-600 ring-blue-600" : "bg-white"} hover:ring-2 ring-blue-600 border transition-all duration-200`}
            >
                <BsCode />
            </button>


            <select
                onChange={(e) =>
                    editor.chain().focus().setCodeBlock({ language: e.target.value }).run()
                }
                value={editor.getAttributes("codeBlock").language || ""}
                className={`p-2 rounded outline-none text-sm ${editor.isActive("codeBlock") ? "ring-2 ring-blue-600" : "bg-white"} hover:ring-2 ring-blue-600 border transition-all duration-200`}
            >
                <option value="">Language</option>
                <option value="javascript">Js</option>
                <option value="typescript">Ts</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="cpp">C++</option>
                <option value="python">Py</option>
                <option value="graphql">GraphQL</option>
            </select>


            <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`p-2 rounded text-xl ${editor.isActive("blockquote") ? "ring-2 text-blue-600 ring-blue-600" : "bg-white"} hover:ring-2 ring-blue-600 border transition-all duration-200`}
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
