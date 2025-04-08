import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ServiciosService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateServicioDto) {
    const peluqueria = await this.prisma.peluquerias.findUnique({
      where: { id: data.peluqueria_id },
    });
    if (!peluqueria) throw new NotFoundException('Peluquería no encontrada');

    const { nombre, descripcion, precio, duracion_min, peluqueria_id } = data;

    return this.prisma.servicios.create({
      data: {
        nombre,
        descripcion,
        precio,
        duracion_min,
        peluqueria: {
          connect: {
            id: peluqueria_id,
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.servicios.findMany({
      include: { peluqueria: true },
    });
  }

  async findOne(id: number) {
    const servicio = await this.prisma.servicios.findUnique({
      where: { id },
      include: { peluqueria: true },
    });

    if (!servicio) throw new NotFoundException('Servicio no encontrado');
    return servicio;
  }

  async update(id: number, updateServicioDto: UpdateServicioDto) {
    await this.findOne(id); // Para validar existencia
    return this.prisma.servicios.update({
      where: { id },
      data: updateServicioDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Para validar existencia
    return this.prisma.servicios.delete({
      where: { id },
    });
  }
}
