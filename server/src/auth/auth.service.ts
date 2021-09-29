import { Inject, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { TokenInput, TokenResponse } from './dtos/token.dto';

import {
  AuthModuleOptions,
  CONFIG_OPTIONS,
} from './interfaces/options.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: AuthModuleOptions,
  ) {}

  sign(payload: object): string {
    return jwt.sign(payload, this.options.accessTokenSecret, {
      expiresIn: '1m',
    });
  }

  verify(token: string) {
    return jwt.verify(token, this.options.accessTokenSecret);
  }

  refresh(payload: object): string {
    return jwt.sign(payload, this.options.refreshTokenSecret);
  }

  verifyRefresh(token: string) {
    return jwt.verify(token, this.options.refreshTokenSecret);
  }

  getToken({ refreshToken }: TokenInput): TokenResponse {
    try {
      const data = this.verifyRefresh(refreshToken);
      if (typeof data === 'object' && data.hasOwnProperty('id')) {
        return {
          status: 'ok',
          message: 'Token Refreshed.',
          token: this.sign({ id: data.id }),
        };
      }
      return {
        status: 'error',
        message: 'Invalid Token.',
      };
    } catch (e) {
      return {
        status: 'error',
        message: 'Invalid Token.',
      };
    }
  }
}
