import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PermissionsSeeder } from './seeds/permissions.seeder';
import { RolesSeeder } from './seeds/roles.seeder';
import { UsersSeeder } from './seeds/users.seeder';

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    private readonly permissionsSeeder: PermissionsSeeder,
    private readonly rolesSeeder: RolesSeeder,
    private readonly usersSeeder: UsersSeeder,
  ) {}

  async onModuleInit() {
    this.logger.log('Starting seeding process...');

    await this.permissionsSeeder.seed();
    await this.rolesSeeder.seed();
    await this.usersSeeder.seed();

    this.logger.log('Seeding process completed!');
  }
}
