import * as _ from 'lodash';

import { Resolvers, Game } from '../../../types/codegen.types';
import { ResolverContext } from '../../../types/context';

const resolvers: Resolvers = {
  Game: {
    title: async (parent: Game, args: {}, { gameLoader }: ResolverContext) => {
      const { title } = await gameLoader.load(parent.id);

      return title;
    },

    slug: async (parent: Game, args: {}, { gameLoader }: ResolverContext) => {
      const { slug } = await gameLoader.load(parent.id);

      return slug;
    },

    gameUrl: async (
      parent: Game,
      args: {},
      { gameLoader }: ResolverContext,
    ) => {
      const { gameUrl } = await gameLoader.load(parent.id);

      return gameUrl;
    },

    gameLogo: async (
      parent: Game,
      args: {},
      { gameLoader }: ResolverContext,
    ) => {
      const { gameLogo } = await gameLoader.load(parent.id);

      return gameLogo;
    },

    heroLogo: async (
      parent: Game,
      args: {},
      { gameLoader }: ResolverContext,
    ) => {
      const { heroLogo } = await gameLoader.load(parent.id);

      return heroLogo;
    },

    hero: async (parent: Game, args: {}, { gameLoader }: ResolverContext) => {
      const { hero } = await gameLoader.load(parent.id);

      return hero;
    },

    thumbnailImage: async (
      parent: Game,
      args: {},
      { gameLoader }: ResolverContext,
    ) => {
      const { thumbnailImage } = await gameLoader.load(parent.id);

      return thumbnailImage;
    },

    thumbnailVideo: async (
      parent: Game,
      args: {},
      { gameLoader }: ResolverContext,
    ) => {
      const { thumbnailVideo } = await gameLoader.load(parent.id);

      return thumbnailVideo;
    },

    carousel: async (
      parent: Game,
      args: {},
      { gameLoader }: ResolverContext,
    ) => {
      const { carousel } = await gameLoader.load(parent.id);

      return carousel;
    },

    currency: async (
      parent: Game,
      args: {},
      { gameLoader }: ResolverContext,
    ) => {
      const { currency } = await gameLoader.load(parent.id);

      return currency;
    },

    price: async (parent: Game, args: {}, { gameLoader }: ResolverContext) => {
      const { price } = await gameLoader.load(parent.id);

      return price;
    },

    offer: async (parent: Game, args: {}, { gameLoader }: ResolverContext) => {
      const { offer } = await gameLoader.load(parent.id);

      return offer;
    },

    offerExpiresAt: async (
      parent: Game,
      args: {},
      { gameLoader }: ResolverContext,
    ) => {
      const { offerExpiresAt } = await gameLoader.load(parent.id);

      return offerExpiresAt;
    },

    tagLine: async (
      parent: Game,
      args: {},
      { gameLoader }: ResolverContext,
    ) => {
      const { tagLine } = await gameLoader.load(parent.id);

      return tagLine;
    },

    platforms: async (
      parent: Game,
      args: {},
      { gameLoader }: ResolverContext,
    ) => {
      const { platforms } = await gameLoader.load(parent.id);

      return platforms;
    },

    genres: async (parent: Game, args: {}, { gameLoader }: ResolverContext) => {
      const { genres } = await gameLoader.load(parent.id);

      return genres;
    },

    features: async (
      parent: Game,
      args: {},
      { gameLoader }: ResolverContext,
    ) => {
      const { features } = await gameLoader.load(parent.id);

      return features;
    },

    chain: async (parent: Game, args: {}, { gameLoader }: ResolverContext) => {
      const { chain } = await gameLoader.load(parent.id);

      return chain;
    },

    description: async (
      parent: Game,
      args: {},
      { gameLoader }: ResolverContext,
    ) => {
      const { description } = await gameLoader.load(parent.id);

      return description;
    },

    publisher: async (
      parent: Game,
      args: {},
      { gameLoader }: ResolverContext,
    ) => {
      const { publisher } = await gameLoader.load(parent.id);

      return publisher;
    },

    developer: async (
      parent: Game,
      args: {},
      { gameLoader }: ResolverContext,
    ) => {
      const { developer } = await gameLoader.load(parent.id);

      return developer;
    },

    isSample: async (
      parent: Game,
      args: {},
      { gameLoader }: ResolverContext,
    ) => {
      const { isSample } = await gameLoader.load(parent.id);

      return isSample;
    },

    ageRating: async (
      parent: Game,
      args: {},
      { gameLoader }: ResolverContext,
    ) => {
      const { ageRating } = await gameLoader.load(parent.id);

      return ageRating;
    },

    trademark: async (
      parent: Game,
      args: {},
      { gameLoader }: ResolverContext,
    ) => {
      const { trademark } = await gameLoader.load(parent.id);

      return trademark;
    },

    releaseDate: async (
      parent: Game,
      args: {},
      { gameLoader }: ResolverContext,
    ) => {
      const { releaseDate } = await gameLoader.load(parent.id);

      return releaseDate;
    },

    reviews: async (
      parent: Game,
      args: {},
      { gameLoader }: ResolverContext,
    ) => {
      const { reviews } = await gameLoader.load(parent.id);

      return null;
    },

    createdAt: async (
      parent: Game,
      args: {},
      { gameLoader }: ResolverContext,
    ) => {
      const { createdAt } = await gameLoader.load(parent.id);

      return createdAt;
    },

    updatedAt: async (
      parent: Game,
      args: {},
      { gameLoader }: ResolverContext,
    ) => {
      const { updatedAt } = await gameLoader.load(parent.id);

      return updatedAt;
    },
  },
};

export default resolvers;
