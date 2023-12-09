import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SWClientExceptionsFilter } from '@self/utils';
import { Config} from '@self/config'
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerConfig = new DocumentBuilder()
    .setTitle('SW API')
    .setDescription('Cached wrapper for swapi.dev')
    .setVersion('1.0')
    .build();
  app.useGlobalFilters(new SWClientExceptionsFilter(app.getHttpAdapter()))
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);
  const port = app.get(ConfigService<Config>).get('APP_PORT');
  await app.listen(port);
  Logger.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
