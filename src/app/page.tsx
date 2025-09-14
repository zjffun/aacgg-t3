"use client";
import { FinisherHeader } from "~/app/_components/finisherHeader";
import { AddItem } from "~/app/_components/addItem";
import { usePaginatedQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { getYoutubeImgUrl } from "./_lib/url";

export default function Home() {
	const { results, status, isLoading, loadMore } = usePaginatedQuery(
		api.items.list,
		{},
		{ initialNumItems: 10 },
	);

	return (
		<main className="finisher-header relative h-dvh overflow-auto">
			<div className="grid auto-rows-min grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
				{results?.map((item) => {
					let img = null;

					if (item.type === "youtube" && item.youtubeId) {
						const youtubeImgUrl = getYoutubeImgUrl(item.youtubeId);
						img = (
							<div className="tile-transition">
								<img
									className="tile-img-youtube"
									src={youtubeImgUrl}
									alt={item.url}
								/>
							</div>
						);
					}

					if (item.type === "tweet" && item.imgUrl) {
						img = (
							<div className="tile-transition">
								<img
									className="tile-img-youtube"
									src={item.imgUrl}
									alt={item.url}
								/>
							</div>
						);
					}

					if (item.img) {
						img = (
							<div className="tile-transition">
								{item.img ? (
									<img
										className="tile-img"
										src={`https://amrcoyv0v3.ufs.sh/f/${item.img}`}
										alt={item.url}
									/>
								) : (
									item.url
								)}
							</div>
						);
					}

					if (!item.url) {
						return (
							<div key={item._id} className="tile-wrapper overflow-hidden">
								{img}
							</div>
						);
					}

					return (
						<a
							key={item._id}
							href={item.url}
							className="tile-wrapper overflow-hidden"
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
						className="tile-wrapper cursor-pointer bg-gray-100 text-gray-600 opacity-50 hover:bg-gray-200"
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
