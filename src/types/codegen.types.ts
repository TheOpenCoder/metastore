import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export enum Chain {
  Ethereum = 'ETHEREUM',
  Polygon = 'POLYGON',
  Solana = 'SOLANA',
  Theta = 'THETA'
}

export type CreateGameInput = {
  ageRating: Scalars['Int'];
  carousel: Array<Scalars['String']>;
  chain: Array<Chain>;
  currency?: InputMaybe<Currency>;
  description: Scalars['String'];
  developer: Scalars['String'];
  features: Array<Feature>;
  gameLogo: Scalars['String'];
  gameUrl: Scalars['String'];
  genres: Array<Genre>;
  hero: Scalars['String'];
  heroLogo: Scalars['String'];
  isSample: Scalars['Boolean'];
  offer?: InputMaybe<Scalars['Int']>;
  offerExpiresAt?: InputMaybe<Scalars['Date']>;
  platforms: Array<Platform>;
  price?: InputMaybe<Scalars['Float']>;
  publisher: Scalars['String'];
  releaseDate: Scalars['Date'];
  slug: Scalars['String'];
  tagLine: Scalars['String'];
  thumbnailImage: Scalars['String'];
  thumbnailVideo: Scalars['String'];
  title: Scalars['String'];
  trademark: Scalars['String'];
};

export enum Currency {
  Store = 'STORE',
  Tfuel = 'TFUEL',
  Usd = 'USD',
  Usdt = 'USDT'
}

export enum Feature {
  CloudSaves = 'CLOUD_SAVES',
  ControllerSupport = 'CONTROLLER_SUPPORT',
  CoOp = 'CO_OP',
  CrossPlatform = 'CROSS_PLATFORM',
  InGamePurchases = 'IN_GAME_PURCHASES',
  LocalCoOp = 'LOCAL_CO_OP',
  LocalMultiPlayer = 'LOCAL_MULTI_PLAYER',
  MultiPlayer = 'MULTI_PLAYER',
  OnlineCoOp = 'ONLINE_CO_OP',
  OnlineMultiPlayer = 'ONLINE_MULTI_PLAYER',
  OnlinePvp = 'ONLINE_PVP',
  SinglePlayer = 'SINGLE_PLAYER'
}

export type Game = {
  __typename?: 'Game';
  ageRating: Scalars['Int'];
  carousel: Array<Scalars['String']>;
  chain: Array<Chain>;
  createdAt: Scalars['Date'];
  currency: Currency;
  description: Scalars['String'];
  developer: Scalars['String'];
  features: Array<Feature>;
  gameLogo: Scalars['String'];
  gameUrl: Scalars['String'];
  genres: Array<Genre>;
  hero: Scalars['String'];
  heroLogo: Scalars['String'];
  id: Scalars['ID'];
  isSample: Scalars['Boolean'];
  offer?: Maybe<Scalars['Int']>;
  offerExpiresAt?: Maybe<Scalars['Date']>;
  platforms: Array<Platform>;
  price?: Maybe<Scalars['Float']>;
  publisher: Scalars['String'];
  releaseDate: Scalars['Date'];
  reviews?: Maybe<Array<Review>>;
  slug: Scalars['String'];
  tagLine: Scalars['String'];
  thumbnailImage: Scalars['String'];
  thumbnailVideo: Scalars['String'];
  title: Scalars['String'];
  trademark: Scalars['String'];
  updatedAt: Scalars['Date'];
};

export type GameFilterInput = {
  title?: InputMaybe<StringQueryOperatorInput>;
};

export enum Genre {
  Action = 'ACTION',
  Adventure = 'ADVENTURE',
  Fighting = 'FIGHTING',
  Horror = 'HORROR',
  Mmo = 'MMO',
  Other = 'OTHER',
  Platformer = 'PLATFORMER',
  Puzzle = 'PUZZLE',
  Racing = 'RACING',
  Rpg = 'RPG',
  Shooter = 'SHOOTER',
  Simulation = 'SIMULATION',
  Sports = 'SPORTS',
  Strategy = 'STRATEGY'
}

export type LoginUserInput = {
  publicAddress: Scalars['String'];
  signature: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptFriendRequest: Scalars['Boolean'];
  buyGame: Scalars['Boolean'];
  cancelFriendRequest: Scalars['Boolean'];
  createGame: Game;
  declineFriendRequest: Scalars['Boolean'];
  loginUser: User;
  postReview: Review;
  registerUser: User;
  sendFriendRequest: Scalars['Boolean'];
  updateUser: User;
};


export type MutationAcceptFriendRequestArgs = {
  from: Scalars['ID'];
};


export type MutationBuyGameArgs = {
  gameId: Scalars['String'];
};


export type MutationCancelFriendRequestArgs = {
  to: Scalars['ID'];
};


export type MutationCreateGameArgs = {
  input: CreateGameInput;
};


export type MutationDeclineFriendRequestArgs = {
  from: Scalars['ID'];
};


export type MutationLoginUserArgs = {
  input: LoginUserInput;
};


export type MutationPostReviewArgs = {
  review?: InputMaybe<PostReviewInput>;
};


export type MutationRegisterUserArgs = {
  input: RegisterUserInput;
};


export type MutationSendFriendRequestArgs = {
  to: Scalars['ID'];
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export enum OnlineStatus {
  Away = 'AWAY',
  Offline = 'OFFLINE',
  Online = 'ONLINE'
}

export enum Platform {
  Mac = 'MAC',
  MobileWeb = 'MOBILE_WEB',
  Web = 'WEB',
  Windows = 'WINDOWS'
}

export type PostReviewInput = {
  content?: InputMaybe<Scalars['String']>;
  gameId: Scalars['ID'];
  rating: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  game?: Maybe<Game>;
  games?: Maybe<Array<Game>>;
  me: User;
  user?: Maybe<User>;
  users?: Maybe<Array<User>>;
};


export type QueryGameArgs = {
  id: Scalars['ID'];
};


export type QueryGamesArgs = {
  filter?: InputMaybe<GameFilterInput>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryUsersArgs = {
  filter?: InputMaybe<UserFilterInput>;
};

export enum Rarity {
  Common = 'COMMON',
  Epic = 'EPIC',
  Legendary = 'LEGENDARY',
  Mythic = 'MYTHIC',
  Rare = 'RARE',
  Uncommon = 'UNCOMMON',
  Unique = 'UNIQUE'
}

export type RegisterUserInput = {
  firstName?: InputMaybe<Scalars['String']>;
  nonce: Scalars['Int'];
  profilePicture?: InputMaybe<Scalars['String']>;
  publicAddress: Scalars['String'];
  signature: Scalars['String'];
  username: Scalars['String'];
};

export type Review = {
  __typename?: 'Review';
  content?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  game: Game;
  id: Scalars['ID'];
  rating: Scalars['Int'];
  user: User;
};

export type StringQueryOperatorInput = {
  contains?: InputMaybe<Scalars['String']>;
  eq?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  ne?: InputMaybe<Scalars['String']>;
  nin?: InputMaybe<Array<Scalars['String']>>;
};

export type UpdateUserInput = {
  bio?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  onlineStatus?: InputMaybe<OnlineStatus>;
  profilePicture?: InputMaybe<Scalars['String']>;
  settings?: InputMaybe<UpdateUserSettingsInput>;
  username?: InputMaybe<Scalars['String']>;
};

export type UpdateUserSettingsInput = {
  canReceiveFriendRequests?: InputMaybe<Scalars['Boolean']>;
  isPrivate?: InputMaybe<Scalars['Boolean']>;
};

export type User = {
  __typename?: 'User';
  bio?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  firstName?: Maybe<Scalars['String']>;
  games: UserGames;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
  metrics: UserMetrics;
  nonce: Scalars['Int'];
  onlineStatus: OnlineStatus;
  profilePicture?: Maybe<Scalars['String']>;
  publicAddress: Scalars['String'];
  reviews?: Maybe<Array<Review>>;
  settings: UserSettings;
  socials: UserSocials;
  updatedAt?: Maybe<Scalars['Date']>;
  username: Scalars['String'];
};

export type UserFilterInput = {
  firstName?: InputMaybe<StringQueryOperatorInput>;
  publicAddress?: InputMaybe<StringQueryOperatorInput>;
  username?: InputMaybe<StringQueryOperatorInput>;
};

export type UserGames = {
  __typename?: 'UserGames';
  library?: Maybe<Array<Game>>;
};

export type UserMetrics = {
  __typename?: 'UserMetrics';
  totalAchievements?: Maybe<Scalars['Int']>;
  totalFriends?: Maybe<Scalars['Int']>;
  totalHoursPlayed?: Maybe<Scalars['Int']>;
};

export type UserSettings = {
  __typename?: 'UserSettings';
  canReceiveFriendRequests?: Maybe<Scalars['Boolean']>;
  isPrivate?: Maybe<Scalars['Boolean']>;
};

export type UserSocials = {
  __typename?: 'UserSocials';
  friendRequests?: Maybe<Array<User>>;
  friends?: Maybe<Array<User>>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Chain: Chain;
  CreateGameInput: CreateGameInput;
  Currency: Currency;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Feature: Feature;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Game: ResolverTypeWrapper<Game>;
  GameFilterInput: GameFilterInput;
  Genre: Genre;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  LoginUserInput: LoginUserInput;
  Mutation: ResolverTypeWrapper<{}>;
  OnlineStatus: OnlineStatus;
  Platform: Platform;
  PostReviewInput: PostReviewInput;
  Query: ResolverTypeWrapper<{}>;
  Rarity: Rarity;
  RegisterUserInput: RegisterUserInput;
  Review: ResolverTypeWrapper<Review>;
  String: ResolverTypeWrapper<Scalars['String']>;
  StringQueryOperatorInput: StringQueryOperatorInput;
  UpdateUserInput: UpdateUserInput;
  UpdateUserSettingsInput: UpdateUserSettingsInput;
  User: ResolverTypeWrapper<User>;
  UserFilterInput: UserFilterInput;
  UserGames: ResolverTypeWrapper<UserGames>;
  UserMetrics: ResolverTypeWrapper<UserMetrics>;
  UserSettings: ResolverTypeWrapper<UserSettings>;
  UserSocials: ResolverTypeWrapper<UserSocials>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  CreateGameInput: CreateGameInput;
  Date: Scalars['Date'];
  Float: Scalars['Float'];
  Game: Game;
  GameFilterInput: GameFilterInput;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  LoginUserInput: LoginUserInput;
  Mutation: {};
  PostReviewInput: PostReviewInput;
  Query: {};
  RegisterUserInput: RegisterUserInput;
  Review: Review;
  String: Scalars['String'];
  StringQueryOperatorInput: StringQueryOperatorInput;
  UpdateUserInput: UpdateUserInput;
  UpdateUserSettingsInput: UpdateUserSettingsInput;
  User: User;
  UserFilterInput: UserFilterInput;
  UserGames: UserGames;
  UserMetrics: UserMetrics;
  UserSettings: UserSettings;
  UserSocials: UserSocials;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type GameResolvers<ContextType = any, ParentType extends ResolversParentTypes['Game'] = ResolversParentTypes['Game']> = {
  ageRating?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  carousel?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  chain?: Resolver<Array<ResolversTypes['Chain']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['Currency'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  developer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  features?: Resolver<Array<ResolversTypes['Feature']>, ParentType, ContextType>;
  gameLogo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  gameUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  genres?: Resolver<Array<ResolversTypes['Genre']>, ParentType, ContextType>;
  hero?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  heroLogo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isSample?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  offer?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  offerExpiresAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  platforms?: Resolver<Array<ResolversTypes['Platform']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  publisher?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  releaseDate?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  reviews?: Resolver<Maybe<Array<ResolversTypes['Review']>>, ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tagLine?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  thumbnailImage?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  thumbnailVideo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  trademark?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  acceptFriendRequest?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationAcceptFriendRequestArgs, 'from'>>;
  buyGame?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationBuyGameArgs, 'gameId'>>;
  cancelFriendRequest?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationCancelFriendRequestArgs, 'to'>>;
  createGame?: Resolver<ResolversTypes['Game'], ParentType, ContextType, RequireFields<MutationCreateGameArgs, 'input'>>;
  declineFriendRequest?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeclineFriendRequestArgs, 'from'>>;
  loginUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationLoginUserArgs, 'input'>>;
  postReview?: Resolver<ResolversTypes['Review'], ParentType, ContextType, Partial<MutationPostReviewArgs>>;
  registerUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationRegisterUserArgs, 'input'>>;
  sendFriendRequest?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationSendFriendRequestArgs, 'to'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'input'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  game?: Resolver<Maybe<ResolversTypes['Game']>, ParentType, ContextType, RequireFields<QueryGameArgs, 'id'>>;
  games?: Resolver<Maybe<Array<ResolversTypes['Game']>>, ParentType, ContextType, RequireFields<QueryGamesArgs, 'filter'>>;
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  users?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType, RequireFields<QueryUsersArgs, 'filter'>>;
};

export type ReviewResolvers<ContextType = any, ParentType extends ResolversParentTypes['Review'] = ResolversParentTypes['Review']> = {
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  game?: Resolver<ResolversTypes['Game'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  games?: Resolver<ResolversTypes['UserGames'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  metrics?: Resolver<ResolversTypes['UserMetrics'], ParentType, ContextType>;
  nonce?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  onlineStatus?: Resolver<ResolversTypes['OnlineStatus'], ParentType, ContextType>;
  profilePicture?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  publicAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  reviews?: Resolver<Maybe<Array<ResolversTypes['Review']>>, ParentType, ContextType>;
  settings?: Resolver<ResolversTypes['UserSettings'], ParentType, ContextType>;
  socials?: Resolver<ResolversTypes['UserSocials'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserGamesResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserGames'] = ResolversParentTypes['UserGames']> = {
  library?: Resolver<Maybe<Array<ResolversTypes['Game']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserMetricsResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserMetrics'] = ResolversParentTypes['UserMetrics']> = {
  totalAchievements?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalFriends?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalHoursPlayed?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserSettings'] = ResolversParentTypes['UserSettings']> = {
  canReceiveFriendRequests?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isPrivate?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserSocialsResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserSocials'] = ResolversParentTypes['UserSocials']> = {
  friendRequests?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
  friends?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Date?: GraphQLScalarType;
  Game?: GameResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Review?: ReviewResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserGames?: UserGamesResolvers<ContextType>;
  UserMetrics?: UserMetricsResolvers<ContextType>;
  UserSettings?: UserSettingsResolvers<ContextType>;
  UserSocials?: UserSocialsResolvers<ContextType>;
};

