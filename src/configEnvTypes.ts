import { registerAs } from '@nestjs/config';

export default registerAs('configEnvTypes', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
    },
    api_key: process.env.API_KEY,
  };
});
