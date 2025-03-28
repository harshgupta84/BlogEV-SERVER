import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { SetTopicDto } from './dto/setTopic.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signUp(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return { message: 'User registered successfully' };
  }

  async setTopic(setTopicDto: SetTopicDto) {
    const { email, topics } = setTopicDto;

    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('User not found');

    return await this.prisma.user.update({
        where: { email },
        data: { topics },
    });
}

  async signIn(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('User not found');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Invalid credentials');

    const payload = { sub: user.id, email: user.email };
    return { access_token: this.jwtService.sign(payload), user };
  }
}
