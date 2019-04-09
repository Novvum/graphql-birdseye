import injectCustomRouter from "./router";
import injectCustomShapes from "./shapes";
import defaultTheme, { Theme } from "../theme";
import { Birdseye, Type as BirdseyeType } from "../dataStructure";
import { mapToArray } from "../utils";
var joint = require("jointjs");
var svgPanZoom = require("svg-pan-zoom");
var animate = require("@f/animate");
const TRANSITION_DURATION = 500;

export type EventType = "loading:start" | "loading:stop";

export default class JointJS {
  /**
   * config
   */
  private theme: Theme;
  private activeType: string = "root";
  private animation: boolean = true;
  private dataStructure: Birdseye;
  private maxZoom: number = 20;

  /**
   * internal
   */
  private eventMap: { [key in EventType]?: () => any } = {};
  private graph: any;
  private paper: any;
  private panZoom: any;
  private cachedCells = {};
  private cachedLinks = {};
  private mounted: boolean = false;

  constructor(opts: { theme?: Theme }) {
    const { theme = defaultTheme } = opts;
    injectCustomShapes(joint, theme);
    injectCustomRouter(joint);
    this.theme = theme;
  }
  async init(el: any, bounds: any, dataStructure: Birdseye) {
    this.dataStructure = dataStructure;
    this.graph = new joint.dia.Graph();
    this.paper = new joint.dia.FastPaper({
      el,
      model: this.graph,
      width: bounds.width,
      height: bounds.height,
      background: {
        color: this.theme.colors.background
      },
      gridSize: 1,
      async: true,
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
    await this.renderElements({ animate: false });
    this.bindInteractionEvents();
    this.paper.on("render:done", () => {
      this.paper.options.async = false;
      this.resizeToFit({ animate: false });
      this.mounted = true;
    })
  }

  destroy() {
    this.paper.cancelRenderViews();
    this.paper.clearGrid();
    this.graph.clear();
    this.paper.remove();
    delete this.graph;
    delete this.paper;
    delete this.panZoom;
  }

  private bindInteractionEvents() {
    // show link tools
    this.paper.on("link:mouseover", (linkView: any) => {
      const links = this.graph.getLinks();
      links.map(link => {
        if (link === linkView.model) {
          return;
        }
        link.transitionColor(this.theme.colors.line.inactive, {
          duration: TRANSITION_DURATION / 2
        })
        link.toBack()
      });
      linkView.model.transitionColor(this.theme.colors.line.active, {
        duration: TRANSITION_DURATION / 2
      });
      linkView.model.toFront({
        deep: true
      });
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
      cell.model.toFront({
        deep: true
      });
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
  async startLoading() {
    const onStart = this.eventMap["loading:start"];
    if (onStart) {
      return await onStart();
    }
  }
  async stopLoading() {
    const onStop = this.eventMap["loading:stop"];
    if (onStop) {
      return await onStop();
    }
  }
  enableAnimation() {
    this.animation = true;
  }
  disableAnimation() {
    this.animation = false;
  }
  async setDataStructure(newTypeMap) {
    this.dataStructure = newTypeMap;
    delete this.cachedCells, this.cachedLinks;
    this.cachedCells = {};
    this.cachedLinks = {};
    await this.renderElements({ dataStructure: newTypeMap, animate: false });
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
  setSize(width: number, height: number) {
    this.paper.setDimensions(width, height);
    this.panZoom && this.panZoom.resize()
  }

  /**
   *
   * Render
   */
  async renderElements(opts?: {
    dataStructure?: any;
    activeType?: string;
    animate?: boolean;
  }) {
    await this.startLoading();
    const newGraph = new joint.dia.Graph().fromJSON(this.graph.toJSON())
    const {
      dataStructure = this.dataStructure,
      activeType = this.activeType,
      animate = this.animation
    } = opts || {};
    const toRenderTypes: BirdseyeType[] = dataStructure.getAdjacentTypes(
      activeType
    );
    await Promise.all([
      this.removeUnusedElements(toRenderTypes, newGraph),
      this.addNewElements(toRenderTypes, newGraph)
    ]);
    await this.layoutGraph({ animate, newGraph: newGraph });
    await this.stopLoading();
  }

  private async removeUnusedElements(
    toRenderTypes: BirdseyeType[],
    graph = this.graph
  ) {
    const currentElements = graph.getElements();
    const toRemove = currentElements.filter(
      (elem: any) => !toRenderTypes.find(type => type.name === elem.id)
    ).map(elem => [elem, ...graph.getConnectedLinks(elem)]);
    graph.removeCells(...[].concat.apply([], toRemove));
  }
  private async addNewElements(
    toRenderTypes: BirdseyeType[],
    graph = this.graph
  ) {
    function getPortId(t, f, ct) {
      return `${t.name}_${f.name}_${ct.name}`;
    }
    const currentElements = graph.getElements();
    const filtered = toRenderTypes.filter(type => {
      return !currentElements.find((elem: any) => elem.id === type.name);
    });
    const nodes = filtered.map(type => {
      const fields = type.getFields();
      return this.createNode({
        id: type.name,
        position: (
          graph.getBBox() || this.paper.getContentBBox()
        ).topLeft(),
        attrs: {
          ".label": {
            text: type.name
          }
        },
        inPorts: Object.keys(fields),
        outPorts: mapToArray(fields).map(field => {
          const connectedType = field.type;
          const id = getPortId(type, field, connectedType);
          let label = field.typeLabel;
          return {
            id,
            label
          };
        })
      });
    });
    const links = toRenderTypes.map(type => {
      const fields = type.getFields();
      const targetMap = mapToArray(fields).reduce((accumulator, field) => {
        const connectedType = field.type;
        if (
          connectedType instanceof BirdseyeType && toRenderTypes.findIndex(type => type.name === connectedType.name) >
          -1
        ) {
          accumulator[connectedType.name] = [
            ...(accumulator[connectedType.name] || []),
            field
          ];
        }
        return accumulator;
      }, {});
      return (Object.keys(targetMap).map(targetId => this.createLink(type.name, targetId)));
    })
    graph.addCells([...nodes, ...[].concat.apply([], links)]);
  }

  private async layoutGraph(opts?: { animate?: boolean; newGraph: any }) {
    const { animate = true, newGraph = this.graph } = opts || {};
    const originalPositions = newGraph
      .getElements()
      .reduce((accumulator, cell) => {
        accumulator[cell.attributes.id] = cell.position();
        return accumulator;
      }, {});
    joint.layout.DirectedGraph.layout(newGraph, {
      nodeSep: 200,
      rankSep: 500,
      rankDir: "LR"
    });
    this.graph.fromJSON(newGraph.toJSON());
    await Promise.all([
      this.mounted && this.resizeToFit(),
      ...this.graph
        .getElements()
        .map(async cell => {
          if (!animate) {
            return;
          }
          const originalPosition = originalPositions[cell.attributes.id];
          const targetPosition = cell.position();
          cell.position(originalPosition.x, originalPosition.y);
          const links = this.graph.getConnectedLinks(cell);
          this.graph.removeLinks(cell);
          await cell.transitionPosition(targetPosition, {
            duration: TRANSITION_DURATION
          });
          links.map(async link => {
            link.addTo(this.graph);
          })
        })
    ]);
    this.graph.resetCells(this.graph.getCells());
  }

  /**
   * Helpers
   */

  private createNode(node: any) {
    const cachedCell = this.cachedCells[node.id];
    if (cachedCell) {
      return cachedCell
    }
    var a1 = new joint.shapes.devs.Type(node);
    this.cachedCells[node.id] = a1;
    return a1;
  }
  private createLink(sourceId: string, targetId: string) {
    const hash = `${sourceId}_${targetId}`;
    const cachedLink = this.cachedLinks[hash]
    if (cachedLink) {
      return cachedLink;
    }
    var link = new joint.shapes.devs.Link();
    link.source({
      id: sourceId,
      anchor: {
        name: `top`,
        args: {
          dy: 5
        }
      }
    });
    link.target({
      id: targetId,
      anchor: {
        name: `top`,
        args: {
          dy: this.theme.row.height - 5,
          dx: 10
        }
      }
    });
    this.cachedLinks[hash] = link;
    return link;
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
    return port ? {
      id: port,
      link: this.graph
        .getLinks(cell)
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
      link.toBack()
    });
    links.map(link => {
      link.transitionColor(this.theme.colors.line.active, {
        duration: TRANSITION_DURATION
      })
      link.toFront({
        deep: true
      })
    });
  }

  /**
   * Zoom
   */
  private async resizeToFit(opts?: { graph?: any; animate?: boolean }) {
    const { animate = true } = opts || {};
    if (!this.panZoom) {
      this.panZoom = svgPanZoom(`#${this.paper.svg.id}`, {
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
