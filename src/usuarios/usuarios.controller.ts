import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private usuariosService: UsuariosService) {}

  @Get('peluqueria/:id')
  async getUsuariosPorPeluqueria(@Param('id', ParseIntPipe) id: number) {
    return this.usuariosService.obtenerUsuariosPorPeluqueria(id);
  }

  @Post()
  async crear(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.crearUsuario(createUsuarioDto);
  }
}
