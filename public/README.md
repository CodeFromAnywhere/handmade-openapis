# How to obtain an OpenAPI from a SaaS website

This is my "algorithm" to find the OpenAPI for any given SaaS Service:

- We can scrape all subdomains of the site domain and try common openapi locations, e.g. `/openapi.json` or `/openapi.yaml` or `/swagger.json`
- As stated [here](https://stackoverflow.com/questions/41660658/openapi-or-swagger-json-auto-discovery) we could first figure out the api server, then check `/api-docs`
- Look at `/.well-known/schema-discovery` (as in https://github.com/zalando/restful-api-guidelines/pull/277/files)
- Request OPTIONS at `/` of the API address (see https://www.rfc-editor.org/rfc/rfc7231#section-4.3.7)
- We can find it by searching google for `site:[domain] "openapi"`
- If we can find a swaggersite but the spec isn't available as JSON, you can still find it in sources of swagger.
- In some other docs generators it's also available in sources.
- It might be available on github or anywhere else publicly hosted. try things like `site:github.com "[sitename]" "openapi"` or `site:github.com "[sitename]" "openapi.json"`
- If it's not available publicly but there are docs that are obviously created using an OpenAPI spec (such as from readme.com) we can open an issue in their github, email the developer, or contact the SaaS, asking for the spec.
- Some other people already explored them by scraping:
  - Google BigQuery
  - SwaggerHub API
  - APIS.Guru api: https://api.apis.guru/v2/list.json

I'll probably make this into a script later.

# Other strategies to obtain an openapi

- Look in any of the api's SDKs for the source script. This is often directly inferred from the OpenAPI, or the OpenAPI can be inferred from it.
- Ask claude based on the above to generate the entire JSON Spec
- https://joolfe.github.io/postman-to-openapi/ may be useful (haven't tried)
