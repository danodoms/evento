"use client";

export const successSound =
	typeof window !== "undefined" ? new Audio("/success.mp3") : null;
export const failSound =
	typeof window !== "undefined" ? new Audio("/fail.mp3") : null;
export const offlineSound =
	typeof window !== "undefined" ? new Audio("/offline.mp3") : null;
export const networkErrorSound =
	typeof window !== "undefined" ? new Audio("/network_error.mp3") : null;
