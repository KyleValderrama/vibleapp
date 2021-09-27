import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from 'src/common/dtos/response.dto';
import { RegisterInput, RegisterResponse } from './dtos/register.dto';
import { User } from './entities/user.entity';
import { LoginInput, LoginResponse } from './dtos/login.dto';
import { ConfigService } from '@nestjs/config';
import { AuthService } from 'src/auth/auth.service';
import { ProfileResponse } from './dtos/profile.dto';
import { Verfication } from './entities/verification.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    @InjectRepository(Verfication)
    private readonly verification: Repository<Verfication>,
    private readonly config: ConfigService,
    private readonly auth: AuthService,
  ) {}

  async register({
    email,
    password,
    username,
  }: RegisterInput): Promise<RegisterResponse> {
    try {
      if (await this.user.findOne({ email })) {
        return {
          status: 'error',
          message: 'The email you are trying to register is already taken.',
        };
      }
      const user = await this.user.save(
        this.user.create({ email, password, username }),
      );
      await this.verification.save(this.verification.create({ user }));
      return {
        status: 'ok',
        message: 'Registration success!',
        user: await this.user.findOne({ email }),
      };
    } catch (e) {
      return {
        status: 'error',
        message: e,
      };
    }
  }

  async login({ email, password }: LoginInput): Promise<LoginResponse> {
    const _user = await this.user.findOne({ email });
    if (_user) {
      if (await _user.checkPassword(password)) {
        const token = this.auth.sign({ id: _user.id });
        return {
          status: 'ok',
          message: 'Logged-in',
          token,
        };
      }
      return {
        status: 'error',
        message: 'Wrong Password',
      };
    }
    return {
      status: 'error',
      message: '',
    };
  }

  async findById(id: string): Promise<ProfileResponse> {
    const user = await this.user.findOne({ id });
    if (user) {
      return {
        status: 'ok',
        message: 'User Found.',
        user,
      };
    }
    return {
      status: 'error',
      message: 'User Not Found.',
    };
  }

  async verify({ code, user }) {}
}
