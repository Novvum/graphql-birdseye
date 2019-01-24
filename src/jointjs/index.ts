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
} from "graphql/type/definition";
import { TypeMap } from "graphql/type/schema";
import defaultTheme, { Theme } from "../defaultTheme";
var joint = require("jointjs");
var svgPanZoom = require("svg-pan-zoom");
var animate = require("@f/animate");
const TRANSITION_DURATION = 500;

export type FilteredGraphqlOutputType = Exclude<
  GraphQLNamedType,
  | GraphQLInputObjectType
  | GraphQLEnumType
  | GraphQLScalarType
  | GraphQLUnionType
>;

export type EventType = "loading:start" | "loading:stop";

export default class JointJS {
  joint: any;
  theme: Theme;
  graph: any;
  paper: any;
  shadowPaper: any;
  panZoom: any;
  maxZoom: number = 20;
  typeMap: TypeMap;
  activeType: string = "root";
  eventMap: { [key in EventType]?: () => any } = {};
  constructor(opts: { theme?: Theme }) {
    const { theme = defaultTheme } = opts;
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
          paddingBox: 200,
          step: 100
        }
      },
      defaultConnector: { name: "rounded", args: { radius: 200 } },
      interactive: {
        linkMove: false
      }
    });
    this.paper.setInteractivity(false);
    // enable interactions
    await this.renderElements({ animate: false });
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
    this.resizeToFit({ animate: false });
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
  private mergeLinks(links) {
    var linkViews = links.map(link => this.paper.findViewByModel(link));
    var ys = linkViews.map(link => link.sourcePoint.y);
    const [minY, maxY] = [Math.min(...ys), Math.max(...ys)];
    const GAP = 0;
    const numSiblings = links.length;
    const midPoint = this.joint.g.Point(
      linkViews[0].sourcePoint.x +
        (linkViews[0].sourceBBox.x === linkViews[0].sourcePoint.x ? -30 : 30),
      (minY + maxY) / 2
    );
    var theta = midPoint.theta(linkViews[0].targetPoint);
    linkViews.map((linkView, index) => {
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
      var angle = this.joint.g.toRad(theta + sign * reverse * 90);
      var vertex = this.joint.g.Point.fromPolar(offset, angle, midPoint);

      // replace vertices array with `vertex`
      linkView.model.vertices([vertex]);
    });
  }
  private adjustVertices = cell => {
    const graph = this.graph;
    const cellView = this.paper.findViewByModel(cell);
    // if `cell` is a view, find its model
    cell = cell.model || cell;
    // `cell` is a link
    // get its source and target model IDs
    var sourceId = cell.get("source").id || cell.previous("source").id;
    var targetId = cell.get("target").id || cell.previous("target").id;

    // if one of the ends is not a model
    // (if the link is pinned to paper at a point)
    // the link is interpreted as having no siblings
    if (!sourceId || !targetId) return;

    // identify link siblings
    var siblings = graph.getLinks().filter(sibling => {
      var siblingTargetId = sibling.target().id;

      // if source and target are the same
      // or if source and target are reversed
      return siblingTargetId === targetId;
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
        var sourceCenter = cellView.sourcePoint;
        var targetCenter = cellView.targetPoint;
        var midPoint = this.joint.g.Line(sourceCenter, targetCenter).midpoint();

        // find the angle of the link
        var theta = sourceCenter.theta(targetCenter);

        // constant
        // the maximum distance between two sibling links
        var GAP = 0;

        siblings.forEach((sibling, index) => {
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
          var angle = this.joint.g.toRad(theta + sign * reverse * 90);
          var vertex = this.joint.g.Point.fromPolar(offset, angle, midPoint);

          // replace vertices array with `vertex`
          sibling.vertices([vertex]);
        });
      }
    }
  };
  setActiveType(activeType: any) {
    if (this.graph.getCell(activeType).attributes.type === "devs.Model") {
      this.activeType = activeType;
      this.renderElements();
    }
  }
  private async resizeToFit(opts?: { graph?: any; animate?: boolean }) {
    const { graph = this.graph, animate = true } = opts || {};
    if (!this.panZoom) {
      this.panZoom = svgPanZoom("#v-2", {
        fit: true,
        controlIconsEnabled: true,
        maxZoom: this.maxZoom,
        panEnabled: false
      });

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
    this.panZoom.updateBBox();
    animate && this.focusElement(this.paper.getContentBBox());
  }
  focusElement(bBox) {
    const bbBox = bBox;
    let currentPan = this.panZoom.getPan();
    bbBox.y = currentPan.y;
    bbBox.x = currentPan.x;
    let viewPortSizes = (<any>this.panZoom).getSizes();
    currentPan.x += viewPortSizes.width / 2 - bbBox.width / 2;
    currentPan.y += viewPortSizes.height / 2 - bbBox.height / 2;

    let zoomUpdateToFit =
      1.2 *
      Math.max(
        bbBox.height / viewPortSizes.height,
        bbBox.width / viewPortSizes.width
      );
    let newZoom = this.panZoom.getZoom() / zoomUpdateToFit;
    let recomendedZoom = this.maxZoom * 0.6;
    if (newZoom > recomendedZoom) newZoom = recomendedZoom;
    let newX = currentPan.x - bbBox.x + 0; // this.offsetLeft;
    let newY = currentPan.y - bbBox.y + 0; //this.offsetTop;
    this.animatePanAndZoom(newX, newY, newZoom);
  }

  animatePanAndZoom(x, y, zoomEnd) {
    let pan = this.panZoom.getPan();
    let panEnd = { x, y };
    animate(pan, panEnd, props => {
      this.panZoom.pan({ x: props.x, y: props.y });
      if (props === panEnd) {
        let zoom = this.panZoom.getZoom();
        animate({ zoom }, { zoom: zoomEnd }, props => {
          this.panZoom.zoom(props.zoom);
        });
      }
    });
  }

  async renderElements(opts?: {
    typeMap?: any;
    activeType?: string;
    animate?: boolean;
  }) {
    const {
      typeMap = this.typeMap,
      activeType = this.activeType,
      animate = true
    } = opts || {};
    const toRenderTypes: FilteredGraphqlOutputType[] = this.getToRenderTypes(
      typeMap,
      activeType
    );
    this.startLoading();
    await this.removeUnusedElements(toRenderTypes, animate);
    await this.addNewElements(toRenderTypes, animate);
    this.transitionLinkColor(this.graph.getLinks(), {
      targetColor: this.theme.colors.line.active
    });
    await this.layoutGraph({ animate });
    this.stopLoading();
  }
  private async layoutGraph(opts?: { animate?: boolean }) {
    const { animate = true } = opts || {};
    if (!animate) {
      joint.layout.DirectedGraph.layout(this.graph, {
        nodeSep: 200,
        rankSep: 400,
        rankDir: "LR"
      });
    } else {
      const originalPositions = this.graph
        .getCells()
        .reduce((accumulator, cell) => {
          if (cell.isElement()) {
            accumulator[cell.attributes.id] = cell.getBBox();
          }
          return accumulator;
        }, {});
      joint.layout.DirectedGraph.layout(this.graph, {
        nodeSep: 200,
        rankSep: 500,
        rankDir: "LR"
      });
      await this.resizeToFit({ animate });
      await Promise.all(
        this.graph
          .getCells()
          .filter(cell => cell.isElement())
          .map(async cell => {
            const originalBBox = originalPositions[cell.attributes.id];
            const targetBBox = cell.getBBox();
            cell.position(originalBBox.x, originalBBox.y);
            const links = this.graph.getConnectedLinks(cell);
            this.graph.removeLinks(cell);
            cell.transition("position/x", targetBBox.x, {
              delay: 0,
              duration: TRANSITION_DURATION * 2,
              timingFunction: joint.util.timing.linear,
              valueFunction: joint.util.interpolate.number
            });
            cell.transition("position/y", targetBBox.y, {
              delay: 0,
              duration: TRANSITION_DURATION * 2,
              timingFunction: joint.util.timing.linear,
              valueFunction: joint.util.interpolate.number
            });
            await setTimeoutAsync(() => {}, TRANSITION_DURATION * 2);
            links.map(link => {
              link.addTo(this.graph);
            });
          })
      );
    }
    await this.resizeToFit({ animate });
    await setTimeoutAsync(() => null, TRANSITION_DURATION * 2);
    this.graph.resetCells(this.graph.getCells());
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
    toRenderTypes: FilteredGraphqlOutputType[],
    animate: boolean
  ) {
    const currentElements = this.graph.getElements();
    const toRemove = currentElements.filter(
      (elem: any) => !toRenderTypes.find(type => type.name === elem.id)
    );
    toRemove.map(async (element: any) => {
      animate &&
        element.transition("attrs/./opacity", 0, {
          delay: 0,
          duration: TRANSITION_DURATION,
          timingFunction: joint.util.timing.linear,
          valueFunction: joint.util.interpolate.number
        });
      const links = this.graph.getConnectedLinks(element);
      animate &&
        this.transitionLinkColor(links, {
          transitionDuration: TRANSITION_DURATION,
          targetColor: this.theme.colors.white
        });
    });
    animate &&
      (await setTimeoutAsync(
        () => this.graph.removeCells(...toRemove),
        TRANSITION_DURATION
      ));
  }
  private async addNewElements(
    toRenderTypes: FilteredGraphqlOutputType[],
    animate: boolean
  ) {
    const currentElements = this.graph.getElements();
    const filtered = toRenderTypes.filter(type => {
      return !currentElements.find((elem: any) => elem.id === type.name);
    });
    const cells = filtered.map(type => {
      const fields = type.getFields();
      return this.addNode({
        id: type.name,
        position: (
          this.graph.getBBox() || this.paper.getContentBBox()
        ).topLeft(),
        attrs: {
          ".": {
            opacity: animate ? 0 : 1
          },
          ".label": {
            text: type.name
          }
        },
        inPorts: Object.keys(fields),
        outPorts: Object.keys(fields).map(k => {
          const field = fields[k];
          const connectedType = getNestedType(field.type);
          const id = this.getPortId(type, field, connectedType);
          const label = getFieldLabel(field.type);
          return {
            id,
            label
          };
        })
      });
    });
    await Promise.all(
      toRenderTypes.map(async type => {
        const fields = type.getFields();
        await Promise.all(
          Object.keys(fields).map(async k => {
            const field = fields[k];
            const connectedType = getNestedType(field.type);
            const id = this.getPortId(type, field, connectedType);
            if (
              toRenderTypes.findIndex(
                type => type.name === connectedType.name
              ) > -1
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
              const sourcePortPosition = sourceCell.getPortsPositions("out")[
                id
              ];
              const targetCenterPosition = this.graph
                .getCell(connectedType.name)
                .getBBox()
                .center();
              const dx = targetCenterPosition.x - sourcePortPosition.x;
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
              animate && link.prop("attrs/line/opacity", 0);
              link.addTo(this.graph);
            }
          })
        );
      })
    );
    animate && (await setTimeoutAsync(() => null, TRANSITION_DURATION));
    animate &&
      cells.map((cell: any) => {
        cell.transition("attrs/./opacity", 1, {
          delay: 0,
          duration: TRANSITION_DURATION,
          timingFunction: joint.util.timing.linear,
          valueFunction: joint.util.interpolate.number
        });
      });
    this.graph.getLinks().map(async link => {
      animate &&
        this.transitionLinkOpacity(link, {
          targetOpacity: 1,
          transitionDuration: TRANSITION_DURATION
        });
      this.addTools(link);
    });
  }
  private getPortId(type, field, connectedType) {
    return `${type.name}_${field.name}_${connectedType.name}`;
  }

  private transitionLinkOpacity(
    link: any,
    opts: { targetOpacity: number; transitionDuration: number }
  ) {
    const {
      targetOpacity = 1,
      transitionDuration = TRANSITION_DURATION
    } = opts;
    link.transition("attrs/line/opacity", targetOpacity, {
      delay: 0,
      duration: transitionDuration,
      timingFunction: joint.util.timing.linear,
      valueFunction: joint.util.interpolate.number
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
      linkView.model.toFront();
      linkView.showTools();
    });

    this.paper.on("cell:mouseover", (cell: any, evt: any) => {
      if (!cell.model.isElement()) {
        return null;
      }
      let activePort = this.getHoveredPort(cell, evt);
      cell.model.getPorts().map(port => {
        cell.model.portProp(
          port.id,
          "attrs/.port-body-highlighter/fill",
          "transparent"
        );
      });
      if (!activePort) {
        return this.highlightLinks({ cell: cell.model });
      }
      if (activePort) {
        cell.model.portProp(
          activePort.id,
          "attrs/.port-body-highlighter/fill",
          this.theme.colors.background
        );
      }

      const activeLink = activePort && activePort.link;
      if (!activeLink) {
        return this.highlightLinks({ cell: cell.model });
      }
      return this.highlightLinks({
        links: [activeLink]
      });
    });

    this.paper.on("blank:mouseover cell:mouseover", () => {
      this.paper.hideTools();
    });
  }
  private getHoveredPort(cell: any, evt: any) {
    if (!cell.model.isElement()) {
      return null;
    }
    const relBBox = this.joint.util.getElementBBox(cell.$el);
    const cellBBox = cell.model.getBBox();
    const getRelHeight = height => (height * relBBox.height) / cellBBox.height;
    const headerOffset = getRelHeight(
      this.theme.header.height + this.theme.gap - this.theme.row.height / 2
    );
    const relRowHeight = getRelHeight(this.theme.row.height);
    const relCursorPosition = {
      x: evt.clientX - relBBox.x,
      y: evt.clientY - (relBBox.y + headerOffset)
    };
    if (relCursorPosition.y < 0) {
      return null;
    }
    const port = cell.model.get("outPorts").find((p, index) => {
      const yMin = relRowHeight * index;
      const yMax = relRowHeight * (index + 1) - 1;
      if (relCursorPosition.y >= yMin && relCursorPosition.y <= yMax) {
        return true;
      }
      return false;
    });
    return port
      ? {
          ...port,
          link: this.graph
            .getCells()
            .find(
              cell => cell.isLink() && cell.attributes.source.port === port.id
            )
        }
      : null;
  }

  private highlightLinks(args: { cell?: any; links?: any }) {
    const { cell, links: lks } = args;
    let links = lks;
    if (cell) {
      links = this.graph.getConnectedLinks(cell);
    }
    this.transitionLinkColor(this.graph.getLinks(), {
      targetColor: this.theme.colors.line.inactive
    });
    this.transitionLinkColor(links, {
      targetColor: this.theme.colors.line.active
    });
    links.map(link => link.toFront());
  }
  private async transitionLinkColor(
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
    await setTimeoutAsync(() => null, transitionDuration);
  }
}
