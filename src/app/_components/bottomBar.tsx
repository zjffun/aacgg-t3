"use client";

import { AddItem } from "./addItem";
import UserButton from "./userButton";

export function BottomBar() {
	return (
		<div className="fixed right-0 bottom-6 left-0 z-50 flex items-center justify-center gap-4">
			<AddItem />
			<UserButton />
		</div>
	);
}
