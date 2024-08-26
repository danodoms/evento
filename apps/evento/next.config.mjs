import withSerwistInit from "@serwist/next";

const isDevelopment = process.env.NODE_ENV === "development";

const withSerwist = withSerwistInit({
  // Note: This is only an example. If you use Pages Router,
  // use something else that works, such as "service-worker/index.ts".
  disable: isDevelopment,
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  cacheOnNavigation: true,
  reloadOnOnline: true,
  include: [
    /\.(js|css|json)$/,
    ({ asset }) => asset.name.startsWith("client/"),
  ],
});

export default withSerwist({
  // Your Next.js config
});
