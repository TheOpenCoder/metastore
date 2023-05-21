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
  URL: any;
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
  me: User;
  user?: Maybe<User>;
  users: Array<Maybe<User>>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type Review = {
  __typename?: 'Review';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  achievements: Array<Maybe<Achievement>>;
  bio?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  createdOrgs?: Maybe<Organisation>;
  favoriteAddons: Array<Maybe<Addon>>;
  favoriteGames: Array<Maybe<Game>>;
  firstName: Scalars['String'];
  friendRequests: Array<Maybe<User>>;
  friends: Array<Maybe<User>>;
  id: Scalars['ID'];
  joinedOrgs: Array<Maybe<Organisation>>;
  lastName?: Maybe<Scalars['String']>;
  libraryGames: Array<Maybe<Game>>;
  ownedAddons: Array<Maybe<Addon>>;
  profilePicture?: Maybe<Scalars['URL']>;
  reviews: Array<Maybe<Review>>;
  totalAchievements?: Maybe<Scalars['Int']>;
  totalFriends?: Maybe<Scalars['Int']>;
  totalHoursPlayed?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['Date']>;
  userSettings: UserSettings;
  username: Scalars['String'];
};

export type UserSettings = {
  __typename?: 'UserSettings';
  canReceiveFriendRequest?: Maybe<Scalars['Boolean']>;
  isPrivate?: Maybe<Scalars['Boolean']>;
  onlineStatus: OnlineStatus;
  updatedAt?: Maybe<Scalars['Date']>;
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
  OnlineStatus: OnlineStatus;
  Organisation: ResolverTypeWrapper<Organisation>;
  Query: ResolverTypeWrapper<{}>;
  Review: ResolverTypeWrapper<Review>;
  String: ResolverTypeWrapper<Scalars['String']>;
  URL: ResolverTypeWrapper<Scalars['URL']>;
  User: ResolverTypeWrapper<User>;
  UserSettings: ResolverTypeWrapper<UserSettings>;
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
  Organisation: Organisation;
  Query: {};
  Review: Review;
  String: Scalars['String'];
  URL: Scalars['URL'];
  User: User;
  UserSettings: UserSettings;
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

export type OrganisationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Organisation'] = ResolversParentTypes['Organisation']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  users?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>;
};

export type ReviewResolvers<ContextType = any, ParentType extends ResolversParentTypes['Review'] = ResolversParentTypes['Review']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UrlScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['URL'], any> {
  name: 'URL';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  achievements?: Resolver<Array<Maybe<ResolversTypes['Achievement']>>, ParentType, ContextType>;
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  createdOrgs?: Resolver<Maybe<ResolversTypes['Organisation']>, ParentType, ContextType>;
  favoriteAddons?: Resolver<Array<Maybe<ResolversTypes['Addon']>>, ParentType, ContextType>;
  favoriteGames?: Resolver<Array<Maybe<ResolversTypes['Game']>>, ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  friendRequests?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>;
  friends?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  joinedOrgs?: Resolver<Array<Maybe<ResolversTypes['Organisation']>>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  libraryGames?: Resolver<Array<Maybe<ResolversTypes['Game']>>, ParentType, ContextType>;
  ownedAddons?: Resolver<Array<Maybe<ResolversTypes['Addon']>>, ParentType, ContextType>;
  profilePicture?: Resolver<Maybe<ResolversTypes['URL']>, ParentType, ContextType>;
  reviews?: Resolver<Array<Maybe<ResolversTypes['Review']>>, ParentType, ContextType>;
  totalAchievements?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalFriends?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalHoursPlayed?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  userSettings?: Resolver<ResolversTypes['UserSettings'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserSettings'] = ResolversParentTypes['UserSettings']> = {
  canReceiveFriendRequest?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isPrivate?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  onlineStatus?: Resolver<ResolversTypes['OnlineStatus'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Achievement?: AchievementResolvers<ContextType>;
  Addon?: AddonResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Game?: GameResolvers<ContextType>;
  Organisation?: OrganisationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Review?: ReviewResolvers<ContextType>;
  URL?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UserSettings?: UserSettingsResolvers<ContextType>;
};

