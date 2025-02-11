import { Controller, Get, Post, Delete, Param, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { BookmarkService } from './bookmark.service';

@ApiTags('Bookmarks')
@ApiBearerAuth()
@Controller('bookmarks')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all bookmarks for the logged-in user' })
  @ApiResponse({ status: 200, description: 'List of bookmarked blogs' })
  async getUserBookmarks(@Req() request) {
    const userId = request.user.userId;
    return this.bookmarkService.getUserBookmarks(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':blogId')
  @ApiOperation({ summary: 'Add a bookmark for the logged-in user' })
  @ApiResponse({ status: 201, description: 'Bookmark added successfully' })
  async addBookmark(@Param('blogId') blogId: string, @Req() request) {
    const userId = request.user.userId;
    return this.bookmarkService.addBookmark(userId, blogId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':blogId')
  @ApiOperation({ summary: 'Remove a bookmark for the logged-in user' })
  @ApiResponse({ status: 200, description: 'Bookmark removed successfully' })
  async removeBookmark(@Param('blogId') blogId: string, @Req() request) {
    const userId = request.user.userId;
    return this.bookmarkService.removeBookmark(userId, blogId);
  }
}
