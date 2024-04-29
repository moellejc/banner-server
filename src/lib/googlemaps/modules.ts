import {
  Client,
  PlacesNearbyRequest,
} from "@googlemaps/google-maps-services-js";
import { Coordinates } from "../../api/entities/Coordinates";

const googleMapsClient = new Client({});

export const placeFromLocation = async (coords: Coordinates) => {
  const requestParams = {
    params: {
      location: {
        lat: coords.lat,
        lng: coords.lon,
      },
      radius: 50,
    },
  };

  await googleMapsClient
    .placesNearby(requestParams as PlacesNearbyRequest)
    .then((r) => {
      console.log(r.data.results[0].name);
    })
    .catch((e) => {
      console.log("Places Nearby Failed");
      console.log(e);
    });
};
