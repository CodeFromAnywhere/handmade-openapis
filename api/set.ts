import { OpenapiDocument } from "edge-util";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

const getAvailableSlug = async (slug: string) => {
  let suffix = 0;
  let openapi: OpenapiDocument | null = null;

  while (true) {
    openapi = await redis.get<OpenapiDocument>(
      "openapi-store." + slug + (suffix === 0 ? "" : String(suffix)),
    );

    if (!openapi) {
      break;
    }
    suffix += 1;
  }

  return slug + (suffix === 0 ? "" : String(suffix));
};

const storeOpenapi = async (context: {
  slug: string;
  openapi: OpenapiDocument;
}) => {
  const { openapi, slug } = context;
  // store slug -> openapi or if slug was already taken, choose slug

  const chosenSlug = await getAvailableSlug(slug);

  await redis.set(`openapi-store.${chosenSlug}`, openapi);

  return `https://openapi.actionschema.com/${chosenSlug}`;
};

export const POST = async (request: Request) => {
  // store
  const json = await request.json();

  if (!json.slug || json.slug.length > 100) {
    return new Response("invalid slug", { status: 404 });
  }
  if (!json.openapi || !json.openapi.paths) {
    return new Response("not found", { status: 404 });
  }
  if (JSON.stringify(json.openapi).length > 100000) {
    return new Response("too big", { status: 422 });
  }

  const openapiUrl = await storeOpenapi({
    slug: json.slug,
    openapi: json.openapi,
  });
  return new Response(openapiUrl, { status: 201 });
};
