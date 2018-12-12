import {
  GraphQLOutputType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLNamedType,
  GraphQLType
} from "graphql";

var baseEntities = ["Boolean", "Int", "String", "Float", "ID"];
var filteredTypes = ["DateTime"];

export type NestedType = Exclude<
  GraphQLOutputType,
  GraphQLList<any> | GraphQLNonNull<any>
>;
export function getNestedType(outputType: GraphQLOutputType): NestedType {
  if (!Object.keys(outputType).includes("name")) {
    return getNestedType(
      (outputType as GraphQLList<any> | GraphQLNonNull<any>).ofType
    );
  }
  return outputType as NestedType;
}

export function getFieldLabel(type: GraphQLType): string {
  if (type.constructor.name === "GraphQLList") {
    return `[${getFieldLabel((type as GraphQLList<GraphQLType>).ofType)}]`;
  }
  if (type.constructor.name === "GraphQLNonNull") {
    return `${getFieldLabel((type as GraphQLNonNull<GraphQLType>).ofType)}`;
  }
  return `${
    (type as Exclude<
      GraphQLType,
      GraphQLList<GraphQLType> | GraphQLNonNull<GraphQLType>
    >).name
  }`;
}

export function isBaseEntity(entity: GraphQLNamedType): boolean {
  return (
    entity.name.startsWith("__") ||
    baseEntities.indexOf(entity.name) > -1 ||
    ["GraphQLEnumType", "GraphQLInputObjectType", "GraphQLScalarType"].includes(
      entity.constructor.name
    )
  );
}

export function isFilteredEntity(entity: any) {
  return filteredTypes.indexOf(entity.name) > -1;
}
