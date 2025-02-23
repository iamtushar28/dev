import React, { useState, useEffect } from "react";
import { BiBold, BiItalic, BiUnderline, BiStrikethrough, BiListUl, BiListOl } from "react-icons/bi";
import { BsTypeH1, BsTypeH2, BsTypeH3 } from "react-icons/bs";

const Menu = ({ onFormat }) => {
  const [activeFormats, setActiveFormats] = useState({});

  // Function to check active formatting
  const updateActiveFormats = () => {
    setActiveFormats({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
      strikeThrough: document.queryCommandState("strikeThrough"),
      insertOrderedList: document.queryCommandState("insertOrderedList"),
      insertUnorderedList: document.queryCommandState("insertUnorderedList"),
      h1: document.queryCommandValue("formatBlock") === "h1",
      h2: document.queryCommandValue("formatBlock") === "h2",
      h3: document.queryCommandValue("formatBlock") === "h3",
    });
  };

  useEffect(() => {
    document.addEventListener("selectionchange", updateActiveFormats);
    return () => document.removeEventListener("selectionchange", updateActiveFormats);
  }, []);

  return (
    <section className="h-fit p-2 border rounded flex gap-4 flex-wrap justify-center md:justify-around items-center border-zinc-100">
      {/* Text Formatting */}
      <button onClick={() => onFormat("bold")} className={`menu-btn ${activeFormats.bold ? "bg-blue-100" : ""}`}><BiBold /></button>
      <button onClick={() => onFormat("italic")} className={`menu-btn ${activeFormats.italic ? "bg-blue-100" : ""}`}><BiItalic /></button>
      <button onClick={() => onFormat("underline")} className={`menu-btn ${activeFormats.underline ? "bg-blue-100" : ""}`}><BiUnderline /></button>
      <button onClick={() => onFormat("strikeThrough")} className={`menu-btn ${activeFormats.strikeThrough ? "bg-blue-100" : ""}`}><BiStrikethrough /></button>

      {/* Lists */}
      <button onClick={() => onFormat("insertOrderedList")} className={`menu-btn ${activeFormats.insertOrderedList ? "bg-blue-100" : ""}`}><BiListOl /></button>
      <button onClick={() => onFormat("insertUnorderedList")} className={`menu-btn ${activeFormats.insertUnorderedList ? "bg-blue-100" : ""}`}><BiListUl /></button>

      {/* Headings */}
      <button onClick={() => onFormat("formatBlock", "<h1>")} className={`menu-btn ${activeFormats.h1 ? "bg-blue-100" : ""}`}><BsTypeH1 /></button>
      <button onClick={() => onFormat("formatBlock", "<h2>")} className={`menu-btn ${activeFormats.h2 ? "bg-blue-100" : ""}`}><BsTypeH2 /></button>
      <button onClick={() => onFormat("formatBlock", "<h3>")} className={`menu-btn ${activeFormats.h3 ? "bg-blue-100" : ""}`}><BsTypeH3 /></button>
    </section>
  );
};

export default Menu;
