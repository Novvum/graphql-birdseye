import IntrospectionBirdseye from './introspectionConverter';
import { Birdseye, Type } from '../dataStructure';
import dummySchema from './dummySchema';

describe('IntrospectionConverter', () => {
  const schema = dummySchema.data.__schema as any;
  let birdseye;
  beforeEach(() => {
    birdseye = new IntrospectionBirdseye(schema);
  })
  it('inherits from Birdseye datastructure', () => {
    expect(IntrospectionBirdseye.prototype).toBeInstanceOf(Birdseye)
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
      type = new IntrospectionBirdseye(schema).typeMap.Comic;
    })
    it('has fields', () => {
      expect(type.fieldMap).toBeTruthy();
    })
    describe("Fields", () => {
      let fields;
      beforeEach(() => {
        fields = new IntrospectionBirdseye(schema).typeMap.Comic.fieldMap;
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
        expect(variants.typeLabel).toBe("[Summary!]");
      })
    })
  })
})

