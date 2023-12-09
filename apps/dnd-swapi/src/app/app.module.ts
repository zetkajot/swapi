import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CachedSWClientModule } from '@self/cached-sw-client';
import { ConfigModule } from '@nestjs/config';
import { ConfigSchema } from '@self/config';

@Module({
  imports: [
    CachedSWClientModule,
    ConfigModule.forRoot({
      validate: ConfigSchema.parse,
      cache: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
