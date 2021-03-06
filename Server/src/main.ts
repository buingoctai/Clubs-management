import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {createConnection, Connection} from "typeorm";
async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true});

  await app.listen(8000);
}
bootstrap();
