import * as React from "react";
import * as ReactDOM from "react-dom";
import joint from "./jointjs";
// var svgPanZoom = require("svg-pan-zoom");
// import Shapes from '../jointjs-configuration/Shapes'

class Graph extends React.Component {
  graph: any;
  paper: any;
  ref: any;
  constructor(props: any) {
    super(props);
    this.graph = new joint.dia.Graph();
  }

  componentDidMount() {
    const bounds = this.ref.getBoundingClientRect();
    this.paper = new joint.dia.Paper({
      el: ReactDOM.findDOMNode(this.ref),
      model: this.graph,
      width: bounds.width,
      height: bounds.height,
      gridSize: 10,
      drawGrid: true,
      defaultRouter: { name: "metro" },
      defaultConnector: { name: "rounded" }
    });
    const a1 = this.addNode({
      id: "hello",
      inPorts: ["as", "bs", "cs", "ds", "es", "fs"],
      outPorts: ["a", "b", "c", "d", "e", "f"]
    });
    console.log(a1.id);
    const a2 = this.addNode({
      inPorts: ["ad"],
      outPorts: ["a"]
    });
    const a3 = this.addNode({
      inPorts: ["ad"],
      outPorts: ["d"]
    });
    const a4 = this.addNode({
      inPorts: ["ad"],
      outPorts: ["f"]
    });
    var link = new joint.shapes.devs.Link();
    link.source({
      id: a1.id,
      port: "a"
    });
    link.target(a2);
    link.addTo(this.graph);
    var link2 = new joint.shapes.devs.Link();
    link2.source({
      id: a1.id,
      port: "c"
    });
    link2.target(a3);
    link2.addTo(this.graph);
    var link3 = new joint.shapes.devs.Link();
    link3.source(a2);
    link3.target(a4);
    link3.addTo(this.graph);
    var link4 = new joint.shapes.devs.Link();
    link4.source({
      id: a1.id,
      port: "b"
    });
    link4.target(a4);
    link4.addTo(this.graph);
    joint.layout.DirectedGraph.layout(this.graph, {
      nodeSep: 100,
      edgeSep: 100,
      rankDir: "LR"
    });
    this.paper.drawGrid({
      color: "black",
      thickness: "0.5"
    });
    // svgPanZoom("#v-2", {
    //   controlIconsEnabled: true
    // });
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

export default Graph;
