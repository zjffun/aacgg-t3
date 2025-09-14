function getYoutubeVideoInfo(url: string) {
	try {
		const urlInstance = new URL(url);
		if (urlInstance.host !== "www.youtube.com") {
			return;
		}

		const vid = urlInstance.searchParams.get("v");
		if (vid) {
			return {
				type: "video" as const,
				id: vid,
			};
		}

		const paths = urlInstance.pathname.split("/");
		const sid = paths[2];
		if (paths[1] === "shorts" && sid) {
			return {
				type: "short" as const,
				id: sid,
			};
		}
	} catch (error) {
		console.error(error);
		return;
	}
}

function getTweetId(url: string) {
	try {
		const urlInstance = new URL(url);
		if (urlInstance.host !== "x.com") {
			return;
		}

		const paths = urlInstance.pathname.split("/");
		const tweetId = paths[3];
		if (paths[2] === "status" && tweetId) {
			return tweetId;
		}
	} catch (error) {
		console.error(error);
		return;
	}
}

function getYoutubeImgUrl(youtubeId: string) {
	return `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`;
}

async function getTweetImgUrl(tweetId: string) {
	const res = await fetch(
		`https://react-tweet.vercel.app/api/tweet/${tweetId}`,
	);

	const json = await res.json();
	console.log("zjflog", json);

	if (!res.ok) {
		return "";
	}

	const url = json.data?.photos?.[0]?.url || "";

	if (!url) {
		return "";
	}

	const smallUrl = `${url}?format=jpg&name=small`;

	return smallUrl;
}

export { getYoutubeVideoInfo, getYoutubeImgUrl, getTweetId, getTweetImgUrl };
