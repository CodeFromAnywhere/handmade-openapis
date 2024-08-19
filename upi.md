# UPI - Universal Programming Interface

The Universal Programming Interface aims to solve the problem of:

- combining a set of actions sequentially and in parallel to solve any problem
- create a single interface `do(task)` to do anything
- optimise for scale, reliability, safety, and cost
- integrate with existing openapi's and jsonschema's where possible, generating new ones otherwise

# Proposed implementation

- The first step would be to select the right openapis for which subtasks (or main task).
  - If we don't have apis for all required subtasks, use human
- The second step would be to select the specific endpoints in each openapi
  - If one fails, go back to step 1 for that specific subtask
- The third step would be to combine the above into a combination-proxy and then enhance it specific to the goal.
  - Higher quality context is now generated.
- The fourth step would be to use a prompt to make a serial task execution plan for this combinationproxy openapi.
- The fifth step would be to reduce the list of depedent tasks step by step into a piece of code. In each step we need to provide the AI information on how the SDK can be used.

SDK Example:

```ts
const imageResult = await upi("openai", "createImage", {
  httpBearerToken: "xxxxxxx",
  prompt: "A gold fish in a bathtub",
  quality: "hd",
});
const imageUrl = imageResult?.data?.[0]?.url;
```

Of course this wouldn't work in many cases e.g. with endpoints that set a status that needs intervalbased checking, or endpoints that will do a callback to your own webhook. To also accomodate for these type of scenarios, we either must move to an architecture like ActionSchema, or we can still use the regular datastructure but have the AI setup an entire boilerplated server, and host it.

But to keep the POC simple, let's enhance the endpoints so I can filter on the nature of the endpoint being instant-result.

- The sixth step would be to deploy this, test it out, and see if it works.
  - Incase it doesn't, we should be able to figure out the problem and edit the result.
