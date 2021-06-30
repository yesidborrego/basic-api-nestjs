import { IsString, IsUrl, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateBrandDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsUrl()
  @IsNotEmpty()
  readonly image: string;
}

// Con PartialType se crean las validaciones para el 'update' igual que en el 'create'
// con la diferencia que en 'update' todas las propiedades son opcionales
export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
