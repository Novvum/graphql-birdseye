import {
    BirdseyeDataStructure,
    Type as BirdseyeType,
    Field as BirdseyeField
} from '../dataStructure';
import {
    GraphQLSchema,
    GraphQLType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLNamedType,
    GraphQLInputObjectType,
    GraphQLEnumType,
    GraphQLScalarType,
    GraphQLUnionType,
    GraphQLOutputType,
    GraphQLObjectType
} from './type/index.d';
import {
    filteredTypes,
    baseEntities,
    instanceOf
} from "./utils";
import { TypeMap } from './type/schema';
import { mapToArray } from '../utils';

export type FilteredGraphqlOutputType = Exclude<
    GraphQLNamedType,
    | GraphQLInputObjectType
    | GraphQLEnumType
    | GraphQLScalarType
    | GraphQLUnionType
>;
export type NestedType = Exclude<
    GraphQLOutputType,
    GraphQLList<any> | GraphQLNonNull<any>
>;
export default class DataStructure extends BirdseyeDataStructure {
    constructor(schema: GraphQLSchema, config = {}) {
        super(config);
        this.typeMap = this.convert(schema.getTypeMap());
    }
    convert(typeMap: TypeMap) {
        const filteredTypeMap = Object.keys(typeMap)
            .filter(key => {
                const type = typeMap[key];
                if (this.isFilteredEntity(type) || this.isBaseEntity(type)) {
                    return false;
                }
                return true;
            })
            .reduce((acc, k) => {
                acc[k] = typeMap[k] as FilteredGraphqlOutputType;
                return acc;
            }, {} as { [key: string]: FilteredGraphqlOutputType })
        const birdseyeTypeMap = mapToArray(filteredTypeMap).reduce((accumulator, type) => {
            const birdseyeType = new BirdseyeType(type.name);
            accumulator[type.name] = birdseyeType;
            return accumulator;
        }, {} as { [key: string]: BirdseyeType });
        mapToArray(birdseyeTypeMap)
            .map(birdseyeType => {
                const fields = filteredTypeMap[birdseyeType.name].getFields();
                Object.keys(fields).map((key) => {
                    const field = fields[key];
                    const birdseyeField = new BirdseyeField();
                    birdseyeField.name = field.name;
                    birdseyeField.typeLabel = this.getFieldLabel(field.type);
                    if (!birdseyeField.typeLabel || birdseyeField.typeLabel === 'undefined') {
                        birdseyeField.typeLabel = this.getFieldLabel(field.type)
                    }
                    const type = this.getNestedType(field.type).name;
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
    private isFilteredEntity(entity: any) {
        return filteredTypes.indexOf(entity.name) > -1;
    }
    private isBaseEntity(entity: GraphQLNamedType): boolean {
        return (
            entity.name.startsWith("__") ||
            baseEntities.indexOf(entity.name) > -1 ||
            instanceOf(["GraphQLEnumType", "GraphQLInputObjectType", "GraphQLScalarType", "GraphQLUnionType"],
                entity
            ) ||
            entity.name === "Mutation"
        );
    }
    private getFieldLabel(type: GraphQLType): string {
        if (type.constructor.name === "GraphQLList") {
            return `[${this.getFieldLabel((type as GraphQLList<GraphQLType>).ofType)}]`;
        }
        if (type.constructor.name === "GraphQLNonNull") {
            return `${this.getFieldLabel((type as GraphQLNonNull<GraphQLType>).ofType)}!`;
        }
        return `${
            (type as Exclude<
                GraphQLType,
                GraphQLList<GraphQLType> | GraphQLNonNull<GraphQLType>
            >).name
            }`;
    }
    private getNestedType(outputType: GraphQLOutputType): NestedType {
        if (!Object.keys(outputType).includes("name")) {
            return this.getNestedType(
                (outputType as GraphQLList<any> | GraphQLNonNull<any>).ofType
            );
        }
        return outputType as NestedType;
    }
    private isRelatedType(
        source: GraphQLObjectType,
        destination: GraphQLNamedType
    ) {
        const sourceFields = source.getFields();
        const matchingField =
            Object.keys(sourceFields).find(key => {
                const fieldType = this.getNestedType(sourceFields[key].type);
                return fieldType.name === destination.name;
            }) || false;
        return matchingField;
    }
}
