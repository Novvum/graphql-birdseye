import * as React from "react";
import * as ReactDOM from "react-dom";
import defaultTheme, { Theme } from "./defaultTheme";
import JointJS from "./jointjs/index";
import { IntrospectionQuery } from "graphql/utilities/introspectionQuery";
import { buildClientSchema } from "graphql/utilities/buildClientSchema";
import { GraphQLSchema } from "graphql/type/schema";
import { withResizeDetector } from "react-resize-detector";
import Loader from "./Loader";
import Birdseye from "./graphql/schemaConverter";
export interface GraphqlBirdseyeProps {
  schema: GraphQLSchema | null;
  theme?: Theme;
  style?: any;
}

interface ResizeDetectorProps {
  width: number;
  height: number;
}

export interface State {
  activeType: string;
  loading: boolean;
}
class GraphqlBirdseye extends React.Component<
  GraphqlBirdseyeProps & ResizeDetectorProps
> {
  ref: any;
  jointjs: JointJS;
  state: State = {
    activeType: "Query",
    loading: false,
  };
  constructor(props: GraphqlBirdseyeProps & ResizeDetectorProps) {
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
    const dataStructure = new Birdseye(this.props.schema);
    await this.jointjs.init(
      ReactDOM.findDOMNode(this.ref),
      bounds,
      dataStructure
    );
  }

  componentWillUnmount() {
    this.jointjs.destroy();
  }
  async componentWillReceiveProps(nextProps: GraphqlBirdseyeProps & ResizeDetectorProps) {
    if (this.props.width !== nextProps.width || this.props.height !== nextProps.height) {
      this.jointjs.setSize(nextProps.width, nextProps.height)
    }
    if (nextProps.schema && this.props.schema !== nextProps.schema) {
      await this.jointjs.setDataStructure(new Birdseye(nextProps.schema))
    }
  }

  private stopLoading = () =>
    new Promise((resolve) =>
      this.setState(
        {
          loading: false,
        },
        resolve
      )
    );

  private startLoading = () =>
    new Promise((resolve) => {
      this.setState(
        {
          loading: true,
        },
        resolve
      );
    });

  private getBounds() {
    return this.ref.getBoundingClientRect();
  }

  render() {
    const { theme = defaultTheme } = this.props;
    return (
      <div
        style={{
          ...(this.props.style || {}),
          display: "flex",
        }}
      >
        <div id="playground" ref={this.setRef} style={{ flex: 1 }} />
        {this.state.loading && <Loader colors={theme.colors} />}
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

export default schemaProvider(withResizeDetector(GraphqlBirdseye));
