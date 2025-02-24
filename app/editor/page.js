import Editor from "./components/Editor";
import BlogTitleEditor from "./components/BlogTitleEditor";

export default function Home() {
  return (
    <section className="w-full mt-16 py-8 mb-6 flex gap-6 flex-col justify-center items-center">
      {/* <BlogTitleEditor /> */}
      <Editor />
    </section>
  );
}
