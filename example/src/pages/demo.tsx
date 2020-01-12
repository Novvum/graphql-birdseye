import React, { useRef } from "react";

import Layout from "../layouts";

import { FullWidthContainer } from "../components/generic";
import { asyncComponent } from "react-async-component";
import birdseyeTheme from "../styled/theme/birdseyeTheme";
import { styled } from "../styled";
import Tooltip from "../components/Tooltip";
import schema from "graphql-birdseye-core/src/graphql/referenceSchema.new";

//async component for gatsby production build
const GraphqlBirdseye = asyncComponent({
  resolve: () => require("graphql-birdseye"),
  LoadingComponent: () => <div />, // Optional
  ErrorComponent: () => <div>Uh oh..</div>, // Optional
});

const HomePage = () => {
  const birdsEyeRef = useRef<HTMLDivElement>(null);

  return (
    <Layout>
      <div>
        <FullWidthContainer
          ref={birdsEyeRef}
          style={{ backgroundColor: "black" }}
        >
          {schema && (
            <>
              <Tooltip
                content="Click on a type to see its fields and connections"
                startPosition="right"
              />
              <GraphqlBirdseye
                introspectionQuery={schema.data}
                style={{ width: "100%", height: "100vh" }}
                theme={birdseyeTheme}
              />
            </>
          )}
        </FullWidthContainer>
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
