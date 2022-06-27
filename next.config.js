/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");
const prod = process.env.NODE_ENV === 'production'

const nextConfig = withPWA({
  reactStrictMode: true,
  pwa: {
    disable: prod ? false : true,
    dest: "public",
  },
});

module.exports = nextConfig;
