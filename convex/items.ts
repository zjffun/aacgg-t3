import { paginationOptsValidator } from "convex/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
	args: v.object({
		type: v.string(),
		img: v.optional(v.string()),
		url: v.optional(v.string()),
		youtubeId: v.optional(v.string()),
		tweetId: v.optional(v.string()),
		imgUrl: v.optional(v.string()),
	}),
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();

		const id = await ctx.db.insert("items", {
			userId: identity?.subject || "aacgg_anonymous",
			type: args.type,
			img: args.img,
			url: args.url,
			youtubeId: args.youtubeId,
			tweetId: args.tweetId,
			imgUrl: args.imgUrl,
		});
		return id;
	},
});

export const get = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db.query("items").collect();
	},
});

export const list = query({
	args: { paginationOpts: paginationOptsValidator },
	handler: async (ctx, args) => {
		const foo = await ctx.db
			.query("items")
			.order("desc")
			.paginate(args.paginationOpts);
		return foo;
	},
});
