import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe, // Pipe creado por Nestjs
  Post,
  Put,
  // Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/products/dtos/products.dto';
// import { ParseIntPipe } from 'src/common/parse-int.pipe'; // Pipe personalizado
import { ProductsService } from 'src/products/services/products.service';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  // Query params: /products?limit=100&offset=5
  /*
    //Opción 1
    @Get()
    getProducts(@Query() params: any): string {
      const { limit, offset } = params;
      return `Products: limit => ${limit} offset => ${offset}`;
    }
  */

  //Opción 20
  @Get()
  getProduct() {
    // @Query('brand') brand: string, // @Query('offset') offset = 5, // TS infiere el tipo del parámetro por eso no es necesario colocarselo // @Query('limit') limit = 100, // valores del parámetro por defecto,
    // return {
    //   message: `Products: limit => ${limit} offset => ${offset} brand => ${brand}`,
    // };
    return this.productService.findAll();
  }

  // Se deben colocar todas las rutas exactas primero que las rutas dinámicas para que no existe
  // conflictos e ingresen en una ruta dinámica pensando que es un parámetro
  @Get('filter') // ruta exacta
  getProductFilter() {
    return {
      message: 'Show product filter',
    };
  }

  @Get(':id') // ruta dinámica
  @HttpCode(HttpStatus.ACCEPTED)
  getUser(@Param('id', ParseIntPipe) id: number) {
    // return {
    //   message: `Show product: ${id}`,
    // };
    return this.productService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    // const { name, description } = payload;
    // return {
    //   message: 'Action to create',
    //   name,
    //   description,
    // };
    return this.productService.create(payload);
  }

  // No se recomienda específicar cada uno de los parámetros porque sea hace largo y tedioso
  /*
  createProduct(
    @Body('name') name: string,
    @Body('description') description: string,
  ) {
    return {
      message: 'Action to create',
      name,
      description,
    };
  }
  */

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    // const { name, description } = payload;
    // return {
    //   message: `Product: ${id} has been updated`,
    //   name,
    //   description,
    // };
    return this.productService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    // return {
    //   message: `Product: ${id} has been deleted`,
    //   id,
    // };
    return this.productService.delete(id);
  }
}
