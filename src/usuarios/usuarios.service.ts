import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { supabase } from 'src/supabase/supabase.client';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async obtenerUsuariosPorPeluqueria(peluqueriaId: number) {
    return this.prisma.perfil_usuarios.findMany({
      where: { peluqueria_id: peluqueriaId, estado: true },
    });
  }

  async crearUsuario(data: CreateUsuarioDto) {
    // 1. Crear usuario en Supabase
    const { data: user, error } = await supabase.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true,
    });

    if (error) {
      throw new Error(`Error creando usuario en Supabase: ${error.message}`);
    }

    // 2. Crear en perfil_usuarios
    const perfil = await this.prisma.perfil_usuarios.create({
      data: {
        id: user.user.id,
        nombre: data.nombre,
        telefono: data.telefono,
        rol: data.rol,
        estado: true,
        peluqueria_id: Number(data.peluqueria_id),
      },
    });

    return { user: user.user, perfil };
  }
}
