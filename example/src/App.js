import React, { Component } from "react";

import GraphqlBirdseye from "graphql-birdseye";
import { githubSchema /** githubSchema smallSchema bigSchema */ as dummySchema } from "./dummySchema";
export default class App extends Component {
  render() {
    return (
      <div>
        <GraphqlBirdseye
          introspectionQuery={dummySchema.data}
          style={{ width: "100%", height: "90vh" }}
        />
      </div>
    );
  }
}
