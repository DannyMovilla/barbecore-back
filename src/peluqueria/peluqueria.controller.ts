import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PeluqueriaService } from './peluqueria.service';
import { CreatePeluqueriaDto } from './dto/create-peluqueria.dto';
import { UpdatePeluqueriaDto } from './dto/update-peluqueria.dto';

@Controller('peluqueria')
export class PeluqueriaController {
  constructor(private readonly peluqueriaService: PeluqueriaService) {}

  @Post()
  create(@Body() createPeluqueriaDto: CreatePeluqueriaDto) {
    return this.peluqueriaService.create(createPeluqueriaDto);
  }

  @Get()
  findAll() {
    return this.peluqueriaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.peluqueriaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updatePeluqueriaDto: UpdatePeluqueriaDto,
  ) {
    return this.peluqueriaService.update(id, updatePeluqueriaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.peluqueriaService.remove(id);
  }
}
