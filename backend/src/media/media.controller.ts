import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Query,
  UseGuards,
  Req,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  HttpCode,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { FilterMediaDto } from './dto/filter-media.dto';

interface UserPayload {
  userId: string;
  email: string;
  role: string;
}

interface RequestWithUser extends Request {
  user: UserPayload;
}

@ApiTags('Media')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('upload-images')
  @ApiOperation({
    summary: 'Upload multiple files (Max 10 files, Image only, max 5MB/file)',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @UseInterceptors(FilesInterceptor('files', 10))
  uploadFiles(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }),
          new FileTypeValidator({
            fileType: /^image\/(jpeg|png|webp|jpg)$/,
            skipMagicNumbersValidation: true,
          }),
        ],
        fileIsRequired: true,
      }),
    )
    files: Array<Express.Multer.File>,
    @Req() req: RequestWithUser,
  ) {
    if (!req.user || !req.user.userId) {
      throw new Error('User information is missing in Request');
    }
    return this.mediaService.createMedia(files, req.user.userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get list of media files' })
  findAll(@Query() filter: FilterMediaDto) {
    return this.mediaService.getMedia(filter);
  }

  @Post('bulk-delete')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete multiple media files' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        ids: {
          type: 'array',
          items: { type: 'string', format: 'uuid' },
          example: ['uuid-1', 'uuid-2'],
        },
      },
    },
  })
  removeMany(@Body() body: { ids: string[] }, @Req() req: RequestWithUser) {
    return this.mediaService.bulkDelete(body.ids, req.user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a media file' })
  remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.mediaService.deleteMedia(id, req.user);
  }
}
