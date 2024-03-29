/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");
const prod = process.env.NODE_ENV === "production";

const nextConfig = withPWA({
  reactStrictMode: true,
  images: {
    domains: ["assets.website-files.com"],
  },
  pwa: {
    // disable: prod ? false : true,
    // disable: true,
    disable: false,
    dest: "public",
    importScripts: ["/firebase-messaging-sw.js"],
  },
});

module.exports = nextConfig;
