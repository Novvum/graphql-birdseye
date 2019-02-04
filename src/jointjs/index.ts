import injectCustomRouter from "./router";
import injectCustomShapes from "./shapes";
import {
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
  private joint: any;
  private theme: Theme;
  private graph: any;
  private paper: any;
  private panZoom: any;
  private maxZoom: number = 20;
  private typeMap: TypeMap;
  private activeType: string = "root";
  private eventMap: { [key in EventType]?: () => any } = {};
  private animation: boolean = true;
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
        linkMove: false,
        elementMove: false
      },
      validateMagnet: () => false
    });
    // this.paper.setInteractivity(false);
    await this.renderElements({ animate: false });
    // tools are visible by default
    this.paper.hideTools();
    // enable tools
    this.bindToolEvents();
    this.resizeToFit({ animate: false });
  }

  private bindToolEvents() {
    // show link tools
    this.paper.on("link:mouseover", (linkView: any) => {
      const links = this.graph.getLinks();
      links.map(link =>
        link.transitionColor(this.theme.colors.line.inactive, {
          duration: TRANSITION_DURATION
        })
      );
      linkView.model.transitionColor(this.theme.colors.line.active, {
        duration: TRANSITION_DURATION
      });
      linkView.model.toFront();
      linkView.showTools();
    });
    this.paper.on("element:magnet:pointerclick", (cell: any, evt: any, port: any, x, y) => {
      evt.stopPropagation()
      console.log(cell, evt, port, x, y)
    })
    this.paper.on("cell:mouseover", (cell: any, evt: any) => {
      if (!cell.model.isElement()) {
        return null;
      }
      cell.model.toFront();
      // return;
      let activePort = this.getHoveredPort(cell, evt);
      cell.model.getPorts().map(port => {
        cell.model.portProp(
          port.id,
          "attrs/.port-body/fill",
          "transparent"
        );
      });
      if (!activePort) {
        return this.highlightLinks({ cell: cell.model });
      }
      // if (activePort) {
      //   cell.model.portProp(
      //     activePort.id,
      //     "attrs/.port-body/magnet",
      //     true
      //   );
      // }

      const activeLink = activePort.link;
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
    this.paper.on("link:pointerclick", (linkView: any) => {
      const activeType = linkView.model.attributes.target.id;
      this.setActiveType(activeType);
    });
    this.paper.on("cell:pointerclick", (linkView: any) => {
      const activeType = linkView.model.id;
      this.setActiveType(activeType);
    });
  }

  get(key) {
    return this[key];
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
  enableAnimation() {
    this.animation = true;
  }
  disableAnimation() {
    this.animation = false;
  }
  async setTypeMap(newTypeMap) {
    this.typeMap = newTypeMap;
    await this.renderElements({ typeMap: newTypeMap });
  }
  async setActiveType(activeType: any) {
    if (
      this.graph.getCell(activeType).isElement() &&
      this.activeType !== activeType
    ) {
      this.activeType = activeType;
      await this.renderElements();
    }
  }
  async setSize(width: number, height: number) {
    this.paper.setDimensions(width, height);
    this.panZoom.resize()
  }

  /**
   *
   * Render
   */
  async renderElements(opts?: {
    typeMap?: any;
    activeType?: string;
    animate?: boolean;
  }) {
    await this.startLoading();
    const {
      typeMap = this.typeMap,
      activeType = this.activeType,
      animate = this.animation
    } = opts || {};
    const toRenderTypes: FilteredGraphqlOutputType[] = this.getToRenderTypes(
      typeMap,
      activeType
    );
    await Promise.all([
      this.removeUnusedElements(toRenderTypes, animate),
      this.addNewElements(toRenderTypes, animate)
    ]);
    await Promise.all([
      ...this.graph.getLinks().map(link =>
        link.transitionColor(this.theme.colors.line.active, {
          duration: TRANSITION_DURATION
        })
      ),
      this.layoutGraph({ animate })
    ]);
    await this.stopLoading();
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
      const links = this.graph.getConnectedLinks(element);
      animate &&
        (await Promise.all(
          links.map(link =>
            link.transitionColor(this.theme.colors.white, {
              duration: TRANSITION_DURATION
            })
          )
        ));
      animate &&
        (await element.transitionOpacity(0, {
          duration: TRANSITION_DURATION
        }));
    });
    this.graph.removeCells(...toRemove);
  }
  private async addNewElements(
    toRenderTypes: FilteredGraphqlOutputType[],
    animate: boolean
  ) {
    function getPortId(t, f, ct) {
      return `${t.name}_${f.name}_${ct.name}`;
    }
    const currentElements = this.graph.getElements();
    const filtered = toRenderTypes.filter(type => {
      return !currentElements.find((elem: any) => elem.id === type.name);
    });
    filtered.map(type => {
      const fields = type.getFields();
      return this.addNode({
        id: type.name,
        position: (
          this.graph.getBBox() || this.paper.getContentBBox()
        ).topLeft(),
        attrs: {
          ".label": {
            text: type.name
          }
        },
        inPorts: Object.keys(fields),
        outPorts: Object.keys(fields).map(k => {
          const field = fields[k];
          const connectedType = getNestedType(field.type);
          const id = getPortId(type, field, connectedType);
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
            const id = getPortId(type, field, connectedType);
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
              link.addTo(this.graph);
              this.addTools(link);
            }
          })
        );
      })
    );
  }
  private async layoutGraph(opts?: { animate?: boolean }) {
    const { animate = true } = opts || {};
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
    await Promise.all([
      this.resizeToFit(),
      ...this.graph
        .getCells()
        .filter(cell => cell.isElement())
        .map(async cell => {
          if (!animate) {
            return;
          }
          const originalBBox = originalPositions[cell.attributes.id];
          const targetBBox = cell.getBBox();
          cell.position(originalBBox.x, originalBBox.y);
          const links = this.graph.getConnectedLinks(cell);
          this.graph.removeLinks(cell);
          await cell.transitionPosition(targetBBox, {
            duration: TRANSITION_DURATION
          });
          await Promise.all(
            links.map(async link => {
              link.prop("attrs/line/opacity", 0);
              link.addTo(this.graph);
              await link.transitionOpacity(1, {
                duration: TRANSITION_DURATION
              });
            })
          );
        })
    ]);
    this.graph.resetCells(this.graph.getCells());
  }

  /**
   *
   * Helpers
   */

  private addNode(node: any) {
    var a1 = new joint.shapes.devs.Type(node);
    this.graph.addCells([a1]);
    return a1;
  }
  private addTools(link: any) {
    var toolsView = new joint.dia.ToolsView({
      tools: [new joint.linkTools.TargetArrowhead()]
    });
    link.findView(this.paper).addTools(toolsView);
  }
  private getHoveredPort(cell: any, evt: any) {
    if (!cell.model.isElement()) {
      return null;
    }
    var port = cell.findAttribute('port', evt.target);
    // const outPort = cell.model.get("outPorts").find((p, index) => {
    //   const yMin = relRowHeight * index;
    //   const yMax = relRowHeight * (index + 1) - 1;
    //   if (relCursorPosition.y >= yMin && relCursorPosition.y <= yMax) {
    //     return true;
    //   }
    //   return false;
    // });
    // const inPort = cell.model.get("inPorts").find((p, index) => {
    //   const yMin = relRowHeight * index;
    //   const yMax = relRowHeight * (index + 1) - 1;
    //   if (relCursorPosition.y >= yMin && relCursorPosition.y <= yMax) {
    //     return true;
    //   }
    //   return false;
    // });
    return port ? {
      id: port,
      link: this.graph
        .getCells()
        .find(
          cell => cell.isLink() && cell.attributes.source.port === port
        )
    } : null
  }
  private highlightLinks(args: { cell?: any; links?: any }) {
    const { cell, links: lks } = args;
    let links = lks;
    if (cell) {
      links = this.graph.getConnectedLinks(cell);
    }
    this.graph.getLinks().map(link => {
      link.transitionColor(this.theme.colors.line.inactive, {
        duration: TRANSITION_DURATION
      });
    });
    links.map(link =>
      link.transitionColor(this.theme.colors.line.active, {
        duration: TRANSITION_DURATION
      })
    );
    links.map(link => link.toFront());
  }

  /**
   *
   * Zoom
   */
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
    animate && this.focusBBox(this.paper.getContentBBox());
  }
  focusBBox(bBox) {
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
}
