export function GET(request: Request) {
  console.log("[app/hello+api.ts]:", request.method, request.url);
  return Response.json({ hello: "world" });
}
