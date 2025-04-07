import Blog from "./components/Blog";
import Discussions from "./components/Discussions";
import MobileSidebar from "./components/MobileSidebar";
import Sidebar from "./components/Sidebar";

export default function Home() {
  return (
    <>
      <section className="w-full flex gap-4 mt-16 py-4 md:px-4 relative">
        {/* Sidebar only visible on desktop */}
        <div className="hidden md:block md:w-[27%] lg:w-[20%]">
          <Sidebar />
        </div>

        {/* Mobile Sidebar */}
        <MobileSidebar />

        {/* blogs list */}
        <Blog />

        {/* Discussions */}
        <Discussions />
      </section>
    </>
  );
}
