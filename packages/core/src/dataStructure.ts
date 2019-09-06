import { mapToArray } from "./utils";

export class BirdseyeDataStructure {
  typeMap: { [key: string]: Type } = {};
  // connections: Array<Connection> = [];
  config: Config = {};
  constructor(config = {}) {
    this.config = config;
  }
  // addConnection(connection: Connection) {
  //     this.connections.push(connection);
  // }
  getType(name: string) {
    return this.typeMap[name];
  }
  private getAdjacentTypes(activeType: string) {
    return mapToArray(this.typeMap).filter((type) => {
      if (activeType === "root") {
        if (["Query", "QueryRoot", "Mutation"].includes(type.name)) {
          return true;
        }
        return (
          this.checkRelation("Query", type) ||
          this.checkRelation("QueryRoot", type) ||
          this.checkRelation("Mutation", type)
        );
      }
      if (activeType === type.name) {
        return true;
      }
      return (
        type.isRelatedTo(this.getType(activeType)) ||
        this.getType(activeType).isRelatedTo(type)
      );
    });
  }
  private checkRelation(typeName: string, targetType: Type) {
    return (
      this.getType(typeName) && this.getType(typeName).isRelatedTo(targetType)
    );
  }
}

export type TypeKind = "OBJECT" | "INTERFACE" | "UNION";
export class Type {
  name: string;
  kind: TypeKind = "OBJECT";
  fieldMap: { [key: string]: Field } = {};
  constructor(name: string, kind: TypeKind = "OBJECT") {
    this.name = name;
    this.kind = kind;
  }
  addField(field: Field) {
    this.fieldMap[field.name] = field;
  }
  getFields() {
    return this.fieldMap;
  }
  getFieldArray() {
    return mapToArray(this.fieldMap);
  }
  isRelatedTo(type: Type) {
    return (
      mapToArray(this.fieldMap).find((field) => field.type === type) && true
    );
  }
}
export class AbstractType extends Type {
  implementations: Implementation[];
  constructor(name: string, kind: TypeKind) {
    super(name, kind);
  }
  addImplementation(implementation: Implementation) {
    if (this.implementations) {
      this.implementations.push(implementation);
    } else {
      this.implementations = [implementation];
    }
  }
}
export type Scalar = string;
export class Field {
  name: string;
  typeLabel: string;
  type: Type | Scalar;
}

export class Implementation {
  name: string;
  type: Type;
}
export class Connection {
  source: Type | Field;
  target: Type | Field;
}
export type Config = {};
