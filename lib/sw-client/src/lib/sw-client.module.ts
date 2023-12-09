import { Module } from '@nestjs/common';
import { SWClientService } from './sw-client.service';
import { DefaultClientBuilder } from './default-client-builder';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Config } from '@self/config';

@Module({
  imports: [HttpModule, ConfigModule],
  exports: [SWClientService],
  providers: [
    {
      provide: SWClientService,
      useFactory: ({ axiosRef }: HttpService, cfg: ConfigService<Config>) =>
        DefaultClientBuilder.new()
          .setBaseURL(cfg.get('SW_CLIENT_BASE_URL')!)
          .setClient(axiosRef)
          .registerRoute('Films')
          .registerRoute('Planets')
          .registerRoute('Species')
          .registerRoute('Starships')
          .registerRoute('Vehicles')
          .build(),
      inject: [HttpService, ConfigService],
    },
  ],
})
export class SWClientModule {}
