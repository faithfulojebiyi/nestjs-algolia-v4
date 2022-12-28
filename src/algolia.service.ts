import { Injectable, Inject } from '@nestjs/common';
import { SearchClient, SearchIndex } from 'algoliasearch';
import { ALGOLIA_CLIENT } from './agolia.constants';

@Injectable()
export class AlgoliaService {
  constructor(
    @Inject(ALGOLIA_CLIENT) private readonly algoliaClient: SearchClient,
  ) {}

  initIndex(indexName: string): SearchIndex {
    return this.algoliaClient.initIndex(indexName);
  }

  listIndices(): Promise<any> {
    return this.algoliaClient.listIndices();
  }
}
