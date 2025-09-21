"use client";
import { FinisherHeader } from "~/app/_components/finisherHeader";
import { usePaginatedQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { getYoutubeImgUrl } from "./_lib/url";
import { BottomBar } from "./_components/bottomBar";
import { Twitter, Youtube } from "./_components/icons";
import { ExternalLink } from "lucide-react";
import { clsx } from "clsx";

export default function Home() {
	const { results, status, isLoading, loadMore } = usePaginatedQuery(
		api.items.list,
		{},
		{ initialNumItems: 10 },
	);

	return (
		<main className="finisher-header relative h-dvh overflow-auto">
			<div className="grid auto-rows-min grid-cols-2 pb-32 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
				{results?.map((item) => {
					let img = null;

					if (item.type === "youtube" && item.youtubeId) {
						const youtubeImgUrl = getYoutubeImgUrl(item.youtubeId);
						img = (
							<>
								<Youtube className="tile-icon" fill="#FF0000" />
								<div className="tile-transition">
									<img
										className="tile-img-youtube"
										src={youtubeImgUrl}
										alt={item.url}
									/>
								</div>
							</>
						);
					}

					if (item.type === "tweet" && item.imgUrl) {
						img = (
							<>
								<Twitter className="tile-icon" />
								<div className="tile-transition">
									<img
										className="tile-img-youtube"
										src={item.imgUrl}
										alt={item.url}
									/>
								</div>
							</>
						);
					}

					if (item.img) {
						img = (
							<>
								<ExternalLink className="tile-icon" />
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
							</>
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
				<div
					className={clsx(
						"tile-wrapper flex items-center justify-center bg-gray-100 text-gray-600",
					)}
				>
					{(() => {
						if (status === "Exhausted") {
							return "No More Items";
						}

						if (isLoading) {
							return "Loading...";
						}

						return (
							<button
								type="button"
								className="h-full w-full cursor-pointer text-gray-900 underline"
								onClick={() => {
									if (isLoading) {
										return;
									}

									loadMore(10);
								}}
							>
								Load More
							</button>
						);
					})()}
				</div>
			</div>
			<BottomBar />
			<FinisherHeader />
		</main>
	);
}
