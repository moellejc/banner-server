import {
  Client,
  PlacesNearbyRequest,
  PlacesNearbyResponse,
} from "@googlemaps/google-maps-services-js";
import { Coordinates } from "../../api/entities/Coordinates";

// NOTE:
// core-js@3.37.0 add to package.json to resolve Cannot find module 'core-js/modules/es.string.replace.js'
// as mentioned here: https://github.com/googlemaps/google-maps-services-js/issues/1194

const googleMapsClient = new Client({});

export const placeFromLocation = async (
  coords: Coordinates
): Promise<PlacesNearbyResponse> => {
  let placeInfo = await googleMapsClient
    .placesNearby({
      params: {
        location: [coords.lat, coords.lon],
        radius: 10,
        key: process.env.GOOGLE_MAPS_API_KEY!,
      },
    })
    .then((r) => {
      console.log(r.data.results);
      return r;
    })
    .catch((e) => {
      console.log("Places Nearby Failed");
      console.log(e);
      return {} as PlacesNearbyResponse; // TODO: return error message instead
    });

  return placeInfo;
};
