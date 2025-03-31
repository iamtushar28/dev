"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Import useRouter
import Editor from "./components/Editor";

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
    <section className="w-full mt-16 py-8 mb-6 flex gap-6 flex-col justify-center items-center">
      <Editor />
    </section>
  );
}
