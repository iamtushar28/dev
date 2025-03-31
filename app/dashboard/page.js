"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Import useRouter
import MobileDashboardSidebar from "./components/MobileDashboardSidebar";
import BlogSidebar from "./components/DashboardSidebar";
import BlogStats from "./components/BlogStats";
import MenuSection from "./components/MenuSection";

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
    <section className="mt-16 py-4 md:p-6 h-fit w-full">
      <BlogStats />
      <section className="w-full mt-4 flex gap-4 mb-14">
        <BlogSidebar />
        <MobileDashboardSidebar />
        <MenuSection />
      </section>
    </section>
  );
}
