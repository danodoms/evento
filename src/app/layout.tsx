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

						<main className="pb-14 max-w-7xl mx-auto">
							<div className="p-3">{children}</div>
							<Toaster />
						</main>

						<BottomNav />
					</ReactQueryProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
