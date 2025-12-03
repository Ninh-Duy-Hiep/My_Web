import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PermissionsSeeder {
  constructor(private readonly prisma: PrismaService) {}

  async seed() {
    const permissions = [
      { name: 'USER_READ', description: 'View users list' },
      { name: 'USER_CREATE', description: 'Create new user' },
      { name: 'USER_UPDATE', description: 'Update user' },
      { name: 'USER_DELETE', description: 'Delete user' },
    ];

    for (const p of permissions) {
      await this.prisma.permission.upsert({
        where: { name: p.name },
        update: {},
        create: p,
      });
    }
    Logger.log('Permissions seeded.', 'PermissionsSeeder');
  }
}
