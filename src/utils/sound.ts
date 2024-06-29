"use client";

export const successSound =
  typeof window !== "undefined" ? new Audio("/success.mp3") : null;
export const failSound =
  typeof window !== "undefined" ? new Audio("/fail.mp3") : null;
