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
		<div className="flex h-dvh flex-col items-center justify-center bg-slate-50 font-sans text-slate-800">
			<h1 className="mb-4 font-bold text-3xl">
				Oops! We didn't find this page.
			</h1>
			<p className="mb-2 text-lg">
				Redirecting you to the home page in <b>{countdown}</b> second
				{countdown !== 1 && "s"}...
			</p>
			<p className="text-base text-slate-500">
				If you are not redirected,{" "}
				<Link href="/" className="text-blue-600 underline">
					click here
				</Link>
				.
			</p>
		</div>
	);
}
