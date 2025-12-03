import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'abc@123' })
  @IsNotEmpty({ message: 'User name cannot is empty' })
  userName: string;

  @ApiProperty({ example: '@Admin123' })
  @IsString()
  @IsNotEmpty({ message: 'Password cannot is empty' })
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).+$/, {
    message:
      'Password must contain at least 1 lowercase letter, 1 uppercase letter and 1 special character',
  })
  password: string;
}
