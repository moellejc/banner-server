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
  id: Scalars['String'];
  post: Post;
  postID: Scalars['String'];
  user: User;
  userID: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
  errors?: Maybe<Array<FieldError>>;
  refreshToken: Scalars['String'];
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


/** List of media types */
export enum MediaTypes {
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
  refreshToken: RefreshResponse;
  register: RegisterResponse;
  revokeRefreshTokensForUser: Scalars['Boolean'];
  updateUser: Scalars['Boolean'];
};


export type MutationCheckEmailArgs = {
  options: UserCheckEmailScreenNameInputs;
};


export type MutationCreatePostArgs = {
  options: PostCreateInput;
};


export type MutationDeletePostArgs = {
  id: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};


export type MutationLoginArgs = {
  options: UserLoginInput;
};


export type MutationRegisterArgs = {
  options: UserRegisterInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['String'];
  options: UserUpdateInput;
};


export type Post = {
  __typename?: 'Post';
  coordinates: Scalars['Point'];
  createdAt: Scalars['DateTime'];
  creator: User;
  creatorID: Scalars['String'];
  id: Scalars['String'];
  likeCount?: Maybe<Scalars['Int']>;
  likes: Array<Like>;
  media: Array<Media>;
  replies: Array<PostReply>;
  replyCount?: Maybe<Scalars['Int']>;
  text?: Maybe<Scalars['String']>;
};

export type PostCreateInput = {
  coordinates: Scalars['Point'];
  media?: Maybe<Array<Scalars['MediaScalar']>>;
  placeID: Scalars['String'];
  text: Scalars['String'];
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
  posts: Array<Post>;
  user: User;
  users: Array<User>;
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};

export type RefreshResponse = {
  __typename?: 'RefreshResponse';
  accessToken: Scalars['String'];
  errors?: Maybe<Array<FieldError>>;
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  accessToken: Scalars['String'];
  errors?: Maybe<Array<FieldError>>;
  refreshToken: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  hasTempPassword?: Maybe<Scalars['Boolean']>;
  id: Scalars['String'];
  lastActiveAt: Scalars['DateTime'];
  lastName: Scalars['String'];
  likes: Array<Like>;
  media: Array<Media>;
  posts: Array<Post>;
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
  userType?: Maybe<UserTypes>;
  verified?: Maybe<Scalars['Boolean']>;
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
  password: Scalars['String'];
  repassword: Scalars['String'];
  screenName: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

/** List of user roles */
export enum UserRoles {
  Admin = 'ADMIN',
  Basic = 'BASIC',
  God = 'GOD'
}

/** List of user statuses */
export enum UserStatuses {
  Active = 'ACTIVE',
  Archive = 'ARCHIVE',
  Deactivated = 'DEACTIVATED',
  Inactive = 'INACTIVE',
  Invited = 'INVITED'
}

/** List of user types */
export enum UserTypes {
  Celebrity = 'CELEBRITY',
  GovernmentOfficial = 'GOVERNMENT_OFFICIAL',
  Standard = 'STANDARD'
}

export type UserUpdateInput = {
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
};
