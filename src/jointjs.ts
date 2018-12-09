import joint from "jointjs/index";

joint.shapes.basic.Generic.define(
  "devs.Model",
  {
    inPorts: [],
    outPorts: [],
    size: {
      width: 200,
      height: "auto"
    },
    attrs: {
      ".": {
        magnet: false
      },
      ".label": {
        text: "Model",
        "ref-x": 0.5,
        "ref-y": 10,
        "font-size": 18,
        "text-anchor": "middle",
        fill: "white"
      },
      ".header": {
        "ref-width": "100%",
        height: 36.5,
        fill: "#548f9e",
        stroke: "#548f9e"
      },
      ".body": {
        "ref-width": "100%",
        "ref-height": "100%",
        y: 36.5,
        stroke: "#548f9e"
      },
      ".joint-port": {
        y: 36.5
      }
    },
    ports: {
      groups: {
        in: {
          position: {
            name: "left",
            args: {
              dy: 36.5
            }
          },
          attrs: {
            ".port-label": {
              fill: "#000"
            },
            ".port-body": {
              fill: "#fff",
              stroke: "#548f9e",
              height: 40,
              y: -20,
              magnet: false
            }
          },
          label: {
            position: {
              name: "right",
              args: {
                y: 0
              }
            }
          }
        },
        out: {
          position: {
            name: "right",
            args: {
              dy: 36.5
            }
          },
          attrs: {
            ".port-label": {
              fill: "#000"
            },
            ".port-body": {
              fill: "#fff",
              stroke: "#000",
              magnet: false
            }
          },
          label: {
            position: {
              name: "left",
              args: {
                y: 0
              }
            }
          }
        }
      }
    }
  },
  {
    markup:
      '<g class="rotatable"><rect class="header"/><rect class="body"/><text class="label"/></g>',
    portMarkup: '<rect class="port-body"/>',
    portLabelMarkup: '<text class="port-label"/>',

    initialize: function() {
      joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments);

      this.on("change:inPorts change:outPorts", this.updatePortItems, this);
      this.updatePortItems();
    },

    updatePortItems: function(_model: any, _changed: any, opt: any) {
      // Make sure all ports are unique.
      var inPorts = joint.util.uniq(this.get("inPorts"));
      var outPorts = joint.util.difference(
        joint.util.uniq(this.get("outPorts")),
        inPorts
      );

      var inPortItems = this.createPortItems("in", inPorts);
      var outPortItems = this.createPortItems("out", outPorts);
      this.prop(
        "ports/items",
        inPortItems.concat(outPortItems),
        joint.util.assign({ rewrite: true }, opt)
      );
      var portCount = Math.max(inPorts.length, outPorts.length);
      this._setSize(portCount);
    },
    _setSize: function(portCount: number) {
      const size = this.get("size");
      const height = portCount * 40;
      if (!size.height || size.height === "auto") {
        this.set("size", {
          ...size,
          height
        });
      }
    },
    createPortItem: function(group: any, port: any) {
      return {
        id: typeof port === "object" ? port.id : port,
        group: group,
        attrs: {
          ".port-label": {
            text: typeof port === "object" ? port.label : port
          },
          ".port-body": {
            width: group === "in" ? this.get("size").width : 0
          }
        }
      };
    },

    createPortItems: function(group: any, ports: any) {
      return joint.util
        .toArray(ports)
        .map(this.createPortItem.bind(this, group));
    },

    _addGroupPort: function(port: any, group: any, opt: any) {
      var ports = this.get(group);
      return this.set(
        group,
        Array.isArray(ports) ? ports.concat(port) : [port],
        opt
      );
    },

    addOutPort: function(port: any, opt: any) {
      return this._addGroupPort(port, "outPorts", opt);
    },

    addInPort: function(port: any, opt: any) {
      return this._addGroupPort(port, "inPorts", opt);
    },

    _removeGroupPort: function(port: any, group: any, opt: any) {
      return this.set(group, joint.util.without(this.get(group), port), opt);
    },

    removeOutPort: function(port: any, opt: any) {
      return this._removeGroupPort(port, "outPorts", opt);
    },

    removeInPort: function(port: any, opt: any) {
      return this._removeGroupPort(port, "inPorts", opt);
    },

    _changeGroup: function(group: any, properties: any, opt: any) {
      return this.prop(
        "ports/groups/" + group,
        joint.util.isObject(properties) ? properties : {},
        opt
      );
    },

    changeInGroup: function(properties: any, opt: any) {
      return this._changeGroup("in", properties, opt);
    },

    changeOutGroup: function(properties: any, opt: any) {
      return this._changeGroup("out", properties, opt);
    }
  }
);

joint.shapes.devs.Model.define("devs.Atomic", {
  size: {
    width: 80,
    height: 80
  },
  attrs: {
    ".label": {
      text: "Atomic"
    }
  }
});

joint.shapes.devs.Model.define("devs.Coupled", {
  size: {
    width: 200,
    height: 300
  },
  attrs: {
    ".label": {
      text: "Coupled"
    }
  }
});

joint.dia.Link.define(
  "devs.Link",
  {
    attrs: {
      line: {
        connection: true,
        stroke: "#38616b",
        fill: "transparent",
        strokeWidth: 2,
        // strokeLinejoin: "round",
        targetMarker: {
          type: "path",
          d: "M 10 -5 0 0 10 5 z"
        }
      },
      wrapper: {
        connection: true,
        strokeWidth: 2,
        strokeLinejoin: "round"
      }
    }
  },
  {
    markup: [
      {
        tagName: "path",
        selector: "wrapper",
        attributes: {
          fill: "none",
          cursor: "pointer",
          stroke: "transparent"
        }
      },
      {
        tagName: "path",
        selector: "line",
        attributes: {
          fill: "none",
          "pointer-events": "none"
        }
      }
    ]
  }
);

export default joint;
