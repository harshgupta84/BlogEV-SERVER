// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { Observable } from 'rxjs';

// @Injectable()
// export class JwtAuthGuard implements CanActivate {
//   constructor(private jwtService: JwtService) {}

//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const request = context.switchToHttp().getRequest();
//     const authHeader = request.headers['authorization'] || request.headers['Authorization'];

//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       console.error('Missing or malformed token');
//       return false;
//     }

//     const token = authHeader.split(' ')[1];

//     console.log('Auth Header:', authHeader);
//     console.log('Token:', token);

//     try {
//       const payload = this.jwtService.verify(token);
//       request.user = payload;
//       return true;
//     } catch (error) {
//       console.error('JWT verification failed:', error);
//       return false;
//     }
//   }
// }

import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Custom logic can be added here (e.g., logging, role checks)
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      throw new UnauthorizedException('Invalid or expired token');
    }
    // Return the validated user payload (available in req.user)
    return user;
  }
}
