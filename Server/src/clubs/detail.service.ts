import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DetailClub } from './detail.entity';
import { UpdateResult, DeleteResult } from 'typeorm';
import { from } from 'rxjs';
const jwt = require('jsonwebtoken');
import { validate } from 'class-validator';
import { SECRET } from '../config';
import * as crypto from 'crypto';

@Injectable()
export class DetailClubsService {
    constructor(
        @InjectRepository(DetailClub)
        private userRepository: Repository<DetailClub>,
    ) { }

    async  findAll(): Promise<DetailClub[]> {
        return await this.userRepository.find();
    }

    async  create(user: DetailClub): Promise<DetailClub> {
        return await this.userRepository.save(user);
    }

    async update(user: DetailClub): Promise<UpdateResult> {
        return await this.userRepository.update(user.id, user);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.userRepository.delete(id);
    }

    async deleteAll(): Promise<void> {
        await this.userRepository.clear();
    }

    public generateJWT(user) {
        let today = new Date();
        let exp = new Date(today);
        exp.setDate(today.getDate() + 60);

        return jwt.sign({
            id: user.id,
            username: user.userName,
            exp: exp.getTime() / 1000,
        }, SECRET);
    };

    async findOne(id:Number): Promise<any> {
        
        return await this.userRepository.findByIds([id]);

        //return await this.userRepository.findOne(id);
    }
}