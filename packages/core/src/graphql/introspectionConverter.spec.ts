import IntrospectionBirdseye from "./introspectionConverter";
import dummySchema from "./referenceSchema.new";
import birdseyeDataStructureTests from "./birdseyeDataStructureTests";

const schema = dummySchema.data.__schema as any;
const getBirdseyeInstance = () => new IntrospectionBirdseye(schema);

birdseyeDataStructureTests("IntrospectionConverter", getBirdseyeInstance);
