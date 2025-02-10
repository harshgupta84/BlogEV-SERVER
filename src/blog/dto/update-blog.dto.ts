import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, ArrayMinSize, IsBoolean } from 'class-validator';

export class UpdateBlogDto {
  @ApiProperty({ description: 'Updated title', example: 'Updated Blog Title', required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ description: 'Updated content', example: 'Updated content of the blog', required: false })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({ description: 'Updated topics', example: ['Tech', 'AI'], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  topics?: string[];
}
