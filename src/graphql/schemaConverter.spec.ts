import SchemaBirdseye from './schemaConverter';
import { Birdseye, Type, Scalar } from '../dataStructure';
import { buildClientSchema } from 'graphql';
import { smallSchema /** smallSchema bigSchema */ as dummySchema } from "../../example/src/dummySchema";

describe('SchemaConverter', () => {
  const schema = buildClientSchema(dummySchema.data);
  let birdseye;
  beforeEach(() => {
    birdseye = new SchemaBirdseye(schema);
  })
  it('inherits from Birdseye datastructure', () => {
    expect(SchemaBirdseye.prototype).toBeInstanceOf(Birdseye)
  })
  it('initializes properly', () => {
    expect(birdseye).toBeTruthy();
  })
  it('creates a typeMap', () => {
    expect(birdseye.typeMap).toBeTruthy()
  })
  describe('Types', () => {
    let type;
    beforeEach(() => {
      type = new SchemaBirdseye(schema).typeMap.Comic;
    })
    it('has fields', () => {
      expect(type.fieldMap).toBeTruthy();
    })
    describe("Fields", () => {
      let fields;
      beforeEach(() => {
        fields = new SchemaBirdseye(schema).typeMap.Comic.fieldMap;
      })
      it('is defined', () => {
        expect(fields.id).toBeTruthy();
      })
      it('can be another type', () => {
        expect(fields.variants.type).toBeInstanceOf(Type);
      })
      it('can be ID type', () => {
        expect(fields.id.type).toBe("ID");
      })
      it('can be String type', () => {
        expect(fields.title.type).toBe("String");
      })
      it('has a name and typeLabel', () => {
        const variants = fields.variants;
        expect(variants.name).toBe("variants");
        expect(variants.typeLabel).toBe("[Summary]");
      })
    })
  })
})
