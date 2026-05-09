/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com", pathname: "**" },
      { protocol: "https", hostname: "cdn.weatherapi.com", pathname: "**" },
      { protocol: "https", hostname: "img.freepik.com", pathname: "**" },
      { protocol: "https", hostname: "images.pexels.com", pathname: "**" },
    ],
  },
};

module.exports = nextConfig;
