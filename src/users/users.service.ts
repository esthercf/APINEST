import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
private users:User[] =[{id:0, name:'Mar'},{id:1, name:'Tom'}];
findAll(){
    return this.users;
}
findById(userId:number):User{
    return this.users.find(user=>user.id===userId);

}
createUser(user:CreateUserDto):User{
    const newUser ={id:Date.now(), ...user};
    this.users.push(newUser);
    return newUser;
}

}
