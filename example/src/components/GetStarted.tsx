import React from "react";

import { StaticQuery, graphql } from "gatsby";

import ReactMarkdown from "react-markdown";
import { Container } from "./generic";
import { RefObject } from "react";

class GetStarted extends React.Component<
  { childRef: RefObject<HTMLDivElement> },
  {}
> {
  public render() {
    return (
      <div ref={this.props.childRef}>
        <Container style={{ paddingTop: "45px" }}>
          <StaticQuery
            query={graphql`
              {
                github {
                  repository(owner: "Novvum", name: "graphql-birdseye") {
                    object(expression: "master:README.md") {
                      ... on GitHub_Blob {
                        text
                      }
                    }
                  }
                }
              }
            `}
            render={(data) => {
              return (
                <ReactMarkdown
                  escapeHtml={false}
                  source={data.github.repository.object.text}
                />
              );
            }}
          />
        </Container>
      </div>
    );
  }
}

export default GetStarted;
