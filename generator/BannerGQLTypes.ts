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


export type FieldError = {
  __typename?: 'FieldError';
  constraints?: Maybe<Array<Scalars['String']>>;
  field?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
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

export type LocationCell = {
  __typename?: 'LocationCell';
  createdAt: Scalars['DateTime'];
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
  lon: Scalars['Float'];
  places?: Maybe<Array<Place>>;
  posts?: Maybe<Array<Post>>;
  users?: Maybe<Array<User>>;
};

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
  createPost: PostResponse;
  deletePost: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  login: LoginResponse;
  logout: Scalars['Boolean'];
  register: RegisterResponse;
  updateUser: Scalars['Boolean'];
};


export type MutationCheckEmailArgs = {
  options: UserCheckEmailScreenNameInputs;
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


export type MutationUpdateUserArgs = {
  id: Scalars['Int'];
  options: UserUpdateInput;
};

export type Place = {
  __typename?: 'Place';
  cell?: Maybe<LocationCell>;
  cellID?: Maybe<Scalars['Int']>;
  city: Scalars['String'];
  countryCode: Scalars['String'];
  countryName: Scalars['String'];
  county: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  name: Scalars['String'];
  peopleHere: Scalars['Float'];
  postalCode: Scalars['String'];
  state: Scalars['String'];
  stateCode: Scalars['String'];
  street: Scalars['String'];
  streetNum: Scalars['String'];
};


export type Post = {
  __typename?: 'Post';
  author: User;
  authorID: Scalars['Int'];
  cell?: Maybe<LocationCell>;
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
  me?: Maybe<User>;
  myPosts: Array<Post>;
  user: User;
  users: Array<User>;
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
  cell?: Maybe<LocationCell>;
  cellID?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  hasTempPassword?: Maybe<Scalars['Boolean']>;
  id: Scalars['Int'];
  isVerified?: Maybe<Scalars['Boolean']>;
  lastActiveAt: Scalars['DateTime'];
  lastName: Scalars['String'];
  likes?: Maybe<Array<Like>>;
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
};

export type UserCheckEmailScreenNameInputs = {
  email: Scalars['String'];
  screenName: Scalars['String'];
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
