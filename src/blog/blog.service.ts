import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostBlogDto } from './dto/post-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { RedisService } from 'src/redis/redis.service';
@Injectable()
export class BlogService {
    private readonly viewsThreshold = 10;
    constructor(private readonly prisma: PrismaService,private readonly redisService: RedisService) {}

    async postBlog(postBlogDto: PostBlogDto, userId: string) {
        console.log("postBlogDto", postBlogDto);
    
        // Destructure input DTO
        const { title, content, topics } = postBlogDto;
    
        // Check if user exists
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
    
        // Create blog
        const response = await this.prisma.blog.create({
            data: {
                title,
                content: content || "", // Default to empty string if not provided
                topics: topics||[], // Ensure proper JSON formatting
                authorId: userId,  // Ensure consistency with schema
            },
        });
    
        console.log("response", response);
        return response;
    }
    
    async getAllBlogs() {
        return await this.prisma.blog.findMany({
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                title: true,
                content: true,
                topics: true,
                createdAt: true,
            },
        });
    }

    async getUserBlogs(userId: string) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        return await this.prisma.blog.findMany({
            where: { authorId:userId },
            select: {
                id: true,
                title: true,
                content: true,
                topics: true,
                createdAt: true,
                author: true,
                
            },
        });
    }

    async getBlogById(id: string, userId: string) {
        const cacheKey = `blog_${id}`;

        // Check if blog is cached
        let blog = await this.redisService.get(cacheKey);

        if (!blog) {
            console.log('Fetching blog from DB');

            blog = await this.prisma.blog.findUnique({ where: { id }, select: {
                id: true,
                title: true,
                content: true,
                topics: true,
                createdAt: true,
                author: true,
                views: true,
            } });
            if (!blog) {
                throw new NotFoundException('Blog not found');
            }

            // Store blog in Redis if it reaches threshold views
            if (blog.views >= this.viewsThreshold) {
                await this.redisService.set(cacheKey, blog, 3600);
            }
        } else {
            console.log('Returning cached blog');
        }
        
        this.incrementViews(id, blog.views);
        return blog;
    }

    
    async update(id: string, updateBlogDto: UpdateBlogDto) {
        try {
            return await this.prisma.blog.update({
                where: { id },
                data: updateBlogDto,
            });
        } catch (error) {
            throw new NotFoundException('Blog not found');
        }
    }

    async delete(id: string) {
        try {
            await this.prisma.blog.delete({ where: { id } });
            return { message: 'Blog deleted successfully' };
        } catch (error) {
            throw new NotFoundException('Blog not found');
        }
    }

    async incrementViews(id: string, currentViews: number) {
        await this.prisma.blog.update({
            where: { id },
            data: { views: { increment: 1 } },
        });
        if (currentViews + 1 === this.viewsThreshold) {
            const blog = await this.prisma.blog.findUnique({ where: { id }, select: {
                id: true,
                title: true,
                content: true,
                topics: true,
                createdAt: true,
                author: true,
                views: true,
            } });
            await this.redisService.set(`blog_${id}`, blog, 3600);
        }
    }
}
