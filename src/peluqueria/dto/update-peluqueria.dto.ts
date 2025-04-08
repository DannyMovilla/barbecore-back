import { PartialType } from '@nestjs/mapped-types';
import { CreatePeluqueriaDto } from './create-peluqueria.dto';

export class UpdatePeluqueriaDto extends PartialType(CreatePeluqueriaDto) {}
