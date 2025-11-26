/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

interface AppEnv extends Env {
	ASSETS: {
		fetch: typeof fetch;
	};
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
		console.log('<<< fetch', request.method, request.url);

		// See if the asset exists in the "/client" directory
		const assetUrl = new URL(request.url);
		assetUrl.pathname = '/client' + assetUrl.pathname;
		const asset = await env.ASSETS.fetch(assetUrl.toString());
		if (asset.status === 200) {
			console.log('>>> asset', asset.url);
			return asset;
		}

		// const serverDir = path.join(process.cwd(), "server");
		// const serverDir = path.join(process.cwd(), "dist", "server");
		const serverDir = './dist/server';
		// const serverDir = "/dist/server";
		// const serverDir = "/server";
		console.log('--- serverDir', serverDir);

		try {
			// // const routesPath = path.join(serverDir, "_expo/routes.json");
			// const routesPath = "./dist/server/_expo/routes.json";
			// const routes = await import(routesPath);
			const routes = await import('./dist/server/_expo/routes.json');
			console.log('--- routes.json', routes.default);
		} catch (error) {
			console.log('--- routes.json error', error);
		}
		return new Response('Hello, World!', { status: 200 });

		// const handler = createRequestHandler({
		//   //   build: ".",
		//   //   build: "./dist/server",
		//   //   build: "./dist/server",
		//   build: path.join(process.cwd(), "server"),
		// });
		// return await handler(request, env, ctx);

		// const url = new URL(request.url);
		// switch (url.pathname) {
		//   case "/message":
		//     return new Response("Hello, World!");
		//   case "/random":
		//     return new Response(crypto.randomUUID());
		//   default:
		//     return new Response("Not Found", { status: 404 });
		// }
	},
} satisfies ExportedHandler<AppEnv>;
