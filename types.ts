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

export type Achievement = {
  __typename?: 'Achievement';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type Addon = {
  __typename?: 'Addon';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export enum Currency {
  Store = 'STORE',
  Tfuel = 'TFUEL',
  Usd = 'USD',
  Usdt = 'USDT'
}

export enum Features {
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
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
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
  deleteUser: Scalars['Boolean'];
  loginUser: User;
  registerUser: User;
  sendFriendRequest: Scalars['Boolean'];
  updateUser: User;
};


export type MutationAcceptFriendRequestArgs = {
  from: Scalars['ID'];
};


export type MutationDeleteUserArgs = {
  signature: Scalars['String'];
};


export type MutationLoginUserArgs = {
  input: LoginUserInput;
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

export type Organisation = {
  __typename?: 'Organisation';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  db?: Maybe<Scalars['Boolean']>;
  me: User;
  user?: Maybe<User>;
  users: Array<Maybe<User>>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

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
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type UpdateUserInput = {
  bio?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  profilePicture?: InputMaybe<Scalars['String']>;
  settings?: InputMaybe<UpdateUserSettingsInput>;
  username?: InputMaybe<Scalars['String']>;
};

export type UpdateUserSettingsInput = {
  canReceiveFriendRequests?: InputMaybe<Scalars['Boolean']>;
  isPrivate?: InputMaybe<Scalars['Boolean']>;
  onlineStatus?: InputMaybe<OnlineStatus>;
};

export type User = {
  __typename?: 'User';
  bio?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  firstName?: Maybe<Scalars['String']>;
  friends: Array<Maybe<User>>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
  nonce: Scalars['Int'];
  profilePicture?: Maybe<Scalars['String']>;
  publicAddress: Scalars['String'];
  settings: UserSettings;
  updatedAt?: Maybe<Scalars['Date']>;
  username: Scalars['String'];
};

export type UserAddons = {
  __typename?: 'UserAddons';
  favorite: Array<Maybe<Addon>>;
  library: Array<Maybe<Addon>>;
};

export type UserGames = {
  __typename?: 'UserGames';
  favorite: Array<Maybe<Game>>;
  library: Array<Maybe<Game>>;
};

export type UserMetrics = {
  __typename?: 'UserMetrics';
  totalAchievements?: Maybe<Scalars['Int']>;
  totalFriends?: Maybe<Scalars['Int']>;
  totalHoursPlayed?: Maybe<Scalars['Int']>;
};

export type UserOrganisations = {
  __typename?: 'UserOrganisations';
  created: Array<Maybe<Organisation>>;
  joined: Array<Maybe<Organisation>>;
};

export type UserSettings = {
  __typename?: 'UserSettings';
  canReceiveFriendRequests?: Maybe<Scalars['Boolean']>;
  isPrivate?: Maybe<Scalars['Boolean']>;
  onlineStatus: OnlineStatus;
};

export type UserSocials = {
  __typename?: 'UserSocials';
  friendRequests: Array<Maybe<User>>;
  friends: Array<Maybe<User>>;
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
  Achievement: ResolverTypeWrapper<Achievement>;
  Addon: ResolverTypeWrapper<Addon>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Currency: Currency;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Features: Features;
  Game: ResolverTypeWrapper<Game>;
  Genre: Genre;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  LoginUserInput: LoginUserInput;
  Mutation: ResolverTypeWrapper<{}>;
  OnlineStatus: OnlineStatus;
  Organisation: ResolverTypeWrapper<Organisation>;
  Query: ResolverTypeWrapper<{}>;
  RegisterUserInput: RegisterUserInput;
  Review: ResolverTypeWrapper<Review>;
  String: ResolverTypeWrapper<Scalars['String']>;
  UpdateUserInput: UpdateUserInput;
  UpdateUserSettingsInput: UpdateUserSettingsInput;
  User: ResolverTypeWrapper<User>;
  UserAddons: ResolverTypeWrapper<UserAddons>;
  UserGames: ResolverTypeWrapper<UserGames>;
  UserMetrics: ResolverTypeWrapper<UserMetrics>;
  UserOrganisations: ResolverTypeWrapper<UserOrganisations>;
  UserSettings: ResolverTypeWrapper<UserSettings>;
  UserSocials: ResolverTypeWrapper<UserSocials>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Achievement: Achievement;
  Addon: Addon;
  Boolean: Scalars['Boolean'];
  Date: Scalars['Date'];
  Game: Game;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  LoginUserInput: LoginUserInput;
  Mutation: {};
  Organisation: Organisation;
  Query: {};
  RegisterUserInput: RegisterUserInput;
  Review: Review;
  String: Scalars['String'];
  UpdateUserInput: UpdateUserInput;
  UpdateUserSettingsInput: UpdateUserSettingsInput;
  User: User;
  UserAddons: UserAddons;
  UserGames: UserGames;
  UserMetrics: UserMetrics;
  UserOrganisations: UserOrganisations;
  UserSettings: UserSettings;
  UserSocials: UserSocials;
};

export type AchievementResolvers<ContextType = any, ParentType extends ResolversParentTypes['Achievement'] = ResolversParentTypes['Achievement']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AddonResolvers<ContextType = any, ParentType extends ResolversParentTypes['Addon'] = ResolversParentTypes['Addon']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type GameResolvers<ContextType = any, ParentType extends ResolversParentTypes['Game'] = ResolversParentTypes['Game']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  acceptFriendRequest?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationAcceptFriendRequestArgs, 'from'>>;
  deleteUser?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'signature'>>;
  loginUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationLoginUserArgs, 'input'>>;
  registerUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationRegisterUserArgs, 'input'>>;
  sendFriendRequest?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationSendFriendRequestArgs, 'to'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'input'>>;
};

export type OrganisationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Organisation'] = ResolversParentTypes['Organisation']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  db?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  users?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>;
};

export type ReviewResolvers<ContextType = any, ParentType extends ResolversParentTypes['Review'] = ResolversParentTypes['Review']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  friends?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nonce?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  profilePicture?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  publicAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  settings?: Resolver<ResolversTypes['UserSettings'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserAddonsResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserAddons'] = ResolversParentTypes['UserAddons']> = {
  favorite?: Resolver<Array<Maybe<ResolversTypes['Addon']>>, ParentType, ContextType>;
  library?: Resolver<Array<Maybe<ResolversTypes['Addon']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserGamesResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserGames'] = ResolversParentTypes['UserGames']> = {
  favorite?: Resolver<Array<Maybe<ResolversTypes['Game']>>, ParentType, ContextType>;
  library?: Resolver<Array<Maybe<ResolversTypes['Game']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserMetricsResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserMetrics'] = ResolversParentTypes['UserMetrics']> = {
  totalAchievements?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalFriends?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalHoursPlayed?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserOrganisationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserOrganisations'] = ResolversParentTypes['UserOrganisations']> = {
  created?: Resolver<Array<Maybe<ResolversTypes['Organisation']>>, ParentType, ContextType>;
  joined?: Resolver<Array<Maybe<ResolversTypes['Organisation']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserSettings'] = ResolversParentTypes['UserSettings']> = {
  canReceiveFriendRequests?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isPrivate?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  onlineStatus?: Resolver<ResolversTypes['OnlineStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserSocialsResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserSocials'] = ResolversParentTypes['UserSocials']> = {
  friendRequests?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>;
  friends?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Achievement?: AchievementResolvers<ContextType>;
  Addon?: AddonResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Game?: GameResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Organisation?: OrganisationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Review?: ReviewResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserAddons?: UserAddonsResolvers<ContextType>;
  UserGames?: UserGamesResolvers<ContextType>;
  UserMetrics?: UserMetricsResolvers<ContextType>;
  UserOrganisations?: UserOrganisationsResolvers<ContextType>;
  UserSettings?: UserSettingsResolvers<ContextType>;
  UserSocials?: UserSocialsResolvers<ContextType>;
};

