import { Provider } from '@nestjs/common';
import algoliasearch, { SearchClient } from 'algoliasearch';
import { AlgoliaModuleConfig } from './algolia.interface';
import { ALGOLIA_CLIENT, ALGOLIA_MODULE_CONFIG } from './agolia.constants';

export const createAlgoliaClient = (): Provider => ({
  provide: ALGOLIA_CLIENT,
  useFactory: (config: AlgoliaModuleConfig): SearchClient =>
    algoliasearch(config.appId, config.apiKey, config.options),
  inject: [ALGOLIA_MODULE_CONFIG],
});
