import { Injectable } from '@nestjs/common';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReservasService {
  constructor(private prisma: PrismaService) {}

  async create(createReservaDto: CreateReservaDto) {
    const { detalles, ...reservaData } = createReservaDto;

    return this.prisma.reservas.create({
      data: {
        ...reservaData,
        detalle_reserva: {
          createMany: {
            data: detalles || [],
          },
        },
      },
    });
  }

  async findAll(peluqueria_id: number, servicio_id?: number) {
    return this.prisma.reservas.findMany({
      where: {
        peluqueria_id,
        ...(servicio_id && {
          detalle_reserva: {
            some: { servicio_id },
          },
        }),
      },
      include: {
        cliente: true,
        barbero: true,
        detalle_reserva: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.reservas.findUnique({
      where: { id },
      include: {
        cliente: true,
        barbero: true,
        detalle_reserva: true,
      },
    });
  }

  async getParamsByPeluqueria(peluqueria_id: number) {
    const [servicios, clientes, barberos] = await Promise.all([
      this.prisma.servicios.findMany({
        where: { peluqueria_id },
      }),
      this.prisma.perfil_usuarios.findMany({
        where: {
          peluqueria_id,
          rol: 'cliente',
        },
      }),
      this.prisma.perfil_usuarios.findMany({
        where: {
          peluqueria_id,
          rol: 'barbero',
        },
      }),
    ]);

    return {
      servicios,
      clientes,
      barberos,
    };
  }

  async update(id: number, data: UpdateReservaDto) {
    return this.prisma.reservas.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.reservas.delete({
      where: { id },
    });
  }
}
