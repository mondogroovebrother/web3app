/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: "",
};


module.exports = {
  // Your existing config
  output: 'export',
  images: {
    unoptimized: true,
  },
};
