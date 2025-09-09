// src/index.ts - public entry
import { getParagraphAPI } from './generated/api';

export type ParagraphAPIConfig = {
  /**
    * Optional default publicationID so users can emit it on list/get-by-slug calls.
    */
  publicationId?: string;
};

/**
  * Paragraph API class wrapper.
  *
  * Entrypoint into all Paragraph API functiohnality.
  */
export class ParagraphAPI {
  private api = getParagraphAPI();

  constructor() {
  }

  /**
    * Get metadata about a Paragraph publication by it's ID.
    */
  getPublication(publicationId: string) {
    return this.api.getPublication(publicationId);
  }


  /**
    * Get metadata about a Paragraph publication by it's slug.
    *
    * Can optionally include an "@" before the slug.
    */
  getPublicationBySlug(slug: string) {
    return this.api.getPublicationBySlug(slug);
  }


  /**
    * Get metadata about a Paragraph publication by it's custom domain.
    *
    * This should be the domain only (e.g. "blog.mydomain.com"), without "https://"
    * or "www" or any path/querystring.
    */
  getPublicationByDomain(domain: string) {
    return this.api.getPublicationByDomain(domain);
  }

  /**
    * Gets a total count of subscribers for a given publication ID.
    */
  getSubscriberCount(publicationId: string) {
    return this.api.getSubscriberCount(publicationId)
  }


  /**
    * Get a list of posts for a given publication.
    */
  getPosts(publicationId: string, params?: Parameters<ReturnType<typeof getParagraphAPI>['getPosts']>[1]) {
    return this.api.getPosts(publicationId, params);
  }

  /**
    * Get a single post by its ID.
    */
  getPost(postId: string) {
    return this.api.getPost(postId);
  }


  /**
    * Get a single post by its slug within a given publication.
    */
  getPostBySlug(publicationId: string, slug: string) {
    return this.api.getPostBySlug(publicationId, slug);
  }

  /**
    * Get metadata about a user by their user ID.
    */
  getUser(userId: string) {
    return this.api.getUser(userId);
  }
  /**
    * Get metadata about a user by their wallet address.
    */
  getUserByWallet(wallet: string) {
    return this.api.getUserByWallet(wallet);
  }

  /**
    * Get metadata about a coin by its contract address.
    */
  getCoin(contractAddress: string) {
    return this.api.getCoin(contractAddress);
  }
  /**
    * Get a list of holders for a given coin contract address.
    */
  getCoinHolders(contractAddress: string, params?: Parameters<ReturnType<typeof getParagraphAPI>['getCoinHolders']>[1]) {
    return this.api.getCoinHolders(contractAddress, params);
  }
}

/**
  * Optional factory function to create an instance of the API client.
  *
  * Tree-shakeable.
  */
export const createParagraphAPI = () => new ParagraphAPI();

// Re-export generated types for consumers
export * from './generated/models';
