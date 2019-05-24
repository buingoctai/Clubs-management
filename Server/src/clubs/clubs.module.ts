import { Module } from '@nestjs/common';
import { ClubsService } from './clubs.service';
import { ClubsController } from './clubs.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Club} from './club.entity';
import {DetailClub} from './detail.entity';
import {Schedule} from './schedule.entity';
import {History} from './history.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Club,DetailClub,Schedule,History]),
  ],
  providers: [ClubsService],
  controllers: [ClubsController]
})
export class ClubsModule {}
