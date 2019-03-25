import { mapToArray } from "./utils";

export class Birdseye {
    typeMap: { [key: string]: Type };
    connections: Array<Connection> = [];
    config: Config;
    constructor(config = {}) {
        this.config = config;
    }
    addConnection(connection: Connection) {
        this.connections.push(connection);
    }
}

export class Type {
    name: string;
    fieldMap: { [key: string]: Field } = {};
    constructor(name: string) {
        this.name = name;
    }
    addField(field: Field) {
        this.fieldMap[field.name] = field;
    }
    getFieldArray() {
        return mapToArray(this.fieldMap);
    }
}
export type Scalar = string;
export class Field {
    name: string;
    type: Type | Scalar;
}
export class Connection {
    source: Type | Field;
    target: Type | Field;
};
export type Config = {};