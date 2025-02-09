import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() body: SignupDto) {
    return this.authService.signUp(body.name, body.email, body.password);
  }

  @Post('signin')
  async signIn(@Body() body: SigninDto) {
    return this.authService.signIn(body.email, body.password);
  }
}
