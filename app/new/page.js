"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Import useRouter
import BlogEditor from "./components/BlogEditor";

export default function NewPostPage() {

     const { status } = useSession();
      const router = useRouter();
    
      useEffect(() => {
        if (status === "unauthenticated") {
          router.push("/signin"); // Redirect to /signin if not logged in
        }
      }, [status, router]);
    
      if (status === "loading") return null; // Avoid UI flickering while checking session
    
  return (
    <div className="mt-20 py-4 md:py-8 md:px-8 w-full flex justify-center items-center">
      <BlogEditor/>
    </div>
  );
}
