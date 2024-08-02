import { register } from "module";
import { skip } from "node:test";

/** @type {import('next').NextConfig} */
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  reloadOnOnline: true,
  swcMinify: true,
  cacheStartUrl: true,
  dynamicStartUrl: true,
  dynamicStartUrlRedirect: "/sign-in",
  cacheOnFrontendNav: true,
  aggressiveFrontEndNavCaching: true,
  // disable: process.env.NODE_ENV === "development",
  // scope: "/app",
  //...
});

// Your Next config is automatically typed!
export default withPWA({
  // Your Next.js config
});
