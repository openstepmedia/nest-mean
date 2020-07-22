import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Configuration } from './shared/configuration/configuration.enum';
import { ConfigurationService } from './shared/configuration/configuration.service';
import { SharedModule } from './shared/shared.module';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';
import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';

@Module({
    imports: [
      SharedModule,
      UserModule,
      TodoModule,
      // MongoDB connection
      MongooseModule.forRootAsync({
        imports: [SharedModule],
        useFactory: async (_configService: ConfigurationService) => ({
            uri: _configService.get(Configuration.MONGO_URI),
            retryDelay: 500,
            retryAttempts: 3,
            useFindAndModify: false,
            useNewUrlParser: true,
            useCreateIndex: true,
        }),
        inject: [ConfigurationService],
      }),

      // Global Logger config
      WinstonModule.forRootAsync({
        imports: [SharedModule],
        useFactory: async (_configService: ConfigurationService) => ({
          transports: [
            new winston.transports.Console({
              format: winston.format.combine(
                winston.format.timestamp(),
                nestWinstonModuleUtilities.format.nestLike(),
              ),
            }),
            new winston.transports.File({
              filename: 'log/nest-mean.log',
              format: winston.format.combine(
                winston.format.timestamp(),
                nestWinstonModuleUtilities.format.nestLike(),
              ),
            }),
            // other transports...
          ],
        }),
        inject: [ConfigurationService],
      }),

    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    static host: string;
    static port: number | string;
    static isDev: boolean;

    constructor(private readonly _configurationService: ConfigurationService) {
        AppModule.port = AppModule.normalizePort(_configurationService.get(Configuration.PORT));
        AppModule.host = _configurationService.get(Configuration.HOST);
        AppModule.isDev = _configurationService.isDevelopment;
    }

    private static normalizePort(param: number | string): number | string {
        const portNumber: number = typeof param === 'string' ? parseInt(param, 10) : param;
        if (isNaN(portNumber)) return param;
        else if (portNumber >= 0) return portNumber;
    }
}
