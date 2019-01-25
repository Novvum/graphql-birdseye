<p align="center"><img src="https://i.imgur.com/JBBZ9Yn.png" width="269"></p>

# graphql-birdseye

<p align="center"><img src="https://rawcdn.githack.com/Novvum/graphql-birdseye/376d8fcd6b56d8137cb8e6c5e08742f159bc8aa3/docs/assets/animated-birdseye-multiple.gif?raw=true" width="400"></p>

> graphql visualizer

[![NPM](https://img.shields.io/npm/v/graphql-view.svg)](https://www.npmjs.com/package/graphql-view) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

GraphQL Visualizer for better development workflows. Still a **WIP**!

## Demo

[![Edit graphql-birdseye-demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/xp9mp9rzwo)

## Install

### NPM

```bash
npm install --save graphql-birdseye
```

### Yarn

```bash
yarn add graphql-birdseye
```

## Usage

```tsx
import * as React from "react";

import GraphqlBirdseye from "graphql-birdseye";

class Example extends React.Component {
  render() {
    return <GraphqlBirdseye schema={this.props.schema} />;
  }
}
```

## License

MIT © [novvum](https://github.com/novvum)

---

<p align="center">Made by <a href="https://www.novvum.io">Novvum</a> ❤️</p>
