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
import { VerifyInput, VerifyResponse } from './dtos/verify.dto';
import { Token } from 'src/token/entities/token.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    @InjectRepository(Verfication)
    private readonly verification: Repository<Verfication>,
    @InjectRepository(Token) private readonly token: Repository<Token>,
    private readonly authService: AuthService,
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
      await this.login({ email, password });
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
        const token = this.authService.sign({ id: _user.id });
        var _refresh = '';
        var _spotifyToken = '';
        const tokenExist = await this.token.findOne({ user: _user });

        if (tokenExist) {
          const { local, spotify } = await this.token.findOne({ user: _user });
          _refresh = local;
          _spotifyToken = spotify;
        } else {
          _refresh = this.authService.refresh({ id: _user.id });
          await this.token.save(
            this.token.create({ user: _user, local: _refresh }),
          );
        }
        return {
          status: 'ok',
          message: 'Logged-in',
          token,
          refresh: _refresh,
          spotifyToken: _spotifyToken,
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

  async verify({ code, user }: VerifyInput): Promise<VerifyResponse> {
    const _verification = await this.verification.findOne(
      { code },
      { relations: ['user'] },
    );
    if (_verification.user.id === user.id) {
      await this.user.update({ id: user.id }, { isVerified: true });
      return {
        status: 'ok',
        message: 'Verification success.',
      };
    }
    return {
      status: 'error',
      message: 'Invalid verification code.',
    };
  }
}
