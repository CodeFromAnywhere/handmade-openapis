import { Redis } from "@upstash/redis";

export const GET = async (request: Request) => {
  // retrieve from KV and respond with openapi
  const slug = new URL(request.url).searchParams.get("slug");
  const redis = Redis.fromEnv();
  const openapi = await redis.get(`openapi-store.${slug}`);

  if (!openapi) {
    return new Response("Not found", { status: 404 });
  }
  return new Response(JSON.stringify(openapi, undefined, 2), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
