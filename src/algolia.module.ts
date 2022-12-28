import { DynamicModule, Module, Provider } from '@nestjs/common';
import { AlgoliaService } from './algolia.service';
import {
  AlgoliaConfigFactory,
  AlgoliaModuleAsyncConfig,
  AlgoliaModuleConfig,
} from './algolia.interface';
import { createAlgoliaClient } from './algolia.provider';
import { ALGOLIA_MODULE_CONFIG } from './agolia.constants';

@Module({
  providers: [AlgoliaService],
  exports: [AlgoliaService],
})
export class AlgoliaModule {
  static register(config: AlgoliaModuleConfig): DynamicModule {
    return {
      module: AlgoliaModule,
      providers: [
        createAlgoliaClient(),
        { provide: ALGOLIA_MODULE_CONFIG, useValue: config },
      ],
    };
  }

  static registerAsync(config: AlgoliaModuleAsyncConfig): DynamicModule {
    return {
      module: AlgoliaModule,
      imports: config.imports || [],
      providers: [createAlgoliaClient(), ...this.createAsyncProviders(config)],
    };
  }

  private static createAsyncProviders(
    config: AlgoliaModuleAsyncConfig,
  ): Provider[] {
    if (config.useExisting || config.useFactory) {
      return [this.createAsyncConfigProvider(config)];
    }

    return [
      this.createAsyncConfigProvider(config),
      {
        provide: config.useClass,
        useClass: config.useClass,
      },
    ];
  }

  private static createAsyncConfigProvider(
    config: AlgoliaModuleAsyncConfig,
  ): Provider {
    if (config.useFactory) {
      return {
        provide: ALGOLIA_MODULE_CONFIG,
        useFactory: config.useFactory,
        inject: config.inject || [],
      };
    }

    return {
      provide: ALGOLIA_MODULE_CONFIG,
      useFactory: async (configFactory: AlgoliaConfigFactory) =>
        await configFactory.createAlgoliaConfig(),
      inject: [config.useExisting || config.useClass],
    };
  }
}
