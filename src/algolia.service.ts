import { Injectable, Inject } from '@nestjs/common';
import { SearchClient } from 'algoliasearch';
import { ALGOLIA_CLIENT } from './agolia.constants';

@Injectable()
export class AlgoliaService {
  constructor(
    @Inject(ALGOLIA_CLIENT) private readonly algoliaClient: SearchClient,
  ) {}
}
