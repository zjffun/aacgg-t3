"use client";

import { SignInButton, UserButton as ClerkUserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import { Smile } from "lucide-react";

export default function UserButton() {
	return (
		<div className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-primary/90 text-white opacity-90 shadow-lg">
			<Unauthenticated>
				<SignInButton mode="modal">
					<Smile size={32} />
				</SignInButton>
			</Unauthenticated>
			<Authenticated>
				<ClerkUserButton
					appearance={{
						elements: {
							rootBox: "!w-full h-full",
							userButtonTrigger: "!w-full h-full",
						},
					}}
				/>
			</Authenticated>
		</div>
	);
}
