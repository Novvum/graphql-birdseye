import {
    Birdseye,
    Type as BirdseyeType,
    Connection as BirdseyeConnection,
    Field as BirdseyeField
} from '../dataStructure';
import { GraphQLSchema } from 'graphql';
import {
    isFilteredEntity,
    isBaseEntity,
    getNestedType,
    getFieldName as getFieldTypeName,
    FilteredGraphqlOutputType
} from "./utils";
import { TypeMap } from 'graphql/type/schema';
import { mapToArray } from '../utils';

export default class DataStructure extends Birdseye {
    constructor(schema: GraphQLSchema, config = {}) {
        super(config);
        this.convert(schema.getTypeMap());
    }
    convert(typeMap: TypeMap) {
        const filteredTypeMap = Object.keys(typeMap)
            .filter(key => {
                const type = typeMap[key];
                if (isFilteredEntity(type) || isBaseEntity(type)) {
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
                    const connectedType = getFieldTypeName(getNestedType(field.type));
                    const target = birdseyeTypeMap[connectedType];
                    birdseyeField.type = target || connectedType;
                    if (target) {
                        const birdseyeConnection = new BirdseyeConnection();
                        birdseyeConnection.source = birdseyeType;
                        birdseyeConnection.target = target;
                        this.addConnection(birdseyeConnection);
                    }
                    birdseyeType.addField(birdseyeField);
                }, {});
            })
        this.typeMap = birdseyeTypeMap;
    }
}
