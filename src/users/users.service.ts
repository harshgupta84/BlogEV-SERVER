import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';  

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Get user name by userId (extracted from JWT token)
  async getUser(userId: string){
    const user = await this.prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;  // Return only the name
  }
}
