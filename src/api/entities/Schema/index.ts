import { users, usersRelations } from "../User";
import { places, placesRelations } from "../Place";
import { locations, locationsRelations } from "../Location";
import { posts, postsRelations } from "../Post";
import { postReplies, postRepliesRelations } from "../Post";
import { media, mediaRelations } from "../Media";
import { organizations, organizationsRelations } from "../Organization";
import { likes } from "../Like";
import { addresses, addressesRelations } from "../Address";

// export as an object
export const schema = {
  ...users,
  ...usersRelations,
  ...places,
  ...placesRelations,
  ...locations,
  ...locationsRelations,
  ...addresses,
  ...addressesRelations,
  ...posts,
  ...postsRelations,
  ...postReplies,
  ...postRepliesRelations,
  ...media,
  ...mediaRelations,
  ...organizations,
  ...organizationsRelations,
  ...likes,
};

// export individual schema objects from each entity
export { users, usersRelations } from "../User";
export { places, placesRelations } from "../Place";
export { locations, locationsRelations } from "../Location";
export { posts, postsRelations } from "../Post";
export { postReplies, postRepliesRelations } from "../Post";
export { media, mediaRelations } from "../Media";
export { organizations, organizationsRelations } from "../Organization";
export { likes } from "../Like";
export { addresses, addressesRelations } from "../Address";
