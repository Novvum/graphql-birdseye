<div align="center"><img src="https://i.imgur.com/JBBZ9Yn.png" width="400"></br></br>
View any GraphQL schema as a dynamic and interactive graph.</br>
Try it out now: http://birdseye.novvum.io/</br></br>

<img src="../../docs/assets/birdseye.gif" width="100%"/>
</div>

[![NPM](https://img.shields.io/npm/v/graphql-birdseye-core.svg)](https://www.npmjs.com/package/graphql-birdseye-core) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

### Description

Birdseye is an interactive tool that dynamically displays GraphQL schemas. It helps teams visualize and understand the nodes and connections within their schema. Birdseye was built using jointJS and makes for a lightweight addition to any web project.

### Features

1. Graphical view of any GraphQL schema
2. Ability to click on a field or type to view its connections
3. Dynamic zooming to focus on small portions of the schema at a time
4. Add to any web project
5. Customizable styling and themeing

### Javascript Library Installation

This is the documentation for installing Birdseye as a Javascript library. To learn how to intall it as a React package, please refer to the react repository [README](../../packages/react/README.md).

Install using NPM or yarn

##### NPM

```bash
npm install --save graphql-birdseye-core
```

##### Yarn

```bash
yarn add graphql-birdseye-core
```

### Usage

Here’s an example of how to use Birdseye Javascript library in a React project. See the API Reference for how to pass your schema to the component.

```javascript
import {
  GraphqlBirdseye,
  IntrospectionDataStructure,
} from "graphql-birdseye-core";
import $ from "jquery";
// Instantiate the library
const birdseye = new GraphqlBirdseye();

// define the data structure
const introspectionQuery = getSchemaIntrospection(); // get the introspection response from the schema
const dataStructure = new IntrospectionDataStructure(
  introspectionQuery.__schema
);

// Initialize the library
birdseye.init(
  $("#graphql-birdseye"), // the html div element to mount the library to.
  { width: 500, height: 500 }, // object to define the size of the container
  dataStructure
);
```

### API

##### `const birdseye = new GraphqlBirdseye({ theme })`
Creates a birdseye object to use in your project.

|Name|Type|Description|
|---|---|---|
|theme (optional)|object|An object defining the theme of the components. Theme objects should follow the type defined [here](https://github.com/Novvum/graphql-birdseye-core/blob/master/src/theme/types.ts). Here's a full [example](https://github.com/Novvum/graphql-birdseye-core/blob/master/example/src/styled/theme/birdseyeTheme.ts).|

##### `init(el, bounds, dataStructure)`
Initializes the library and displays the data structure.

|Name|Type|Description|
|---|---|---|
|`el`|[HTML DOM Element](https://www.w3schools.com/jsref/dom_obj_all.asp)|The HTML element on which to mount the canvas.|
|`bounds`|object|Determines the size of the component.`width`: Int<br/>`height`: Int|
|`dataStructure`|[BirdseyeDataStructure](#birdseyedatastructure)|Pass in the data structure to be used for generating the tables and relations in the diagram.|

##### `setDataStructure(newDataStructure)`
Updates the data structure and rerenders the diagram.

|Name|Type|Description|
|---|---|---|
|`newDataStructure`|[BirdseyeDataStructure](#birdseyedatastructure)|Pass in the data structure to be used for generating the tables and relations in the diagram.|

##### `setActiveType(activeType)`
Manually sets the selected table.

|Name|Type|Description|
|---|---|---|
|`activeType`|String|The `name` value of the `Type` object from the BirdseyeDataStructure.|

##### `setSize(width, height)`
Update the size of the SVG container.

##### `on(event, callback)`
Allows you to add fire a function on when.....

|Name|Type|Description|
|---|---|---|
|`event`|String|One of:<br/>`"loading:start"`<br/>`"loading:stop"`|
|`callback`|() => any)|The function that will be invoked when the event triggers.|

#### BirdseyeDataStructure

This is the abstracted data structure that is used for defining the GraphQL types and relations in a format that is consumable by the diagramming logic. We chose to specify our own data structure because the schema can be represented in various formats (i.e. introspection response, GraphQL Schema object, etc.). We have currently implemented two translators:

- [`introspectionConverter`](./src/graphql/introspectionConverter.ts): Converts the [introspection](https://graphql.org/learn/introspection/) query response into the BirdseyeDataStructure.
- [`schemaConverter`](./src/graphql/schemaConverter.ts): Converts the [GraphQLSchema](https://graphql.org/graphql-js/type/#graphqlschema) object into the BirdseyeDataStructure.

### Roadmap
We have plans to keep improving Birdseye. Here's what is next:
1. Improve performance for larger schemas
2. Option to toggle zoom navigation style
3. Smoother UI transitions and interactions

### Contributing
This is an open source project. To learn how to contribute, please check out our [contributing guide](./CONTRIBUTING.md#contributing-guide).

### License

MIT © [Novvum](https://github.com/novvum)

---

<p align="center">Made with ❤️ by <a href="https://www.novvum.io">Novvum</a></p>