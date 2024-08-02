// loading.tsx
import type React from "react";

const Loading: React.FC = () => {
	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="flex flex-col items-center">
				<svg
					className="animate-spin h-10 w-10 text-blue-600 mb-4"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle
						className="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						strokeWidth="4"
					></circle>
					<path
						className="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
					></path>
				</svg>
				<p className="text-gray-700 text-lg">Loading...</p>
			</div>
		</div>
	);
};

export default Loading;
