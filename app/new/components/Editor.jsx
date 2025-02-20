'use client'
import { useState } from "react";
import AutoResizeTextarea from "./AutoResizeTextarea";
import Menu from "./Menu";
import MaineContent from "./MaineContent";

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

  return (
    <div className="w-full md:w-[80%] min-h-screen md:h-fit max-h-fit py-4 md:py-8 md:px-8 bg-white rounded">

      {/* Add Cover Image Button */}
      <div className="mt-4 mb-4 flex justify-center md:justify-normal items-center gap-3">
        <input type="file" id="coverImage" className="hidden" onChange={handleImageChange} />
        <label htmlFor="coverImage" className="cursor-pointer px-4 py-3 text-zinc-600 capitalize font-semibold bg-white border border-zinc-200 rounded-lg hover:border-blue-600 hover:ring hover:ring-blue-600 transition-all duration-200">
          Add Cover Image
        </label>
        {imageName && <span className="text-gray-700">{imageName}</span>} {/* Display file name */}
      </div>

      {/* Display the Selected Image */}
      {coverImage && (
        <div className="mb-4">
          <img src={coverImage} alt="Cover Preview" className="w-full h-fit object-cover md:rounded shadow-sm" />
        </div>
      )}


      {/* post title */}
      <AutoResizeTextarea />

      {/* Editor menu */}
      <Menu />

      {/* content */}
      <MaineContent />

      {/* publish button */}
      <div className="px-3">
        <button className='px-4 py-2 w-fit capitalize text-white font-semibold rounded bg-blue-600 hover:bg-blue-700 transition-all duration-200'>
          publish
        </button>
      </div>

    </div>
  );
};

export default Editor;
