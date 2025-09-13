"use client";
import { FinisherHeader } from "~/app/_components/finisherHeader";
import { AddItem } from "~/app/_components/addItem";
import { usePaginatedQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
	const { results, status, isLoading, loadMore } = usePaginatedQuery(
		api.items.list,
		{},
		{ initialNumItems: 10 },
	);

	console.log("zjflog", results, status, loadMore);

	return (
		<main className="finisher-header relative h-dvh overflow-auto">
			<div className="grid auto-rows-min grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
				{results?.map((item) => {
					const img = (
						<div className="esease-in-out relative h-full w-full transition-transform duration-500 hover:scale-110">
							{item.img ? (
								<img
									className="h-full w-full object-cover"
									src={`https://amrcoyv0v3.ufs.sh/f/${item.img}`}
									alt={item.url}
								/>
							) : (
								item.url
							)}
						</div>
					);

					if (!item.url) {
						return (
							<div key={item._id} className="aspect-square overflow-hidden">
								{img}
							</div>
						);
					}

					return (
						<a
							key={item._id}
							href={item.url}
							className="aspect-square overflow-hidden"
							target="_blank"
							rel="noreferrer"
						>
							{img}
						</a>
					);
				})}
				{status !== "Exhausted" && (
					<button
						type="button"
						className="aspect-square cursor-pointer bg-gray-100 text-gray-600 opacity-50 hover:bg-gray-200"
						onClick={() => {
							if (isLoading) {
								return;
							}

							loadMore(10);
						}}
					>
						{isLoading ? "Loading..." : "Load More"}
					</button>
				)}
			</div>
			<AddItem />
			<FinisherHeader />
		</main>
	);
}
