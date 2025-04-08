import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateServicioDto {
  @ApiProperty()
  @IsString()
  nombre: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  precio: number;

  @ApiProperty()
  @IsNumber()
  duracion_min: number;

  @ApiProperty()
  @IsNumber()
  peluqueria_id: number;
}
