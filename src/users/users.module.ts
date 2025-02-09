import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module';  
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt'; 

@Module({
  imports: [PrismaModule , AuthModule, JwtModule],  
  providers: [UsersService],
  controllers: [UsersController],
})

export class UsersModule {}