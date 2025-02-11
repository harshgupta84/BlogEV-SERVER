import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookmarkService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserBookmarks(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        bookmarks: {
          select: {
            id: true,
            title: true,
            content: true,
            topics: true,
            createdAt: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.bookmarks;
  }

  async addBookmark(userId: string, blogId: string) {
    const blog = await this.prisma.blog.findUnique({ where: { id: blogId } });
    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        bookmarks: {
          connect: { id: blogId },
        },
      },
    });

    return { message: 'Bookmark added successfully' };
  }

  async removeBookmark(userId: string, blogId: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        bookmarks: {
          disconnect: { id: blogId },
        },
      },
    });

    return { message: 'Bookmark removed successfully' };
  }
}
