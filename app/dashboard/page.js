"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";

import { GET_USER_BLOGS } from "@/graphql/queries/getUserBlogs";
import BlogStats from "./components/BlogStats";
import BlogSidebar from "./components/DashboardSidebar";
import MobileDashboardSidebar from "./components/MobileDashboardSidebar";
import MenuSection from "./components/MenuSection";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  const { data, loading, error } = useQuery(GET_USER_BLOGS);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  if (status === "loading") return null;

  return (
    <section className="mt-16 py-4 md:p-6 h-fit w-full">
      {/* You can pass `data.getUserBlogs` to multiple components here */}
      <BlogStats blogs={data?.getUserBlogs || []} loading={loading} error={error} />
      <section className="w-full mt-4 flex gap-4 mb-14">
        <BlogSidebar />
        <MobileDashboardSidebar />
        <MenuSection blogs={data?.getUserBlogs || []} loading={loading} error={error} />
      </section>
    </section>
  );
}
