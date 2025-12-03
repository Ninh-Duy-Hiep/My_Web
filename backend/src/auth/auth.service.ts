import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async login(loginDto: LoginDto) {
    const { userName, password } = loginDto;

    const user = await this.usersService.findByUser(userName);
    if (!user) {
      throw new UnauthorizedException('Incorrect username or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      userName: user.userName,
      role: user.role?.name,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        email: user.email,
        userName: user.userName,
        role: user.role?.name,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    const userRole = await this.prisma.role.findUnique({
      where: { name: 'USER' },
    });

    if (!userRole) {
      throw new NotFoundException('Default role USER not found');
    }

    return this.usersService.createUser({
      ...registerDto,
      roleId: userRole.id,
    });
  }

  logout() {
    return {
      message: 'Logout successful',
      success: true,
    };
  }
}
