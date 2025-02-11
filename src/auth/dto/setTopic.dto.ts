import { ApiProperty } from '@nestjs/swagger';
import { IsEmail,IsNotEmpty, IsString, IsOptional, IsArray, ArrayNotEmpty, IsBoolean } from 'class-validator';

export class SetTopicDto {
 

      @IsEmail()
      email: string;

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
