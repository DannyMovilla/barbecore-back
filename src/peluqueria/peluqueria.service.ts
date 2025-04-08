import { Injectable } from '@nestjs/common';
import { CreatePeluqueriaDto } from './dto/create-peluqueria.dto';
import { UpdatePeluqueriaDto } from './dto/update-peluqueria.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PeluqueriaService {
  constructor(private prisma: PrismaService) {}

  create(data: CreatePeluqueriaDto) {
    return this.prisma.peluquerias.create({
      data,
    });
  }

  findAll() {
    return this.prisma.peluquerias.findMany();
  }

  findOne(id: number) {
    return this.prisma.peluquerias.findUnique({
      where: { id },
    });
  }

  update(id: number, data: UpdatePeluqueriaDto) {
    return this.prisma.peluquerias.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.peluquerias.delete({
      where: { id },
    });
  }
}
