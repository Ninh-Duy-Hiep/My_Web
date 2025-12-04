import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';
import { FilterMediaDto } from './dto/filter-media.dto';

interface UserPayload {
  userId: string;
  email: string;
  role: string;
}

@Injectable()
export class MediaService {
  constructor(private prisma: PrismaService) {}

  async createMedia(files: Array<Express.Multer.File>, userId: string) {
    if (!files || files.length === 0) {
      throw new NotFoundException('No files uploaded');
    }

    const promises = files.map((file) => {
      return this.prisma.media.create({
        data: {
          filename: file.filename,
          originalName: file.originalname,
          mimeType: file.mimetype,
          size: file.size,
          path: file.path,
          uploadedById: userId,
        },
        include: {
          uploadedBy: {
            select: { id: true, userName: true, fullName: true },
          },
        },
      });
    });

    return await Promise.all(promises);
  }

  async getMedia(filter: FilterMediaDto) {
    const { page = 1, limit = 10 } = filter;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.media.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          uploadedBy: {
            select: { id: true, userName: true, fullName: true },
          },
        },
      }),
      this.prisma.media.count(),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async bulkDelete(ids: string[], user: UserPayload) {
    const mediaList = await this.prisma.media.findMany({
      where: {
        id: { in: ids },
      },
    });

    if (!mediaList.length) {
      throw new NotFoundException('No media found with provided IDs');
    }

    const isAdmin = user.role === 'ADMIN';

    if (!isAdmin) {
      const hasUnauthorizedFile = mediaList.some(
        (media) => media.uploadedById !== user.userId,
      );
      if (hasUnauthorizedFile) {
        throw new ForbiddenException(
          'You contains files that do not belong to you',
        );
      }
    }

    mediaList.forEach((media) => {
      try {
        const filePath = path.resolve(media.path);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      } catch (err) {
        console.error(`Failed to delete file from disk: ${media.path}`, err);
      }
    });

    const foundIds = mediaList.map((m) => m.id);

    return await this.prisma.media.deleteMany({
      where: {
        id: { in: foundIds },
      },
    });
  }

  async deleteMedia(id: string, user: UserPayload) {
    const media = await this.prisma.media.findUnique({ where: { id } });

    if (!media) {
      throw new NotFoundException('Media not found');
    }

    const isAdmin = user.role === 'ADMIN';
    if (!isAdmin && media.uploadedById !== user.userId) {
      throw new ForbiddenException('You can only delete your own files');
    }

    try {
      if (fs.existsSync(media.path)) {
        fs.unlinkSync(media.path);
      }
    } catch (err) {
      console.error('Error deleting file from disk:', err);
    }

    return await this.prisma.media.delete({ where: { id } });
  }
}
