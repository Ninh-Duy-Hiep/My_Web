import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './entities/user.entity';
import { FilterUserDto } from './dto/filter-user.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(filter: FilterUserDto) {
    const { page = 1, limit = 10, name } = filter;
    const skip = (page - 1) * limit;

    const where: Prisma.UserWhereInput = {};

    if (name) {
      where.fullName = {
        contains: name,
      };
    }

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip: skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({ where }),
    ]);

    const data = users.map((user) => new UserEntity(user));

    return {
      data: data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getByUserId(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) return null;
    return new UserEntity(user);
  }

  async findByUser(userName: string) {
    return this.prisma.user.findUnique({
      where: { userName },
      include: { role: true },
    });
  }

  async createUser(createUserDto: CreateUserDto) {
    if (createUserDto.email) {
      const emailExists = await this.prisma.user.findUnique({
        where: { email: createUserDto.email },
      });

      if (emailExists) {
        throw new ConflictException('Email already exists');
      }
    }

    if (createUserDto.userName) {
      const userNameExists = await this.prisma.user.findUnique({
        where: { userName: createUserDto.userName },
      });

      if (userNameExists) {
        throw new ConflictException('Username already exists');
      }
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const newUser = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });

    return new UserEntity(newUser);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async deleteUser(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
