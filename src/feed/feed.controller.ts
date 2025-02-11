import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FeedService } from './feed.service';
import { FeedBlogDto } from './dto/feed-blog.dto';

@ApiTags('Feed')
@ApiBearerAuth()
@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get user feed based on topics' })
  @ApiResponse({ status: 200, description: 'List of blogs for the user feed', type: [FeedBlogDto] })
  async getUserFeed(@Req() request): Promise<FeedBlogDto[]> {
    const userId = request.user.userId;
    const blogs = await this.feedService.getUserFeed(userId);

    // Transform raw data to match FeedBlogDto (if needed)
    return blogs.map((blog) => ({
      id: blog.id,
      title: blog.title,
      content: blog.content,
      topics: blog.topics,
      createdAt: blog.createdAt,
      author: {
        id: blog.author.id,
        name: blog.author.name,
      },
    }));
  }
}
