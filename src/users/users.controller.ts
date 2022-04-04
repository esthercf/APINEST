import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse,ApiNotFoundResponse,ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { NotFoundError } from 'rxjs';
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
    @ApiNotFoundResponse()
    @Get(':id')
    getUserById(@Param('id', ParseIntPipe)id:number):User//TODO auto parse id
    {
        console.log('-->', typeof id);
       const user =  this.usersService.findById(Number(id));
       if(!user)
       {
           throw new NotFoundException;
       }
       return user;
    }
    @ApiCreatedResponse({type:User})
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @Post()
    createUser(@Body() body:CreateUserDto):User{

        return this.usersService.createUser(body);
    }

 
}
