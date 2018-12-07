var baseEntities = ["Boolean", "Int", "String", "Float", "ID"];
var filteredTypes = ["DateTime"];

export function getNestedType(type: any): any {
  if (type.kind === "LIST" || type.kind === "NON_NULL") {
    return getNestedType(type.ofType);
  }
  return type;
}

export function isBaseEntity(entity: any = {}) {
  return (
    entity.name.startsWith("__") ||
    baseEntities.indexOf(entity.name) > -1 ||
    ["ENUM", "INPUT_OBJECT"].includes(entity.kind)
  );
}

export function isFilteredEntity(entity: any) {
  return filteredTypes.indexOf(entity.name) > -1;
}
