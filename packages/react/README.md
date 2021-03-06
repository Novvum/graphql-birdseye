<div align="center"><img src="https://i.imgur.com/JBBZ9Yn.png" width="400"></br></br>
View any GraphQL schema as a dynamic and interactive graph.</br>
Try it out now: http://birdseye.novvum.io/</br></br>

<img src="../../docs/assets/birdseye.gif" width="100%"/>
</div>

[![NPM](https://img.shields.io/npm/v/graphql-birdseye.svg)](https://www.npmjs.com/package/graphql-birdseye) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

### Description

Birdseye is an interactive tool that dynamically displays GraphQL schemas. It helps teams visualize and understand the nodes and connections within their schema. Birdseye was built using jointJS and makes for a lightweight addition to any web project.

### Features

1. Graphical view of any GraphQL schema
2. Ability to click on a field or type to view its connections
3. Dynamic zooming to focus on small portions of the schema at a time
4. Add to any web project
5. Customizable styling and theming

### React Package Documentation

This is the documentation to use Birdseye as a React package. To learn how to use Birdseye as a Javascript library, please refer to the core repository [README](../../packages/core/README.md).

### Installation

Install using NPM or yarn

##### NPM

```bash
npm install --save graphql-birdseye
```

##### Yarn

```bash
yarn add graphql-birdseye
```

### Usage

Here’s an example of how to use Birdseye in a React project. See the API Reference for how to pass your schema to the component.

```tsx
import * as React from "react";

import GraphqlBirdseye from "graphql-birdseye";

class Example extends React.Component {
  render() {
    return (
      <GraphqlBirdseye
        introspectionQuery={dummySchema.data}
        style={{ height: "100vh" }}
      />
    );
  }
}
```

Try this example in code sandbox: <br /><br />
[![Edit graphql-birdseye-demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/xp9mp9rzwo)

We used Birdseye as React package in our [demo site](http://birdseye.novvum.io/). You can download and test that code in the [example folder](../../example) in the main repository.


### API
|Name|Type|Description|
|---|---|---|
|introspectionQuery|JSON object|Pass your schema as a JSON of an introspection query response. Use this [introspection query](../../example/src/utils/introspectionQuery.tsx) to return your schema as a GraphQL schema object.|
|schema|GraphQL schema object|Pass your schema as a GraphQL schema object. Return using [makeExecutableSchema](https://www.apollographql.com/docs/apollo-server/api/graphql-tools#makeExecutableSchema) from GraphQL tools.|
|style|object|Pass in an object to style the container. <br />Example `style={{ height: "100vh" }}`|
|theme|object|An object defining the theme of the components. Theme objects should follow the type defined [here](../../example/src/styled/theme/interface.ts). Here's a full [example](../../example/src/styled/theme/birdseyeTheme.ts).|

### Roadmap
We have plans to keep improving Birdseye. Here's what is next:
1. Improve performance for larger schemas
2. Option to toggle zoom navigation style
3. Smoother UI transitions and interactions

### Contributing
This is an open source project. To learn how to contribute, please check out our [contributing guide](../../CONTRIBUTING.md#contributing-guide).

### License

MIT © [Novvum](https://github.com/novvum)

---

<p align="center">Made with ❤️ by <a href="https://www.novvum.io">Novvum</a></p>