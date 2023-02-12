/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jira-soft.ngsoft.com",
        port: "",
        pathname: /^\/secure\/projectavatar\/.*$/,
      },
    ],
  },
};

module.exports = nextConfig;
