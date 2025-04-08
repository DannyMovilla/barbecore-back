import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';

export enum RolUsuario {
  CLIENTE = 'cliente',
  BARBERO = 'barbero',
  ADMIN = 'admin',
}

export class CreateUsuarioDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres.' })
  password: string;

  @ApiProperty()
  @IsString()
  nombre: string;

  @ApiProperty()
  @IsString()
  @MinLength(10, { message: 'El telefono debe tener al menos 10 caracteres.' })
  telefono: string;

  @ApiProperty()
  @IsEnum(RolUsuario, {
    message: 'El rol debe ser cliente, barbero o admin.',
  })
  rol: RolUsuario;

  @ApiProperty()
  @IsString()
  peluqueria_id: number;
}
