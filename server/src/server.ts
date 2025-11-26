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

import { createRequestHandler } from 'expo-server/adapter/workerd';
// import path from 'node:path';

export default {
	async fetch(request, env, ctx): Promise<Response> {
		console.log('<<< fetch', request.method, request.url);

		// // Seeing if we can import the routes.json file. This works...
		// const routesLiteral = await import('./dist/server/_expo/routes.json');
		// console.log('--- routes.json (literal path)', routesLiteral.default);

		// // ...but this doesn't...
		// try {
		// 	const routesPath = './dist/server/_expo/routes.json';
		// 	const routes = await import(routesPath); // Returns a string, not an object
		// 	// ^^^ If no rule in wrangler.jsonc, then: No such module "dist/server/_expo/routes.json"
		// 	console.log('--- routes.json (path variable)', routes.default);
		// } catch (error) {
		// 	console.log('--- routes.json error:', error);
		// }

		// // ...and this doesn't either...
		// try {
		// 	const routesPathCwd = path.join(process.cwd(), 'dist/server/_expo/routes.json');
		// 	const routesCwd = await import(routesPathCwd); // No such module "bundle/dist/server/_expo/routes.json"
		// 	console.log('--- routes.json (process.cwd())', routesCwd.default);
		// } catch (error) {
		// 	console.log('--- routes.json error:', error);
		// }

		// return new Response('Hello, World!', { status: 200 });

		const handler = createRequestHandler({
			build: './dist/server',
		});
		return await handler(request, env, ctx);
		// ^^^ Fails with:
		// [wrangler:error] TypeError: Cannot read properties of null (reading 'htmlRoutes')
		// at initManifestRegExp (file:///.../node_modules/expo-server/src/vendor/environment/common.ts:6:26)
		// at getRoutesManifest (file:///.../node_modules/expo-server/src/vendor/environment/common.ts:39:14)
		// at async handler (file:///.../node_modules/expo-server/src/vendor/abstract.ts:75:18)
	},
} satisfies ExportedHandler<Env>;
