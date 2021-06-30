// import { Module, HttpModule, HttpService } from '@nestjs/common';
import { Module, HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { environments } from './environments';
import configEnvTypes from './configEnvTypes';

@Module({
  imports: [
    ConfigModule.forRoot({
      // envFilePath: '.env', // config estática
      envFilePath: environments[process.env.NODE_ENV] || '.env', // config dinjámica
      load: [configEnvTypes],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.number().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      }),
    }),
    HttpModule,
    UsersModule,
    ProductsModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: 'TASKS',
    //   useFactory: async (http: HttpService) => {
    //     const tasks = http
    //       .get('https://jsonplaceholder.typicode.com/todos')
    //       .toPromise();
    //     return (await tasks).data;
    //   },
    //   inject: [HttpService],
    // },
  ],
})
export class AppModule {}
/*
 * No se recomienda hacer llamados a API's o servicios externos utilizando 'useFactory', ya que esto detiene el inicio de la
 * aplicación hasta que se resuelva la petición por ser una función 'async'.
 * Se recomieda usarlo para realizar conexiones a DB's
 */
