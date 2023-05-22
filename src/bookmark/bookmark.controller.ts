import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { BookmarkService } from './bookmark.service';
import { GetUser } from './../auth/decorator/get-user.decorator';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { Body } from '@nestjs/common';
import { EditBookmarkDto } from './dto';
@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
  constructor(
    private bookmarkService: BookmarkService,
  ) {}
  @Get()
  getBookmarks(@GetUser('id') userId: number) {
    this.bookmarkService.getBookmarks(userId);
  }
  @Get('id')
  getBookmarksByID(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    this.bookmarkService.getBookmarksByID(
      userId,
      bookmarkId,
    );
  }
  @Post()
  createBookmark(
    @GetUser('id') userId: number,
    @Body() dto: CreateBookmarkDto,
  ) {
    this.bookmarkService.createBookmark(
      userId,
      dto,
    );
  }
  @Patch()
  editBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
    @Body() dto: EditBookmarkDto,
  ) {
    this.bookmarkService.editBookmarkById(
      userId,
      bookmarkId,
      dto,
    );
  }
  @Delete('id')
  deleteBookmarkByid(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    this.bookmarkService.deleteBookmarkByid(
      userId,
      bookmarkId,
    );
  }
}
