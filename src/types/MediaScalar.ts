import { GraphQLScalarType, Kind } from "graphql";
import { Media } from "../api/entities/Media";
import { MediaTypes } from "@prisma/client";
// import { MediaTypes } from "../api/enums/MediaTypes";

export const MediaScalar = new GraphQLScalarType({
  name: "MediaScalar",
  description: "Object describing a piece of media content",
  parseValue(value): string {
    // check the type of received value
    if (!("mediaType" in value) || !("mediaURL" in value)) {
      throw new Error("MediaScalar can only serialize Media values");
    }
    let m: Media = value as Media;

    return m.toString();
  },
  serialize(value: unknown): Media {
    // check the type of received value
    console.log(value);
    if (typeof value !== "object") {
      throw new Error("MediaScalar can only parse string values (serialize)");
    }
    return value as Media;
  },
  parseLiteral(ast): Media {
    if (ast.kind !== Kind.OBJECT) {
      throw new Error(
        "MediaScalar can only parse string value (parse literal)"
      );
    }

    console.log(ast);
    //@ts-ignore
    let m: Media = { mediaType: MediaTypes.PHOTO, mediaURL: "", mediaIndex: 0 };
    try {
      //@ts-ignore
      m.mediaType = ast.fields[0].value.value!;
      //@ts-ignore
      m.mediaURL = ast.fields[0].value.value!;
      //@ts-ignore
      m.mediaIndex = ast.fields[0].value.value!;
    } catch {
      throw new Error("MediaScalar issue creating Media object");
    }

    return m;
  },
});
