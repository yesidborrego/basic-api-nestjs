import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  @Get()
  getOrders() {
    return {
      message: 'Show all orders',
    };
  }

  @Post()
  create(@Body() payload: any) {
    const { name, description } = payload;
    return {
      message: 'Action to create',
      name,
      description,
    };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: any) {
    const { name, description } = payload;
    return {
      message: `Order: ${id} has been updated`,
      name,
      description,
    };
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return {
      message: `Order: ${id} has been deleted`,
      id,
    };
  }
}
