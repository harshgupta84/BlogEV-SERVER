import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FeedBlogDto } from './dto/feed-blog.dto';

@Injectable()
export class FeedService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserFeed(userId: string): Promise<FeedBlogDto[]> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { topics: true },
    });

    if (!user || !user.topics.length) {
      throw new NotFoundException('User has no topics for feed');
    }

    const feedBlogs = await this.prisma.blog.findMany({
      where: { topics: { hasSome: user.topics } },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        content: true,
        topics: true,
        createdAt: true,
        author: { select: { id: true, name: true } },
      },
    });

    return feedBlogs; // Directly returning feedBlogs as FeedBlogDto[]
  }
}
