import Editor from "./components/Editor"; // Import normally, no dynamic()

export default function NewPostPage() {
  return (
    <div className="mt-20 py-4 md:py-8 md:px-8 w-full flex justify-center items-center">
      <Editor />
    </div>
  );
}
