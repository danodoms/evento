import { register } from "module";
import { skip } from "node:test";

/** @type {import('next').NextConfig} */
import withPWA from "next-pwa";

const nextConfig = {
	// "experimental.webpackBuildWorker": true,
	reactStrictMode: true,
	...withPWA({
		dest: "public",
		register: true,
		skipWaiting: true,
	}),
};

export default nextConfig;

// import withPWA from "next-pwa";

// const nextConfig = {
//   // Your Next.js config here
// };

// export default withPWA({
//   dest: "public",
//   ...nextConfig,
// });
