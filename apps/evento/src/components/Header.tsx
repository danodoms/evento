"use client";

import { appName, version } from "@/config";
import { ModeToggle } from "./ModeToggle";

export default function Header() {
	return (
		<nav className=" fixed top-0 z-50 flex w-full flex-auto gap-4  bg-opacity-50 backdrop-blur-lg p-2 border-1 z-100">
			<h2 className="font-bold text-xl flex-auto place-content-center">
				{appName}
			</h2>

			{/* <h2 className="font-semibold text-xs opacity-50 flex-auto place-content-center">
				{version}
			</h2> */}

			<div className="ml-auto">
				<ModeToggle />
			</div>
		</nav>
	);
}
