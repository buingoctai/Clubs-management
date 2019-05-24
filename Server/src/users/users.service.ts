import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UpdateResult, DeleteResult } from 'typeorm';
import { from } from 'rxjs';
import { LoginUserDto } from './dto/login-user.dto';
import { UserRO } from './user.interface';
const jwt = require('jsonwebtoken');
import { validate } from 'class-validator';
import { SECRET } from '../config';
import * as crypto from 'crypto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async  findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async  create(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }

    async update(user: User): Promise<UpdateResult> {
        return await this.userRepository.update(user.id, user);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.userRepository.delete(id);
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

    async findOne(loginUserDto: LoginUserDto): Promise<User> {
        const findOneOptions = {
            userName: loginUserDto.userName,
            //password: crypto.createHmac('sha256', loginUserDto.password).digest('hex'),
            password:loginUserDto.password,
        };

        return await this.userRepository.findOne(findOneOptions);
    }
}