import { Injectable } from '@nestjs/common';
import {
  CreateBookmarkDto,
  EditBookmarkDto,
} from './dto';

@Injectable()
export class BookmarkService {
  getBookmarks(userId: number) {}
  getBookmarksByID(
    userId: number,
    bookmarkId: number,
  ) {}
  createBookmark(
    userId: number,
    dto: CreateBookmarkDto,
  ) {}
  editBookmarkById(
    userId: number,
    bookmarkId: number,
    dto: EditBookmarkDto,
  ) {}
  deleteBookmarkByid(
    userId: number,
    bookmarkId: number,
  ) {}
}
