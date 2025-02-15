import Blog from "./components/Blog";
import Discussions from "./components/Discussions";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

export default function Home() {
  return (
    <>
      <Navbar />

      <section className="w-full flex gap-4 mt-16 px-2 py-4 md:px-4">
        <Sidebar />
        <Blog />
        <Discussions />
      </section>
    </>
  );
}
