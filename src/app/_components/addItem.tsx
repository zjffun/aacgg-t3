"use client";

import * as React from "react";
import { X, Minus, Plus } from "lucide-react";
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
import { useEffect, useState } from "react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";

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
					},
					...currentValue.page,
				]);
			}
		},
	);

	const [open, setOpen] = useState(false);
	const [img, setImg] = useState<string | undefined>("");
	const [url, setUrl] = useState<string>("");
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

	return (
		<Drawer direction={direction} open={open} onOpenChange={setOpen}>
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
						<Label htmlFor="image">Image</Label>
						<div className="flex">
							{img && (
								<div className="relative aspect-square h-40 bg-gray-50 shadow-sm">
									<img
										src={`https://amrcoyv0v3.ufs.sh/f/${img}`}
										alt="Uploaded"
										className="h-full w-full object-cover"
										style={{ objectFit: "cover" }}
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
					</div>

					<div className="grid gap-3">
						<Label htmlFor="url">URL</Label>
						<Input
							id="url"
							onChange={(event) => {
								setUrl(event?.target?.value);
							}}
						/>
					</div>
				</div>

				<DrawerFooter>
					<Button
						className="cursor-pointer"
						onClick={async () => {
							try {
								if (!img) {
									toast.error("Image is required");
									return;
								}

								setOpen(false);

								await create({ type: "test", img: img || "", url });

								setImg("");
								setUrl("");
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
