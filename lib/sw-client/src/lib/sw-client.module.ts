import { DynamicModule } from '@nestjs/common';
import { SWClientService } from './sw-client.service';
import { DefaultClientBuilder } from './default-client-builder';
import { HttpModule, HttpService } from '@nestjs/axios';

export class SWClientModule {
  public static register(): DynamicModule {
    return {
      module: SWClientModule,
      imports: [HttpModule],
      providers: [
        {
          provide: SWClientService,
          useFactory: ({ axiosRef }: HttpService) =>
            DefaultClientBuilder.new()
              // TODO: replace hardcoded url with value from env's loaded via injected config service
              .setBaseURL('https://swapi.dev/api')
              .setClient(axiosRef)
              .registerRoute('Films')
              .registerRoute('Planets')
              .registerRoute('Species')
              .registerRoute('Starships')
              .registerRoute('Vehicles')
              .build(),
          inject: [HttpService],
        },
      ],
    };
  }
}
