import { mapToArray } from "./utils";

export class Birdseye {
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
    private getAdjacentTypes(
        activeType: string
    ) {
        return mapToArray(this.typeMap)
            .filter(type => {
                if (activeType === "root") {
                    if (type.name === "Query" || type.name === "Mutation") {
                        return true;
                    }
                    return (
                        (this.getType("Query") &&
                            this.getType("Query").isRelatedTo(type)) ||
                        (this.getType("Mutation") &&
                            this.getType("Mutation").isRelatedTo(type))
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
    getFields() {
        return this.fieldMap;
    }
    getFieldArray() {
        return mapToArray(this.fieldMap);
    }
    isRelatedTo(type: Type) {
        return mapToArray(this.fieldMap).find((field) => field.type === type) && true;
    }
}
export type Scalar = string;
export class Field {
    name: string;
    typeLabel: string;
    type: Type | Scalar;
}
export class Connection {
    source: Type | Field;
    target: Type | Field;
};
export type Config = {};