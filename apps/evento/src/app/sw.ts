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

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
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
    {
      matcher: ({ request }) => request.destination === "script",
      handler: new CacheFirst(),
    },
    {
      matcher: ({ request }) => request.destination === "image",
      handler: new CacheFirst(),
    },
    {
      matcher: ({ request }) => request.destination === "font",
      handler: new CacheFirst(),
    },
    {
      matcher: ({ request }) => request.destination === "document",
      handler: new CacheFirst(),
    },
  ],
});

serwist.addEventListeners();
