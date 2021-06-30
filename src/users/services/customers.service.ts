import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from 'src/users/dtos/customers.dto';
import { Customer } from 'src/users/entities/customer.entity';

@Injectable()
export class CustomersService {
  private counterId = 1;

  private customers: Customer[] = [
    {
      id: 1,
      name: 'Alvaro',
      lastName: 'Sanchez',
      phone: '3003030303',
    },
  ];

  findAll() {
    return this.customers;
  }

  findOne(id: number) {
    const customer = this.customers.find((customer) => customer.id === id);
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;
  }

  create(payload: CreateCustomerDto) {
    this.counterId += 1;
    const newCustomer = {
      id: this.counterId,
      ...payload,
    };
    this.customers.push(newCustomer);
    return newCustomer;
  }

  update(id: number, payload: UpdateCustomerDto) {
    const customer = this.findOne(id);
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    const index = this.customers.findIndex((customer) => customer.id === id);
    this.customers[index] = { ...this.customers[index], ...payload };
    return {
      message: `Customer '${this.customers[index].name}' has been updated`,
    };
  }

  delete(id: number) {
    const customer = this.findOne(id);
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    const index = this.customers.findIndex((customer) => customer.id === id);
    this.customers.splice(index, 1);
    return {
      message: `Customer #${index} has been deleted`,
    };
  }
}
