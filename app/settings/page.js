"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Import useRouter
import MobileSettingsSidebar from "./components/MobileSettingsSidebar";
import Profile from "./components/Profile";
import SettingsSidebar from "./components/SettingsSidebar";

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
    <section className="mt-16 py-8 w-full flex items-center justify-center">
      <div className="w-full md:w-[80%] flex gap-4 mb-10">
        <SettingsSidebar />
        <MobileSettingsSidebar />
        <Profile />
      </div>
    </section>
  );
}
