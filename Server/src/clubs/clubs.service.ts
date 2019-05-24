import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Club } from './club.entity';
import { DetailClub } from './detail.entity';
import { Schedule } from './schedule.entity';
import { History } from './history.entity';
import { UpdateResult, DeleteResult } from 'typeorm';
import { from } from 'rxjs';
const jwt = require('jsonwebtoken');
import { validate } from 'class-validator';
import { SECRET } from '../config';
import * as crypto from 'crypto';

@Injectable()
export class ClubsService {
    constructor(
        @InjectRepository(Club)
        private clubRepository: Repository<Club>,

        @InjectRepository(DetailClub)
        private detailClubRepository: Repository<DetailClub>,

        @InjectRepository(Schedule)
        private scheduleRepository: Repository<Schedule>,

        @InjectRepository(History)
        private historyRepository: Repository<History>
    ) { }

    async  findAll(): Promise<Club[]> {
        return await this.clubRepository.find();
    }

    async  create(club: Club): Promise<Club> {
        return await this.clubRepository.save(club);
    }

    async update(club: Club): Promise<UpdateResult> {
        return await this.clubRepository.update(club.id, club);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.clubRepository.delete(id);
    }

    async deleteAll(): Promise<void> {
        await this.clubRepository.clear();
    }

    async findOne(id: Number): Promise<any> {

        return await this.clubRepository.findByIds([id]);

        //return await this.userRepository.findOne(id);
    }
    //------------------------------------------
    async findOneDetail(id: Number): Promise<any> {

        return await this.detailClubRepository.findByIds([id]);

        //return await this.userRepository.findOne(id);
    }
    async  createDetailClub(detailclub: DetailClub): Promise<DetailClub> {
        return await this.detailClubRepository.save(detailclub);
    }
     //------------------------------------------
    async  createMatchHistory(matchData: Schedule): Promise<Schedule> {
        return await this.scheduleRepository.save(matchData);
    }

    async findMatchInfor(id: Number): Promise<any> {

        return await this.scheduleRepository.findByIds([id]);

        //return await this.userRepository.findOne(id);
    }
    async findMatchsInfor(): Promise<any> {

        return await this.scheduleRepository.find();

        //return await this.userRepository.findOne(id);
    }
    async updateMatchInfor(matchData: Schedule): Promise<UpdateResult> {

        return await this.scheduleRepository.update(matchData.id,matchData);

        //return await this.userRepository.findOne(id);
    }

    //---------------------------------------
    async findHistory(): Promise<any> {

        return await this.historyRepository.find();

        //return await this.userRepository.findOne(id);
    }
    async  createClubHistory(historyClub: History): Promise<History> {
        return await this.historyRepository.save(historyClub);
    }

}