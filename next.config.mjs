/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  // It makes the GET request to render twice.
  /*   reactStrictMode: false, */
};

export default nextConfig;
