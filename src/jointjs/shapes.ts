export default (joint, theme) => {
  joint.shapes.basic.Generic.define(
    "devs.Model",
    {
      inPorts: [],
      outPorts: [],
      size: {
        width: 300,
        height: "auto"
      },
      attrs: {
        ".": {
          magnet: false
        },
        ".label": {
          ...theme.header.label,
          "ref-x": 0.5,
          "ref-y": 10
        },
        ".header": {
          ...theme.header.container,
          "ref-width": "100%"
        },
        ".body": {
          ...theme.body,
          "ref-width": "100%",
          "ref-height": "100%",
          y: theme.header.container.height
        },
        ".joint-port": {
          y: theme.row.height
        }
      },
      ports: {
        groups: {
          in: {
            position: {
              name: "left",
              args: {
                dy: theme.row.height
              }
            },
            attrs: {
              ".port-label": theme.row.label,
              ".port-body": {
                fill: "#fff",
                stroke: "#000",
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
                dy: theme.row.height
              }
            },
            attrs: {
              ".port-label": {
                fill: "#000"
              },
              ".port-body": {
                ...theme.row.body,
                y: -theme.row.body.height / 2,
                magnet: true
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
        this._setSize();
      },
      _setSize: function() {
        var portCount = Math.max(
          this.get("inPorts").length,
          this.get("outPorts").length
        );
        const size = this.get("size");
        let height = size.height;
        let width = size.width;
        if (!size.height || size.height === "auto") {
          height = portCount * 40;
        }
        const maxInportLength = Math.max(
          ...this.get("inPorts").map((port: string) => port.length)
        );
        const maxOutportLength = Math.max(
          ...this.get("outPorts").map(
            (port: { id: any; label: string }) => port.label.length
          )
        );
        width = Math.max(width, (maxInportLength + maxOutportLength) * 10 + 20);
        this.set("size", {
          ...size,
          height,
          width
        });
      },
      createPortItem: function(group: any, port: any) {
        this._setSize();
        return {
          id: typeof port === "object" ? port.id : port,
          group: group,
          attrs: {
            ".port-label": {
              text: typeof port === "object" ? port.label : port
            },
            ".port-body": {
              width: group === "out" ? this.get("size").width : 0,
              x: -this.get("size").width
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
  joint.dia.Link.define(
    "devs.Link",
    {
      attrs: {
        line: {
          ...theme.line,
          connection: true
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
};
