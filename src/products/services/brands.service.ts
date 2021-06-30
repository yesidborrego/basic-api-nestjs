import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from 'src/products/dtos/brands.dto';
import { Brand } from 'src/products/entities/brand.entity';

@Injectable()
export class BrandsService {
  private counterId = 1;

  private brands: Brand[] = [
    {
      id: 1,
      name: 'Brand 1',
      image: 'brand.png',
    },
  ];

  findAll() {
    return this.brands;
  }

  findOne(id: number) {
    const brand = this.brands.find((brand) => brand.id === id);
    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return brand;
  }

  create(payload: CreateBrandDto) {
    this.counterId += 1;
    const newBrand = {
      id: this.counterId,
      ...payload,
    };
    this.brands.push(newBrand);
    return newBrand;
  }

  update(id: number, payload: UpdateBrandDto) {
    const brand = this.findOne(id);
    if (!brand) {
      return {
        message: 'Brand not found',
      };
    }
    const index = this.brands.findIndex((brand) => brand.id === id);
    this.brands[index] = { ...this.brands[index], ...payload };
    return {
      message: `Brand ${this.brands[index].name} has been updated`,
    };
  }

  delete(id: number) {
    const index = this.brands.findIndex((brand) => brand.id === id);
    if (index === -1) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    this.brands.splice(index, 1);
    return {
      message: `Brand #${id} has been deleted`,
    };
  }
}
