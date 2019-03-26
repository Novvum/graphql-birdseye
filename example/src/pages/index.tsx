import React, { useState, useRef, RefObject } from "react";

import Hero from "../components/hero";
import Layout from "../layouts";

import { FullWidthContainer, Caption } from "../components/generic";
import { asyncComponent } from "react-async-component";
import { IntrospectionQuery } from "../utils/introspectionQuery";
import SchemaForm from "../components/schemaForm";
import birdseyeTheme from "../styled/theme/birdseyeTheme";
import { styled } from "../styled";
import { Button } from "../components/Buttons";
import GetStarted from "../components/GetStarted";
import { scrollToRef } from "../utils";

//async component for gatsby production build
const GraphqlBirdseye = asyncComponent({
  resolve: () => require("graphql-birdseye"),
  LoadingComponent: () => <div />, // Optional
  ErrorComponent: () => <div>Uh oh..</div> // Optional
});

const HomePage = () => {
  const [schema, setSchema] = useState();
  const [schemaError, setSchemaError] = useState("");
  const birdsEyeRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const getStartedRef = useRef<HTMLDivElement>(null);

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
        .catch(() => setSchemaError("Schema not valid"));
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
        {schema && (
          <FullWidthContainer ref={birdsEyeRef}>
            <ButtonContainer>
              <Button
                onClick={() => {
                  scrollToRef(heroRef, () => setSchema(null));
                }}
              >
                Try different schema
              </Button>
              <Button
                onClick={() => {
                  scrollToRef(getStartedRef, () => setSchema(null));
                }}
                style={{ marginLeft: "20px" }}
                secondary={true}
              >
                Get Started
              </Button>
            </ButtonContainer>
            <GraphqlBirdseye
              introspectionQuery={schema}
              style={{ width: "100%", height: "100vh" }}
              theme={birdseyeTheme}
            />
          </FullWidthContainer>
        )}
        <GetStarted childRef={getStartedRef} />
      </div>
    </Layout>
  );
};

const ButtonContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
`;

export default HomePage;
