import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RolesSeeder {
  constructor(private readonly prisma: PrismaService) {}

  async seed() {
    const roles = [
      {
        name: 'ADMIN',
        description: 'Administrator',
        permissions: ['USER_READ', 'USER_CREATE', 'USER_UPDATE', 'USER_DELETE'],
      },
      {
        name: 'USER',
        description: 'User',
        permissions: ['USER_READ', 'USER_CREATE', 'USER_UPDATE', 'USER_DELETE'],
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
    Logger.log('Roles seeded.', 'RolesSeeder');
  }
}
