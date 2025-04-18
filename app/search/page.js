import MobileSearchbar from "./components/MobileSearchbar";
import SearchedBlogsList from "./components/SearchedBlogsList";
import SearchSidebar from "./components/SearchSidebar";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function Home() {
  return (
    <section className="mt-16 py-6 w-full flex items-center justify-center">
      <div className="md:w-[80%] w-full md:flex md:gap-4">
        <SearchSidebar />
        {/* <MobileSearchbar/> */}
        <SearchedBlogsList/>
      </div>
    </section>
  );
}
