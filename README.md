# nestjs-algolia
The NestJS module for algolia based on the official algolia v4 package

## How to install

```
npm install nestjs-algolia-v4
```

or

```
yarn add nestjs-algolia-v4
```

## How to use

**Register the module**

```
import { AlgoliaModule } from 'nestjs-algolia-v4';

@Module({
  imports: [
    AlgoliaModule.register({
      appId: 'YOUR_APPLICATION_ID',
      apiKey: 'YOUR_API_KEY',
    }),
  ],
})
export class AppModule {}
```

**Inject the service**

```
import { AlgoliaService } from 'nestjs-algolia-v4';

@Injectable()
export class AppService {
  constructor(private readonly algoliaService: AlgoliaService) {}

  saveObjectOnIndex(
    indexName: string,
    record: any,
  ): Promise<any> {
    const index = this.algoliaService.initIndex(indexName);

    return index.saveObject(record);
  }
}
```

## Async options
### Use factory
The useFactory syntax allows for creating providers dynamically.

```
AlgoliaModule.registerAsync({
  useFactory: () => ({
    appId: 'YOUR_APPLICATION_ID',
    apiKey: 'YOUR_API_KEY',
  }),
});
```

### OR

```
AlgoliaModule.registerAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    appId: configService.getString('ALGOLIA_APPLICATION_ID'),
    apiKey: configService.getString('ALGOLIA_API_KEY'),
  }),
  inject: [ConfigService],
}),
```

### Use class
The useClass syntax allows you to dynamically determine a class that a token should resolve to. For example, suppose we have an abstract (or default) ConfigService class. 

```
AlgoliaModule.registerAsync({
  useClass: AlgoliaConfigService,
});
```

Above construction will instantiate `AlgoliaConfigService` inside `AlgoliaModule` and will leverage it to create options object.

```
class AlgoliaConfigService implements AlgoliaConfigFactory {
  createAlgoliaConfig(): AlgoliaModuleConfig {
    return {
      appId: 'YOUR_APPLICATION_ID',
      apiKey: 'YOUR_API_KEY',
    };
  }
}
```

### Use existing
The useExisting syntax allows you to create aliases for existing providers.

```
AlgoliaModule.registerAsync({
  imports: [ConfigModule],
  useExisting: ConfigService,
}),
