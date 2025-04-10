import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { supabase } from 'src/supabase/supabase.client';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async obtenerUsuariosPorPeluqueria(peluqueriaId: number) {
    const usuarios = await this.prisma.perfil_usuarios.findMany({
      where: { peluqueria_id: peluqueriaId, estado: true },
      include: {
        users: {
          select: {
            email: true,
          },
        },
      },
    });

    return usuarios.map((usuario) => ({
      ...usuario,
      email: usuario.users?.email || null,
      users: undefined, // elimina el objeto users del resultado
    }));
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

  async findOne(id: string) {
    const usuario = await this.prisma.perfil_usuarios.findUnique({
      where: { id: id },
    });

    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    return usuario;
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    await this.findOne(id); // Para validar existencia
    return this.prisma.perfil_usuarios.update({
      where: { id: id },
      data: updateUsuarioDto,
    });
  }

  async remove(id: string) {
    const usuario = await this.findOne(id); // Validar existencia

    // 1. Desactivar el usuario en tu tabla personalizada
    await this.prisma.perfil_usuarios.update({
      where: { id },
      data: { estado: false }, // O "activo: false", depende cómo lo hayas definido
    });

    // 2. Desactivar el acceso en Supabase.auth.users
    await supabase.auth.admin.updateUserById(usuario.id, {
      ban_duration: '876000h',
    });

    return { message: 'Usuario desactivado correctamente' };
  }
}
