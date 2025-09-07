"use client";
import { useEffect } from "react";

export function FinisherHeader() {
	useEffect(() => {
		try {
			async function init() {
				await import("finisher-header");
				new window.FinisherHeader({
					count: 35,
					size: {
						min: 5,
						max: 120,
						pulse: 0.1,
					},
					speed: {
						x: {
							min: 0,
							max: 0.2,
						},
						y: {
							min: 0,
							max: 0.4,
						},
					},
					colors: {
						background: "#b580ff",
						particles: ["#ffe960", "#87ddfe", "#8481ff", "#fc7bfc", "#e2ffa5"],
					},
					blending: "overlay",
					opacity: {
						center: 0,
						edge: 0.7,
					},
					skew: 0,
					shapes: ["c"],
				});
			}
			init();
		} catch (error) {
			console.error(error);
		}
	}, []);

	return null;
}
