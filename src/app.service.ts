import { Inject, Injectable } from '@nestjs/common'; // opción1: useValue
// import { ConfigService } from '@nestjs/config'; // opción3: cambaido por archivo tipado 'configEnvTypes.ts'
import { ConfigType } from '@nestjs/config';
import configEnvTypes from './configEnvTypes';

@Injectable()
export class AppService {
  constructor(
    // @Inject('API_KEY') private apiKey: string, // opción1: useValue
    // @Inject('TASKS') private tasks: any[], // opción1: useValue
    // private configService: ConfigService, // opción3: cambaido por archivo tipado 'configEnvTypes.ts'
    @Inject(configEnvTypes.KEY)
    private configService: ConfigType<typeof configEnvTypes>,
  ) {}
  getHello() {
    // console.log(this.tasks);
    return {
      message: 'Hello World!',
      // API_KEY: this.apiKey, // opción1: useValue
      // tasks: this.tasks, // opción1: useValue
      // api_key: this.configService.get('API_KEY'), // opción2: ConfigModule - environments
      // database_name: this.configService.get('DATABASE_NAME'), // opción2: ConfigModule - environments
      api_key: this.configService.api_key, // opción3: cambaido por archivo tipado 'configEnvTypes.ts'
      database_name: this.configService.database.name, // opción3: cambaido por archivo tipado 'configEnvTypes.ts'
      database_port: this.configService.database.port, // opción3: cambaido por archivo tipado 'configEnvTypes.ts'
    };
  }
}
