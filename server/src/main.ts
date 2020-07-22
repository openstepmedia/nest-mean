import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const hostDomain = AppModule.isDev ? `${AppModule.host}:${AppModule.port}` : AppModule.host;

  const options = new DocumentBuilder()
    .setTitle('Nest MEAN')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api/docs', app, document);
  /*
    const swaggerOptions = new DocumentBuilder()
        .setTitle('Nest MEAN')
        .setDescription('API Documentation')
        .setVersion('1.0.0')
        .setHost(hostDomain.split('//')[1])
        .setSchemes(AppModule.isDev ? 'http' : 'https')
        .setBasePath('/api')
        .addBearerAuth('Authorization', 'header')
        .build();

    const swaggerDoc = SwaggerModule.createDocument(app, swaggerOptions);

    SwaggerModule.setup('/api/docs', app, swaggerDoc, {
        swaggerUrl: `${hostDomain}/api/docs-json`,
        explorer: true,
        swaggerOptions: {
            docExpansion: 'list',
            filter: true,
            showRequestDuration: true,
        },
    });
*/
  // app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter());

  // set logger: @see https://www.npmjs.com/package/nest-winston
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  await app.listen(AppModule.port);
}

bootstrap();
