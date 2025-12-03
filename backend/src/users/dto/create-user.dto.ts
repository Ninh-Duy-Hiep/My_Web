import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Matches,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'abc@123',
    description: 'Login name',
  })
  @IsString()
  @MinLength(6, { message: 'Login name must be at least 6 characters' })
  @IsNotEmpty()
  userName: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'Email',
    required: false,
  })
  @IsEmail({}, { message: 'Invalid email' })
  @IsOptional()
  email?: string;

  @ApiProperty({
    example: 'Nguyen Van A',
    description: 'FullName',
  })
  @IsString()
  fullName: string;

  @ApiProperty({ example: 'Password@123', description: 'Password' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).+$/, {
    message:
      'Password must contain at least 1 lowercase letter, 1 uppercase letter and 1 special character',
  })
  password: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsString()
  @IsNotEmpty()
  roleId: string;
}
