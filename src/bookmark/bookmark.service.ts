import { Injectable } from '@nestjs/common';
import {
  CreateBookmarkDto,
  EditBookmarkDto,
} from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { ForbiddenException } from '@nestjs/common/exceptions/forbidden.exception';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  getBookmarks(userId: number) {
    return this.prisma.bookmark.findMany({
      where: { userId },
    });
  }
  getBookmarksByID(
    userId: number,
    bookmarkId: number,
  ) {
    return this.prisma.bookmark.findFirst({
      where: { id: bookmarkId, userId },
    });
  }
  async createBookmark(
    userId: number,
    dto: CreateBookmarkDto,
  ) {
    const bookmark =
      await this.prisma.bookmark.create({
        data: { userId, ...dto },
      });
    return bookmark;
  }
  async editBookmarkById(
    userId: number,
    bookmarkId: number,
    dto: EditBookmarkDto,
  ) {
    // get bookmark by id
    const bookmark =
      await this.prisma.bookmark.findUnique({
        where: { id: bookmarkId },
      });
    // check if bookmark already exists
    if (!bookmark || bookmark.userId !== userId)
      throw new ForbiddenException(
        'Access to resourse denied ',
      );
    // edit bookmark
    return this.prisma.bookmark.update({
      where: { id: bookmarkId },
      data: { ...dto },
    });
  }
  async deleteBookmarkByid(
    userId: number,
    bookmarkId: number,
  ) {
    // get bookmark by id
    const bookmark =
      await this.prisma.bookmark.findUnique({
        where: { id: bookmarkId },
      });
    // check if bookmark already exists

    if (!bookmark || bookmark.userId !== userId)
      throw new ForbiddenException(
        'Access to resourse denied ',
      );

    await this.prisma.bookmark.delete({
      where: { id: bookmarkId },
    });
  }
}
