"use client"

import { appName } from "@/config";
import { LoaderCircle } from "lucide-react";

interface LoadingProps {
	text: string;
}

const Loading: React.FC<LoadingProps> = ({ text }) => {
	return (
		<div className="flex flex-col items-center justify-center h-full gap-4">
			<LoaderCircle className="animate-spin size-12" />
			<h1 className="text-2xl font-bold animate-bounce">{appName}</h1>
			<p className="opacity-50 animate-pulse text-sm">{text}</p>
		</div>
	);
};

export default Loading;
