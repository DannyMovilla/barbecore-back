import {
  IsArray,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateDetalleReservaDto {
  @IsNotEmpty()
  servicio_id: string;

  @IsNumber()
  precio: number;

  @IsNumber()
  duracion: number;
}

export class CreateReservaDto {
  @IsUUID()
  cliente_id: string;

  @IsUUID()
  barbero_id: string;

  @IsInt()
  peluqueria_id: number;

  @IsDateString()
  fecha_hora: Date;

  @IsOptional()
  @IsString()
  observacion?: string;

  @IsString()
  estado: string;

  @IsInt()
  precio_total: number;

  @IsInt()
  duracion_total: number;

  @IsArray()
  detalles: any[];
}
