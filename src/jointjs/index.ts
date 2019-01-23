import theme from "../theme";
import injectCustomRouter from "./router";
import injectCustomShapes from "./shapes";
import {
  setTimeoutAsync,
  isFilteredEntity,
  isBaseEntity,
  isRelatedType,
  getNestedType,
  getFieldLabel
} from "../utils";
import {
  GraphQLNamedType,
  GraphQLInputObjectType,
  GraphQLEnumType,
  GraphQLScalarType,
  GraphQLUnionType,
  GraphQLObjectType
} from "graphql";
import { TypeMap } from "graphql/type/schema";
var joint = require("jointjs");
var _ = require("lodash");
var svgPanZoom = require("svg-pan-zoom");

export type FilteredGraphqlOutputType = Exclude<
  GraphQLNamedType,
  | GraphQLInputObjectType
  | GraphQLEnumType
  | GraphQLScalarType
  | GraphQLUnionType
>;

export type EventType = "loading:start" | "loading:stop";

class JointJS {
  joint: any;
  theme: any;
  graph: any;
  paper: any;
  panZoom: any;
  typeMap: TypeMap;
  activeType: string = "root";
  eventMap: { [key in EventType]?: () => any } = {};
  constructor(joint, theme) {
    injectCustomShapes(joint, theme);
    injectCustomRouter(joint);
    this.joint = joint;
    this.theme = theme;
  }
  async init(el: any, bounds: any, typeMap: TypeMap) {
    this.typeMap = typeMap;
    this.graph = new joint.dia.Graph();
    this.paper = new joint.dia.Paper({
      el,
      model: this.graph,
      width: bounds.width,
      height: bounds.height,
      background: {
        color: this.theme.colors.background
      },
      gridSize: 1,
      defaultRouter: {
        name: "metro",
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
    await this.renderElements();
    // tools are visible by default
    this.paper.hideTools();
    // enable tools
    this.bindToolEvents();
    this.paper.on("link:pointerclick", (linkView: any) => {
      const activeType = linkView.model.attributes.target.id;
      this.setActiveType(activeType);
    });
    this.paper.on("cell:pointerclick", (linkView: any) => {
      const activeType = linkView.model.id;
      this.setActiveType(activeType);
    });
    this.resizeToFit();
  }
  /**
   * Events
   */
  on(key: EventType, callback: () => any) {
    this.eventMap[key] = callback;
  }
  startLoading() {
    const onStart = this.eventMap["loading:start"];
    if (onStart) {
      onStart();
    }
  }
  stopLoading() {
    const onStop = this.eventMap["loading:stop"];
    if (onStop) {
      onStop();
    }
  }
  async setTypeMap(newTypeMap) {
    this.typeMap = newTypeMap;
    await this.renderElements(newTypeMap);
  }
  private setActiveType(activeType: any) {
    if (this.graph.getCell(activeType).attributes.type === "devs.Model") {
      this.activeType = activeType;
      this.renderElements();
    }
  }
  private resizeToFit() {
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
  async renderElements(typeMap = this.typeMap, activeType = this.activeType) {
    const toRenderTypes: FilteredGraphqlOutputType[] = this.getToRenderTypes(
      typeMap,
      activeType
    );
    this.startLoading();
    await this.removeUnusedElements(toRenderTypes);
    await this.addNewElements(toRenderTypes);
    joint.layout.DirectedGraph.layout(this.graph, {
      nodeSep: 200,
      rankSep: 400,
      rankDir: "LR",
      setPosition: (element: any, glNode: any) => {
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
    this.transitionLinkColor(this.graph.getLinks(), {
      targetColor: this.theme.colors.line.inactive
    });
    this.resizeToFit();
    this.stopLoading();
  }
  private getToRenderTypes(
    typeMap: TypeMap = this.typeMap,
    activeType: string = this.activeType
  ) {
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
      this.transitionLinkColor(links, {
        transitionDuration: TRANSITION_DURATION,
        targetColor: this.theme.colors.white
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
                dy: this.theme.row.height / 2 // dy > 0 ? ROW_HEIGHT / 2 : 0
              }
            }
          });
          link.addTo(this.graph);
          this.addTools(link);
        }
      });
    });
  }
  private addNode(node: any) {
    var a1 = new joint.shapes.devs.Model(node);
    this.graph.addCells([a1]);
    return a1;
  }
  private addTools(link: any) {
    var toolsView = new joint.dia.ToolsView({
      tools: [new joint.linkTools.TargetArrowhead()]
    });
    link.findView(this.paper).addTools(toolsView);
  }
  private bindInteractionEvents(adjustVertices: any) {
    // bind `graph` to the `adjustVertices` function
    var adjustGraphVertices = _.partial(adjustVertices, this.graph);

    // adjust vertices when a cell is removed or its source/target was changed
    this.graph.on(
      "add remove change:source change:target",
      adjustGraphVertices
    );

    // adjust vertices when the user stops interacting with an element
    this.paper.on("cell:pointerup", adjustGraphVertices);
  }
  private bindToolEvents() {
    // show link tools
    this.paper.on("link:mouseover", (linkView: any) => {
      const links = this.graph.getLinks();
      this.transitionLinkColor(links, {
        targetColor: this.theme.colors.line.inactive
      });
      this.transitionLinkColor([linkView.model], {
        targetColor: this.theme.colors.line.active
      });
      linkView.showTools();
    });

    // hide link tools
    // paper.on("link:mouseout", function(linkView: any) {
    //   const links = graph.getLinks();
    //   // animateLinkOpacity(links, { targetOpacity: 0 });
    //   linkView.hideTools();
    // });

    this.paper.on("cell:mouseover", (cell: any) => {
      this.activateCellLinks(cell);
    });

    this.paper.on("blank:mouseover cell:mouseover", () => {
      this.paper.hideTools();
    });
  }
  private activateCellLinks(cell: any) {
    this.transitionLinkColor(this.graph.getLinks(), {
      targetColor: this.theme.colors.line.inactive
    });
    const links = this.graph.getConnectedLinks(cell.model);
    this.transitionLinkColor(links, {
      targetColor: this.theme.colors.line.active
    });
  }
  private transitionLinkColor(
    links: any,
    opts?: { transitionDuration?: number; targetColor?: string }
  ) {
    const {
      transitionDuration = 100,
      targetColor: color = this.theme.colors.primary
    } = opts || {};
    links.map((link: any) => {
      link.transition("attrs/line/stroke", color, {
        delay: 0,
        duration: transitionDuration,
        timingFunction: joint.util.timing.linear,
        valueFunction: joint.util.interpolate.hexColor
      });
    });
  }
}

export default new JointJS(joint, theme);

export function adjustVertices(graph: any, cell: any) {
  // if `cell` is a view, find its model
  cell = cell.model || cell;

  if (cell instanceof joint.dia.Element) {
    // `cell` is an element

    _.chain(graph.getConnectedLinks(cell))
      .groupBy(function(link: any) {
        // the key of the group is the model id of the link's source or target
        // cell id is omitted
        return _.omit([link.source().id, link.target().id], cell.id)[0];
      })
      .each(function(group: any, key: any) {
        // if the member of the group has both source and target model
        // then adjust vertices
        if (key !== "undefined") adjustVertices(graph, _.first(group));
      })
      .value();

    return;
  }

  // `cell` is a link
  // get its source and target model IDs
  var sourceId = cell.get("source").id || cell.previous("source").id;
  var targetId = cell.get("target").id || cell.previous("target").id;

  // if one of the ends is not a model
  // (if the link is pinned to paper at a point)
  // the link is interpreted as having no siblings
  if (!sourceId || !targetId) return;

  // identify link siblings
  var siblings = _.filter(graph.getLinks(), function(sibling: any) {
    var siblingSourceId = sibling.source().id;
    var siblingTargetId = sibling.target().id;

    // if source and target are the same
    // or if source and target are reversed
    return (
      (siblingSourceId === sourceId && siblingTargetId === targetId) ||
      (siblingSourceId === targetId && siblingTargetId === sourceId)
    );
  });

  var numSiblings = siblings.length;
  switch (numSiblings) {
    case 0: {
      // the link has no siblings
      break;
    }
    case 1: {
      // there is only one link
      // no vertices needed
      cell.unset("vertices");
      break;
    }
    default: {
      // there are multiple siblings
      // we need to create vertices

      // find the middle point of the link
      var sourceCenter = graph
        .getCell(sourceId)
        .getBBox()
        .center();
      var targetCenter = graph
        .getCell(targetId)
        .getBBox()
        .center();
      var midPoint = joint.g.Line(sourceCenter, targetCenter).midpoint();

      // find the angle of the link
      var theta = sourceCenter.theta(targetCenter);

      // constant
      // the maximum distance between two sibling links
      var GAP = 20;

      _.each(siblings, function(sibling: any, index: any) {
        // we want offset values to be calculated as 0, 20, 20, 40, 40, 60, 60 ...
        var offset = GAP * Math.ceil(index / 2);

        // place the vertices at points which are `offset` pixels perpendicularly away
        // from the first link
        //
        // as index goes up, alternate left and right
        //
        //  ^  odd indices
        //  |
        //  |---->  index 0 sibling - centerline (between source and target centers)
        //  |
        //  v  even indices
        var sign = index % 2 ? 1 : -1;

        // to assure symmetry, if there is an even number of siblings
        // shift all vertices leftward perpendicularly away from the centerline
        if (numSiblings % 2 === 0) {
          offset -= (GAP / 2) * sign;
        }

        // make reverse links count the same as non-reverse
        var reverse = theta < 180 ? 1 : -1;

        // we found the vertex
        var angle = joint.g.toRad(theta + sign * reverse * 90);
        var vertex = joint.g.Point.fromPolar(offset, angle, midPoint);

        // replace vertices array with `vertex`
        sibling.vertices([vertex]);
      });
    }
  }
}
