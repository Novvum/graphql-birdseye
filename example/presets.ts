// const githubIntrospection = require("./src/utils/presets/github_schema.json");
const shopifyIntrospection = require("./src/utils/presets/shopify_schema.json");
const yelpIntrospection = require("./src/utils/presets/yelp_schema.json");
const marvelIntrospection = require("./src/utils/presets/marvel_schema.json");

export const PRESETS = {
  Shopify: shopifyIntrospection,
  Yelp: yelpIntrospection,
  // GitHub: githubIntrospection,
  Marvel: marvelIntrospection,
};
