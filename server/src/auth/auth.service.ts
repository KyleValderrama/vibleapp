import { Inject, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/user/entities/user.entity';
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
    return jwt.sign(payload, this.options.tokenSecret);
  }

  verify(token: string) {
    return jwt.verify(token, this.options.tokenSecret);
  }
}
