import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryProvider } from "./ReactQueryProvider";
import Sidebar from "@/components/Sidebar";

import { ClerkProvider } from '@clerk/nextjs'


const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const metadata: Metadata = {
	title: "evento",
	description: "Streamlining university events for students.",
	manifest: "/manifest.json",
	icons: {
		apple: "/icon.png",
	},
	themeColor: "#ffffff",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body
					className={cn(
						"h-screen bg-background font-sans antialiased ",
						fontSans.variable,
					)}
				>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<ReactQueryProvider>
							{/* <ReactQueryDevtools /> */}

							{/* <Header /> */}


							<main className="pb-14 lg:pb-0 lg:flex">
								<div className="hidden lg:block">
									<Sidebar />
								</div>

								<div className="p-3 grow h-screen">
									{children}
								</div>

								<Toaster />
							</main>

							<div className="lg:invisible">
								<BottomNav />
							</div>

						</ReactQueryProvider>
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
