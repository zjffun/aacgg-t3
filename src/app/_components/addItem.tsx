"use client";

import * as React from "react";
import { X, Plus } from "lucide-react";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "~/components/ui/drawer";

import { api } from "../../../convex/_generated/api";
import { useMutation } from "convex/react";
import { UploadButton } from "~/utils/uploadthing";
import { toast } from "sonner";
import { useEffect, useMemo, useState } from "react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import {
	getTweetId,
	getTweetImgUrl,
	getYoutubeImgUrl,
	getYoutubeVideoInfo,
} from "../_lib/url";

export function AddItem() {
	const create = useMutation(api.items.create).withOptimisticUpdate(
		(localStore, args) => {
			const currentValue = localStore.getQuery(api.items.list, {
				paginationOpts: {
					numItems: 10,
					cursor: null,
				},
			});

			if (currentValue?.page !== undefined) {
				const now = Date.now();
				localStore.setQuery(api.items.get, {}, [
					{
						_id: crypto.randomUUID(),
						_creationTime: now,
						img: args.img,
						url: args.url,
						youtubeId: args.youtubeId,
						tweetId: args.tweetId,
						imgUrl: args.imgUrl,
					},
					...currentValue.page,
				]);
			}
		},
	);

	const [open, setOpen] = useState(false);
	const [img, setImg] = useState<string | undefined>("");
	const [imgUrl, setImgUrl] = useState<string>("");
	const [url, setUrl] = useState<string>("");
	const [youtubeId, setYoutubeId] = useState("");
	const [tweetId, setTweetId] = useState("");
	const [type, setType] = useState<"youtube" | "tweet" | "image">("image");
	const [direction, setDirection] = useState<"bottom" | "right">(
		typeof window !== "undefined" && window.innerWidth < 768
			? "bottom"
			: "right",
	);

	useEffect(() => {
		function handleResize() {
			setDirection(window.innerWidth < 768 ? "bottom" : "right");
		}
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		if (!url || img) {
			return;
		}

		const youtubeInfo = getYoutubeVideoInfo(url);

		if (youtubeInfo?.id) {
			setYoutubeId(youtubeInfo.id);
			setType("youtube");
			return;
		}

		const tweetId = getTweetId(url);

		if (tweetId) {
			setTweetId(tweetId);
			setType("tweet");
			return;
		}

		setTweetId("");
		setYoutubeId("");
		setImgUrl("");
		setType("image");
	}, [url, img]);

	useEffect(() => {
		if (!tweetId) {
			setImgUrl("");
			return;
		}

		(async () => {
			try {
				const imgUrl = await getTweetImgUrl(tweetId);
				setImgUrl(imgUrl);
			} catch (error) {
				console.error(error);
				setImgUrl("");
			}
		})();
	}, [tweetId]);

	return (
		<Drawer
			direction={direction}
			open={open}
			repositionInputs={false}
			onOpenChange={setOpen}
		>
			<DrawerTrigger asChild>
				<button
					type="button"
					className="fixed right-6 bottom-6 z-50 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-primary/90 text-white opacity-90 shadow-lg"
					aria-label="Add Item"
					onClick={() => setOpen(true)}
				>
					<Plus size={32} />
				</button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Add Item</DrawerTitle>
					<DrawerDescription>Adding an item to the gallery</DrawerDescription>
				</DrawerHeader>

				<div className="grid gap-6 px-4">
					<div className="grid gap-3">
						<Label htmlFor="url">URL</Label>
						<Input
							id="url"
							value={url}
							onChange={(event) => {
								setUrl(event?.target?.value);
							}}
						/>
						<p className="text-muted-foreground text-xs">
							Auto detects YouTube & X links, and set a image.
						</p>
					</div>

					<div className="grid gap-3">
						<Label htmlFor="image">Image</Label>
						{type === "youtube" && (
							<div className="tile-wrapper h-40">
								<img
									alt="Youtube thumbnail"
									src={getYoutubeImgUrl(youtubeId)}
									className="tile-img-youtube"
								/>
							</div>
						)}

						{type === "tweet" && (
							<div className="tile-wrapper h-40">
								<img
									alt="Tweet thumbnail"
									src={imgUrl}
									className="tile-img-youtube"
								/>
							</div>
						)}

						{type === "image" && (
							<div className="flex">
								{img && (
									<div className="tile-wrapper h-40">
										<img
											src={`https://amrcoyv0v3.ufs.sh/f/${img}`}
											alt="Uploaded"
											className="tile-img"
										/>
										<Button
											size="icon"
											variant="destructive"
											className="absolute top-2 right-2 size-6 cursor-pointer rounded-full"
											onClick={() => {
												setImg(undefined);
											}}
											aria-label="Delete image"
										>
											<X size={12} />
										</Button>
									</div>
								)}

								{!img && (
									<UploadButton
										endpoint="imageUploader"
										onClientUploadComplete={(res) => {
											console.log("Files: ", res);
											setImg(res?.[0]?.key);
											// toast.success("Upload successful!");
										}}
										onUploadError={(error: Error) => {
											toast.error(`ERROR! ${error.message}`);
										}}
									/>
								)}
							</div>
						)}
					</div>
				</div>

				<DrawerFooter>
					<Button
						className="cursor-pointer"
						onClick={async () => {
							try {
								if (type === "image" && !img) {
									toast.error("Image is required");
									return;
								}

								setOpen(false);

								await create({ type, img, imgUrl, youtubeId, url });

								setImg("");
								setUrl("");
								setYoutubeId("");
								setTweetId("");
								setImgUrl("");
								setType("image");
							} catch (error) {
								toast.error("Failed to create item");
							}
						}}
					>
						Submit
					</Button>
					<DrawerClose asChild>
						<Button
							className="cursor-pointer"
							variant="outline"
							onClick={() => {
								setOpen(false);
							}}
						>
							Cancel
						</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
