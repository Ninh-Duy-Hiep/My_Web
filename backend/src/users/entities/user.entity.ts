import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { User } from '@prisma/client';

export class UserEntity implements User {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Auto-generated ID',
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ example: 'user@example.com', nullable: true })
  email: string | null;

  @ApiProperty({ example: 'abc@123' })
  userName: string;

  @ApiProperty({ example: 'Nguyen Van A' })
  fullName: string;

  @Exclude()
  password: string;

  @Exclude()
  roleId: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
