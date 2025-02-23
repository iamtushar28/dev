"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Import useRouter
import ReadingBlogsList from "./ReadingBlogsList";

export default function Home() {

    const { status } = useSession();
    const router = useRouter();
  
    useEffect(() => {
      if (status === "unauthenticated") {
        router.push("/signin"); // Redirect to /signin if not logged in
      }
    }, [status, router]);
  
    if (status === "loading") return null; // Avoid UI flickering while checking session

  return (
    <section className="mt-16 py-6 w-full flex items-center justify-center">
      <div className="md:w-[80%] w-full md:flex md:gap-4">
      <ReadingBlogsList/>
      </div>
    </section>
  );
}
