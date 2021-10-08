import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken';
import { Token } from 'src/token/entities/token.entity';
import { Repository } from 'typeorm';
import { TokenInput, TokenResponse } from './dtos/token.dto';

import {
  AuthModuleOptions,
  CONFIG_OPTIONS,
} from './interfaces/options.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Token) private readonly token: Repository<Token>,
    @Inject(CONFIG_OPTIONS) private readonly options: AuthModuleOptions,
  ) {}

  sign(payload: object): string {
    return jwt.sign(payload, this.options.accessTokenSecret, {
      expiresIn: '5m',
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

  async getToken({ refreshToken }: TokenInput): Promise<TokenResponse> {
    try {
      const tokenExist = await this.token.findOne({ local: refreshToken });
      if (tokenExist) {
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
