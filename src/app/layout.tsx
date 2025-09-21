import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "~/styles/globals.css";

import { TRPCReactProvider } from "~/trpc/react";
import { ConvexClientProvider } from "./_components/convexClientProvider";
import { Toaster } from "~/components/ui/sonner";

export const metadata: Metadata = {
	title: "AACGG",
	description: "An Anime, Comic & Game Gallery",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body>
					<TRPCReactProvider>
						<ConvexClientProvider>{children}</ConvexClientProvider>
					</TRPCReactProvider>
					<Toaster position="top-right" />
				</body>
			</html>
		</ClerkProvider>
	);
}
