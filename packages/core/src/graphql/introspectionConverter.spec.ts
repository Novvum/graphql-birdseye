import IntrospectionBirdseye from "./introspectionConverter";
import { BirdseyeDataStructure, Type, AbstractType } from "../dataStructure";
import dummySchema from "./dummySchema.new";

describe("IntrospectionConverter", () => {
  const schema = dummySchema.data.__schema as any;
  let birdseye;
  beforeEach(() => {
    birdseye = new IntrospectionBirdseye(schema);
  });
  it("inherits from Birdseye datastructure", () => {
    expect(IntrospectionBirdseye.prototype).toBeInstanceOf(
      BirdseyeDataStructure
    );
  });
  it("initializes properly", () => {
    expect(birdseye).toBeTruthy();
  });
  it("creates a typeMap", () => {
    expect(Object.keys(birdseye.typeMap).length).toBeGreaterThan(0);
  });
  describe("Types", () => {
    let type;
    beforeEach(() => {
      type = new IntrospectionBirdseye(schema).typeMap.Post;
    });
    it("has fields", () => {
      expect(Object.keys(type.fieldMap).length).toBeGreaterThan(0);
    });
    it("has no implementations", () => {
      expect(type.implementations).toBeFalsy();
    });
    describe("Fields", () => {
      let fields;
      beforeEach(() => {
        fields = new IntrospectionBirdseye(schema).typeMap.Post.fieldMap;
      });
      it("is defined", () => {
        expect(fields.id).toBeTruthy();
      });
      it("can be a type", () => {
        expect(fields.author.type).toBeInstanceOf(Type);
      });
      it("can be ID", () => {
        expect(fields.id.type).toBe("ID");
      });
      it("can be String", () => {
        expect(fields.title.type).toBe("String");
      });
      it("can be a List", () => {
        expect(fields.relatedPosts.type).toBeInstanceOf(Type);
        expect(fields.relatedPosts.typeLabel).toBe("[Post!]!");
      });
      it("has a name and typeLabel", () => {
        const author = fields.author;
        expect(author.name).toBe("author");
        expect(author.typeLabel).toBe("User");
      });
    });
  });
  describe("Interfaces", () => {
    let type;
    beforeEach(() => {
      type = new IntrospectionBirdseye(schema).typeMap.Publication;
    });
    it("has fields", () => {
      expect(Object.keys(type.fieldMap).length).toBeGreaterThan(0);
    });
    it("has implementations", () => {
      expect(type.implementations.length).toBeGreaterThan(0);
    });
    describe("Implementations", () => {
      let implementation;
      beforeEach(() => {
        implementation = (new IntrospectionBirdseye(schema).typeMap
          .Publication as AbstractType).implementations[0];
      });
      it("has a name, label, and type", () => {
        expect(implementation.name).toBeTruthy();
        expect(implementation.label).toBeTruthy();
        expect(implementation.type).toBeTruthy();
      });
    });
  });
  describe("Unions", () => {
    let type;
    beforeEach(() => {
      type = new IntrospectionBirdseye(schema).typeMap.TestUnion;
    });
    it("has no fields", () => {
      expect(Object.keys(type.fieldMap).length).toEqual(0);
    });
    it("has implementations", () => {
      expect(type.implementations.length).toBeGreaterThan(0);
    });
    describe("Implementations", () => {
      let implementation;
      beforeEach(() => {
        implementation = (new IntrospectionBirdseye(schema).typeMap
          .Publication as AbstractType).implementations[0];
      });
      it("has a name, label, and type", () => {
        expect(implementation.name).toBeTruthy();
        expect(implementation.label).toBeTruthy();
        expect(implementation.type).toBeTruthy();
      });
    });
  });
});
