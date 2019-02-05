import React, { Component } from "react";

import GraphqlBirdseye from "graphql-birdseye";
import { bigSchema /** smallSchema bigSchema */ as dummySchema } from "./dummySchema";
export default class App extends Component {
  render() {
    return (
      <div>
        <GraphqlBirdseye introspectionQuery={dummySchema.data} />
      </div>
    );
  }
}
