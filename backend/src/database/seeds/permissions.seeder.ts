import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PermissionsSeeder {
  constructor(private readonly prisma: PrismaService) {}

  async seed() {
    const permissions = [
      // User Management
      { name: 'USER_VIEW', description: 'View users list' },
      { name: 'USER_CREATE', description: 'Create new user' },
      { name: 'USER_UPDATE', description: 'Update user' },
      { name: 'USER_DELETE', description: 'Delete user' },

      // Role Management
      { name: 'ROLE_VIEW', description: 'View roles list' },
      { name: 'ROLE_CREATE', description: 'Create new role' },
      { name: 'ROLE_UPDATE', description: 'Update role' },
      { name: 'ROLE_DELETE', description: 'Delete role' },

      // Permission Management
      { name: 'PERMISSION_VIEW', description: 'View permissions list' },

      // Media Management
      { name: 'MEDIA_VIEW', description: 'View media files' },
      { name: 'MEDIA_UPLOAD', description: 'Upload media files' },
      { name: 'MEDIA_DELETE', description: 'Delete media files' },
    ];

    for (const p of permissions) {
      await this.prisma.permission.upsert({
        where: { name: p.name },
        update: {},
        create: p,
      });
    }
    Logger.log('Permissions seeded with new resources.', 'PermissionsSeeder');
  }
}
