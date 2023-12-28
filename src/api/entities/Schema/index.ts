import { users, usersRelations } from "../User";
import { places, placesRelations } from "../Place";
import { locations, locationsRelations } from "../Location";
import { posts, postsRelations } from "../Post";
import { postReplies, postRepliesRelations } from "../Post";
import { media, mediaRelations } from "../Media";
import { organizations, organizationsRelations } from "../Organization";
import { likes } from "../Like";
import { addresses, addressesRelations } from "../Address";

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
