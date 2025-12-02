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
    example: 'user@example.com',
    description: 'Email của user',
    required: false,
  })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  @IsOptional()
  email?: string;

  @ApiProperty({
    example: 'Nguyen Van A',
    description: 'Tên của user',
  })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Password@123', description: 'Mật khẩu mạnh' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).+$/, {
    message:
      'Mật khẩu phải chứa ít nhất 1 chữ thường, 1 chữ hoa và 1 ký tự đặc biệt',
  })
  password: string;
}
