import { createRequestHandler } from 'expo-server/adapter/workerd';

export default {
	async fetch(request, env, ctx): Promise<Response> {
		console.log('[server/src/index.ts]:', request.method, request.url);
		const handler = createRequestHandler({
			build: './dist/server',
		});
		return await handler(request, env, ctx);
	},
} satisfies ExportedHandler<Env>;
