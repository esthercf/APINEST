import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse,ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './entities/user.entity';
import {UsersService} from './users.service'

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}
    @ApiOkResponse({type: User, isArray:true})
    @ApiQuery({name:'name', required:false})
    @Get()
    getUsers(@Query('name')name:string):User[]
    {
        return this.usersService.findAll(name)
    }

    @ApiOkResponse({type: User, isArray:false})
    @Get(':id')
    getUserById(@Param('id')id:string):User//TODO auto parse id
    {
        return this.usersService.findById(Number(id));
    }
    @ApiCreatedResponse({type:User})
    @Post()
    createUser(@Body() body:CreateUserDto):User{

        return this.usersService.createUser(body);

    }

 
}
