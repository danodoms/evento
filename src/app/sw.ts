import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { Serwist, CacheFirst } from "serwist";

// This declares the value of `injectionPoint` to TypeScript.
// `injectionPoint` is the string that will be replaced by the
// actual precache manifest. By default, this string is set to
// `"self.__SW_MANIFEST"`.
declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

const revision = crypto.randomUUID();

// List of routes to pre-cache
const routesToPrecache: (PrecacheEntry | string)[] = [
  { url: "/", revision },
  { url: "/sign-in", revision },
  { url: "/events", revision },
  { url: "/students", revision },
  { url: "/admin", revision },
  { url: "/students/create", revision },
  { url: "/events/create", revision },
  // Add more routes and assets as needed
];

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: routesToPrecache.concat(self.__SW_MANIFEST || []),
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  fallbacks: {
    entries: [
      {
        url: "/",
        matcher({ request }) {
          return request.destination === "document";
        },
      },
    ],
  },
  runtimeCaching: [
    {
      matcher: ({ request }) => request.destination === "style",
      handler: new CacheFirst(),
    },
  ],
});

serwist.addEventListeners();
