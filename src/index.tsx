import * as React from "react";
import * as ReactDOM from "react-dom";
import { Theme } from "./defaultTheme";
import JointJS from "./jointjs/index";
import { IntrospectionQuery } from "graphql/utilities/introspectionQuery";
import { buildClientSchema } from "graphql/utilities/buildClientSchema";
import { GraphQLSchema } from "graphql/type/schema";

export interface GraphqlBirdseyeProps {
  schema: GraphQLSchema | null;
  theme?: Theme;
  style?: any;
}

export interface State {
  activeType: string;
  loading: boolean;
}
class GraphqlBirdseye extends React.Component<GraphqlBirdseyeProps> {
  ref: any;
  jointjs: any;
  state: State = {
    activeType: "Query",
    loading: false
  };
  constructor(props: GraphqlBirdseyeProps) {
    super(props);
    this.jointjs = new JointJS({ theme: props.theme });
  }

  async componentDidMount() {
    if (!this.props.schema) {
      return;
    }
    const bounds = this.getBounds();
    this.jointjs.on("loading:start", this.startLoading);
    this.jointjs.on("loading:stop", this.stopLoading);
    await this.jointjs.init(
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
          height: "90vh",
          fontFamily: "Helvetica",
          ...(this.props.style || {})
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
const schemaProvider = (
  Component: React.ComponentType<GraphqlBirdseyeProps>
) => {
  return class SchemaProvider extends React.PureComponent<
    GraphqlBirdseyeProps & SchemaProviderProps
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
