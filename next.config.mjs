/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
     /**
     * Specifies external domains allowed to serve images.
     * Ensures Next.js optimizes images from these sources securely.
     */
    domains: [
      "lh3.googleusercontent.com", // Google profile images
      "avatars.githubusercontent.com", // github profile images
      "res.cloudinary.com"], // Cloudinary-hosted profile images
  },
};

export default nextConfig;
