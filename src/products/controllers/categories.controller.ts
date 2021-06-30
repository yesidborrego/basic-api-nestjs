import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
  createCategoryDto,
  updateCategoryDto,
} from 'src/products/dtos/categories.dto';
import { CategoriesService } from 'src/products/services/categories.service';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesServices: CategoriesService) {}

  @Get()
  getCategories() {
    return this.categoriesServices.findAll();
  }

  @Get(':id')
  getCategory(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesServices.finOne(id);
  }
  /*
  // Opción 1
  @Get(':id/products/:productsId')
  getCategory(
    @Param('id') id: string,
    @Param('productsId') productsId: string,
  ) {
    return {
      message: `Show category: ${id} with product: ${productsId}`,
    };
  }
  */
  /*
    // Opción 2
    @Get(':id/products/:productsId')
    getCategory(@Param() params: any): string {
      return `Show category: ${params.id} with product: ${params.productsId}`;
    }
  */

  @Post()
  create(@Body() payload: createCategoryDto) {
    return this.categoriesServices.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: updateCategoryDto,
  ) {
    return this.categoriesServices.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesServices.delete(id);
  }
}
