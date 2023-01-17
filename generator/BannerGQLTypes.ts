export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** Object describing a piece of media content */
  MediaScalar: any;
  /** A set of coordinates. x, y */
  Point: any;
};

export type Address = {
  __typename?: 'Address';
  city: Scalars['String'];
  countryCode: Scalars['String'];
  countryName: Scalars['String'];
  county: Scalars['String'];
  district: Scalars['String'];
  houseNumber: Scalars['String'];
  id: Scalars['Float'];
  places?: Maybe<Array<Place>>;
  postalCode: Scalars['String'];
  state: Scalars['String'];
  stateCode: Scalars['String'];
  street: Scalars['String'];
};

export type AddressInput = {
  city: Scalars['String'];
  countryCode: Scalars['String'];
  countryName: Scalars['String'];
  county?: Maybe<Scalars['String']>;
  district?: Maybe<Scalars['String']>;
  houseNumber: Scalars['String'];
  postalCode: Scalars['String'];
  state: Scalars['String'];
  stateCode: Scalars['String'];
  street: Scalars['String'];
};

export type Coordinates = {
  lat: Scalars['Float'];
  lon: Scalars['Float'];
};

export type CreatePlaceInput = {
  address?: Maybe<AddressInput>;
  coords?: Maybe<Coordinates>;
  name: Scalars['String'];
  placeType: PlaceTypes;
};


export type FieldError = {
  __typename?: 'FieldError';
  constraints?: Maybe<Array<Scalars['String']>>;
  field?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type GetPlaceInfoInput = {
  id: Scalars['Int'];
  includes?: Maybe<PlaceIncludes>;
};

export type Like = {
  __typename?: 'Like';
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  post: Post;
  postID: Scalars['Int'];
  user: User;
  userID: Scalars['Int'];
};

export type Location = {
  __typename?: 'Location';
  accessPoints?: Maybe<Scalars['String']>;
  bbox?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  geoCellRes0: Scalars['String'];
  geoCellRes1: Scalars['String'];
  geoCellRes2: Scalars['String'];
  geoCellRes3: Scalars['String'];
  geoCellRes4: Scalars['String'];
  geoCellRes5: Scalars['String'];
  geoCellRes6: Scalars['String'];
  geoCellRes7: Scalars['String'];
  geoCellRes8: Scalars['String'];
  geoCellRes9: Scalars['String'];
  geoCellRes10: Scalars['String'];
  geoCellRes11: Scalars['String'];
  geoCellRes12: Scalars['String'];
  geoCellRes13: Scalars['String'];
  geoCellRes14: Scalars['String'];
  geoCellRes15: Scalars['String'];
  id: Scalars['Int'];
  lat: Scalars['Float'];
  locationType: LocationTypes;
  lon: Scalars['Float'];
  places?: Maybe<Array<Place>>;
  posts?: Maybe<Array<Post>>;
  primaryCellLevel?: Maybe<Scalars['Int']>;
  updatedAt: Scalars['DateTime'];
  users?: Maybe<Array<User>>;
};

export type LocationInput = {
  cell?: Maybe<Scalars['String']>;
  coords?: Maybe<Coordinates>;
};

/** LocationTypes */
export enum LocationTypes {
  Place = 'Place',
  User = 'User'
}

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<FieldError>>;
  refreshToken?: Maybe<Scalars['String']>;
};

export type Media = {
  __typename?: 'Media';
  createdAt: Scalars['DateTime'];
  creator: User;
  creatorID: Scalars['String'];
  id: Scalars['String'];
  mediaIndex?: Maybe<Scalars['Int']>;
  mediaType: MediaTypes;
  mediaURL: Scalars['String'];
  post: Post;
  postID: Scalars['String'];
};


export enum MediaTypes {
  Audio = 'AUDIO',
  Model = 'MODEL',
  Photo = 'PHOTO',
  Video = 'VIDEO'
}

export type Mutation = {
  __typename?: 'Mutation';
  checkEmail: UserResponse;
  createPlace: PlaceResponse;
  createPost: PostResponse;
  deletePost: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  login: LoginResponse;
  logout: Scalars['Boolean'];
  register: RegisterResponse;
  updatePlace: PlacesResponse;
  updateUser: Scalars['Boolean'];
};


export type MutationCheckEmailArgs = {
  options: UserCheckEmailScreenNameInputs;
};


export type MutationCreatePlaceArgs = {
  placeData: CreatePlaceInput;
};


export type MutationCreatePostArgs = {
  options: PostCreateInput;
};


export type MutationDeletePostArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int'];
};


export type MutationLoginArgs = {
  options: UserLoginInput;
};


export type MutationRegisterArgs = {
  options: UserRegisterInput;
};


export type MutationUpdatePlaceArgs = {
  placeData: CreatePlaceInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['Int'];
  options: UserUpdateInput;
};

export type Organization = {
  __typename?: 'Organization';
  id: Scalars['Int'];
  name: Scalars['String'];
  places?: Maybe<Array<Place>>;
};

export type Place = {
  __typename?: 'Place';
  address?: Maybe<Address>;
  addressID?: Maybe<Scalars['Int']>;
  categories?: Maybe<Scalars['String']>;
  children?: Maybe<Array<Place>>;
  contacts?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  hours?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  language: Scalars['String'];
  location?: Maybe<Location>;
  locationID?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  organization?: Maybe<Organization>;
  organizationID?: Maybe<Scalars['Int']>;
  parent?: Maybe<Place>;
  parentID?: Maybe<Scalars['Int']>;
  peopleHere?: Maybe<Scalars['Float']>;
  placeType: PlaceTypes;
  references?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  visitorHistory?: Maybe<Array<UserVisitHistory>>;
};

export type PlaceIncludes = {
  address?: Maybe<Scalars['Boolean']>;
  location?: Maybe<Scalars['Boolean']>;
};

export type PlaceResponse = {
  __typename?: 'PlaceResponse';
  errors?: Maybe<Array<FieldError>>;
  place?: Maybe<Place>;
};

export enum PlaceTypes {
  Administrative = 'Administrative',
  Commercial = 'Commercial',
  Community = 'Community',
  Continent = 'Continent',
  Country = 'Country',
  Educational = 'Educational',
  Geographic = 'Geographic',
  Landmark = 'Landmark',
  Medical = 'Medical',
  Municipality = 'Municipality',
  Province = 'Province',
  Religious = 'Religious',
  Residential = 'Residential',
  State = 'State',
  Transit = 'Transit'
}

export type PlacesResponse = {
  __typename?: 'PlacesResponse';
  errors?: Maybe<Array<FieldError>>;
  places?: Maybe<Array<Place>>;
};


export type Post = {
  __typename?: 'Post';
  author: User;
  authorID: Scalars['Int'];
  cell?: Maybe<Location>;
  cellID?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  likeCount?: Maybe<Scalars['Int']>;
  likes?: Maybe<Array<Like>>;
  media?: Maybe<Array<Media>>;
  replies?: Maybe<Array<PostReply>>;
  replyCount?: Maybe<Scalars['Int']>;
  text?: Maybe<Scalars['String']>;
};

export type PostCreateInput = {
  coordinates: Scalars['Point'];
  media?: Maybe<Array<Scalars['MediaScalar']>>;
  placeID: Scalars['String'];
  text?: Maybe<Scalars['String']>;
};

export type PostReply = {
  __typename?: 'PostReply';
  createdAt: Scalars['DateTime'];
  creator: User;
  creatorID: Scalars['String'];
  id: Scalars['String'];
  parentReply: PostReply;
  parentReplyId?: Maybe<Scalars['String']>;
  post: Post;
  postID: Scalars['String'];
  replies: Array<PostReply>;
  totalReplies?: Maybe<Scalars['Int']>;
};

export type PostResponse = {
  __typename?: 'PostResponse';
  errors?: Maybe<Array<FieldError>>;
  post?: Maybe<Post>;
};

export type Query = {
  __typename?: 'Query';
  getHereInfo: PlacesResponse;
  getNearInfo: PlacesResponse;
  getPlaceInfo: PlacesResponse;
  getPlacesFromLocation: PlacesResponse;
  /** Return an address and information given Lat/Lon coords */
  getReverseGeocode: PlacesResponse;
  me?: Maybe<User>;
  myPosts: Array<Post>;
  user: User;
  users: Array<User>;
};


export type QueryGetHereInfoArgs = {
  options: LocationInput;
};


export type QueryGetNearInfoArgs = {
  options: LocationInput;
};


export type QueryGetPlaceInfoArgs = {
  options: GetPlaceInfoInput;
};


export type QueryGetPlacesFromLocationArgs = {
  location: LocationInput;
};


export type QueryGetReverseGeocodeArgs = {
  options: LocationInput;
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  accessToken?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<FieldError>>;
  refreshToken?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  hasTempPassword?: Maybe<Scalars['Boolean']>;
  id: Scalars['Int'];
  isVerified?: Maybe<Scalars['Boolean']>;
  lastActiveAt: Scalars['DateTime'];
  lastName: Scalars['String'];
  likes?: Maybe<Array<Like>>;
  location?: Maybe<Location>;
  locationID?: Maybe<Scalars['Int']>;
  locationPath?: Maybe<Array<UserLocationPath>>;
  media?: Maybe<Array<Media>>;
  posts?: Maybe<Array<Post>>;
  profilePic?: Maybe<Scalars['String']>;
  role?: Maybe<UserRoles>;
  screenName: Scalars['String'];
  status?: Maybe<UserStatuses>;
  tempPasswordExpires?: Maybe<Scalars['DateTime']>;
  totalFollowers?: Maybe<Scalars['Int']>;
  totalFollowing?: Maybe<Scalars['Int']>;
  totalFollowingPlaces?: Maybe<Scalars['Int']>;
  totalLikes?: Maybe<Scalars['Int']>;
  totalPosts?: Maybe<Scalars['Int']>;
  verificationType?: Maybe<UserVerifications>;
  visitHistory?: Maybe<Array<UserVisitHistory>>;
};

export type UserCheckEmailScreenNameInputs = {
  email: Scalars['String'];
  screenName: Scalars['String'];
};

export type UserLocationPath = {
  __typename?: 'UserLocationPath';
  id: Scalars['Int'];
};

export type UserLoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserRegisterInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  lat: Scalars['Float'];
  lon: Scalars['Float'];
  password: Scalars['String'];
  repassword: Scalars['String'];
  screenName: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export enum UserRoles {
  Admin = 'ADMIN',
  User = 'USER'
}

export enum UserStatuses {
  Active = 'ACTIVE',
  Archive = 'ARCHIVE',
  Deactivated = 'DEACTIVATED',
  Inactive = 'INACTIVE',
  Invited = 'INVITED',
  Removed = 'REMOVED'
}

export type UserUpdateInput = {
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
};

export enum UserVerifications {
  Celebrity = 'CELEBRITY',
  Developer = 'DEVELOPER',
  Official = 'OFFICIAL',
  Standard = 'STANDARD'
}

export type UserVisitHistory = {
  __typename?: 'UserVisitHistory';
  id: Scalars['Int'];
};
