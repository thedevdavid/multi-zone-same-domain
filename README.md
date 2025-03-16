# Single Domain Multi-Zone Next.js Applications

This is an example that demonstrates how to serve multiple Next.js applications from a single domain, called [Multi Zones](https://nextjs.org/docs/advanced-features/multi-zones).

Multi Zones are an approach to micro-frontends that separate a single large application on a domain into smaller applications that each serve a set of paths.
This is useful when there are collections of pages unrelated to the other pages in the application. By moving those pages to a separate zone, you can reduce the size of the application which improves build times and removes code that is only necessary for one of the zones.

Multi-Zone applications work by having one of the applications route requests for some paths to the other pages using the [`rewrites` feature](https://nextjs.org/docs/pages/api-reference/config/next-config-js/rewrites) of `next.config.js`. All URL paths should be unique across all the zones for the domain. For example:

- There are two zones in this application: `home` and `dashboard`.