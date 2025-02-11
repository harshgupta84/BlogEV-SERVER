import { ApiProperty } from '@nestjs/swagger';

export class FeedBlogDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty({ type: [String] })
  topics: string[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({ type: Object })
  author: {
    id: string;
    name: string;
  };
}
