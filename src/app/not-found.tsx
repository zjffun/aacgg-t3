"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NotFoundRedirect() {
	const router = useRouter();
	const [countdown, setCountdown] = useState(3);

	useEffect(() => {
		if (countdown === 0) {
			router.push("/");
			return;
		}
		const timer = setTimeout(() => {
			setCountdown((prev) => prev - 1);
		}, 1000);

		return () => clearTimeout(timer);
	}, [countdown, router]);

	return (
		<div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
			<div className="mx-auto max-w-screen-sm text-center">
				<p className="mb-4 font-light text-gray-500 text-lg dark:text-gray-400">
					Oops! We couldn't find the page you were looking for. Redirecting to
					the Homepage in{" "}
					<span className="font-semibold text-blue-600">{countdown}</span>{" "}
					second{countdown !== 1 && "s"}...
				</p>
				<Link
					href="/"
					className="my-4 inline-flex rounded-lg bg-gray-600 px-5 py-2.5 text-center font-medium text-sm text-white hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-900"
				>
					Back to Homepage
				</Link>
			</div>
		</div>
	);
}
