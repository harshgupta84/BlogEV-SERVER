import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsArray, ArrayNotEmpty, IsBoolean } from 'class-validator';

export class PostBlogDto {
  
  @ApiProperty({ description: 'Title of the blog', example: 'My First Blog' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Blog content', example: 'This is my blog content', required: false })
  @IsOptional()
  @IsString()
  content?: string;  // Made optional explicitly

  @ApiProperty({ 
    description: 'Topics related to the blog', 
    example: ['Tech', 'Programming'], 
    required: false, 
    type: [String] // Explicitly define as an array of strings
  })
  @IsOptional()
  @IsArray()  
  @ArrayNotEmpty()  // Ensures the array isn't empty (optional, remove if not needed)// Ensures all elements are strings
  topics?: string[];
}
