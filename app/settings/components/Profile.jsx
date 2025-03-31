"use client"; // Required for Next.js 13+ App Router

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

const Settings = () => {
  const { data: session } = useSession(); // Get logged-in user data
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (session?.user?.email) {
      fetch(`/api/user?email=${session.user.email}`)
        .then(async (res) => {
          const text = await res.text(); // Read response as text
          console.log("Raw response:", text); // Debugging
          return JSON.parse(text); // Convert text to JSON
        })
        .then((data) => {
          console.log("Fetched user data:", data);
          setValue("name", data.name || "");
          setValue("email", data.email || "");
          setValue("username", data.username || "");
          setValue("website", data.website || "");
          setValue("location", data.location || "");
          setValue("bio", data.bio || "");
          setValue("brandColor", data.brandColor || "");
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [session, setValue]);
  

  const onSubmit = async (formData) => {
    setLoading(true);
    const response = await fetch("/api/user", {
      method: "PUT", // Update user data
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: session?.user?.email, // Ensure we're updating the right user
        ...formData,
      }),
    });

    setLoading(false);
    if (response.ok) alert("Profile updated successfully!");
    else alert("Error updating profile.");
  };

  if (!session) return <p className="text-center">Please sign in to edit your profile.</p>;

  return (
    <section className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full p-6 bg-white md:rounded-lg shadow-sm flex flex-col gap-6">
        <h3 className="text-xl font-bold text-zinc-900">User Profile</h3>

        {/* Name */}
        <div>
          <h6 className="text-zinc-800 mb-2 text-sm font-semibold">Name</h6>
          <input type="text" value={session.user.name} readOnly className="w-full px-2 py-2 border border-zinc-300 bg-gray-50 rounded outline-none" />
        </div>

        {/* Email (Read-only) */}
        <div>
          <h6 className="text-zinc-800 mb-2 text-sm font-semibold">Email</h6>
          <input type="email" value={session.user.email} readOnly className="w-full px-2 py-2 border border-zinc-300 bg-gray-50 rounded outline-none" />
        </div>

        {/* Website URL */}
        <div>
          <h6 className="text-zinc-800 mb-2 text-sm font-semibold">Website URL</h6>
          <input
            {...register("website")}
            type="text"
            placeholder="www.example.com"
            className="w-full px-2 py-2 border border-zinc-300 focus:ring-2 focus:ring-blue-600 rounded outline-none"
          />
        </div>

        {/* Location */}
        <div>
          <h6 className="text-zinc-800 mb-2 text-sm font-semibold">Location</h6>
          <input
            {...register("location")}
            type="text"
            className="w-full px-2 py-2 border border-zinc-300 focus:ring-2 focus:ring-blue-600 rounded outline-none"
          />
        </div>

        {/* Bio */}
        <div>
          <h6 className="text-zinc-800 mb-2 text-sm font-semibold">Bio</h6>
          <textarea
            {...register("bio")}
            placeholder="A short bio..."
            className="w-full px-2 py-2 border border-zinc-300 focus:ring-2 focus:ring-blue-600 rounded outline-none"
          ></textarea>
        </div>

        {/* brandColor */}
        <div>
          <h6 className="text-zinc-800 mb-2 text-sm font-semibold">Brand Color</h6>
          <input
            {...register("brandColor")}
            type="text"
            className="w-full px-2 py-2 border border-zinc-300 focus:ring-2 focus:ring-blue-600 rounded outline-none"
          />
        </div>

        <button type="submit" className="mt-4 px-4 py-2 text-white font-semibold bg-blue-600 hover:bg-blue-700 rounded transition">
          {loading ? "Saving..." : "Save Details"}
        </button>
      </form>
    </section>
  );
};

export default Settings;
