import { TbShare3 } from "react-icons/tb";

const ShareButton = ({ title, url }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title || "Check out this blog!",
          text: "I found this blog interesting:",
          url: url || window.location.href,
        });
        console.log("Blog shared successfully");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      try {
        await navigator.clipboard.writeText(url || window.location.href);
        alert("Link copied to clipboard!");
      } catch {
        alert("Copy failed. Try manually copying the URL.");
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="text-2xl h-10 w-10 rounded-full text-zinc-600 hover:text-pink-500 hover:bg-pink-100 transition-all duration-200 flex justify-center items-center"
    >
      <TbShare3 />
    </button>
  );
};

export default ShareButton;
