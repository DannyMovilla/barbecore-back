import { Module } from '@nestjs/common';
import { PeluqueriaService } from './peluqueria.service';
import { PeluqueriaController } from './peluqueria.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PeluqueriaController],
  providers: [PeluqueriaService, PrismaService],
})
export class PeluqueriaModule {}
