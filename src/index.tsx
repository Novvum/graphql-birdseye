import * as React from "react";
import * as ReactDOM from "react-dom";
import joint, {
  addTools,
  bindToolEvents,
  animateLinkOpacity
} from "./jointjs/index";
import {
  GraphQLSchema,
  buildClientSchema,
  IntrospectionQuery,
  GraphQLInputObjectType,
  GraphQLEnumType,
  GraphQLNamedType,
  GraphQLScalarType,
  GraphQLUnionType,
  GraphQLObjectType
} from "graphql";
import {
  isFilteredEntity,
  isBaseEntity,
  getFieldLabel,
  getNestedType,
  isRelatedType,
  setTimeoutAsync
} from "./utils";
import { TypeMap } from "graphql/type/schema";
import theme from "./theme";

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
    this.graph = new joint.dia.Graph();
    const bounds = this.getBounds();
    this.paper = new joint.dia.Paper({
      el: ReactDOM.findDOMNode(this.ref),
      model: this.graph,
      width: bounds.width,
      height: bounds.height,
      background: {
        color: theme.colors.background
      },
      gridSize: 1,
      defaultRouter: {
        name: "metro", // "normal" // "metro",
        args: {
          endDirection: ["top", "bottom"],
          paddingBox: 10
        }
      },
      defaultConnector: { name: "rounded", args: { radius: 100 } },
      interactive: {
        linkMove: false
      }
    });
    this.paper.setInteractivity(false);

    // enable interactions
    // bindInteractionEvents(adjustVertices, this.graph, this.paper);

    await this.renderElements(this.props, this.state);
    // tools are visible by default
    this.paper.hideTools();

    // enable tools
    bindToolEvents(this.paper, this.graph);
    this.paper.on("link:pointerclick", (linkView: any) => {
      const activeType = linkView.model.attributes.target.id;
      this.setActiveType(activeType);
    });
    this.paper.on("cell:pointerclick", (linkView: any) => {
      const activeType = linkView.model.id;
      this.setActiveType(activeType);
    });
    this.scaleContentToFit();
  }
  private stopLoading() {
    this.setState({
      loading: false
    });
  }

  private startLoading() {
    this.setState({
      loading: true
    });
  }

  private getBounds() {
    return this.ref.getBoundingClientRect();
  }

  private scaleContentToFit() {
    if (this.panZoom) {
      this.panZoom.destroy();
      delete this.panZoom;
    }
    // this.paper.scaleContentToFit({
    //   padding: 100
    // });
    this.panZoom = svgPanZoom("#v-2", {
      fit: true,
      center: true,
      controlIconsEnabled: true,
      maxZoom: 20,
      panEnabled: false
    });
    this.panZoom.fit();
    this.panZoom.updateBBox(); // Update viewport bounding box
    this.panZoom.fit(); // fit works as expected

    // (this.paper.getContentBBox())
    this.paper.on("blank:pointerdown", () => {
      this.panZoom.enablePan();
    });
    this.paper.on("cell:pointerup blank:pointerup", () => {
      this.panZoom.disablePan();
    });
    this.paper.on("resize", () => {
      this.panZoom.reset();
    });
  }

  private setActiveType(activeType: any) {
    if (this.graph.getCell(activeType).attributes.type === "devs.Model") {
      this.setState(
        {
          activeType: activeType
        },
        () => this.renderElements()
      );
    }
  }

  private async renderElements(
    props: GraphqlBirdseyeProps = this.props,
    state: State = this.state
  ) {
    if (!props.schema) {
      return;
    }
    this.startLoading();
    const { activeType } = state;
    const typeMap = props.schema.getTypeMap();
    const toRenderTypes: FilteredGraphqlOutputType[] = this.getToRenderTypes(
      typeMap,
      activeType
    );
    await this.removeUnusedElements(toRenderTypes);
    await this.addNewElements(toRenderTypes);
    joint.layout.DirectedGraph.layout(this.graph, {
      nodeSep: 200,
      rankSep: 400,
      rankDir: "LR",
      setPosition: function(element: any, glNode: any) {
        element.set(
          "position",
          {
            x: glNode.x - glNode.width / 2,
            y: glNode.y - glNode.height / 2
          },
          { cacheOnly: false /* will not update links yet */ }
        );
      },
      setVertices: (link: any, points: any) => {
        link.unset("vertices", { silent: true });
      }
    });
    animateLinkOpacity(this.graph.getLinks(), {
      targetColor: theme.colors.link.inactive
    });
    this.scaleContentToFit();
    this.stopLoading();
  }
  private async removeUnusedElements(
    toRenderTypes: FilteredGraphqlOutputType[]
  ) {
    const currentElements = this.graph.getElements();
    const toRemove = currentElements.filter(
      (elem: any) => !toRenderTypes.find(type => type.name === elem.id)
    );
    const TRANSITION_DURATION = 100;
    toRemove.map(async (element: any) => {
      const links = this.graph.getConnectedLinks(element);
      animateLinkOpacity(links, {
        transitionDuration: TRANSITION_DURATION,
        targetColor: theme.colors.white
      });
    });
    await setTimeoutAsync(
      () => this.graph.removeCells(...toRemove),
      TRANSITION_DURATION * (2 / 3)
    );
    await setTimeoutAsync(() => null, TRANSITION_DURATION / 3);
  }
  private async addNewElements(toRenderTypes: FilteredGraphqlOutputType[]) {
    const currentElements = this.graph.getElements();
    toRenderTypes
      .filter(type => {
        return !currentElements.find((elem: any) => elem.id === type.name);
      })
      .forEach(type => {
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
          const sourceCell = this.graph.getCell(type.name);
          const existingLinks = this.graph.getConnectedLinks(sourceCell);
          if (
            existingLinks.find(
              (link: any) => link.attributes.source.port === id
            )
          ) {
            return;
          }
          const sourcePortPosition = sourceCell.getPortsPositions("out")[id];
          const targetCenterPosition = this.graph
            .getCell(connectedType.name)
            .getBBox()
            .center();
          const dx = targetCenterPosition.x - sourcePortPosition.x;
          const dy = targetCenterPosition.y - sourcePortPosition.y;
          var link = new joint.shapes.devs.Link();
          link.source({
            id: type.name,
            port: id,
            anchor: {
              name: `${dx > 0 ? "right" : "left"}`
            }
          });
          link.target({
            id: connectedType.name,
            anchor: {
              name: `top`, // `${dy > 0 ? "top" : "bottom"}`,
              args: {
                dy: theme.row.height / 2 // dy > 0 ? ROW_HEIGHT / 2 : 0
              }
            }
          });
          link.addTo(this.graph);
          addTools(this.paper, link);
        }
      });
    });
  }

  private getToRenderTypes(typeMap: TypeMap, activeType: string) {
    return Object.keys(typeMap)
      .filter(key => {
        const type = typeMap[key];
        if (isFilteredEntity(type) || isBaseEntity(type)) {
          return false;
        }
        if (activeType === "root") {
          if (type.name === "Query" || type.name === "Mutation") {
            return true;
          }
          return (
            (typeMap["Query"] &&
              isRelatedType(typeMap["Query"] as GraphQLObjectType, type)) ||
            (typeMap["Mutation"] &&
              isRelatedType(typeMap["Mutation"] as GraphQLObjectType, type))
          );
        }
        if (activeType === type.name) {
          return true;
        }
        if (type.constructor.name === "GraphQLObjectType") {
          return (
            isRelatedType(type as GraphQLObjectType, typeMap[activeType]) ||
            isRelatedType(typeMap[activeType] as GraphQLObjectType, type)
          );
        }
        return false;
      })
      .map(k => typeMap[k] as FilteredGraphqlOutputType);
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
