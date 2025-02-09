import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';  

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Get user name by userId (extracted from JWT token)
  async getUserName(userId: string): Promise<string> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { name: true }, // Select only the name field
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user.name;  // Return only the name
  }
}
