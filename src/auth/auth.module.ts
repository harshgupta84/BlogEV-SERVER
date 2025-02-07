import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
@Module({
  imports: [
    ConfigModule.forRoot(), // Make sure ConfigModule is properly initialized
    JwtModule.register({ 
      secret: process.env.JWT_SECRET, 
      signOptions: { expiresIn: '1h' } // Optional: Add expiration time for JWT
    })],
  providers: [AuthService,JwtAuthGuard],
  controllers: [AuthController]
})
export class AuthModule {}
