const log = console.log.bind(console, "[app/hello+api.ts]:");

export async function GET(request: Request) {
  log(200, request.method, request.url);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return Response.json({ success: true });
}
