import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { SeedService } from './database/seed.service';
import { PermissionsSeeder } from './database/seeds/permissions.seeder';
import { RolesSeeder } from './database/seeds/roles.seeder';
import { UsersSeeder } from './database/seeds/users.seeder';
import { AuthModule } from './auth/auth.module';
import { MediaModule } from './media/media.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RolesModule } from './roles/roles.module';
@Module({
  imports: [
    UsersModule,
    AuthModule,
    MediaModule,
    RolesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
  ],
  controllers: [],
  providers: [
    PrismaService,
    SeedService,
    PermissionsSeeder,
    RolesSeeder,
    UsersSeeder,
  ],
})
export class AppModule {}
