import IntrospectionBirdseye from "./introspectionConverter";
import { BirdseyeDataStructure, Type } from "../dataStructure";
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
    expect(birdseye.typeMap).toBeTruthy();
  });
  describe("Types", () => {
    let type;
    beforeEach(() => {
      type = new IntrospectionBirdseye(schema).typeMap.Post;
    });
    it("has fields", () => {
      expect(type.fieldMap).toBeTruthy();
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
      expect(type.fieldMap).toBeTruthy();
    });
  });
  describe("Unions", () => {});
});
