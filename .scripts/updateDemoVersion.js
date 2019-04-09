const fs = require("fs");
const path = require("path");
const birdseyePackage = require("../package.json");
const demoPackage = require("../example/package.json");

console.log(`Setting graphql-birdseye version to ${birdseyePackage.version}`);
demoPackage.dependencies["graphql-birdseye"] = birdseyePackage.version;

fs.writeFileSync(
  path.join(__dirname, "../example/package.json"),
  JSON.stringify(demoPackage, null, 2)
);
