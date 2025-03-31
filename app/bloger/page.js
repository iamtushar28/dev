"use client"; 
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Import useRouter
import BlogList from "./components/BlogList";
import ProfileBanner from "./components/ProfileBanner";
import ProfileCard from "./components/ProfileCard";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin"); // Redirect to /signin if not logged in
    }
  }, [status, router]);

  if (status === "loading") return null; // Avoid UI flickering while checking session

  return (
    <section className="w-full mt-16 mb-6 flex gap-6 flex-col justify-center items-center">
      <ProfileBanner />
      <section className="w-full md:w-[78%] flex flex-col-reverse md:flex-row gap-3 md:gap-[1%] justify-center">
        <ProfileCard />
        <BlogList />
      </section>
    </section>
  );
}
