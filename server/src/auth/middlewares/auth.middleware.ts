import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserService } from 'src/user/user.service';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      if ('x-jwt' in req.headers) {
        const token = req.headers['x-jwt'];
        const data = this.authService.verify(token.toString());
        if (typeof data === 'object' && data.hasOwnProperty('id')) {
          const _user = await this.userService.findById(data.id);
          req['user'] = _user;
        }
      }
    } catch (e) {}
    next();
  }
}
