import * as React from "react";
import * as ReactDOM from "react-dom";
import jointjs from "./jointjs/index";
import { GraphQLSchema, buildClientSchema, IntrospectionQuery } from "graphql";

export interface GraphqlBirdseyeProps {
  schema: GraphQLSchema | null;
}

export interface State {
  activeType: string;
  loading: boolean;
}
class GraphqlBirdseye extends React.Component<GraphqlBirdseyeProps> {
  graph: any;
  paper: any;
  panZoom: any;
  ref: any;
  state: State = {
    activeType: "Query",
    loading: false
  };
  constructor(props: any) {
    super(props);
  }

  async componentDidMount() {
    if (!this.props.schema) {
      return;
    }
    const bounds = this.getBounds();
    jointjs.on("loading:start", this.startLoading);
    jointjs.on("loading:stop", this.stopLoading);
    await jointjs.init(
      ReactDOM.findDOMNode(this.ref),
      bounds,
      this.props.schema.getTypeMap()
    );
  }

  private stopLoading = () => {
    this.setState({
      loading: false
    });
  };

  private startLoading = () => {
    this.setState({
      loading: true
    });
  };

  private getBounds() {
    return this.ref.getBoundingClientRect();
  }

  render() {
    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "90vh"
        }}
      >
        <div
          id="playground"
          ref={this.setRef}
          style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}
        />
        {this.state.loading && (
          <div style={{ position: "absolute", top: "50%", left: "50%" }}>
            Loading...
          </div>
        )}
      </div>
    );
  }
  setRef = (ref: any) => {
    this.ref = ref;
  };
}

export interface SchemaProviderProps {
  introspectionQuery?: IntrospectionQuery;
  schema?: GraphQLSchema;
}
const schemaProvider = <P extends GraphqlBirdseyeProps>(
  Component: React.ComponentType<P>
) => {
  return class SchemaProvider extends React.PureComponent<
    P & SchemaProviderProps
  > {
    // displayName: `schemaProvider(${Component.displayName})`
    render() {
      const { introspectionQuery, schema: schemaProp, ...props } = this
        .props as SchemaProviderProps;
      let schema: any = null;
      if (schemaProp) {
        schema = schemaProp;
      } else if (introspectionQuery) {
        schema = buildClientSchema(introspectionQuery);
      }
      return <Component schema={schema} {...props} />;
    }
  };
};

export default schemaProvider(GraphqlBirdseye);
