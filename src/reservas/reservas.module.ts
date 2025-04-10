import { Module } from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { ReservasController } from './reservas.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ReservasController],
  providers: [ReservasService, PrismaService],
})
export class ReservasModule {}
