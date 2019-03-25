import React, { useState, useRef, RefObject } from "react";

import Hero from "../components/hero";
import Layout from "../layouts";

import { FullWidthContainer, Caption } from "../components/generic";
import { asyncComponent } from "react-async-component";
import { IntrospectionQuery } from "../utils/introspectionQuery";
import SchemaForm from "../components/schemaForm";
import birdseyeTheme from "../styled/theme/birdseyeTheme";
import { styled } from "../styled";

//async component for gatsby production build
const GraphqlBirdseye = asyncComponent({
  resolve: () => require("graphql-birdseye"),
  LoadingComponent: () => <div />, // Optional
  ErrorComponent: ({ error }) => <div>Uh oh..</div> // Optional
});

const HomePage = () => {
  const [schema, setSchema] = useState();
  const [schemaError, setSchemaError] = useState("");
  const birdsEyeRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const scrollToRef = (ref: RefObject<HTMLDivElement>) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const fetchSchema = async (url: string) => {
    try {
      if (!url) return setSchemaError("Schema not valid");
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: IntrospectionQuery })
      })
        .then(res => res.json())
        .then(res => {
          setSchema(res.data);
          scrollToRef(birdsEyeRef);
        })
        .catch(e => setSchemaError("Schema not valid"));
    } catch {
      console.log("whoops");
    }
  };

  return (
    <Layout>
      <Hero childRef={heroRef} height="100vh">
        <h1>GraphQL Birdseye</h1>
        <Caption>A better way to visualize your data graph</Caption>
        <SchemaForm onSubmit={fetchSchema} error={schemaError} />
      </Hero>
      <div>
        <FullWidthContainer ref={birdsEyeRef}>
          <NewSchemaButton onClick={() => scrollToRef(heroRef)}>
            New schema ^
          </NewSchemaButton>
          {schema && (
            <GraphqlBirdseye
              introspectionQuery={schema}
              style={{ width: "100%", height: "100vh" }}
              theme={birdseyeTheme}
            />
          )}
        </FullWidthContainer>
      </div>
    </Layout>
  );
};

const NewSchemaButton = styled.button`
  position: absolute;
  top: 20;
  left: 20;
`;

export default HomePage;
