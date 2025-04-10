import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';

@Controller('reservas')
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) {}

  @Post()
  create(@Body() createReservaDto: CreateReservaDto) {
    return this.reservasService.create(createReservaDto);
  }

  @Get()
  findAll(
    @Query('peluqueria_id') peluqueria_id: number,
    @Query('servicio_id') servicio_id?: number,
  ) {
    return this.reservasService.findAll(
      peluqueria_id,
      servicio_id ? servicio_id : undefined,
    );
  }

  @Get('params')
  getParamsByPeluqueria(
    @Query('peluqueria_id', ParseIntPipe) peluqueria_id: number,
  ) {
    console.log({ peluqueria_id });
    return this.reservasService.getParamsByPeluqueria(peluqueria_id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reservasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateReservaDto: UpdateReservaDto) {
    return this.reservasService.update(id, updateReservaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.reservasService.remove(id);
  }
}
