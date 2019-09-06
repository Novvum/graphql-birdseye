import SchemaBirdseye from "./schemaConverter";
import { buildClientSchema } from "graphql";
import dummySchema from "./dummySchema.new";
import birdseyeDataStructureTests from "./birdseyeDataStructureTests";

const schema = buildClientSchema(dummySchema.data as any);
birdseyeDataStructureTests("SchemaConverter", () => new SchemaBirdseye(schema));
