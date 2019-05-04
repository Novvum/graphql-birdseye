<div align="center"><img src="https://i.imgur.com/JBBZ9Yn.png" width="400"></br></br>
View any GraphQL schema as a dynamic and interactive graph.</br>
Try it out now: http://birdseye.novvum.io/</br></br>

<img src="docs/assets/birdseye.gif" width="100%"/>
</div>

[![NPM](https://img.shields.io/npm/v/graphql-birdseye.svg)](https://www.npmjs.com/package/graphql-birdseye) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


### Description
Birdseye is an interactive tool that dynamically displays GraphQL schemas. It helps teams visualize and understand the nodes and connections within their schema. Birdseye was built using jointJS and makes for a lightweight addition to any React project.

Try the React component on CodeSandbox: <br /><br />
[![Edit graphql-birdseye-demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/xp9mp9rzwo)

### Features

1. Graphical view of any GraphQL schema
2. Ability to click on a field or type to view its connections
3. Dynamic zooming to focus on small portions of the schema at a time
4. Add to any React project
5. Customizable styling and themeing

### Background

Birdseye was inspired by [GraphQL Voyager](https://github.com/APIs-guru/graphql-voyager) and the [Apis-guru](https://github.com/APIs-guru) team. We found that Voyager would add 1.2 MB to our projects, which was too big for us. This motivated us to create Birdseye, which has a bundle size of less than 200 KB. Birdseye is open source and free to use and explore.

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
Here’s an example of how to use Birdseye in a React project. See the API Reference for how to pass your schema to the component. You can try this example on [CodeSandbox](https://codesandbox.io/s/xp9mp9rzwo).

```tsx
import * as React from 'react';

import GraphqlBirdseye from 'graphql-birdseye';

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

You can also download and test the code for our [demo site](http://birdseye.novvum.io/) in the [example folder](https://github.com/Novvum/graphql-birdseye/tree/master/example) in the repository.

### API
|Name|Type|Description|
|---|---|---|
|introspectionQuery|JSON object|Pass your schema as a JSON of an introspection query response. Use this [introspection query](https://github.com/Novvum/graphql-birdseye/blob/master/example/src/utils/introspectionQuery.tsx) to return your schema as a GraphQL schema object.|
|schema|GraphQL schema object|Pass your schema as a GraphQL schema object. Return using [makeExecutableSchema](https://www.apollographql.com/docs/apollo-server/api/graphql-tools#makeExecutableSchema) from GraphQL tools.|
|style|object|Pass in an object to style the container|
|theme|object|An object defining the theme of the components. Theme objects should follow the type defined [here](https://github.com/Novvum/graphql-birdseye/blob/master/src/theme/types.ts). Here's a full [example](https://github.com/Novvum/graphql-birdseye/blob/master/example/src/styled/theme/birdseyeTheme.ts).|

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
