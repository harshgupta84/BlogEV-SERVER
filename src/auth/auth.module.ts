// import { Module } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { AuthController } from './auth.controller';
// import { ConfigModule } from '@nestjs/config';
// import { JwtModule } from '@nestjs/jwt';
// import { PassportModule } from '@nestjs/passport';
// import { JwtStrategy } from './strategies/jwt.strategy';
// import { JwtAuthGuard } from './guards/jwt-auth.guard';
// import { PrismaModule } from '../prisma/prisma.module';

// @Module({
//   imports: [
//     ConfigModule.forRoot(),
//     PassportModule.register({ defaultStrategy: 'jwt' }),
//     JwtModule.register({
//       secret: process.env.JWT_SECRET,
//       signOptions: { expiresIn: '60m' },
//     }),
//     PrismaModule, 
//   ],
//   providers: [AuthService, JwtStrategy, JwtAuthGuard],
//   controllers: [AuthController],
// })
// export class AuthModule {
//   constructor() {}
// }



import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');
        console.log('JWT_SECRET:', secret); // Log the secret
        return {
          secret,
          signOptions: { expiresIn: '60m' },
        };
      },
      inject: [ConfigService],
    }),
    PrismaModule, 
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}