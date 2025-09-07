import Link from "next/link";
import { id } from "zod/v4/locales";

import { FinisherHeader } from "~/app/_components/finisherHeader";
import { LatestPost } from "~/app/_components/post";
import { auth } from "~/server/auth";
import { HydrateClient, api } from "~/trpc/server";

export default async function Home() {
	// const hello = await api.post.hello({ text: "from tRPC" });
	// const session = await auth();

	// if (session?.user) {
	// 	void api.post.getLatest.prefetch();
	// }

	const items = [
		{
			id: "city-the-animation",
			className: "bg-white",
			href: "https://city-the-animation.com/",
			children: (
				<>
					<img
						className="w-full"
						src="https://city-the-animation.com/_assets_kv2/images/kv-logo.webp"
						alt=""
					/>
					<img
						className="w-full"
						src="https://city-the-animation.com/_assets_kv2/images/story/introduction.webp"
						alt=""
					/>
				</>
			),
		},
		{
			id: "newpsg",
			href: "https://newpsg.com/",
			children: (
				<>
					<img
						className="absolute z-2 opacity-50"
						src="https://www.st-trigger.co.jp/wp-content/uploads/2025/06/npsg_banner.png"
						alt=""
					/>
					<img
						className="absolute top-0 left-0 h-full w-full object-cover"
						src="https://us.oricon-group.com/upimg/detail/5000/5835/img660/New-Panty-and-Stocking-with-Garterbelt-EP7-1.jpg"
						alt=""
					/>
				</>
			),
		},
		{
			id: "kill-la-kill",
			href: "https://www.st-trigger.co.jp/works/kill-la-kill/",
			children: (
				<>
					<img
						className="w-full"
						src="https://www.st-trigger.co.jp/wp-content/uploads/2015/11/box_03.jpg"
						alt=""
					/>
				</>
			),
		},
		{
			id: "lwatv",
			href: "http://tv.littlewitchacademia.jp",
			children: (
				<>
					<img
						className="w-full"
						src="https://www.st-trigger.co.jp/wp-content/uploads/2016/12/LWATV_Key-250x250.png"
						alt=""
					/>
				</>
			),
		},
	];

	return (
		<HydrateClient>
			<main className="finisher-header relative grid h-dvh auto-rows-min grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
				{items.map((item) => {
					return (
						<a
							key={item.id}
							href={item.href}
							className={`${item?.className ?? ""} aspect-square overflow-hidden`}
							target="_blank"
							rel="noreferrer"
						>
							<div className="esease-in-out relative h-full w-full transition-transform duration-500 hover:scale-110">
								{item.children}
							</div>
						</a>
					);
				})}
			</main>
			<FinisherHeader />
		</HydrateClient>
	);
}
