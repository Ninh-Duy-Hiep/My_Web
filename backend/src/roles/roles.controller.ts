import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Query,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FilterRoleDto } from './dto/filter-rol.dto';

@ApiTags('Roles & Permissions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get('permissions')
  @ApiOperation({
    summary: 'Get all available permissions (for assignment UI)',
  })
  findAllPermissions() {
    return this.rolesService.getAllPermissions();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new role with permissions' })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.createRole(createRoleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all roles' })
  findAll(@Query() filter: FilterRoleDto) {
    return this.rolesService.getRole(filter);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get role details' })
  findOne(@Param('id') id: string) {
    return this.rolesService.getRoleById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update role and assign permissions' })
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.updateRole(id, updateRoleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete role' })
  remove(@Param('id') id: string) {
    return this.rolesService.deleteRole(id);
  }
}
