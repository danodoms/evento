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
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider afterSignOutUrl={"/sign-in"}>
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


							<main className=" lg:pb-0 lg:flex-row flex flex-col h-screen">
								<div className="hidden lg:block">
									<Sidebar />
								</div>



								<div className="overflow-auto h-full w-full p-3">

									{children}


								</div>

								<div className="lg:hidden grow-0">
									<BottomNav />
								</div>



								<Toaster />
							</main>



						</ReactQueryProvider>
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
