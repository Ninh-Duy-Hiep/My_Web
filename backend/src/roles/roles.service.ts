import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Prisma } from '@prisma/client';
import { FilterRoleDto } from './dto/filter-rol.dto';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  async getRole(filter: FilterRoleDto) {
    const { page, limit, search } = filter;

    const where: Prisma.RoleWhereInput = {
      ...(search
        ? {
            name: {
              contains: search,
            },
          }
        : {}),
    };

    if (page && limit) {
      const skip = (page - 1) * limit;

      const [roles, total] = await Promise.all([
        this.prisma.role.findMany({
          where,
          skip,
          take: limit,
          include: {
            permissions: true,
            _count: { select: { users: true } },
          },
          orderBy: { createdAt: 'desc' },
        }),
        this.prisma.role.count({ where }),
      ]);

      return {
        data: roles,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      };
    }

    return this.prisma.role.findMany({
      where,
      include: {
        permissions: true,
        _count: { select: { users: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getAllPermissions() {
    return this.prisma.permission.findMany();
  }

  async getRoleById(id: string) {
    const role = await this.prisma.role.findUnique({
      where: { id },
      include: { permissions: true },
    });
    if (!role) throw new NotFoundException('Role not found');
    return role;
  }

  async createRole(createRoleDto: CreateRoleDto) {
    const { permissionIds, ...roleData } = createRoleDto;

    const existRole = await this.prisma.role.findUnique({
      where: { name: roleData.name },
    });
    if (existRole) throw new ConflictException('Role name already exists');

    return this.prisma.role.create({
      data: {
        ...roleData,
        permissions: {
          connect: permissionIds?.map((id) => ({ id })) || [],
        },
      },
      include: { permissions: true },
    });
  }

  async updateRole(id: string, updateRoleDto: UpdateRoleDto) {
    const { permissionIds, ...roleData } = updateRoleDto;

    const permissionUpdate = permissionIds
      ? {
          set: permissionIds.map((id) => ({ id })),
        }
      : undefined;

    return this.prisma.role.update({
      where: { id },
      data: {
        ...roleData,
        permissions: permissionUpdate,
      },
      include: { permissions: true },
    });
  }

  async deleteRole(id: string) {
    const countUsers = await this.prisma.user.count({ where: { roleId: id } });
    if (countUsers > 0) {
      throw new ConflictException(
        'Cannot delete role because it is assigned to users',
      );
    }
    return this.prisma.role.delete({ where: { id } });
  }
}
