// load Here Maps
import { refreshAccessToken } from "../../lib/heremaps";

export const heremapsLoader = async (): Promise<void> => {
  refreshAccessToken();
};
