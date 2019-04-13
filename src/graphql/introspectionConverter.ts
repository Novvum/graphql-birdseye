import {
    Birdseye,
    Type as BirdseyeType,
    Connection as BirdseyeConnection,
    Field as BirdseyeField
} from '../dataStructure';
import { IntrospectionSchema, IntrospectionType, IntrospectionObjectType, IntrospectionInterfaceType, IntrospectionOutputTypeRef, IntrospectionOutputType, IntrospectionListTypeRef, IntrospectionNonNullTypeRef, IntrospectionNamedTypeRef } from 'graphql';
import { mapToArray, arrayToMap } from '../utils';

type FilteredIntrospectionType = IntrospectionObjectType | IntrospectionInterfaceType;


export default class DataStructure extends Birdseye {
    constructor(schema: IntrospectionSchema, config = {}) {
        super(config);
        this.typeMap = this.convert(schema.types);
    }
    convert(types: ReadonlyArray<IntrospectionType>) {
        const typeMap = arrayToMap(types, (t) => t.name)
        const filteredTypeMap = types
            .filter(type => {
                if (this.isBaseEntity(type)) {
                    return false;
                }
                return true;
            })
            .reduce((acc, type) => {
                acc[type.name] = typeMap[type.name] as FilteredIntrospectionType;
                return acc;
            }, {} as { [key: string]: FilteredIntrospectionType })
        const birdseyeTypeMap = mapToArray(filteredTypeMap).reduce((accumulator, type) => {
            const birdseyeType = new BirdseyeType(type.name);
            accumulator[type.name] = birdseyeType;
            return accumulator;
        }, {} as { [key: string]: BirdseyeType });
        mapToArray(birdseyeTypeMap)
            .map(birdseyeType => {
                const fields = filteredTypeMap[birdseyeType.name].fields;
                fields.map((field) => {
                    const birdseyeField = new BirdseyeField();
                    birdseyeField.name = field.name;
                    birdseyeField.typeLabel = this.getFieldLabel(field.type);
                    if (!birdseyeField.typeLabel || birdseyeField.typeLabel === 'undefined') {
                        birdseyeField.typeLabel = this.getFieldLabel(field.type)
                    }
                    const type = this.getNestedType(field.type).name;
                    if (!type) {
                        console.log(type, field.type)
                    }
                    const target = birdseyeTypeMap[type];
                    birdseyeField.type = target || type;
                    // if (target) {
                    //     const birdseyeConnection = new BirdseyeConnection();
                    //     birdseyeConnection.source = birdseyeType;
                    //     birdseyeConnection.target = target;
                    //     this.addConnection(birdseyeConnection);
                    // }

                    birdseyeType.addField(birdseyeField);
                }, {});
            })
        return birdseyeTypeMap;
    }
    isBaseEntity(type: IntrospectionType) {
        return ["SCALAR", "UNION", "ENUM", "INPUT_OBJECT"].includes(type.kind) || type.name.startsWith("__") || type.name === "Mutation"
    }
    getFieldLabel(type: IntrospectionOutputTypeRef): string {
        if (type.kind === "LIST") {
            return `[${this.getFieldLabel(type.ofType)}]`;
        }
        if (type.kind === "NON_NULL") {
            return `${this.getFieldLabel(type.ofType)}!`;
        }
        return `${type.name}`;
    }
    getNestedType(outputType: IntrospectionOutputTypeRef): IntrospectionOutputType {
        if (!Object.keys(outputType).includes("name") || !outputType["name"]) {
            return this.getNestedType(
                (outputType as IntrospectionListTypeRef<any> | IntrospectionNonNullTypeRef<IntrospectionNamedTypeRef<IntrospectionOutputType> | IntrospectionListTypeRef<any>>).ofType
            );
        }
        return outputType as IntrospectionOutputType;
    }
}
