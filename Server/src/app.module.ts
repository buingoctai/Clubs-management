import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ClubsModule } from './clubs/clubs.module';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
  imports: [UsersModule,
    ClubsModule,       
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'mydb',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
 }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
