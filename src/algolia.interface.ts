import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { AlgoliaSearchOptions } from 'algoliasearch';

export interface AlgoliaModuleConfig {
  appId: string;
  apiKey: string;
  options?: AlgoliaSearchOptions;
}

export interface AlgoliaConfigFactory {
  createAlgoliaConfig(): Promise<AlgoliaModuleConfig> | AlgoliaModuleConfig;
}

export interface AlgoliaModuleAsyncConfig
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<AlgoliaConfigFactory>;
  useClass?: Type<AlgoliaConfigFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<AlgoliaModuleConfig> | AlgoliaModuleConfig;
  inject?: any[];
}
