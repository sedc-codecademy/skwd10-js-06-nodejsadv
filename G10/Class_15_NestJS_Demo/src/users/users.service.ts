/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';

type User = {
    id: string,
    username: string,
    password: string
}

@Injectable()
export class UsersService {
  private users: User[] = [{ id: '123', username: 'Goce', password: 'goce1992'}]
  getAllUsers(): User[] {
    return this.users
  }

  getUserById(id:string): User {
      const user = this.users.find(user => user.id === id);
      if (!user) {
          throw new NotFoundException('No user found with that ID')
      }
      return user;
  }

  insertUser(username: string, password: string) {
    const userId = Math.random().toString();
    const newProduct : User = {
        id: userId,
        username,
        password
    }
    this.users.push(newProduct);
    return userId;
  }


  deleteUser(userId: string) {
      const index = this.findUser(userId)[1];
      this.users.splice(index, 1);
  }

  private findUser(id: string): [User, number] {
    const userIndex = this.users.findIndex(prod => prod.id === id);
    const user = this.users[userIndex];
    if (!user) {
      throw new NotFoundException('Could not find product.');
    }
    return [user, userIndex];
  }
}