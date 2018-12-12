import * as React from "react";
import * as ReactDOM from "react-dom";
import joint, { addTools, bindToolEvents } from "./jointjs";
import {
  GraphQLSchema,
  buildClientSchema,
  IntrospectionQuery,
  GraphQLInputObjectType,
  GraphQLEnumType,
  GraphQLNamedType,
  GraphQLScalarType,
  GraphQLUnionType
} from "graphql";
import {
  isFilteredEntity,
  isBaseEntity,
  getFieldLabel,
  getNestedType
} from "./utils";

var svgPanZoom = require("svg-pan-zoom");

export interface GraphqlBirdseyeProps {
  schema: GraphQLSchema | null;
}
export type FilteredGraphqlOutputType = Exclude<
  GraphQLNamedType,
  | GraphQLInputObjectType
  | GraphQLEnumType
  | GraphQLScalarType
  | GraphQLUnionType
>;

class GraphqlBirdseye extends React.Component<GraphqlBirdseyeProps> {
  graph: any;
  paper: any;
  ref: any;
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    const schema = this.props.schema;
    if (!schema) {
      return;
    }

    this.graph = new joint.dia.Graph();
    const bounds = this.ref.getBoundingClientRect();
    this.paper = new joint.dia.Paper({
      el: ReactDOM.findDOMNode(this.ref),
      model: this.graph,
      width: bounds.width,
      height: bounds.height,
      gridSize: 1,
      // defaultRouter: { name: "metro" },
      defaultConnector: { name: "rounded" },
      interactive: {
        linkMove: false
      }
    });
    this.paper.setInteractivity(false);

    // enable interactions
    // bindInteractionEvents(adjustVertices, this.graph, this.paper);

    const typeMap = schema.getTypeMap();
    const toRenderTypes: FilteredGraphqlOutputType[] = Object.keys(typeMap)
      .filter(key => {
        return !isFilteredEntity(typeMap[key]) && !isBaseEntity(typeMap[key]);
      })
      .map(k => typeMap[k] as FilteredGraphqlOutputType);
    toRenderTypes.forEach(type => {
      const fields = type.getFields();
      this.addNode({
        id: type.name,
        attrs: {
          ".label": {
            text: type.name
          }
        },
        inPorts: Object.keys(fields),
        outPorts: Object.keys(fields).map(k => {
          const field = fields[k];
          const connectedType = getNestedType(field.type);
          const id = `${field.name}_${connectedType.name}`;
          const label = getFieldLabel(field.type);
          return {
            id,
            label
          };
        })
      });
    });
    toRenderTypes.forEach(type => {
      const fields = type.getFields();
      Object.keys(fields).map(k => {
        const field = fields[k];
        const connectedType = getNestedType(field.type);
        const id = `${field.name}_${connectedType.name}`;
        if (
          toRenderTypes.findIndex(type => type.name === connectedType.name) > -1
        ) {
          var link = new joint.shapes.devs.Link();
          link.source({
            id: type.name,
            port: id
          });
          link.target({
            id: connectedType.name
          });
          link.addTo(this.graph);
          addTools(this.paper, link);
        }
      });
    });
    joint.layout.DirectedGraph.layout(this.graph, {
      nodeSep: 200,
      rankSep: 400,
      rankDir: "LR"
    });
    // tools are visible by default
    this.paper.hideTools();

    // enable tools
    bindToolEvents(this.paper);
    svgPanZoom("#v-2", {
      fit: true,
      controlIconsEnabled: true
    });
    this.paper.scaleContentToFit({
      padding: 100
    });
  }
  addNode(node: any) {
    var a1 = new joint.shapes.devs.Model(node);
    this.graph.addCells([a1]);
    return a1;
  }
  render() {
    return (
      <div
        style={{
          width: "100%",
          height: "90vh"
        }}
        id="playground"
        ref={this.setRef}
      />
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
      let schema = null;
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
