import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RolesSeeder {
  constructor(private readonly prisma: PrismaService) {}

  async seed() {
    const allPermissions = await this.prisma.permission.findMany();
    const allPermissionNames = allPermissions.map((p) => p.name);

    const roles = [
      {
        name: 'ADMIN',
        description: 'Administrator',
        permissions: allPermissionNames,
      },
    ];

    for (const r of roles) {
      const permissionsToConnect = r.permissions.map((pName) => ({
        name: pName,
      }));

      await this.prisma.role.upsert({
        where: { name: r.name },
        update: {
          permissions: {
            set: [],
            connect: permissionsToConnect,
          },
        },
        create: {
          name: r.name,
          description: r.description,
          permissions: {
            connect: permissionsToConnect,
          },
        },
      });
    }
    Logger.log('Roles seeded with permissions.', 'RolesSeeder');
  }
}
