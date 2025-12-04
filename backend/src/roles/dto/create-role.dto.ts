import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsArray } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'MANAGER', description: 'Role name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Store Manager', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: [
      'e11c3cf6-ce6d-44b1-8d38-b3d216309e5b',
      'e11c3cf6-ce6d-44b1-8d38-b3d216309e5b',
    ],
    description: 'List of permission names assigned to this role',
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  permissionIds?: string[];
}
