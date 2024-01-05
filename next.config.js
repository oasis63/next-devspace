/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["reqres.in", "i.pinimg.com"],
  },
  // images: {
  //   remotePatterns: [/^https:\/\/reqres\.in\//, /^https:\/\/i\.pinimg\.com\//],
  // },
};

module.exports = nextConfig;
