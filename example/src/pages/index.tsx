import React, { useState } from "react";

import Hero from "../components/hero";
import Layout from "../layouts";

import { Container, Caption } from "../components/generic";
import { asyncComponent } from "react-async-component";
import { IntrospectionQuery } from "../utils/introspectionQuery";
import SchemaForm from "../components/schemaForm";

//async component for gatsby production build
const GraphqlBirdseye = asyncComponent({
  resolve: () => require("graphql-birdseye"),
  LoadingComponent: () => <div />, // Optional
  ErrorComponent: ({ error }) => <div>Uh oh..</div> // Optional
});

const HomePage = () => {
  const [schema, setSchema] = useState();
  const [schemaError, setSchemaError] = useState("");

  const fetchSchema = (url: string) => {
    if (!url) return setSchemaError("Schema not valid");
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: IntrospectionQuery })
    })
      .then(res => res.json())
      .then(res => setSchema(res.data))
      .catch(e => setSchemaError("Schema not valid"));
  };

  return (
    <Layout>
      <Hero>
        <h1>GraphQL Birdseye</h1>
        <Caption>A better way to visualize your data graph</Caption>
        <SchemaForm onSubmit={fetchSchema} error={schemaError} />
      </Hero>
      <div className="wp">
        <Container>
          <h2>Schema Viewer</h2>
          <p>{schema ? "Schema added!" : "No schema"}</p>
          {schema && (
            <GraphqlBirdseye
              introspectionQuery={schema}
              style={{ width: "100%", height: "100vh" }}
            />
          )}
        </Container>
      </div>
    </Layout>
  );
};

export default HomePage;
