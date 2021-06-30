// import { Inject, Injectable, NotFoundException } from '@nestjs/common'; // opción 1: useValue
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'; // opción 2: configModule
import { ProductsService } from 'src/products/services/products.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    // @Inject('API_KEY') private apiKey: string, // opción 1: useValue
    private configService: ConfigService, // opción 2: configModule
  ) {}
  private counterId = 1;

  private users: User[] = [
    {
      id: 1,
      email: 'admin@ecaribe.com.co',
      password: 'admin123',
      role: 'admin',
    },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find((user) => user.id === id);
  }

  create(payload: CreateUserDto) {
    this.counterId += 1;
    const newUser = {
      id: this.counterId,
      ...payload,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, payload: UpdateUserDto) {
    const user = this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    const index = this.users.findIndex((user) => user.id === id);
    this.users[index] = { ...this.users[index], ...payload };
    return {
      message: `User '${this.users[index].email}' has been updated`,
      // api_key: this.apiKey, // opción 1: useValue
      api_key: this.configService.get('API_KEY'), // opción 2: configModule
      database_name: this.configService.get('DATABASE_NAME'), // opción 2: configModule
    };
  }

  delete(id: number) {
    const user = this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    const index = this.users.findIndex((user) => user.id === id);
    this.users.splice(index, 1);
    return {
      message: `User '${id}' has been deleted`,
    };
  }

  getOrdersByUser(id: number) {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: this.productsService.findAll(),
    };
  }
}
