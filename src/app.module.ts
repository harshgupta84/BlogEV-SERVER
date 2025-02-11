import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BlogModule } from './blog/blog.module';
import { FeedModule } from './feed/feed.module';
import { BookmarkModule } from './bookmark/bookmark.module';


@Module({
  imports: [PrismaModule, AuthModule, UsersModule, BlogModule, FeedModule, BookmarkModule, ],
  controllers: [AppController],
  providers: [AppService, ],
})
export class AppModule {}
