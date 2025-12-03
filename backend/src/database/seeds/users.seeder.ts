import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersSeeder {
  constructor(private readonly prisma: PrismaService) {}

  async seed() {
    const adminRole = await this.prisma.role.findUnique({
      where: { name: 'ADMIN' },
    });
    const userRole = await this.prisma.role.findUnique({
      where: { name: 'USER' },
    });

    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash('@Admin123', salt);
    const userPassword = await bcrypt.hash('@User123', salt);

    if (adminRole) {
      await this.prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: { roleId: adminRole.id },
        create: {
          userName: 'admin',
          email: 'admin@example.com',
          fullName: 'Admin',
          password: adminPassword,
          roleId: adminRole.id,
        },
      });
    }

    if (userRole) {
      await this.prisma.user.upsert({
        where: { email: 'user@example.com' },
        update: { roleId: userRole.id },
        create: {
          userName: 'user',
          email: 'user@example.com',
          fullName: 'User',
          password: userPassword,
          roleId: userRole.id,
        },
      });
    }
    Logger.log('Users seeded.', 'UsersSeeder');
  }
}
