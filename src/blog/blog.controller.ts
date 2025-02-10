import { Body, Controller, UseGuards, Get, Post, Req, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { BlogService } from './blog.service';
import { PostBlogDto } from './dto/post-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@ApiTags('Blog') // Grouping APIs under "Blog"
@ApiBearerAuth() // Requires JWT authentication in Swagger
@Controller('blog')
export class BlogController {
    constructor(private readonly blogService: BlogService) {}
    @UseGuards(JwtAuthGuard)
    @Post('post')
    @ApiOperation({ summary: 'Create a new blog post' })
    @ApiResponse({ status: 201, description: 'Blog post created successfully' })
    async postBlog(@Body() postBlogDto: PostBlogDto,@Req() request) {
        const userId = request.user.userId;
        console.log("id",userId);
        return this.blogService.postBlog(postBlogDto,userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('allblogs')
    @ApiOperation({ summary: 'Get all blog posts' })
    @ApiResponse({ status: 200, description: 'List of all blogs' })
    async getAllBlogs(@Req() request) {
        return this.blogService.getAllBlogs();
    }

    @UseGuards(JwtAuthGuard)
    @Get('myblogs')
    @ApiOperation({ summary: 'Get blogs created by the logged-in user' })
    @ApiResponse({ status: 200, description: 'User blogs retrieved successfully' })
    async getUserBlogs(@Req() request) {
        const userId = request.user.userId;
        return this.blogService.getUserBlogs(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('view/:id')
    @ApiOperation({ summary: 'View a blog post by ID' })
    @ApiResponse({ status: 200, description: 'Blog post retrieved successfully' })
    async viewBlogById(@Param('id') id: string, @Req() request) {
        const userId = request.user.userId;
        return this.blogService.getBlogById(id, userId);
    }

    

    @UseGuards(JwtAuthGuard)
    @Post('update/:id')
    @ApiOperation({ summary: 'Update a blog post' })
    @ApiResponse({ status: 200, description: 'Blog post updated successfully' })
    async updateBlog(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
        return this.blogService.update(id, updateBlogDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    @ApiOperation({ summary: 'Delete a blog post' })
    @ApiResponse({ status: 200, description: 'Blog post deleted successfully' })
    async deleteBlog(@Param('id') id: string) {
        return this.blogService.delete(id);
    }
}
