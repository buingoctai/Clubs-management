import { Controller, Get } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service'
import { Post, Put, Delete, Body, Param,UsePipes } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { LoginUserDto } from './dto/login-user.dto';
import { UserRO } from './user.interface';
import { ValidationPipe } from '../shared/piped/validation.pipe';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }
  @Get()
  index(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() userData: User): Promise<any> {
    return this.usersService.create(userData);
  }

  @Put(':id/update')
  async update(@Param('id') id, @Body() userData: User): Promise<any> {
    userData.id = Number(id);
    console.log('Update #' + userData.id)
    return this.usersService.update(userData);
  }

  @Delete(':id/delete')
  async delete(@Param('id') id): Promise<any> {
    return this.usersService.delete(id);
  }

  // @Post('login')
  // async login(@Body() loginUserDto: LoginUserDto): Promise<UserRO> {
  //   const _user = await this.usersService.findOne(loginUserDto);
  //   const errors = {User: ' not found'};
  //   if (!_user) throw new HttpException({errors}, 401);
  //   const token = await this.usersService.generateJWT(_user);
  //   const {userName,password} = _user;
  //   const user={userName,password,token};
  //   return {user};
  // }
  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(@Body() userData: User): Promise<UserRO> {
    const _user = await this.usersService.findOne(userData);
    const errors = {User: ' not found'};
    if (!_user) throw new HttpException({errors}, 401);
    const token = await this.usersService.generateJWT(_user);
    const {userName,password} = _user;
    const user={userName,password,token};
    return {user};
  }
}
