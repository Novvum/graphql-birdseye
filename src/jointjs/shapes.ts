import { Theme } from "../defaultTheme";

export default (joint, theme: Theme) => {
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
          magnet: false,
          opacity: 1
        },
        ".container": {
          ...theme.container,
          "ref-width": "100%",
          "ref-height": theme.header.height + theme.gap * 2 + 5,
          "ref-height-2": "100%"
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
        ".divider": {
          "ref-width": "1",
          "ref-width-2": "100%",
          y: theme.header.height,
          ...theme.divider
        },
        ".joint-port": {
          y: theme.row.height
        }
      },
      ports: {
        groups: {
          out: {
            position: {
              name: "right",
              args: {
                dy: theme.header.height + theme.gap
              }
            },
            attrs: {
              ".port-label": {
                ...theme.row.fieldTypeLabel
              },
              ".port-body": {
                ...theme.row.body,
                y: -theme.row.height / 2,
                magnet: true
              },
              ".port-body-highlighter": {
                rx: 5,
                fill: "transparent",
                cursor: "pointer"
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
          },
          in: {
            position: {
              name: "left",
              args: {
                dy: theme.header.height + theme.gap
              }
            },
            attrs: {
              ".port-label": theme.row.fieldNameLabel,
              ".port-body": {
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
          }
        }
      }
    },
    {
      markup:
        '<g class="rotatable"><rect class="container"/><rect class="header"/><text class="label"/><rect class="divider" /></g>',
      portMarkup:
        '<g class="port-body-container"><rect class="port-body"/><rect class="port-body-highlighter" /></g>',
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
          outPortItems.concat(inPortItems),
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
          height =
            portCount * theme.row.height + theme.header.height + theme.gap;
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
        this.set("attrs/.container/height", height);
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
            },
            ".port-body-highlighter": {
              width: group === "out" ? this.get("size").width - 20 : 0,
              x: -this.get("size").width + 10,
              height: theme.row.height,
              y: -theme.row.height / 2
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
