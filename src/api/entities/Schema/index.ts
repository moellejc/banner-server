import { users } from "../User";
import { places } from "../Place";
import { locations } from "../Location";
import { posts } from "../Post";
import { postReplies } from "../Post";
import { media } from "../Media";
import { organizations } from "../Organization";
import { likes } from "../Like";

export const schema = {
  ...users,
  ...places,
  ...locations,
  ...posts,
  ...postReplies,
  ...media,
  ...organizations,
  ...likes,
};
