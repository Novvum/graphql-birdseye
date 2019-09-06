import {
  BirdseyeDataStructure,
  Type as BirdseyeType,
  AbstractType as BirdseyeAbstractType,
  Field as BirdseyeField,
  Implementation as BirdseyeImplementation,
} from "../dataStructure";
import {
  IntrospectionSchema,
  IntrospectionType,
  IntrospectionObjectType,
  IntrospectionInterfaceType,
  IntrospectionOutputTypeRef,
  IntrospectionOutputType,
  IntrospectionListTypeRef,
  IntrospectionNonNullTypeRef,
  IntrospectionNamedTypeRef,
  IntrospectionField,
  IntrospectionUnionType,
} from "./utilities/introspectionQuery";
import { mapToArray, arrayToMap } from "../utils";

type FilteredIntrospectionType =
  | IntrospectionObjectType
  | IntrospectionInterfaceType
  | IntrospectionUnionType;
type FilteredTypeMap = {
  [key: string]: FilteredIntrospectionType;
};

export default class DataStructure extends BirdseyeDataStructure {
  constructor(schema: IntrospectionSchema, config = {}) {
    super(config);
    this.typeMap = this.convert(schema.types);
  }
  convert(types: ReadonlyArray<IntrospectionType>) {
    const filteredTypeMap = this.filterTypes(types);
    const birdseyeTypeMap = this.convertToBirdseyeTypeMap(filteredTypeMap);
    return birdseyeTypeMap;
  }
  private convertToBirdseyeTypeMap(filteredTypeMap: FilteredTypeMap) {
    // convert type
    const birdseyeTypeMap = mapToArray(filteredTypeMap).reduce(
      (accumulator, type) => {
        let birdseyeType;
        if (["UNION", "INTERFACE"].includes(type.kind)) {
          birdseyeType = new BirdseyeAbstractType(type.name, type.kind);
        } else {
          birdseyeType = new BirdseyeType(type.name);
        }
        accumulator[type.name] = birdseyeType;
        return accumulator;
      },
      {} as {
        [key: string]: BirdseyeType;
      }
    );
    // add fields and implementations
    mapToArray(birdseyeTypeMap).map((birdseyeType) => {
      // Fields
      const fields =
        (filteredTypeMap[birdseyeType.name] as
          | IntrospectionInterfaceType
          | IntrospectionObjectType).fields || [];
      fields.map((field) => {
        const birdseyeField = this.convertToBirdseyeField(
          field,
          birdseyeTypeMap
        );
        // if (target) {
        //     const birdseyeConnection = new BirdseyeConnection();
        //     birdseyeConnection.source = birdseyeType;
        //     birdseyeConnection.target = target;
        //     this.addConnection(birdseyeConnection);
        // }
        birdseyeType.addField(birdseyeField);
      }, {});
      // Implementations
      if (birdseyeType instanceof BirdseyeAbstractType) {
        const implementations =
          (filteredTypeMap[birdseyeType.name] as
            | IntrospectionInterfaceType
            | IntrospectionUnionType).possibleTypes || [];
        implementations.map((implementation) => {
          const birdseyeImplementation = new BirdseyeImplementation();
          birdseyeImplementation.name = implementation.name;
          birdseyeImplementation.type = birdseyeTypeMap[implementation.name];
          birdseyeType.addImplementation(birdseyeImplementation);
        });
      }
    });

    return birdseyeTypeMap;
  }

  private convertToBirdseyeField(
    field: IntrospectionField,
    birdseyeTypeMap: { [key: string]: BirdseyeType }
  ) {
    const birdseyeField = new BirdseyeField();
    birdseyeField.name = field.name;
    birdseyeField.typeLabel = this.getFieldLabel(field.type);
    if (!birdseyeField.typeLabel || birdseyeField.typeLabel === "undefined") {
      birdseyeField.typeLabel = this.getFieldLabel(field.type);
    }
    const type = this.getNestedType(field.type).name;
    if (!type) {
      console.log(type, field.type);
    }
    const target = birdseyeTypeMap[type];
    birdseyeField.type = target || type;
    return birdseyeField;
  }

  private filterTypes(
    types: ReadonlyArray<IntrospectionType>
  ): FilteredTypeMap {
    const typeMap = arrayToMap(types, (t) => t.name);
    return types
      .filter((type) => {
        if (this.isBaseEntity(type)) {
          return false;
        }
        return true;
      })
      .reduce(
        (acc, type) => {
          acc[type.name] = typeMap[type.name] as FilteredIntrospectionType;
          return acc;
        },
        {} as FilteredTypeMap
      );
  }
  isBaseEntity(type: IntrospectionType) {
    return (
      ["SCALAR", "ENUM", "INPUT_OBJECT"].includes(type.kind) ||
      type.name.startsWith("__") ||
      type.name === "Mutation"
    );
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
  getNestedType(
    outputType: IntrospectionOutputTypeRef
  ): IntrospectionOutputType {
    if (!Object.keys(outputType).includes("name") || !outputType["name"]) {
      return this.getNestedType(
        (outputType as
          | IntrospectionListTypeRef<any>
          | IntrospectionNonNullTypeRef<
              | IntrospectionNamedTypeRef<IntrospectionOutputType>
              | IntrospectionListTypeRef<any>
            >).ofType
      );
    }
    return outputType as IntrospectionOutputType;
  }
}
