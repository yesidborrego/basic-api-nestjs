import { Global, Module } from '@nestjs/common';

const API_KEY = 'ABC123DEF456';
const API_KEY_PROD = 'PROD123PROD456';

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      // useValue: API_KEY, // Valor fijo
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY, // Valor dinámico
    },
  ],
  exports: ['API_KEY'],
})
export class DatabaseModule {}
