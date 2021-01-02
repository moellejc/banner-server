import { Point } from "geojson";
import { GraphQLScalarType, Kind } from "graphql";
export const PointScalar = new GraphQLScalarType({
  name: "Point",
  description: "A set of coordinates. x, y",
  parseValue(value): string {
    // check the type of received value
    if (!("type" in value) || !("coordinates" in value)) {
      throw new Error("PointScalar can only serialize Point values");
    }
    let v: Point = value as Point;

    return v.coordinates.toString();
  },
  serialize(value: unknown): Point {
    // check the type of received value
    console.log(value);
    if (typeof value !== "object") {
      throw new Error("PointScalar can only parse string values (serialize)");
    }
    return value as Point;
  },
  parseLiteral(ast): Point {
    if (ast.kind !== Kind.OBJECT) {
      throw new Error(
        "PointScalar can only parse string value (parse literal)"
      );
    }

    let p: Point = { type: "Point", coordinates: [] };
    try {
      p.type = ast.fields[0].value.value;
      p.coordinates = [
        ast.fields[1].value.values[0].value as number,
        ast.fields[1].value.values[1].value as number,
      ];
    } catch {
      throw new Error("PointScalar issue creating Point object");
    }

    return p;
  },
});
