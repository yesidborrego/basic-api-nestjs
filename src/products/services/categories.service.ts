import { Injectable, NotFoundException } from '@nestjs/common';
import {
  createCategoryDto,
  updateCategoryDto,
} from 'src/products/dtos/categories.dto';
import { Category } from 'src/products/entities/category.entity';

@Injectable()
export class CategoriesService {
  private counterID = 1;

  private category: Category[] = [
    {
      id: 1,
      name: 'Category 1',
      description: 'Descryption category 1',
    },
  ];

  findAll() {
    return this.category;
  }

  finOne(id: number) {
    const category = this.category.find((category) => category.id === id);
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  create(payload: createCategoryDto) {
    this.counterID += 1;
    const newCategory = {
      id: this.counterID,
      ...payload,
    };
    this.category.push(newCategory);
    return newCategory;
  }

  update(id: number, payload: updateCategoryDto) {
    const category = this.finOne(id);
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    const index = this.category.findIndex((category) => category.id === id);
    this.category[index] = { ...this.category[index], ...payload };
    return {
      message: `Category ${this.category[index].name} has been updated`,
    };
  }

  delete(id: number) {
    const category = this.finOne(id);
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    const index = this.category.findIndex((category) => category.id === id);
    this.category.splice(index, 1);
    return {
      message: `Category ${id} has been deleted`,
    };
  }
}
